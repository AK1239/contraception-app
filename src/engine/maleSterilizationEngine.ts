/**
 * Male Sterilization (Vasectomy) Eligibility Evaluation Engine
 *
 * Logic-driven clinical eligibility tool based on WHO Medical Eligibility Criteria.
 * Applies most restrictive category when multiple conditions exist: S > D > C > A.
 */

import type { MaleSterilizationAnswerState } from "../config/maleSterilizationSections";
import type {
  MaleSterilizationEligibilityResult,
  MaleSterilizationCategory,
} from "../types/maleSterilizationEligibility";

const CATEGORY_LABELS: Record<MaleSterilizationCategory, string> = {
  A: "Accept - Procedure can proceed",
  C: "Caution - Special counselling required",
  D: "Delay - Treat condition first, provide temporary contraception",
  S: "Special Setting - Referral to higher-level facility required",
};

/** Priority: S > D > C > A (higher index = more restrictive) */
const CATEGORY_PRIORITY: Record<MaleSterilizationCategory, number> = {
  S: 4,
  D: 3,
  C: 2,
  A: 1,
};

function mostRestrictive(categories: MaleSterilizationCategory[]): MaleSterilizationCategory {
  if (categories.length === 0) return "A";
  return categories.reduce((a, b) =>
    CATEGORY_PRIORITY[a] >= CATEGORY_PRIORITY[b] ? a : b
  );
}

function getValue<T>(answers: MaleSterilizationAnswerState, id: string): T | undefined {
  return answers[id] as T | undefined;
}

/**
 * Section 1: Core Eligibility - Check reproductive intent
 */
function checkReproductiveIntent(answers: MaleSterilizationAnswerState): boolean {
  const desires = getValue<boolean>(answers, "ms-desires-permanent-contraception");
  return desires === true;
}

/**
 * Section 2: Personal Characteristics
 */
function evaluatePersonalCharacteristics(
  answers: MaleSterilizationAnswerState
): { categories: MaleSterilizationCategory[]; reasons: string[]; alerts: string[] } {
  const categories: MaleSterilizationCategory[] = [];
  const reasons: string[] = [];
  const alerts: string[] = [];

  const age = getValue<number>(answers, "ms-age");
  if (age !== undefined && age < 30) {
    categories.push("C");
    reasons.push(`Young age (${age} years)`);
    alerts.push(
      "Young men should be counselled regarding permanence and possibility of regret."
    );
  }

  const depressiveDisorder = getValue<boolean>(answers, "ms-depressive-disorder");
  if (depressiveDisorder === true) {
    categories.push("C");
    reasons.push("Diagnosed depressive disorder");
    alerts.push("Additional counselling recommended for mental health considerations.");
  }

  return { categories, reasons, alerts };
}

/**
 * Section 3: HIV Status
 */
function evaluateHivStatus(
  answers: MaleSterilizationAnswerState
): { categories: MaleSterilizationCategory[]; reasons: string[] } {
  const categories: MaleSterilizationCategory[] = [];
  const reasons: string[] = [];

  const hivPositive = getValue<boolean>(answers, "ms-hiv-positive");
  if (hivPositive === true) {
    const whoStage = getValue<string>(answers, "ms-who-hiv-stage");
    if (whoStage === "stage-1" || whoStage === "stage-2") {
      categories.push("A");
      reasons.push("HIV Stage 1-2 (acceptable)");
    } else if (whoStage === "stage-3" || whoStage === "stage-4") {
      categories.push("S");
      reasons.push("HIV Stage 3-4 (special setting required)");
    }
  }

  return { categories, reasons };
}

/**
 * Section 4: Endocrine Conditions
 */
function evaluateEndocrine(
  answers: MaleSterilizationAnswerState
): { categories: MaleSterilizationCategory[]; reasons: string[]; alerts: string[] } {
  const categories: MaleSterilizationCategory[] = [];
  const reasons: string[] = [];
  const alerts: string[] = [];

  const hasDiabetes = getValue<boolean>(answers, "ms-has-diabetes");
  if (hasDiabetes === true) {
    categories.push("C");
    const controlled = getValue<boolean>(answers, "ms-diabetes-controlled");
    if (controlled === false) {
      reasons.push("Diabetes mellitus (uncontrolled)");
      alerts.push(
        "Recommend referral for glucose optimization before procedure."
      );
    } else {
      reasons.push("Diabetes mellitus (controlled)");
    }
  }

  return { categories, reasons, alerts };
}

/**
 * Section 5: Anaemia
 */
function evaluateAnaemia(
  answers: MaleSterilizationAnswerState
): { categories: MaleSterilizationCategory[]; reasons: string[] } {
  const categories: MaleSterilizationCategory[] = [];
  const reasons: string[] = [];

  const sickleCellDisease = getValue<boolean>(answers, "ms-sickle-cell-disease");
  if (sickleCellDisease === true) {
    categories.push("A");
    reasons.push("Sickle cell disease (acceptable)");
  }

  return { categories, reasons };
}

/**
 * Section 6: Local Genital Conditions
 */
function evaluateGenitalConditions(
  answers: MaleSterilizationAnswerState
): { categories: MaleSterilizationCategory[]; reasons: string[]; alerts: string[] } {
  const categories: MaleSterilizationCategory[] = [];
  const reasons: string[] = [];
  const alerts: string[] = [];

  const localInfection = getValue<boolean>(answers, "ms-local-infection");
  if (localInfection === true) {
    const infectionTypes = getValue<string[]>(answers, "ms-infection-type");
    if (infectionTypes && infectionTypes.length > 0) {
      categories.push("D");
      const infectionList = infectionTypes
        .map((t) => t.replace(/-/g, " "))
        .join(", ");
      reasons.push(`Local genital infection: ${infectionList}`);
      alerts.push("Delay procedure until infection treated.");
      alerts.push("Provide temporary contraception.");
    }
  }

  return { categories, reasons, alerts };
}

/**
 * Section 7: Systemic Conditions
 */
function evaluateSystemicConditions(
  answers: MaleSterilizationAnswerState
): { categories: MaleSterilizationCategory[]; reasons: string[] } {
  const categories: MaleSterilizationCategory[] = [];
  const reasons: string[] = [];

  const systemicInfection = getValue<boolean>(answers, "ms-systemic-infection");
  if (systemicInfection === true) {
    categories.push("D");
    reasons.push("Systemic infection or gastroenteritis");
  }

  const coagulationDisorder = getValue<boolean>(answers, "ms-coagulation-disorder");
  if (coagulationDisorder === true) {
    categories.push("S");
    reasons.push("Coagulation disorder (special setting required)");
  }

  return { categories, reasons };
}

/**
 * Section 8: Scrotal Structural Conditions
 */
function evaluateScrotalStructural(
  answers: MaleSterilizationAnswerState
): { categories: MaleSterilizationCategory[]; reasons: string[] } {
  const categories: MaleSterilizationCategory[] = [];
  const reasons: string[] = [];

  const scrotalInjury = getValue<boolean>(answers, "ms-previous-scrotal-injury");
  if (scrotalInjury === true) {
    categories.push("C");
    reasons.push("Previous scrotal injury");
  }

  const largeVaricocele = getValue<boolean>(answers, "ms-large-varicocele");
  if (largeVaricocele === true) {
    categories.push("C");
    reasons.push("Large varicocele");
  }

  const largeHydrocele = getValue<boolean>(answers, "ms-large-hydrocele");
  if (largeHydrocele === true) {
    categories.push("C");
    reasons.push("Large hydrocele");
  }

  const filariasis = getValue<boolean>(answers, "ms-filariasis");
  if (filariasis === true) {
    categories.push("D");
    reasons.push("Filariasis (elephantiasis)");
  }

  const intrascrotalMass = getValue<boolean>(answers, "ms-intrascrotal-mass");
  if (intrascrotalMass === true) {
    categories.push("D");
    reasons.push("Intrascrotal mass");
  }

  const cryptorchidism = getValue<boolean>(answers, "ms-cryptorchidism");
  if (cryptorchidism === true) {
    categories.push("S");
    reasons.push("Cryptorchidism (special setting required)");
  }

  const inguinalHernia = getValue<boolean>(answers, "ms-inguinal-hernia");
  if (inguinalHernia === true) {
    categories.push("S");
    reasons.push("Inguinal hernia (special setting required)");
  }

  return { categories, reasons };
}

/**
 * Build clinical recommendation based on category
 */
function buildClinicalRecommendation(
  category: MaleSterilizationCategory,
  alerts: string[]
): string {
  const recommendations: string[] = [];

  if (category === "A") {
    recommendations.push("✓ Procedure can proceed with standard vasectomy protocol.");
    recommendations.push("✓ Provide standard pre-operative counselling.");
  } else if (category === "C") {
    recommendations.push("⚠ Procedure can proceed with caution.");
    recommendations.push("⚠ Enhanced counselling required before proceeding.");
    if (alerts.length > 0) {
      recommendations.push("\nSpecific considerations:");
      alerts.forEach((alert) => recommendations.push(`• ${alert}`));
    }
  } else if (category === "D") {
    recommendations.push("⏸ Delay procedure until condition resolved.");
    recommendations.push("⏸ Treat underlying condition first.");
    recommendations.push("⏸ Provide temporary contraception method.");
    if (alerts.length > 0) {
      recommendations.push("\nRequired actions:");
      alerts.forEach((alert) => recommendations.push(`• ${alert}`));
    }
  } else if (category === "S") {
    recommendations.push("🏥 Refer to higher-level facility with:");
    recommendations.push("• Experienced surgeon");
    recommendations.push("• Advanced surgical capabilities");
    recommendations.push("• Full anesthesia support");
    recommendations.push("• Emergency backup available");
  }

  return recommendations.join("\n");
}

/**
 * Build comprehensive explanation
 */
function buildExplanation(
  category: MaleSterilizationCategory,
  reasons: string[]
): string {
  const baseExplanations: Record<MaleSterilizationCategory, string> = {
    A: "No significant restrictions identified. Client is eligible for male sterilization (vasectomy) with standard procedure.",
    C: "One or more caution conditions present. Client may proceed with enhanced counselling and special considerations.",
    D: "Conditions present that require delaying the procedure. The underlying condition should be treated first, and temporary contraception should be provided.",
    S: "Conditions present that require referral to a higher-level facility with specialized capabilities and experienced surgical team.",
  };

  let explanation = baseExplanations[category];

  if (reasons.length > 0) {
    explanation += "\n\nConditions identified:\n• " + reasons.join("\n• ");
  }

  return explanation;
}

/**
 * Main entry: Evaluate male sterilization eligibility from answers
 */
export function evaluateMaleSterilization(
  answers: MaleSterilizationAnswerState
): MaleSterilizationEligibilityResult {
  // Check reproductive intent first
  if (!checkReproductiveIntent(answers)) {
    return {
      category: "D",
      categoryLabel: "Not Eligible",
      explanation:
        "Client does not desire permanent contraception. Male sterilization is not appropriate at this time.",
      clinicalRecommendation:
        "Counsel client on alternative contraceptive methods including long-acting reversible contraceptives (LARCs).",
      reasons: ["Does not desire permanent contraception"],
      stiAdvisory:
        "Remember: Sterilization does NOT protect against STIs/HIV. Condom use recommended if STI risk present.",
      counsellingAlerts: [
        "Discuss alternative long-acting reversible methods",
        "Explore reasons for seeking contraception",
      ],
      temporaryContraceptionRecommended: true,
      referralRequired: false,
    };
  }

  const allCategories: MaleSterilizationCategory[] = [];
  const allReasons: string[] = [];
  const allAlerts: string[] = [];

  // Section 2: Personal Characteristics
  const personalResult = evaluatePersonalCharacteristics(answers);
  allCategories.push(...personalResult.categories);
  allReasons.push(...personalResult.reasons);
  allAlerts.push(...personalResult.alerts);

  // Section 3: HIV Status
  const hivResult = evaluateHivStatus(answers);
  allCategories.push(...hivResult.categories);
  allReasons.push(...hivResult.reasons);

  // Section 4: Endocrine
  const endocrineResult = evaluateEndocrine(answers);
  allCategories.push(...endocrineResult.categories);
  allReasons.push(...endocrineResult.reasons);
  allAlerts.push(...endocrineResult.alerts);

  // Section 5: Anaemia
  const anaemiaResult = evaluateAnaemia(answers);
  allCategories.push(...anaemiaResult.categories);
  allReasons.push(...anaemiaResult.reasons);

  // Section 6: Genital Conditions
  const genitalResult = evaluateGenitalConditions(answers);
  allCategories.push(...genitalResult.categories);
  allReasons.push(...genitalResult.reasons);
  allAlerts.push(...genitalResult.alerts);

  // Section 7: Systemic Conditions
  const systemicResult = evaluateSystemicConditions(answers);
  allCategories.push(...systemicResult.categories);
  allReasons.push(...systemicResult.reasons);

  // Section 8: Scrotal Structural
  const scrotalResult = evaluateScrotalStructural(answers);
  allCategories.push(...scrotalResult.categories);
  allReasons.push(...scrotalResult.reasons);

  // Determine most restrictive category
  const finalCategory = mostRestrictive(
    allCategories.length > 0 ? allCategories : ["A"]
  );

  // Build results
  const temporaryContraceptionRecommended = finalCategory === "D";
  const referralRequired = finalCategory === "S";

  // Always add mandatory counselling alerts
  const counsellingAlerts = [
    ...allAlerts,
    "Sterilization is permanent",
    "Discuss alternative long-acting reversible methods",
  ];

  return {
    category: finalCategory,
    categoryLabel: CATEGORY_LABELS[finalCategory],
    explanation: buildExplanation(finalCategory, allReasons),
    clinicalRecommendation: buildClinicalRecommendation(
      finalCategory,
      allAlerts
    ),
    reasons: allReasons.length > 0 ? allReasons : ["No restrictions identified"],
    stiAdvisory:
      "Sterilization does NOT protect against STIs/HIV. Recommend consistent condom use if STI risk present.",
    counsellingAlerts,
    temporaryContraceptionRecommended,
    referralRequired,
  };
}
