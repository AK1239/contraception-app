import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import type { SectionKey } from "../../types/rules";
import { SECTION_ORDER } from "../../utils/sectionNavigation";
import { theme } from "../../utils/theme";

interface SectionNavigatorProps {
  currentSection: SectionKey | null;
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  isFirstSection: boolean;
  isLastSection: boolean;
  isSubmitting?: boolean;
}

export function SectionNavigator({
  currentSection,
  onPrevious,
  onNext,
  onComplete,
  isFirstSection,
  isLastSection,
  isSubmitting = false,
}: SectionNavigatorProps) {
  const currentIndex = currentSection ? SECTION_ORDER.indexOf(currentSection) : 0;
  const progress = SECTION_ORDER.length > 0 ? (currentIndex + 1) / SECTION_ORDER.length : 0;

  const handleNext = () => {
    if (isLastSection && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        color={theme.colors.primary}
        style={styles.progressBar}
      />
      <View style={styles.buttons}>
        <Button
          mode="outlined"
          onPress={onPrevious}
          disabled={isFirstSection || isSubmitting}
          style={styles.button}
        >
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={handleNext}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        >
          {isLastSection ? "See Results" : "Next"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    backgroundColor: theme.colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: theme.spacing.md,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  button: {
    flex: 1,
  },
});
