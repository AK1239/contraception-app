import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setPersonalizationAnswer } from "../store/slices/questionnaire";
import { PersonalizationQuestion } from "../constants/questions";
import { getVisibleQuestions } from "../utils/questionVisibility";

/**
 * Custom hook to manage visible questions based on personalization answers
 * Handles question visibility logic, current question index, and default values
 */
export const usePersonalizationQuestions = () => {
  const { personalization } = useSelector((state: RootState) => state.questionnaire);
  const dispatch = useDispatch();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [visibleQuestions, setVisibleQuestions] = useState<PersonalizationQuestion[]>([]);

  // Update visible questions based on current answers
  useEffect(() => {
    const questions = getVisibleQuestions(personalization.answers);
    setVisibleQuestions(questions);

    // Adjust current question index if it's beyond visible questions
    if (currentQuestionIndex >= questions.length) {
      setCurrentQuestionIndex(Math.max(0, questions.length - 1));
    }
  }, [
    personalization.answers.wantsFuturePregnancy,
    personalization.answers.wantsSurgicalMethod,
    personalization.answers.wantsToContinueWithLongTerm,
    personalization.answers.preferredFrequency,
    currentQuestionIndex,
  ]);

  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === visibleQuestions.length - 1;
  const progress = visibleQuestions.length > 0 
    ? (currentQuestionIndex + 1) / visibleQuestions.length 
    : 0;

  // Set default "No" for yes-no questions when they first appear
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === "yes-no") {
      const currentValue = personalization.answers[currentQuestion.id];
      if (currentValue === undefined || currentValue === null) {
        // Set default to "No" (false) for yes-no questions
        dispatch(
          setPersonalizationAnswer({
            questionId: currentQuestion.id,
            value: false,
          })
        );
      }
    }
  }, [currentQuestion, personalization.answers, dispatch]);

  const goToNext = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return {
    visibleQuestions,
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    progress,
    goToNext,
    goToPrevious,
  };
};

