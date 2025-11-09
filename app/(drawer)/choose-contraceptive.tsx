import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, RadioButton, Surface } from "react-native-paper";
import { useRouter } from "expo-router";

type ContraceptiveType = "natural" | "modern" | null;
type BreastfeedingStatus = "yes" | "no" | null;

export default function ChooseContraceptivePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<ContraceptiveType>(null);
  const [isBreastfeeding, setIsBreastfeeding] = useState<BreastfeedingStatus>(null);
  const [showBreastfeedingQuestion, setShowBreastfeedingQuestion] = useState(false);

  const handleTypeSelection = (type: ContraceptiveType) => {
    setSelectedType(type);
    setIsBreastfeeding(null);

    if (type === "natural") {
      setShowBreastfeedingQuestion(true);
    } else {
      setShowBreastfeedingQuestion(false);
    }
  };

  const handleBreastfeedingSelection = (status: BreastfeedingStatus) => {
    setIsBreastfeeding(status);
  };

  const handleProceed = () => {
    if (selectedType === "natural") {
      if (isBreastfeeding === "yes") {
        // Navigate to LAM method detail page
        router.push("/(screens)/contraceptive/lactational-amenorrhea");
      } else if (isBreastfeeding === "no") {
        // Navigate to Calendar method detail page
        router.push("/(screens)/contraceptive/calendar-method");
      }
    } else if (selectedType === "modern") {
      // Navigate to medical safety assessment
      router.push("/medical-safety");
    }
  };

  const canProceed = () => {
    if (selectedType === "natural") {
      return isBreastfeeding !== null;
    }
    return selectedType === "modern";
  };

  const getRecommendationText = () => {
    if (selectedType === "natural") {
      if (isBreastfeeding === "yes") {
        return "We recommend Lactational Amenorrhea Method (LAM) for breastfeeding mothers.";
      } else if (isBreastfeeding === "no") {
        return "We recommend the Calendar Method for natural family planning.";
      }
    } else if (selectedType === "modern") {
      return "We'll guide you through a medical safety assessment to find the best modern contraceptive methods for you.";
    }
    return "";
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Choose Your Contraceptive
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Get personalized recommendations based on your preferences and health profile
          </Text>
        </Card.Content>
      </Card>

      {/* Main Question */}
      <Card style={styles.questionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.questionTitle}>
            Which type of contraceptive do you prefer?
          </Text>
          <Text variant="bodyMedium" style={styles.questionDescription}>
            Choose the approach that best fits your lifestyle and preferences.
          </Text>

          <View style={styles.optionsContainer}>
            {/* Natural Option */}
            <Surface
              style={[styles.optionCard, selectedType === "natural" && styles.selectedOption]}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <RadioButton
                    value="natural"
                    status={selectedType === "natural" ? "checked" : "unchecked"}
                    onPress={() => handleTypeSelection("natural")}
                  />
                  <View style={styles.optionTextContainer}>
                    <Text variant="titleMedium" style={styles.optionTitle}>
                      🌿 Natural Methods
                    </Text>
                    <Text variant="bodyMedium" style={styles.optionDescription}>
                      Hormone-free family planning methods that work with your body's natural
                      fertility cycles.
                    </Text>
                  </View>
                </View>

                <View style={styles.methodsList}>
                  <Text variant="bodySmall" style={styles.methodsTitle}>
                    Includes:
                  </Text>
                  <Text variant="bodySmall" style={styles.methodItem}>
                    • Lactational Amenorrhea Method (LAM)
                  </Text>
                  <Text variant="bodySmall" style={styles.methodItem}>
                    • Calendar/Rhythm Method
                  </Text>
                  <Text variant="bodySmall" style={styles.methodItem}>
                    • Fertility awareness-based methods
                  </Text>
                </View>
              </View>
            </Surface>

            {/* Modern Option */}
            <Surface
              style={[styles.optionCard, selectedType === "modern" && styles.selectedOption]}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <RadioButton
                    value="modern"
                    status={selectedType === "modern" ? "checked" : "unchecked"}
                    onPress={() => handleTypeSelection("modern")}
                  />
                  <View style={styles.optionTextContainer}>
                    <Text variant="titleMedium" style={styles.optionTitle}>
                      💊 Modern Methods
                    </Text>
                    <Text variant="bodyMedium" style={styles.optionDescription}>
                      Evidence-based contraceptive methods with proven effectiveness and safety
                      profiles.
                    </Text>
                  </View>
                </View>

                <View style={styles.methodsList}>
                  <Text variant="bodySmall" style={styles.methodsTitle}>
                    Includes:
                  </Text>
                  <Text variant="bodySmall" style={styles.methodItem}>
                    • Birth control pills, patches, rings
                  </Text>
                  <Text variant="bodySmall" style={styles.methodItem}>
                    • IUDs and implants
                  </Text>
                  <Text variant="bodySmall" style={styles.methodItem}>
                    • Injections and barrier methods
                  </Text>
                </View>
              </View>
            </Surface>
          </View>
        </Card.Content>
      </Card>

      {/* Breastfeeding Question (only shown for Natural methods) */}
      {showBreastfeedingQuestion && (
        <Card style={styles.followUpCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.followUpTitle}>
              Are you currently breastfeeding?
            </Text>
            <Text variant="bodyMedium" style={styles.followUpDescription}>
              This helps us recommend the most appropriate natural method for your situation.
            </Text>

            <View style={styles.breastfeedingOptions}>
              <Surface
                style={[
                  styles.breastfeedingOption,
                  isBreastfeeding === "yes" && styles.selectedOption,
                ]}
              >
                <RadioButton
                  value="yes"
                  status={isBreastfeeding === "yes" ? "checked" : "unchecked"}
                  onPress={() => handleBreastfeedingSelection("yes")}
                />
                <View style={styles.breastfeedingContent}>
                  <Text variant="titleSmall" style={styles.breastfeedingTitle}>
                    Yes, I'm breastfeeding
                  </Text>
                  <Text variant="bodySmall" style={styles.breastfeedingDescription}>
                    We'll recommend Lactational Amenorrhea Method (LAM)
                  </Text>
                </View>
              </Surface>

              <Surface
                style={[
                  styles.breastfeedingOption,
                  isBreastfeeding === "no" && styles.selectedOption,
                ]}
              >
                <RadioButton
                  value="no"
                  status={isBreastfeeding === "no" ? "checked" : "unchecked"}
                  onPress={() => handleBreastfeedingSelection("no")}
                />
                <View style={styles.breastfeedingContent}>
                  <Text variant="titleSmall" style={styles.breastfeedingTitle}>
                    No, I'm not breastfeeding
                  </Text>
                  <Text variant="bodySmall" style={styles.breastfeedingDescription}>
                    We'll recommend the Calendar Method
                  </Text>
                </View>
              </Surface>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Recommendation Preview */}
      {canProceed() && (
        <Card style={styles.recommendationCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.recommendationTitle}>
              📋 Your Path Forward
            </Text>
            <Text variant="bodyMedium" style={styles.recommendationText}>
              {getRecommendationText()}
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Action Buttons */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleProceed}
              disabled={!canProceed()}
              style={[styles.proceedButton, !canProceed() && styles.disabledButton]}
              contentStyle={styles.buttonContent}
            >
              {selectedType === "natural" ? "View Recommended Method" : "Start Medical Assessment"}
            </Button>

            <View style={styles.alternativeActions}>
              <Button
                mode="outlined"
                onPress={() => router.push("/natural-methods")}
                style={styles.secondaryButton}
              >
                Learn About Methods
              </Button>

              <Button
                mode="text"
                onPress={() => router.push("/compare-methods")}
                style={styles.tertiaryButton}
              >
                Compare Methods
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Information Notice */}
      <Surface style={styles.infoNotice}>
        <Text variant="bodySmall" style={styles.infoText}>
          <Text style={{ fontWeight: "bold" }}>Note: </Text>
          This tool provides educational guidance based on WHO guidelines. For personalized medical
          advice, please consult with a qualified healthcare provider.
        </Text>
      </Surface>
    </ScrollView>
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
    backgroundColor: "#e3f2fd",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: "#1976d2",
  },
  subtitle: {
    textAlign: "center",
    color: "#1565c0",
    lineHeight: 20,
  },
  questionCard: {
    margin: 16,
    marginBottom: 8,
  },
  questionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2e7d32",
  },
  questionDescription: {
    marginBottom: 20,
    color: "#666",
    lineHeight: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#e8f5e8",
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  optionContent: {
    gap: 12,
  },
  optionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  optionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  optionDescription: {
    color: "#666",
    lineHeight: 18,
  },
  methodsList: {
    marginLeft: 40,
    gap: 4,
  },
  methodsTitle: {
    fontWeight: "500",
    color: "#555",
    marginBottom: 4,
  },
  methodItem: {
    color: "#777",
    lineHeight: 16,
  },
  followUpCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#f3e5f5",
  },
  followUpTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#7b1fa2",
  },
  followUpDescription: {
    marginBottom: 16,
    color: "#666",
    lineHeight: 20,
  },
  breastfeedingOptions: {
    gap: 12,
  },
  breastfeedingOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  breastfeedingContent: {
    flex: 1,
    marginLeft: 8,
  },
  breastfeedingTitle: {
    fontWeight: "500",
    marginBottom: 2,
  },
  breastfeedingDescription: {
    color: "#666",
    lineHeight: 16,
  },
  recommendationCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#fff3e0",
  },
  recommendationTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#e65100",
  },
  recommendationText: {
    color: "#333",
    lineHeight: 20,
  },
  actionCard: {
    margin: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    gap: 16,
  },
  proceedButton: {
    backgroundColor: "#4CAF50",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonContent: {
    paddingVertical: 8,
  },
  alternativeActions: {
    gap: 8,
  },
  secondaryButton: {
    borderColor: "#1976d2",
  },
  tertiaryButton: {
    // No additional styles needed
  },
  infoNotice: {
    margin: 16,
    padding: 12,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
    elevation: 1,
  },
  infoText: {
    lineHeight: 18,
    color: "#e65100",
  },
});
