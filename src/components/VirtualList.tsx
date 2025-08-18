import React, { useCallback, useMemo } from 'react';
import { FixedSizeList, VariableSizeList } from 'react-window';
import { useWindowSize } from '../hooks/useWindowSize';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number | ((index: number) => number);
  containerHeight?: number;
  overscanCount?: number;
  className?: string;
  variableHeight?: boolean;
  onScroll?: (scrollOffset: number) => void;
}

export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscanCount = 5,
  className,
  variableHeight = false,
  onScroll,
}: VirtualListProps<T>) {
  const { height: windowHeight } = useWindowSize();
  
  const listHeight = containerHeight || Math.min(windowHeight - 200, 600);
  
  const itemData = useMemo(() => items, [items]);
  
  const itemKey = useCallback((index: number) => {
    const item = items[index];
    return typeof item === 'object' && item !== null && 'id' in item 
      ? (item as any).id 
      : index;
  }, [items]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      {renderItem(items[index], index)}
    </div>
  );

  if (variableHeight) {
    return (
      <VariableSizeList
        height={listHeight}
        itemCount={items.length}
        itemSize={itemHeight as (index: number) => number}
        itemData={itemData}
        itemKey={itemKey}
        overscanCount={overscanCount}
        className={className}
        onScroll={onScroll ? ({ scrollOffset }) => onScroll(scrollOffset) : undefined}
      >
        {Row}
      </VariableSizeList>
    );
  }

  return (
    <FixedSizeList
      height={listHeight}
      itemCount={items.length}
      itemSize={itemHeight as number}
      itemData={itemData}
      itemKey={itemKey}
      overscanCount={overscanCount}
      className={className}
      onScroll={onScroll ? ({ scrollOffset }) => onScroll(scrollOffset) : undefined}
    >
      {Row}
    </FixedSizeList>
  );
}

// Hook for window size
export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Memoized wrapper for marketplace items
export const MemoizedMarketplaceItem = React.memo(({ 
  item, 
  onClick 
}: { 
  item: any; 
  onClick: (item: any) => void;
}) => {
  return (
    <div 
      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="flex items-start space-x-4">
        {item.image && (
          <img 
            src={item.image} 
            alt={item.name}
            loading="lazy"
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags?.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

MemoizedMarketplaceItem.displayName = 'MemoizedMarketplaceItem';