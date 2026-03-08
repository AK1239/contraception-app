import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSearchableMethodList } from '../../../src/hooks/useSearchableMethodList';
import { useTranslatedMethodsData } from '../../../src/hooks/useTranslatedMethodsData';
import SearchResultsView from '../../../src/components/shared/SearchResultsView';

export default function ModernMethodsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { getModernMethodsData } = useTranslatedMethodsData();
  const { categories, specificMethods } = getModernMethodsData();
  
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
          placeholder={t("knowContraceptive.searchModern")}
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

