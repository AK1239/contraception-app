import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import type { SterilizationEligibilityResult } from "../../types/sterilizationEligibility";
import { theme } from "../../utils/theme";

interface FemaleSterilizationResultsProps {
  result: SterilizationEligibilityResult;
  onStartOver?: () => void;
  onGoBack?: () => void;
}

export function FemaleSterilizationResults({
  result,
  onStartOver,
  onGoBack,
}: FemaleSterilizationResultsProps) {
  const { t } = useTranslation();
  const categoryColors = {
    A: theme.colors.success,
    C: theme.colors.warning,
    D: theme.colors.error,
    S: "#9333EA", // Purple for special referral
  };

  const borderColor = categoryColors[result.category];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text variant="titleLarge" style={styles.mainTitle}>
        {t("sterilization.female.resultTitle")}
      </Text>

      <Card
        style={[styles.resultCard, { borderLeftColor: borderColor }]}
        mode="outlined"
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.categoryHeader}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: borderColor + "25" },
              ]}
            >
              <Text
                variant="titleLarge"
                style={[styles.categoryText, { color: borderColor }]}
              >
                Category {result.category}
              </Text>
            </View>
          </View>

          <Text variant="titleMedium" style={styles.categoryLabel}>
            {result.categoryLabel}
          </Text>

          <Divider style={styles.sectionDivider} />

          <Text variant="labelLarge" style={styles.sectionTitle}>
            {t("sterilization.female.clinicalAction")}
          </Text>
          <Text variant="bodyMedium" style={styles.actionText}>
            {result.clinicalAction}
          </Text>

          {result.reasons.length > 0 && (
            <>
              <Divider style={styles.sectionDivider} />
              <Text variant="labelLarge" style={styles.sectionTitle}>
                {t("sterilization.female.conditionsIdentified")}
              </Text>
              {result.reasons.map((reason, index) => (
                <View key={index} style={styles.reasonItem}>
                  <Text variant="bodySmall" style={styles.bullet}>
                    •
                  </Text>
                  <Text variant="bodySmall" style={styles.reasonText}>
                    {reason}
                  </Text>
                </View>
              ))}
            </>
          )}

          <Divider style={styles.sectionDivider} />
          <Text variant="labelLarge" style={styles.sectionTitle}>
            {t("sterilization.female.detailedExplanation")}
          </Text>
          <Text variant="bodyMedium" style={styles.explanation}>
            {result.explanation}
          </Text>
        </Card.Content>
      </Card>

      {result.stiAdvisory && (
        <>
          <View style={styles.advisorySection}>
            <Text variant="titleMedium" style={styles.advisoryTitle}>
              {t("sterilization.female.importantAdvisory")}
            </Text>
            <View style={styles.advisoryBox}>
              <Text variant="bodyMedium" style={styles.advisoryText}>
                {result.stiAdvisory}
              </Text>
            </View>
          </View>
        </>
      )}

      {!result.counsellingConfirmed && (
        <View style={styles.warningBox}>
          <Text variant="bodySmall" style={styles.warningText}>
            {t("sterilization.female.counsellingWarning")}
          </Text>
        </View>
      )}

      <View style={styles.definitionsSection}>
        <Text variant="labelMedium" style={styles.definitionsTitle}>
          Category Definitions
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>A (Accept)</Text> – Proceed with
          standard procedure
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>C (Caution)</Text> – Proceed with
          enhanced precautions
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>D (Delay)</Text> – Delay procedure
          until condition resolved
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>S (Special)</Text> – Refer to
          specialist facility
        </Text>
      </View>

      {(onGoBack || onStartOver) && (
        <View style={styles.buttonRow}>
          {onGoBack && (
            <Button
              mode="outlined"
              onPress={onGoBack}
              icon="arrow-left"
              style={styles.goBackButton}
              labelStyle={styles.buttonLabel}
            >
              {t("sterilization.female.goBack")}
            </Button>
          )}
          {onStartOver && (
            <Button
              mode="outlined"
              onPress={onStartOver}
              icon="refresh"
              style={styles.startOverButton}
              labelStyle={styles.buttonLabel}
            >
              {t("sterilization.female.startOver")}
            </Button>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4C1D95",
  },
  resultCard: {
    borderLeftWidth: 6,
    marginBottom: 20,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  categoryHeader: {
    alignItems: "center",
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontWeight: "bold",
  },
  categoryLabel: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
    color: "#333",
  },
  sectionDivider: {
    marginVertical: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    color: "#4C1D95",
    fontWeight: "600",
  },
  actionText: {
    color: "#555",
    lineHeight: 22,
  },
  reasonItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    marginRight: 8,
    color: "#666",
  },
  reasonText: {
    flex: 1,
    color: "#555",
    lineHeight: 20,
  },
  explanation: {
    color: "#555",
    lineHeight: 22,
  },
  advisorySection: {
    marginBottom: 20,
  },
  advisoryTitle: {
    marginBottom: 12,
    fontWeight: "bold",
    color: "#4C1D95",
  },
  advisoryBox: {
    backgroundColor: "#FEF3C7",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    padding: 16,
    borderRadius: 8,
  },
  advisoryText: {
    color: "#92400E",
    lineHeight: 20,
  },
  warningBox: {
    backgroundColor: "#FEE2E2",
    borderLeftWidth: 4,
    borderLeftColor: "#DC2626",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  warningText: {
    color: "#991B1B",
    lineHeight: 18,
  },
  definitionsSection: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  definitionsTitle: {
    marginBottom: 12,
    color: "#4C1D95",
    fontWeight: "600",
  },
  definitionItem: {
    marginBottom: 8,
    color: "#555",
    lineHeight: 20,
  },
  definitionBold: {
    fontWeight: "600",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  goBackButton: {
    flex: 1,
    borderColor: "#4C1D95",
  },
  startOverButton: {
    flex: 1,
    borderColor: "#4C1D95",
  },
  buttonLabel: {
    color: "#4C1D95",
  },
});
