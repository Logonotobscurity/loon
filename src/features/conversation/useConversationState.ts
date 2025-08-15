// src/features/conversation/useConversationState.ts

import { useState } from 'react';

// Define types for a message
export type Message = {
  id: string;
  text?: string;
  imageUrl?: string;
  sender: 'user' | 'ai';
  timestamp: number;
};

const useConversationState = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Function to add a new message to the conversation
  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  // Function to clear the conversation history
  const clearConversation = () => {
    setMessages([]);
  };

  return {
    messages,
    addMessage,
    clearConversation,
  };
};

export default useConversationState;
