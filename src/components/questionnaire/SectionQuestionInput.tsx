import React from "react";
import type { SectionQuestion } from "../../types/sections";
import type { AnswerValue } from "../../types/questionnaire";
import { QuestionInput } from "../QuestionInput";
import type { Question } from "../../types/questionnaire";

/**
 * Maps SectionQuestion to Question format for QuestionInput compatibility
 */
function toQuestionFormat(sq: SectionQuestion): Question {
  const base = {
    id: sq.id,
    text: sq.text,
    type: sq.type,
    required: sq.required,
    conditionalOn: sq.conditional
      ? { questionId: sq.conditional.dependsOn, expectedValue: sq.conditional.expectedValue }
      : undefined,
  };

  switch (sq.type) {
    case "numeric":
      return {
        ...base,
        type: "numeric",
        min: sq.validation?.min,
        max: sq.validation?.max,
        unit: sq.metadata?.unit,
      };
    case "select-one":
      return {
        ...base,
        type: "select-one",
        options: sq.metadata?.options ?? [],
      };
    case "select-multiple":
      return {
        ...base,
        type: "select-multiple",
        options: sq.metadata?.options ?? [],
      };
    case "date":
      return {
        ...base,
        type: "date",
        minDate: sq.validation?.minDate,
        maxDate: sq.validation?.maxDate,
      };
    case "blood-pressure":
      return { ...base, type: "blood-pressure" };
    case "lipid-profile":
      return { ...base, type: "lipid-profile" };
    default:
      return { ...base, type: sq.type };
  }
}

interface SectionQuestionInputProps {
  question: SectionQuestion;
  value: AnswerValue | undefined;
  onValueChange: (value: AnswerValue) => void;
  error?: string;
}

export function SectionQuestionInput({
  question,
  value,
  onValueChange,
  error,
}: SectionQuestionInputProps) {
  const questionFormat = toQuestionFormat(question);

  return (
    <QuestionInput
      question={questionFormat}
      value={value}
      onValueChange={onValueChange}
      error={error}
    />
  );
}
