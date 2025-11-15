import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import HomeSectionCard from '../../../src/components/HomeSectionCard';

export default function KnowContraceptiveIndexScreen() {
  const router = useRouter();

  const handleNaturalMethods = () => {
    router.push('/(drawer)/know-contraceptive/natural-methods');
  };

  const handleModernMethods = () => {
    router.push('/(drawer)/know-contraceptive/modern-methods');
  };

  return (
    <ScrollView style={styles.content}>
      <View style={styles.methodsContainer}>
        <HomeSectionCard
          leadingEmoji="🌿"
          title="Natural Methods"
          description="Explore natural family planning methods including Lactational Amenorrhea, Calendar Method, and Standard Days Method. These methods work with your body's natural fertility cycle."
          ctaLabel="View Natural Methods"
          onPress={handleNaturalMethods}
          backgroundColor="#F0FDF4"
          buttonColor="#10B981"
        />

        <HomeSectionCard
          leadingEmoji="💊"
          title="Modern Methods"
          description="Discover modern contraceptive options including temporary and permanent methods. These include hormonal and non-hormonal options with varying effectiveness and duration."
          ctaLabel="View Modern Methods"
          onPress={handleModernMethods}
          backgroundColor="#F0F9FF"
          buttonColor="#0EA5E9"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  methodsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
});

