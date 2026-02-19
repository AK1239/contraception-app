import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button, Chip } from "react-native-paper";
import type { MaleSterilizationEligibilityResult } from "../../types/maleSterilizationEligibility";
import { theme } from "../../utils/theme";

interface MaleSterilizationResultsProps {
  result: MaleSterilizationEligibilityResult;
  onStartOver?: () => void;
}

export function MaleSterilizationResults({
  result,
  onStartOver,
}: MaleSterilizationResultsProps) {
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
        Male Sterilization (Vasectomy) Eligibility Result
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
            Clinical Recommendation
          </Text>
          <Text variant="bodyMedium" style={styles.recommendationText}>
            {result.clinicalRecommendation}
          </Text>

          {result.reasons.length > 0 && (
            <>
              <Divider style={styles.sectionDivider} />
              <Text variant="labelLarge" style={styles.sectionTitle}>
                Conditions Identified
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
            Detailed Explanation
          </Text>
          <Text variant="bodyMedium" style={styles.explanation}>
            {result.explanation}
          </Text>

          {/* Status Chips */}
          <View style={styles.chipsContainer}>
            {result.temporaryContraceptionRecommended && (
              <Chip
                icon="pill"
                style={[styles.chip, styles.chipWarning]}
                textStyle={styles.chipText}
              >
                Temporary Contraception Needed
              </Chip>
            )}
            {result.referralRequired && (
              <Chip
                icon="hospital-box"
                style={[styles.chip, styles.chipError]}
                textStyle={styles.chipText}
              >
                Facility Referral Required
              </Chip>
            )}
          </View>
        </Card.Content>
      </Card>

      {/* STI Advisory - Always Shown */}
      <View style={styles.advisorySection}>
        <Text variant="titleMedium" style={styles.advisoryTitle}>
          STI/HIV Prevention Advisory
        </Text>
        <View style={styles.stiAdvisoryBox}>
          <Text variant="bodyMedium" style={styles.advisoryText}>
            ⚠️ {result.stiAdvisory}
          </Text>
        </View>
      </View>

      {/* Counselling Alerts */}
      {result.counsellingAlerts.length > 0 && (
        <View style={styles.counsellingSection}>
          <Text variant="titleMedium" style={styles.counsellingTitle}>
            Mandatory Counselling Points
          </Text>
          <View style={styles.counsellingBox}>
            {result.counsellingAlerts.map((alert, index) => (
              <View key={index} style={styles.counsellingItem}>
                <Text variant="bodySmall" style={styles.counsellingBullet}>
                  ✓
                </Text>
                <Text variant="bodySmall" style={styles.counsellingText}>
                  {alert}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.definitionsSection}>
        <Text variant="labelMedium" style={styles.definitionsTitle}>
          Category Definitions
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>A (Accept)</Text> – Procedure can
          proceed with standard protocol
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>C (Caution)</Text> – Special
          counselling required
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>D (Delay)</Text> – Treat condition
          first, provide temporary contraception
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>S (Special)</Text> – Referral to
          higher-level facility required
        </Text>
      </View>

      {onStartOver && (
        <Button
          mode="outlined"
          onPress={onStartOver}
          icon="refresh"
          style={styles.startOverButton}
          labelStyle={styles.buttonLabel}
        >
          Start Over
        </Button>
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
  recommendationText: {
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
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  chip: {
    marginRight: 8,
    marginTop: 4,
  },
  chipWarning: {
    backgroundColor: "#FEF3C7",
  },
  chipError: {
    backgroundColor: "#FEE2E2",
  },
  chipText: {
    fontSize: 12,
  },
  advisorySection: {
    marginBottom: 20,
  },
  advisoryTitle: {
    marginBottom: 12,
    fontWeight: "bold",
    color: "#4C1D95",
  },
  stiAdvisoryBox: {
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
  counsellingSection: {
    marginBottom: 20,
  },
  counsellingTitle: {
    marginBottom: 12,
    fontWeight: "bold",
    color: "#4C1D95",
  },
  counsellingBox: {
    backgroundColor: "#E0E7FF",
    borderLeftWidth: 4,
    borderLeftColor: "#6366F1",
    padding: 16,
    borderRadius: 8,
  },
  counsellingItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  counsellingBullet: {
    marginRight: 8,
    color: "#4338CA",
    fontWeight: "bold",
  },
  counsellingText: {
    flex: 1,
    color: "#3730A3",
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
  startOverButton: {
    marginTop: 8,
    borderColor: "#4C1D95",
  },
  buttonLabel: {
    color: "#4C1D95",
  },
});
