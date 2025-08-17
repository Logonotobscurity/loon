import React, { memo } from 'react';
import { SearchBar } from './SearchBar';
import { customMarketplaceCategories, industryCategories } from '../data/marketplaceData';
import { useMarketplaceStore } from '../../../store/marketplaceStore';

export const FilterPanel = memo(() => {
  const filters = useMarketplaceStore((state) => state.filters);
  const setFilters = useMarketplaceStore((state) => state.setFilters);
  const searchQuery = useMarketplaceStore((state) => state.filters.search);
  const setSearchQuery = (search: string) => useMarketplaceStore.getState().updateFilter('search', search);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <select
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
        className="w-full lg:w-auto bg-bg-dark-95 border border-border-white-20 rounded-full px-4 py-3 text-text-white focus:border-primary focus:outline-none transition-colors"
      >
        <option value="all">All Categories</option>
        {customMarketplaceCategories.map(category => (
          <option key={category.value} value={category.value}>{category.label}</option>
        ))}
      </select>
      <select
        value={filters.industry}
        onChange={(e) => handleFilterChange('industry', e.target.value)}
        className="w-full lg:w-auto bg-bg-dark-95 border border-border-white-20 rounded-full px-4 py-3 text-text-white focus:border-primary focus:outline-none transition-colors"
      >
        <option value="all">All Industries</option>
        {industryCategories.map(industry => (
          <option key={industry.value} value={industry.value}>{industry.label}</option>
        ))}
      </select>

    </div>
  );
});

FilterPanel.displayName = 'FilterPanel';