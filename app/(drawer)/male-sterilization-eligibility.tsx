import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store";
import {
  setMaleSterilizationAnswer,
  setMaleSterilizationCurrentSection,
  setMaleSterilizationEvaluationResult,
  resetMaleSterilizationEligibility,
} from "../../src/store/slices/maleSterilizationEligibility";
import { MALE_STERILIZATION_SECTIONS } from "../../src/config/maleSterilizationSections";
import { SectionPage } from "../../src/components/questionnaire";
import {
  MaleSterilizationResults,
  MaleSterilizationSectionNavigator,
} from "../../src/components/sterilization";
import { evaluateMaleSterilization } from "../../src/engine/maleSterilizationEngine";
import {
  getNextMaleSterilizationSection,
  getPreviousMaleSterilizationSection,
  getFirstMaleSterilizationSection,
  getMaleSterilizationSectionOrderForAnswers,
} from "../../src/utils/maleSterilizationNavigation";
import { useSectionValidation } from "../../src/hooks/useSectionValidation";
import type { AnswerValue } from "../../src/types/questionnaire";
import type { MaleSterilizationAnswerState } from "../../src/config/maleSterilizationSections";

export default function MaleSterilizationEligibilityScreen() {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { validateSection } = useSectionValidation();

  const { answers, currentSection, evaluationResult } = useSelector(
    (state: RootState) => state.maleSterilizationEligibility
  );

  const sterilizationAnswers = answers as MaleSterilizationAnswerState;

  useEffect(() => {
    if (!currentSection && !evaluationResult) {
      dispatch(setMaleSterilizationCurrentSection(getFirstMaleSterilizationSection()));
    }
  }, [currentSection, evaluationResult, dispatch]);

  const currentSectionConfig = currentSection
    ? MALE_STERILIZATION_SECTIONS.find((s) => s.key === currentSection)
    : null;

  const sectionOrder = getMaleSterilizationSectionOrderForAnswers(sterilizationAnswers);
  const currentIndex = currentSection ? sectionOrder.indexOf(currentSection) : 0;
  const isFirstSection = currentIndex <= 0;
  const isLastSection =
    currentIndex >= sectionOrder.length - 1 || sectionOrder.length === 0;

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      dispatch(setMaleSterilizationAnswer({ questionId, value }));
    },
    [dispatch]
  );

  const runEvaluation = useCallback(() => {
    const result = evaluateMaleSterilization(sterilizationAnswers);
    dispatch(setMaleSterilizationEvaluationResult(result));
    dispatch(setMaleSterilizationCurrentSection(null));
  }, [sterilizationAnswers, dispatch]);

  const handleNext = useCallback(() => {
    if (!currentSection || !currentSectionConfig) return;

    const errors = validateSection(
      currentSectionConfig,
      answers as Record<string, AnswerValue | undefined>
    );
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const nextSection = getNextMaleSterilizationSection(
      currentSection,
      sterilizationAnswers
    );

    if (nextSection) {
      dispatch(setMaleSterilizationCurrentSection(nextSection));
    } else {
      runEvaluation();
    }
  }, [
    currentSection,
    currentSectionConfig,
    answers,
    sterilizationAnswers,
    dispatch,
    validateSection,
    runEvaluation,
  ]);

  const handlePrevious = useCallback(() => {
    const prevSection = getPreviousMaleSterilizationSection(currentSection);
    if (prevSection) {
      dispatch(setMaleSterilizationCurrentSection(prevSection));
    }
  }, [currentSection, dispatch]);

  const handleComplete = useCallback(() => {
    if (!currentSection || !currentSectionConfig) return;

    const errors = validateSection(
      currentSectionConfig,
      answers as Record<string, AnswerValue | undefined>
    );
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    runEvaluation();
  }, [currentSection, currentSectionConfig, answers, validateSection, runEvaluation]);

  const handleStartOver = useCallback(() => {
    dispatch(resetMaleSterilizationEligibility());
    setValidationErrors({});
  }, [dispatch]);

  // Show results if evaluation is complete
  if (evaluationResult) {
    return (
      <MaleSterilizationResults
        result={evaluationResult}
        onStartOver={handleStartOver}
      />
    );
  }

  // Show current section
  if (!currentSectionConfig) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SectionPage
        section={currentSectionConfig}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        errors={validationErrors}
      />
      <MaleSterilizationSectionNavigator
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
    backgroundColor: "#fff",
  },
});
