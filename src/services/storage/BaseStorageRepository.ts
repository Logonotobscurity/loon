import { IStorageRepository } from '../../types';

export class BaseStorageRepository<T> implements IStorageRepository<T> {
  constructor(private storage: Storage = localStorage) {}

  async get(key: string): Promise<T | null> {
    try {
      const item = this.storage.getItem(key);
      if (!item) return null;
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from storage for key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      this.storage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error writing to storage for key ${key}:`, error);
      throw new Error(`Failed to save data: ${error}`);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage for key ${key}:`, error);
      throw new Error(`Failed to remove data: ${error}`);
    }
  }

  async clear(): Promise<void> {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error(`Failed to clear storage: ${error}`);
    }
  }
}