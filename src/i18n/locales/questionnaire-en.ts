/**
 * WHO MEC Questionnaire translations (English)
 * Keys match section keys and question ids from src/config/sections.ts
 */
export const questionnaireEn = {
  sections: {
    "menstrual-history": "Section 1: Menstrual History",
    "pregnancy-history": "Section 2: Pregnancy History",
    "cvs-risk-factors": "Section 3: Cardiovascular Risk Factors",
    prothrombotic: "Section 4: Prothrombotic Conditions",
    "gyn-history": "Section 5: Gynecological History",
    rti: "Section 6: Reproductive Tract Infection",
    comorbidities: "Section 7: Comorbidities",
    "medication-history": "Section 9: Medication History",
  },
  questions: {
    age: "What is your age?",
    "cycle-durations":
      "Duration of your menstrual cycles (days between period starts). Enter at least 2, optionally up to 6.",
    "bleeding-days": "Number of bleeding days per cycle?",
    "heavy-menstrual-bleeding":
      "Presence of heavy menstrual bleeding? (Amount that interferes with physical/social/emotional life)",
    "unexplained-vaginal-bleeding": "Presence of unexplained vaginal bleeding?",
    "painful-menses-endometriosis":
      "Do you experience severely painful menses or have a history of endometriosis?",
    "ever-pregnant": "Have you ever been pregnant?",
    "birth-past-2y": "Have you given birth to a child in the past 2 years?",
    "birth-date": "When was it?",
    breastfeeding: "Are you currently breastfeeding your child?",
    "postpartum-risk-factors":
      "Do you have any of: previous DVT, cancer requiring treatment, heart failure, varicose veins, surgery in past 4 weeks or soon, bedridden, or smoking?",
    "had-abortion": "Have you ever had an abortion?",
    "septic-abortion":
      "Was it a septic abortion (accompanied with signs of infection)?",
    "abortion-week": "In what week of pregnancy did the abortion occur?",
    "had-ectopic": "Have you ever had an ectopic pregnancy?",
    weight: "Weight (kg)",
    height: "Height (cm)",
    smokes: "Do you currently smoke cigarettes?",
    "cigarettes-per-day": "How many cigarettes do you smoke per day?",
    "has-hypertension":
      "Do you have a history of hypertension or hypertension during pregnancy?",
    "has-bp-today": "Have you measured your blood pressure today?",
    "can-measure-bp": "Can you measure it?",
    "blood-pressure": "What is your blood pressure?",
    "hypertension-during-pregnancy":
      "Do you have a history of hypertension during pregnancy?",
    "has-diabetes": "Have you ever been diagnosed with diabetes mellitus?",
    "diabetes-years-ago": "How long ago?",
    "diabetes-complications":
      "Have you ever had diabetes complications (neuropathy/nephropathy/retinopathy)?",
    "vascular-disease": "Do you have a history of vascular disease?",
    "ischemic-heart-disease": "Do you have a history of ischemic heart disease?",
    "had-stroke": "Have you ever had a stroke?",
    "has-dyslipidemia": "Have you ever been diagnosed with dyslipidemia?",
    "knows-lipid-profile": "Do you know your latest lipid profile?",
    "lipid-profile": "Enter your lipid profile (mg/dL)",
    "has-dvt":
      "Do you have a history of DVT or are currently experiencing DVT (swollen single whole leg with shiny red skin)?",
    "dvt-current": "Is it currently present?",
    "family-dvt": "Do you have a first degree relative who has experienced DVT?",
    "major-surgery": "Did you have a major surgery in the past 4 weeks?",
    "bed-rest-days": "For how long were you in bed rest after surgery?",
    "valvular-heart-disease":
      "Have you ever been diagnosed with valvular heart disease?",
    "valvular-complicated":
      "Was it complicated (pulmonary hypertension/atrial fibrillation/subacute bacterial endocarditis)?",
    "has-sle":
      "Have you ever been diagnosed with SLE (Systemic Lupus Erythematosus)?",
    "sle-diagnosis": "How was it diagnosed?",
    "severe-thrombocytopenia":
      "Do you currently have severe thrombocytopenia (platelet <50k)?",
    immunosuppressive: "Are you on immunosuppressive treatment?",
    "has-headaches": "Do you have regular headaches?",
    "migraine-like": "Are they migraine-like?",
    "migraine-aura": "Are they accompanied with aura?",
    "has-gtd":
      "Have you been recently diagnosed with gestational trophoblastic disease (GTD)?",
    "hcg-trend": "What is the trend of your hCG level?",
    "had-pap-smear":
      "Have you ever done a Pap smear/biopsy for screening/diagnosis of a cervical tumor?",
    "pap-result": "What was the histology?",
    "breast-swelling": "Do you have/had a breast swelling?",
    "breast-diagnosed": "Has/had it been diagnosed?",
    "breast-diagnosis": "What is/was the diagnosis?",
    "breast-cancer-present":
      "Is it currently present or was it present more than 5 years ago?",
    "endometrial-cancer":
      "Have you ever been diagnosed with endometrial cancer?",
    "ovarian-cancer": "Have you ever been diagnosed with ovarian cancer?",
    "uterine-fibroids":
      "Have you ever been diagnosed with uterine fibroids and not surgically treated?",
    "fibroids-distort-uterus":
      "Based on radiological findings, do the fibroids distort the uterine cavity?",
    "pelvic-abnormalities":
      "Have you ever been diagnosed with pelvic anatomic abnormalities?",
    "pelvic-distorts-uterus":
      "Is there evidence of distortion of the uterine cavity?",
    "has-pid":
      "Have you ever been diagnosed with PID (Pelvic Inflammatory Disease)?",
    "pid-current": "Is it currently present?",
    "pid-subsequent-pregnancy": "Was it followed by a subsequent pregnancy?",
    "has-sti":
      "Are you currently being diagnosed with a sexually transmitted infection (STI) excluding HIV and hepatitis B?",
    "sti-type": "What type of STI?",
    "has-hiv": "Have you ever been diagnosed with HIV?",
    "hiv-who-stage": "What is the clinical WHO stage?",
    "pelvic-tb": "Have you ever been diagnosed with pelvic TB?",
    "gallbladder-disease": "Have you ever been diagnosed with gallbladder disease?",
    "gallbladder-symptomatic": "Is it symptomatic?",
    "gallbladder-treated": "Is/was it treated?",
    "gallbladder-treatment-type": "How was it treated?",
    cholestasis:
      "Have you ever experienced pregnancy-related cholestasis?",
    "has-hepatitis": "Are you currently diagnosed with hepatitis?",
    "hepatitis-type": "What type of hepatitis?",
    "has-cirrhosis": "Are you currently diagnosed with cirrhosis?",
    "cirrhosis-decompensated": "Is it decompensated?",
    "liver-tumor": "Have you ever been diagnosed with a liver tumor?",
    "liver-tumor-type": "Is/was it benign or malignant?",
    "benign-liver-tumor-type": "What type of benign liver tumor?",
    "iron-deficiency-anemia": "Are you suffering from iron deficiency anemia?",
    "sickle-cell":
      "Are you diagnosed with sickle cell disease/sickle cell anemia?",
    "on-medications": "Are you currently on any medication?",
    "medications-list": "Is the medication present in the following list?",
  },
  placeholders: {
    age: "Enter age",
  },
  help: {
    "cycle-durations":
      "Enter the length of each cycle from start of one period to the start of the next. Irregularity is auto-calculated (variation > 7 days).",
  },
  options: {
    "diabetes-years-ago": {
      "more-than-20": "More than 20 years ago",
      "less-than-20": "Less than 20 years ago",
    },
    "sle-diagnosis": {
      antiphospholipid: "Through antiphospholipid antibodies",
      clinical: "Clinically",
    },
    "hcg-trend": {
      decreasing: "Decreasing",
      elevated: "Persistently elevated",
    },
    "pap-result": {
      cin: "CIN",
      cancer: "Cervical cancer",
      normal: "Normal result",
    },
    "breast-diagnosis": {
      benign: "Benign breast disease",
      cancer: "Breast cancer",
    },
    "breast-cancer-present": {
      current: "Currently present",
      past: "More than 5 years ago",
    },
    "sti-type": {
      purulent: "Current purulent cervicitis/gonorrhea/chlamydia",
      other: "Other STI (trichomonas, bacterial vaginosis, etc.)",
    },
    "hiv-who-stage": {
      "stage1-2": "WHO Stage 1 or 2",
      "stage3-4": "WHO Stage 3 or 4",
    },
    "gallbladder-treatment-type": {
      medical: "Medically",
      surgical: "Surgically",
    },
    "hepatitis-type": {
      acute: "Acute",
      chronic: "Chronic/carrier/resolved",
    },
    "liver-tumor-type": {
      benign: "Benign",
      malignant: "Malignant",
    },
    "benign-liver-tumor-type": {
      "hepatocellular-adenoma": "Hepatocellular adenoma",
      "focal-nodular-hyperplasia": "Focal nodular hyperplasia",
    },
    "medications-list": {
      ritonavir: "Ritonavir",
      carbamazepine: "Carbamazepine",
      lamotrigine: "Lamotrigine",
      rifampicin: "Rifampicin",
      none: "None of the above",
    },
  },
  questionCount: "{{count}} question",
  questionCountPlural: "{{count}} questions",
} as const;
