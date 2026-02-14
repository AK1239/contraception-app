import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button } from "react-native-paper";
import type { EvaluationResult } from "../../types/rules";
import type { ContraceptiveMethodKey } from "../../types/contraceptive";
import { MEC_METHOD_NAMES } from "../../constants/mecMethodNames";
import { theme } from "../../utils/theme";

interface MECResultsProps {
  result: EvaluationResult;
  onPersonalize?: () => void;
  onStartOver?: () => void;
}

function MethodCard({
  methodKey,
  mecScore,
  reasons,
  category,
}: {
  methodKey: ContraceptiveMethodKey;
  mecScore: number;
  reasons: string[];
  category: "suggested" | "greaterBenefit" | "avoid";
}) {
  const name = MEC_METHOD_NAMES[methodKey] ?? methodKey;

  const cardStyle =
    category === "suggested"
      ? styles.cardSuggested
      : category === "greaterBenefit"
        ? styles.cardGreaterBenefit
        : styles.cardAvoid;

  return (
    <Card style={[styles.methodCard, cardStyle]} mode="outlined">
      <Card.Content style={styles.cardContent}>
        <View style={styles.methodHeader}>
          <Text variant="bodyLarge" style={styles.methodName}>
            {name}
          </Text>
          <View style={[styles.mecBadge, mecScore === 1 ? styles.mecBadge1 : mecScore === 2 ? styles.mecBadge2 : mecScore === 3 ? styles.mecBadge3 : styles.mecBadge4]}>
            <Text variant="labelSmall" style={styles.mecBadgeText}>
              MEC {mecScore}
            </Text>
          </View>
        </View>
        {mecScore > 1 && reasons.length > 0 && (
          <View style={styles.reasonsContainer}>
            <Text variant="labelSmall" style={styles.reasonsLabel}>
              Why MEC {mecScore}:
            </Text>
            {reasons.map((reason, idx) => (
              <Text key={idx} variant="bodySmall" style={styles.reasonText}>
                • {reason}
              </Text>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

export function MECResults({ result, onPersonalize, onStartOver }: MECResultsProps) {
  const getMecResult = (key: ContraceptiveMethodKey) => {
    return result.mecResults.find((r) => r.methodKey === key);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Suggested safe contraceptives (MEC 1) */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={[styles.sectionTitle, styles.sectionTitleSuggested]}>
          Suggested safe contraceptives (MEC 1)
        </Text>
        <Text variant="bodySmall" style={styles.sectionDescription}>
          These methods have no restrictions based on your answers.
        </Text>
        {result.suggested.length > 0 ? (
          <View style={styles.methodList}>
            {result.suggested.map((key) => (
              <MethodCard
                key={key}
                methodKey={key}
                mecScore={getMecResult(key)?.score ?? 1}
                reasons={[]}
                category="suggested"
              />
            ))}
          </View>
        ) : (
          <Text variant="bodySmall" style={styles.emptyText}>
            No methods in this category based on your answers.
          </Text>
        )}
      </View>

      <Divider style={styles.divider} />

      {/* Greater benefit than risk (MEC 2) */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={[styles.sectionTitle, styles.sectionTitleGreaterBenefit]}>
          Greater benefit than risk (MEC 2)
        </Text>
        <Text variant="bodySmall" style={styles.sectionDescription}>
          Advantages generally outweigh risks. Consider with your healthcare provider.
        </Text>
        {result.greaterBenefit.length > 0 ? (
          <View style={styles.methodList}>
            {result.greaterBenefit.map((key) => {
              const mec = getMecResult(key);
              return (
                <MethodCard
                  key={key}
                  methodKey={key}
                  mecScore={mec?.score ?? 2}
                  reasons={mec?.reasons ?? []}
                  category="greaterBenefit"
                />
              );
            })}
          </View>
        ) : (
          <Text variant="bodySmall" style={styles.emptyText}>
            No methods in this category.
          </Text>
        )}
      </View>

      <Divider style={styles.divider} />

      {/* Avoid these contraceptives (MEC 3/4) */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={[styles.sectionTitle, styles.sectionTitleAvoid]}>
          Avoid these contraceptives (MEC 3/4)
        </Text>
        <Text variant="bodySmall" style={styles.sectionDescription}>
          Risks usually outweigh advantages or represent unacceptable health risk.
        </Text>
        {result.avoid.length > 0 ? (
          <View style={styles.methodList}>
            {[...result.avoid]
              .sort((a, b) => (getMecResult(a)?.score ?? 3) - (getMecResult(b)?.score ?? 3))
              .map((key) => {
              const mec = getMecResult(key);
              return (
                <MethodCard
                  key={key}
                  methodKey={key}
                  mecScore={mec?.score ?? 3}
                  reasons={mec?.reasons ?? []}
                  category="avoid"
                />
              );
            })}
          </View>
        ) : (
          <Text variant="bodySmall" style={styles.emptyText}>
            No methods to avoid based on your answers.
          </Text>
        )}
      </View>

      <View style={styles.personalizeSection}>
        {onPersonalize && (
          <>
            <Button
              mode="contained"
              onPress={onPersonalize}
              style={styles.personalizeButton}
              contentStyle={styles.personalizeButtonContent}
              labelStyle={styles.buttonLabel}
            >
              Personalize your choice
            </Button>
            <Text variant="bodySmall" style={styles.personalizeHint}>
              Refine your options based on preferences (frequency, future pregnancy, etc.)
            </Text>
          </>
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: 4,
    fontSize: 16,
  },
  sectionTitleSuggested: {
    color: theme.colors.success,
  },
  sectionTitleGreaterBenefit: {
    color: theme.colors.warning,
  },
  sectionTitleAvoid: {
    color: theme.colors.error,
  },
  sectionDescription: {
    color: theme.colors.textSecondary,
    marginBottom: 12,
    fontSize: 12,
  },
  methodList: {
    gap: 10,
  },
  methodCard: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 0,
    shadowOpacity: 0,
  },
  cardContent: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  cardSuggested: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
    backgroundColor: "#FFFFFF",
  },
  cardGreaterBenefit: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
    backgroundColor: "#FFFFFF",
  },
  cardAvoid: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
    backgroundColor: "#FFFFFF",
  },
  methodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  methodName: {
    fontWeight: theme.typography.fontWeight.semiBold,
    flex: 1,
    fontSize: 14,
  },
  mecBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mecBadge1: {
    backgroundColor: theme.colors.success + "20",
  },
  mecBadge2: {
    backgroundColor: theme.colors.warning + "20",
  },
  mecBadge3: {
    backgroundColor: theme.colors.error + "30",
  },
  mecBadge4: {
    backgroundColor: theme.colors.error + "50",
  },
  mecBadgeText: {
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 10,
  },
  reasonsContainer: {
    marginTop: 10,
    paddingLeft: 4,
  },
  reasonsLabel: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
    fontSize: 11,
    fontWeight: "600",
  },
  reasonText: {
    color: theme.colors.textSecondary,
    marginBottom: 4,
    fontSize: 11,
    lineHeight: 16,
  },
  emptyText: {
    color: theme.colors.textTertiary,
    fontStyle: "italic",
    fontSize: 12,
  },
  divider: {
    marginVertical: 16,
  },
  personalizeSection: {
    marginTop: 8,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  personalizeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  personalizeButtonContent: {
    paddingVertical: 6,
  },
  personalizeHint: {
    color: theme.colors.textSecondary,
    marginTop: 10,
    textAlign: "center",
    fontSize: 11,
  },
  startOverButton: {
    marginTop: 24,
    borderRadius: 10,
    borderColor: "#D1D5DB",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
