import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type OnboardingControlsProps = {
  isLast: boolean;
  onNext: () => void;
  onDone: () => void;
};

export default function OnboardingControls({ isLast, onNext, onDone }: OnboardingControlsProps) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={isLast ? onDone : onNext}
        style={styles.primaryButton}
        contentStyle={styles.buttonContent}
      >
        {isLast ? "Tap to get started" : "Next"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
  },
  buttonContent: {
    paddingVertical: 8,
  },
});


