/**
 * Emergency Contraception Safety (ECP) - English
 * WHO MEC 2025
 */
export const ecpEn = {
  sections: {
    "ecp-patient-inputs": "Emergency Contraception Safety Assessment",
  },
  questions: {
    hours_since_intercourse: "Hours since unprotected intercourse",
    BMI: "Body mass index",
    pregnancy: "Suspected or confirmed pregnancy",
    breastfeeding: "Breastfeeding",
    ectopic_history: "History of ectopic pregnancy",
    severe_CVD:
      "History of severe cardiovascular disease (ischemic heart disease, stroke, thromboembolism)",
    migraine: "Migraine",
    severe_liver_disease: "Severe liver disease (jaundice/cirrhosis)",
    CYP3A4_inducer:
      "Taking CYP3A4 enzyme-inducing medications (rifampicin, carbamazepine, phenytoin, phenobarbital, efavirenz, rifabutin, oxcarbazepine, primidone, St John's wort)",
    repeat_ECP_cycle: "Repeated ECP use in same cycle",
    sexual_assault: "Sexual assault / rape",
  },
  placeholders: {
    hours_since_intercourse: "Enter hours",
    BMI: "Enter BMI (optional)",
  },
  getResults: "Get Results",
  methods: {
    lng: "LNG 1.5 mg",
    upa: "UPA 30 mg",
    coc: "COC Yuzpe",
  },
  safety: {
    SAFE: "SAFE",
    USE_WITH_CAUTION: "USE WITH CAUTION",
    AVOID: "AVOID",
  },
  eligibility: {
    ELIGIBLE: "Eligible",
    PREFERRED: "Preferred",
    LESS_EFFECTIVE: "Less effective",
    NOT_INDICATED: "Not indicated",
    NOT_RECOMMENDED: "Not recommended",
  },
  dose: {
    lng: "1.5 mg single dose or 0.75 mg × 2 doses 12h apart",
    upa: "30 mg single dose",
    coc: "100 µg EE + 0.5 mg LNG × 2 doses 12h apart",
  },
  results: {
    mainTitle: "Emergency Contraception Safety Result",
    subtitle: "Based on WHO MEC 2025. Displayed separately for LNG, UPA, COC.",
    notApplicableTitle: "ECPs Not Applicable",
    notApplicableMessage:
      "ECPs cannot be used in confirmed or suspected pregnancy.",
    recommendedOption: "Recommended option",
    alternativeOptions: "Alternative options",
    mecByMethod: "MEC by method",
    warnings: "Warnings",
    doseInstructions: "Dose instructions",
    clinicalReminders: "Clinical reminders",
    goBack: "Go Back",
    recommendedUpa: "UPA 30 mg (most effective ≤120h)",
    recommendedUpaShort: "UPA 30 mg",
    altLng: "LNG 1.5 mg",
    altCoc: "COC Yuzpe method",
    copperIUDRecommended: "Copper IUD (insert within 5 days)",
  },
  warnings: {
    breastfeeding:
      "Avoid breastfeeding for 7 days after UPA. Express and discard breast milk.",
    obesity:
      "Effectiveness may be reduced in obesity; consider copper IUD if available.",
    cvd: "Use with caution due to CVD risk.",
    cyp3a4:
      "Hormone levels may be reduced. Consider double-dose LNG (3 mg).",
    repeatEcp: "Repeated use may cause irregular bleeding.",
    sexualAssault:
      "Offer STI prophylaxis, offer HIV PEP, provide psychological support.",
    timeWindowExceeded:
      "All ECPs not recommended after 120 hours. Suggest copper IUD.",
  },
  reminders: {
    noSTI: "ECPs do not prevent STIs",
    condomCounseling: "Recommend condom use and regular contraception counseling",
  },
};
