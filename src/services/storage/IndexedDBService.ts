import { Message } from '../../types';

interface ConversationData {
  id: string;
  messages: Message[];
  title: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

interface DBSchema {
  conversations: {
    key: string;
    value: ConversationData;
    indexes: {
      'by-updated': Date;
      'by-created': Date;
    };
  };
}

export class IndexedDBService {
  private dbName = 'bi-gpt-db';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('conversations')) {
          const store = db.createObjectStore('conversations', { keyPath: 'id' });
          store.createIndex('by-updated', 'updatedAt');
          store.createIndex('by-created', 'createdAt');
        }
      };
    });
  }

  async saveConversation(data: ConversationData): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['conversations'], 'readwrite');
      const store = transaction.objectStore('conversations');
      
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getConversation(id: string): Promise<ConversationData | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['conversations'], 'readonly');
      const store = transaction.objectStore('conversations');
      
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllConversations(limit = 50): Promise<ConversationData[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['conversations'], 'readonly');
      const store = transaction.objectStore('conversations');
      const index = store.index('by-updated');
      
      const request = index.getAll(null, limit);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteConversation(id: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['conversations'], 'readwrite');
      const store = transaction.objectStore('conversations');
      
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearOldConversations(maxAgeDays = 30): Promise<void> {
    if (!this.db) await this.init();
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays);
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['conversations'], 'readwrite');
      const store = transaction.objectStore('conversations');
      const index = store.index('by-updated');
      
      const request = index.openCursor(IDBKeyRange.upperBound(cutoffDate));
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          resolve();
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  async getConversationCount(): Promise<number> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['conversations'], 'readonly');
      const store = transaction.objectStore('conversations');
      
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Batch operations for performance
  async saveConversationsBatch(conversations: ConversationData[]): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['conversations'], 'readwrite');
      const store = transaction.objectStore('conversations');
      
      const promises = conversations.map(conv => {
        return new Promise<void>((resolve, reject) => {
          const request = store.put(conv);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      });
      
      Promise.all(promises)
        .then(() => resolve())
        .catch(reject);
    });
  }
}

export const indexedDBService = new IndexedDBService();