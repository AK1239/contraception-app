import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import ExpandableSection from "../../../src/components/ExpandableSection";
import ListSection from "../../../src/components/shared/ListSection";

export default function EmergencyOverviewScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.introCard}>
        <Text variant="titleMedium" style={styles.introTitle}>
          {t("ecDescription.overview.title")}
        </Text>
        <Text variant="bodyMedium" style={styles.introText}>
          {t("ecDescription.overview.description")}
        </Text>
        <Text variant="bodySmall" style={styles.introNote}>
          {t("ecDescription.overview.timeWindow")}
        </Text>
      </View>

      <View style={styles.sectionsContainer}>
        <ExpandableSection
          title={t("ecDescription.whenToUse.title")}
          icon="📋"
        >
          <ListSection
            items={[
              t("ecDescription.whenToUse.items_0"),
              t("ecDescription.whenToUse.items_1"),
              t("ecDescription.whenToUse.items_2"),
              t("ecDescription.whenToUse.items_3"),
              t("ecDescription.whenToUse.items_4"),
            ]}
          />
        </ExpandableSection>

        <ExpandableSection
          title={t("ecDescription.counseling.title")}
          icon="💬"
        >
          <ListSection
            items={[
              t("ecDescription.counseling.items_0"),
              t("ecDescription.counseling.items_1"),
              t("ecDescription.counseling.items_2"),
              t("ecDescription.counseling.items_3"),
              t("ecDescription.counseling.items_4"),
            ]}
          />
        </ExpandableSection>

        <ExpandableSection
          title={t("ecDescription.summary.title")}
          icon="📊"
        >
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text variant="labelMedium" style={[styles.tableCell, styles.tableHeader]}>
                {t("ecDescription.summary.method")}
              </Text>
              <Text variant="labelMedium" style={[styles.tableCell, styles.tableHeader]}>
                {t("ecDescription.summary.timeWindow")}
              </Text>
              <Text variant="labelMedium" style={[styles.tableCell, styles.tableHeader]}>
                {t("ecDescription.summary.pregnancyRate")}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text variant="bodySmall" style={styles.tableCell}>{t("ecDescription.summary.copperIud")}</Text>
              <Text variant="bodySmall" style={styles.tableCell}>≤5 days</Text>
              <Text variant="bodySmall" style={styles.tableCell}>~0.1%</Text>
            </View>
            <View style={styles.tableRow}>
              <Text variant="bodySmall" style={styles.tableCell}>{t("ecDescription.summary.ulipristal")}</Text>
              <Text variant="bodySmall" style={styles.tableCell}>≤5 days</Text>
              <Text variant="bodySmall" style={styles.tableCell}>~1.2%</Text>
            </View>
            <View style={styles.tableRow}>
              <Text variant="bodySmall" style={styles.tableCell}>{t("ecDescription.summary.levonorgestrel")}</Text>
              <Text variant="bodySmall" style={styles.tableCell}>≤3 days (up to 5)</Text>
              <Text variant="bodySmall" style={styles.tableCell}>~1–2%</Text>
            </View>
            <View style={styles.tableRow}>
              <Text variant="bodySmall" style={styles.tableCell}>{t("ecDescription.summary.yuzpe")}</Text>
              <Text variant="bodySmall" style={styles.tableCell}>≤3 days</Text>
              <Text variant="bodySmall" style={styles.tableCell}>{t("ecDescription.summary.higherFailure")}</Text>
            </View>
          </View>
        </ExpandableSection>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  introCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  introTitle: {
    color: "#111827",
    fontWeight: "700",
    marginBottom: 12,
  },
  introText: {
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 12,
  },
  introNote: {
    color: "#6B7280",
    lineHeight: 20,
    fontStyle: "italic",
  },
  sectionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  tableContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tableCell: {
    flex: 1,
    color: "#374151",
  },
  tableHeader: {
    fontWeight: "600",
    color: "#111827",
  },
});
