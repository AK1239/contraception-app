import React from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import type { UserRole } from "../../constants/userRole";

const { height } = Dimensions.get("window");

interface RoleSelectionSlideProps {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
  color?: string;
}

export default function RoleSelectionSlide({
  selectedRole,
  onRoleSelect,
  color = "#6D28D9",
}: RoleSelectionSlideProps) {
  const { t } = useTranslation();

  const isHealthcareSelected = selectedRole === "healthcare-provider";
  const isPublicSelected = selectedRole === "general-public";

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f8f6ff", "#ffffff"]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.contentContainer}>
        <View style={styles.iconSection}>
          <LinearGradient
            colors={[color + "30", color + "15"]}
            style={styles.iconCircleOuter}
          >
            <LinearGradient
              colors={[color + "50", color + "30"]}
              style={styles.iconCircle}
            >
              <Ionicons name="people" size={36} color={color} />
            </LinearGradient>
          </LinearGradient>
        </View>

        <View style={styles.titleSection}>
          <Text style={[styles.title, { color }]}>
            {t("onboarding.roleSelectionTitle")}
          </Text>
          <Text style={styles.subtitle}>
            {t("onboarding.roleSelectionSubtitle")}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {/* Healthcare Provider Card */}
          <Pressable
            style={({ pressed }) => [
              styles.optionCard,
              isHealthcareSelected && [
                styles.optionCardSelected,
                { borderColor: color },
              ],
              pressed && styles.optionCardPressed,
            ]}
            onPress={() => onRoleSelect("healthcare-provider")}
          >
            {isHealthcareSelected && (
              <LinearGradient
                colors={[color + "12", color + "06"]}
                style={StyleSheet.absoluteFill}
                borderRadius={20}
              />
            )}
            <View style={styles.cardRow}>
              <View
                style={[
                  styles.roleIconContainer,
                  {
                    backgroundColor: isHealthcareSelected
                      ? color + "20"
                      : "#F1F5F9",
                  },
                ]}
              >
                <Ionicons
                  name="medkit"
                  size={28}
                  color={isHealthcareSelected ? color : "#94A3B8"}
                />
              </View>
              <View style={styles.cardText}>
                <Text
                  style={[
                    styles.optionLabel,
                    isHealthcareSelected && { color, fontWeight: "700" },
                  ]}
                >
                  {t("onboarding.roleHealthcareTitle")}
                </Text>
                <Text style={styles.optionHint}>
                  {t("onboarding.roleHealthcareHint")}
                </Text>
              </View>
              <View
                style={[
                  styles.selectionIndicator,
                  isHealthcareSelected && {
                    backgroundColor: color,
                    borderColor: color,
                  },
                ]}
              >
                {isHealthcareSelected && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </View>

            <View style={styles.featuresRow}>
              {["Clinical tools", "Eligibility check", "All features"].map(
                (feat) => (
                  <View
                    key={feat}
                    style={[
                      styles.featureChip,
                      {
                        backgroundColor: isHealthcareSelected
                          ? color + "15"
                          : "#F1F5F9",
                      },
                    ]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={12}
                      color={isHealthcareSelected ? color : "#94A3B8"}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.featureChipText,
                        { color: isHealthcareSelected ? color : "#94A3B8" },
                      ]}
                    >
                      {feat}
                    </Text>
                  </View>
                )
              )}
            </View>
          </Pressable>

          {/* General Public Card */}
          <Pressable
            style={({ pressed }) => [
              styles.optionCard,
              isPublicSelected && [
                styles.optionCardSelected,
                { borderColor: color },
              ],
              pressed && styles.optionCardPressed,
            ]}
            onPress={() => onRoleSelect("general-public")}
          >
            {isPublicSelected && (
              <LinearGradient
                colors={[color + "12", color + "06"]}
                style={StyleSheet.absoluteFill}
                borderRadius={20}
              />
            )}
            <View style={styles.cardRow}>
              <View
                style={[
                  styles.roleIconContainer,
                  {
                    backgroundColor: isPublicSelected
                      ? color + "20"
                      : "#F1F5F9",
                  },
                ]}
              >
                <Ionicons
                  name="person"
                  size={28}
                  color={isPublicSelected ? color : "#94A3B8"}
                />
              </View>
              <View style={styles.cardText}>
                <Text
                  style={[
                    styles.optionLabel,
                    isPublicSelected && { color, fontWeight: "700" },
                  ]}
                >
                  {t("onboarding.rolePublicTitle")}
                </Text>
                <Text style={styles.optionHint}>
                  {t("onboarding.rolePublicHintShort")}
                </Text>
              </View>
              <View
                style={[
                  styles.selectionIndicator,
                  isPublicSelected && {
                    backgroundColor: color,
                    borderColor: color,
                  },
                ]}
              >
                {isPublicSelected && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </View>

            <View style={styles.featuresRow}>
              {["Contraceptive info", "Guided experience", "Easy to use"].map(
                (feat) => (
                  <View
                    key={feat}
                    style={[
                      styles.featureChip,
                      {
                        backgroundColor: isPublicSelected
                          ? color + "15"
                          : "#F1F5F9",
                      },
                    ]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={12}
                      color={isPublicSelected ? color : "#94A3B8"}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.featureChipText,
                        { color: isPublicSelected ? color : "#94A3B8" },
                      ]}
                    >
                      {feat}
                    </Text>
                  </View>
                )
              )}
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.05,
    paddingBottom: 100,
  },
  iconSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircleOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 26,
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontWeight: "500",
    fontSize: 15,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  optionCardSelected: {
    borderWidth: 2,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  optionCardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  roleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 3,
  },
  optionHint: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
  },
  selectionIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  featuresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  featureChipText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
