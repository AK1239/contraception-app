/**
 * Calendar Method (Ogino-Knaus / Rhythm Method) Calculator Screen
 */

import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import {
  setCycleLength,
  setLMPDate,
  setCurrentSection,
  setEvaluationResult,
  setComplete,
  initializeCalendarMethod,
  resetCalendarMethod,
} from '../../src/store/slices/calendarMethod';
import { getCalendarMethodSection } from '../../src/config/calendarMethodSections';
import { SectionPage } from '../../src/components/questionnaire';
import { CalendarMethodResults, CalendarMethodSectionNavigator } from '../../src/components/calendar-method';
import { evaluateCalendarMethod } from '../../src/engine/calendarMethodEngine';
import {
  getNextCalendarMethodSection,
  getPreviousCalendarMethodSection,
  isLastCalendarMethodSection,
  isCalendarMethodSectionComplete,
  calculateCalendarMethodProgress,
} from '../../src/utils/calendarMethodNavigation';
import type { AnswerValue } from '../../src/types/questionnaire';

export default function CalendarMethodCalculatorPage() {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { answers, currentSection, evaluationResult, isComplete } = useSelector(
    (state: RootState) => state.calendarMethod
  );

  // Initialize on mount
  useEffect(() => {
    if (!currentSection && !isComplete) {
      dispatch(initializeCalendarMethod());
    }
  }, [currentSection, isComplete, dispatch]);

  // Evaluate to get eligibility status
  const currentResult = evaluateCalendarMethod(answers);
  const eligible = currentResult.eligible;

  const currentSectionConfig = currentSection ? getCalendarMethodSection(currentSection) : null;

  const currentIndex = currentSection
    ? ['eligibility-info', 'cycle-lengths', 'lmp-date'].indexOf(currentSection)
    : 0;
  const isFirstSection = currentIndex <= 0;
  const isLast = currentSection ? isLastCalendarMethodSection(currentSection, eligible) : false;
  const canProceed = currentSection ? isCalendarMethodSectionComplete(currentSection, answers) : false;
  const progress = currentSection ? calculateCalendarMethodProgress(currentSection, eligible) : 0;

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      // Handle cycle durations array
      if (questionId === 'cycle-durations') {
        if (Array.isArray(value)) {
          value.forEach((cycleValue, index) => {
            const numValue = typeof cycleValue === 'number' ? cycleValue : null;
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
    const result = evaluateCalendarMethod(answers);
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

    const nextSection = getNextCalendarMethodSection(currentSection, answers, eligible);

    if (nextSection) {
      dispatch(setCurrentSection(nextSection));
    } else {
      // No next section means either not eligible or ready for results
      runEvaluation();
    }
  }, [currentSection, answers, eligible, canProceed, dispatch, runEvaluation]);

  const handlePrevious = useCallback(() => {
    if (!currentSection) return;

    const prevSection = getPreviousCalendarMethodSection(currentSection);
    if (prevSection) {
      dispatch(setCurrentSection(prevSection));
      setValidationErrors({});
    }
  }, [currentSection, dispatch]);

  const handleComplete = useCallback(() => {
    runEvaluation();
  }, [runEvaluation]);

  const handleReset = useCallback(() => {
    dispatch(resetCalendarMethod());
    dispatch(initializeCalendarMethod());
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
    return <CalendarMethodResults result={evaluationResult} onReset={handleReset} />;
  }

  // Show questionnaire
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
        <CalendarMethodSectionNavigator
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
    paddingBottom: 20,
  },
});
