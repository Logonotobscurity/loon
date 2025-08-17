import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FilterState, MarketplaceState } from '../types';

interface MarketplaceStore extends MarketplaceState {
  // Actions
  setFilters: (filters: Partial<FilterState>) => void;
  updateFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  setProducts: (products: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearProducts: () => void;
}

const initialFilters: FilterState = {
  category: 'all',
  industry: 'all',
  search: '',
};

export const useMarketplaceStore = create<MarketplaceStore>()(
  devtools(
    (set) => ({
      filters: initialFilters,
      products: [],
      isLoading: false,
      error: null,

      setFilters: (filters: Partial<FilterState>) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      updateFilter: (key: keyof FilterState, value: string) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }));
      },

      resetFilters: () => {
        set({ filters: initialFilters });
      },

      setProducts: (products: any[]) => {
        set({ products });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearProducts: () => {
        set({ products: [] });
      },
    }),
    {
      name: 'marketplace-store',
    }
  )
);