import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';

export default function BarrierMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Define all methods data
  const allMethods = [
    {
      id: 'male-condom',
      title: "Male Condom",
      description: "A thin sheath placed over the penis before vaginal insertion. Provides physical barrier protection against pregnancy and STDs. Highly effective when used correctly.",
      icon: "🛡️",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/male-condom'),
      backgroundColor: "#FEF3F2",
      buttonColor: "#EF4444",
    },
    {
      id: 'female-condom',
      title: "Female Condom",
      description: "A barrier method worn by the female during each coital act. Contains two flexible rings and provides protection against pregnancy. Can be inserted hours before sex.",
      icon: "🛡️",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/female-condom'),
      backgroundColor: "#FEF3F2",
      buttonColor: "#EF4444",
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
            placeholder="Search barrier methods..."
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

