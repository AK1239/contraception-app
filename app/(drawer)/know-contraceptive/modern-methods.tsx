import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { useSearchableMethodList } from '../../../src/hooks/useSearchableMethodList';
import SearchResultsView from '../../../src/components/shared/SearchResultsView';
import { getModernMethodsData } from '../../../src/data/methodsData';

export default function ModernMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { categories, specificMethods } = getModernMethodsData(router);
  
  const {
    filteredCategories,
    filteredSpecificMethods,
    showGrouping,
    searchQuery,
    setSearchQuery,
  } = useSearchableMethodList(categories, specificMethods);

  return (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search modern methods..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#6B7280"
        />
      </View>

      {/* Method Cards */}
      <SearchResultsView
        categories={filteredCategories}
        specificMethods={filteredSpecificMethods}
        showGrouping={showGrouping}
        searchQuery={searchQuery}
        noResultsText='Try searching for "temporary", "permanent", "condom", "pills", or "IUD"'
        categoryCardType="modern"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  searchInput: {
    fontSize: 14,
  },
});

