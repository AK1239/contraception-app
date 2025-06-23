import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, ProgressBar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useLocalSearchParams } from "expo-router";
import { RootState } from "../../src/store";
import { setPersonalizationAnswer } from "../../src/store/slices/questionnaire";
import { PersonalizationInput } from "../../src/components/QuestionInput";
import { PERSONALIZATION_QUESTIONS, getFrequencyValue } from "../../src/constants/questions";
import {
  generatePersonalizedRecommendations,
  needsSTIProtectionNotice,
} from "../../src/services/personalizationEngine";
import { getMethodByKey } from "../../src/constants";
import { ContraceptiveMethodKey, AnswerValue } from "../../src/types";

export default function PersonalizePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const { personalization } = useSelector((state: RootState) => state.questionnaire);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
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
      setShowResults(true);
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

  const renderMethodCard = (methodKey: ContraceptiveMethodKey, reason?: string) => {
    const method = getMethodByKey(methodKey);
    if (!method) return null;

    return (
      <Card key={methodKey} style={styles.methodCard}>
        <Card.Content>
          <Text variant="titleMedium">{method.name}</Text>
          <Text variant="bodyMedium" style={styles.methodDescription}>
            {method.description}
          </Text>
          {reason && (
            <Text variant="bodySmall" style={styles.reasonText}>
              {reason}
            </Text>
          )}
        </Card.Content>
      </Card>
    );
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Loading personalization questions...</Text>
      </View>
    );
  }

  if (showResults) {
    const results = getPersonalizationResults();
    const stiNotice = needsSTIProtectionNotice();

    return (
      <ScrollView style={styles.container}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              Your Personalized Recommendations
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Based on your lifestyle preferences and medical eligibility
            </Text>
          </Card.Content>
        </Card>

        {/* Recommended Methods */}
        {results.recommended.length > 0 && (
          <Card style={styles.categoryCard}>
            <Card.Content>
              <Text variant="titleLarge" style={[styles.categoryTitle, { color: "#4CAF50" }]}>
                ✓ Recommended for You
              </Text>
              <Text variant="bodyMedium" style={styles.categoryDescription}>
                These methods match both your health profile and lifestyle preferences.
              </Text>
              {results.recommended.map((methodKey) => renderMethodCard(methodKey))}
            </Card.Content>
          </Card>
        )}

        {/* Eliminated Methods */}
        {results.eliminated.length > 0 && (
          <Card style={styles.categoryCard}>
            <Card.Content>
              <Text variant="titleLarge" style={[styles.categoryTitle, { color: "#FF9800" }]}>
                ⚠ Not Recommended Based on Your Preferences
              </Text>
              <Text variant="bodyMedium" style={styles.categoryDescription}>
                These methods don't match your stated preferences.
              </Text>
              {results.eliminated.map(({ method, reason }) => renderMethodCard(method, reason))}
            </Card.Content>
          </Card>
        )}

        {/* Important Notices */}
        {results.notices.length > 0 && (
          <Card style={styles.noticeCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.noticeTitle}>
                Important Information
              </Text>
              {results.notices.map((notice, index) => (
                <Text key={index} variant="bodyMedium" style={styles.noticeText}>
                  • {notice}
                </Text>
              ))}
            </Card.Content>
          </Card>
        )}

        {/* STI Protection Notice */}
        <Card style={styles.stiCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.stiTitle}>
              STI Protection
            </Text>
            <Text variant="bodyMedium" style={styles.stiText}>
              {stiNotice}
            </Text>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <Card style={styles.actionCard}>
          <Card.Content>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => router.push("/compare-methods")}
                style={styles.primaryButton}
              >
                Compare Methods
              </Button>
              <Button
                mode="outlined"
                onPress={() => setShowResults(false)}
                style={styles.secondaryButton}
              >
                Modify Preferences
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  categoryCard: {
    margin: 16,
    marginBottom: 8,
  },
  categoryTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryDescription: {
    marginBottom: 16,
    color: "#666",
  },
  methodCard: {
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  methodDescription: {
    marginBottom: 8,
    color: "#333",
  },
  reasonText: {
    color: "#FF9800",
    fontStyle: "italic",
  },
  noticeCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#fff3e0",
  },
  noticeTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#e65100",
  },
  noticeText: {
    marginBottom: 4,
    color: "#e65100",
  },
  stiCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e8f5e8",
  },
  stiTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  stiText: {
    color: "#2e7d32",
    lineHeight: 20,
  },
  actionCard: {
    margin: 16,
    backgroundColor: "#e3f2fd",
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 4,
  },
  secondaryButton: {
    paddingVertical: 4,
  },
});
