import { create } from 'zustand';

interface State {
  count: number;
  increment: () => void;
  searchQuery: string;
  filters: Record<string, any>; // You might want to define a more specific type for filters
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Record<string, any>) => void;
}

const useStore = create<State>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  searchQuery: '',
  filters: {},
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters }),
}));

export default useStore;