import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import HomeSectionCard from '../../../src/components/HomeSectionCard';

export default function SterilizationEligibilityIndexScreen() {
  const router = useRouter();
  const { t } = useTranslation();
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
          title={t("sterilization.femaleTitle")}
          description={t("sterilization.femaleDescription")}
          ctaLabel={t("sterilization.femaleCta")}
          onPress={handleFemaleSterilization}
          backgroundColor="#FDF2F8"
          buttonColor="#EC4899"
        />

        <HomeSectionCard
          leadingEmoji="👨‍⚕️"
          title={t("sterilization.maleTitle")}
          description={t("sterilization.maleDescription")}
          ctaLabel={t("sterilization.maleCta")}
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
