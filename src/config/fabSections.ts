import type { SectionQuestion } from "../types/sections";
import type { FABSectionKey } from "../types/fabEligibility";
import type { AnswerValue } from "../types/questionnaire";

/** FAB answer state - same shape as MEC for compatibility */
export type FABAnswerState = Record<string, AnswerValue | undefined>;

/** FAB section definition */
export interface FABSection {
  key: FABSectionKey;
  title: string;
  questions: SectionQuestion[];
}

/**
 * Natural Method (FAB) Eligibility Questionnaire Sections
 *
 * Conditional branching: questions/sections shown based on previous answers.
 * Most restrictive category (D > C > A) applied when multiple conditions exist.
 */
export const FAB_SECTIONS: FABSection[] = [
  // Section 1: Current Pregnancy (START HERE)
  {
    key: "fab-current-pregnancy",
    title: "Section 1: Current Pregnancy",
    questions: [
      {
        id: "fab-currently-pregnant",
        text: "Is the client currently pregnant?",
        type: "select-one",
        required: true,
        metadata: {
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unsure", label: "Unsure" },
          ],
        },
      },
    ],
  },

  // Section 2: Postpartum (only if NOT pregnant)
  {
    key: "fab-postpartum",
    title: "Section 2: Postpartum Status",
    questions: [
      {
        id: "fab-delivered-last-6-months",
        text: "Has the client delivered a baby within the last 6 months?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fab-weeks-since-delivery",
        text: "Weeks since delivery",
        type: "numeric",
        required: true,
        validation: { min: 1, max: 52 },
        metadata: { unit: "weeks", placeholder: "Enter weeks" },
        conditional: { dependsOn: "fab-delivered-last-6-months", expectedValue: true },
      },
      {
        id: "fab-currently-breastfeeding",
        text: "Is the client currently breastfeeding?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "fab-delivered-last-6-months", expectedValue: true },
      },
      {
        id: "fab-menses-resumed",
        text: "Has menses resumed?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "fab-currently-breastfeeding", expectedValue: true },
      },
    ],
  },

  // Section 3: Recent Abortion (only if NOT pregnant)
  {
    key: "fab-recent-abortion",
    title: "Section 3: Recent Abortion",
    questions: [
      {
        id: "fab-abortion-last-4-weeks",
        text: "Has the client had an abortion within the last 4 weeks?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 4: Life Stage
  {
    key: "fab-life-stage",
    title: "Section 4: Life Stage",
    questions: [
      {
        id: "fab-age",
        text: "Age",
        type: "numeric",
        required: true,
        validation: { min: 10, max: 70 },
        metadata: { unit: "years", placeholder: "Enter age" },
      },
      {
        id: "fab-years-since-menarche",
        text: "Years since menarche (first period)",
        type: "numeric",
        required: true,
        validation: { min: 0, max: 60 },
        metadata: { unit: "years", placeholder: "Enter years" },
      },
      {
        id: "fab-perimenopausal-symptoms",
        text: "Perimenopausal symptoms? (cycle irregularity, hot flashes)",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 5: Menstrual & Infection Status
  {
    key: "fab-menstrual-infection",
    title: "Section 5: Menstrual & Infection Status",
    questions: [
      {
        id: "fab-irregular-vaginal-bleeding",
        text: "Is there irregular vaginal bleeding?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fab-abnormal-vaginal-discharge",
        text: "Is there abnormal vaginal discharge?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 6: Drugs & Medical Conditions
  {
    key: "fab-drugs-medical",
    title: "Section 6: Drugs & Medical Conditions",
    questions: [
      {
        id: "fab-medications-affect-cycle",
        text: "Is the client using medications that affect ovulation, hormones, cycle regularity, or fertility signs?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fab-chronic-elevated-temperature",
        text: "Does the client have chronic disease causing persistent elevated temperature?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fab-acute-febrile-illness",
        text: "Does the client have an acute febrile illness?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 7: STI/HIV Risk
  {
    key: "fab-sti-risk",
    title: "Section 7: STI/HIV Risk",
    questions: [
      {
        id: "fab-sti-hiv-risk",
        text: "Is the client at risk for STI/HIV?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 8: Pregnancy Risk Severity
  {
    key: "fab-pregnancy-risk",
    title: "Section 8: Pregnancy Risk Severity",
    questions: [
      {
        id: "fab-high-risk-pregnancy",
        text: "Does the client have a condition where pregnancy would pose a serious health risk?",
        type: "yes-no",
        required: true,
      },
    ],
  },
];

/** Ordered section keys for navigation (excluding current-pregnancy which is always first) */
export const FAB_SECTION_ORDER: FABSectionKey[] = FAB_SECTIONS.map((s) => s.key);
