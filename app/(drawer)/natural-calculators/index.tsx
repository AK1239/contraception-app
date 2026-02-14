import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeSectionCard from '../../../src/components/HomeSectionCard';

export default function NaturalCalculatorsIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleStandardDayCalculator = () => {
    router.push('/(drawer)/standard-day-calculator-page');
  };

  const handleCalendarMethodCalculator = () => {
    router.push('/(drawer)/standard-day-calculator');
  };

  const handleFABEligibility = () => {
    router.push('/(drawer)/fab-eligibility');
  };

  return (
    <ScrollView 
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      <View style={styles.calculatorsContainer}>
        <HomeSectionCard
          leadingEmoji="🎯"
          title="Natural Method Eligibility (FAB)"
          description="Assess eligibility for Symptoms-Based (SYM) and Calendar-Based (CAL) fertility awareness methods. Get Accept, Caution, or Delay recommendations with STI/HIV and high-risk pregnancy advisories."
          ctaLabel="Check FAB Eligibility"
          onPress={handleFABEligibility}
          backgroundColor="#ECFDF5"
          buttonColor="#10B981"
        />

        <HomeSectionCard
          leadingEmoji="📅"
          title="Standard Days Method Calculator"
          description="Calculate your fertile days using the Standard Days Method. This method is suitable for women with regular cycles between 26-32 days. It identifies days 8-19 as potentially fertile days."
          ctaLabel="Use Standard Days Calculator"
          onPress={handleStandardDayCalculator}
          backgroundColor="#FFFBEB"
          buttonColor="#EAB308"
        />

        <HomeSectionCard
          leadingEmoji="📆"
          title="Calendar Method Calculator"
          description="Track your menstrual cycles to identify your fertile window. Enter your cycle lengths to calculate personalized fertile periods based on your unique cycle pattern."
          ctaLabel="Use Calendar Method Calculator"
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

