import { useMemo, useState } from 'react';

export interface MethodCategory {
  id: string;
  type: 'category';
  title: string;
  description: string;
  icon: string | React.ReactElement;
  onPress: () => void;
  backgroundColor: string;
  buttonColor: string;
}

export interface SpecificMethod {
  id: string;
  type: 'specific';
  title: string;
  description: string;
  breadcrumb: string;
  icon: string;
  onPress: () => void;
  backgroundColor: string;
  buttonColor: string;
}

export interface SearchResults {
  filteredCategories: MethodCategory[];
  filteredSpecificMethods: SpecificMethod[];
  showGrouping: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function useSearchableMethodList(
  categories: MethodCategory[],
  specificMethods: SpecificMethod[] = []
): SearchResults {
  const [searchQuery, setSearchQuery] = useState('');

  const { filteredCategories, filteredSpecificMethods, showGrouping } = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        filteredCategories: categories,
        filteredSpecificMethods: [],
        showGrouping: false,
      };
    }

    const query = searchQuery.toLowerCase();

    const matchedCategories = categories.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    const matchedSpecificMethods = specificMethods.filter(
      (method) =>
        method.title.toLowerCase().includes(query) ||
        method.description.toLowerCase().includes(query) ||
        method.breadcrumb.toLowerCase().includes(query)
    );

    return {
      filteredCategories: matchedCategories,
      filteredSpecificMethods: matchedSpecificMethods,
      showGrouping: matchedCategories.length > 0 && matchedSpecificMethods.length > 0,
    };
  }, [searchQuery, categories, specificMethods]);

  return {
    filteredCategories,
    filteredSpecificMethods,
    showGrouping,
    searchQuery,
    setSearchQuery,
  };
}
