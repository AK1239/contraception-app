/**
 * Standard Days Method Calculator Screen
 */

import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import {
  setCycleLength,
  setLMPDate,
  setCurrentSection,
  setEvaluationResult,
  setComplete,
  initializeSDM,
  resetSDM,
  goBackToEdit,
} from '../../src/store/slices/standardDayMethod';
import { getSDMSection } from '../../src/config/standardDaySections';
import { SectionPage } from '../../src/components/questionnaire';
import { StandardDayResults, StandardDaySectionNavigator } from '../../src/components/sdm';
import NaturalMethodsInfoCard from '../../src/components/NaturalMethodsInfoCard';
import { evaluateSDM } from '../../src/engine/standardDayEngine';
import {
  getNextSDMSection,
  getPreviousSDMSection,
  isLastSDMSection,
  isSDMSectionComplete,
  calculateSDMProgress,
} from '../../src/utils/standardDayNavigation';
import type { AnswerValue } from '../../src/types/questionnaire';

export default function StandardDayCalculatorPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showInfoCard, setShowInfoCard] = useState(true);

  const { answers, currentSection, evaluationResult, isComplete } = useSelector(
    (state: RootState) => state.standardDayMethod
  );

  // Initialize on mount (skip while showing info card)
  useEffect(() => {
    if (showInfoCard) return;
    if (!currentSection && !isComplete) {
      dispatch(initializeSDM());
    }
  }, [showInfoCard, currentSection, isComplete, dispatch]);

  // Evaluate and get average cycle length
  const currentResult = evaluateSDM(answers);
  const avgCycleLength = currentResult.avgCycleLength;

  const currentSectionConfig = currentSection ? getSDMSection(currentSection) : null;

  const currentIndex = currentSection
    ? ['eligibility-info', 'cycle-lengths', 'lmp-date'].indexOf(currentSection)
    : 0;
  const isFirstSection = currentIndex <= 0;
  const isLast = currentSection ? isLastSDMSection(currentSection, avgCycleLength) : false;
  const canProceed = currentSection ? isSDMSectionComplete(currentSection, answers) : false;
  const progress = currentSection ? calculateSDMProgress(currentSection, avgCycleLength) : 0;

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      // Handle cycle durations array
      if (questionId === 'cycle-durations') {
        if (Array.isArray(value)) {
          value.forEach((cycleValue, index) => {
            const numValue =
              typeof cycleValue === 'number' && cycleValue > 0 ? cycleValue : null;
            dispatch(setCycleLength({ index, value: numValue }));
          });
        }
      }
      // Handle LMP date
      else if (questionId === 'lmp-date') {
        const dateValue = value instanceof Date ? value : null;
        dispatch(setLMPDate(dateValue));
      }
    },
    [dispatch]
  );

  const runEvaluation = useCallback(() => {
    const result = evaluateSDM(answers);
    dispatch(setEvaluationResult(result));
    dispatch(setComplete(true));
    dispatch(setCurrentSection(null as any));
  }, [answers, dispatch]);

  const handleNext = useCallback(() => {
    if (!currentSection) return;

    // Validate current section
    if (!canProceed) {
      setValidationErrors({ general: 'Please complete all required fields' });
      return;
    }
    setValidationErrors({});

    const nextSection = getNextSDMSection(currentSection, answers, avgCycleLength);

    if (nextSection) {
      dispatch(setCurrentSection(nextSection));
    } else {
      // No next section means either not eligible or ready for results
      runEvaluation();
    }
  }, [currentSection, answers, avgCycleLength, canProceed, dispatch, runEvaluation]);

  const handlePrevious = useCallback(() => {
    if (!currentSection) return;

    const prevSection = getPreviousSDMSection(currentSection);
    if (prevSection) {
      dispatch(setCurrentSection(prevSection));
      setValidationErrors({});
    }
  }, [currentSection, dispatch]);

  const handleComplete = useCallback(() => {
    runEvaluation();
  }, [runEvaluation]);

  const handleReset = useCallback(() => {
    dispatch(resetSDM());
    dispatch(initializeSDM());
  }, [dispatch]);

  const handleGoBack = useCallback(() => {
    const lastSection = evaluationResult?.lmpDate ? 'lmp-date' : 'cycle-lengths';
    dispatch(goBackToEdit(lastSection));
  }, [dispatch, evaluationResult?.lmpDate]);

  const handleGetStarted = useCallback(() => {
    setShowInfoCard(false);
    dispatch(initializeSDM());
  }, [dispatch]);

  // Convert answers to format expected by SectionPage
  const convertedAnswers: Record<string, AnswerValue | undefined> = {};
  
  // Add cycle lengths as an array for cycle-durations question
  convertedAnswers['cycle-durations'] = answers.cycleLengths.length > 0 ? answers.cycleLengths : undefined;
  
  // Add LMP date
  if (answers.lmpDate) {
    convertedAnswers['lmp-date'] = answers.lmpDate;
  }

  // Show results if complete
  if (isComplete && evaluationResult) {
    return <StandardDayResults result={evaluationResult} onReset={handleReset} onGoBack={handleGoBack} />;
  }

  // Show info card only initially
  if (showInfoCard) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <NaturalMethodsInfoCard />
          <Button
            mode="contained"
            onPress={handleGetStarted}
            style={styles.getStartedButton}
            labelStyle={styles.getStartedLabel}
            buttonColor="#059669"
          >
            {t('naturalCalculators.getStarted')}
          </Button>
        </ScrollView>
      </View>
    );
  }

  // Show questionnaire (info card removed after user clicks Next)
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {currentSectionConfig && (
          <SectionPage
            section={currentSectionConfig}
            answers={convertedAnswers}
            onAnswerChange={handleAnswerChange}
            errors={validationErrors}
          />
        )}
      </ScrollView>

      {currentSection && (
        <StandardDaySectionNavigator
          currentSection={currentSection}
          progress={progress}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onComplete={handleComplete}
          isFirstSection={isFirstSection}
          isLastSection={isLast}
          canProceed={canProceed}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  getStartedButton: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 6,
  },
  getStartedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
