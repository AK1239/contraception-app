import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isGeneratingResults: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
  isGeneratingResults,
}) => {
  return (
    <View style={styles.navigationContainer}>
      <Button
        mode="outlined"
        onPress={onPrevious}
        disabled={isFirstQuestion}
        style={styles.navigationButton}
      >
        Previous
      </Button>
      <Button
        mode="contained"
        onPress={onNext}
        disabled={isGeneratingResults}
        loading={isGeneratingResults}
        style={styles.navigationButton}
      >
        {isLastQuestion ? "Get Results" : "Next"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
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

