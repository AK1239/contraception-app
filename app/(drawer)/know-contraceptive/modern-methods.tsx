import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import ModernMethodCard from '../../../src/components/ModernMethodCard';

export default function ModernMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const handleTemporaryOptions = () => {
    router.push('/(drawer)/know-contraceptive/temporary-methods');
  };

  const handlePermanentOptions = () => {
    router.push('/(drawer)/know-contraceptive/permanent-methods');
  };

  // Define all methods data
  const allMethods = [
    {
      id: 'temporary',
      title: "Temporary Methods",
      description: "Reversible contraceptive methods that can be stopped when you want to conceive. Includes hormonal and non-hormonal options with varying effectiveness and duration.",
      icon: "💊",
      onSeeOptionsPress: handleTemporaryOptions,
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'permanent',
      title: "Permanent Methods",
      description: "Long-term contraceptive solutions that provide permanent protection against pregnancy. These methods are typically irreversible and suitable for those who have completed their family planning.",
      icon: "🔒",
      onSeeOptionsPress: handlePermanentOptions,
      backgroundColor: "#F0FDF4",
      buttonColor: "#10B981",
    },
  ];

  // Filter methods based on search query
  const filteredMethods = useMemo(() => {
    if (!searchQuery.trim()) {
      return allMethods;
    }
    const query = searchQuery.toLowerCase();
    return allMethods.filter((method) =>
      method.title.toLowerCase().includes(query) ||
      method.description.toLowerCase().includes(query)
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
            placeholder="Search modern methods..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#6B7280"
          />
        </View>

        {/* Method Cards */}
        <View style={styles.methodsContainer}>
          {filteredMethods.map((method) => (
            <ModernMethodCard
              key={method.id}
              title={method.title}
              description={method.description}
              icon={method.icon}
              onSeeOptionsPress={method.onSeeOptionsPress}
              backgroundColor={method.backgroundColor}
              buttonColor={method.buttonColor}
            />
          ))}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
});

