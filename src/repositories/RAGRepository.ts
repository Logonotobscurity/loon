import { RAGDocument, IRAGRepository } from '../types';
import { BaseStorageRepository } from '../services/storage/BaseStorageRepository';

export interface RAGInteraction {
  t: number;
  u: string;
}

export class RAGRepository extends BaseStorageRepository<any> implements IRAGRepository {
  private readonly KB_KEY = 'bi_gpt_rag_kb_v1';
  private readonly INTERACTIONS_KEY = 'bi_gpt_rag_interactions_v1';
  private readonly MAX_DOCUMENTS = 500;
  private readonly MAX_INTERACTIONS = 200;

  async getDocuments(): Promise<RAGDocument[]> {
    const docs = await this.get(this.KB_KEY);
    return docs || [];
  }

  async saveDocuments(documents: RAGDocument[]): Promise<void> {
    await this.set(this.KB_KEY, documents);
  }

  async upsertDocuments(documents: RAGDocument[]): Promise<void> {
    const existing = await this.getDocuments();
    const documentMap = new Map<string, RAGDocument>(
      existing.map((doc) => [doc.id, doc])
    );

    for (const doc of documents) {
      documentMap.set(doc.id, doc);
    }

    const updated = Array.from(documentMap.values()).slice(-this.MAX_DOCUMENTS);
    await this.saveDocuments(updated);
  }

  async addDocument(document: RAGDocument): Promise<void> {
    const documents = await this.getDocuments();
    documents.push(document);
    await this.saveDocuments(documents.slice(-this.MAX_DOCUMENTS));
  }

  async removeDocument(documentId: string): Promise<void> {
    const documents = await this.getDocuments();
    const filtered = documents.filter(doc => doc.id !== documentId);
    await this.saveDocuments(filtered);
  }

  async getInteractions(): Promise<RAGInteraction[]> {
    const interactions = await this.get(this.INTERACTIONS_KEY);
    return interactions || [];
  }

  async recordInteraction(utterance: string): Promise<void> {
    const interactions = await this.getInteractions();
    const newInteraction: RAGInteraction = {
      t: Date.now(),
      u: utterance.slice(0, 2000),
    };

    interactions.push(newInteraction);
    await this.set(
      this.INTERACTIONS_KEY,
      interactions.slice(-this.MAX_INTERACTIONS)
    );
  }

  async clearKnowledgeBase(): Promise<void> {
    await this.remove(this.KB_KEY);
  }

  async clearInteractions(): Promise<void> {
    await this.remove(this.INTERACTIONS_KEY);
  }

  async getDocumentCount(): Promise<number> {
    const documents = await this.getDocuments();
    return documents.length;
  }

  async getInteractionCount(): Promise<number> {
    const interactions = await this.getInteractions();
    return interactions.length;
  }
}