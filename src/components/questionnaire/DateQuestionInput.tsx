import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDisplayDate } from "../../utils/dateInput";
import type { DateQuestionInputProps } from "./DateQuestionInput.types";

export type { DateQuestionInputProps } from "./DateQuestionInput.types";

export function DateQuestionInput({
  value,
  onValueChange,
  minDate,
  maxDate,
  placeholder = "Select Date",
}: DateQuestionInputProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const dateValue = value ?? new Date();

  return (
    <View style={styles.dateContainer}>
      <Button
        mode="outlined"
        onPress={() => setDatePickerOpen(true)}
        style={styles.dateButton}
        contentStyle={styles.dateButtonContent}
      >
        {value ? formatDisplayDate(value) : placeholder}
      </Button>

      {datePickerOpen && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "calendar"}
          maximumDate={maxDate}
          minimumDate={minDate}
          themeVariant="light"
          accentColor="#6D28D9"
          textColor="#1F2937"
          onChange={(_event, selectedDate) => {
            setDatePickerOpen(false);
            if (selectedDate) {
              onValueChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    width: "100%",
  },
  dateButton: {
    borderColor: "#6D28D9",
  },
  dateButtonContent: {
    justifyContent: "flex-start",
  },
});
