import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
      >
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
            icon={<TShapeIcon />}
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

