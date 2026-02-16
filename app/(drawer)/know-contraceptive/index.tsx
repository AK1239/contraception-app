import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import HomeSectionCard from '../../../src/components/HomeSectionCard';

export default function KnowContraceptiveIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const handleNaturalMethods = () => {
    router.push('/(drawer)/know-contraceptive/natural-methods');
  };

  const handleModernMethods = () => {
    router.push('/(drawer)/know-contraceptive/modern-methods');
  };

  // Define all searchable items with their content
  const allItems = [
    {
      id: 'natural-methods',
      emoji: '🌿',
      title: 'Natural Methods',
      description: 'Explore natural family planning methods including Lactational Amenorrhea, Calendar Method, and Standard Days Method. These methods work with your body\'s natural fertility cycle.',
      ctaLabel: 'View Natural Methods',
      onPress: handleNaturalMethods,
      backgroundColor: '#F0FDF4',
      buttonColor: '#10B981',
      searchTerms: 'natural lactational amenorrhea calendar standard days fertility awareness breastfeeding',
    },
    {
      id: 'modern-methods',
      emoji: '💊',
      title: 'Modern Methods',
      description: 'Discover modern contraceptive options including temporary and permanent methods. These include hormonal and non-hormonal options with varying effectiveness and duration.',
      ctaLabel: 'View Modern Methods',
      onPress: handleModernMethods,
      backgroundColor: '#F0F9FF',
      buttonColor: '#0EA5E9',
      searchTerms: 'modern temporary permanent hormonal pill injection implant iud condom patch ring sterilization',
    },
  ];

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return allItems;
    }
    const query = searchQuery.toLowerCase();
    return allItems.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.searchTerms.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search contraceptive methods..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#6B7280"
        />
      </View>

      <View style={styles.methodsContainer}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <HomeSectionCard
              key={item.id}
              leadingEmoji={item.emoji}
              title={item.title}
              description={item.description}
              ctaLabel={item.ctaLabel}
              onPress={item.onPress}
              backgroundColor={item.backgroundColor}
              buttonColor={item.buttonColor}
            />
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No methods found matching "{searchQuery}"</Text>
          </View>
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
  methodsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  noResultsContainer: {
    padding: 32,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

