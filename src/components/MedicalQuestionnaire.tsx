import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Text, ProgressBar, Card } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";

import { QuestionInput } from "./QuestionInput";
import { RootState, AppDispatch } from "../store";
import {
  setAnswer,
  nextQuestion,
  previousQuestion,
  setComplete,
  resetQuestionnaire,
} from "../store/slices/questionnaire";
import { setCalculating, setMECScores, setError } from "../store/slices/results";
import { getVisibleQuestions } from "../constants/questions";
import { calculateEligibility } from "../services/eligibilityEngine";
import { handleError, getUserFriendlyMessage, ErrorCode } from "../services/errorHandler";
import { logger } from "../services/logger";
import { AnswerValue } from "../types";

export const MedicalQuestionnaire: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { answers, currentQuestionIndex } = useSelector((state: RootState) => state.questionnaire);

  const [validationError, setValidationError] = useState<string>("");

  // Get visible questions based on current answers
  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentQuestionIndex];

  // Calculate progress
  const progress =
    visibleQuestions.length > 0 ? (currentQuestionIndex + 1) / visibleQuestions.length : 0;

  // Set default "No" for yes-no questions when they first appear
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === "yes-no") {
      const currentValue = answers[currentQuestion.id];
      if (currentValue === undefined || currentValue === null) {
        // Set default to "No" (false) for yes-no questions
        dispatch(setAnswer({ questionId: currentQuestion.id, value: false }));
      }
    }
  }, [currentQuestion, answers, dispatch]);

  // Check if user is pregnant (should redirect to home)
  useEffect(() => {
    if (answers["pregnancy-check"] === "pregnant") {
      Alert.alert(
        "Notice",
        "You cannot use contraceptives while you are pregnant. Please consult with your healthcare provider.",
        [
          {
            text: "OK",
            onPress: () => router.push("/"),
          },
        ]
      );
    }
  }, [answers, router]);

  const handleAnswerChange = (value: AnswerValue) => {
    if (!currentQuestion) return;

    // Clear validation error
    setValidationError("");

    // Save answer to Redux store
    dispatch(setAnswer({ questionId: currentQuestion.id, value }));

    // Clear dependent answers if this answer changed
    if (currentQuestion.id === "birthInPast2Years" && value === false) {
      // Clear birth-related answers
      dispatch(setAnswer({ questionId: "birthDate", value: undefined as any }));
      dispatch(setAnswer({ questionId: "isBreastfeeding", value: undefined as any }));
      dispatch(setAnswer({ questionId: "postpartumRiskFactors", value: undefined as any }));
    }

    if (currentQuestion.id === "hadAbortion" && value === false) {
      // Clear abortion-related answers
      dispatch(setAnswer({ questionId: "septicAbortion", value: undefined as any }));
      dispatch(setAnswer({ questionId: "abortionWeek", value: undefined as any }));
    }

    // Add similar logic for other conditional questions...
  };

  const validateCurrentAnswer = (): boolean => {
    if (!currentQuestion) return true;

    const currentValue = answers[currentQuestion.id];

    // Check if required field is filled
    if (
      currentQuestion.required &&
      (currentValue === undefined || currentValue === null || currentValue === "")
    ) {
      setValidationError("This field is required");
      return false;
    }

    // Validate numeric inputs
    if (currentQuestion.type === "numeric" && currentValue !== undefined) {
      const numValue = Number(currentValue);
      if (
        "min" in currentQuestion &&
        currentQuestion.min !== undefined &&
        numValue < currentQuestion.min
      ) {
        setValidationError(`Value must be at least ${currentQuestion.min}`);
        return false;
      }
      if (
        "max" in currentQuestion &&
        currentQuestion.max !== undefined &&
        numValue > currentQuestion.max
      ) {
        setValidationError(`Value must be at most ${currentQuestion.max}`);
        return false;
      }
    }

    // Validate blood pressure
    if (currentQuestion.type === "blood-pressure" && currentValue) {
      const bp = currentValue as { systolic: number; diastolic: number };
      if (!bp.systolic || !bp.diastolic) {
        setValidationError("Please enter both systolic and diastolic values");
        return false;
      }
      if (bp.systolic < 70 || bp.systolic > 250) {
        setValidationError("Systolic pressure should be between 70-250 mmHg");
        return false;
      }
      if (bp.diastolic < 40 || bp.diastolic > 150) {
        setValidationError("Diastolic pressure should be between 40-150 mmHg");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentAnswer()) return;

    // Check if this is the last question
    if (currentQuestionIndex >= visibleQuestions.length - 1) {
      handleComplete();
      return;
    }

    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setValidationError("");
      dispatch(previousQuestion());
    }
  };

  const handleComplete = async () => {
    try {
      // Mark as calculating
      dispatch(setCalculating(true));

      // Calculate eligibility using our engine
      const mecScores = calculateEligibility(answers);

      // Save results to store
      dispatch(setMECScores(mecScores));
      dispatch(setComplete(true));

      // Navigate to results page
      router.push({
        pathname: "/(screens)/results",
        params: { mecScores: JSON.stringify(mecScores) },
      });
    } catch (error) {
      // Use centralized error handling
      const appError = handleError(error, ErrorCode.ELIGIBILITY_CALCULATION_FAILED, "MedicalQuestionnaire.handleComplete");
      const userMessage = getUserFriendlyMessage(appError);
      
      logger.error("Error calculating eligibility", error, { answers });
      dispatch(setError(userMessage));
      dispatch(setCalculating(false));
      
      Alert.alert("Error", userMessage);
    }
  };

  const getCurrentValue = (): AnswerValue | undefined => {
    return currentQuestion ? answers[currentQuestion.id] : undefined;
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Questionnaire",
      "Are you sure you want to start over? All your answers will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            dispatch(resetQuestionnaire());
            setValidationError("");
          },
        },
      ]
    );
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Loading questionnaire...</Text>
      </View>
    );
  }

  // Don't show questionnaire if user is pregnant
  if (answers["pregnancy-check"] === "pregnant") {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.pregnancyCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.pregnancyTitle}>
              ⚠️ Important Notice
            </Text>
            <Text variant="bodyLarge" style={styles.pregnancyMessage}>
              You cannot use contraceptives while you are pregnant.
            </Text>
            <Text variant="bodyMedium" style={styles.pregnancyAdvice}>
              Please consult with your healthcare provider for guidance during pregnancy. You can
              return to use this tool after delivery when you're ready to plan your contraceptive
              options.
            </Text>

            <View style={styles.pregnancyActions}>
              <Button
                mode="contained"
                onPress={() => router.push("/(drawer)/")}
                style={styles.homeButton}
              >
                Return to Home
              </Button>

              <Button mode="outlined" onPress={handleReset} style={styles.resetButton}>
                Start Over (for testing)
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Reset */}
        <View style={styles.headerContainer}>
          <Text variant="titleMedium" style={styles.headerTitle}>
            Medical Safety Assessment
          </Text>
          <Button mode="text" onPress={handleReset} style={styles.headerResetButton}>
            Reset
          </Button>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {visibleQuestions.length}
          </Text>
          <ProgressBar progress={progress} style={styles.progressBar} />
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <QuestionInput
            question={currentQuestion}
            value={getCurrentValue()}
            onValueChange={handleAnswerChange}
            error={validationError}
          />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <Button
            mode="outlined"
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            style={styles.navButton}
          >
            Previous
          </Button>

          <Button mode="contained" onPress={handleNext} style={styles.navButton}>
            {currentQuestionIndex >= visibleQuestions.length - 1 ? "Complete" : "Next"}
          </Button>
        </View>

        {/* Extra bottom padding to ensure buttons are accessible */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Extra space for mobile navigation
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    color: "#1976d2",
  },
  headerResetButton: {
    marginRight: -8,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 1,
  },
  progressText: {
    textAlign: "center",
    marginBottom: 8,
    color: "#666",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  questionContainer: {
    flex: 1,
    minHeight: 250, // Ensure minimum height for questions
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 16,
  },
  bottomPadding: {
    height: 80, // Extra space at bottom for mobile navigation
  },
  navButton: {
    flex: 1,
  },
  noticeCard: {
    margin: 16,
    backgroundColor: "#fff3cd",
  },
  noticeText: {
    marginTop: 8,
    lineHeight: 20,
  },
  pregnancyCard: {
    margin: 16,
    backgroundColor: "#ffebee",
    elevation: 4,
  },
  pregnancyTitle: {
    textAlign: "center",
    marginBottom: 16,
    color: "#c62828",
  },
  pregnancyMessage: {
    textAlign: "center",
    marginBottom: 16,
    color: "#c62828",
    fontWeight: "bold",
  },
  pregnancyAdvice: {
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
    lineHeight: 20,
  },
  pregnancyActions: {
    gap: 12,
  },
  homeButton: {
    backgroundColor: "#1976d2",
  },
  resetButton: {
    borderColor: "#c62828",
  },
});
