import React, { memo, useCallback } from 'react';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';

/**
 * Memoized FlatList component for better performance with large lists
 * Uses React.memo and optimized rendering
 * 
 * @template T - Type of items in the list
 */
interface MemoizedListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  /**
   * Threshold for when to enable virtualization
   * Default: 10 items
   */
  virtualizationThreshold?: number;
}

function MemoizedListComponent<T>({
  data,
  renderItem,
  keyExtractor,
  virtualizationThreshold = 10,
  ...props
}: MemoizedListProps<T>) {
  // Use FlatList for lists with many items, otherwise use regular map
  // FlatList provides virtualization for better performance
  const shouldVirtualize = data.length >= virtualizationThreshold;

  const memoizedRenderItem = useCallback<ListRenderItem<T>>(
    (info) => renderItem(info),
    [renderItem]
  );

  const memoizedKeyExtractor = useCallback(
    (item: T, index: number) => keyExtractor(item, index),
    [keyExtractor]
  );

  if (!shouldVirtualize) {
    // For small lists, we can use a simpler approach
    // But still use FlatList for consistency and future scalability
    return (
      <FlatList
        data={data}
        renderItem={memoizedRenderItem}
        keyExtractor={memoizedKeyExtractor}
        removeClippedSubviews={false}
        initialNumToRender={data.length}
        maxToRenderPerBatch={data.length}
        windowSize={1}
        {...props}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={memoizedKeyExtractor}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      updateCellsBatchingPeriod={50}
      {...props}
    />
  );
}

export const MemoizedList = memo(MemoizedListComponent) as typeof MemoizedListComponent;

