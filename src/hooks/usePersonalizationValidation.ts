import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PersonalizationQuestion } from "../constants/questions";

/**
 * Custom hook to manage validation logic for personalization questions
 */
export const usePersonalizationValidation = (
  currentQuestion: PersonalizationQuestion | undefined
) => {
  const { personalization } = useSelector((state: RootState) => state.questionnaire);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion) {
      return false;
    }

    const value = personalization.answers[currentQuestion.id];

    if (currentQuestion.required && (value === undefined || value === null || value === "")) {
      setErrors((prev) => ({
        ...prev,
        [currentQuestion.id]: "This question is required",
      }));
      return false;
    }

    if (currentQuestion.type === "numeric" && value !== undefined) {
      const numValue = Number(value);
      
      if (currentQuestion.validation?.min && numValue < currentQuestion.validation.min) {
        setErrors((prev) => ({
          ...prev,
          [currentQuestion.id]: `Value must be at least ${currentQuestion.validation?.min}`,
        }));
        return false;
      }
      
      if (currentQuestion.validation?.max && numValue > currentQuestion.validation.max) {
        setErrors((prev) => ({
          ...prev,
          [currentQuestion.id]: `Value must be at most ${currentQuestion.validation?.max}`,
        }));
        return false;
      }

      // Special validation for BMI when frequency is "every-3-weeks"
      if (currentQuestion.id === "currentBMI") {
        const frequency = personalization.answers.preferredFrequency;
        if (frequency === "every-3-weeks" && numValue > 30) {
          setErrors((prev) => ({
            ...prev,
            [currentQuestion.id]:
              "Unfortunately, there's no safe method that can be used every 3 weeks for BMI >30. Please go back and select a different frequency.",
          }));
          return false;
        }
      }
    }

    // height-weight: require both, and BMI must be <= 30 for every-3-weeks
    if (currentQuestion.type === "height-weight" && currentQuestion.id === "heightWeight") {
      const hw = value as { height?: number; weight?: number } | undefined;
      if (!hw || hw.height === undefined || hw.weight === undefined || hw.height <= 0 || hw.weight <= 0) {
        setErrors((prev) => ({
          ...prev,
          [currentQuestion.id]: "Please enter both height and weight",
        }));
        return false;
      }
      const bmi = hw.weight / Math.pow(hw.height / 100, 2);
      if (bmi > 30) {
        setErrors((prev) => ({
          ...prev,
          [currentQuestion.id]:
            "Unfortunately, there's no safe method that can be used every 3 weeks for BMI >30. Please go back and select a different frequency.",
        }));
        return false;
      }
    }

    return true;
  };

  const clearError = (questionId: string) => {
    setErrors((prev) => {
      if (prev[questionId]) {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      }
      return prev;
    });
  };

  return {
    errors,
    validateCurrentQuestion,
    clearError,
  };
};

