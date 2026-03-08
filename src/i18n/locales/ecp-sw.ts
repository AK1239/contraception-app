/**
 * Emergency Contraception Safety (ECP) - Swahili
 * WHO MEC 2025
 */
export const ecpSw = {
  sections: {
    "ecp-patient-inputs": "Tathmini ya Usalama wa Uzazi wa Mpango wa Dharura",
  },
  questions: {
    hours_since_intercourse: "Saa tangu ngono isiyo na kinga",
    BMI: "Kipimo cha uzani wa mwili",
    pregnancy: "Mimba inayoshukiwa au iliyothibitishwa",
    breastfeeding: "Kunyonyesha",
    ectopic_history: "Historia ya mimba nje ya tumbo",
    severe_CVD:
      "Historia ya ugonjwa mkali wa moyo na mishipa (ugonjwa wa moyo, kiharusi, thromboembolism)",
    migraine: "Kichwa",
    severe_liver_disease: "Ugonjwa mkali wa ini (yellow fever/cirrhosis)",
    CYP3A4_inducer:
      "Kuchukua dawa zinazochochea enzyme CYP3A4 (rifampicin, carbamazepine, phenytoin, phenobarbital, efavirenz, rifabutin, oxcarbazepine, primidone, St John's wort)",
    repeat_ECP_cycle: "Matumizi ya ECP yanayorudiwa katika mzunguko mmoja",
    sexual_assault: "Unyanyasaji wa kijinsia / ubakaji",
  },
  placeholders: {
    hours_since_intercourse: "Ingiza masaa",
    BMI: "Ingiza BMI (hiari)",
  },
  getResults: "Pata Matokeo",
  methods: {
    lng: "LNG 1.5 mg",
    upa: "UPA 30 mg",
    coc: "COC Yuzpe",
  },
  safety: {
    SAFE: "SALAMA",
    USE_WITH_CAUTION: "TUMIA KWA UANGALIFU",
    AVOID: "EPUKA",
  },
  eligibility: {
    ELIGIBLE: "Anastahili",
    PREFERRED: "Inapendekezwa",
    LESS_EFFECTIVE: "Si nzuri sana",
    NOT_INDICATED: "Haionyeshwi",
    NOT_RECOMMENDED: "Haipendekezwi",
  },
  dose: {
    lng: "1.5 mg dozi moja au 0.75 mg × dozi 2 zilizo na muda wa masaa 12",
    upa: "30 mg dozi moja",
    coc: "100 µg EE + 0.5 mg LNG × dozi 2 zilizo na muda wa masaa 12",
  },
  results: {
    mainTitle: "Matokeo ya Usalama wa Uzazi wa Mpango wa Dharura",
    subtitle: "Kulingana na WHO MEC 2025. Inaonyeshwa tofauti kwa LNG, UPA, COC.",
    notApplicableTitle: "ECP Hazitumiki",
    notApplicableMessage:
      "ECP haziwezi kutumika katika mimba iliyothibitishwa au inayoshukiwa.",
    recommendedOption: "Chaguo linalopendekezwa",
    alternativeOptions: "Chaguzi mbadala",
    mecByMethod: "MEC kwa njia",
    warnings: "Maonyo",
    doseInstructions: "Maagizo ya dozi",
    clinicalReminders: "Vikumbusho vya kliniki",
    goBack: "Rudi",
    recommendedUpa: "UPA 30 mg (nzuri zaidi ≤120h)",
    recommendedUpaShort: "UPA 30 mg",
    altLng: "LNG 1.5 mg",
    altCoc: "Njia ya COC Yuzpe",
    copperIUDRecommended: "Copper IUD (ingiza ndani ya siku 5)",
  },
  warnings: {
    breastfeeding:
      "Epuka kunyonyesha kwa siku 7 baada ya UPA. Onyesha na tupa maziwa ya matiti.",
    obesity:
      "Ufanisi unaweza kupungua katika unene; fikiria copper IUD ikiwa inapatikana.",
    cvd: "Tumia kwa uangalifu kwa sababu ya hatari ya CVD.",
    cyp3a4:
      "Viwango vya homoni vinaweza kupungua. Fikiria dozi mbili ya LNG (3 mg).",
    repeatEcp: "Matumizi yanayorudiwa yanaweza kusababisha uvujaji usio sawa.",
    sexualAssault:
      "Toa prophylaxis ya STI, toa HIV PEP, toa msaada wa kisaikolojia.",
    timeWindowExceeded:
      "ECP zote hazipendekezwi baada ya masaa 120. Pendekeza copper IUD.",
  },
  reminders: {
    noSTI: "ECP hazizuii STI",
    condomCounseling: "Pendekeza matumizi ya kondomu na ushauri wa uzazi wa mpango wa kawaida",
  },
};
