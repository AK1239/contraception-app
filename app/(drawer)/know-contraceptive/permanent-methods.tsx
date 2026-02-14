import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';

export default function PermanentMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Define all methods data
  const allMethods = [
    {
      id: 'tubal-ligation',
      title: "Tubal Ligation",
      description: "A surgical procedure where the fallopian tubes are tied and blocked. Provides permanent contraception for women with perfect efficacy. Usually irreversible.",
      icon: "🔒",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/tubal-ligation'),
      backgroundColor: "#F0FDF4",
      buttonColor: "#10B981",
    },
    {
      id: 'vasectomy',
      title: "Vasectomy",
      description: "A permanent male sterilization procedure where the vas deferens are cut, tied, or sealed. Provides perfect efficacy. Usually irreversible.",
      icon: "🔒",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/vasectomy'),
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
    // <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search permanent methods..."
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
    // </SafeAreaView>
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

