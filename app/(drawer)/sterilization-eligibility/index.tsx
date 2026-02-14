import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeSectionCard from '../../../src/components/HomeSectionCard';

export default function SterilizationEligibilityIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleFemaleSterilization = () => {
    router.push('/(drawer)/female-sterilization-eligibility');
  };

  const handleMaleSterilization = () => {
    router.push('/(drawer)/male-sterilization-eligibility');
  };

  return (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      <View style={styles.cardsContainer}>
        <HomeSectionCard
          leadingEmoji="👩‍⚕️"
          title="Female Sterilization Eligibility"
          description="Determine eligibility for female surgical sterilization using structured clinical logic. Evaluates conditions across multiple categories including cardiovascular, endocrine, gynecologic, and more to provide Accept, Caution, Delay, or Specialist Referral recommendations."
          ctaLabel="Assess Female Eligibility"
          onPress={handleFemaleSterilization}
          backgroundColor="#FDF2F8"
          buttonColor="#EC4899"
        />

        <HomeSectionCard
          leadingEmoji="👨‍⚕️"
          title="Male Sterilization Eligibility"
          description="Determine eligibility for male surgical sterilization (vasectomy) using WHO Medical Eligibility Criteria. Evaluates conditions including HIV status, endocrine disorders, genital infections, and scrotal structural abnormalities to provide Accept, Caution, Delay, or Special Setting recommendations."
          ctaLabel="Assess Male Eligibility"
          onPress={handleMaleSterilization}
          backgroundColor="#EFF6FF"
          buttonColor="#3B82F6"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
});
