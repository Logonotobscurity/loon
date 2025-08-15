// src/features/conversation/useConversationState.ts

import { useState, useEffect } from 'react';

// Define types for a message
export type Message = {
  id: string;
  text?: string;
  imageUrl?: string;
  sender: 'user' | 'ai';
  timestamp: number;
};

const STORAGE_KEY = 'conversation_messages';

const useConversationState = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) as Message[] : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota/availability errors
    }
  }, [messages]);

  // Function to add a new message to the conversation
  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  // Function to clear the conversation history
  const clearConversation = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return {
    messages,
    addMessage,
    clearConversation,
  };
};

export default useConversationState;
