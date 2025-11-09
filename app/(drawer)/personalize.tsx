import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
import { useEligibleMethods } from "../../src/hooks/useEligibleMethods";
import { usePersonalizationQuestions } from "../../src/hooks/usePersonalizationQuestions";
import { usePersonalizationValidation } from "../../src/hooks/usePersonalizationValidation";
import { usePersonalizationNavigation } from "../../src/hooks/usePersonalizationNavigation";
import { LoadingOverlay, LoadingSpinner } from "../../src/components/shared";
import {
  PersonalizationHeader,
  STIProtectionNotice,
  QuestionCard,
  NavigationButtons,
} from "../../src/components/personalization";

export default function PersonalizePage() {
  const { personalization } = useSelector((state: RootState) => state.questionnaire);
  
  // Check eligible methods and handle redirects
  const { eligibleMethods, isCheckingEligibility } = useEligibleMethods();
  
  // Manage question visibility and navigation
  const {
    visibleQuestions,
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    progress,
    goToNext,
    goToPrevious,
  } = usePersonalizationQuestions();
  
  // Handle validation
  const { errors, validateCurrentQuestion, clearError } = usePersonalizationValidation(
    currentQuestion
  );
  
  // Handle navigation and result generation
  const { isGeneratingResults, handleNext, handleAnswerChange } = usePersonalizationNavigation(
    eligibleMethods,
    currentQuestion?.id,
    isLastQuestion,
    validateCurrentQuestion,
    goToNext,
    clearError
  );

  // Show loading state while checking eligibility
  if (isCheckingEligibility) {
    return (
      <View style={styles.container}>
        <LoadingSpinner
          message="Loading personalization questions..."
          centered
        />
      </View>
    );
  }

  // Show loading state if no current question
  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <LoadingSpinner
          message="Preparing questions..."
          centered
        />
      </View>
    );
  }

  return (
    <>
      <LoadingOverlay
        visible={isGeneratingResults}
        message="Generating your personalized recommendations..."
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <PersonalizationHeader
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={visibleQuestions.length}
          progress={progress}
        />

        <STIProtectionNotice />

        <QuestionCard
          question={currentQuestion}
          value={personalization.answers[currentQuestion.id]}
          onValueChange={handleAnswerChange}
          error={errors[currentQuestion.id]}
        />

        <NavigationButtons
          onPrevious={goToPrevious}
          onNext={handleNext}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={isLastQuestion}
          isGeneratingResults={isGeneratingResults}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Extra space for mobile navigation
  },
});
