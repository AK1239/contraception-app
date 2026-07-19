import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

type OnboardingControlsProps = {
  isLast: boolean;
  onNext: () => void;
  onDone: () => void;
  isDoneDisabled?: boolean;
};

export default function OnboardingControls({ isLast, onNext, onDone, isDoneDisabled }: OnboardingControlsProps) {
  const { t } = useTranslation();
  const isDisabled = isLast && isDoneDisabled;

  return (
    <View style={styles.container}>
      {isDisabled && (
        <Text style={styles.helperText}>{t("onboarding.selectRoleHint")}</Text>
      )}
      <Button
        mode="contained"
        onPress={isLast ? onDone : onNext}
        disabled={isDisabled}
        style={[styles.primaryButton, isDisabled && styles.primaryButtonDisabled]}
        contentStyle={styles.buttonContent}
        labelStyle={isDisabled ? styles.buttonLabelDisabled : undefined}
      >
        {isLast ? t("onboarding.tapToGetStarted") : t("onboarding.next")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 8,
  },
  helperText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
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
  primaryButtonDisabled: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
  },
  buttonLabelDisabled: {
    color: "#64748B",
  },
  buttonContent: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});


