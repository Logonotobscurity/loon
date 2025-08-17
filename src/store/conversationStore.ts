import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Message, ConversationState } from '../types';
import { ConversationRepository } from '../repositories/ConversationRepository';
import { conversationService } from '../services/conversation/ConversationService';

interface ConversationStore extends ConversationState {
  repository: ConversationRepository;
  
  // Actions
  addMessage: (message: Message) => Promise<void>;
  sendUserMessage: (text: string, image?: File) => Promise<void>;
  clearConversation: () => Promise<void>;
  loadMessages: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  removeMessage: (messageId: string) => Promise<void>;
}

export const useConversationStore = create<ConversationStore>()(
  devtools(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,
      repository: new ConversationRepository(),

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      loadMessages: async () => {
        const { repository } = get();
        try {
          set({ isLoading: true, error: null });
          const messages = await repository.getMessages();
          set({ messages, isLoading: false });
        } catch (error) {
          console.error('Failed to load messages:', error);
          set({ 
            error: 'Failed to load conversation history',
            isLoading: false 
          });
        }
      },

      addMessage: async (message: Message) => {
        const { repository, messages } = get();
        try {
          const newMessages = [...messages, message];
          await repository.saveMessages(newMessages);
          set({ messages: newMessages });
        } catch (error) {
          console.error('Failed to add message:', error);
          set({ error: 'Failed to save message' });
        }
      },

      sendUserMessage: async (text: string, image?: File) => {
        const { addMessage } = get();
        
        if (!conversationService.isConfigured()) {
          set({ error: 'AI service is not configured. Please check your API key settings.' });
          return;
        }

        try {
          set({ isLoading: true, error: null });

          // Add user message
          const userMessage: Message = {
            id: `msg_${Date.now()}_user`,
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
            ...(image && { imageUrl: URL.createObjectURL(image) }),
          };
          await addMessage(userMessage);

          // Send to AI
          const result = await conversationService.sendMessage({
            text,
            image,
            conversationHistory: get().messages,
          });

          // Add AI response
          const aiMessage: Message = {
            id: `msg_${Date.now()}_ai`,
            role: 'assistant',
            content: result.response,
            timestamp: new Date(),
          };
          await addMessage(aiMessage);

        } catch (error) {
          console.error('Failed to send message:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to send message',
          });
        } finally {
          set({ isLoading: false });
        }
      },

      clearConversation: async () => {
        const { repository } = get();
        try {
          await repository.clearMessages();
          set({ messages: [], error: null });
        } catch (error) {
          console.error('Failed to clear conversation:', error);
          set({ error: 'Failed to clear conversation' });
        }
      },

      removeMessage: async (messageId: string) => {
        const { repository, messages } = get();
        try {
          const filteredMessages = messages.filter(msg => msg.id !== messageId);
          await repository.saveMessages(filteredMessages);
          set({ messages: filteredMessages });
        } catch (error) {
          console.error('Failed to remove message:', error);
          set({ error: 'Failed to remove message' });
        }
      },
    }),
    {
      name: 'conversation-store',
    }
  )
);