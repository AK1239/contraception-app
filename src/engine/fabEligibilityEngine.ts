/**
 * Natural Method (FAB) Eligibility Evaluation Engine
 *
 * Evaluates SYM (Symptoms-Based) and CAL (Calendar-Based) eligibility separately.
 * Applies most restrictive category when multiple conditions exist: D > C > A.
 */

import type { FABAnswerState } from "../config/fabSections";
import type {
  FABEligibilityResult,
  FABMethodResult,
  FABCategory,
  FABAdvisory,
} from "../types/fabEligibility";

const CATEGORY_LABELS: Record<FABCategory, string> = {
  A: "Accept (no restriction)",
  C: "Caution (enhanced counselling required)",
  D: "Delay (temporary method recommended until condition resolved)",
};

const METHOD_NAMES = {
  SYM: "Symptoms-Based Method (SYM)",
  CAL: "Calendar-Based Method (CAL)",
};

/** Priority: D > C > A (higher index = more restrictive) */
const CATEGORY_PRIORITY: Record<FABCategory, number> = {
  D: 3,
  C: 2,
  A: 1,
};

function mostRestrictive(categories: FABCategory[]): FABCategory {
  if (categories.length === 0) return "A";
  return categories.reduce((a, b) =>
    CATEGORY_PRIORITY[a] >= CATEGORY_PRIORITY[b] ? a : b
  );
}

function getValue<T>(answers: FABAnswerState, id: string): T | undefined {
  return answers[id] as T | undefined;
}

function isPregnant(answers: FABAnswerState): boolean {
  return getValue<string>(answers, "fab-currently-pregnant") === "yes";
}

function isPostpartum(answers: FABAnswerState): boolean {
  return getValue<boolean>(answers, "fab-delivered-last-6-months") === true;
}

function getWeeksSinceDelivery(answers: FABAnswerState): number | undefined {
  const v = getValue<number>(answers, "fab-weeks-since-delivery");
  return typeof v === "number" ? v : undefined;
}

function isBreastfeeding(answers: FABAnswerState): boolean {
  return getValue<boolean>(answers, "fab-currently-breastfeeding") === true;
}

function hasMensesResumed(answers: FABAnswerState): boolean {
  return getValue<boolean>(answers, "fab-menses-resumed") === true;
}

/**
 * Evaluate postpartum logic for SYM and CAL
 */
function evaluatePostpartum(
  answers: FABAnswerState
): { sym: FABCategory; cal: FABCategory } | null {
  if (!isPostpartum(answers)) return null;

  const weeks = getWeeksSinceDelivery(answers);
  const breastfeeding = isBreastfeeding(answers);
  const mensesResumed = hasMensesResumed(answers);

  if (breastfeeding) {
    if (weeks !== undefined && weeks < 6) {
      return { sym: "D", cal: "D" };
    }
    if (weeks !== undefined && weeks >= 6 && !mensesResumed) {
      return { sym: "C", cal: "D" };
    }
    if (mensesResumed) {
      return { sym: "C", cal: "C" };
    }
    // Default when weeks unknown
    return { sym: "C", cal: "D" };
  }

  // Not breastfeeding
  if (weeks !== undefined && weeks < 4) {
    return { sym: "D", cal: "D" };
  }
  if (weeks !== undefined && weeks >= 4) {
    return { sym: "A", cal: "D" };
  }
  return { sym: "C", cal: "D" };
}

/**
 * Build SYM and CAL results from all contributing factors
 */
function evaluateFABEligibility(answers: FABAnswerState): FABEligibilityResult {
  // Section 1: Currently pregnant → Not applicable
  if (isPregnant(answers)) {
    return {
      notApplicable: true,
      notApplicableMessage:
        "FAB methods are not relevant during pregnancy.",
      sym: null,
      cal: null,
      advisories: [],
    };
  }

  const symReasons: FABCategory[] = [];
  const calReasons: FABCategory[] = [];
  const advisories: FABAdvisory[] = [];

  // Section 2: Postpartum
  const postpartumResult = evaluatePostpartum(answers);
  if (postpartumResult) {
    symReasons.push(postpartumResult.sym);
    calReasons.push(postpartumResult.cal);
  }

  // Section 3: Recent abortion
  const abortionRecent = getValue<boolean>(answers, "fab-abortion-last-4-weeks");
  if (abortionRecent === true) {
    symReasons.push("C");
    calReasons.push("D");
  }

  // Section 4: Life stage
  const yearsSinceMenarche = getValue<number>(answers, "fab-years-since-menarche");
  if (yearsSinceMenarche !== undefined && yearsSinceMenarche <= 2) {
    symReasons.push("C");
    calReasons.push("C");
  }
  const perimenopausal = getValue<boolean>(answers, "fab-perimenopausal-symptoms");
  if (perimenopausal === true) {
    symReasons.push("C");
    calReasons.push("C");
  }

  // Section 5: Menstrual & infection
  const irregularBleeding = getValue<boolean>(answers, "fab-irregular-vaginal-bleeding");
  if (irregularBleeding === true) {
    symReasons.push("D");
    calReasons.push("D");
  }
  const abnormalDischarge = getValue<boolean>(answers, "fab-abnormal-vaginal-discharge");
  if (abnormalDischarge === true) {
    symReasons.push("D");
    calReasons.push("A");
  }

  // Section 6: Drugs & medical
  const medsAffectCycle = getValue<boolean>(answers, "fab-medications-affect-cycle");
  if (medsAffectCycle === true) {
    symReasons.push("C");
    calReasons.push("C");
    advisories.push({
      id: "medication-evaluation",
      type: "medication-evaluation",
      message: "Further evaluation of cycle stability required.",
    });
  }
  const chronicElevatedTemp = getValue<boolean>(answers, "fab-chronic-elevated-temperature");
  if (chronicElevatedTemp === true) {
    symReasons.push("C");
    calReasons.push("A");
  }
  const acuteFebrile = getValue<boolean>(answers, "fab-acute-febrile-illness");
  if (acuteFebrile === true) {
    symReasons.push("D");
    calReasons.push("A");
  }

  // Section 7: STI/HIV advisory (does not change A/C/D)
  const stiRisk = getValue<boolean>(answers, "fab-sti-hiv-risk");
  if (stiRisk === true) {
    advisories.push({
      id: "sti-advisory",
      type: "sti",
      message:
        "FAB methods do NOT protect against STIs/HIV. Recommend correct and consistent condom use.",
    });
  }

  // Section 8: High-risk pregnancy advisory (does not change A/C/D)
  const highRiskPregnancy = getValue<boolean>(answers, "fab-high-risk-pregnancy");
  if (highRiskPregnancy === true) {
    advisories.push({
      id: "high-risk-pregnancy",
      type: "high-risk-pregnancy",
      message:
        "FAB methods may not be appropriate due to relatively higher typical-use failure rates.",
    });
  }

  // Apply most restrictive category; default to A if no restrictions
  const symCategory = mostRestrictive(symReasons.length > 0 ? symReasons : ["A"]);
  const calCategory = mostRestrictive(calReasons.length > 0 ? calReasons : ["A"]);

  const sym = buildMethodResult("SYM", symCategory, getExplanation("SYM", symCategory));
  const cal = buildMethodResult("CAL", calCategory, getExplanation("CAL", calCategory));

  return {
    notApplicable: false,
    sym,
    cal,
    advisories,
  };
}

function buildMethodResult(
  method: "SYM" | "CAL",
  category: FABCategory,
  explanation: string
): FABMethodResult {
  const actionRequired =
    category === "C"
      ? "Enhanced counselling required before use."
      : category === "D"
        ? "Recommend temporary method until condition resolved."
        : undefined;

  return {
    method,
    methodName: METHOD_NAMES[method],
    category,
    categoryLabel: CATEGORY_LABELS[category],
    explanation,
    actionRequired,
  };
}

function getExplanation(method: "SYM" | "CAL", category: FABCategory): string {
  if (category === "A") {
    return method === "SYM"
      ? "No identified restrictions for symptoms-based tracking. Client may use SYM with standard counselling."
      : "No identified restrictions for calendar-based tracking. Client may use CAL with standard counselling.";
  }
  if (category === "C") {
    return method === "SYM"
      ? "One or more caution conditions present (e.g., postpartum, perimenopause, medications). Enhanced counselling and cycle stability evaluation recommended."
      : "One or more caution conditions present (e.g., irregular cycles, perimenopause). Enhanced counselling recommended.";
  }
  return method === "SYM"
    ? "Conditions present that temporarily limit reliability of fertility signs (e.g., recent delivery, irregular bleeding, acute illness). Recommend alternative method until resolved."
    : "Conditions present that limit calendar method reliability. Recommend alternative method until resolved.";
}

/**
 * Main entry: evaluate FAB eligibility from answers
 */
export function evaluateFAB(answers: FABAnswerState): FABEligibilityResult {
  return evaluateFABEligibility(answers);
}
