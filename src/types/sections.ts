import type { QuestionType } from "./questionnaire";
import type { AnswerState } from "./rules";
import type { SectionKey } from "./rules";

/** Validation rule for question inputs */
export interface ValidationRule {
  min?: number;
  max?: number;
  minDate?: Date;
  maxDate?: Date;
  pattern?: RegExp;
}

/** Question metadata for display and validation */
export interface QuestionMetadata {
  unit?: string;
  placeholder?: string;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
}

/** Base question definition for section config */
export interface SectionQuestion {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  conditional?: {
    dependsOn: string;
    expectedValue: unknown;
  };
  validation?: ValidationRule;
  metadata?: QuestionMetadata;
}

/** Section definition with questions and skip logic */
export interface Section {
  key: SectionKey;
  title: string;
  questions: SectionQuestion[];
  /** If true, skip entire section (e.g. Section 2 when never pregnant) */
  skipLogic?: (answers: AnswerState) => boolean;
}
