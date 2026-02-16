import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput, RadioButton, Text, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Question, AnswerValue } from "../types";
import type { PersonalizationQuestion } from "../constants";

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
          <View style={styles.toggleContainer}>
            <View
              style={[
                styles.toggleOption,
                value === true && styles.toggleOptionActive,
              ]}
              onTouchEnd={() => onValueChange(true)}
            >
              <Text
                style={[
                  styles.toggleText,
                  value === true && styles.toggleTextActive,
                ]}
              >
                Yes
              </Text>
            </View>
            <View
              style={[
                styles.toggleOption,
                value === false && styles.toggleOptionActive,
              ]}
              onTouchEnd={() => onValueChange(false)}
            >
              <Text
                style={[
                  styles.toggleText,
                  value === false && styles.toggleTextActive,
                ]}
              >
                No
              </Text>
            </View>
          </View>
        );

      case "cycle-durations": {
        const CYCLE_COUNT = 6;
        const raw = Array.isArray(value) ? value : [];
        const durations: number[] = raw.filter((n): n is number => typeof n === "number");
        while (durations.length < CYCLE_COUNT) durations.push(0);

        return (
          <View style={styles.cycleDurationsContainer}>
            {Array.from({ length: CYCLE_COUNT }, (_, i) => (
              <TextInput
                key={i}
                mode="outlined"
                label={`Cycle ${i + 1} (days)`}
                value={durations[i] && durations[i] > 0 ? String(durations[i]) : ""}
                onChangeText={(text) => {
                  const arr: number[] = [...durations];
                  const num = text === "" ? 0 : parseFloat(text);
                  arr[i] = !isNaN(num) ? num : 0;
                  onValueChange(arr as AnswerValue);
                }}
                keyboardType="numeric"
                style={styles.cycleDurationInput}
                error={!!error}
              />
            ))}
          </View>
        );
      }

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
          // If no options, treat as read-only info text (no input control)
          if (!question.options || question.options.length === 0) {
            return null;
          }
          
          return (
            <View style={styles.selectGroup}>
              {question.options.map((option) => (
                <View
                  key={option.value}
                  style={[
                    styles.selectOption,
                    value === option.value && styles.selectOptionActive,
                  ]}
                  onTouchEnd={() => onValueChange(option.value)}
                >
                  <View style={styles.selectOptionContent}>
                    <Text
                      style={[
                        styles.selectOptionText,
                        value === option.value && styles.selectOptionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {value === option.value && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          );
        }
        return null;

      case "select-multiple":
        if ("options" in question) {
          const selectedValues: string[] = Array.isArray(value) ? (value as string[]) : [];

          return (
            <View style={styles.selectGroup}>
              {question.options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <View
                    key={option.value}
                    style={[
                      styles.selectOption,
                      isSelected && styles.selectOptionActive,
                    ]}
                    onTouchEnd={() => {
                      const newValues: string[] = isSelected
                        ? selectedValues.filter((v) => v !== option.value)
                        : [...selectedValues, option.value];
                      onValueChange(newValues);
                    }}
                  >
                    <View style={styles.selectOptionContent}>
                      <Text
                        style={[
                          styles.selectOptionText,
                          isSelected && styles.selectOptionTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkmark}>
                          <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
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
              value={bpValue.systolic && bpValue.systolic > 0 ? bpValue.systolic.toString() : ""}
              onChangeText={(text) => {
                const systolic = text === "" ? 0 : parseFloat(text);
                onValueChange({ ...bpValue, systolic: !isNaN(systolic) ? systolic : 0 });
              }}
              keyboardType="numeric"
              style={styles.bpInput}
            />
            <Text style={styles.bpSeparator}>/</Text>
            <TextInput
              mode="outlined"
              label="Diastolic (bottom number)"
              value={bpValue.diastolic && bpValue.diastolic > 0 ? bpValue.diastolic.toString() : ""}
              onChangeText={(text) => {
                const diastolic = text === "" ? 0 : parseFloat(text);
                onValueChange({ ...bpValue, diastolic: !isNaN(diastolic) ? diastolic : 0 });
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
              value={lipidValue.ldl && lipidValue.ldl > 0 ? lipidValue.ldl.toString() : ""}
              onChangeText={(text) => {
                const ldl = text === "" ? 0 : parseFloat(text);
                onValueChange({ ...lipidValue, ldl: !isNaN(ldl) ? ldl : 0 });
              }}
              keyboardType="numeric"
              style={styles.lipidInput}
            />
            <TextInput
              mode="outlined"
              label="HDL (mg/dL)"
              value={lipidValue.hdl && lipidValue.hdl > 0 ? lipidValue.hdl.toString() : ""}
              onChangeText={(text) => {
                const hdl = text === "" ? 0 : parseFloat(text);
                onValueChange({ ...lipidValue, hdl: !isNaN(hdl) ? hdl : 0 });
              }}
              keyboardType="numeric"
              style={styles.lipidInput}
            />
            <TextInput
              mode="outlined"
              label="Total Cholesterol (mg/dL)"
              value={lipidValue.cholesterol && lipidValue.cholesterol > 0 ? lipidValue.cholesterol.toString() : ""}
              onChangeText={(text) => {
                const cholesterol = text === "" ? 0 : parseFloat(text);
                onValueChange({ ...lipidValue, cholesterol: !isNaN(cholesterol) ? cholesterol : 0 });
              }}
              keyboardType="numeric"
              style={styles.lipidInput}
            />
            <TextInput
              mode="outlined"
              label="Triglyceride (mg/dL)"
              value={lipidValue.triglyceride && lipidValue.triglyceride > 0 ? lipidValue.triglyceride.toString() : ""}
              onChangeText={(text) => {
                const triglyceride = text === "" ? 0 : parseFloat(text);
                onValueChange({ ...lipidValue, triglyceride: !isNaN(triglyceride) ? triglyceride : 0 });
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
                display={Platform.OS === "ios" ? "inline" : "calendar"}
                maximumDate={maxDate}
                minimumDate={minDate}
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

  // Check if this is a read-only info question (select-one with no options)
  const isReadOnlyInfo = question.type === "select-one" && 
    "options" in question && 
    (!question.options || question.options.length === 0);

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={isReadOnlyInfo ? styles.infoText : styles.questionText}>
        {question.text}
        {question.required && <Text style={styles.requiredAsterisk}> *</Text>}
      </Text>
      <View style={styles.inputContainer}>{renderInput()}</View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
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
                color="#6D28D9"
                uncheckedColor="#6B7280"
              />
              <Text style={styles.radioLabel}>Yes</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="no"
                status={value === false ? "checked" : "unchecked"}
                onPress={() => onValueChange(false)}
                color="#6D28D9"
                uncheckedColor="#6B7280"
              />
              <Text style={styles.radioLabel}>No</Text>
            </View>
          </View>
        );

      case "height-weight": {
        const hw = (value as { height?: number; weight?: number }) || {};
        return (
          <View style={styles.heightWeightContainer}>
            <TextInput
              mode="outlined"
              label="Height (cm)"
              value={hw.height ? String(hw.height) : ""}
              onChangeText={(t) => {
                const h = parseFloat(t);
                onValueChange({
                  height: !isNaN(h) ? h : undefined,
                  weight: hw.weight,
                });
              }}
              keyboardType="numeric"
              style={styles.heightWeightInput}
            />
            <TextInput
              mode="outlined"
              label="Weight (kg)"
              value={hw.weight ? String(hw.weight) : ""}
              onChangeText={(t) => {
                const w = parseFloat(t);
                onValueChange({
                  height: hw.height,
                  weight: !isNaN(w) ? w : undefined,
                });
              }}
              keyboardType="numeric"
              style={styles.heightWeightInput}
            />
          </View>
        );
      }

      case "select-one":
        const displayValue = getDisplayValue(value);

        return (
          <View style={styles.radioGroup}>
            {question.options?.map((option: string, index: number) => (
              <View key={index} style={styles.radioOption}>
                <RadioButton
                  value={option}
                  status={displayValue === option ? "checked" : "unchecked"}
                  onPress={() => onValueChange(option)}
                  color="#6D28D9"
                  uncheckedColor="#6B7280"
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  questionText: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    fontWeight: "400",
    fontFamily: "PlusJakartaSans_400Regular",
    marginBottom: 2,
  },
  requiredAsterisk: {
    color: "#EF4444",
    fontSize: 14,
  },
  requiredText: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 12,
  },
  inputContainer: {
    marginTop: 12,
  },
  // Modern toggle for yes/no questions
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F3F4F6",
    padding: 4,
    borderRadius: 10,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  toggleOptionActive: {
    backgroundColor: "#6D28D9",
    shadowColor: "#6D28D9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },
  toggleTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  // Modern select options
  selectGroup: {
    gap: 8,
  },
  selectOption: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    minHeight: 50,
  },
  selectOptionActive: {
    backgroundColor: "#EDE9FE",
    borderColor: "#6D28D9",
  },
  selectOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectOptionText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },
  selectOptionTextActive: {
    color: "#6D28D9",
    fontWeight: "600",
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#6D28D9",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  radioGroup: {
    gap: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 13,
    color: "#374151",
  },
  checkboxGroup: {
    gap: 8,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bloodPressureContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bpInput: {
    flex: 1,
  },
  bpSeparator: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9CA3AF",
  },
  cycleDurationsContainer: {
    gap: 10,
  },
  cycleDurationInput: {
    marginBottom: 4,
  },
  lipidContainer: {
    gap: 12,
  },
  lipidInput: {
    marginBottom: 6,
  },
  dateContainer: {
    marginVertical: 4,
  },
  dateButton: {
    marginVertical: 4,
    borderRadius: 10,
  },
  dateButtonContent: {
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: 8,
    fontWeight: "500",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  heightWeightContainer: {
    gap: 10,
  },
  heightWeightInput: {
    marginBottom: 6,
  },
  textInput: {
    marginBottom: 12,
  },
  required: {
    fontSize: 11,
    color: "#6B7280",
    marginLeft: 8,
  },
});
