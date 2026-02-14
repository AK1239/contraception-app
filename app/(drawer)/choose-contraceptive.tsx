import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store";
import {
  setAnswer,
  setMECCurrentSection,
  setMECSectionComplete,
  setMECEvaluationResult,
} from "../../src/store/slices/questionnaire";
import { SECTIONS, MEDICAL_SECTIONS } from "../../src/config/sections";
import { SectionPage } from "../../src/components/questionnaire";
import { SectionNavigator } from "../../src/components/questionnaire/SectionNavigator";
import { MECResults } from "../../src/components/results";
import { createRulesEngine } from "../../src/engine/rulesEngine";
import { ALL_RULES } from "../../src/rules";
import {
  getNextSection,
  getPreviousSection,
  getFirstSection,
  hasCompletedAllSections,
} from "../../src/utils/sectionNavigation";
import { useSectionValidation } from "../../src/hooks/useSectionValidation";
import type { AnswerValue } from "../../src/types/questionnaire";
import type { AnswerState } from "../../src/types/rules";

export default function ChooseContraceptiveScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { validateSection } = useSectionValidation();
  const { answers, mecCurrentSection, mecEvaluationResult } = useSelector(
    (state: RootState) => state.questionnaire
  );

  // Initialize to first section if not set
  useEffect(() => {
    if (!mecCurrentSection && !mecEvaluationResult) {
      dispatch(setMECCurrentSection(getFirstSection()));
    }
  }, [mecCurrentSection, mecEvaluationResult, dispatch]);

  const currentSection = mecCurrentSection
    ? SECTIONS.find((s) => s.key === mecCurrentSection)
    : null;

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      dispatch(setAnswer({ questionId, value }));
    },
    [dispatch]
  );

  const handleNext = useCallback(() => {
    if (!mecCurrentSection || !currentSection) return;

    const errors = validateSection(currentSection, answers as AnswerState);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    dispatch(setMECSectionComplete(mecCurrentSection));

    const nextSection = getNextSection(mecCurrentSection);
    if (nextSection) {
      dispatch(setMECCurrentSection(nextSection));
    } else {
      // Last section - run evaluation and show results
      const engine = createRulesEngine(ALL_RULES);
      const answerState: AnswerState = { ...answers };
      const result = engine.evaluate(answerState);
      dispatch(setMECEvaluationResult(result));
      dispatch(setMECCurrentSection(null));
    }
  }, [mecCurrentSection, currentSection, answers, dispatch, validateSection]);

  const handlePrevious = useCallback(() => {
    const prevSection = getPreviousSection(mecCurrentSection);
    if (prevSection) {
      dispatch(setMECCurrentSection(prevSection));
    }
  }, [mecCurrentSection, dispatch]);

  const handleComplete = useCallback(() => {
    if (!mecCurrentSection || !currentSection) return;

    const errors = validateSection(currentSection, answers as AnswerState);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    dispatch(setMECSectionComplete(mecCurrentSection));
    const engine = createRulesEngine(ALL_RULES);
    const answerState: AnswerState = { ...answers };
    const result = engine.evaluate(answerState);
    dispatch(setMECEvaluationResult(result));
    dispatch(setMECCurrentSection(null));
  }, [mecCurrentSection, currentSection, answers, dispatch, validateSection]);

  // Show results if evaluation is complete
  if (mecEvaluationResult) {
    return (
      <View style={styles.container}>
        <MECResults
          result={mecEvaluationResult}
          onPersonalize={() => router.push("/(drawer)/personalize")}
        />
      </View>
    );
  }

  // Show section or empty state
  if (!currentSection) {
    return (
      <View style={styles.container}>
        {/* Loading or initializing */}
      </View>
    );
  }

  const currentIndex = MEDICAL_SECTIONS.findIndex((s) => s.key === mecCurrentSection);
  const isFirstSection = currentIndex <= 0;
  const isLastSection = hasCompletedAllSections(mecCurrentSection);

  return (
    <View style={styles.container}>
      <SectionPage
        section={currentSection}
        answers={answers as AnswerState}
        onAnswerChange={handleAnswerChange}
        errors={validationErrors}
      />
      <SectionNavigator
        currentSection={mecCurrentSection}
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
    backgroundColor: "#F9FAFB",
  },
});
