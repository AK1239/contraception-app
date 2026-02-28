import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { RootState } from "../../src/store";
import {
  setAnswer,
  clearAnswer,
  setMECCurrentSection,
  setMECSectionComplete,
  setMECEvaluationResult,
  resetQuestionnaire,
  resetPersonalization,
} from "../../src/store/slices/questionnaire";
import { useTranslatedSections } from "../../src/hooks/useTranslatedSections";
import { SectionPage, MECInfoBox } from "../../src/components/questionnaire";
import { SectionNavigator } from "../../src/components/questionnaire/SectionNavigator";
import { MECResults } from "../../src/components/results";
import { createRulesEngine } from "../../src/engine/rulesEngine";
import { ALL_RULES } from "../../src/rules";
import {
  getNextSection,
  getPreviousSection,
  getFirstSection,
  getLastSection,
  hasCompletedAllSections,
} from "../../src/utils/sectionNavigation";
import { useSectionValidation } from "../../src/hooks/useSectionValidation";
import { getVisibleSectionQuestions } from "../../src/utils/sectionQuestionVisibility";
import type { AnswerValue } from "../../src/types/questionnaire";
import type { AnswerState } from "../../src/types/rules";

export default function ChooseContraceptiveScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { validateSection } = useSectionValidation();
  const { answers, mecCurrentSection, mecEvaluationResult } = useSelector(
    (state: RootState) => state.questionnaire
  );
  const translatedSections = useTranslatedSections();

  // Initialize to first section if not set
  useEffect(() => {
    if (!mecCurrentSection && !mecEvaluationResult) {
      dispatch(setMECCurrentSection(getFirstSection()));
    }
  }, [mecCurrentSection, mecEvaluationResult, dispatch]);

  const currentSection = mecCurrentSection
    ? translatedSections.find((s) => s.key === mecCurrentSection)
    : null;

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      dispatch(setAnswer({ questionId, value }));

      // Clear answers for questions that become hidden due to this change (cascade)
      // Works for all conditional chains: liver tumor, breast swelling, etc.
      if (currentSection) {
        const updatedAnswers = { ...answers, [questionId]: value };
        const visibleQuestions = getVisibleSectionQuestions(
          currentSection.questions,
          updatedAnswers
        );
        const visibleIds = new Set(visibleQuestions.map((q) => q.id));

        // Clear any question that has an answer but is no longer visible
        for (const q of currentSection.questions) {
          if (!visibleIds.has(q.id) && answers[q.id] !== undefined) {
            dispatch(clearAnswer(q.id));
          }
        }
      }
    },
    [dispatch, currentSection, answers]
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
    } else {
      // Back to intro screen when on first section
      setShowIntro(true);
    }
  }, [mecCurrentSection, dispatch]);

  const handleStartOver = useCallback(() => {
    dispatch(resetQuestionnaire());
    dispatch(resetPersonalization());
  }, [dispatch]);

  const handleBackToQuestions = useCallback(() => {
    dispatch(setMECEvaluationResult(null));
    const lastSection = getLastSection();
    if (lastSection) {
      dispatch(setMECCurrentSection(lastSection));
    }
  }, [dispatch]);

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
          onBackToQuestions={handleBackToQuestions}
          onStartOver={handleStartOver}
        />
      </View>
    );
  }

  // Show intro screen before any sections
  if (showIntro) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.introContent}
          showsVerticalScrollIndicator={false}
        >
          <MECInfoBox />
        </ScrollView>
        <View style={styles.introFooter}>
          <Button
            mode="contained"
            onPress={() => setShowIntro(false)}
            style={styles.getStartedButton}
            labelStyle={styles.getStartedLabel}
            buttonColor="#6D28D9"
            icon="arrow-right"
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            {t("mec.getStarted")}
          </Button>
        </View>
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

  const isLastSection = hasCompletedAllSections(mecCurrentSection);

  return (
    <View style={styles.container}>
      <SectionPage
        key={mecCurrentSection}
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
        isFirstSection={false}
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
  introContent: {
    padding: 16,
    paddingBottom: 8,
  },
  introFooter: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  getStartedButton: {
    borderRadius: 10,
    elevation: 0,
  },
  getStartedLabel: {
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 4,
  },
});
