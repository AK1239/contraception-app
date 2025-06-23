// Question types for the medical questionnaire
export type QuestionType =
  | "yes-no"
  | "numeric"
  | "date"
  | "select-one"
  | "select-multiple"
  | "blood-pressure"
  | "lipid-profile";

// Base question interface
export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  conditionalOn?: {
    questionId: string;
    expectedValue: any;
  };
}

// Specific question types
export interface YesNoQuestion extends BaseQuestion {
  type: "yes-no";
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  min?: number;
  max?: number;
  unit?: string;
}

export interface DateQuestion extends BaseQuestion {
  type: "date";
  maxDate?: Date;
  minDate?: Date;
}

export interface SelectOneQuestion extends BaseQuestion {
  type: "select-one";
  options: Array<{
    value: string;
    label: string;
  }>;
}

export interface SelectMultipleQuestion extends BaseQuestion {
  type: "select-multiple";
  options: Array<{
    value: string;
    label: string;
  }>;
}

export interface BloodPressureQuestion extends BaseQuestion {
  type: "blood-pressure";
}

export interface LipidProfileQuestion extends BaseQuestion {
  type: "lipid-profile";
}

// Union type for all question types
export type Question =
  | YesNoQuestion
  | NumericQuestion
  | DateQuestion
  | SelectOneQuestion
  | SelectMultipleQuestion
  | BloodPressureQuestion
  | LipidProfileQuestion;

// User answer types
export type AnswerValue =
  | boolean
  | number
  | string
  | Date
  | string[]
  | { systolic: number; diastolic: number }
  | { ldl: number; hdl: number; cholesterol: number; triglyceride: number };

export interface UserAnswer {
  questionId: string;
  value: AnswerValue;
  timestamp: Date;
}

// Complete user responses
export type UserAnswers = Record<string, AnswerValue>;

// Medical questionnaire sections
export type QuestionnaireSection =
  | "pregnancy-check"
  | "basic-info"
  | "reproductive-history"
  | "cardiovascular"
  | "neurological"
  | "reproductive-health"
  | "cancers"
  | "infections"
  | "metabolic"
  | "liver"
  | "hematologic"
  | "medications";

// Questionnaire state
export interface QuestionnaireState {
  currentSection: QuestionnaireSection;
  currentQuestionIndex: number;
  answers: UserAnswers;
  isComplete: boolean;
}

// Personalization types
export interface PersonalizationAnswer {
  questionId: string;
  value: AnswerValue;
}

export interface PersonalizationState {
  wantsFuturePregnancy?: boolean;
  okayWithIrregularPeriods?: boolean;
  wantsSurgicalMethod?: boolean;
  preferredFrequency?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "long-term";
  currentBMI?: number;
  answers: Record<string, AnswerValue>;
}
