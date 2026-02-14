// Question types for the medical questionnaire
export type QuestionType =
  | "yes-no"
  | "numeric"
  | "date"
  | "select-one"
  | "select-multiple"
  | "blood-pressure"
  | "lipid-profile"
  | "cycle-durations";

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

export interface CycleDurationsQuestion extends BaseQuestion {
  type: "cycle-durations";
  min?: number;
  max?: number;
  count?: number;
  unit?: string;
}

// Union type for all question types
export type Question =
  | YesNoQuestion
  | NumericQuestion
  | DateQuestion
  | SelectOneQuestion
  | SelectMultipleQuestion
  | BloodPressureQuestion
  | LipidProfileQuestion
  | CycleDurationsQuestion;

// User answer types
export type AnswerValue =
  | boolean
  | number
  | string
  | Date
  | string[]
  | { systolic: number; diastolic: number }
  | { ldl: number; hdl: number; cholesterol: number; triglyceride: number }
  | number[]
  | { height?: number; weight?: number };

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
  preferredFrequency?: "daily" | "every-3-weeks" | "every-3-months" | "every-3-years" | "every-8-years";
  currentBMI?: number;
  answers: Record<string, AnswerValue>;
}
