import { Question } from "../types/questionnaire";

/**
 * Medical Safety Questionnaire Configuration
 * Based on WHO Medical Eligibility Criteria (MEC) 2015
 * All 36 questions from the app requirements
 */

export const MEDICAL_SAFETY_QUESTIONS: Question[] = [
  // Pregnancy Check (prerequisite)
  {
    id: "pregnancy-check",
    text: "Please confirm that you're not currently pregnant",
    type: "select-one",
    required: true,
    options: [
      { value: "not-pregnant", label: "Yes, I'm not pregnant" },
      { value: "pregnant", label: "I'm pregnant" },
    ],
  },

  // Question 1: Age
  {
    id: "age",
    text: "What is your age?",
    type: "numeric",
    required: true,
    min: 10,
    max: 70,
    unit: "years",
  },

  // Question 2: Ever been pregnant
  {
    id: "everPregnant",
    text: "Have you ever been pregnant?",
    type: "yes-no",
    required: true,
  },

  // Question 3: Birth in past 2 years
  {
    id: "birthInPast2Years",
    text: "Have you given birth to a child in the past 2 years?",
    type: "yes-no",
    required: true,
  },

  // Question 3.1: Birth date (conditional)
  {
    id: "birthDate",
    text: "When was your last birth?",
    type: "date",
    required: true,
    conditionalOn: {
      questionId: "birthInPast2Years",
      expectedValue: true,
    },
    maxDate: new Date(),
  },

  // Question 3.2: Breastfeeding (conditional)
  {
    id: "isBreastfeeding",
    text: "Are you currently breastfeeding your child?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "birthInPast2Years",
      expectedValue: true,
    },
  },

  // Question 3.3: Postpartum risk factors (conditional)
  {
    id: "postpartumRiskFactors",
    text: "Do you have any of the following: previous history of DVT (swollen single whole leg with red skin), cancer requiring treatment, history of heart failure, history of varicose veins, undergone surgery in the past 4 weeks or will undergo surgery soon, bedridden, or smoking?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "isBreastfeeding",
      expectedValue: false,
    },
  },

  // Question 4: Abortion history
  {
    id: "hadAbortion",
    text: "Have you ever had an abortion?",
    type: "yes-no",
    required: true,
  },

  // Question 4.1: Septic abortion (conditional)
  {
    id: "septicAbortion",
    text: "Was it a septic abortion (abortion accompanied with signs of infection)?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hadAbortion",
      expectedValue: true,
    },
  },

  // Question 4.2: Abortion week (conditional)
  {
    id: "abortionWeek",
    text: "In what week of pregnancy did the abortion occur?",
    type: "numeric",
    required: true,
    min: 1,
    max: 42,
    unit: "weeks",
    conditionalOn: {
      questionId: "septicAbortion",
      expectedValue: false,
    },
  },

  // Question 5: Ectopic pregnancy
  {
    id: "hadEctopic",
    text: "Have you ever had an ectopic pregnancy?",
    type: "yes-no",
    required: true,
  },

  // Question 6: Hypertension
  {
    id: "hasHypertension",
    text: "Do you have a history of being diagnosed with hypertension/hypertension during pregnancy?",
    type: "yes-no",
    required: true,
  },

  // Question 6.1: Blood pressure reading available (conditional)
  {
    id: "hasBPReading",
    text: "Have you measured your blood pressure today or can you measure it now?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasHypertension",
      expectedValue: true,
    },
  },

  // Question 6.2: Blood pressure values (conditional)
  {
    id: "bloodPressure",
    text: "What is your blood pressure? (Enter systolic and diastolic values)",
    type: "blood-pressure",
    required: true,
    conditionalOn: {
      questionId: "hasBPReading",
      expectedValue: true,
    },
  },

  // Question 7: DVT
  {
    id: "hasDVT",
    text: "Do you have a history of DVT or are currently experiencing DVT (swollen single whole leg with shiny red skin)?",
    type: "yes-no",
    required: true,
  },

  // Question 7.1: Current DVT (conditional)
  {
    id: "currentDVT",
    text: "Is DVT currently present?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasDVT",
      expectedValue: true,
    },
  },

  // Question 7.2: Family DVT history (conditional)
  {
    id: "familyDVT",
    text: "Do you have a first degree relative who has experienced DVT?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasDVT",
      expectedValue: false,
    },
  },

  // Question 7.3: Major surgery (conditional)
  {
    id: "majorSurgery",
    text: "Did you have a major surgery in the past 4 weeks?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "familyDVT",
      expectedValue: false,
    },
  },

  // Question 7.4: Bed rest days (conditional)
  {
    id: "bedRestDays",
    text: "For how many days were you on bed rest after surgery?",
    type: "numeric",
    required: true,
    min: 0,
    max: 30,
    unit: "days",
    conditionalOn: {
      questionId: "majorSurgery",
      expectedValue: true,
    },
  },

  // Question 9: Stroke (Note: Question 8 appears missing in the document)
  {
    id: "hadStroke",
    text: "Have you ever had a stroke?",
    type: "yes-no",
    required: true,
  },

  // Question 10: Dyslipidemia
  {
    id: "hasDyslipidemia",
    text: "Have you ever been diagnosed with dyslipidemia?",
    type: "yes-no",
    required: true,
  },

  // Question 10.1: Lipid profile knowledge (conditional)
  {
    id: "knowsLipidProfile",
    text: "Do you know your latest lipid profile?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasDyslipidemia",
      expectedValue: true,
    },
  },

  // Question 10.2: Lipid profile values (conditional)
  {
    id: "lipidProfile",
    text: "Please enter your lipid profile values (mg/dL)",
    type: "lipid-profile",
    required: true,
    conditionalOn: {
      questionId: "knowsLipidProfile",
      expectedValue: true,
    },
  },

  // Question 11: Valvular heart disease
  {
    id: "hasValvularDisease",
    text: "Have you ever been diagnosed with valvular heart disease (disease of the heart valves)?",
    type: "yes-no",
    required: true,
  },

  // Question 11.1: Complicated valvular disease (conditional)
  {
    id: "complicatedValvular",
    text: "Was it complicated (accompanied with pulmonary hypertension/atrial fibrillation/subacute bacterial endocarditis)?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasValvularDisease",
      expectedValue: true,
    },
  },

  // Question 12: SLE
  {
    id: "hasSLE",
    text: "Have you ever been diagnosed with SLE (Systemic Lupus Erythematosus)?",
    type: "yes-no",
    required: true,
  },

  // Question 12.1: SLE diagnosis type (conditional)
  {
    id: "sleType",
    text: "How was it diagnosed?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "hasSLE",
      expectedValue: true,
    },
    options: [
      { value: "antiphospholipid", label: "Through antiphospholipid antibodies" },
      { value: "clinical", label: "Clinically" },
    ],
  },

  // Question 12.2: Severe thrombocytopenia (conditional)
  {
    id: "severeThrombocytopenia",
    text: "Do you currently have severe thrombocytopenia (platelet <50k)?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "sleType",
      expectedValue: "clinical",
    },
  },

  // Question 12.3: Immunosuppressive treatment (conditional)
  {
    id: "onImmunosuppressive",
    text: "Are you on immunosuppressive treatment?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "severeThrombocytopenia",
      expectedValue: false,
    },
  },

  // Question 13: Headaches
  {
    id: "hasHeadaches",
    text: "Do you have regular headaches?",
    type: "yes-no",
    required: true,
  },

  // Question 13.1: Migraine-like (conditional)
  {
    id: "migraineLike",
    text: "Are they migraine-like?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasHeadaches",
      expectedValue: true,
    },
  },

  // Question 13.2: Migraine with aura (conditional)
  {
    id: "migraineWithAura",
    text: "Are they accompanied with aura?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "migraineLike",
      expectedValue: true,
    },
  },

  // Question 14: Heavy bleeding
  {
    id: "heavyBleeding",
    text: "Do you experience heavy/prolonged menstrual bleeding? (Heavy bleeding is the amount that interferes with your physical/social/emotional life. Prolonged bleeding is menstrual bleeding for >8 days)",
    type: "yes-no",
    required: true,
  },

  // Question 14.1: Irregular periods (conditional)
  {
    id: "irregularPeriods",
    text: "Are your menses/periods irregular? (Irregular periods mean that the difference in the duration of cycles is >7 days. E.g. first cycle 28 days then next cycle 37 days)",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "heavyBleeding",
      expectedValue: false,
    },
  },

  // Question 15: Unexplained bleeding
  {
    id: "unexplainedBleeding",
    text: "Do you experience unexplained vaginal bleeding (bleeding not explained by periods)?",
    type: "yes-no",
    required: true,
  },

  // Question 16: Endometriosis
  {
    id: "hasEndometriosis",
    text: "Do you experience severely painful menses or have a history of endometriosis?",
    type: "yes-no",
    required: true,
  },

  // Question 17: GTD
  {
    id: "hasGTD",
    text: "Have you been recently diagnosed with gestational trophoblastic disease (GTD)?",
    type: "yes-no",
    required: true,
  },

  // Question 17.1: hCG trend (conditional)
  {
    id: "hcgTrend",
    text: "What is the trend of your hCG level?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "hasGTD",
      expectedValue: true,
    },
    options: [
      { value: "decreasing", label: "Decreasing" },
      { value: "elevated", label: "Persistently elevated" },
    ],
  },

  // Question 18: Pap smear
  {
    id: "hadPapSmear",
    text: "Have you ever done a Pap smear/biopsy for screening/diagnosis of a cervical tumor?",
    type: "yes-no",
    required: true,
  },

  // Question 18.1: Pap result (conditional)
  {
    id: "papResult",
    text: "What was the histology result?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "hadPapSmear",
      expectedValue: true,
    },
    options: [
      { value: "normal", label: "Normal result" },
      { value: "cin", label: "CIN (Cervical Intraepithelial Neoplasia)" },
      { value: "cancer", label: "Cervical cancer" },
    ],
  },

  // Question 19: Breast swelling
  {
    id: "hasBreastSwelling",
    text: "Do you have/had a breast swelling?",
    type: "yes-no",
    required: true,
  },

  // Question 19.1: Breast diagnosis (conditional)
  {
    id: "breastDiagnosed",
    text: "Has/had it been diagnosed?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasBreastSwelling",
      expectedValue: true,
    },
  },

  // Question 19.2: Breast diagnosis type (conditional)
  {
    id: "breastDiagnosis",
    text: "What is/was the diagnosis?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "breastDiagnosed",
      expectedValue: true,
    },
    options: [
      { value: "benign", label: "Benign breast disease" },
      { value: "cancer", label: "Breast cancer" },
    ],
  },

  // Question 19.3: Recent breast cancer (conditional)
  {
    id: "breastCancerRecent",
    text: "Is it currently present or was it present within the past 5 years?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "breastDiagnosis",
      expectedValue: "cancer",
    },
  },

  // Question 20: Endometrial cancer
  {
    id: "hasEndometrialCancer",
    text: "Have you ever been diagnosed with endometrial cancer?",
    type: "yes-no",
    required: true,
  },

  // Question 21: Ovarian cancer
  {
    id: "hasOvarianCancer",
    text: "Have you ever been diagnosed with ovarian cancer?",
    type: "yes-no",
    required: true,
  },

  // Question 22: Uterine fibroids
  {
    id: "hasUterineFibroids",
    text: "Have you ever been diagnosed with uterine fibroids and not surgically treated?",
    type: "yes-no",
    required: true,
  },

  // Question 22.1: Fibroids distort uterus (conditional)
  {
    id: "fibroidsDistortUterus",
    text: "Based on the radiological findings, do the fibroids distort the uterine cavity?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasUterineFibroids",
      expectedValue: true,
    },
  },

  // Question 23: Pelvic abnormalities
  {
    id: "hasPelvicAbnormalities",
    text: "Have you ever been diagnosed with pelvic anatomic abnormalities?",
    type: "yes-no",
    required: true,
  },

  // Question 23.1: Pelvic distorts uterus (conditional)
  {
    id: "pelvicDistortsUterus",
    text: "Is there evidence of distortion of the uterine cavity?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasPelvicAbnormalities",
      expectedValue: true,
    },
  },

  // Question 24: PID
  {
    id: "hasPID",
    text: "Have you ever been diagnosed with PID (Pelvic Inflammatory Disease)?",
    type: "yes-no",
    required: true,
  },

  // Question 24.1: Current PID (conditional)
  {
    id: "currentPID",
    text: "Is it currently present?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasPID",
      expectedValue: true,
    },
  },

  // Question 24.2: PID subsequent pregnancy (conditional)
  {
    id: "pidSubsequentPregnancy",
    text: "Was it followed by a subsequent pregnancy?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "currentPID",
      expectedValue: false,
    },
  },

  // Question 25: STI
  {
    id: "hasSTI",
    text: "Are you currently being diagnosed with a sexually transmitted infection (STI) excluding HIV and hepatitis B?",
    type: "yes-no",
    required: true,
  },

  // Question 26: HIV
  {
    id: "hasHIV",
    text: "Have you ever been diagnosed with HIV?",
    type: "yes-no",
    required: true,
  },

  // Question 26.1: HIV WHO stage (conditional)
  {
    id: "hivWhoStage",
    text: "What is the clinical WHO stage?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "hasHIV",
      expectedValue: true,
    },
    options: [
      { value: "stage1-2", label: "WHO Stage 1 or 2" },
      { value: "stage3-4", label: "WHO Stage 3 or 4" },
    ],
  },

  // Question 27: Pelvic TB
  {
    id: "hasPelvicTB",
    text: "Have you ever been diagnosed with pelvic TB?",
    type: "yes-no",
    required: true,
  },

  // Question 28: Diabetes
  {
    id: "hasDiabetes",
    text: "Have you ever been diagnosed with diabetes mellitus?",
    type: "yes-no",
    required: true,
  },

  // Question 28.1: Diabetes duration (conditional)
  {
    id: "diabetesDuration",
    text: "How long ago were you diagnosed?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "hasDiabetes",
      expectedValue: true,
    },
    options: [
      { value: "less-than-20-years", label: "Less than 20 years ago" },
      { value: "more-than-20-years", label: "More than 20 years ago" },
    ],
  },

  // Question 28.2: Diabetes complications (conditional)
  {
    id: "diabetesComplications",
    text: "Have you ever had diabetes complications such as neuropathy/nephropathy/retinopathy?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "diabetesDuration",
      expectedValue: "less-than-20-years",
    },
  },

  // Question 29: Gallbladder disease
  {
    id: "hasGallbladder",
    text: "Have you ever been diagnosed with gallbladder disease?",
    type: "yes-no",
    required: true,
  },

  // Question 29.1: Gallbladder symptomatic (conditional)
  {
    id: "gallbladderSymptomatic",
    text: "Is it symptomatic?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasGallbladder",
      expectedValue: true,
    },
  },

  // Question 29.2: Gallbladder treated (conditional)
  {
    id: "gallbladderTreated",
    text: "Is/was it treated?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "gallbladderSymptomatic",
      expectedValue: true,
    },
  },

  // Question 29.3: Gallbladder treatment type (conditional)
  {
    id: "gallbladderTreatment",
    text: "How was it treated?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "gallbladderTreated",
      expectedValue: true,
    },
    options: [
      { value: "medical", label: "Medically" },
      { value: "surgical", label: "Surgically" },
    ],
  },

  // Question 30: Pregnancy-related cholestasis
  {
    id: "hadCholestasis",
    text: "Have you ever experienced pregnancy-related cholestasis?",
    type: "yes-no",
    required: true,
  },

  // Question 31: Hepatitis
  {
    id: "hasHepatitis",
    text: "Are you currently diagnosed with hepatitis?",
    type: "yes-no",
    required: true,
  },

  // Question 31.1: Hepatitis type (conditional)
  {
    id: "hepatitisType",
    text: "What type of hepatitis?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "hasHepatitis",
      expectedValue: true,
    },
    options: [
      { value: "acute", label: "Acute" },
      { value: "chronic", label: "Chronic/carrier/resolved" },
    ],
  },

  // Question 32: Cirrhosis
  {
    id: "hasCirrhosis",
    text: "Are you currently diagnosed with cirrhosis",
    type: "yes-no",
    required: true,
  },

  // Question 32.1: Decompensated cirrhosis (conditional)
  {
    id: "cirrhosisDecompensated",
    text: "Is it decompensated?",
    type: "yes-no",
    required: true,
    conditionalOn: {
      questionId: "hasCirrhosis",
      expectedValue: true,
    },
  },

  // Question 33: Liver tumor
  {
    id: "hasLiverTumor",
    text: "Have you ever been diagnosed with a liver tumor?",
    type: "yes-no",
    required: true,
  },

  // Question 33.1: Liver tumor type (conditional)
  {
    id: "liverTumorType",
    text: "Is/was it benign or malignant?",
    type: "select-one",
    required: true,
    conditionalOn: {
      questionId: "hasLiverTumor",
      expectedValue: true,
    },
    options: [
      { value: "hepatocellular-adenoma", label: "Hepatocellular adenoma (benign)" },
      { value: "focal-nodular-hyperplasia", label: "Focal nodular hyperplasia (benign)" },
      { value: "malignant", label: "Malignant" },
    ],
  },

  // Question 34: Iron deficiency anemia
  {
    id: "hasAnemia",
    text: "Are you suffering from iron deficiency anemia?",
    type: "yes-no",
    required: true,
  },

  // Question 35: Sickle cell disease
  {
    id: "hasSickleCell",
    text: "Are you diagnosed with sickle cell disease/sickle cell anemia?",
    type: "yes-no",
    required: true,
  },

  // Question 36: Current medications
  {
    id: "onMedications",
    text: "Are you currently on any medication?",
    type: "yes-no",
    required: true,
  },

  // Question 36.1: Specific medications (conditional)
  {
    id: "medications",
    text: "Are you taking any of the following medications?",
    type: "select-multiple",
    required: true,
    conditionalOn: {
      questionId: "onMedications",
      expectedValue: true,
    },
    options: [
      { value: "ritonavir", label: "Ritonavir" },
      { value: "carbamazepine", label: "Carbamazepine" },
      { value: "rifampicin", label: "Rifampicin" },
      { value: "none", label: "None of the above" },
    ],
  },
];

// Helper function to get questions that should be shown based on current answers
export const getVisibleQuestions = (answers: Record<string, any>): Question[] => {
  return MEDICAL_SAFETY_QUESTIONS.filter((question) => {
    // Always show questions without conditions
    if (!question.conditionalOn) return true;

    // Check if condition is met
    const { questionId, expectedValue } = question.conditionalOn;
    const currentAnswer = answers[questionId];

    return currentAnswer === expectedValue;
  });
};

// Helper function to check if questionnaire is complete
export const isQuestionnaireComplete = (answers: Record<string, any>): boolean => {
  const visibleQuestions = getVisibleQuestions(answers);

  return visibleQuestions.every((question) => {
    const answer = answers[question.id];
    return answer !== undefined && answer !== null && answer !== "";
  });
};

// Helper function to get next question
export const getNextQuestion = (
  currentQuestionId: string,
  answers: Record<string, any>
): Question | null => {
  const visibleQuestions = getVisibleQuestions(answers);
  const currentIndex = visibleQuestions.findIndex((q) => q.id === currentQuestionId);

  if (currentIndex === -1 || currentIndex >= visibleQuestions.length - 1) {
    return null; // No next question
  }

  return visibleQuestions[currentIndex + 1];
};

// Helper function to get previous question
export const getPreviousQuestion = (
  currentQuestionId: string,
  answers: Record<string, any>
): Question | null => {
  const visibleQuestions = getVisibleQuestions(answers);
  const currentIndex = visibleQuestions.findIndex((q) => q.id === currentQuestionId);

  if (currentIndex <= 0) {
    return null; // No previous question
  }

  return visibleQuestions[currentIndex - 1];
};

// Personalization questions for lifestyle and preference filtering
export interface PersonalizationQuestion {
  id: string;
  text: string;
  type: "yes-no" | "select-one" | "numeric";
  options?: string[];
  required: boolean;
  validation?: {
    min?: number;
    max?: number;
  };
}

export const PERSONALIZATION_QUESTIONS: PersonalizationQuestion[] = [
  {
    id: "wantsFuturePregnancy",
    text: "Would you like to become pregnant in the future?",
    type: "yes-no",
    required: true,
  },
  {
    id: "okayWithIrregularPeriods",
    text: "Are you okay with having irregular/no periods during the time of your contraceptive use?",
    type: "yes-no",
    required: true,
  },
  {
    id: "wantsSurgicalMethod",
    text: "Are you okay with having a surgery done that will give you permanent contraception? (Fertility is not reversible)",
    type: "yes-no",
    required: true,
  },
  {
    id: "preferredFrequency",
    text: "What is your preferred method frequency?",
    type: "select-one",
    options: ["Every day", "Every 3 weeks", "Every 3 months", "Every 3 years", "Every 8 years"],
    required: true,
  },
  {
    id: "currentBMI",
    text: "What is your current BMI? (Body Mass Index - kg/m²)",
    type: "numeric",
    required: false,
    validation: {
      min: 10,
      max: 60,
    },
  },
];

// Helper to convert option text to value
export const getFrequencyValue = (optionText: string): string => {
  const mapping: Record<string, string> = {
    "Every day": "daily",
    "Every 3 weeks": "every-3-weeks",
    "Every 3 months": "every-3-months",
    "Every 3 years": "every-3-years",
    "Every 8 years": "every-8-years",
  };
  return mapping[optionText] || optionText;
};
