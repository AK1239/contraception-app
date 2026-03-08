/**
 * Emergency Contraception Safety - Section Configuration
 *
 * Single-section, checkbox-driven input. Unticked = No (0), Ticked = Yes (1).
 * WHO MEC 2025.
 */

import type { AnswerValue } from "../types/questionnaire";

/** ECP answer state - checkbox values (true=1, false=0) + numeric inputs */
export type ECPAnswerState = Record<string, AnswerValue | undefined>;

/** Checkbox variable names from spec */
export const ECP_CHECKBOX_IDS = [
  "pregnancy",
  "breastfeeding",
  "ectopic_history",
  "severe_CVD",
  "migraine",
  "severe_liver_disease",
  "CYP3A4_inducer",
  "repeat_ECP_cycle",
  "sexual_assault",
] as const;

/** Numeric input IDs */
export const ECP_NUMERIC_IDS = ["hours_since_intercourse", "BMI"] as const;

/** Single section with all inputs - designed for <30 seconds input time */
export const ECP_SECTIONS = [
  {
    key: "ecp-patient-inputs",
    title: "Emergency Contraception Safety Assessment",
    questions: [
      // Numeric inputs first (required for time window)
      {
        id: "hours_since_intercourse",
        text: "Hours since unprotected intercourse",
        type: "numeric" as const,
        required: true,
        validation: { min: 0, max: 168 },
        metadata: { unit: "hours", placeholder: "Enter hours" },
      },
      {
        id: "BMI",
        text: "Body mass index",
        type: "numeric" as const,
        required: false,
        validation: { min: 10, max: 80 },
        metadata: { unit: "kg/m²", placeholder: "Enter BMI (optional)" },
      },
      // Checkbox group - Patient Input Checkboxes
      {
        id: "pregnancy",
        text: "Suspected or confirmed pregnancy",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes", groupTitle: "Patient factors (tick if yes)" },
      },
      {
        id: "breastfeeding",
        text: "Breastfeeding",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
      {
        id: "ectopic_history",
        text: "History of ectopic pregnancy",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
      {
        id: "severe_CVD",
        text: "History of severe cardiovascular disease (ischemic heart disease, stroke, thromboembolism)",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
      {
        id: "migraine",
        text: "Migraine",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
      {
        id: "severe_liver_disease",
        text: "Severe liver disease (jaundice/cirrhosis)",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
      {
        id: "CYP3A4_inducer",
        text: "Taking CYP3A4 enzyme-inducing medications (rifampicin, carbamazepine, phenytoin, phenobarbital, efavirenz, rifabutin, oxcarbazepine, primidone, St John's wort)",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
      {
        id: "repeat_ECP_cycle",
        text: "Repeated ECP use in same cycle",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
      {
        id: "sexual_assault",
        text: "Sexual assault / rape",
        type: "yes-no" as const,
        required: false,
        metadata: { group: "ecp-checkboxes" },
      },
    ],
  },
];
