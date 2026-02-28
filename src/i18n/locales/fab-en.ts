/**
 * FAB (Fertility Awareness-Based) Eligibility translations - English
 */
export const fabEn = {
  sections: {
    "fab-current-pregnancy": "Section 1: Current Pregnancy",
    "fab-postpartum": "Section 2: Postpartum Status",
    "fab-recent-abortion": "Section 3: Recent Abortion",
    "fab-life-stage": "Section 4: Life Stage",
    "fab-menstrual-infection": "Section 5: Menstrual & Infection Status",
    "fab-drugs-medical": "Section 6: Drugs & Medical Conditions",
    "fab-sti-risk": "Section 7: STI/HIV Risk",
    "fab-pregnancy-risk": "Section 8: Pregnancy Risk Severity",
  },
  questions: {
    "fab-currently-pregnant": "Is the client currently pregnant?",
    "fab-delivered-last-6-months": "Has the client delivered a baby within the last 6 months?",
    "fab-weeks-since-delivery": "Weeks since delivery",
    "fab-currently-breastfeeding": "Is the client currently breastfeeding?",
    "fab-menses-resumed": "Has menses resumed?",
    "fab-abortion-last-4-weeks": "Has the client had an abortion within the last 4 weeks?",
    "fab-age": "Age",
    "fab-years-since-menarche": "Years since menarche (first period)",
    "fab-perimenopausal-symptoms": "Perimenopausal symptoms? (cycle irregularity, hot flashes)",
    "fab-irregular-vaginal-bleeding": "Is there irregular vaginal bleeding?",
    "fab-abnormal-vaginal-discharge": "Is there abnormal vaginal discharge?",
    "fab-medications-affect-cycle":
      "Is the client using medications that affect ovulation, hormones, cycle regularity, or fertility signs?",
    "fab-chronic-elevated-temperature":
      "Does the client have chronic disease causing persistent elevated temperature?",
    "fab-acute-febrile-illness": "Does the client have an acute febrile illness?",
    "fab-sti-hiv-risk": "Is the client at risk for STI/HIV?",
    "fab-high-risk-pregnancy":
      "Does the client have a condition where pregnancy would pose a serious health risk?",
  },
  placeholders: {
    "fab-weeks-since-delivery": "Enter weeks",
    "fab-age": "Enter age",
    "fab-years-since-menarche": "Enter years",
  },
  options: {
    "fab-currently-pregnant": {
      yes: "Yes",
      no: "No",
      unsure: "Unsure",
    },
  },
  navigator: {
    stepOf: "Step {{current}} of {{total}}",
    previous: "Previous",
    next: "Next",
    seeResults: "See Results",
  },
  results: {
    mainTitle: "FAB Eligibility Result",
    subtitle:
      "Fertility Awareness-Based (FAB) methods include Symptoms-Based (SYM) and Calendar-Based (CAL) methods.",
    notApplicableTitle: "FAB Methods Not Applicable",
    notApplicableMessage: "FAB methods are not relevant during pregnancy.",
    contributingFactors: "Contributing factors:",
    action: "Action:",
    advisories: "Advisories",
    categoryDefinitions: "Category Definitions",
    defA: "A (Accept) – No restriction",
    defC: "C (Caution) – Enhanced counselling required",
    defD: "D (Delay) – Temporary method recommended until condition resolved",
    startOver: "Start Over",
  },
  methods: {
    SYM: "Symptoms-Based Method (SYM)",
    CAL: "Calendar-Based Method (CAL)",
  },
  categories: {
    A: "Accept (no restriction)",
    C: "Caution (enhanced counselling required)",
    D: "Delay (temporary method recommended until condition resolved)",
  },
  explanations: {
    "SYM.A":
      "No identified restrictions for symptoms-based tracking. Client may use SYM with standard counselling.",
    "SYM.C":
      "One or more caution conditions present (e.g., postpartum, perimenopause, medications). Enhanced counselling and cycle stability evaluation recommended.",
    "SYM.D":
      "Conditions present that temporarily limit reliability of fertility signs (e.g., recent delivery, irregular bleeding, acute illness). Recommend alternative method until resolved.",
    "CAL.A":
      "No identified restrictions for calendar-based tracking. Client may use CAL with standard counselling.",
    "CAL.C":
      "One or more caution conditions present (e.g., irregular cycles, perimenopause). Enhanced counselling recommended.",
    "CAL.D":
      "Conditions present that limit calendar method reliability. Recommend alternative method until resolved.",
  },
  actions: {
    C: "Enhanced counselling required before use.",
    D: "Recommend temporary method until condition resolved.",
  },
  conditions: {
    postpartum: "Postpartum",
    "postpartum-l6-bf": "Postpartum (<6 weeks, breastfeeding)",
    "postpartum-g6-no-menses":
      "Postpartum (≥6 weeks, breastfeeding, menses not resumed)",
    "postpartum-bf-menses": "Postpartum (breastfeeding, menses resumed)",
    "postpartum-bf": "Postpartum (breastfeeding)",
    "postpartum-l4-nobf": "Postpartum (<4 weeks, not breastfeeding)",
    "postpartum-g4-nobf": "Postpartum (≥4 weeks, not breastfeeding)",
    "postpartum-nobf": "Postpartum (not breastfeeding)",
    "recent-abortion": "Recent abortion (<4 weeks)",
    "years-since-menarche": "≤2 years since menarche",
    "perimenopausal": "Perimenopausal symptoms",
    "irregular-bleeding": "Irregular vaginal bleeding",
    "abnormal-discharge": "Abnormal vaginal discharge",
    "medications-cycle": "Medications affecting cycle/fertility signs",
    "chronic-elevated-temp": "Chronic elevated temperature",
    "acute-febrile": "Acute febrile illness",
  },
  advisories: {
    sti: "FAB methods do NOT protect against STIs/HIV. Recommend correct and consistent condom use.",
    "high-risk-pregnancy":
      "FAB methods may not be appropriate due to relatively higher typical-use failure rates.",
    "medication-evaluation": "Further evaluation of cycle stability required.",
  },
};
