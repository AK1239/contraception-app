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
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});


