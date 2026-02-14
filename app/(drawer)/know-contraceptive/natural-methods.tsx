import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';

export default function NaturalMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Define all methods data
  const allMethods = [
    {
      id: 'lam',
      title: "Lactational Amenorrhea",
      description: "A natural contraceptive method for breastfeeding women. When practiced correctly, exclusive breastfeeding can provide up to 98% protection against pregnancy for the first 6 months postpartum.",
      icon: "🤱",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/lactational-amenorrhea'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'calendar',
      title: "Calendar Method",
      description: "A natural family planning method that identifies the 12 fertile days in a woman's cycle. Most effective for women with cycles between 26-32 days.",
      icon: "📅",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/standard-days-method'),
      backgroundColor: "#F0FDF4",
      buttonColor: "#10B981",
    },
    {
      id: 'sdm',
      title: "Standard Days Method",
      description: "A fertility awareness-based method for women with regular cycles of 26–32 days. Days 8–19 are considered fertile and require avoiding unprotected sex. Most effective when combined with additional fertility indicators.",
      icon: "📅",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/standard-days-method-sdm'),
      backgroundColor: "#FEF3C7",
      buttonColor: "#F59E0B",
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
          {filteredMethods.map((method) => (
            <NaturalMethodCard
              key={method.id}
              title={method.title}
              description={method.description}
              icon={method.icon}
              onKnowMorePress={method.onKnowMorePress}
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
  headerCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
    lineHeight: 22,
  },
  methodsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  infoCard: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#BF360C',
    lineHeight: 20,
  },
});

