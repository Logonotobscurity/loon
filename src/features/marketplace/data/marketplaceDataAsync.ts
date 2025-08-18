import { MarketplaceProduct } from '../types';

// Split marketplace data into categories for async loading
export const marketplaceDataChunks = {
  automation: () => import('./chunks/automationProducts'),
  assistant: () => import('./chunks/assistantProducts'),
  process: () => import('./chunks/processProducts'),
  integration: () => import('./chunks/integrationProducts'),
  catalog: () => import('./chunks/catalogProducts'),
};

// Lazy load function for category-specific data
export const loadMarketplaceProducts = async (
  categories?: string[]
): Promise<MarketplaceProduct[]> => {
  if (!categories || categories.length === 0) {
    // Load all categories
    const promises = Object.values(marketplaceDataChunks).map(loader => loader());
    const results = await Promise.all(promises);
    return results.flatMap(chunk => chunk.default);
  }

  // Load specific categories
  const promises = categories
    .filter(cat => marketplaceDataChunks[cat as keyof typeof marketplaceDataChunks])
    .map(cat => marketplaceDataChunks[cat as keyof typeof marketplaceDataChunks]());
  
  const results = await Promise.all(promises);
  return results.flatMap(chunk => chunk.default);
};

// Search and filter utility with debouncing
let searchDebounceTimer: NodeJS.Timeout | null = null;
export const searchMarketplaceProducts = (
  products: MarketplaceProduct[],
  searchTerm: string,
  debounceMs = 300
): Promise<MarketplaceProduct[]> => {
  return new Promise((resolve) => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    searchDebounceTimer = setTimeout(() => {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      resolve(filtered);
    }, debounceMs);
  });
};

// Image CDN URL generator
export const getOptimizedImageUrl = (
  imageUrl: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string => {
  const { width, height, quality = 80 } = options;
  
  // Use Cloudinary as example CDN - replace with your actual CDN
  const baseUrl = 'https://res.cloudinary.com/your-cdn/image/upload';
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push('f_auto'); // Auto format (WebP when supported)
  
  const transformString = transformations.join(',');
  const cleanUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
  
  return `${baseUrl}/${transformString}/${cleanUrl}`;
};