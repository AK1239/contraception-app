import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput, RadioButton, Checkbox, Text, Card, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Question, AnswerValue } from "../types";
import { PersonalizationQuestion } from "../constants/questions";

interface QuestionInputProps {
  question: Question;
  value: AnswerValue | undefined;
  onValueChange: (value: AnswerValue) => void;
  error?: string;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  value,
  onValueChange,
  error,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const renderInput = () => {
    switch (question.type) {
      case "yes-no":
        return (
          <View style={styles.radioGroup}>
            <View style={styles.radioItem}>
              <RadioButton
                value="yes"
                status={value === true ? "checked" : "unchecked"}
                onPress={() => onValueChange(true)}
              />
              <Text onPress={() => onValueChange(true)}>Yes</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value="no"
                status={value === false ? "checked" : "unchecked"}
                onPress={() => onValueChange(false)}
              />
              <Text onPress={() => onValueChange(false)}>No</Text>
            </View>
          </View>
        );

      case "numeric":
        return (
          <TextInput
            mode="outlined"
            label={question.unit ? `Value (${question.unit})` : "Value"}
            value={value?.toString() || ""}
            onChangeText={(text) => {
              const numValue = parseFloat(text);
              if (!isNaN(numValue)) {
                onValueChange(numValue);
              } else if (text === "") {
                onValueChange(undefined as any);
              }
            }}
            keyboardType="numeric"
            error={!!error}
          />
        );

      case "select-one":
        if ("options" in question) {
          return (
            <View style={styles.radioGroup}>
              {question.options.map((option) => (
                <View key={option.value} style={styles.radioItem}>
                  <RadioButton
                    value={option.value}
                    status={value === option.value ? "checked" : "unchecked"}
                    onPress={() => onValueChange(option.value)}
                  />
                  <Text onPress={() => onValueChange(option.value)}>{option.label}</Text>
                </View>
              ))}
            </View>
          );
        }
        return null;

      case "select-multiple":
        if ("options" in question) {
          const selectedValues = Array.isArray(value) ? value : [];

          return (
            <View style={styles.checkboxGroup}>
              {question.options.map((option) => (
                <View key={option.value} style={styles.checkboxItem}>
                  <Checkbox
                    status={selectedValues.includes(option.value) ? "checked" : "unchecked"}
                    onPress={() => {
                      const newValues = selectedValues.includes(option.value)
                        ? selectedValues.filter((v) => v !== option.value)
                        : [...selectedValues, option.value];
                      onValueChange(newValues);
                    }}
                  />
                  <Text
                    onPress={() => {
                      const newValues = selectedValues.includes(option.value)
                        ? selectedValues.filter((v) => v !== option.value)
                        : [...selectedValues, option.value];
                      onValueChange(newValues);
                    }}
                  >
                    {option.label}
                  </Text>
                </View>
              ))}
            </View>
          );
        }
        return null;

      case "blood-pressure":
        const bpValue = (value as { systolic: number; diastolic: number }) || {
          systolic: 0,
          diastolic: 0,
        };

        return (
          <View style={styles.bloodPressureContainer}>
            <TextInput
              mode="outlined"
              label="Systolic (top number)"
              value={bpValue.systolic?.toString() || ""}
              onChangeText={(text) => {
                const systolic = parseFloat(text) || 0;
                onValueChange({ ...bpValue, systolic });
              }}
              keyboardType="numeric"
              style={styles.bpInput}
            />
            <Text style={styles.bpSeparator}>/</Text>
            <TextInput
              mode="outlined"
              label="Diastolic (bottom number)"
              value={bpValue.diastolic?.toString() || ""}
              onChangeText={(text) => {
                const diastolic = parseFloat(text) || 0;
                onValueChange({ ...bpValue, diastolic });
              }}
              keyboardType="numeric"
              style={styles.bpInput}
            />
          </View>
        );

      case "lipid-profile":
        const lipidValue = (value as {
          ldl: number;
          hdl: number;
          cholesterol: number;
          triglyceride: number;
        }) || { ldl: 0, hdl: 0, cholesterol: 0, triglyceride: 0 };

        return (
          <View style={styles.lipidContainer}>
            <TextInput
              mode="outlined"
              label="LDL (mg/dL)"
              value={lipidValue.ldl?.toString() || ""}
              onChangeText={(text) => {
                const ldl = parseFloat(text) || 0;
                onValueChange({ ...lipidValue, ldl });
              }}
              keyboardType="numeric"
              style={styles.lipidInput}
            />
            <TextInput
              mode="outlined"
              label="HDL (mg/dL)"
              value={lipidValue.hdl?.toString() || ""}
              onChangeText={(text) => {
                const hdl = parseFloat(text) || 0;
                onValueChange({ ...lipidValue, hdl });
              }}
              keyboardType="numeric"
              style={styles.lipidInput}
            />
            <TextInput
              mode="outlined"
              label="Total Cholesterol (mg/dL)"
              value={lipidValue.cholesterol?.toString() || ""}
              onChangeText={(text) => {
                const cholesterol = parseFloat(text) || 0;
                onValueChange({ ...lipidValue, cholesterol });
              }}
              keyboardType="numeric"
              style={styles.lipidInput}
            />
            <TextInput
              mode="outlined"
              label="Triglyceride (mg/dL)"
              value={lipidValue.triglyceride?.toString() || ""}
              onChangeText={(text) => {
                const triglyceride = parseFloat(text) || 0;
                onValueChange({ ...lipidValue, triglyceride });
              }}
              keyboardType="numeric"
              style={styles.lipidInput}
            />
          </View>
        );

      case "date":
        const dateValue = value ? new Date(value as any) : new Date();
        const maxDate = "maxDate" in question ? question.maxDate : new Date();
        const minDate = "minDate" in question ? question.minDate : new Date("1900-01-01");

        return (
          <View style={styles.dateContainer}>
            <Button
              mode="outlined"
              onPress={() => setDatePickerOpen(true)}
              style={styles.dateButton}
              contentStyle={styles.dateButtonContent}
            >
              {value ? new Date(value as any).toLocaleDateString() : "Select Date"}
            </Button>

            {datePickerOpen && (
              <DateTimePicker
                value={dateValue}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={maxDate}
                minimumDate={minDate}
                onChange={(event, selectedDate) => {
                  setDatePickerOpen(false);
                  if (selectedDate) {
                    onValueChange(selectedDate);
                  }
                }}
              />
            )}
          </View>
        );

      default:
        return (
          <TextInput
            mode="outlined"
            label="Answer"
            value={value?.toString() || ""}
            onChangeText={(text) => onValueChange(text)}
            error={!!error}
          />
        );
    }
  };

  return (
      <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.questionText}>
          {question.text}
        </Text>
        <View style={styles.inputContainer}>{renderInput()}</View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </Card.Content>
    </Card>
  );
};

// Personalization Input Component
interface PersonalizationInputProps {
  question: PersonalizationQuestion;
  value?: AnswerValue;
  onValueChange: (value: AnswerValue) => void;
  error?: string;
}

export const PersonalizationInput: React.FC<PersonalizationInputProps> = ({
  question,
  value,
  onValueChange,
  error,
}) => {
  // Helper function to get the display value from stored value for frequency questions
  const getDisplayValue = (storedValue: any): string | undefined => {
    if (question.id === "preferredFrequency" && typeof storedValue === "string") {
      // Reverse mapping from stored value to display value
      const reverseMapping: Record<string, string> = {
        daily: "Every day",
        "every-3-weeks": "Every 3 weeks",
        "every-3-months": "Every 3 months",
        "every-3-years": "Every 3 years",
        "every-8-years": "Every 8 years",
      };
      return reverseMapping[storedValue] || storedValue;
    }
    return storedValue;
  };

  const renderInput = () => {
    switch (question.type) {
      case "yes-no":
        return (
          <View style={styles.radioGroup}>
            <View style={styles.radioOption}>
              <RadioButton
                value="yes"
                status={value === true ? "checked" : "unchecked"}
                onPress={() => onValueChange(true)}
              />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="no"
                status={value === false ? "checked" : "unchecked"}
                onPress={() => onValueChange(false)}
              />
              <Text style={styles.radioLabel}>No</Text>
            </View>
          </View>
        );

      case "select-one":
        const displayValue = getDisplayValue(value);

        return (
          <View style={styles.radioGroup}>
            {question.options?.map((option, index) => (
              <View key={index} style={styles.radioOption}>
                <RadioButton
                  value={option}
                  status={displayValue === option ? "checked" : "unchecked"}
                  onPress={() => onValueChange(option)}
                />
                <Text style={styles.radioLabel}>{option}</Text>
              </View>
            ))}
          </View>
        );

      case "numeric":
        return (
          <TextInput
            mode="outlined"
            value={value?.toString() || ""}
            onChangeText={(text) => {
              const numValue = parseFloat(text);
              if (!isNaN(numValue)) {
                onValueChange(numValue);
              } else if (text === "") {
                onValueChange("");
              }
            }}
            keyboardType="decimal-pad"
            placeholder={`Enter BMI (${question.validation?.min}-${question.validation?.max})`}
            style={styles.textInput}
            error={!!error}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.questionText}>
        {question.text}
      </Text>
      {renderInput()}
      {error && (
        <Text variant="bodySmall" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 24, // Extra space between questions
  },
  questionText: {
    marginBottom: 8,
    lineHeight: 24,
  },
  requiredText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  inputContainer: {
    marginTop: 16,
  },
  radioGroup: {
    gap: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkboxGroup: {
    gap: 8,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  bloodPressureContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bpInput: {
    flex: 1,
  },
  bpSeparator: {
    fontSize: 24,
    fontWeight: "bold",
  },
  lipidContainer: {
    gap: 16,
  },
  lipidInput: {
    marginBottom: 8,
  },
  dateContainer: {
    marginVertical: 8,
  },
  dateButton: {
    marginVertical: 8,
  },
  dateButtonContent: {
    paddingVertical: 12,
    justifyContent: "flex-start",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 12,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioLabel: {
    marginLeft: 8,
  },
  textInput: {
    marginBottom: 16,
  },
  required: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
});
