import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store";
import {
  setFABAnswer,
  setFABCurrentSection,
  setFABEvaluationResult,
  resetFABEligibility,
} from "../../src/store/slices/fabEligibility";
import { FAB_SECTIONS } from "../../src/config/fabSections";
import { SectionPage } from "../../src/components/questionnaire";
import { FABResults, FABSectionNavigator } from "../../src/components/fab";
import { evaluateFAB } from "../../src/engine/fabEligibilityEngine";
import {
  getNextFABSection,
  getPreviousFABSection,
  getFirstFABSection,
  getFABSectionOrderForAnswers,
} from "../../src/utils/fabNavigation";
import { useSectionValidation } from "../../src/hooks/useSectionValidation";
import type { AnswerValue } from "../../src/types/questionnaire";
import type { FABAnswerState } from "../../src/config/fabSections";

export default function FABEligibilityScreen() {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { validateSection } = useSectionValidation();

  const { answers, currentSection, evaluationResult } = useSelector(
    (state: RootState) => state.fabEligibility
  );

  const fabAnswers = answers as FABAnswerState;

  useEffect(() => {
    if (!currentSection && !evaluationResult) {
      dispatch(setFABCurrentSection(getFirstFABSection()));
    }
  }, [currentSection, evaluationResult, dispatch]);

  const currentSectionConfig = currentSection
    ? FAB_SECTIONS.find((s) => s.key === currentSection)
    : null;

  const sectionOrder = getFABSectionOrderForAnswers(fabAnswers);
  const currentIndex = currentSection ? sectionOrder.indexOf(currentSection) : 0;
  const isFirstSection = currentIndex <= 0;
  const isLastSection =
    currentIndex >= sectionOrder.length - 1 || sectionOrder.length === 0;

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      dispatch(setFABAnswer({ questionId, value }));
    },
    [dispatch]
  );

  const runEvaluation = useCallback(() => {
    const result = evaluateFAB(fabAnswers);
    dispatch(setFABEvaluationResult(result));
    dispatch(setFABCurrentSection(null));
  }, [fabAnswers, dispatch]);

  const handleNext = useCallback(() => {
    if (!currentSection || !currentSectionConfig) return;

    const errors = validateSection(currentSectionConfig, answers as Record<string, AnswerValue | undefined>);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const nextSection = getNextFABSection(currentSection, fabAnswers);

    if (nextSection) {
      dispatch(setFABCurrentSection(nextSection));
    } else {
      runEvaluation();
    }
  }, [currentSection, currentSectionConfig, answers, fabAnswers, dispatch, validateSection, runEvaluation]);

  const handlePrevious = useCallback(() => {
    const prevSection = getPreviousFABSection(currentSection);
    if (prevSection) {
      dispatch(setFABCurrentSection(prevSection));
    }
  }, [currentSection, dispatch]);

  const handleComplete = useCallback(() => {
    if (!currentSection || !currentSectionConfig) return;

    const errors = validateSection(currentSectionConfig, answers as Record<string, AnswerValue | undefined>);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    runEvaluation();
  }, [currentSection, currentSectionConfig, answers, dispatch, validateSection, runEvaluation]);

  const handleStartOver = useCallback(() => {
    dispatch(resetFABEligibility());
  }, [dispatch]);

  // Show results if evaluation is complete
  if (evaluationResult) {
    return (
      <View style={styles.container}>
        <FABResults result={evaluationResult} onStartOver={handleStartOver} />
      </View>
    );
  }

  if (!currentSectionConfig) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <SectionPage
        key={currentSection}
        section={currentSectionConfig}
        answers={answers as Record<string, AnswerValue | undefined>}
        onAnswerChange={handleAnswerChange}
        errors={validationErrors}
      />
      <FABSectionNavigator
        currentSection={currentSection}
        sectionOrder={sectionOrder}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onComplete={handleComplete}
        isFirstSection={isFirstSection}
        isLastSection={isLastSection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
});
