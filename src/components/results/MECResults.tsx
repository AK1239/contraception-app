import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import type { EvaluationResult } from "../../types/rules";
import type { ContraceptiveMethodKey } from "../../types/contraceptive";
import { MEC_METHOD_NAMES } from "../../constants/mecMethodNames";
import { theme } from "../../utils/theme";

interface MECResultsProps {
  result: EvaluationResult;
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
      <Card.Content>
        <View style={styles.methodHeader}>
          <Text variant="titleMedium" style={styles.methodName}>
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

export function MECResults({ result }: MECResultsProps) {
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
        <Text variant="titleLarge" style={[styles.sectionTitle, styles.sectionTitleSuggested]}>
          Suggested safe contraceptives (MEC 1)
        </Text>
        <Text variant="bodyMedium" style={styles.sectionDescription}>
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
          <Text variant="bodyMedium" style={styles.emptyText}>
            No methods in this category based on your answers.
          </Text>
        )}
      </View>

      <Divider style={styles.divider} />

      {/* Greater benefit than risk (MEC 2) */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, styles.sectionTitleGreaterBenefit]}>
          Greater benefit than risk (MEC 2)
        </Text>
        <Text variant="bodyMedium" style={styles.sectionDescription}>
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
          <Text variant="bodyMedium" style={styles.emptyText}>
            No methods in this category.
          </Text>
        )}
      </View>

      <Divider style={styles.divider} />

      {/* Avoid these contraceptives (MEC 3/4) */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, styles.sectionTitleAvoid]}>
          Avoid these contraceptives (MEC 3/4)
        </Text>
        <Text variant="bodyMedium" style={styles.sectionDescription}>
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
          <Text variant="bodyMedium" style={styles.emptyText}>
            No methods to avoid based on your answers.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl * 2,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontWeight: theme.typography.fontWeight.semiBold,
    marginBottom: theme.spacing.xs,
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
    marginBottom: theme.spacing.md,
  },
  methodList: {
    gap: theme.spacing.sm,
  },
  methodCard: {
    marginBottom: theme.spacing.sm,
  },
  cardSuggested: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
  },
  cardGreaterBenefit: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
  },
  cardAvoid: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
  },
  methodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  methodName: {
    fontWeight: theme.typography.fontWeight.medium,
    flex: 1,
  },
  mecBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mecBadge1: {
    backgroundColor: theme.colors.success + "30",
  },
  mecBadge2: {
    backgroundColor: theme.colors.warning + "30",
  },
  mecBadge3: {
    backgroundColor: theme.colors.error + "40",
  },
  mecBadge4: {
    backgroundColor: theme.colors.error + "60",
  },
  mecBadgeText: {
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  reasonsContainer: {
    marginTop: theme.spacing.sm,
    paddingLeft: theme.spacing.xs,
  },
  reasonsLabel: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  reasonText: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    color: theme.colors.textTertiary,
    fontStyle: "italic",
  },
  divider: {
    marginVertical: theme.spacing.lg,
  },
});
