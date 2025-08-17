import { useConversationStore } from '../../store/conversationStore';
import { ConversationRepository } from '../../repositories/ConversationRepository';
import { geminiApiService } from '../api/GeminiApiService';

describe('Integration Tests', () => {
  // Mock localStorage for tests
  let mockLocalStorage: Record<string, string>;
  
  beforeEach(() => {
    mockLocalStorage = {};
    
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete mockLocalStorage[key];
      }),
      clear: jest.fn(() => {
        mockLocalStorage = {};
      }),
      key: jest.fn((index: number) => Object.keys(mockLocalStorage)[index] || null),
      length: 0,
    };

    // Clear all stores
    mockLocalStorage = {};
    
    // Reset stores
    useConversationStore.setState({ messages: [], isLoading: false, error: null });
  });

  describe('Conversation Flow', () => {
    it('should store and retrieve messages through repository', async () => {
      const repository = new ConversationRepository();
      const testMessages = [
        {
          id: 'test-1',
          text: 'Hello AI',
          sender: 'user' as const,
          timestamp: Date.now(),
        },
        {
          id: 'test-2',
          text: 'Hello human',
          sender: 'ai' as const,
          timestamp: Date.now() + 1000,
        },
      ];

      await repository.saveMessages(testMessages);
      const retrieved = await repository.getMessages();

      expect(retrieved).toEqual(testMessages);
    });

    it('should handle empty conversation', async () => {
      const repository = new ConversationRepository();
      const messages = await repository.getMessages();
      expect(messages).toEqual([]);
    });

    it('should clear conversation', async () => {
      const repository = new ConversationRepository();
      const testMessages = [
        {
          id: 'test-1',
          text: 'Test message',
          sender: 'user' as const,
          timestamp: Date.now(),
        },
      ];

      await repository.saveMessages(testMessages);
      await repository.clearMessages();
      const messages = await repository.getMessages();

      expect(messages).toEqual([]);
    });
  });

  describe('API Service Configuration', () => {
    it('should detect when API is not configured', () => {
      // Mock missing API key
      const originalEnv = process.env;
      process.env = {};

      expect(geminiApiService.isConfigured()).toBe(false);

      process.env = originalEnv;
    });
  });
});