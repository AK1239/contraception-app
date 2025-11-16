import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';

export default function BarrierMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleMaleCondomKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/male-condom');
  };

  const handleFemaleCondomKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/female-condom');
  };

  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
      >
        {/* Method Cards */}
        <View style={styles.methodsContainer}>
          <NaturalMethodCard
            title="Male Condom"
            description="A thin sheath placed over the penis before vaginal insertion. Provides physical barrier protection against pregnancy and STDs. Highly effective when used correctly."
            icon="🛡️"
            onKnowMorePress={handleMaleCondomKnowMore}
            backgroundColor="#FEF3F2"
            buttonColor="#EF4444"
          />

          <NaturalMethodCard
            title="Female Condom"
            description="A barrier method worn by the female during each coital act. Contains two flexible rings and provides protection against pregnancy. Can be inserted hours before sex."
            icon="🛡️"
            onKnowMorePress={handleFemaleCondomKnowMore}
            backgroundColor="#FEF3F2"
            buttonColor="#EF4444"
          />
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
  methodsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
});

