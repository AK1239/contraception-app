import React, { useRef, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import type { SectionQuestion } from "../../types/sections";
import type { AnswerState } from "../../types/rules";
import type { AnswerValue } from "../../types/questionnaire";
import { getVisibleSectionQuestions } from "../../utils/sectionQuestionVisibility";
import { SectionQuestionInput } from "./SectionQuestionInput";
import { theme } from "../../utils/theme";

/** Section-like shape for questionnaire pages (supports both MEC and FAB sections) */
export interface SectionPageSection {
  title: string;
  questions: SectionQuestion[];
}

interface SectionPageProps {
  section: SectionPageSection;
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
  const scrollViewRef = useRef<ScrollView>(null);
  const questionViewRefs = useRef<Map<string, View>>(new Map());

  // Auto-scroll to next question after answering
  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      onAnswerChange(questionId, value);

      // Find the current question index
      const currentIndex = visibleQuestions.findIndex((q) => q.id === questionId);
      
      // If there's a next question, scroll to it after a brief delay
      if (currentIndex >= 0 && currentIndex < visibleQuestions.length - 1) {
        const nextQuestion = visibleQuestions[currentIndex + 1];
        setTimeout(() => {
          const nextView = questionViewRefs.current.get(nextQuestion.id);
          if (nextView && scrollViewRef.current) {
            nextView.measureLayout(
              // @ts-ignore - measureLayout types are incomplete
              scrollViewRef.current.getNativeScrollRef?.() || scrollViewRef.current,
              (_x, y) => {
                scrollViewRef.current?.scrollTo({
                  y: y - 20, // Scroll with 20px offset from top
                  animated: true,
                });
              },
              () => {
                // Fallback if measureLayout fails
                console.warn("Could not measure question layout for auto-scroll");
              }
            );
          }
        }, 150); // Small delay to allow state update
      }
    },
    [onAnswerChange, visibleQuestions]
  );

  return (
    <ScrollView
      ref={scrollViewRef}
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
          <View 
            key={question.id}
            ref={(ref) => {
              if (ref) {
                questionViewRefs.current.set(question.id, ref);
              } else {
                questionViewRefs.current.delete(question.id);
              }
            }}
          >
            <SectionQuestionInput
              question={question}
              value={answers[question.id] as AnswerValue | undefined}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
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
