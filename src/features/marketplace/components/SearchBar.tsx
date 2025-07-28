import React, { memo } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = memo(({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-white-40" />
      <input
        type="text"
        placeholder="Search for solutions..."
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 bg-bg-dark-95 border border-border-white-20 rounded-full text-text-white placeholder-text-white-40 focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';