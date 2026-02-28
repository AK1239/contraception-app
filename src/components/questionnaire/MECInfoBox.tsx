import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { theme } from "../../utils/theme";

/**
 * Info box displayed at the top of the Choose Your Contraceptive questionnaire.
 * Explains how to use the feature, required lab tests, and MEC interpretation.
 */
export function MECInfoBox() {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleSmall" style={styles.sectionTitle}>
          How to use this feature
        </Text>
        <Text variant="bodySmall" style={styles.bodyText}>
          Take a thorough history from your client guided by the questions that will be displayed.
        </Text>

        <Text variant="titleSmall" style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          Lab tests which may be required to answer some questions
        </Text>
        <Text variant="bodySmall" style={styles.bodyText}>
          RBG • UPT • FBC • Lipid profile • Pelvic USS
        </Text>

        <Text variant="titleSmall" style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          Once all questions are answered
        </Text>
        <Text variant="bodySmall" style={styles.bodyText}>
          A list of contraceptives will be displayed with their safety level (MEC grade) based on your client's condition(s).
        </Text>

        <Text variant="titleSmall" style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          Interpretation
        </Text>
        <View style={styles.interpretationList}>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • MEC 1 = safe
          </Text>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • MEC 2 = benefits outweigh risk
          </Text>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • MEC 3 = risks outweigh benefits
          </Text>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • MEC 4 = unsafe
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  sectionTitle: {
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  sectionTitleSpaced: {
    marginTop: 16,
  },
  bodyText: {
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  interpretationList: {
    marginTop: 4,
  },
  interpretationItem: {
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
});
