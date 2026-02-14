import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import { theme } from "../../utils/theme";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isGeneratingResults: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
  isGeneratingResults,
  currentQuestionIndex,
  totalQuestions,
  progress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>
          Step {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          mode="outlined"
          onPress={onPrevious}
          disabled={isFirstQuestion || isGeneratingResults}
          style={[styles.button, styles.buttonPrevious]}
          labelStyle={styles.buttonLabel}
        >
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={onNext}
          loading={isGeneratingResults}
          disabled={isGeneratingResults}
          style={[styles.button, styles.buttonNext]}
          labelStyle={styles.buttonLabel}
          buttonColor="#6D28D9"
        >
          {isLastQuestion ? "Get Results" : "Next"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "500",
  },
  progressBar: {
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 10,
  },
  buttonPrevious: {
    borderColor: "#D1D5DB",
  },
  buttonNext: {
    elevation: 0,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});

