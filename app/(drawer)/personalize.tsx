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
  QuestionCard,
  NavigationButtons,
} from "../../src/components/personalization";

export default function PersonalizePage() {
  const { personalization } = useSelector((state: RootState) => state.questionnaire);
  
  // Check eligible methods and handle redirects
  const { eligibleMethods, mecScores, isCheckingEligibility } = useEligibleMethods();
  
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
    mecScores,
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
      <View style={styles.container}>
        <ScrollView 
          key={currentQuestionIndex}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <PersonalizationHeader
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={visibleQuestions.length}
            progress={progress}
          />

          <QuestionCard
            question={currentQuestion}
            value={personalization.answers[currentQuestion.id]}
            onValueChange={handleAnswerChange}
            error={errors[currentQuestion.id]}
          />
        </ScrollView>

        <NavigationButtons
          onPrevious={goToPrevious}
          onNext={handleNext}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={isLastQuestion}
          isGeneratingResults={isGeneratingResults}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={visibleQuestions.length}
          progress={progress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
});
