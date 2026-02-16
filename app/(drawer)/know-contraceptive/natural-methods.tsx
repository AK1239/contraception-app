import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';
import { useSearchableMethodList } from '../../../src/hooks/useSearchableMethodList';

export default function NaturalMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Define all natural methods
  const allMethods = [
    {
      id: 'lam',
      type: 'category' as const,
      title: "Lactational Amenorrhea",
      description: "A natural contraceptive method for breastfeeding women. When practiced correctly, exclusive breastfeeding can provide up to 98% protection against pregnancy for the first 6 months postpartum.",
      icon: "🤱",
      onPress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/lactational-amenorrhea'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'calendar',
      type: 'category' as const,
      title: "Calendar Method",
      description: "A natural family planning method that identifies the 12 fertile days in a woman's cycle. Most effective for women with cycles between 26-32 days.",
      icon: "📅",
      onPress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/standard-days-method'),
      backgroundColor: "#F0FDF4",
      buttonColor: "#10B981",
    },
    {
      id: 'sdm',
      type: 'category' as const,
      title: "Standard Days Method",
      description: "A fertility awareness-based method for women with regular cycles of 26–32 days. Days 8–19 are considered fertile and require avoiding unprotected sex. Most effective when combined with additional fertility indicators.",
      icon: "📅",
      onPress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/standard-days-method-sdm'),
      backgroundColor: "#FEF3C7",
      buttonColor: "#F59E0B",
    },
  ];

  const {
    filteredCategories,
    searchQuery,
    setSearchQuery,
  } = useSearchableMethodList(allMethods);

  return (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search natural methods..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#6B7280"
        />
      </View>
    
      {/* Method Cards */}
      <View style={styles.methodsContainer}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((method) => (
            <NaturalMethodCard
              key={method.id}
              title={method.title}
              description={method.description}
              icon={method.icon}
              onKnowMorePress={method.onPress}
              backgroundColor={method.backgroundColor}
              buttonColor={method.buttonColor}
            />
          ))
        ) : (
          searchQuery.trim() && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No methods found</Text>
              <Text style={styles.noResultsSubtext}>Try searching for "lactational", "calendar", or "standard days"</Text>
            </View>
          )
        )}
      </View>
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
  methodsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  noResultsContainer: {
    padding: 32,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

