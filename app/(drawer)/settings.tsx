import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store";
import { setUserRole } from "../../src/store/slices/userRole";
import type { UserRole } from "../../src/constants/userRole";
import { USER_ROLE } from "../../src/constants/userRole";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.userRole?.role) ?? "healthcare-provider";

  const handleRoleChange = (newRole: UserRole) => {
    dispatch(setUserRole(newRole));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            App Experience
          </Text>
          <Text variant="bodySmall" style={styles.sectionDescription}>
            Choose your role to personalize which features are displayed.
          </Text>

          <View style={styles.radioGroup}>
            <View style={styles.radioItem}>
              <RadioButton.Android
                value="healthcare-provider"
                status={role === USER_ROLE.HEALTHCARE_PROVIDER ? "checked" : "unchecked"}
                onPress={() => handleRoleChange(USER_ROLE.HEALTHCARE_PROVIDER)}
                color="#6D28D9"
                uncheckedColor="#94A3B8"
              />
              <View style={styles.radioContent}>
                <Text style={styles.radioLabel}>Healthcare provider</Text>
                <Text style={styles.radioHint}>Full access to all features including eligibility tools</Text>
              </View>
            </View>

            <View style={styles.radioItem}>
              <RadioButton.Android
                value="general-public"
                status={role === USER_ROLE.GENERAL_PUBLIC ? "checked" : "unchecked"}
                onPress={() => handleRoleChange(USER_ROLE.GENERAL_PUBLIC)}
                color="#6D28D9"
                uncheckedColor="#94A3B8"
              />
              <View style={styles.radioContent}>
                <Text style={styles.radioLabel}>General public</Text>
                <Text style={styles.radioHint}>
                  Simplified experience. Natural Method Eligibility and Sterilization Eligibility are hidden.
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
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  sectionDescription: {
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  radioGroup: {
    gap: 4,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
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
  },
  radioHint: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
});
