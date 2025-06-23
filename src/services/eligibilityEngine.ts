import { MECScores, MECScore, UserAnswers } from "../types";
import { INITIAL_MEC_SCORES } from "../constants";

// Date calculation utilities
const calculateDaysSince = (date: Date): number => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const calculateWeeksSince = (date: Date): number => {
  return Math.floor(calculateDaysSince(date) / 7);
};

const calculateMonthsSince = (date: Date): number => {
  const now = new Date();
  return (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
};

// Helper function to update MEC scores
const updateMECScores = (scores: MECScores, updates: Partial<MECScores>): MECScores => {
  const newScores = { ...scores };

  // Only update if the new score is higher (more restrictive)
  Object.entries(updates).forEach(([key, value]) => {
    const methodKey = key as keyof MECScores;
    if (value && value > newScores[methodKey]) {
      newScores[methodKey] = value;
    }
  });

  return newScores;
};

// Helper function to set all scores to a specific value except specified methods
const setAllExcept = (score: MECScore, exceptions: Partial<MECScores> = {}): Partial<MECScores> => {
  const result: Partial<MECScores> = {
    a: score,
    b: score,
    c: score,
    d: score,
    e: score,
    f: score,
    g: score,
  };

  // Apply exceptions
  Object.entries(exceptions).forEach(([key, value]) => {
    result[key as keyof MECScores] = value;
  });

  return result;
};

/**
 * Main function to calculate medical eligibility for contraceptive methods
 * Based on WHO Medical Eligibility Criteria (MEC) 2015
 */
export const calculateEligibility = (answers: UserAnswers): MECScores => {
  let scores: MECScores = { ...INITIAL_MEC_SCORES };

  // Question 1: Age
  const age = answers.age as number;
  if (age) {
    if (age < 18) {
      scores = updateMECScores(scores, { d: 2 });
    }
    if (age < 20) {
      scores = updateMECScores(scores, { f: 2, g: 2 });
    }
    if (age > 39) {
      scores = updateMECScores(scores, { a: 2 });
    }
    if (age > 45) {
      scores = updateMECScores(scores, { d: 2 });
    }
  }

  // Question 2: Ever been pregnant
  const everPregnant = answers.everPregnant as boolean;
  if (everPregnant === false) {
    scores = updateMECScores(scores, { f: 2, g: 2 });
  }

  // Question 3: Given birth in past 2 years
  const birthInPast2Years = answers.birthInPast2Years as boolean;
  if (birthInPast2Years === true) {
    const birthDate = answers.birthDate as Date;
    const isBreastfeeding = answers.isBreastfeeding as boolean;

    if (birthDate) {
      const daysSinceBirth = calculateDaysSince(birthDate);
      const weeksSinceBirth = calculateWeeksSince(birthDate);
      const monthsSinceBirth = calculateMonthsSince(birthDate);

      if (isBreastfeeding) {
        if (daysSinceBirth < 2) {
          scores = updateMECScores(scores, { f: 3, g: 3 });
        } else if (daysSinceBirth >= 2 && daysSinceBirth <= 28) {
          // 2 days to 4 weeks
          scores = updateMECScores(scores, { a: 4, b: 4, c: 2, d: 3, f: 3, g: 3 });
        } else if (weeksSinceBirth >= 4 && weeksSinceBirth <= 6) {
          scores = updateMECScores(scores, { a: 4, b: 4, c: 2, d: 3, f: 1, g: 1 });
        } else if (weeksSinceBirth >= 6 && monthsSinceBirth <= 6) {
          scores = updateMECScores(scores, setAllExcept(1, { a: 3, b: 3 }));
        } else if (monthsSinceBirth > 6) {
          scores = updateMECScores(scores, setAllExcept(1, { a: 2, b: 2 }));
        }
      } else {
        // Not breastfeeding
        const hasRiskFactors = answers.postpartumRiskFactors as boolean;

        if (daysSinceBirth < 21) {
          if (hasRiskFactors) {
            scores = updateMECScores(scores, setAllExcept(1, { a: 4, b: 4 }));
          } else {
            scores = updateMECScores(scores, setAllExcept(1, { a: 3, b: 3 }));
          }
        } else if (daysSinceBirth >= 21 && daysSinceBirth <= 42) {
          if (hasRiskFactors) {
            scores = updateMECScores(scores, setAllExcept(1, { a: 3, b: 3 }));
          } else {
            scores = updateMECScores(scores, setAllExcept(1, { a: 2, b: 2 }));
          }
        }
        // If > 42 days, all remain at 1
      }
    }
  }

  // Question 4: Abortion history
  const hadAbortion = answers.hadAbortion as boolean;
  if (hadAbortion === true) {
    const septicAbortion = answers.septicAbortion as boolean;

    if (septicAbortion === true) {
      scores = updateMECScores(scores, setAllExcept(1, { f: 4, g: 4 }));
    } else {
      const abortionWeek = answers.abortionWeek as number;
      if (abortionWeek >= 13 && abortionWeek <= 26) {
        scores = updateMECScores(scores, setAllExcept(1, { f: 2, g: 2 }));
      }
    }
  }

  // Question 5: Ectopic pregnancy
  const hadEctopic = answers.hadEctopic as boolean;
  if (hadEctopic === true) {
    scores = updateMECScores(scores, setAllExcept(1, { c: 2 }));
  }

  // Question 6: Hypertension
  const hasHypertension = answers.hasHypertension as boolean;
  if (hasHypertension === true) {
    const hasBPReading = answers.hasBPReading as boolean;

    if (hasBPReading === false) {
      scores = updateMECScores(scores, { a: 3, b: 3, c: 2, d: 2, e: 2, g: 2, f: 1 });
    } else {
      const bloodPressure = answers.bloodPressure as { systolic: number; diastolic: number };
      if (bloodPressure) {
        const { systolic, diastolic } = bloodPressure;

        if (systolic < 140 && diastolic < 90) {
          // All remain 1
        } else if (systolic >= 140 && systolic <= 159 && diastolic >= 90 && diastolic <= 99) {
          scores = updateMECScores(scores, setAllExcept(1, { a: 3, b: 3, d: 2 }));
        } else if (systolic > 159 || diastolic > 99) {
          scores = updateMECScores(
            scores,
            setAllExcept(1, { a: 4, b: 4, c: 2, e: 2, g: 2, d: 3, f: 1 })
          );
        }
      }
    }
  }

  // Question 7: DVT (Deep Vein Thrombosis)
  const hasDVT = answers.hasDVT as boolean;
  if (hasDVT === true) {
    const currentDVT = answers.currentDVT as boolean;

    if (currentDVT === true) {
      scores = updateMECScores(scores, { a: 4, b: 4, c: 3, d: 3, e: 3, g: 3, f: 1 });
    } else {
      scores = updateMECScores(scores, { a: 4, b: 4, c: 2, d: 2, e: 2, g: 2, f: 1 });
    }
  } else {
    const familyDVT = answers.familyDVT as boolean;
    if (familyDVT === true) {
      scores = updateMECScores(scores, setAllExcept(1, { a: 2, b: 2 }));
    } else {
      const majorSurgery = answers.majorSurgery as boolean;
      if (majorSurgery === true) {
        const bedRestDays = answers.bedRestDays as number;
        if (bedRestDays > 3) {
          scores = updateMECScores(scores, { a: 4, b: 4, c: 2, d: 2, e: 2, g: 2, f: 1 });
        } else {
          scores = updateMECScores(scores, setAllExcept(1, { a: 2, b: 2 }));
        }
      }
    }
  }

  // Question 9: Stroke (Note: Question 8 appears to be missing in the document)
  const hadStroke = answers.hadStroke as boolean;
  if (hadStroke === true) {
    scores = updateMECScores(scores, { a: 4, b: 4, d: 3, f: 1, c: 2, e: 2, g: 2 });
  }

  // Question 10: Dyslipidemia
  const hasDyslipidemia = answers.hasDyslipidemia as boolean;
  if (hasDyslipidemia === true) {
    const knowsLipidProfile = answers.knowsLipidProfile as boolean;

    if (knowsLipidProfile === true) {
      const lipidProfile = answers.lipidProfile as {
        ldl: number;
        hdl: number;
        cholesterol: number;
        triglyceride: number;
      };
      if (lipidProfile) {
        const { ldl, hdl, cholesterol, triglyceride } = lipidProfile;

        if (ldl > 100 || hdl < 50 || cholesterol > 200 || triglyceride > 150) {
          scores = updateMECScores(scores, setAllExcept(2, { f: 1 }));
        }
      }
    }
  }

  // Question 11: Valvular heart disease
  const hasValvularDisease = answers.hasValvularDisease as boolean;
  if (hasValvularDisease === true) {
    const complicated = answers.complicatedValvular as boolean;

    if (complicated === true) {
      scores = updateMECScores(scores, { a: 4, b: 4, c: 1, d: 1, e: 1, f: 2, g: 2 });
    } else {
      scores = updateMECScores(scores, setAllExcept(1, { a: 2, b: 2 }));
    }
  }

  // Question 12: SLE (Systemic Lupus Erythematosus)
  const hasSLE = answers.hasSLE as boolean;
  if (hasSLE === true) {
    const sleType = answers.sleType as string;

    if (sleType === "antiphospholipid") {
      scores = updateMECScores(scores, { a: 4, b: 4, c: 3, d: 3, e: 3, g: 3, f: 1 });
    } else if (sleType === "clinical") {
      const severeThrombocytopenia = answers.severeThrombocytopenia as boolean;

      if (severeThrombocytopenia === true) {
        scores = updateMECScores(scores, setAllExcept(2, { d: 3, f: 3 }));
      } else {
        const onImmunosuppressive = answers.onImmunosuppressive as boolean;

        if (onImmunosuppressive === true) {
          scores = updateMECScores(scores, setAllExcept(2, {}));
        }
        // If not on immunosuppressive, all remain 1
      }
    }
  }

  // Question 13: Headaches/Migraines
  const hasHeadaches = answers.hasHeadaches as boolean;
  if (hasHeadaches === true) {
    const migraineLike = answers.migraineLike as boolean;

    if (migraineLike === true) {
      const withAura = answers.migraineWithAura as boolean;

      if (withAura === true) {
        scores = updateMECScores(scores, { a: 4, b: 4, c: 2, d: 2, e: 2, g: 2, f: 1 });
      } else {
        if (age && age < 35) {
          scores = updateMECScores(scores, setAllExcept(2, { c: 1, f: 1 }));
        } else {
          scores = updateMECScores(scores, { a: 3, b: 3, c: 1, f: 1, d: 2, e: 2, g: 2 });
        }
      }
    }
  }

  // Question 14: Heavy/prolonged menstrual bleeding
  const heavyBleeding = answers.heavyBleeding as boolean;
  if (heavyBleeding === true) {
    scores = updateMECScores(scores, setAllExcept(2, { a: 1, b: 1, g: 1 }));
  } else {
    const irregularPeriods = answers.irregularPeriods as boolean;
    if (irregularPeriods === true) {
      scores = updateMECScores(scores, setAllExcept(2, { a: 1, b: 1, f: 1, g: 1 }));
    }
  }

  // Question 15: Unexplained vaginal bleeding
  const unexplainedBleeding = answers.unexplainedBleeding as boolean;
  if (unexplainedBleeding === true) {
    scores = updateMECScores(scores, { a: 2, b: 2, c: 2, d: 3, e: 3, f: 4, g: 4 });
  }

  // Question 16: Endometriosis
  const hasEndometriosis = answers.hasEndometriosis as boolean;
  if (hasEndometriosis === true) {
    scores = updateMECScores(scores, setAllExcept(1, { f: 2 }));
  }

  // Question 17: Gestational trophoblastic disease
  const hasGTD = answers.hasGTD as boolean;
  if (hasGTD === true) {
    const hcgTrend = answers.hcgTrend as string;

    if (hcgTrend === "decreasing") {
      scores = updateMECScores(scores, setAllExcept(1, { f: 3, g: 3 }));
    } else if (hcgTrend === "elevated") {
      scores = updateMECScores(scores, setAllExcept(1, { f: 4, g: 4 }));
    }
  }

  // Question 18: Cervical cancer screening
  const hadPapSmear = answers.hadPapSmear as boolean;
  if (hadPapSmear === true) {
    const papResult = answers.papResult as string;

    if (papResult === "cin") {
      scores = updateMECScores(scores, setAllExcept(1, { a: 2, d: 2, e: 2 }));
    } else if (papResult === "cancer") {
      scores = updateMECScores(scores, { a: 2, b: 2, d: 2, e: 2, c: 1, f: 4, g: 4 });
    }
  }

  // Question 19: Breast swelling/cancer
  const hasBreastSwelling = answers.hasBreastSwelling as boolean;
  if (hasBreastSwelling === true) {
    const diagnosed = answers.breastDiagnosed as boolean;

    if (diagnosed === true) {
      const diagnosis = answers.breastDiagnosis as string;

      if (diagnosis === "benign") {
        // All remain 1
      } else if (diagnosis === "cancer") {
        const currentOrRecent = answers.breastCancerRecent as boolean;

        if (currentOrRecent === true) {
          scores = updateMECScores(scores, setAllExcept(4, { f: 1 }));
        } else {
          scores = updateMECScores(scores, setAllExcept(3, { f: 1 }));
        }
      }
    } else {
      scores = updateMECScores(scores, setAllExcept(2, { f: 1 }));
    }
  }

  // Question 20: Endometrial cancer
  const hasEndometrialCancer = answers.hasEndometrialCancer as boolean;
  if (hasEndometrialCancer === true) {
    scores = updateMECScores(scores, setAllExcept(1, { f: 4, g: 4 }));
  }

  // Question 21: Ovarian cancer
  const hasOvarianCancer = answers.hasOvarianCancer as boolean;
  if (hasOvarianCancer === true) {
    scores = updateMECScores(scores, setAllExcept(1, { f: 3, g: 3 }));
  }

  // Question 22: Uterine fibroids
  const hasUterineFibroids = answers.hasUterineFibroids as boolean;
  if (hasUterineFibroids === true) {
    const distortsUterus = answers.fibroidsDistortUterus as boolean;

    if (distortsUterus === true) {
      scores = updateMECScores(scores, setAllExcept(1, { f: 4, g: 4 }));
    }
  }

  // Question 23: Pelvic anatomic abnormalities
  const hasPelvicAbnormalities = answers.hasPelvicAbnormalities as boolean;
  if (hasPelvicAbnormalities === true) {
    const distortsUterus = answers.pelvicDistortsUterus as boolean;

    if (distortsUterus === true) {
      scores = updateMECScores(scores, setAllExcept(1, { f: 4, g: 4 }));
    } else {
      scores = updateMECScores(scores, setAllExcept(1, { f: 2, g: 2 }));
    }
  }

  // Question 24: PID (Pelvic Inflammatory Disease)
  const hasPID = answers.hasPID as boolean;
  if (hasPID === true) {
    const currentPID = answers.currentPID as boolean;

    if (currentPID === true) {
      scores = updateMECScores(scores, setAllExcept(1, { f: 4, g: 4 }));
    } else {
      const subsequentPregnancy = answers.pidSubsequentPregnancy as boolean;

      if (subsequentPregnancy === false) {
        scores = updateMECScores(scores, setAllExcept(1, { f: 2, g: 2 }));
      }
    }
  }

  // Question 25: STI (excluding HIV and Hepatitis B)
  const hasSTI = answers.hasSTI as boolean;
  if (hasSTI === true) {
    scores = updateMECScores(scores, setAllExcept(1, { f: 2, g: 2 }));
  }

  // Question 26: HIV
  const hasHIV = answers.hasHIV as boolean;
  if (hasHIV === true) {
    const whoStage = answers.hivWhoStage as string;

    if (whoStage === "stage1-2") {
      scores = updateMECScores(scores, setAllExcept(1, { f: 2, g: 2 }));
    } else if (whoStage === "stage3-4") {
      scores = updateMECScores(scores, setAllExcept(1, { f: 3, g: 3 }));
    }
  }

  // Question 27: Pelvic TB
  const hasPelvicTB = answers.hasPelvicTB as boolean;
  if (hasPelvicTB === true) {
    scores = updateMECScores(scores, setAllExcept(1, { f: 4, g: 4 }));
  }

  // Question 28: Diabetes mellitus
  const hasDiabetes = answers.hasDiabetes as boolean;
  if (hasDiabetes === true) {
    const diabetesDuration = answers.diabetesDuration as string;

    if (diabetesDuration === "more-than-20-years") {
      scores = updateMECScores(scores, { a: 3, b: 3, c: 2, e: 2, g: 2, d: 3, f: 1 });
    } else if (diabetesDuration === "less-than-20-years") {
      const hasComplications = answers.diabetesComplications as boolean;

      if (hasComplications === true) {
        scores = updateMECScores(scores, { a: 3, b: 3, d: 3, c: 2, e: 2, g: 2, f: 1 });
      } else {
        scores = updateMECScores(scores, setAllExcept(2, { f: 1 }));
      }
    }
  }

  // Question 29: Gallbladder disease
  const hasGallbladder = answers.hasGallbladder as boolean;
  if (hasGallbladder === true) {
    const symptomatic = answers.gallbladderSymptomatic as boolean;

    if (symptomatic === true) {
      const treated = answers.gallbladderTreated as boolean;

      if (treated === true) {
        const treatment = answers.gallbladderTreatment as string;

        if (treatment === "medical") {
          scores = updateMECScores(scores, setAllExcept(2, { a: 3, f: 1 }));
        }
        // Surgical treatment - scores remain as default
      } else {
        scores = updateMECScores(scores, setAllExcept(2, { f: 1 }));
      }
    } else {
      scores = updateMECScores(scores, setAllExcept(2, { f: 1, g: 3 }));
    }
  }

  // Question 30: Pregnancy-related cholestasis
  const hadCholestasis = answers.hadCholestasis as boolean;
  if (hadCholestasis === true) {
    scores = updateMECScores(scores, setAllExcept(1, { a: 2, b: 2 }));
  }

  // Question 31: Hepatitis
  const hasHepatitis = answers.hasHepatitis as boolean;
  if (hasHepatitis === true) {
    const hepatitisType = answers.hepatitisType as string;

    if (hepatitisType === "acute") {
      scores = updateMECScores(scores, setAllExcept(1, { a: 3, b: 3 }));
    }
    // Chronic/carrier/resolved - all remain 1
  }

  // Question 32: Cirrhosis
  const hasCirrhosis = answers.hasCirrhosis as boolean;
  if (hasCirrhosis === true) {
    const decompensated = answers.cirrhosisDecompensated as boolean;

    if (decompensated === true) {
      scores = updateMECScores(scores, setAllExcept(3, { a: 4, f: 1 }));
    }
    // Non-decompensated - all remain 1
  }

  // Question 33: Liver tumor
  const hasLiverTumor = answers.hasLiverTumor as boolean;
  if (hasLiverTumor === true) {
    const tumorType = answers.liverTumorType as string;

    if (tumorType === "hepatocellular-adenoma") {
      scores = updateMECScores(scores, setAllExcept(3, { a: 4, f: 1 }));
    } else if (tumorType === "focal-nodular-hyperplasia") {
      scores = updateMECScores(scores, setAllExcept(2, { f: 1 }));
    } else if (tumorType === "malignant") {
      scores = updateMECScores(scores, { a: 4, b: 4, c: 3, d: 3, e: 3, g: 3, f: 1 });
    }
  }

  // Question 34: Iron deficiency anemia
  const hasAnemia = answers.hasAnemia as boolean;
  if (hasAnemia === true) {
    scores = updateMECScores(scores, setAllExcept(1, { f: 2 }));
  }

  // Question 35: Sickle cell disease
  const hasSickleCell = answers.hasSickleCell as boolean;
  if (hasSickleCell === true) {
    scores = updateMECScores(scores, setAllExcept(1, { a: 2, b: 2, f: 2 }));
  }

  // Question 36: Current medications
  const onMedications = answers.onMedications as boolean;
  if (onMedications === true) {
    const medications = answers.medications as string[];

    if (medications?.includes("ritonavir")) {
      scores = updateMECScores(scores, setAllExcept(2, {}));
    }

    if (medications?.includes("carbamazepine")) {
      scores = updateMECScores(scores, { a: 3, c: 3, b: 2, e: 2, d: 1, f: 1, g: 1 });
    }

    if (medications?.includes("rifampicin")) {
      scores = updateMECScores(scores, { a: 3, c: 3, b: 2, e: 2, d: 1, f: 1, g: 1 });
    }
  }

  return scores;
};

/**
 * Categorize contraceptive methods based on MEC scores
 */
export const categorizeRecommendations = (mecScores: MECScores) => {
  const safe: string[] = []; // MEC 1
  const acceptable: string[] = []; // MEC 2
  const avoid: string[] = []; // MEC 3 & 4

  Object.entries(mecScores).forEach(([method, score]) => {
    if (score === 1) {
      safe.push(method);
    } else if (score === 2) {
      acceptable.push(method);
    } else if (score >= 3) {
      avoid.push(method);
    }
  });

  return { safe, acceptable, avoid };
};

/**
 * Get eligible methods for personalization (MEC 1 and 2)
 */
export const getEligibleMethods = (mecScores: MECScores): string[] => {
  return Object.entries(mecScores)
    .filter(([_, score]) => score <= 2)
    .map(([method, _]) => method);
};
