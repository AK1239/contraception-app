/**
 * Emergency Contraception Safety Engine - WHO MEC 2025
 *
 * Implements the algorithm exactly as specified:
 * Steps 1-11 applied sequentially. Checkbox: ticked=1 (yes), unticked=0 (no).
 */

import type { ECPAnswerState } from "../config/ecpSections";
import type {
  ECPSafetyResult,
  ECPMethodResult,
  ECPWarning,
  MECCategory,
  EligibilityStatus,
  SafetyClassification,
  ECPMethod,
} from "../types/ecpSafety";

/** Get checkbox value: true = 1 (yes), false/undefined = 0 (no) */
function getCheckbox(answers: ECPAnswerState, id: string): number {
  const v = answers[id];
  return v === true ? 1 : 0;
}

function getNumeric(answers: ECPAnswerState, id: string): number | undefined {
  const v = answers[id];
  if (typeof v === "number" && !isNaN(v)) return v;
  return undefined;
}

function mecToSafety(mec: MECCategory): SafetyClassification {
  if (mec === 1) return "SAFE";
  if (mec === 2) return "USE_WITH_CAUTION";
  return "AVOID";
}

function buildMethodResult(
  method: ECPMethod,
  mec: MECCategory,
  eligibility: EligibilityStatus,
  methodName: string,
  methodNameKey: string
): ECPMethodResult {
  return {
    method,
    methodName,
    methodNameKey,
    mec,
    eligibility,
    safetyClassification: mecToSafety(mec),
  };
}

/**
 * Main evaluation - follows algorithm Steps 1-11 exactly
 */
export function evaluateECPSafety(answers: ECPAnswerState): ECPSafetyResult {
  const pregnancy = getCheckbox(answers, "pregnancy");
  const breastfeeding = getCheckbox(answers, "breastfeeding");
  // ectopic_history: Step 5 - MEC unchanged (1), no action needed
  const severe_CVD = getCheckbox(answers, "severe_CVD");
  const migraine = getCheckbox(answers, "migraine");
  const severe_liver_disease = getCheckbox(answers, "severe_liver_disease");
  const CYP3A4_inducer = getCheckbox(answers, "CYP3A4_inducer");
  const repeat_ECP_cycle = getCheckbox(answers, "repeat_ECP_cycle");
  const sexual_assault = getCheckbox(answers, "sexual_assault");

  const hours_since_intercourse = getNumeric(answers, "hours_since_intercourse");
  const BMI = getNumeric(answers, "BMI");

  const warnings: ECPWarning[] = [];

  // ─── Step 1: Pregnancy ─────────────────────────────────────────────────────
  if (pregnancy === 1) {
    return {
      notApplicable: true,
      notApplicableMessage:
        "ECPs cannot be used in confirmed or suspected pregnancy.",
      notApplicableMessageKey: "ecp.results.notApplicableMessage",
      lng: null,
      upa: null,
      coc: null,
      recommendedOption: "",
      recommendedOptionKey: "",
      alternativeOptions: [],
      alternativeOptionsKeys: [],
      warnings: [],
      doseInstructions: {
        lng: "",
        lngKey: "",
        upa: "",
        upaKey: "",
        coc: "",
        cocKey: "",
      },
      clinicalReminders: [],
      clinicalRemindersKeys: [],
    };
  }

  // ─── Step 2: Time since intercourse ─────────────────────────────────────────
  let lngEligibility: EligibilityStatus = "ELIGIBLE";
  let upaEligibility: EligibilityStatus = "ELIGIBLE";
  let cocEligibility: EligibilityStatus = "ELIGIBLE";

  const hours = hours_since_intercourse ?? 0;

  if (hours <= 72) {
    lngEligibility = "ELIGIBLE";
    upaEligibility = "ELIGIBLE";
    cocEligibility = "ELIGIBLE";
  } else if (hours > 72 && hours <= 120) {
    lngEligibility = "ELIGIBLE";
    upaEligibility = "PREFERRED";
    cocEligibility = "LESS_EFFECTIVE";
  } else {
    // > 120 hours
    lngEligibility = "NOT_RECOMMENDED";
    upaEligibility = "NOT_RECOMMENDED";
    cocEligibility = "NOT_RECOMMENDED";
  }

  // If >120h, return early with copper IUD suggestion
  if (hours > 120) {
    const timeWarnings: ECPWarning[] = [
      {
        id: "time-window",
        type: "warning",
        message: "All ECPs not recommended after 120 hours. Suggest copper IUD.",
        messageKey: "ecp.warnings.timeWindowExceeded",
      },
    ];
    if (BMI !== undefined && BMI >= 30) {
      timeWarnings.push({
        id: "obesity",
        type: "advisory",
        message:
          "Effectiveness may be reduced in obesity; consider copper IUD if available.",
        messageKey: "ecp.warnings.obesity",
      });
    }
    if (CYP3A4_inducer === 1) {
      timeWarnings.push({
        id: "cyp3a4",
        type: "warning",
        message:
          "Hormone levels may be reduced. Consider double-dose LNG (3 mg).",
        messageKey: "ecp.warnings.cyp3a4",
      });
    }
    if (sexual_assault === 1) {
      timeWarnings.push({
        id: "sexual-assault",
        type: "reminder",
        message:
          "Offer STI prophylaxis, offer HIV PEP, provide psychological support.",
        messageKey: "ecp.warnings.sexualAssault",
      });
    }
    return {
      notApplicable: false,
      lng: buildMethodResult(
        "LNG",
        1,
        "NOT_RECOMMENDED",
        "LNG 1.5 mg",
        "ecp.methods.lng"
      ),
      upa: buildMethodResult(
        "UPA",
        1,
        "NOT_RECOMMENDED",
        "UPA 30 mg",
        "ecp.methods.upa"
      ),
      coc: buildMethodResult(
        "COC",
        1,
        "NOT_RECOMMENDED",
        "COC Yuzpe",
        "ecp.methods.coc"
      ),
      recommendedOption: "Copper IUD (insert within 5 days)",
      recommendedOptionKey: "ecp.results.copperIUDRecommended",
      alternativeOptions: [],
      alternativeOptionsKeys: [],
      warnings: timeWarnings,
      doseInstructions: {
        lng: "1.5 mg single dose or 0.75 mg × 2 doses 12h apart",
        lngKey: "ecp.dose.lng",
        upa: "30 mg single dose",
        upaKey: "ecp.dose.upa",
        coc: "100 µg EE + 0.5 mg LNG × 2 doses 12h apart",
        cocKey: "ecp.dose.coc",
      },
      clinicalReminders: [
        "ECPs do not prevent STIs",
        "Recommend condom use and regular contraception counseling",
      ],
      clinicalRemindersKeys: [
        "ecp.reminders.noSTI",
        "ecp.reminders.condomCounseling",
      ],
    };
  }

  // ─── Steps 3–10: MEC calculation (start at 1) ───────────────────────────────
  let mecLNG: MECCategory = 1;
  let mecUPA: MECCategory = 1;
  let mecCOC: MECCategory = 1;

  // Step 3: Breastfeeding
  if (breastfeeding === 1) {
    mecLNG = 1;
    mecCOC = 1;
    mecUPA = 2;
    warnings.push({
      id: "breastfeeding",
      type: "warning",
      message:
        "Avoid breastfeeding for 7 days after UPA. Express and discard breast milk.",
      messageKey: "ecp.warnings.breastfeeding",
    });
  }

  // Step 4: Obesity (advisory only, MEC unchanged)
  if (BMI !== undefined && BMI >= 30) {
    warnings.push({
      id: "obesity",
      type: "advisory",
      message:
        "Effectiveness may be reduced in obesity; consider copper IUD if available.",
      messageKey: "ecp.warnings.obesity",
    });
  }

  // Step 5: Ectopic history - MEC unchanged (1)
  // No change needed

  // Step 6: Cardiovascular disease
  if (severe_CVD === 1) {
    mecLNG = Math.max(mecLNG, 2) as MECCategory;
    mecUPA = Math.max(mecUPA, 2) as MECCategory;
    mecCOC = Math.max(mecCOC, 2) as MECCategory;
    warnings.push({
      id: "cvd",
      type: "warning",
      message: "Use with caution due to CVD risk.",
      messageKey: "ecp.warnings.cvd",
    });
  }

  // Step 7: Migraine
  if (migraine === 1) {
    mecLNG = Math.max(mecLNG, 2) as MECCategory;
    mecUPA = Math.max(mecUPA, 2) as MECCategory;
    mecCOC = Math.max(mecCOC, 2) as MECCategory;
  }

  // Step 8: Severe liver disease
  if (severe_liver_disease === 1) {
    mecLNG = Math.max(mecLNG, 2) as MECCategory;
    mecUPA = Math.max(mecUPA, 2) as MECCategory;
    mecCOC = Math.max(mecCOC, 2) as MECCategory;
  }

  // Step 9: CYP3A4 inducers (warning only)
  if (CYP3A4_inducer === 1) {
    warnings.push({
      id: "cyp3a4",
      type: "warning",
      message:
        "Hormone levels may be reduced. Consider double-dose LNG (3 mg).",
      messageKey: "ecp.warnings.cyp3a4",
    });
  }

  // Step 10: Repeated ECP use (MEC=1, advisory)
  if (repeat_ECP_cycle === 1) {
    mecLNG = 1;
    mecUPA = 1;
    mecCOC = 1;
    warnings.push({
      id: "repeat-ecp",
      type: "advisory",
      message: "Repeated use may cause irregular bleeding.",
      messageKey: "ecp.warnings.repeatEcp",
    });
  }

  // Step 11: Sexual assault (reminder only)
  if (sexual_assault === 1) {
    warnings.push({
      id: "sexual-assault",
      type: "reminder",
      message:
        "Offer STI prophylaxis, offer HIV PEP, provide psychological support.",
      messageKey: "ecp.warnings.sexualAssault",
    });
  }

  // ─── Build method results ────────────────────────────────────────────────────
  const lng = buildMethodResult(
    "LNG",
    mecLNG,
    lngEligibility,
    "LNG 1.5 mg",
    "ecp.methods.lng"
  );
  const upa = buildMethodResult(
    "UPA",
    mecUPA,
    upaEligibility,
    "UPA 30 mg",
    "ecp.methods.upa"
  );
  const coc = buildMethodResult(
    "COC",
    mecCOC,
    cocEligibility,
    "COC Yuzpe",
    "ecp.methods.coc"
  );

  // ─── Recommended option (time window + MEC) ───────────────────────────────────
  // If >72h and ≤120h: UPA preferred. Otherwise: first eligible with MEC 1 or 2
  let recommendedOption = "";
  let recommendedOptionKey = "";
  const alternativeOptions: string[] = [];
  const alternativeOptionsKeys: string[] = [];

  if (hours > 72 && hours <= 120) {
    if (mecUPA <= 2) {
      recommendedOption = "UPA 30 mg (most effective ≤120h)";
      recommendedOptionKey = "ecp.results.recommendedUpa";
      if (mecLNG <= 2 && lngEligibility === "ELIGIBLE") {
        alternativeOptions.push("LNG 1.5 mg");
        alternativeOptionsKeys.push("ecp.results.altLng");
      }
      if (mecCOC <= 2) {
        alternativeOptions.push("COC Yuzpe method");
        alternativeOptionsKeys.push("ecp.results.altCoc");
      }
    } else {
      // UPA not suitable, try LNG
      if (mecLNG <= 2) {
        recommendedOption = "LNG 1.5 mg";
        recommendedOptionKey = "ecp.results.altLng";
      }
      if (mecCOC <= 2) {
        alternativeOptions.push("COC Yuzpe method");
        alternativeOptionsKeys.push("ecp.results.altCoc");
      }
    }
  } else {
    // ≤72h: all eligible
    if (mecUPA <= 2) {
      recommendedOption = "UPA 30 mg";
      recommendedOptionKey = "ecp.results.recommendedUpaShort";
    }
    if (mecLNG <= 2) {
      if (!recommendedOption) {
        recommendedOption = "LNG 1.5 mg";
        recommendedOptionKey = "ecp.results.altLng";
      } else {
        alternativeOptions.push("LNG 1.5 mg");
        alternativeOptionsKeys.push("ecp.results.altLng");
      }
    }
    if (mecCOC <= 2) {
      alternativeOptions.push("COC Yuzpe method");
      alternativeOptionsKeys.push("ecp.results.altCoc");
    }
  }

  // Fallback if no recommended
  if (!recommendedOption && alternativeOptions.length > 0) {
    recommendedOption = alternativeOptions[0];
    recommendedOptionKey = alternativeOptionsKeys[0];
  }

  return {
    notApplicable: false,
    lng,
    upa,
    coc,
    recommendedOption,
    recommendedOptionKey,
    alternativeOptions,
    alternativeOptionsKeys,
    warnings,
    doseInstructions: {
      lng: "1.5 mg single dose or 0.75 mg × 2 doses 12h apart",
      lngKey: "ecp.dose.lng",
      upa: "30 mg single dose",
      upaKey: "ecp.dose.upa",
      coc: "100 µg EE + 0.5 mg LNG × 2 doses 12h apart",
      cocKey: "ecp.dose.coc",
    },
    clinicalReminders: [
      "ECPs do not prevent STIs",
      "Recommend condom use and regular contraception counseling",
    ],
    clinicalRemindersKeys: [
      "ecp.reminders.noSTI",
      "ecp.reminders.condomCounseling",
    ],
  };
}
