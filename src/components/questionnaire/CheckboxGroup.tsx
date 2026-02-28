import React, { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import type { SectionQuestion } from "../../types/sections";
import type { AnswerValue } from "../../types/questionnaire";
import type { AnswerState } from "../../types/rules";

interface CheckboxGroupProps {
  /** All questions belonging to this group (already filtered) */
  questions: SectionQuestion[];
  answers: AnswerState;
  onAnswerChange: (questionId: string, value: AnswerValue) => void;
  errors: Record<string, string>;
}

/**
 * Renders a set of yes-no questions as a single card with tickable checkboxes.
 * Ticking an item sets its answer to `true`; unticking sets it to `false`.
 * The rules engine continues to read each question ID independently.
 * Unanswered (undefined) questions are initialised to `false` on mount so
 * the validator treats them as "No" rather than unanswered.
 */
export function CheckboxGroup({
  questions,
  answers,
  onAnswerChange,
  errors,
}: CheckboxGroupProps) {
  // Initialise any unanswered group questions to false on first render
  useEffect(() => {
    for (const q of questions) {
      if (answers[q.id] === undefined) {
        onAnswerChange(q.id, false);
      }
    }
    // Only run on mount (questions list is stable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const groupTitle =
    questions.find((q) => q.metadata?.groupTitle)?.metadata?.groupTitle ?? "";

  const hasError = questions.some((q) => errors[q.id]);

  return (
    <View style={[styles.card, hasError && styles.cardError]}>
      <Text style={styles.groupTitle}>{groupTitle}</Text>

      <View style={styles.itemsContainer}>
        {questions.map((question, index) => {
          const isChecked = answers[question.id] === true;
          const itemError = errors[question.id];

          return (
            <React.Fragment key={question.id}>
              {index > 0 && <View style={styles.divider} />}
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
                onPress={() => onAnswerChange(question.id, !isChecked)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isChecked }}
              >
                <View
                  style={[
                    styles.checkbox,
                    isChecked && styles.checkboxChecked,
                  ]}
                >
                  {isChecked && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
                <Text
                  style={[
                    styles.itemLabel,
                    isChecked && styles.itemLabelChecked,
                  ]}
                >
                  {question.text}
                </Text>
              </Pressable>
              {itemError && (
                <Text style={styles.errorText}>{itemError}</Text>
              )}
            </React.Fragment>
          );
        })}
      </View>

      <View style={styles.hintRow}>
        <Ionicons name="information-circle-outline" size={13} color="#94A3B8" />
        <Text style={styles.hintText}>
          Tick all that apply. Leave blank if none apply.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardError: {
    borderColor: "#EF4444",
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
    lineHeight: 22,
  },
  itemsContainer: {
    gap: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 10,
    gap: 14,
  },
  itemPressed: {
    backgroundColor: "#F8FAFC",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#6D28D9",
    borderColor: "#6D28D9",
  },
  itemLabel: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
  },
  itemLabelChecked: {
    color: "#1E293B",
    fontWeight: "600",
  },
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  hintText: {
    fontSize: 12,
    color: "#94A3B8",
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginLeft: 38,
    marginBottom: 4,
  },
});
