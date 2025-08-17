import { BaseStorageRepository } from '../storage/BaseStorageRepository';

class MockStorage implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
}

describe('BaseStorageRepository', () => {
  let repository: BaseStorageRepository;
  let mockStorage: MockStorage;

  beforeEach(() => {
    mockStorage = new MockStorage();
    repository = new BaseStorageRepository('test_prefix', mockStorage);
  });

  describe('get', () => {
    it('should return parsed JSON data', async () => {
      const testData = { name: 'test', value: 123 };
      mockStorage.setItem('test_prefix_test_key', JSON.stringify(testData));
      
      const result = await repository.get('test_key');
      expect(result).toEqual(testData);
    });

    it('should return null for missing key', async () => {
      const result = await repository.get('missing_key');
      expect(result).toBeNull();
    });

    it('should handle invalid JSON', async () => {
      mockStorage.setItem('test_prefix_test_key', 'invalid-json');
      
      const result = await repository.get('test_key');
      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should store JSON stringified data', async () => {
      const testData = { name: 'test', value: 123 };
      
      await repository.set('test_key', testData);
      
      const stored = mockStorage.getItem('test_prefix_test_key');
      expect(stored).toBe(JSON.stringify(testData));
    });
  });

  describe('remove', () => {
    it('should remove item from storage', async () => {
      mockStorage.setItem('test_prefix_test_key', JSON.stringify({ test: true }));
      
      await repository.remove('test_key');
      
      expect(mockStorage.getItem('test_prefix_test_key')).toBeNull();
    });
  });

  describe('clear', () => {
    it('should clear all prefixed items', async () => {
      mockStorage.setItem('test_prefix_key1', 'value1');
      mockStorage.setItem('test_prefix_key2', 'value2');
      mockStorage.setItem('other_prefix_key', 'value3');
      
      await repository.clear();
      
      expect(mockStorage.getItem('test_prefix_key1')).toBeNull();
      expect(mockStorage.getItem('test_prefix_key2')).toBeNull();
      expect(mockStorage.getItem('other_prefix_key')).toBe('value3');
    });
  });
});