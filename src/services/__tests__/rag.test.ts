import { RagService } from '../rag/RagService';
import { RAGDocument } from '../../types';

describe('RagService', () => {
  let service: RagService;

  beforeEach(() => {
    service = new RagService();
    // Clear any existing data
    service.clearAll();
  });

  describe('tokenize', () => {
    it('should tokenize text correctly', () => {
      const result = service.tokenize('Hello, world! This is a test.');
      expect(result).toEqual(['hello', 'world', 'this', 'is', 'a', 'test']);
    });

    it('should handle empty string', () => {
      const result = service.tokenize('');
      expect(result).toEqual([]);
    });
  });

  describe('termFreq', () => {
    it('should calculate term frequencies', () => {
      const tokens = ['hello', 'world', 'hello', 'test'];
      const result = service.termFreq(tokens);
      expect(result).toEqual({ hello: 2, world: 1, test: 1 });
    });
  });

  describe('cosineSim', () => {
    it('should calculate cosine similarity', () => {
      const vec1 = { a: 1, b: 2, c: 3 };
      const vec2 = { a: 1, b: 2, c: 3 };
      const result = service.cosineSim(vec1, vec2);
      expect(result).toBeCloseTo(1);
    });

    it('should handle orthogonal vectors', () => {
      const vec1 = { a: 1, b: 0 };
      const vec2 = { c: 1, d: 0 };
      const result = service.cosineSim(vec1, vec2);
      expect(result).toBeCloseTo(0);
    });
  });

  describe('upsertDocuments', () => {
    it('should upsert documents', async () => {
      const docs: RAGDocument[] = [
        { id: '1', text: 'Hello world' },
        { id: '2', text: 'Goodbye world' },
      ];

      await service.upsertDocuments(docs);
      const context = await service.retrieveContext('hello', 5);
      
      expect(context).toContain('Hello world');
    });

    it('should update existing documents', async () => {
      const doc: RAGDocument = { id: '1', text: 'Original text' };
      await service.upsertDocuments([doc]);

      const updatedDoc: RAGDocument = { id: '1', text: 'Updated text' };
      await service.upsertDocuments([updatedDoc]);

      const context = await service.retrieveContext('updated');
      expect(context).toContain('Updated text');
    });
  });

  describe('retrieveContext', () => {
    it('should return relevant context', async () => {
      const docs: RAGDocument[] = [
        { id: '1', text: 'Machine learning is a field of AI' },
        { id: '2', text: 'Deep learning uses neural networks' },
        { id: '3', text: 'Python is a programming language' },
      ];

      await service.upsertDocuments(docs);
      const context = await service.retrieveContext('AI machine learning', 2);

      expect(context).toHaveLength(2);
      expect(context[0]).toContain('Machine learning');
    });

    it('should return empty array for empty query', async () => {
      const result = await service.retrieveContext('');
      expect(result).toEqual([]);
    });
  });

  describe('recordInteraction', () => {
    it('should record user interactions', async () => {
      await service.recordInteraction('User query about AI');
      const interactions = await service.getInteractions();

      expect(interactions).toHaveLength(1);
      expect(interactions[0].utterance).toBe('User query about AI');
    });
  });
});