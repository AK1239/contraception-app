import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, BackHandler } from "react-native";
import { Button, Text, ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState } from "../store";

import { QuestionInput } from "./QuestionInput";
import { useQuestionnaire } from "../hooks/useQuestionnaire";
import PregnancyNotice from "./shared/PregnancyNotice";
import { LoadingOverlay } from "./shared";

export const MedicalQuestionnaire: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isCalculating } = useSelector((state: RootState) => state.results);
  const {
    currentQuestion,
    visibleQuestions,
    progress,
    currentQuestionIndex,
    validationError,
    isPregnant,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleReset,
    getCurrentValue,
  } = useQuestionnaire();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // If not on the first question, go to previous question
      if (currentQuestionIndex > 0) {
        handlePrevious();
        return true; // Prevent default behavior (going back to home)
      }
      // If on first question, allow default behavior (go back to home)
      return false;
    });

    return () => backHandler.remove();
  }, [currentQuestionIndex, handlePrevious]);

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <LoadingOverlay
          visible={true}
          message="Loading questionnaire..."
          modal={false}
        />
      </View>
    );
  }

  if (isPregnant) {
    return (
      <PregnancyNotice
        onGoHome={() => router.push("/(drawer)/")}
        onReset={handleReset}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LoadingOverlay
        visible={isCalculating}
        message="Calculating your eligibility results..."
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(100, insets.bottom + 100) }]}
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
        <View>
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
            disabled={currentQuestionIndex === 0 || isCalculating}
            style={styles.navButton}
          >
            Previous
          </Button>

          <Button
            mode="contained"
            onPress={handleNext}
            disabled={isCalculating}
            loading={isCalculating}
            style={styles.navButton}
          >
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
});
