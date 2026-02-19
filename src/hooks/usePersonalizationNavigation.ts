import { useState } from "react";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import { RootState } from "../store";
import { setPersonalizationAnswer } from "../store/slices/questionnaire";
import { generatePersonalizedRecommendations } from "../services/personalizationEngine";
import { ContraceptiveMethodKey, AnswerValue, MECScore } from "../types";
import { getFrequencyValue } from "../constants/questions";
import { handleError, ErrorCode } from "../services/errorHandler";
import { logger } from "../services/logger";

/**
 * Custom hook to manage navigation and result generation for personalization
 */
export const usePersonalizationNavigation = (
  eligibleMethods: ContraceptiveMethodKey[],
  mecScores: Record<ContraceptiveMethodKey, MECScore>,
  currentQuestionId: string | undefined,
  isLastQuestion: boolean,
  validateCurrentQuestion: () => boolean,
  goToNext: () => void,
  clearError: (questionId: string) => void
) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { personalization } = useSelector((state: RootState) => state.questionnaire);
  
  const [isGeneratingResults, setIsGeneratingResults] = useState(false);

  const getPersonalizationResults = () => {
    const answers = {
      wantsFuturePregnancy: personalization.answers.wantsFuturePregnancy,
      okayWithIrregularPeriods: personalization.answers.okayWithIrregularPeriods,
      wantsSurgicalMethod: personalization.answers.wantsSurgicalMethod,
      preferredFrequency: personalization.answers.preferredFrequency,
      heightWeight: personalization.answers.heightWeight,
    };
    return generatePersonalizedRecommendations(eligibleMethods, answers, mecScores);
  };

  const navigateToResults = (showPermanentMethods = false) => {
    try {
      const results = getPersonalizationResults();
      router.push({
        pathname: "/(screens)/final-recommendation",
        params: {
          recommendationData: JSON.stringify(results),
          ...(showPermanentMethods && { showPermanentMethods: "true" }),
        },
      });
    } catch (error) {
      handleError(error, ErrorCode.PERSONALIZATION_FAILED, "usePersonalizationNavigation.navigateToResults");
      logger.error("Error generating personalization results", error);
      Alert.alert("Error", "Failed to generate recommendations. Please try again.");
    }
  };

  const handleAnswerChange = (value: AnswerValue) => {
    if (!currentQuestionId) return;

    let processedValue = value;

    // Process frequency value
    if (currentQuestionId === "preferredFrequency" && typeof value === "string") {
      processedValue = getFrequencyValue(value);
    }

    dispatch(
      setPersonalizationAnswer({
        questionId: currentQuestionId,
        value: processedValue,
      })
    );

    // Clear any existing error
    clearError(currentQuestionId);
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) {
      return;
    }

    const wantsFuturePregnancy = personalization.answers.wantsFuturePregnancy;
    const wantsSurgicalMethod = personalization.answers.wantsSurgicalMethod;
    const currentQ = currentQuestionId;

    // Early exit: User wants permanent method (surgery)
    if (
      wantsFuturePregnancy === false &&
      wantsSurgicalMethod === true &&
      currentQ === "wantsSurgicalMethod"
    ) {
      navigateToResults(true);
      return;
    }

    if (isLastQuestion) {
      // Show loading state while generating results
      setIsGeneratingResults(true);

      // Use setTimeout to ensure UI updates before calculation
      setTimeout(() => {
        try {
          navigateToResults(false);
        } finally {
          setIsGeneratingResults(false);
        }
      }, 100);
    } else {
      goToNext();
    }
  };

  return {
    isGeneratingResults,
    handleNext,
    handleAnswerChange,
  };
};

