import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import type { Section } from "../../types/sections";
import type { AnswerState } from "../../types/rules";
import type { AnswerValue } from "../../types/questionnaire";
import { getVisibleSectionQuestions } from "../../utils/sectionQuestionVisibility";
import { SectionQuestionInput } from "./SectionQuestionInput";
import { theme } from "../../utils/theme";

interface SectionPageProps {
  section: Section;
  answers: AnswerState;
  onAnswerChange: (questionId: string, value: AnswerValue) => void;
  errors?: Record<string, string>;
}

/**
 * Renders an entire questionnaire section on one page.
 * All questions in the section are shown with conditional visibility.
 */
export function SectionPage({
  section,
  answers,
  onAnswerChange,
  errors = {},
}: SectionPageProps) {
  const visibleQuestions = getVisibleSectionQuestions(section.questions, answers);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>
          {section.title}
        </Text>
        <View style={styles.questionCountBadge}>
          <Text variant="labelSmall" style={styles.questionCountText}>
            {visibleQuestions.length} question{visibleQuestions.length !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      <View style={styles.questionsContainer}>
        {visibleQuestions.map((question) => (
          <View key={question.id}>
            <SectionQuestionInput
              question={question}
              value={answers[question.id] as AnswerValue | undefined}
              onValueChange={(value) => onAnswerChange(question.id, value)}
              error={errors[question.id]}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    minHeight: 200,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 18,
    flex: 1,
  },
  questionCountBadge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  questionCountText: {
    color: "#6D28D9",
    fontSize: 11,
    fontWeight: "600",
  },
  questionsContainer: {
    gap: 12,
  },
});
