import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import type { ECPSafetyResult, ECPMethodResult } from "../../types/ecpSafety";
import { theme } from "../../utils/theme";

interface ECPResultsProps {
  result: ECPSafetyResult;
  onStartOver?: () => void;
  onGoBack?: () => void;
}

const SAFETY_COLORS: Record<string, string> = {
  SAFE: theme.colors.success,
  USE_WITH_CAUTION: theme.colors.warning,
  AVOID: theme.colors.error,
};

function MethodResultCard({
  methodResult,
  t,
}: {
  methodResult: ECPMethodResult;
  t: (key: string) => string;
}) {
  const borderColor = SAFETY_COLORS[methodResult.safetyClassification] ?? theme.colors.textSecondary;

  return (
    <Card style={[styles.methodCard, { borderLeftColor: borderColor }]} mode="outlined">
      <Card.Content style={styles.cardContent}>
        <View style={styles.methodHeader}>
          <Text variant="titleSmall" style={styles.methodName}>
            {t(methodResult.methodNameKey)}
          </Text>
          <View style={[styles.badge, { backgroundColor: borderColor + "25" }]}>
            <Text variant="labelMedium" style={[styles.badgeText, { color: borderColor }]}>
              {t(`ecp.safety.${methodResult.safetyClassification}`)}
            </Text>
          </View>
        </View>
        <Text variant="bodySmall" style={styles.eligibility}>
          {t(`ecp.eligibility.${methodResult.eligibility}`)} • MEC {methodResult.mec}
        </Text>
      </Card.Content>
    </Card>
  );
}

export function ECPResults({ result, onStartOver, onGoBack }: ECPResultsProps) {
  const { t } = useTranslation();

  if (result.notApplicable) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.notApplicableSection}>
          <Text variant="titleMedium" style={styles.notApplicableTitle}>
            {t("ecp.results.notApplicableTitle")}
          </Text>
          <Text variant="bodyLarge" style={styles.notApplicableMessage}>
            {result.notApplicableMessageKey
              ? t(result.notApplicableMessageKey)
              : result.notApplicableMessage}
          </Text>
          {onStartOver && (
            <Button
              mode="outlined"
              onPress={onStartOver}
              icon="refresh"
              style={styles.startOverButton}
              labelStyle={styles.buttonLabel}
            >
              {t("common.startOver")}
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
        {t("ecp.results.mainTitle")}
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        {t("ecp.results.subtitle")}
      </Text>

      {/* Recommended option */}
      {result.recommendedOption && (
        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            {t("ecp.results.recommendedOption")}
          </Text>
          <Card style={styles.recommendedCard} mode="outlined">
            <Card.Content>
              <Text variant="titleMedium" style={styles.recommendedText}>
                {result.recommendedOptionKey
                  ? t(result.recommendedOptionKey)
                  : result.recommendedOption}
              </Text>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* Alternative options */}
      {result.alternativeOptions.length > 0 && (
        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>
            {t("ecp.results.alternativeOptions")}
          </Text>
          {result.alternativeOptionsKeys.map((key, i) => (
            <View key={i} style={styles.altItem}>
              <Text variant="bodyMedium">• {t(key)}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Per-method MEC display */}
      <View style={styles.section}>
        <Text variant="titleSmall" style={styles.sectionTitle}>
          {t("ecp.results.mecByMethod")}
        </Text>
        {result.lng && <MethodResultCard methodResult={result.lng} t={t} />}
        {result.upa && (
          <View style={styles.methodSpacer}>
            <MethodResultCard methodResult={result.upa} t={t} />
          </View>
        )}
        {result.coc && (
          <View style={styles.methodSpacer}>
            <MethodResultCard methodResult={result.coc} t={t} />
          </View>
        )}
      </View>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.warningsSection}>
            <Text variant="titleMedium" style={styles.warningsTitle}>
              {t("ecp.results.warnings")}
            </Text>
            {result.warnings.map((w) => (
              <View
                key={w.id}
                style={[
                  styles.warningBox,
                  w.type === "reminder" ? styles.reminderBox : styles.warningBoxDefault,
                ]}
              >
                <Text variant="bodySmall" style={styles.warningText}>
                  {t(w.messageKey)}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Dose instructions */}
      <View style={styles.section}>
        <Text variant="titleSmall" style={styles.sectionTitle}>
          {t("ecp.results.doseInstructions")}
        </Text>
        <View style={styles.doseBox}>
          <Text variant="bodySmall" style={styles.doseItem}>
            <Text variant="labelMedium">LNG: </Text>
            {t(result.doseInstructions.lngKey)}
          </Text>
          <Text variant="bodySmall" style={styles.doseItem}>
            <Text variant="labelMedium">UPA: </Text>
            {t(result.doseInstructions.upaKey)}
          </Text>
          <Text variant="bodySmall" style={styles.doseItem}>
            <Text variant="labelMedium">COC (Yuzpe): </Text>
            {t(result.doseInstructions.cocKey)}
          </Text>
        </View>
      </View>

      {/* Clinical reminders */}
      <View style={styles.remindersSection}>
        <Text variant="titleSmall" style={styles.sectionTitle}>
          {t("ecp.results.clinicalReminders")}
        </Text>
        {result.clinicalRemindersKeys.map((key, i) => (
          <View key={i} style={styles.reminderItem}>
            <Text variant="bodySmall">• {t(key)}</Text>
          </View>
        ))}
      </View>

      {(onGoBack || onStartOver) && (
        <View style={styles.buttonSection}>
          {onGoBack && (
            <Button
              mode="outlined"
              onPress={onGoBack}
              icon="arrow-left"
              style={styles.goBackButton}
              labelStyle={styles.buttonLabel}
            >
              {t("ecp.results.goBack")}
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
              {t("common.startOver")}
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
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8,
    color: theme.colors.textSecondary,
    fontSize: 12,
    textTransform: "uppercase",
  },
  recommendedCard: {
    backgroundColor: "#EDE9FE",
    borderColor: "#6D28D9",
    borderWidth: 1.5,
    borderRadius: 12,
  },
  recommendedText: {
    fontWeight: "600",
    color: "#6D28D9",
  },
  altItem: {
    marginBottom: 4,
  },
  methodCard: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 0,
    shadowOpacity: 0,
    borderLeftWidth: 4,
    backgroundColor: "#FFFFFF",
  },
  methodSpacer: {
    marginTop: 8,
  },
  cardContent: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  methodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  methodName: {
    fontWeight: theme.typography.fontWeight.semiBold,
    fontSize: 15,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 12,
  },
  eligibility: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  divider: {
    marginVertical: 20,
  },
  warningsSection: {
    marginBottom: 20,
  },
  warningsTitle: {
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: 12,
    fontSize: 16,
  },
  warningBox: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  warningBoxDefault: {
    backgroundColor: "#FEF3C7",
    borderLeftColor: "#F59E0B",
  },
  reminderBox: {
    backgroundColor: "#DBEAFE",
    borderLeftColor: "#3B82F6",
  },
  warningText: {
    color: "#78350F",
    lineHeight: 20,
    fontSize: 13,
  },
  doseBox: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
  },
  doseItem: {
    marginBottom: 8,
    lineHeight: 20,
  },
  remindersSection: {
    marginBottom: 24,
  },
  reminderItem: {
    marginBottom: 4,
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
    flexDirection: "row",
    gap: 12,
  },
  goBackButton: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#6D28D9",
  },
  startOverButton: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#D1D5DB",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
