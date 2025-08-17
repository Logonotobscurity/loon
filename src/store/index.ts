import { create } from 'zustand';

// Feature-specific stores (preferred approach)
export { useConversationStore } from './conversationStore';
export { useMarketplaceStore } from './marketplaceStore';

// Legacy store for backward compatibility - will be deprecated
interface LegacyStoreState {
  count: number;
  searchQuery: string;
  filters: {
    category: string;
    industry: string;
  };
  increment: () => void;
  decrement: () => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: { category?: string; industry?: string }) => void;
}

/**
 * @deprecated Use feature-specific stores instead:
 * - useConversationStore for conversation state
 * - useMarketplaceStore for marketplace state
 */
export const useStore = create<LegacyStoreState>((set) => ({
  count: 0,
  searchQuery: '',
  filters: {
    category: 'all',
    industry: 'all',
  },
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));

export default useStore;