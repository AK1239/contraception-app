import type { SectionQuestion } from "../types/sections";
import type { MaleSterilizationSectionKey } from "../types/maleSterilizationEligibility";
import type { AnswerValue } from "../types/questionnaire";

/** Male sterilization answer state */
export type MaleSterilizationAnswerState = Record<string, AnswerValue | undefined>;

/** Male sterilization section definition */
export interface MaleSterilizationSection {
  key: MaleSterilizationSectionKey;
  title: string;
  questions: SectionQuestion[];
}

/**
 * Male Sterilization (Vasectomy) Eligibility Questionnaire Sections
 *
 * Logic-driven clinical eligibility tool based on WHO Medical Eligibility Criteria.
 * Most restrictive category (S > D > C > A) applied when multiple conditions exist.
 */
export const MALE_STERILIZATION_SECTIONS: MaleSterilizationSection[] = [
  // Section 1: Core Eligibility Confirmation
  {
    key: "ms-reproductive-intent",
    title: "Section 1: Core Eligibility Confirmation",
    questions: [
      {
        id: "ms-desires-permanent-contraception",
        text: "Does the client desire permanent contraception?",
        type: "yes-no",
        required: true,
        metadata: {
          helpText: "If No, client is not eligible. Counsel on alternative methods.",
        },
      },
    ],
  },

  // Section 2: Personal Characteristics
  {
    key: "ms-personal-characteristics",
    title: "Section 2: Personal Characteristics",
    questions: [
      {
        id: "ms-age",
        text: "Age",
        type: "numeric",
        required: true,
        validation: { min: 18, max: 70 },
        metadata: { unit: "years", placeholder: "Enter age" },
      },
      {
        id: "ms-depressive-disorder",
        text: "Does the client have a diagnosed depressive disorder?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 3: HIV Status
  {
    key: "ms-hiv-status",
    title: "Section 3: HIV Status",
    questions: [
      {
        id: "ms-hiv-positive",
        text: "Is the client known HIV positive?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-who-hiv-stage",
        text: "WHO HIV Clinical Stage",
        type: "select-one",
        required: true,
        metadata: {
          options: [
            { value: "stage-1", label: "Stage 1" },
            { value: "stage-2", label: "Stage 2" },
            { value: "stage-3", label: "Stage 3" },
            { value: "stage-4", label: "Stage 4" },
          ],
        },
        conditional: { dependsOn: "ms-hiv-positive", expectedValue: true },
      },
    ],
  },

  // Section 4: Endocrine Conditions
  {
    key: "ms-endocrine",
    title: "Section 4: Endocrine Conditions",
    questions: [
      {
        id: "ms-has-diabetes",
        text: "Does the client have diabetes mellitus?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-diabetes-controlled",
        text: "Is blood glucose well controlled?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "ms-has-diabetes", expectedValue: true },
      },
    ],
  },

  // Section 5: Anaemia
  {
    key: "ms-anaemia",
    title: "Section 5: Anaemia",
    questions: [
      {
        id: "ms-sickle-cell-disease",
        text: "Does the client have sickle cell disease?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 6: Local Genital Conditions
  {
    key: "ms-genital-conditions",
    title: "Section 6: Local Genital Conditions",
    questions: [
      {
        id: "ms-local-infection",
        text: "Is there any local scrotal/genital infection?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-infection-type",
        text: "Specify type of infection:",
        type: "select-multiple",
        required: false,
        metadata: {
          options: [
            { value: "scrotal-skin", label: "Scrotal skin infection" },
            { value: "active-sti", label: "Active STI" },
            { value: "balanitis", label: "Balanitis" },
            { value: "epididymitis", label: "Epididymitis" },
            { value: "orchitis", label: "Orchitis" },
          ],
        },
        conditional: { dependsOn: "ms-local-infection", expectedValue: true },
      },
    ],
  },

  // Section 7: Systemic Conditions
  {
    key: "ms-systemic-conditions",
    title: "Section 7: Systemic Conditions",
    questions: [
      {
        id: "ms-systemic-infection",
        text: "Does the client have systemic infection or gastroenteritis?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-coagulation-disorder",
        text: "Does the client have a coagulation disorder?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 8: Scrotal Structural Conditions
  {
    key: "ms-scrotal-structural",
    title: "Section 8: Scrotal Structural Conditions",
    questions: [
      {
        id: "ms-previous-scrotal-injury",
        text: "Previous scrotal injury?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-large-varicocele",
        text: "Large varicocele?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-large-hydrocele",
        text: "Large hydrocele?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-filariasis",
        text: "Filariasis (elephantiasis)?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-intrascrotal-mass",
        text: "Intrascrotal mass?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-cryptorchidism",
        text: "Cryptorchidism (undescended testicle)?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ms-inguinal-hernia",
        text: "Inguinal hernia?",
        type: "yes-no",
        required: true,
      },
    ],
  },
];

/** Ordered section keys for navigation */
export const MALE_STERILIZATION_SECTION_ORDER: MaleSterilizationSectionKey[] =
  MALE_STERILIZATION_SECTIONS.map((s) => s.key);
