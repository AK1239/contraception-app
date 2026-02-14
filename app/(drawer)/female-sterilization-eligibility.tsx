import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store";
import {
  setFemaleSterilizationAnswer,
  setFemaleSterilizationCurrentSection,
  setFemaleSterilizationEvaluationResult,
  resetFemaleSterilizationEligibility,
} from "../../src/store/slices/femaleSterilizationEligibility";
import { FEMALE_STERILIZATION_SECTIONS } from "../../src/config/femaleSterilizationSections";
import { SectionPage } from "../../src/components/questionnaire";
import {
  FemaleSterilizationResults,
  FemaleSterilizationSectionNavigator,
} from "../../src/components/sterilization";
import { evaluateFemaleSterilization } from "../../src/engine/femaleSterilizationEngine";
import {
  getNextFemaleSterilizationSection,
  getPreviousFemaleSterilizationSection,
  getFirstFemaleSterilizationSection,
  getFemaleSterilizationSectionOrderForAnswers,
} from "../../src/utils/femaleSterilizationNavigation";
import { useSectionValidation } from "../../src/hooks/useSectionValidation";
import type { AnswerValue } from "../../src/types/questionnaire";
import type { FemaleSterilizationAnswerState } from "../../src/config/femaleSterilizationSections";

export default function FemaleSterilizationEligibilityScreen() {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { validateSection } = useSectionValidation();

  const { answers, currentSection, evaluationResult } = useSelector(
    (state: RootState) => state.femaleSterilizationEligibility
  );

  const sterilizationAnswers = answers as FemaleSterilizationAnswerState;

  useEffect(() => {
    if (!currentSection && !evaluationResult) {
      dispatch(setFemaleSterilizationCurrentSection(getFirstFemaleSterilizationSection()));
    }
  }, [currentSection, evaluationResult, dispatch]);

  const currentSectionConfig = currentSection
    ? FEMALE_STERILIZATION_SECTIONS.find((s) => s.key === currentSection)
    : null;

  const sectionOrder = getFemaleSterilizationSectionOrderForAnswers(sterilizationAnswers);
  const currentIndex = currentSection ? sectionOrder.indexOf(currentSection) : 0;
  const isFirstSection = currentIndex <= 0;
  const isLastSection =
    currentIndex >= sectionOrder.length - 1 || sectionOrder.length === 0;

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      dispatch(setFemaleSterilizationAnswer({ questionId, value }));
    },
    [dispatch]
  );

  const runEvaluation = useCallback(() => {
    const result = evaluateFemaleSterilization(sterilizationAnswers);
    dispatch(setFemaleSterilizationEvaluationResult(result));
    dispatch(setFemaleSterilizationCurrentSection(null));
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

    const nextSection = getNextFemaleSterilizationSection(
      currentSection,
      sterilizationAnswers
    );

    if (nextSection) {
      dispatch(setFemaleSterilizationCurrentSection(nextSection));
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
    const prevSection = getPreviousFemaleSterilizationSection(
      currentSection,
      sterilizationAnswers
    );
    if (prevSection) {
      dispatch(setFemaleSterilizationCurrentSection(prevSection));
    }
  }, [currentSection, sterilizationAnswers, dispatch]);

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
    dispatch(resetFemaleSterilizationEligibility());
    setValidationErrors({});
  }, [dispatch]);

  // Show results if evaluation is complete
  if (evaluationResult) {
    return (
      <FemaleSterilizationResults
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
      <FemaleSterilizationSectionNavigator
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
