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
        <Text variant="headlineSmall" style={styles.title}>
          {section.title}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {visibleQuestions.length} question{visibleQuestions.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.questionsContainer}>
        {visibleQuestions.map((question) => (
          <View key={question.id} style={styles.questionWrapper}>
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
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl * 2,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.semiBold,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  questionsContainer: {
    gap: theme.spacing.lg,
  },
  questionWrapper: {
    marginBottom: theme.spacing.lg,
  },
});
