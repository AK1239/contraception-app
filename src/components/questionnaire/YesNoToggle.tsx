import React from "react";
import { View, StyleSheet } from "react-native";
import { Switch, Text } from "react-native-paper";

interface YesNoToggleProps {
  label?: string;
  value: boolean | undefined;
  onValueChange: (value: boolean) => void;
  error?: boolean;
}

/**
 * Compact yes/no toggle using a switch.
 * Reduces taps compared to radio buttons.
 */
export function YesNoToggle({
  label,
  value,
  onValueChange,
  error = false,
}: YesNoToggleProps) {
  const isOn = value === true;

  return (
    <View style={[styles.container, error && styles.containerError]}>
      <View style={styles.labelRow}>
        <Text variant="bodyLarge" style={styles.label}>
          {label ?? "Yes / No"}
        </Text>
        <View style={styles.switchRow}>
          <Text
            variant="bodyMedium"
            style={[styles.optionLabel, !isOn && styles.optionLabelActive]}
          >
            No
          </Text>
          <Switch
            value={isOn}
            onValueChange={onValueChange}
            color="#6D28D9"
          />
          <Text
            variant="bodyMedium"
            style={[styles.optionLabel, isOn && styles.optionLabelActive]}
          >
            Yes
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  containerError: {
    borderColor: "#EF4444",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  label: {
    flex: 1,
    marginRight: 12,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionLabel: {
    color: "#9CA3AF",
  },
  optionLabelActive: {
    color: "#374151",
    fontWeight: "600",
  },
});
