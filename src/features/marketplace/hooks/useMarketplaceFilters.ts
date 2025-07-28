import { useState, useCallback } from 'react';

export interface FilterState {
  category: string;
  industry: string;
  search: string;
}

export const useMarketplaceFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    industry: 'all',
    search: '',
  });

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ category: 'all', industry: 'all', search: '' });
  }, []);

  return { filters, updateFilter, resetFilters };
};