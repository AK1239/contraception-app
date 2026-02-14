/**
 * Female Sterilization Eligibility Evaluation Engine
 *
 * Evaluates eligibility for female surgical sterilization using structured clinical logic.
 * Applies most restrictive category when multiple conditions exist: S > D > C > A.
 */

import type { FemaleSterilizationAnswerState } from "../config/femaleSterilizationSections";
import type {
  SterilizationEligibilityResult,
  SterilizationCategory,
} from "../types/sterilizationEligibility";

const CATEGORY_LABELS: Record<SterilizationCategory, string> = {
  A: "Accept - Proceed",
  C: "Caution - Proceed with precautions",
  D: "Delay - Temporary method recommended until condition resolved",
  S: "Special - Refer to experienced surgeon and higher-level facility",
};

const CLINICAL_ACTIONS: Record<SterilizationCategory, string> = {
  A: "Proceed with standard sterilization procedure and counselling.",
  C: "Proceed with enhanced precautions and specialized counselling.",
  D: "Delay procedure. Treat underlying condition and provide temporary contraception.",
  S: "Refer to higher-level facility with experienced surgeon, general anesthesia capability, and full surgical backup.",
};

/** Priority: S > D > C > A (higher index = more restrictive) */
const CATEGORY_PRIORITY: Record<SterilizationCategory, number> = {
  S: 4,
  D: 3,
  C: 2,
  A: 1,
};

function mostRestrictive(categories: SterilizationCategory[]): SterilizationCategory {
  if (categories.length === 0) return "A";
  return categories.reduce((a, b) =>
    CATEGORY_PRIORITY[a] >= CATEGORY_PRIORITY[b] ? a : b
  );
}

function getValue<T>(answers: FemaleSterilizationAnswerState, id: string): T | undefined {
  return answers[id] as T | undefined;
}

/**
 * Section 1: Exclude Immediate Delay Conditions
 */
function evaluateExcludeDelay(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const pregnant = getValue<boolean>(answers, "fs-currently-pregnant");
  if (pregnant === true) {
    categories.push("D");
    reasons.push("Currently pregnant");
  }

  const unexplainedBleeding = getValue<boolean>(answers, "fs-unexplained-vaginal-bleeding");
  if (unexplainedBleeding === true) {
    categories.push("D");
    reasons.push("Unexplained vaginal bleeding suspicious for serious disease");
  }

  const systemicInfection = getValue<boolean>(answers, "fs-systemic-infection");
  if (systemicInfection === true) {
    categories.push("D");
    reasons.push("Current systemic or severe infection");
  }

  return { categories, reasons };
}

/**
 * Section 2: Postpartum / Post-abortion Status
 */
function evaluatePostpartum(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const isPostpartum = getValue<boolean>(answers, "fs-is-postpartum");
  if (!isPostpartum) return { categories, reasons };

  const daysSinceDelivery = getValue<number>(answers, "fs-days-since-delivery");

  if (daysSinceDelivery !== undefined) {
    if (daysSinceDelivery < 7) {
      categories.push("A");
      reasons.push("Postpartum <7 days (acceptable timing)");
    } else if (daysSinceDelivery >= 7 && daysSinceDelivery <= 41) {
      categories.push("D");
      reasons.push("Postpartum 7-41 days (delay until >42 days)");
    } else if (daysSinceDelivery >= 42) {
      categories.push("A");
      reasons.push("Postpartum ≥42 days (acceptable timing)");
    }
  }

  const severePreeclampsia = getValue<boolean>(answers, "fs-severe-preeclampsia");
  if (severePreeclampsia === true) {
    categories.push("D");
    reasons.push("Severe pre-eclampsia/eclampsia");
  }

  const severeHemorrhage = getValue<boolean>(answers, "fs-severe-postpartum-hemorrhage");
  if (severeHemorrhage === true) {
    categories.push("D");
    reasons.push("Severe postpartum hemorrhage");
  }

  const uterineRupture = getValue<boolean>(answers, "fs-uterine-rupture");
  if (uterineRupture === true) {
    categories.push("S");
    reasons.push("Uterine rupture (requires specialist referral)");
  }

  return { categories, reasons };
}

/**
 * Section 3: Post-abortion
 */
function evaluatePostAbortion(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const isPostAbortion = getValue<boolean>(answers, "fs-is-post-abortion");
  if (!isPostAbortion) return { categories, reasons };

  const complications = getValue<string[]>(answers, "fs-post-abortion-complications");
  if (complications && complications.length > 0) {
    if (complications.includes("uterine-perforation")) {
      categories.push("S");
      reasons.push("Post-abortion uterine perforation (requires specialist referral)");
    }
    const delayComplications = complications.filter(
      (c) => c !== "uterine-perforation"
    );
    if (delayComplications.length > 0) {
      categories.push("D");
      const compList = delayComplications
        .map((c) => c.replace(/-/g, " "))
        .join(", ");
      reasons.push(`Post-abortion complications: ${compList}`);
    }
  } else {
    categories.push("A");
    reasons.push("Post-abortion without complications");
  }

  return { categories, reasons };
}

/**
 * Section 4: Cardiovascular Screen
 */
function evaluateCardiovascular(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const systolic = getValue<number>(answers, "fs-bp-systolic");
  const diastolic = getValue<number>(answers, "fs-bp-diastolic");

  if (systolic !== undefined && diastolic !== undefined) {
    if (systolic >= 160 || diastolic >= 100) {
      categories.push("S");
      reasons.push(`Severe hypertension (BP: ${systolic}/${diastolic} mmHg)`);
    } else if ((systolic >= 140 && systolic < 160) || (diastolic >= 90 && diastolic < 100)) {
      categories.push("C");
      reasons.push(`Moderate hypertension (BP: ${systolic}/${diastolic} mmHg)`);
    }
  }

  const vascularDisease = getValue<boolean>(answers, "fs-vascular-disease");
  if (vascularDisease === true) {
    categories.push("S");
    reasons.push("Vascular disease (requires specialist referral)");
  }

  const ischemicHeartDisease = getValue<boolean>(answers, "fs-ischemic-heart-disease");
  if (ischemicHeartDisease === true) {
    categories.push("D");
    reasons.push("Current ischemic heart disease");
  }

  const historyOfStroke = getValue<boolean>(answers, "fs-history-of-stroke");
  if (historyOfStroke === true) {
    categories.push("C");
    reasons.push("History of stroke");
  }

  const valvularDisease = getValue<string>(answers, "fs-valvular-disease");
  if (valvularDisease === "complicated") {
    categories.push("S");
    reasons.push("Complicated valvular disease (requires specialist referral)");
  } else if (valvularDisease === "uncomplicated") {
    categories.push("C");
    reasons.push("Uncomplicated valvular disease");
  }

  return { categories, reasons };
}

/**
 * Section 5: Thromboembolism
 */
function evaluateThromboembolism(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const acuteDvtPe = getValue<boolean>(answers, "fs-acute-dvt-pe");
  if (acuteDvtPe === true) {
    categories.push("D");
    reasons.push("Acute DVT/PE");
  }

  const onAnticoagulant = getValue<boolean>(answers, "fs-on-anticoagulant");
  if (onAnticoagulant === true) {
    categories.push("S");
    reasons.push("On anticoagulant therapy (requires specialist referral)");
  }

  return { categories, reasons };
}

/**
 * Section 6: HIV & Immunology
 */
function evaluateHivImmunology(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const hivStatus = getValue<string>(answers, "fs-hiv-status");
  if (hivStatus === "stage-1-2") {
    categories.push("A");
    reasons.push("HIV Stage 1-2");
  } else if (hivStatus === "stage-3-4") {
    categories.push("S");
    reasons.push("HIV Stage 3-4 (requires specialist referral)");
  }

  const hasSle = getValue<boolean>(answers, "fs-has-sle");
  if (hasSle === true) {
    const sleComplications = getValue<string[]>(answers, "fs-sle-complications");
    if (sleComplications && sleComplications.length > 0) {
      categories.push("S");
      reasons.push("SLE with complications (requires specialist referral)");
    } else {
      categories.push("C");
      reasons.push("SLE without complications");
    }
  }

  return { categories, reasons };
}

/**
 * Section 7: Endocrine
 */
function evaluateEndocrine(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const hasDiabetes = getValue<boolean>(answers, "fs-has-diabetes");
  if (hasDiabetes === true) {
    const complications = getValue<string>(answers, "fs-diabetes-complications");
    if (complications === "vascular" || complications === "duration-over-20") {
      categories.push("S");
      reasons.push("Diabetes with vascular complications or >20 years duration");
    } else {
      categories.push("C");
      reasons.push("Diabetes without complications");
    }
  }

  const thyroidDisorder = getValue<string>(answers, "fs-thyroid-disorder");
  if (thyroidDisorder === "hyperthyroid") {
    categories.push("S");
    reasons.push("Hyperthyroid disorder (requires specialist referral)");
  } else if (thyroidDisorder === "hypothyroid") {
    categories.push("C");
    reasons.push("Hypothyroid disorder");
  } else if (thyroidDisorder === "simple-goitre") {
    categories.push("A");
    reasons.push("Simple goitre");
  }

  return { categories, reasons };
}

/**
 * Section 8: Haematology
 */
function evaluateHaematology(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const haemoglobin = getValue<number>(answers, "fs-haemoglobin");
  if (haemoglobin !== undefined) {
    if (haemoglobin < 7) {
      categories.push("D");
      reasons.push(`Severe anaemia (Hb: ${haemoglobin} g/dL)`);
    } else if (haemoglobin >= 7 && haemoglobin < 10) {
      categories.push("C");
      reasons.push(`Moderate anaemia (Hb: ${haemoglobin} g/dL)`);
    }
  }

  const coagulationDisorder = getValue<boolean>(answers, "fs-coagulation-disorder");
  if (coagulationDisorder === true) {
    categories.push("S");
    reasons.push("Coagulation disorder (requires specialist referral)");
  }

  return { categories, reasons };
}

/**
 * Section 9: Respiratory
 */
function evaluateRespiratory(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const acuteRespiratory = getValue<boolean>(answers, "fs-acute-respiratory");
  if (acuteRespiratory === true) {
    categories.push("D");
    reasons.push("Acute bronchitis or pneumonia");
  }

  const chronicLungDisease = getValue<boolean>(answers, "fs-chronic-lung-disease");
  if (chronicLungDisease === true) {
    categories.push("S");
    reasons.push("Chronic severe lung disease (requires specialist referral)");
  }

  return { categories, reasons };
}

/**
 * Section 10: Gynecologic & Surgical Factors
 */
function evaluateGynecologic(
  answers: FemaleSterilizationAnswerState
): { categories: SterilizationCategory[]; reasons: string[] } {
  const categories: SterilizationCategory[] = [];
  const reasons: string[] = [];

  const gynecologicCancer = getValue<boolean>(answers, "fs-gynecologic-cancer");
  if (gynecologicCancer === true) {
    categories.push("D");
    reasons.push("Gynecologic cancer awaiting treatment");
  }

  const endometriosis = getValue<boolean>(answers, "fs-endometriosis");
  if (endometriosis === true) {
    categories.push("S");
    reasons.push("Endometriosis (requires specialist referral)");
  }

  const previousSurgery = getValue<boolean>(answers, "fs-previous-abdominal-surgery");
  if (previousSurgery === true) {
    categories.push("C");
    reasons.push("Previous abdominal or pelvic surgery");
  }

  // Calculate BMI
  const weight = getValue<number>(answers, "fs-weight");
  const height = getValue<number>(answers, "fs-height");
  if (weight !== undefined && height !== undefined) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi >= 30) {
      categories.push("C");
      reasons.push(`BMI ≥30 (${bmi.toFixed(1)})`);
    }
  }

  const fixedUterus = getValue<boolean>(answers, "fs-fixed-uterus");
  if (fixedUterus === true) {
    categories.push("S");
    reasons.push("Fixed uterus due to surgery or infection (requires specialist referral)");
  }

  return { categories, reasons };
}

/**
 * Check counselling confirmation
 */
function checkCounselling(answers: FemaleSterilizationAnswerState): boolean {
  const understands = getValue<boolean>(answers, "fs-understands-permanence");
  const alternativesDiscussed = getValue<boolean>(answers, "fs-alternatives-discussed");
  const consentDocumented = getValue<boolean>(answers, "fs-informed-consent");

  return understands === true && alternativesDiscussed === true && consentDocumented === true;
}

/**
 * Check STI risk for advisory
 */
function checkStiRisk(answers: FemaleSterilizationAnswerState): boolean {
  const stiRisk = getValue<boolean>(answers, "fs-sti-risk");
  return stiRisk === true;
}

/**
 * Build explanation based on category
 */
function buildExplanation(
  category: SterilizationCategory,
  reasons: string[]
): string {
  const baseExplanations: Record<SterilizationCategory, string> = {
    A: "No significant restrictions identified. Client is eligible for female sterilization with standard procedure and counselling.",
    C: "One or more caution conditions present. Client may proceed with enhanced precautions and specialized counselling.",
    D: "Conditions present that require delaying the procedure. The underlying condition should be treated first. Provide temporary contraception until resolved.",
    S: "Conditions present that require referral to a higher-level facility with experienced surgeon, general anesthesia capability, and full surgical backup.",
  };

  let explanation = baseExplanations[category];
  
  if (reasons.length > 0) {
    explanation += "\n\nConditions identified:\n• " + reasons.join("\n• ");
  }

  return explanation;
}

/**
 * Main entry: Evaluate female sterilization eligibility from answers
 */
export function evaluateFemaleSterilization(
  answers: FemaleSterilizationAnswerState
): SterilizationEligibilityResult {
  const allCategories: SterilizationCategory[] = [];
  const allReasons: string[] = [];

  // Section 1: Exclude immediate delay
  const excludeResult = evaluateExcludeDelay(answers);
  allCategories.push(...excludeResult.categories);
  allReasons.push(...excludeResult.reasons);

  // Section 2: Postpartum
  const postpartumResult = evaluatePostpartum(answers);
  allCategories.push(...postpartumResult.categories);
  allReasons.push(...postpartumResult.reasons);

  // Section 3: Post-abortion
  const postAbortionResult = evaluatePostAbortion(answers);
  allCategories.push(...postAbortionResult.categories);
  allReasons.push(...postAbortionResult.reasons);

  // Section 4: Cardiovascular
  const cardiovascularResult = evaluateCardiovascular(answers);
  allCategories.push(...cardiovascularResult.categories);
  allReasons.push(...cardiovascularResult.reasons);

  // Section 5: Thromboembolism
  const thromboembolismResult = evaluateThromboembolism(answers);
  allCategories.push(...thromboembolismResult.categories);
  allReasons.push(...thromboembolismResult.reasons);

  // Section 6: HIV & Immunology
  const hivImmunologyResult = evaluateHivImmunology(answers);
  allCategories.push(...hivImmunologyResult.categories);
  allReasons.push(...hivImmunologyResult.reasons);

  // Section 7: Endocrine
  const endocrineResult = evaluateEndocrine(answers);
  allCategories.push(...endocrineResult.categories);
  allReasons.push(...endocrineResult.reasons);

  // Section 8: Haematology
  const haematologyResult = evaluateHaematology(answers);
  allCategories.push(...haematologyResult.categories);
  allReasons.push(...haematologyResult.reasons);

  // Section 9: Respiratory
  const respiratoryResult = evaluateRespiratory(answers);
  allCategories.push(...respiratoryResult.categories);
  allReasons.push(...respiratoryResult.reasons);

  // Section 10: Gynecologic
  const gynecologicResult = evaluateGynecologic(answers);
  allCategories.push(...gynecologicResult.categories);
  allReasons.push(...gynecologicResult.reasons);

  // Determine most restrictive category
  const finalCategory = mostRestrictive(allCategories.length > 0 ? allCategories : ["A"]);

  // Check counselling and STI risk
  const counsellingConfirmed = checkCounselling(answers);
  const hasStiRisk = checkStiRisk(answers);

  const stiAdvisory = hasStiRisk
    ? "Sterilization does NOT protect against STIs or HIV. Recommend consistent condom use."
    : undefined;

  return {
    category: finalCategory,
    categoryLabel: CATEGORY_LABELS[finalCategory],
    explanation: buildExplanation(finalCategory, allReasons),
    clinicalAction: CLINICAL_ACTIONS[finalCategory],
    reasons: allReasons,
    stiAdvisory,
    counsellingConfirmed,
  };
}
