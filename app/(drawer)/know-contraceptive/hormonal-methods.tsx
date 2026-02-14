import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';

export default function HormonalMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Define all methods data
  const allMethods = [
    {
      id: 'coc',
      title: "Combined Oral Contraceptives (COC)",
      description: "Pills containing both estrogen and progesterone hormones. Provides excellent protection with regular, predictable menses and reduced risk of certain cancers.",
      icon: "💊",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/coc'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'pop',
      title: "Progestin Only Pills (POP)",
      description: "Pills containing only progesterone hormone (no estrogen). Excellent protection with no high estrogen side effects. Must be taken at the same time daily.",
      icon: "💊",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/pop'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'injection',
      title: "Contraceptive Injections",
      description: "Injections containing DMPA (progestin hormone) that provide 3 months of protection. Less painful periods and can be used during breastfeeding.",
      icon: "💉",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/contraceptive-injection'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'implants',
      title: "Implants",
      description: "A tiny, flexible rod placed under the skin of the upper arm. Provides perfect protection for 3-5 years. No daily maintenance required.",
      icon: "📏",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/implants'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'patch',
      title: "Combination Patch Contraceptive",
      description: "A transdermal patch that releases estrogen and progesterone through the skin. Works longer than pills with regular, predictable menses.",
      icon: "🩹",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/combination-patch'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: 'ring',
      title: "Contraceptive Vaginal Ring",
      description: "A small, flexible plastic ring inserted into the vagina once a month. Releases hormones continuously. No daily maintenance required.",
      icon: "⭕",
      onKnowMorePress: () => router.push('/(drawer)/know-contraceptive/contraceptive-method/contraceptive-vaginal-ring'),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
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
            placeholder="Search hormonal methods..."
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

