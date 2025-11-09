import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { RootState, AppDispatch } from '../store';
import {
  setAnswer,
  nextQuestion,
  previousQuestion,
  setComplete,
  resetQuestionnaire,
} from '../store/slices/questionnaire';
import { setCalculating, setMECScores, setError } from '../store/slices/results';
import { getVisibleQuestions } from '../constants/questions';
import { calculateEligibility } from '../services/eligibilityEngine';
import { handleError, getUserFriendlyMessage, ErrorCode } from '../services/errorHandler';
import { logger } from '../services/logger';
import { AnswerValue } from '../types';

export function useQuestionnaire() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { answers, currentQuestionIndex } = useSelector((state: RootState) => state.questionnaire);
  const [validationError, setValidationError] = useState<string>('');

  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const progress = visibleQuestions.length > 0 ? (currentQuestionIndex + 1) / visibleQuestions.length : 0;

  // Set default "No" for yes-no questions when they first appear
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'yes-no') {
      const currentValue = answers[currentQuestion.id];
      if (currentValue === undefined || currentValue === null) {
        dispatch(setAnswer({ questionId: currentQuestion.id, value: false }));
      }
    }
  }, [currentQuestion, answers, dispatch]);

  // Check if user is pregnant (should redirect to home)
  useEffect(() => {
    if (answers['pregnancy-check'] === 'pregnant') {
      Alert.alert(
        'Notice',
        'You cannot use contraceptives while you are pregnant. Please consult with your healthcare provider.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/'),
          },
        ]
      );
    }
  }, [answers, router]);

  const handleAnswerChange = (value: AnswerValue) => {
    if (!currentQuestion) return;

    setValidationError('');

    dispatch(setAnswer({ questionId: currentQuestion.id, value }));

    // Clear dependent answers if this answer changed
    if (currentQuestion.id === 'birthInPast2Years' && value === false) {
      dispatch(setAnswer({ questionId: 'birthDate', value: undefined as any }));
      dispatch(setAnswer({ questionId: 'isBreastfeeding', value: undefined as any }));
      dispatch(setAnswer({ questionId: 'postpartumRiskFactors', value: undefined as any }));
    }

    if (currentQuestion.id === 'hadAbortion' && value === false) {
      dispatch(setAnswer({ questionId: 'septicAbortion', value: undefined as any }));
      dispatch(setAnswer({ questionId: 'abortionWeek', value: undefined as any }));
    }
  };

  const validateCurrentAnswer = (): boolean => {
    if (!currentQuestion) return true;

    const currentValue = answers[currentQuestion.id];

    // Check if required field is filled
    if (
      currentQuestion.required &&
      (currentValue === undefined || currentValue === null || currentValue === '')
    ) {
      setValidationError('This field is required');
      return false;
    }

    // Validate numeric inputs
    if (currentQuestion.type === 'numeric' && currentValue !== undefined) {
      const numValue = Number(currentValue);
      if (
        'min' in currentQuestion &&
        currentQuestion.min !== undefined &&
        numValue < currentQuestion.min
      ) {
        setValidationError(`Value must be at least ${currentQuestion.min}`);
        return false;
      }
      if (
        'max' in currentQuestion &&
        currentQuestion.max !== undefined &&
        numValue > currentQuestion.max
      ) {
        setValidationError(`Value must be at most ${currentQuestion.max}`);
        return false;
      }
    }

    // Validate blood pressure
    if (currentQuestion.type === 'blood-pressure' && currentValue) {
      const bp = currentValue as { systolic: number; diastolic: number };
      if (!bp.systolic || !bp.diastolic) {
        setValidationError('Please enter both systolic and diastolic values');
        return false;
      }
      if (bp.systolic < 70 || bp.systolic > 250) {
        setValidationError('Systolic pressure should be between 70-250 mmHg');
        return false;
      }
      if (bp.diastolic < 40 || bp.diastolic > 150) {
        setValidationError('Diastolic pressure should be between 40-150 mmHg');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentAnswer()) return;

    if (currentQuestionIndex >= visibleQuestions.length - 1) {
      handleComplete();
      return;
    }

    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setValidationError('');
      dispatch(previousQuestion());
    }
  };

  const handleComplete = async () => {
    try {
      dispatch(setCalculating(true));

      const mecScores = calculateEligibility(answers);

      dispatch(setMECScores(mecScores));
      dispatch(setComplete(true));

      router.push({
        pathname: '/(screens)/results',
        params: { mecScores: JSON.stringify(mecScores) },
      });
    } catch (error) {
      const appError = handleError(
        error,
        ErrorCode.ELIGIBILITY_CALCULATION_FAILED,
        'MedicalQuestionnaire.handleComplete'
      );
      const userMessage = getUserFriendlyMessage(appError);

      logger.error('Error calculating eligibility', error, { answers });
      dispatch(setError(userMessage));
      dispatch(setCalculating(false));

      Alert.alert('Error', userMessage);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Questionnaire',
      'Are you sure you want to start over? All your answers will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            dispatch(resetQuestionnaire());
            setValidationError('');
          },
        },
      ]
    );
  };

  const getCurrentValue = (): AnswerValue | undefined => {
    return currentQuestion ? answers[currentQuestion.id] : undefined;
  };

  return {
    currentQuestion,
    visibleQuestions,
    progress,
    currentQuestionIndex,
    validationError,
    isPregnant: answers['pregnancy-check'] === 'pregnant',
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleReset,
    getCurrentValue,
  };
}

