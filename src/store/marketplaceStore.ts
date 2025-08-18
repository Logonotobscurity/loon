import { create } from 'zustand';
import { useMemo } from 'react';
import { MarketplaceProduct, MarketplaceCategory } from '../features/marketplace/data/marketplaceData';
import { loadMarketplaceProducts, searchMarketplaceProducts } from '../features/marketplace/data/marketplaceDataAsync';

interface MarketplaceState {
  // Filters
  selectedCategory: string | null;
  searchQuery: string;
  selectedTags: string[];
  priceRange: [number, number];
  
  // Data
  products: MarketplaceProduct[];
  categories: MarketplaceCategory[];
  allTags: string[];
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  
  // Actions
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setProducts: (products: MarketplaceProduct[]) => void;
  setCategories: (categories: MarketplaceCategory[]) => void;
  setAllTags: (tags: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
  clearProducts: () => void;
  
  // Async actions
  loadProducts: (category?: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  loadCategories: () => Promise<void>;
}

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  // Initial state
  selectedCategory: null,
  searchQuery: '',
  selectedTags: [],
  priceRange: [0, 1000],
  products: [],
  categories: [],
  allTags: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,

  // Actions
  setSelectedCategory: (category) => {
    set({ selectedCategory: category, currentPage: 1 });
    get().loadProducts(category || undefined);
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    if (query.trim()) {
      get().searchProducts(query);
    } else {
      get().loadProducts();
    }
  },
  setSelectedTags: (tags) => set({ selectedTags: tags, currentPage: 1 }),
  setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setAllTags: (tags) => set({ allTags: tags }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setCurrentPage: (page) => set({ currentPage: page }),
  resetFilters: () => {
    set({
      selectedCategory: null,
      searchQuery: '',
      selectedTags: [],
      priceRange: [0, 1000],
      currentPage: 1,
    });
    get().loadProducts();
  },
  clearProducts: () => set({ products: [] }),

  // Async actions
  loadProducts: async (category?: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const products = await loadMarketplaceProducts(category);
      const tags = [...new Set(products.flatMap(p => p.tags))];
      
      set({ 
        products, 
        allTags: tags, 
        totalItems: products.length,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load products', 
        isLoading: false 
      });
    }
  },

  searchProducts: async (query: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const products = await searchMarketplaceProducts(query);
      set({ 
        products, 
        totalItems: products.length,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Search failed', 
        isLoading: false 
      });
    }
  },

  loadCategories: async () => {
    // Load categories from async data
    try {
      const products = await loadMarketplaceProducts();
      const categories = [...new Set(products.map(p => p.category))]
        .map(name => ({ id: name, name, description: '' }));
      set({ categories });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  },
}));

// Custom hook with memoized selectors
export const useMarketplaceFilters = () => {
  const {
    products,
    selectedCategory,
    selectedTags,
    priceRange,
    searchQuery,
    currentPage,
    itemsPerPage,
  } = useMarketplaceStore();

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => 
        selectedTags.some(tag => p.tags.includes(tag))
      );
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [products, selectedCategory, selectedTags, priceRange, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return {
    filteredProducts,
    paginatedProducts,
    totalPages,
    totalFiltered: filteredProducts.length,
  };
};

export default useMarketplaceStore;