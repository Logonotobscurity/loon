import { useCallback } from 'react';
import { useMarketplaceStore } from '../../../store/marketplaceStore';

// Re-export types from the centralized store
export type { FilterState } from '../../../types';

/**
 * Hook for managing marketplace filters using the centralized store.
 * 
 * @deprecated Use useMarketplaceStore directly for new components.
 */
export const useMarketplaceFilters = () => {
  const { filters, updateFilter, resetFilters, setFilters } = useMarketplaceStore();

  return { filters, updateFilter, resetFilters, setFilters };
};