import type { Section } from "../types/sections";

/**
 * WHO MEC Questionnaire Section Configuration
 * Each section is one page with grouped questions.
 * Conditional branching: if a question is "No" and the rest depends on "Yes", skip the rest.
 */
export const SECTIONS: Section[] = [
  // Section 1: Menstrual History
  {
    key: "menstrual-history",
    title: "Section 1: Menstrual History",
    questions: [
      {
        id: "age",
        text: "What is your age?",
        type: "numeric",
        required: true,
        validation: { min: 10, max: 70 },
        metadata: { unit: "years", placeholder: "Enter age" },
      },
      {
        id: "cycle-durations",
        text: "Duration of your last 6 menstrual cycles (days between period starts)",
        type: "cycle-durations",
        required: true,
        validation: { min: 21, max: 45 },
        metadata: {
          unit: "days",
          helpText: "Enter the length of each cycle from start of one period to the start of the next. Irregularity is auto-calculated (variation > 7 days).",
        },
      },
      {
        id: "bleeding-days",
        text: "Number of bleeding days per cycle?",
        type: "numeric",
        required: true,
        validation: { min: 1, max: 14 },
        metadata: { unit: "days" },
      },
      {
        id: "heavy-menstrual-bleeding",
        text: "Presence of heavy menstrual bleeding? (Amount that interferes with physical/social/emotional life)",
        type: "yes-no",
        required: true,
      },
      {
        id: "unexplained-vaginal-bleeding",
        text: "Presence of unexplained vaginal bleeding?",
        type: "yes-no",
        required: true,
      },
      {
        id: "painful-menses-endometriosis",
        text: "Do you experience severely painful menses or have a history of endometriosis?",
        type: "yes-no",
        required: true,
      },
      {
        id: "latex-allergy",
        text: "Do you have allergy to latex?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 2: Pregnancy History
  {
    key: "pregnancy-history",
    title: "Section 2: Pregnancy History",
    skipLogic: (answers) => answers["ever-pregnant"] === false,
    questions: [
      {
        id: "ever-pregnant",
        text: "Have you ever been pregnant?",
        type: "yes-no",
        required: true,
      },
      {
        id: "birth-past-2y",
        text: "Have you given birth to a child in the past 2 years?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "ever-pregnant", expectedValue: true },
      },
      {
        id: "birth-date",
        text: "When was it?",
        type: "date",
        required: true,
        conditional: { dependsOn: "birth-past-2y", expectedValue: true },
      },
      {
        id: "breastfeeding",
        text: "Are you currently breastfeeding your child?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "birth-past-2y", expectedValue: true },
      },
      {
        id: "postpartum-risk-factors",
        text: "Do you have any of: previous DVT, cancer requiring treatment, heart failure, varicose veins, surgery in past 4 weeks or soon, bedridden, or smoking?",
        type: "yes-no",
        required: true,
        conditional: {
          dependsOn: "breastfeeding",
          expectedValue: false,
        },
      },
      {
        id: "had-abortion",
        text: "Have you ever had an abortion?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "ever-pregnant", expectedValue: true },
      },
      {
        id: "septic-abortion",
        text: "Was it a septic abortion (accompanied with signs of infection)?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "had-abortion", expectedValue: true },
      },
      {
        id: "abortion-week",
        text: "In what week of pregnancy did the abortion occur?",
        type: "numeric",
        required: true,
        validation: { min: 1, max: 42 },
        conditional: { dependsOn: "septic-abortion", expectedValue: false },
      },
      {
        id: "had-ectopic",
        text: "Have you ever had an ectopic pregnancy?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "ever-pregnant", expectedValue: true },
      },
    ],
  },

  // Section 3: CVS Risk Factors
  {
    key: "cvs-risk-factors",
    title: "Section 3: Cardiovascular Risk Factors",
    questions: [
      {
        id: "weight",
        text: "Weight (kg)",
        type: "numeric",
        required: true,
        validation: { min: 30, max: 200 },
        metadata: { unit: "kg" },
      },
      {
        id: "height",
        text: "Height (cm)",
        type: "numeric",
        required: true,
        validation: { min: 100, max: 250 },
        metadata: { unit: "cm" },
      },
      {
        id: "smokes",
        text: "Do you currently smoke cigarettes?",
        type: "yes-no",
        required: true,
      },
      {
        id: "cigarettes-per-day",
        text: "How many cigarettes do you smoke per day?",
        type: "numeric",
        required: true,
        validation: { min: 1, max: 60 },
        conditional: { dependsOn: "smokes", expectedValue: true },
      },
      {
        id: "has-hypertension",
        text: "Do you have a history of hypertension or hypertension during pregnancy?",
        type: "yes-no",
        required: true,
      },
      {
        id: "has-bp-today",
        text: "Have you measured your blood pressure today?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-hypertension", expectedValue: true },
      },
      {
        id: "can-measure-bp",
        text: "Can you measure it?",
        type: "yes-no",
        required: true,
        conditional: {
          dependsOn: "has-bp-today",
          expectedValue: false,
        },
      },
      {
        id: "blood-pressure",
        text: "What is your blood pressure?",
        type: "blood-pressure",
        required: true,
        conditional: { dependsOn: "has-hypertension", expectedValue: true },
      },
      {
        id: "hypertension-during-pregnancy",
        text: "Do you have a history of hypertension during pregnancy?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-hypertension", expectedValue: true },
      },
      {
        id: "has-diabetes",
        text: "Have you ever been diagnosed with diabetes mellitus?",
        type: "yes-no",
        required: true,
      },
      {
        id: "diabetes-years-ago",
        text: "How long ago?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "has-diabetes", expectedValue: true },
        metadata: {
          options: [
            { value: "more-than-20", label: "More than 20 years ago" },
            { value: "less-than-20", label: "Less than 20 years ago" },
          ],
        },
      },
      {
        id: "diabetes-complications",
        text: "Have you ever had diabetes complications (neuropathy/nephropathy/retinopathy)?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "diabetes-years-ago", expectedValue: "less-than-20" },
      },
      {
        id: "vascular-disease",
        text: "Do you have a history of vascular disease?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ischemic-heart-disease",
        text: "Do you have a history of ischemic heart disease?",
        type: "yes-no",
        required: true,
      },
      {
        id: "had-stroke",
        text: "Have you ever had a stroke?",
        type: "yes-no",
        required: true,
      },
      {
        id: "has-dyslipidemia",
        text: "Have you ever been diagnosed with dyslipidemia?",
        type: "yes-no",
        required: true,
      },
      {
        id: "knows-lipid-profile",
        text: "Do you know your latest lipid profile?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-dyslipidemia", expectedValue: true },
      },
      {
        id: "lipid-profile",
        text: "Enter your lipid profile (mg/dL)",
        type: "lipid-profile",
        required: true,
        conditional: { dependsOn: "knows-lipid-profile", expectedValue: true },
      },
    ],
  },

  // Section 4: Prothrombotic Conditions
  {
    key: "prothrombotic",
    title: "Section 4: Prothrombotic Conditions",
    questions: [
      {
        id: "has-dvt",
        text: "Do you have a history of DVT or are currently experiencing DVT (swollen single whole leg with shiny red skin)?",
        type: "yes-no",
        required: true,
      },
      {
        id: "dvt-current",
        text: "Is it currently present?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-dvt", expectedValue: true },
      },
      {
        id: "family-dvt",
        text: "Do you have a first degree relative who has experienced DVT?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-dvt", expectedValue: false },
      },
      {
        id: "major-surgery",
        text: "Did you have a major surgery in the past 4 weeks?",
        type: "yes-no",
        required: true,
      },
      {
        id: "bed-rest-days",
        text: "For how long were you in bed rest after surgery?",
        type: "numeric",
        required: true,
        validation: { min: 0, max: 28 },
        metadata: { unit: "days" },
        conditional: { dependsOn: "major-surgery", expectedValue: true },
      },
      {
        id: "valvular-heart-disease",
        text: "Have you ever been diagnosed with valvular heart disease?",
        type: "yes-no",
        required: true,
      },
      {
        id: "valvular-complicated",
        text: "Was it complicated (pulmonary hypertension/atrial fibrillation/subacute bacterial endocarditis)?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "valvular-heart-disease", expectedValue: true },
      },
      {
        id: "has-sle",
        text: "Have you ever been diagnosed with SLE (Systemic Lupus Erythematosus)?",
        type: "yes-no",
        required: true,
      },
      {
        id: "sle-diagnosis",
        text: "How was it diagnosed?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "has-sle", expectedValue: true },
        metadata: {
          options: [
            { value: "antiphospholipid", label: "Through antiphospholipid antibodies" },
            { value: "clinical", label: "Clinically" },
          ],
        },
      },
      {
        id: "severe-thrombocytopenia",
        text: "Do you currently have severe thrombocytopenia (platelet <50k)?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "sle-diagnosis", expectedValue: "clinical" },
      },
      {
        id: "immunosuppressive",
        text: "Are you on immunosuppressive treatment?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "sle-diagnosis", expectedValue: "clinical" },
      },
      {
        id: "has-headaches",
        text: "Do you have regular headaches?",
        type: "yes-no",
        required: true,
      },
      {
        id: "migraine-like",
        text: "Are they migraine-like?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-headaches", expectedValue: true },
      },
      {
        id: "migraine-aura",
        text: "Are they accompanied with aura?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "migraine-like", expectedValue: true },
      },
    ],
  },

  // Section 5: Gynecological History
  {
    key: "gyn-history",
    title: "Section 5: Gynecological History",
    questions: [
      {
        id: "has-gtd",
        text: "Have you been recently diagnosed with gestational trophoblastic disease (GTD)?",
        type: "yes-no",
        required: true,
      },
      {
        id: "hcg-trend",
        text: "What is the trend of your hCG level?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "has-gtd", expectedValue: true },
        metadata: {
          options: [
            { value: "decreasing", label: "Decreasing" },
            { value: "elevated", label: "Persistently elevated" },
          ],
        },
      },
      {
        id: "had-pap-smear",
        text: "Have you ever done a Pap smear/biopsy for screening/diagnosis of a cervical tumor?",
        type: "yes-no",
        required: true,
      },
      {
        id: "pap-result",
        text: "What was the histology?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "had-pap-smear", expectedValue: true },
        metadata: {
          options: [
            { value: "cin", label: "CIN" },
            { value: "cancer", label: "Cervical cancer" },
            { value: "normal", label: "Normal result" },
          ],
        },
      },
      {
        id: "breast-swelling",
        text: "Do you have/had a breast swelling?",
        type: "yes-no",
        required: true,
      },
      {
        id: "breast-diagnosed",
        text: "Has/had it been diagnosed?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "breast-swelling", expectedValue: true },
      },
      {
        id: "breast-diagnosis",
        text: "What is/was the diagnosis?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "breast-diagnosed", expectedValue: true },
        metadata: {
          options: [
            { value: "benign", label: "Benign breast disease" },
            { value: "cancer", label: "Breast cancer" },
          ],
        },
      },
      {
        id: "breast-cancer-present",
        text: "Is it currently present or was it present more than 5 years ago?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "breast-diagnosis", expectedValue: "cancer" },
        metadata: {
          options: [
            { value: "current", label: "Currently present" },
            { value: "past", label: "More than 5 years ago" },
          ],
        },
      },
      {
        id: "endometrial-cancer",
        text: "Have you ever been diagnosed with endometrial cancer?",
        type: "yes-no",
        required: true,
      },
      {
        id: "ovarian-cancer",
        text: "Have you ever been diagnosed with ovarian cancer?",
        type: "yes-no",
        required: true,
      },
      {
        id: "uterine-fibroids",
        text: "Have you ever been diagnosed with uterine fibroids and not surgically treated?",
        type: "yes-no",
        required: true,
      },
      {
        id: "fibroids-distort-uterus",
        text: "Based on radiological findings, do the fibroids distort the uterine cavity?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "uterine-fibroids", expectedValue: true },
      },
      {
        id: "pelvic-abnormalities",
        text: "Have you ever been diagnosed with pelvic anatomic abnormalities?",
        type: "yes-no",
        required: true,
      },
      {
        id: "pelvic-distorts-uterus",
        text: "Is there evidence of distortion of the uterine cavity?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "pelvic-abnormalities", expectedValue: true },
      },
    ],
  },

  // Section 6: Reproductive Tract Infections
  {
    key: "rti",
    title: "Section 6: Reproductive Tract Infection",
    questions: [
      {
        id: "has-pid",
        text: "Have you ever been diagnosed with PID (Pelvic Inflammatory Disease)?",
        type: "yes-no",
        required: true,
      },
      {
        id: "pid-current",
        text: "Is it currently present?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-pid", expectedValue: true },
      },
      {
        id: "pid-subsequent-pregnancy",
        text: "Was it followed by a subsequent pregnancy?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "pid-current", expectedValue: false },
      },
      {
        id: "has-sti",
        text: "Are you currently being diagnosed with a sexually transmitted infection (STI) excluding HIV and hepatitis B?",
        type: "yes-no",
        required: true,
      },
      {
        id: "sti-type",
        text: "What type of STI?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "has-sti", expectedValue: true },
        metadata: {
          options: [
            { value: "purulent", label: "Current purulent cervicitis/gonorrhea/chlamydia" },
            { value: "other", label: "Other STI (trichomonas, bacterial vaginosis, etc.)" },
          ],
        },
      },
      {
        id: "has-hiv",
        text: "Have you ever been diagnosed with HIV?",
        type: "yes-no",
        required: true,
      },
      {
        id: "hiv-who-stage",
        text: "What is the clinical WHO stage?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "has-hiv", expectedValue: true },
        metadata: {
          options: [
            { value: "stage1-2", label: "WHO Stage 1 or 2" },
            { value: "stage3-4", label: "WHO Stage 3 or 4" },
          ],
        },
      },
      {
        id: "pelvic-tb",
        text: "Have you ever been diagnosed with pelvic TB?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 7: Comorbidities
  {
    key: "comorbidities",
    title: "Section 7: Comorbidities",
    questions: [
      {
        id: "gallbladder-disease",
        text: "Have you ever been diagnosed with gallbladder disease?",
        type: "yes-no",
        required: true,
      },
      {
        id: "gallbladder-symptomatic",
        text: "Is it symptomatic?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "gallbladder-disease", expectedValue: true },
      },
      {
        id: "gallbladder-treated",
        text: "Is/was it treated?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "gallbladder-symptomatic", expectedValue: true },
      },
      {
        id: "gallbladder-treatment-type",
        text: "How was it treated?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "gallbladder-treated", expectedValue: true },
        metadata: {
          options: [
            { value: "medical", label: "Medically" },
            { value: "surgical", label: "Surgically" },
          ],
        },
      },
      {
        id: "cholestasis",
        text: "Have you ever experienced pregnancy-related cholestasis?",
        type: "yes-no",
        required: true,
      },
      {
        id: "has-hepatitis",
        text: "Are you currently diagnosed with hepatitis?",
        type: "yes-no",
        required: true,
      },
      {
        id: "hepatitis-type",
        text: "What type of hepatitis?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "has-hepatitis", expectedValue: true },
        metadata: {
          options: [
            { value: "acute", label: "Acute" },
            { value: "chronic", label: "Chronic/carrier/resolved" },
          ],
        },
      },
      {
        id: "has-cirrhosis",
        text: "Are you currently diagnosed with cirrhosis?",
        type: "yes-no",
        required: true,
      },
      {
        id: "cirrhosis-decompensated",
        text: "Is it decompensated?",
        type: "yes-no",
        required: true,
        conditional: { dependsOn: "has-cirrhosis", expectedValue: true },
      },
      {
        id: "liver-tumor",
        text: "Have you ever been diagnosed with a liver tumor?",
        type: "yes-no",
        required: true,
      },
      {
        id: "liver-tumor-type",
        text: "Is/was it benign or malignant?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "liver-tumor", expectedValue: true },
        metadata: {
          options: [
            { value: "benign", label: "Benign" },
            { value: "malignant", label: "Malignant" },
          ],
        },
      },
      {
        id: "benign-liver-tumor-type",
        text: "What type of benign liver tumor?",
        type: "select-one",
        required: true,
        conditional: { dependsOn: "liver-tumor-type", expectedValue: "benign" },
        metadata: {
          options: [
            { value: "hepatocellular-adenoma", label: "Hepatocellular adenoma" },
            { value: "focal-nodular-hyperplasia", label: "Focal nodular hyperplasia" },
          ],
        },
      },
      {
        id: "iron-deficiency-anemia",
        text: "Are you suffering from iron deficiency anemia?",
        type: "yes-no",
        required: true,
      },
      {
        id: "sickle-cell",
        text: "Are you diagnosed with sickle cell disease/sickle cell anemia?",
        type: "yes-no",
        required: true,
      },
    ],
  },

  // Section 9: Medication History (no Section 8 in spec)
  {
    key: "medication-history",
    title: "Section 9: Medication History",
    questions: [
      {
        id: "on-medications",
        text: "Are you currently on any medication?",
        type: "yes-no",
        required: true,
      },
      {
        id: "medications-list",
        text: "Is the medication present in the following list?",
        type: "select-multiple",
        required: true,
        conditional: { dependsOn: "on-medications", expectedValue: true },
        metadata: {
          options: [
            { value: "ritonavir", label: "Ritonavir" },
            { value: "carbamazepine", label: "Carbamazepine" },
            { value: "lamotrigine", label: "Lamotrigine" },
            { value: "rifampicin", label: "Rifampicin" },
          ],
        },
      },
    ],
  },
];

/** Medical sections only (excludes personalization) - for questionnaire flow */
export const MEDICAL_SECTIONS = SECTIONS.filter((s) => s.key !== "personalization");
