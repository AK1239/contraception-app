import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../../src/store";
import { setUserRole } from "../../src/store/slices/userRole";
import type { UserRole } from "../../src/constants/userRole";
import { USER_ROLE } from "../../src/constants/userRole";
import { useLanguage } from "../../src/hooks/useLanguage";
import type { LanguageCode } from "../../src/i18n/config";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const role =
    useSelector((state: RootState) => state.userRole?.role) ??
    "healthcare-provider";

  const { language, changeLanguage, supportedLanguages } = useLanguage();

  const handleRoleChange = (newRole: UserRole) => {
    dispatch(setUserRole(newRole));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Language Section ──────────────────────────────────────────── */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="language-outline" size={20} color="#6D28D9" style={styles.sectionIcon} />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t("settings.language")}
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.sectionDescription}>
            {t("settings.languageDescription")}
          </Text>

          <View style={styles.languageGrid}>
            {(Object.values(supportedLanguages) as { code: LanguageCode; label: string; nativeLabel: string }[]).map(
              (lang) => {
                const isSelected = language === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    style={[styles.languagePill, isSelected && styles.languagePillSelected]}
                    onPress={() => changeLanguage(lang.code)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.languagePillLabel,
                        isSelected && styles.languagePillLabelSelected,
                      ]}
                    >
                      {lang.nativeLabel}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={16} color="#6D28D9" style={{ marginLeft: 6 }} />
                    )}
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </Card.Content>
      </Card>

      {/* ── Role Section ──────────────────────────────────────────────── */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="person-circle-outline" size={20} color="#6D28D9" style={styles.sectionIcon} />
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t("settings.appExperience")}
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.sectionDescription}>
            {t("settings.appExperienceDescription")}
          </Text>

          <View style={styles.radioGroup}>
            <View style={styles.radioItem}>
              <RadioButton.Android
                value="healthcare-provider"
                status={
                  role === USER_ROLE.HEALTHCARE_PROVIDER ? "checked" : "unchecked"
                }
                onPress={() => handleRoleChange(USER_ROLE.HEALTHCARE_PROVIDER)}
                color="#6D28D9"
                uncheckedColor="#94A3B8"
              />
              <View style={styles.radioContent}>
                <Text style={styles.radioLabel}>
                  {t("settings.healthcareProvider")}
                </Text>
              
              </View>
            </View>

            <View style={[styles.radioItem, styles.radioItemLast]}>
              <RadioButton.Android
                value="general-public"
                status={
                  role === USER_ROLE.GENERAL_PUBLIC ? "checked" : "unchecked"
                }
                onPress={() => handleRoleChange(USER_ROLE.GENERAL_PUBLIC)}
                color="#6D28D9"
                uncheckedColor="#94A3B8"
              />
              <View style={styles.radioContent}>
                <Text style={styles.radioLabel}>
                  {t("settings.generalPublic")}
                </Text>
              
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
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
    paddingBottom: 48,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 0,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#111827",
  },
  sectionDescription: {
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  // ── Language pills ────────────────────────────────────────────────────────
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  languagePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  languagePillSelected: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  languagePillLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  languagePillLabelSelected: {
    color: "#6D28D9",
  },
  // ── Role radio buttons ────────────────────────────────────────────────────
  radioGroup: {
    gap: 0,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  radioItemLast: {
    borderBottomWidth: 0,
  },
  radioContent: {
    flex: 1,
    marginLeft: 8,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  radioHint: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
});
