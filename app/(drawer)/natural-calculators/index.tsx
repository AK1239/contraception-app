import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import HomeSectionCard from '../../../src/components/HomeSectionCard';
import NaturalMethodsInfoCard from '../../../src/components/NaturalMethodsInfoCard';

export default function NaturalCalculatorsIndexScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const handleStandardDayCalculator = () => {
    router.push('/(drawer)/standard-day-calculator-page');
  };

  const handleCalendarMethodCalculator = () => {
    router.push('/(drawer)/calendar-method-calculator');
  };

  return (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      <View style={styles.calculatorsContainer}>
        <NaturalMethodsInfoCard />
        <HomeSectionCard
          leadingEmoji="📅"
          title={t("naturalCalculators.standardDayTitle")}
          description={t("naturalCalculators.standardDayDescription")}
          ctaLabel={t("naturalCalculators.standardDayCta")}
          onPress={handleStandardDayCalculator}
          backgroundColor="#FFFBEB"
          buttonColor="#EAB308"
        />

        <HomeSectionCard
          leadingEmoji="📆"
          title={t("naturalCalculators.calendarTitle")}
          description={t("naturalCalculators.calendarDescription")}
          ctaLabel={t("naturalCalculators.calendarCta")}
          onPress={handleCalendarMethodCalculator}
          backgroundColor="#E0E7FF"
          buttonColor="#6366F1"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  calculatorsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
});

