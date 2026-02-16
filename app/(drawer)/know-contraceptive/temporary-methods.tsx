import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import TemporaryMethodCard from '../../../src/components/TemporaryMethodCard';

// T-shaped icon component for IUD
const TShapeIcon = () => (
  <View style={tIconStyles.container}>
    <View style={tIconStyles.horizontalBar} />
    <View style={tIconStyles.verticalBar} />
  </View>
);

export default function TemporaryMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const handleBarrierExplore = () => {
    router.push('/(drawer)/know-contraceptive/barrier-methods');
  };

  const handleHormonalExplore = () => {
    router.push('/(drawer)/know-contraceptive/hormonal-methods');
  };

  const handleIUDExplore = () => {
    router.push('/(drawer)/know-contraceptive/iud-methods');
  };

  // Define all methods data
  const allMethods = [
    {
      id: 'barrier',
      title: "Barrier Methods",
      description: "Physical barriers that prevent sperm from reaching the egg. Includes condoms, diaphragms, and cervical caps. These methods also provide protection against STIs.",
      icon: "🛡️",
      onExplorePress: handleBarrierExplore,
      backgroundColor: "#FEF3F2",
      buttonColor: "#EF4444",
      useStringIcon: true,
    },
    {
      id: 'hormonal',
      title: "Hormonal Methods",
      description: "Contraceptive methods that use hormones to prevent pregnancy. Includes birth control pills, patches, rings, and injections. Highly effective when used correctly.",
      icon: "💊",
      onExplorePress: handleHormonalExplore,
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
      useStringIcon: true,
    },
    {
      id: 'iud',
      title: "Intrauterine Device Methods",
      description: "Intrauterine devices that are inserted into the uterus. Includes hormonal and copper IUDs. Long-lasting, highly effective, and reversible contraceptive options.",
      icon: <TShapeIcon />,
      onExplorePress: handleIUDExplore,
      backgroundColor: "#F0FDF4",
      buttonColor: "#10B981",
      useStringIcon: false,
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
            placeholder="Search temporary methods..."
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
            <TemporaryMethodCard
              key={method.id}
              title={method.title}
              description={method.description}
              icon={method.icon}
              onExplorePress={method.onExplorePress}
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

