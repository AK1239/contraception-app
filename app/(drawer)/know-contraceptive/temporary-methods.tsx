import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { useSearchableMethodList } from '../../../src/hooks/useSearchableMethodList';
import { useTranslatedMethodsData } from '../../../src/hooks/useTranslatedMethodsData';
import SearchResultsView from '../../../src/components/shared/SearchResultsView';

// T-shaped icon component for IUD
const TShapeIcon = () => (
  <View style={tIconStyles.container}>
    <View style={tIconStyles.horizontalBar} />
    <View style={tIconStyles.verticalBar} />
  </View>
);

export default function TemporaryMethodsScreen() {
  const insets = useSafeAreaInsets();
  const { getTemporaryMethodsData, searchTemporaryPlaceholder, noResultsTemporary } = useTranslatedMethodsData();
  const { categories, specificMethods } = getTemporaryMethodsData(<TShapeIcon />);
  
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
          placeholder={searchTemporaryPlaceholder}
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
        noResultsText={noResultsTemporary}
        categoryCardType="temporary"
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

const tIconStyles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalBar: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 4,
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  verticalBar: {
    width: 4,
    height: 22,
    backgroundColor: '#10B981',
    borderRadius: 2,
    marginTop: 4,
  },
});

