import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store";
import {
  setECPAnswer,
  setECPEvaluationResult,
  resetECPSafety,
} from "../../src/store/slices/ecpSafety";
import { useTranslatedEcpSections } from "../../src/hooks/useTranslatedEcpSections";
import { SectionPage } from "../../src/components/questionnaire";
import { ECPResults } from "../../src/components/ecp/ECPResults";
import { evaluateECPSafety } from "../../src/engine/ecpSafetyEngine";
import { useSectionValidation } from "../../src/hooks/useSectionValidation";
import type { AnswerValue } from "../../src/types/questionnaire";
import type { ECPAnswerState } from "../../src/config/ecpSections";

export default function ECPSafetyScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { validateSection } = useSectionValidation();
  const ecpSections = useTranslatedEcpSections();

  const { answers, evaluationResult } = useSelector(
    (state: RootState) => state.ecpSafety
  );

  const ecpAnswers = answers as ECPAnswerState;
  const section = ecpSections[0];

  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      dispatch(setECPAnswer({ questionId, value }));
    },
    [dispatch]
  );

  const runEvaluation = useCallback(() => {
    const result = evaluateECPSafety(ecpAnswers);
    dispatch(setECPEvaluationResult(result));
  }, [ecpAnswers, dispatch]);

  const handleGetResults = useCallback(() => {
    if (!section) return;

    const errors = validateSection(
      section,
      answers as Record<string, AnswerValue | undefined>
    );
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    runEvaluation();
  }, [section, answers, validateSection, runEvaluation]);

  const handleStartOver = useCallback(() => {
    dispatch(resetECPSafety());
  }, [dispatch]);

  const handleGoBack = useCallback(() => {
    dispatch(setECPEvaluationResult(null));
  }, [dispatch]);

  if (evaluationResult) {
    return (
      <View style={styles.container}>
        <ECPResults
          result={evaluationResult}
          onStartOver={handleStartOver}
          onGoBack={handleGoBack}
        />
      </View>
    );
  }

  if (!section) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <SectionPage
        section={section}
        answers={answers as Record<string, AnswerValue | undefined>}
        onAnswerChange={handleAnswerChange}
        errors={validationErrors}
      />
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleGetResults}
          style={styles.submitButton}
          labelStyle={styles.submitLabel}
        >
          {t("ecp.getResults")}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#F3F4F6",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  submitButton: {
    borderRadius: 12,
    backgroundColor: "#6D28D9",
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
