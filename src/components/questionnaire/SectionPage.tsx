import React, { useRef, useCallback, useState, useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView, type NativeSyntheticEvent, type NativeScrollEvent } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import type { SectionQuestion } from "../../types/sections";
import type { AnswerState } from "../../types/rules";
import type { AnswerValue } from "../../types/questionnaire";
import { getVisibleSectionQuestions } from "../../utils/sectionQuestionVisibility";
import { SectionQuestionInput } from "./SectionQuestionInput";
import { CheckboxGroup } from "./CheckboxGroup";
import { theme } from "../../utils/theme";

/**
 * Collapses a flat list of visible questions into renderable "rows":
 * - Questions sharing the same metadata.group become one grouped row
 * - All other questions are individual rows
 */
type QuestionRow =
  | { kind: "single"; question: SectionQuestion }
  | { kind: "group"; groupKey: string; questions: SectionQuestion[] };

function buildRows(questions: SectionQuestion[]): QuestionRow[] {
  const rows: QuestionRow[] = [];
  const seenGroups = new Set<string>();

  for (const q of questions) {
    const group = q.metadata?.group;
    if (group) {
      if (!seenGroups.has(group)) {
        seenGroups.add(group);
        rows.push({
          kind: "group",
          groupKey: group,
          questions: questions.filter((x) => x.metadata?.group === group),
        });
      }
      // subsequent questions in the same group are already included above
    } else {
      rows.push({ kind: "single", question: q });
    }
  }

  return rows;
}

/** Section-like shape for questionnaire pages (supports both MEC and FAB sections) */
export interface SectionPageSection {
  key?: string;
  title: string;
  questions: SectionQuestion[];
}

interface SectionPageProps {
  section: SectionPageSection;
  answers: AnswerState;
  onAnswerChange: (questionId: string, value: AnswerValue) => void;
  errors?: Record<string, string>;
  /** Optional content rendered above the section header (e.g. MEC info box) */
  topContent?: React.ReactNode;
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
  topContent,
}: SectionPageProps) {
  const { t } = useTranslation();
  const visibleQuestions = getVisibleSectionQuestions(section.questions, answers);
  const scrollViewRef = useRef<ScrollView>(null);
  const questionViewRefs = useRef<Map<string, View>>(new Map());
  const [viewportInfo, setViewportInfo] = useState({ scrollY: 0, height: 0 });
  const mountTimeRef = useRef<number>(Date.now());

  // Ensure scroll starts at top when section mounts (prevents auto-scroll-to-bottom from CheckboxGroup init)
  const sectionId = section.key ?? section.title;
  useLayoutEffect(() => {
    mountTimeRef.current = Date.now();
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [sectionId]);

  // Track scroll position and viewport height
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    setViewportInfo({ scrollY, height });
  }, []);

  // Auto-scroll to next question after answering (with smart logic)
  const handleAnswerChange = useCallback(
    (questionId: string, value: AnswerValue) => {
      onAnswerChange(questionId, value);

      // Skip auto-scroll during initial mount period (CheckboxGroup initializes unanswered questions
      // on mount, which would trigger scroll-to-bottom for sections with grouped questions)
      const timeSinceMount = Date.now() - mountTimeRef.current;
      if (timeSinceMount < 400) return;

      // Find the current question index in the CURRENT visible questions
      const currentIndex = visibleQuestions.findIndex((q) => q.id === questionId);
      
      if (currentIndex >= 0) {
        const currentQuestion = visibleQuestions[currentIndex];
        
        // Don't auto-scroll for numeric/date/cycle inputs - let user finish typing/selecting
        if (currentQuestion.type === "numeric" || currentQuestion.type === "date" || currentQuestion.type === "cycle-durations") {
          return;
        }
        
        // Calculate what the NEW visible questions will be after this answer is applied
        // This is crucial for detecting follow-up questions that appear due to this answer
        const updatedAnswers = { ...answers, [questionId]: value };
        const newVisibleQuestions = getVisibleSectionQuestions(section.questions, updatedAnswers);
        
        // Find the current question in the NEW visible questions list
        const newCurrentIndex = newVisibleQuestions.findIndex((q) => q.id === questionId);
        
        // If there's a next question in the NEW list, scroll to it
        if (newCurrentIndex >= 0 && newCurrentIndex < newVisibleQuestions.length - 1) {
          const nextQuestion = newVisibleQuestions[newCurrentIndex + 1];
          
          setTimeout(() => {
            const nextView = questionViewRefs.current.get(nextQuestion.id);
            if (nextView && scrollViewRef.current) {
              nextView.measureLayout(
                // @ts-ignore - measureLayout types are incomplete
                scrollViewRef.current.getNativeScrollRef?.() || scrollViewRef.current,
                (_x, y) => {
                  // Only scroll if next question is in the bottom portion of the viewport or below it
                  // This prevents unnecessary scrolling when the next question is already visible at the top/middle
                  const scrollThreshold = viewportInfo.scrollY + viewportInfo.height * 0.6; // Bottom 40% of screen
                  
                  // Scroll only if the next question is below the threshold (not already visible in top/middle)
                  if (y > scrollThreshold) {
                    scrollViewRef.current?.scrollTo({
                      y: y - 20, // Scroll with 20px offset from top
                      animated: true,
                    });
                  }
                },
                () => {
                  // Fallback if measureLayout fails
                  console.warn("Could not measure question layout for auto-scroll");
                }
              );
            }
          }, 150); // Small delay to allow state update and DOM rendering
        }
      }
    },
    [onAnswerChange, visibleQuestions, viewportInfo, answers, section.questions]
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {topContent}
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>
          {section.title}
        </Text>
        <View style={styles.questionCountBadge}>
          <Text variant="labelSmall" style={styles.questionCountText}>
            {visibleQuestions.length === 1
              ? t("questionnaire.questionCount", { count: visibleQuestions.length })
              : t("questionnaire.questionCountPlural", { count: visibleQuestions.length })}
          </Text>
        </View>
      </View>

      <View style={styles.questionsContainer}>
        {buildRows(visibleQuestions).map((row) => {
          if (row.kind === "group") {
            return (
              <View
                key={row.groupKey}
                ref={(ref) => {
                  // Register the first question of the group so auto-scroll works
                  const firstId = row.questions[0]?.id;
                  if (firstId) {
                    if (ref) {
                      questionViewRefs.current.set(firstId, ref);
                    } else {
                      questionViewRefs.current.delete(firstId);
                    }
                  }
                }}
              >
                <CheckboxGroup
                  questions={row.questions}
                  answers={answers}
                  onAnswerChange={(qId, value) => handleAnswerChange(qId, value)}
                  errors={errors}
                />
              </View>
            );
          }

          const question = row.question;
          return (
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
          );
        })}
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
