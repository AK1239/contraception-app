import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import type { MaleSterilizationSectionKey } from "../../types/maleSterilizationEligibility";
import { theme } from "../../utils/theme";

interface MaleSterilizationSectionNavigatorProps {
  currentSection: MaleSterilizationSectionKey | null;
  sectionOrder: MaleSterilizationSectionKey[];
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  isFirstSection: boolean;
  isLastSection: boolean;
}

export function MaleSterilizationSectionNavigator({
  currentSection,
  sectionOrder,
  onPrevious,
  onNext,
  onComplete,
  isFirstSection,
  isLastSection,
}: MaleSterilizationSectionNavigatorProps) {
  const currentIndex = currentSection ? sectionOrder.indexOf(currentSection) : 0;
  const progress =
    sectionOrder.length > 0 ? (currentIndex + 1) / sectionOrder.length : 0;

  const handleNext = () => {
    if (isLastSection && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>
          Section {currentIndex + 1} of {sectionOrder.length}
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
          disabled={isFirstSection}
          style={[styles.button, styles.buttonPrevious]}
          labelStyle={styles.buttonLabel}
        >
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={handleNext}
          style={[styles.button, styles.buttonNext]}
          labelStyle={styles.buttonLabel}
          buttonColor="#6D28D9"
        >
          {isLastSection ? "See Results" : "Next"}
        </Button>
      </View>
    </View>
  );
}

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
    gap: 12,
  },
  button: {
    flex: 1,
  },
  buttonPrevious: {
    borderColor: "#6D28D9",
  },
  buttonNext: {
    elevation: 0,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
