import React, { memo } from 'react';
import { SearchBar } from './SearchBar';
import { customMarketplaceCategories, industryCategories } from '../data/marketplaceData';

interface FilterPanelProps {
  filters: {
    category: string;
    industry: string;
    search: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterPanel = memo(({ filters, onFilterChange, onSearchChange }: FilterPanelProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <SearchBar value={filters.search} onChange={onSearchChange} />
      <select
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="w-full lg:w-auto bg-bg-dark-95 border border-border-white-20 rounded-full px-4 py-3 text-text-white focus:border-primary focus:outline-none transition-colors"
      >
        <option value="all">All Categories</option>
        {customMarketplaceCategories.map(category => (
          <option key={category.value} value={category.value}>{category.label}</option>
        ))}
      </select>
      <select
        value={filters.industry}
        onChange={(e) => onFilterChange('industry', e.target.value)}
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