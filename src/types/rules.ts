import type { ContraceptiveMethodKey, MECScore } from "./contraceptive";
import type { AnswerValue } from "./questionnaire";

/** Master list of all contraceptive methods for WHO MEC evaluation */
export const METHODS: ContraceptiveMethodKey[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
];

/** Section keys for the questionnaire flow */
export type SectionKey =
  | "menstrual-history"
  | "pregnancy-history"
  | "cvs-risk-factors"
  | "prothrombotic"
  | "gyn-history"
  | "rti"
  | "comorbidities"
  | "medication-history"
  | "personalization";

/** Effect applied when a rule triggers */
export interface RuleEffect {
  methodKeys: ContraceptiveMethodKey[];
  mec: MECScore;
  reason: string;
}

/** Rule definition for the rules engine */
export interface Rule {
  id: string;
  section: SectionKey;
  priority: number;
  trigger: (answers: AnswerState) => boolean;
  effects: RuleEffect[];
  description: string;
}

/** Computed values derived from answers (BMI, dates, etc.) */
export interface ComputedValues {
  age?: number;
  bmi?: number;
  daysSinceBirth?: number;
  weeksSinceBirth?: number;
  monthsSinceBirth?: number;
}

/** Answer state passed to rule triggers - includes raw answers and computed values */
export type AnswerState = Record<string, AnswerValue | ComputedValues | undefined> & {
  computed?: ComputedValues;
};

/** MEC result for a single method with reasons (MEC 2/3/4 only) */
export interface MECResult {
  methodKey: ContraceptiveMethodKey;
  score: MECScore;
  reasons: string[];
}

/** Full evaluation result from the rules engine */
export interface EvaluationResult {
  mecResults: MECResult[];
  suggested: ContraceptiveMethodKey[];
  greaterBenefit: ContraceptiveMethodKey[];
  avoid: ContraceptiveMethodKey[];
}
