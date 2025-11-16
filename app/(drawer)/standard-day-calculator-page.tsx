import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { calculateStandardDays, StandardDayResult } from "../../src/utils/standardDayCalculator";
import {
  WelcomeScreen,
  CycleDurationQuestion,
  NotEligibleScreen,
  LastPeriodQuestion,
  ResultsScreen,
} from "../../src/components/standard-day-calculator";

type CalculatorStep = 'welcome' | 'question1' | 'notEligible' | 'question2' | 'results';

export default function StandardDayCalculatorPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState<CalculatorStep>('welcome');
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [result, setResult] = useState<StandardDayResult | null>(null);

  const handleCycleRangeAnswer = (isInRange: boolean) => {
    if (isInRange) {
      setCurrentStep('question2');
    } else {
      setCurrentStep('notEligible');
    }
  };

  const handleDateSelect = (date: Date) => {
    setLastPeriodDate(date);
    const calculatedResult = calculateStandardDays(date);
    setResult(calculatedResult);
    setCurrentStep('results');
  };

  const resetCalculator = () => {
    setCurrentStep('welcome');
    setLastPeriodDate(null);
    setResult(null);
  };

  const handleExploreModernMethods = () => {
    router.push('/(drawer)/know-contraceptive/modern-methods');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentStep('question1')} />;
      case 'question1':
        return <CycleDurationQuestion onAnswer={handleCycleRangeAnswer} />;
      case 'notEligible':
        return (
          <NotEligibleScreen
            onExploreModernMethods={handleExploreModernMethods}
            onStartOver={resetCalculator}
          />
        );
      case 'question2':
        return <LastPeriodQuestion onDateSelect={handleDateSelect} />;
      case 'results':
        if (!result || !lastPeriodDate) return null;
        return (
          <ResultsScreen
            lastPeriodDate={lastPeriodDate}
            result={result}
            onCalculateAgain={resetCalculator}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.contentContainer, { paddingBottom: Math.max(40, insets.bottom + 40) }]}
    >
      {renderCurrentStep()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    paddingBottom: 40,
  },
});
