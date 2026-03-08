import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useKnowIndexData } from "../../../src/hooks/useKnowIndexData";
import { useSearchableMethodList } from "../../../src/hooks/useSearchableMethodList";
import SearchResultsView from "../../../src/components/shared/SearchResultsView";

export default function KnowContraceptiveIndexScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { categories, specificMethods } = useKnowIndexData();
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
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t("knowContraceptive.searchPlaceholder")}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#6B7280"
        />
      </View>

      <SearchResultsView
        categories={filteredCategories}
        specificMethods={filteredSpecificMethods}
        showGrouping={showGrouping}
        searchQuery={searchQuery}
        categoryCardType="default"
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
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 14,
  },
});

