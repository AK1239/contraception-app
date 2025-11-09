import React from "react";
import { Card, Text, ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";

interface PersonalizationHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
}

export const PersonalizationHeader: React.FC<PersonalizationHeaderProps> = ({
  currentQuestionIndex,
  totalQuestions,
  progress,
}) => {
  return (
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
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
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
});

