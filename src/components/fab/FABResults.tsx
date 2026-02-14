import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button } from "react-native-paper";
import type { FABEligibilityResult, FABMethodResult } from "../../types/fabEligibility";
import { theme } from "../../utils/theme";

interface FABResultsProps {
  result: FABEligibilityResult;
  onStartOver?: () => void;
}

function MethodResultCard({ methodResult }: { methodResult: FABMethodResult }) {
  const categoryColors = {
    A: theme.colors.success,
    C: theme.colors.warning,
    D: theme.colors.error,
  };
  const borderColor = categoryColors[methodResult.category];

  return (
    <Card style={[styles.methodCard, { borderLeftColor: borderColor }]} mode="outlined">
      <Card.Content style={styles.cardContent}>
        <View style={styles.methodHeader}>
          <Text variant="titleSmall" style={styles.methodName}>
            {methodResult.methodName}
          </Text>
          <View style={[styles.categoryBadge, { backgroundColor: borderColor + "25" }]}>
            <Text variant="labelMedium" style={[styles.categoryBadgeText, { color: borderColor }]}>
              {methodResult.category}
            </Text>
          </View>
        </View>
        <Text variant="bodySmall" style={styles.categoryLabel}>
          {methodResult.categoryLabel}
        </Text>
        <Text variant="bodyMedium" style={styles.explanation}>
          {methodResult.explanation}
        </Text>
        {methodResult.actionRequired && (
          <Text variant="bodySmall" style={styles.actionRequired}>
            Action: {methodResult.actionRequired}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

function AdvisoryCard({
  message,
  type,
}: {
  message: string;
  type: "sti" | "high-risk-pregnancy" | "medication-evaluation";
}) {
  const isSti = type === "sti";
  return (
    <View style={[styles.advisoryBox, isSti ? styles.advisorySti : styles.advisoryWarning]}>
      <Text variant="bodySmall" style={styles.advisoryText}>
        {message}
      </Text>
    </View>
  );
}

export function FABResults({ result, onStartOver }: FABResultsProps) {
  if (result.notApplicable) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notApplicableSection}>
          <Text variant="titleMedium" style={styles.notApplicableTitle}>
            FAB Methods Not Applicable
          </Text>
          <Text variant="bodyLarge" style={styles.notApplicableMessage}>
            {result.notApplicableMessage}
          </Text>
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
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text variant="titleLarge" style={styles.mainTitle}>
        FAB Eligibility Result
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        Fertility Awareness-Based (FAB) methods include Symptoms-Based (SYM) and Calendar-Based (CAL) methods.
      </Text>

      {result.sym && (
        <View style={styles.section}>
          <MethodResultCard methodResult={result.sym} />
        </View>
      )}

      {result.cal && (
        <View style={styles.section}>
          <MethodResultCard methodResult={result.cal} />
        </View>
      )}

      {result.advisories.length > 0 && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.advisoriesSection}>
            <Text variant="titleMedium" style={styles.advisoriesTitle}>
              Advisories
            </Text>
            {result.advisories.map((adv) => (
              <AdvisoryCard key={adv.id} message={adv.message} type={adv.type} />
            ))}
          </View>
        </>
      )}

      <View style={styles.definitionsSection}>
        <Text variant="labelMedium" style={styles.definitionsTitle}>
          Category Definitions
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>A (Accept)</Text> – No restriction
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>C (Caution)</Text> – Enhanced counselling required
        </Text>
        <Text variant="bodySmall" style={styles.definitionItem}>
          • <Text style={styles.definitionBold}>D (Delay)</Text> – Temporary method recommended until condition resolved
        </Text>
      </View>

      {onStartOver && (
        <View style={styles.buttonSection}>
          <Button
            mode="outlined"
            onPress={onStartOver}
            icon="refresh"
            style={styles.startOverButton}
            labelStyle={styles.buttonLabel}
          >
            Start Over
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  mainTitle: {
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: 8,
    fontSize: 20,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginBottom: 20,
    fontSize: 13,
  },
  section: {
    marginBottom: 16,
  },
  methodCard: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 0,
    shadowOpacity: 0,
    borderLeftWidth: 4,
    backgroundColor: "#FFFFFF",
  },
  cardContent: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  methodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  methodName: {
    fontWeight: theme.typography.fontWeight.semiBold,
    fontSize: 15,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 12,
  },
  categoryLabel: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
    fontSize: 12,
  },
  explanation: {
    color: theme.colors.textPrimary,
    lineHeight: 20,
    fontSize: 13,
  },
  actionRequired: {
    marginTop: 10,
    color: theme.colors.warning,
    fontWeight: "600",
    fontSize: 12,
  },
  divider: {
    marginVertical: 20,
  },
  advisoriesSection: {
    marginBottom: 20,
  },
  advisoriesTitle: {
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: 12,
    fontSize: 16,
  },
  advisoryBox: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  advisorySti: {
    backgroundColor: "#FEF3C7",
    borderLeftColor: "#F59E0B",
  },
  advisoryWarning: {
    backgroundColor: "#FFFBEB",
    borderLeftColor: "#F59E0B",
  },
  advisoryText: {
    color: "#78350F",
    lineHeight: 20,
    fontSize: 13,
  },
  definitionsSection: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 24,
  },
  definitionsTitle: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 13,
  },
  definitionItem: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
  definitionBold: {
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  notApplicableSection: {
    padding: 24,
    alignItems: "center",
  },
  notApplicableTitle: {
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
  },
  notApplicableMessage: {
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonSection: {
    marginTop: 8,
  },
  startOverButton: {
    borderRadius: 10,
    borderColor: "#D1D5DB",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
