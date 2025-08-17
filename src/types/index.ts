// Core types for the application

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

export interface RAGDocument {
  id: string;
  text: string;
}

export interface FilterState {
  category: string;
  industry: string;
  search: string;
}

// API related types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// Storage types
export interface StorageKey {
  CONVERSATION_MESSAGES: 'conversation_messages';
  RAG_KNOWLEDGE_BASE: 'bi_gpt_rag_kb_v1';
  RAG_INTERACTIONS: 'bi_gpt_rag_interactions_v1';
}

// Service interfaces
export interface IStorageRepository<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

export interface IConversationRepository {
  getMessages(): Promise<Message[]>;
  saveMessages(messages: Message[]): Promise<void>;
  clearMessages(): Promise<void>;
}

export interface IRAGRepository {
  getDocuments(): Promise<RAGDocument[]>;
  saveDocuments(documents: RAGDocument[]): Promise<void>;
  upsertDocuments(documents: RAGDocument[]): Promise<void>;
  getInteractions(): Promise<{ t: number; u: string }[]>;
  recordInteraction(utterance: string): Promise<void>;
}

export interface IApiService {
  sendMessage(text: string, image?: File): Promise<string>;
  isConfigured(): boolean;
}

// Product interface for marketplace
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// State management types
export interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  products: Product[];
}

export interface MarketplaceState {
  filters: FilterState;
  products: Product[];
  isLoading: boolean;
  error: string | null;
}