import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
  fromInputDateString,
  toInputDateString,
} from "../../utils/dateInput";
import type { DateQuestionInputProps } from "./DateQuestionInput.types";

export type { DateQuestionInputProps } from "./DateQuestionInput.types";

type WebDateInputProps = React.ComponentProps<typeof TextInput> & {
  type?: "date";
  min?: string;
  max?: string;
};

const WebDateInput = TextInput as React.ComponentType<WebDateInputProps>;

export function DateQuestionInput({
  value,
  onValueChange,
  minDate,
  maxDate,
}: DateQuestionInputProps) {
  return (
    <View style={styles.container}>
      <WebDateInput
        type="date"
        value={value ? toInputDateString(value) : ""}
        min={toInputDateString(minDate)}
        max={toInputDateString(maxDate)}
        onChangeText={(text) => {
          if (text) {
            onValueChange(fromInputDateString(text));
          }
        }}
        style={styles.input}
        placeholder="Select date"
        accessibilityLabel="Select date"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#6D28D9",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#fff",
    minHeight: 48,
  },
});
