import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { theme } from "../../utils/theme";

/**
 * Info box displayed at the top of the Choose Your Contraceptive questionnaire.
 * Explains how to use the feature, required lab tests, and MEC interpretation.
 */
export function MECInfoBox() {
  const { t } = useTranslation();
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleSmall" style={styles.sectionTitle}>
          {t("mec.howToUse")}
        </Text>
        <Text variant="bodySmall" style={styles.bodyText}>
          {t("mec.howToUseBody")}
        </Text>

        <Text variant="titleSmall" style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          {t("mec.labTests")}
        </Text>
        <Text variant="bodySmall" style={styles.bodyText}>
          {t("mec.labTestsBody")}
        </Text>

        <Text variant="titleSmall" style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          {t("mec.onceAnswered")}
        </Text>
        <Text variant="bodySmall" style={styles.bodyText}>
          {t("mec.onceAnsweredBody")}
        </Text>

        <Text variant="titleSmall" style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          {t("mec.interpretation")}
        </Text>
        <View style={styles.interpretationList}>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • {t("mec.mec1")}
          </Text>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • {t("mec.mec2")}
          </Text>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • {t("mec.mec3")}
          </Text>
          <Text variant="bodySmall" style={styles.interpretationItem}>
            • {t("mec.mec4")}
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
