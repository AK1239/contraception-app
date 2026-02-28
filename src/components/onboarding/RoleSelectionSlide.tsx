import React from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
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
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fafafa", "#ffffff"]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.contentContainer}>
        <View style={styles.iconSection}>
          <View style={[styles.iconCircleOuter, { backgroundColor: color + "15" }]}>
            <View style={[styles.iconCircle, { backgroundColor: color + "25" }]}>
              <Text style={styles.icon}>👤</Text>
            </View>
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text variant="displaySmall" style={[styles.title, { color }]}>
            Personalize Your Experience
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Please select your role
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <Pressable
            style={[
              styles.optionCard,
              selectedRole === "healthcare-provider" && styles.optionCardSelected,
              selectedRole === "healthcare-provider" && { borderColor: color },
            ]}
            onPress={() => onRoleSelect("healthcare-provider")}
          >
            <View style={styles.optionContent}>
              <View
                style={[
                  styles.checkbox,
                  selectedRole === "healthcare-provider" && {
                    backgroundColor: color,
                    borderColor: color,
                  },
                ]}
              >
                {selectedRole === "healthcare-provider" && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text
                style={[
                  styles.optionLabel,
                  selectedRole === "healthcare-provider" && { color, fontWeight: "600" },
                ]}
              >
                Healthcare provider
              </Text>
            </View>
            <Text style={styles.optionHint}>Full access to all features</Text>
          </Pressable>

          <Pressable
            style={[
              styles.optionCard,
              selectedRole === "general-public" && styles.optionCardSelected,
              selectedRole === "general-public" && { borderColor: color },
            ]}
            onPress={() => onRoleSelect("general-public")}
          >
            <View style={styles.optionContent}>
              <View
                style={[
                  styles.checkbox,
                  selectedRole === "general-public" && {
                    backgroundColor: color,
                    borderColor: color,
                  },
                ]}
              >
                {selectedRole === "general-public" && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text
                style={[
                  styles.optionLabel,
                  selectedRole === "general-public" && { color, fontWeight: "600" },
                ]}
              >
                General public
              </Text>
            </View>
            <Text style={styles.optionHint}>
              Simplified experience, eligibility tools hidden
            </Text>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 32,
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
    fontWeight: "600",
    fontSize: 16,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  optionCardSelected: {
    backgroundColor: "#F5F3FF",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    flex: 1,
  },
  optionHint: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 38,
  },
});
