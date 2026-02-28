const sw = {
  // ─── Common ──────────────────────────────────────────────────────────────────
  common: {
    appName: "ContraSafe",
    loading: "Inapakia…",
    save: "Hifadhi",
    cancel: "Ghairi",
    back: "Rudi",
    next: "Endelea",
    done: "Imekamilika",
    yes: "Ndiyo",
    no: "Hapana",
    or: "au",
    learnMore: "Jifunze zaidi",
    startOver: "Anza Upya",
    submit: "Wasilisha",
  },

  // ─── Navigation / Drawer ─────────────────────────────────────────────────────
  nav: {
    home: "Nyumbani",
    knowYourContraceptive: "Jua Uzazi wa Mpango Wako",
    naturalMethods: "Njia za Asili",
    modernMethods: "Njia za Kisasa",
    personalizeYourContraceptive: "Badilisha Uzazi wa Mpango Wako",
    chooseYourContraceptive: "Chagua Uzazi wa Mpango",
    compareMethods: "Linganisha Njia za Uzazi",
    naturalMethodCalculators: "Vihesabu vya Njia za Asili",
    standardDayCalculator: "Kihesabu cha Njia ya Siku za Kawaida",
    calendarMethodCalculator: "Kihesabu cha Njia ya Kalenda",
    naturalMethodEligibility: "Ustahili wa Njia za Asili (FAB)",
    sterilizationEligibility: "Ustahili wa Kufungwa",
    femaleSterilization: "Ustahili wa Kufungwa kwa Mwanamke",
    maleSterilization: "Ustahili wa Kufungwa kwa Mwanaume",
    settings: "Mipangilio",
  },

  // ─── Home ─────────────────────────────────────────────────────────────────────
  home: {
    exploreFeatures: "Chunguza Vipengele",
    chooseTitle: "Chagua Uzazi wa Mpango",
    chooseDescription:
      "Jibu maswali ya kiafya ili upate mapendekezo ya WHO kuhusu njia salama za uzazi wa mpango zinazokufaa.",
    chooseCta: "Chagua Uzazi wa Mpango",
    knowTitle: "Kwa Wanawake Wanaotafuta Taarifa",
    knowDescription:
      "Ukitaka kujifunza zaidi kuhusu njia mbalimbali za uzazi wa mpango, angalia sehemu za Njia za Asili au Njia za Kisasa.",
    knowCta: "Tazama Njia",
    compareTitle: "Linganisha Njia",
    compareDescription:
      "Linganisha njia kwa njia kwa kutumia Zana yetu ya Kulinganisha ili uone tofauti zao na uchague inayokufaa zaidi.",
    compareCta: "Linganisha Njia",
    personalizeTitle: "Ushauri Uliobinafsishwa",
    personalizeDescription:
      "Hujui njia inayokufaa? Tembelea sehemu ya Kubinafsisha Uzazi wa Mpango wako kwa mapendekezo yaliyoundwa mahususi kwako.",
    personalizeCta: "Binafsisha Chaguo Lako",
    naturalTitle: "Njia za Asili",
    naturalDescription:
      "Unapendelea njia zisizo za kisasa? Jaribu Kihesabu cha Njia ya Kalenda au Kihesabu cha Njia ya Siku za Kawaida kutambua siku zako za uzazi na kuepuka tendo la ndoa bila kinga wakati huo.",
    naturalCta: "Vihesabu vya Njia za Asili",
    sterilizationTitle: "Ustahili wa Kufungwa",
    sterilizationDescription:
      "Angalia ustahili wa uzazi wa mpango wa kudumu. Tathmini kufungwa kwa upasuaji kwa mwanamke au vasectomy kwa mwanaume kwa kutumia Vigezo vya WHO.",
    sterilizationCta: "Ustahili wa Kufungwa",
    settingsTitle: "Mipangilio",
    settingsDescription:
      "Badilisha kati ya uzoefu wa Mtoa Huduma za Afya na Umma.",
    settingsCta: "Mipangilio",
    footer: "@med.tutor.tz",
  },

  // ─── Welcome Card ─────────────────────────────────────────────────────────────
  welcome: {
    greeting: "Karibu ContraSafe",
    subtitle:
      "Mwongozo wa uzazi wa mpango unaotegemea ushahidi, ukitumia Vigezo vya Ustahili wa Kimatibabu vya WHO.",
  },

  // ─── Settings ────────────────────────────────────────────────────────────────
  settings: {
    title: "Mipangilio",
    appExperience: "Uzoefu wa Programu",
    appExperienceDescription:
      "Chagua jukumu lako ili kubinafsisha vipengele vinavyoonyeshwa.",
    healthcareProvider: "Mtoa Huduma za Afya",
    healthcareProviderHint:
      "Ufikiaji kamili wa vipengele vyote ikiwemo zana za ustahili",
    generalPublic: "Umma",
    generalPublicHint:
      "Uzoefu rahisi. Ustahili wa Njia za Asili na Ustahili wa Kufungwa umefichwa.",
    language: "Lugha",
    languageDescription: "Chagua lugha unayoipendelea kwa programu.",
    languageEnglish: "English",
    languageSwahili: "Kiswahili",
  },

  // ─── Onboarding ──────────────────────────────────────────────────────────────
  onboarding: {
    skip: "Ruka",
    getStarted: "Anza",
    roleSelectionTitle: "Wewe ni nani?",
    roleSelectionSubtitle: "Chagua jukumu lako ili tubinafsishe uzoefu wako.",
    roleHealthcareTitle: "Mtoa Huduma za Afya",
    roleHealthcareDescription:
      "Fikia zana zote za kliniki ikiwemo tathmini za ustahili na vipengele vya kina.",
    rolePublicTitle: "Umma",
    rolePublicDescription:
      "Fikia taarifa muhimu za uzazi wa mpango na mwongozo ulioundwa kwa matumizi ya kila siku.",
    continueButton: "Endelea",
  },
} as const;

export default sw;
