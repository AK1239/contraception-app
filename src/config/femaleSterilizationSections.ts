import type { SectionQuestion } from "../types/sections";
import type { FemaleSterilizationSectionKey } from "../types/sterilizationEligibility";
import type { AnswerValue } from "../types/questionnaire";

/** Female sterilization answer state */
export type FemaleSterilizationAnswerState = Record<string, AnswerValue | undefined>;

/** Female sterilization section definition */
export interface FemaleSterilizationSection {
  key: FemaleSterilizationSectionKey;
  title: string;
  questions: SectionQuestion[];
}

/**
 * Female Sterilization Eligibility Questionnaire Sections
 *
 * Gated question flow with conditional branching.
 * Most restrictive category (S > D > C > A) applied when multiple conditions exist.
 */
export const FEMALE_STERILIZATION_SECTIONS: FemaleSterilizationSection[] = [
  // Section 1: Exclude Immediate Delay Conditions
  {
    key: "fs-exclude-delay",
    title: "Section 1: Initial Screening",
    questions: [
      {
        id: "fs-currently-pregnant",
        text: "Is the client currently pregnant?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-unexplained-vaginal-bleeding",
        text: "Is there unexplained vaginal bleeding suspicious for serious disease?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-systemic-infection",
        text: "Does the client have any current systemic or severe infection?",
        type: "yes-no",
        required: true,
        metadata: {
          helpText: "Examples: puerperal sepsis, severe respiratory infection, systemic infection, acute hepatitis, current PID, purulent cervicitis, chlamydia, gonorrhea"
        },
      },
    ],
  },

  // Section 2: Postpartum / Post-abortion Status
  {
    key: "fs-postpartum",
    title: "Section 2: Postpartum Status",
    questions: [
      {
        id: "fs-is-postpartum",
        text: "Is the client postpartum?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-days-since-delivery",
        text: "Days since delivery",
        type: "numeric",
        required: true,
        validation: { min: 1, max: 365 },
        metadata: { unit: "days", placeholder: "Enter days" },
        conditional: { dependsOn: "fs-is-postpartum", expectedValue: true },
      },
      {
        id: "fs-severe-preeclampsia",
        text: "Was there severe pre-eclampsia or eclampsia?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "fs-is-postpartum", expectedValue: true },
      },
      {
        id: "fs-severe-postpartum-hemorrhage",
        text: "Was there severe postpartum hemorrhage?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "fs-is-postpartum", expectedValue: true },
      },
      {
        id: "fs-uterine-rupture",
        text: "Was there uterine rupture?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "fs-is-postpartum", expectedValue: true },
      },
    ],
  },

  // Section 3: Post-abortion
  {
    key: "fs-post-abortion",
    title: "Section 3: Post-abortion Status",
    questions: [
      {
        id: "fs-is-post-abortion",
        text: "Is this post-abortion?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-post-abortion-complications",
        text: "Are any of the following present?",
        type: "select-multiple",
        required: false,
        metadata: {
          options: [
            { value: "sepsis", label: "Sepsis" },
            { value: "severe-hemorrhage", label: "Severe hemorrhage" },
            { value: "genital-tract-trauma", label: "Genital tract trauma" },
            { value: "uterine-perforation", label: "Uterine perforation" },
            { value: "acute-hematometra", label: "Acute hematometra" },
          ],
        },
        conditional: { dependsOn: "fs-is-post-abortion", expectedValue: true },
      },
    ],
  },

  // Section 4: Cardiovascular Screen
  {
    key: "fs-cardiovascular",
    title: "Section 4: Cardiovascular Screen",
    questions: [
      {
        id: "fs-bp-systolic",
        text: "Systolic Blood Pressure",
        type: "numeric",
        required: true,
        validation: { min: 60, max: 250 },
        metadata: { unit: "mmHg", placeholder: "Enter systolic BP" },
      },
      {
        id: "fs-bp-diastolic",
        text: "Diastolic Blood Pressure",
        type: "numeric",
        required: true,
        validation: { min: 40, max: 150 },
        metadata: { unit: "mmHg", placeholder: "Enter diastolic BP" },
      },
      {
        id: "fs-vascular-disease",
        text: "Does the client have vascular disease?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-ischemic-heart-disease",
        text: "Does the client have current ischemic heart disease?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-history-of-stroke",
        text: "Does the client have a history of stroke?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-valvular-disease",
        text: "Does the client have valvular heart disease?",
        type: "select-one",
        required: true,
        metadata: {
          options: [
            { value: "none", label: "No valvular disease" },
            { value: "uncomplicated", label: "Uncomplicated valvular disease" },
            { value: "complicated", label: "Complicated (pulmonary hypertension, atrial fibrillation, endocarditis)" },
          ],
        },
      },
    ],
  },

  // Section 5: Thromboembolism
  {
    key: "fs-thromboembolism",
    title: "Section 5: Thromboembolism",
    questions: [
      {
        id: "fs-acute-dvt-pe",
        text: "Does the client have acute DVT/PE?",
        type: "yes-no",
        required: true,
        metadata: { helpText: "Deep Vein Thrombosis / Pulmonary Embolism" },
      },
      {
        id: "fs-on-anticoagulant",
        text: "Is the client on anticoagulant therapy?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 6: HIV & Immunology
  {
    key: "fs-hiv-immunology",
    title: "Section 6: HIV & Immunology",
    questions: [
      {
        id: "fs-hiv-status",
        text: "HIV status",
        type: "select-one",
        required: true,
        metadata: {
          options: [
            { value: "negative", label: "Negative" },
            { value: "unknown", label: "Unknown" },
            { value: "stage-1-2", label: "Stage 1-2" },
            { value: "stage-3-4", label: "Stage 3-4" },
          ],
        },
      },
      {
        id: "fs-has-sle",
        text: "Does the client have SLE (Systemic Lupus Erythematosus)?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-sle-complications",
        text: "Does the client have any of the following SLE complications?",
        type: "select-multiple",
        required: false,
        metadata: {
          options: [
            { value: "antiphospholipid", label: "Positive antiphospholipid antibodies" },
            { value: "thrombocytopenia", label: "Severe thrombocytopenia" },
            { value: "immunosuppressants", label: "On immunosuppressants" },
          ],
        },
        conditional: { dependsOn: "fs-has-sle", expectedValue: true },
      },
    ],
  },

  // Section 7: Endocrine
  {
    key: "fs-endocrine",
    title: "Section 7: Endocrine",
    questions: [
      {
        id: "fs-has-diabetes",
        text: "Does the client have diabetes?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-diabetes-complications",
        text: "Are any of the following present?",
        type: "select-one",
        required: true,
        metadata: {
          options: [
            { value: "none", label: "No complications" },
            { value: "vascular", label: "Vascular complications" },
            { value: "duration-over-20", label: "Duration >20 years" },
          ],
        },
        conditional: { dependsOn: "fs-has-diabetes", expectedValue: true },
      },
      {
        id: "fs-thyroid-disorder",
        text: "Thyroid disorder status",
        type: "select-one",
        required: true,
        metadata: {
          options: [
            { value: "none", label: "No thyroid disorder" },
            { value: "hyperthyroid", label: "Hyperthyroid" },
            { value: "hypothyroid", label: "Hypothyroid" },
            { value: "simple-goitre", label: "Simple goitre" },
          ],
        },
      },
    ],
  },

  // Section 8: Haematology
  {
    key: "fs-haematology",
    title: "Section 8: Haematology",
    questions: [
      {
        id: "fs-haemoglobin",
        text: "Haemoglobin level",
        type: "numeric",
        required: true,
        validation: { min: 3, max: 20 },
        metadata: { unit: "g/dL", placeholder: "Enter Haemoglobin" },
      },
      {
        id: "fs-coagulation-disorder",
        text: "Does the client have a coagulation disorder?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 9: Respiratory
  {
    key: "fs-respiratory",
    title: "Section 9: Respiratory",
    questions: [
      {
        id: "fs-acute-respiratory",
        text: "Does the client have acute bronchitis or pneumonia?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-chronic-lung-disease",
        text: "Does the client have chronic severe lung disease?",
        type: "yes-no",
        required: true,
        metadata: { helpText: "Examples: severe asthma, emphysema, chronic bronchitis" },
      },
    ],
  },

  // Section 10: Gynecologic & Surgical Factors
  {
    key: "fs-gynecologic",
    title: "Section 10: Gynecologic & Surgical Factors",
    questions: [
      {
        id: "fs-gynecologic-cancer",
        text: "Does the client have current cervical, endometrial, or ovarian cancer awaiting treatment?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-endometriosis",
        text: "Does the client have endometriosis?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-previous-abdominal-surgery",
        text: "Has the client had previous abdominal or pelvic surgery?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-weight",
        text: "Weight",
        type: "numeric",
        required: true,
        validation: { min: 20, max: 300 },
        metadata: { unit: "kg", placeholder: "Enter weight" },
      },
      {
        id: "fs-height",
        text: "Height",
        type: "numeric",
        required: true,
        validation: { min: 100, max: 250 },
        metadata: { unit: "cm", placeholder: "Enter height" },
      },
      {
        id: "fs-fixed-uterus",
        text: "Does the client have a fixed uterus due to surgery or infection?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 11: STI Risk
  {
    key: "fs-sti-risk",
    title: "Section 11: STI/HIV Risk",
    questions: [
      {
        id: "fs-sti-risk",
        text: "Is the client at risk for STI/HIV?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 12: Counselling Check (Final)
  {
    key: "fs-counselling-check",
    title: "Section 12: Counselling Confirmation",
    questions: [
      {
        id: "fs-understands-permanence",
        text: "Does the client understand the permanence of sterilization?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-alternatives-discussed",
        text: "Have alternative contraceptive methods been discussed?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fs-informed-consent",
        text: "Has informed consent been documented?",
        type: "yes-no",
        required: true,
      },
    ],
  },
];

/** Ordered section keys for navigation */
export const FEMALE_STERILIZATION_SECTION_ORDER: FemaleSterilizationSectionKey[] =
  FEMALE_STERILIZATION_SECTIONS.map((s) => s.key);
