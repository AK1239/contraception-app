import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, ProgressBar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useLocalSearchParams } from "expo-router";
import { RootState } from "../../src/store";
import { setPersonalizationAnswer } from "../../src/store/slices/questionnaire";
import { PersonalizationInput } from "../../src/components/QuestionInput";
import { PERSONALIZATION_QUESTIONS, getFrequencyValue } from "../../src/constants/questions";
import { generatePersonalizedRecommendations } from "../../src/services/personalizationEngine";
import { ContraceptiveMethodKey, AnswerValue } from "../../src/types";

export default function PersonalizePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const { personalization } = useSelector((state: RootState) => state.questionnaire);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [eligibleMethods, setEligibleMethods] = useState<ContraceptiveMethodKey[]>([]);

  // Parse eligible methods from navigation params
  useEffect(() => {
    if (params.eligibleMethods) {
      try {
        const methods = JSON.parse(params.eligibleMethods as string);
        setEligibleMethods(methods);
      } catch (error) {
        console.error("Error parsing eligible methods:", error);
        // Fallback - redirect to medical safety
        router.push("/medical-safety");
      }
    } else {
      // No eligible methods - redirect to medical safety
      router.push("/medical-safety");
    }
  }, [params.eligibleMethods]);

  const currentQuestion = PERSONALIZATION_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === PERSONALIZATION_QUESTIONS.length - 1;
  const progress = (currentQuestionIndex + 1) / PERSONALIZATION_QUESTIONS.length;

  const handleAnswerChange = (value: AnswerValue) => {
    let processedValue = value;

    // Process frequency value
    if (currentQuestion.id === "preferredFrequency" && typeof value === "string") {
      processedValue = getFrequencyValue(value);
    }

    dispatch(
      setPersonalizationAnswer({
        questionId: currentQuestion.id,
        value: processedValue,
      })
    );

    // Clear any existing error
    if (errors[currentQuestion.id]) {
      const newErrors = { ...errors };
      delete newErrors[currentQuestion.id];
      setErrors(newErrors);
    }
  };

  const validateCurrentQuestion = (): boolean => {
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
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) {
      return;
    }

    if (isLastQuestion) {
      // Get personalization results and navigate to final recommendation
      const results = getPersonalizationResults();
      router.push({
        pathname: "/(screens)/final-recommendation",
        params: { recommendationData: JSON.stringify(results) },
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const getPersonalizationResults = () => {
    // Convert personalization answers to the format expected by the engine
    const personalizedAnswers = {
      wantsFuturePregnancy: personalization.answers.wantsFuturePregnancy,
      okayWithIrregularPeriods: personalization.answers.okayWithIrregularPeriods,
      wantsSurgicalMethod: personalization.answers.wantsSurgicalMethod,
      preferredFrequency: personalization.answers.preferredFrequency,
      currentBMI: personalization.answers.currentBMI,
    };

    return generatePersonalizedRecommendations(eligibleMethods, personalizedAnswers);
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Loading personalization questions...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Personalize Your Choice
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Answer a few questions about your lifestyle and preferences
          </Text>
          <ProgressBar progress={progress} style={styles.progressBar} />
          <Text variant="bodySmall" style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {PERSONALIZATION_QUESTIONS.length}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.questionCard}>
        <Card.Content>
          <PersonalizationInput
            question={currentQuestion}
            value={personalization.answers[currentQuestion.id]}
            onValueChange={handleAnswerChange}
            error={errors[currentQuestion.id]}
          />
        </Card.Content>
      </Card>

      <View style={styles.navigationContainer}>
        <Button
          mode="outlined"
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={styles.navigationButton}
        >
          Previous
        </Button>
        <Button mode="contained" onPress={handleNext} style={styles.navigationButton}>
          {isLastQuestion ? "Get Results" : "Next"}
        </Button>
      </View>
    </ScrollView>
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
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  progressBar: {
    marginBottom: 8,
  },
  progressText: {
    textAlign: "center",
    color: "#666",
  },
  questionCard: {
    margin: 16,
    marginBottom: 8,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 16,
  },
  navigationButton: {
    flex: 1,
  },
});
