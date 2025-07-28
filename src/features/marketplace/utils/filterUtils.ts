import { MarketplaceProduct } from '../data/marketplaceData';

export const filterProducts = (products: MarketplaceProduct[], filters: { category: string; industry: string; search: string; }) => {
  const { category, industry, search } = filters;
  const lowercasedSearch = search.toLowerCase();

  return products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesIndustry = industry === 'all' || product.industry === industry;

    const matchesSearch = !search || (
      product.name.toLowerCase().includes(lowercasedSearch) ||
      product.description.toLowerCase().includes(lowercasedSearch) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercasedSearch))
    );
    return matchesCategory && matchesIndustry && matchesSearch;
  });
};