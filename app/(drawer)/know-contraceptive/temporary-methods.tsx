import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import TemporaryMethodCard from '../../../src/components/TemporaryMethodCard';

export default function TemporaryMethodsScreen() {
  const router = useRouter();

  const handleBarrierExplore = () => {
    router.push('/(drawer)/know-contraceptive/barrier-methods');
  };

  const handleHormonalExplore = () => {
    router.push('/(drawer)/know-contraceptive/hormonal-methods');
  };

  const handleIUDExplore = () => {
    router.push('/(drawer)/know-contraceptive/iud-methods');
  };

  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Method Cards */}
        <View style={styles.methodsContainer}>
          <TemporaryMethodCard
            title="Barrier Methods"
            description="Physical barriers that prevent sperm from reaching the egg. Includes condoms, diaphragms, and cervical caps. These methods also provide protection against STIs."
            icon="🛡️"
            onExplorePress={handleBarrierExplore}
            backgroundColor="#FEF3F2"
            buttonColor="#EF4444"
          />

          <TemporaryMethodCard
            title="Hormonal Methods"
            description="Contraceptive methods that use hormones to prevent pregnancy. Includes birth control pills, patches, rings, and injections. Highly effective when used correctly."
            icon="💊"
            onExplorePress={handleHormonalExplore}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
          />

          <TemporaryMethodCard
            title="Intrauterine Device Methods"
            description="Intrauterine devices that are inserted into the uterus. Includes hormonal and copper IUDs. Long-lasting, highly effective, and reversible contraceptive options."
            icon="🔧"
            onExplorePress={handleIUDExplore}
            backgroundColor="#F0FDF4"
            buttonColor="#10B981"
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

