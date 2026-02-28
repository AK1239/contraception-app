import { questionnaireEn } from "./questionnaire-en";
import { methodsEn } from "./methods-en";

const en = {
  // ─── Common ──────────────────────────────────────────────────────────────────
  common: {
    appName: "ContraSafe",
    loading: "Loading…",
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    done: "Done",
    yes: "Yes",
    no: "No",
    or: "or",
    learnMore: "Learn more",
    startOver: "Start Over",
    submit: "Submit",
  },

  // ─── Navigation / Drawer ─────────────────────────────────────────────────────
  nav: {
    home: "Home",
    knowYourContraceptive: "Know Your Contraceptive",
    naturalMethods: "Natural Methods",
    modernMethods: "Modern Methods",
    personalizeYourContraceptive: "Personalize Your Contraceptive",
    chooseYourContraceptive: "Choose Your Contraceptive",
    compareMethods: "Compare Contraceptive Methods",
    naturalMethodCalculators: "Natural Method Calculators",
    standardDayCalculator: "Standard Day Method Calculator",
    calendarMethodCalculator: "Calendar Method Calculator",
    naturalMethodEligibility: "Natural Method Eligibility (FAB)",
    sterilizationEligibility: "Sterilization Eligibility",
    femaleSterilization: "Female Sterilization Eligibility",
    maleSterilization: "Male Sterilization Eligibility",
    settings: "Settings",
  },

  // ─── Home ─────────────────────────────────────────────────────────────────────
  home: {
    exploreFeatures: "Explore Features",
    chooseTitle: "WHO MEC Screen",
    chooseDescription:
      "Screen client medically to provide safe contraceptive options based on the WHO MEC 2025.",
    chooseCta: "Choose Your Contraceptive",
    knowTitle: "For Women Seeking Information",
    knowDescription:
      "If you'd like to learn more about different contraceptives, explore the Natural Methods or Modern Methods sections.",
    knowCta: "View Methods",
    compareTitle: "Compare Methods",
    compareDescription:
      "Compare methods side by side with our Contraceptive Comparison Tool to see how they differ and decide what works best for you.",
    compareCta: "Compare Methods",
    personalizeTitle: "Personalized Guidance",
    personalizeDescription:
      "Not sure which method suits your needs? Visit the Personalize Your Contraceptive section for tailored recommendations.",
    personalizeCta: "Personalize Your Choice",
    naturalTitle: "Natural Methods",
    naturalDescription:
      "Prefer non-modern methods? Try our Calendar Method Calculator or Standard Days Method Calculator to identify your fertile days and avoid unprotected intercourse during those times.",
    naturalCta: "Natural Method Calculators",
    sterilizationTitle: "Sterilization Eligibility",
    sterilizationDescription:
      "Check eligibility for permanent contraception. Assess female surgical sterilization or male sterilization (vasectomy) using WHO Medical Eligibility Criteria.",
    sterilizationCta: "Sterilization Eligibility",
    settingsTitle: "Settings",
    settingsDescription:
      "Switch between Healthcare provider and General public experience.",
    settingsCta: "Settings",
    footer: "@med.tutor.tz",
  },

  // ─── Welcome Card ─────────────────────────────────────────────────────────────
  welcome: {
    greeting: "Welcome Back!",
    subtitle:
      "Your trusted companion for making informed contraceptive choices.",
  },

  // ─── Settings ────────────────────────────────────────────────────────────────
  settings: {
    title: "Settings",
    appExperience: "App Experience",
    appExperienceDescription:
      "Choose your role to personalize which features are displayed.",
    healthcareProvider: "Healthcare provider",
    healthcareProviderHint:
      "Full access to all features including eligibility tools",
    generalPublic: "General public",
    generalPublicHint:
      "Simplified experience. Natural Method Eligibility and Sterilization Eligibility are hidden.",
    language: "Language",
    languageDescription: "Choose your preferred language for the app.",
    languageEnglish: "English",
    languageSwahili: "Kiswahili",
  },

  // ─── Onboarding ──────────────────────────────────────────────────────────────
  onboarding: {
    skip: "Skip",
    getStarted: "Get Started",
    tapToGetStarted: "Tap to get started",
    next: "Next",
    slide1Title: "Welcome to\nContraSafe",
    slide1Subtitle: "Your Personalized Guide to Safer Family Planning",
    slide1Body:
      "Whether you're a healthcare provider or a woman seeking reliable contraceptives, ContraSafe simplifies family planning with a safe digital solution",
    slide2Title: "Evidence-Based\nGuidance",
    slide2Subtitle: "Powered by WHO Standards",
    slide2Body:
      "Built on the WHO Medical Eligibility Criteria for Contraceptive Use (2015), providing safe, evidence-based recommendations you can trust.",
    slide3Title: "Personalized\nGuide",
    slide3Subtitle: "Tailored to Your Health Profile",
    slide3Body:
      "Get a personalized list of safe options based on your medical history, with expert guidance on modern and natural methods—all in one place.",
    slide4Title: "Natural Family\nPlanning",
    slide4Subtitle: "Calendar Method Calculator",
    slide4Body:
      "Take control of your fertility with our Calendar Method calculator for those who prefer a natural approach",
    roleSelectionTitle: "Personalize Your Experience",
    roleSelectionSubtitle: "Please select your role",
    roleHealthcareTitle: "Healthcare provider",
    roleHealthcareHint: "Full access to all features",
    rolePublicTitle: "General public",
    rolePublicHint: "Simplified experience, eligibility tools hidden",
    roleSelectionWhoAreYou: "Who are you?",
    roleSelectionSubtitleAlt: "Select your role so we can personalize your experience.",
    roleHealthcareDescription:
      "Access all clinical tools including eligibility assessments and advanced features.",
    rolePublicDescription:
      "Access essential contraceptive information and guidance tailored for everyday use.",
    continueButton: "Continue",
  },

  // ─── Compare Methods ─────────────────────────────────────────────────────────
  compare: {
    title: "Compare Contraceptive Methods",
    subtitle:
      "Select two methods and choose what you want to compare. See side-by-side differences to help you make an informed decision.",
    firstMethod: "First Contraceptive",
    secondMethod: "Second Contraceptive",
    whatToCompare: "What do you want to compare?",
    compareButton: "Compare",
    previous: "Previous",
    next: "Next",
    done: "Done",
    backToSelection: "Back to Selection",
    fieldDescription: "Description",
    fieldEfficacy: "Efficacy",
    efficacyTypicalUse: "Typical Use",
    efficacyPerfectUse: "Perfect Use",
    fieldAdvantages: "Advantages",
    fieldDisadvantages: "Disadvantages",
    fieldHowToUse: "How to Use",
    fieldTimeToWork: "Time to Work",
    fieldSideNotes: "Side Notes",
    fieldCommonErrors: "Common Errors",
    searchPlaceholder: "Search contraceptive methods...",
    selectMethod: "Select a method...",
    noMethodsFound: "No methods found matching your search",
    noMethodsAvailable: "No methods available",
    progressOf: "Comparison {{current}} of {{total}}",
  },

  // ─── Know Contraceptive ──────────────────────────────────────────────────────
  knowContraceptive: {
    searchPlaceholder: "Search contraceptive methods...",
    noResults: 'No methods found matching "{{query}}"',
    naturalMethodsTitle: "Natural Methods",
    naturalMethodsDescription:
      "Explore natural family planning methods including Lactational Amenorrhea, Calendar Method, and Standard Days Method. These methods work with your body's natural fertility cycle.",
    naturalMethodsCta: "View Natural Methods",
    modernMethodsTitle: "Modern Methods",
    modernMethodsDescription:
      "Discover modern contraceptive options including temporary and permanent methods. These include hormonal and non-hormonal options with varying effectiveness and duration.",
    modernMethodsCta: "View Modern Methods",
    searchNatural: "Search natural methods...",
    searchModern: "Search modern methods...",
    noMethodsFound: "No methods found",
    noMethodsHint: 'Try searching for "lactational", "calendar", or "standard days"',
    knowMore: "Know More",
    noMethodsHintModern: 'Try searching for "temporary", "permanent", "condom", "pills", or "IUD"',
    lamTitle: "Lactational Amenorrhea",
    lamDescription:
      "A natural contraceptive method for breastfeeding women. When practiced correctly, exclusive breastfeeding can provide up to 98% protection against pregnancy for the first 6 months postpartum.",
    calendarTitle: "Calendar Method",
    calendarDescription:
      "A natural family planning method that identifies the 12 fertile days in a woman's cycle. Most effective for women with cycles between 26-32 days.",
    sdmTitle: "Standard Days Method",
    sdmDescription:
      "A fertility awareness-based method for women with regular cycles of 26–32 days. Days 8–19 are considered fertile and require avoiding unprotected sex. Most effective when combined with additional fertility indicators.",
    // Methods data (modern/temporary screens)
    methodsData: {
      categories: {
        temporary: {
          title: "Temporary Methods",
          description:
            "Reversible contraceptive methods that can be stopped when you want to conceive. Includes hormonal and non-hormonal options with varying effectiveness and duration.",
        },
        permanent: {
          title: "Permanent Methods",
          description:
            "Long-term contraceptive solutions that provide permanent protection against pregnancy. These methods are typically irreversible and suitable for those who have completed their family planning.",
        },
        barrier: {
          title: "Barrier Methods",
          description:
            "Physical barriers that prevent sperm from reaching the egg. Includes condoms, diaphragms, and cervical caps. These methods also provide protection against STIs.",
        },
        hormonal: {
          title: "Hormonal Methods",
          description:
            "Contraceptive methods that use hormones to prevent pregnancy. Includes birth control pills, patches, rings, and injections. Highly effective when used correctly.",
        },
        iud: {
          title: "Intrauterine Device Methods",
          description:
            "Intrauterine devices that are inserted into the uterus. Includes hormonal and copper IUDs. Long-lasting, highly effective, and reversible contraceptive options.",
        },
      },
      specificMethods: {
        "male-condom": {
          title: "Male Condom",
          description:
            "A thin sheath placed over the penis. Provides physical barrier protection against pregnancy and STDs.",
          breadcrumbModern: "Temporary > Barrier Methods",
          breadcrumbTemporary: "Barrier Methods",
        },
        "female-condom": {
          title: "Female Condom",
          description:
            "A barrier method worn by the female. Provides protection against pregnancy and can be inserted hours before sex.",
          breadcrumbModern: "Temporary > Barrier Methods",
          breadcrumbTemporary: "Barrier Methods",
        },
        coc: {
          title: "Combined Oral Contraceptives (COC)",
          description:
            "Pills containing both estrogen and progesterone hormones. Provides excellent protection with regular menses.",
          breadcrumbModern: "Temporary > Hormonal Methods",
          breadcrumbTemporary: "Hormonal Methods",
        },
        pop: {
          title: "Progestin Only Pills (POP)",
          description:
            "Pills containing only progesterone hormone. Excellent protection with no high estrogen side effects.",
          breadcrumbModern: "Temporary > Hormonal Methods",
          breadcrumbTemporary: "Hormonal Methods",
        },
        injection: {
          title: "Contraceptive Injections",
          description:
            "DMPA injections providing 3 months of protection. Can be used during breastfeeding.",
          breadcrumbModern: "Temporary > Hormonal Methods",
          breadcrumbTemporary: "Hormonal Methods",
        },
        implants: {
          title: "Implants",
          description:
            "Flexible rod placed under the skin. Provides perfect protection for 3-5 years.",
          breadcrumbModern: "Temporary > Hormonal Methods",
          breadcrumbTemporary: "Hormonal Methods",
        },
        patch: {
          title: "Combination Patch Contraceptive",
          description:
            "Transdermal patch releasing estrogen and progesterone. Works longer than pills.",
          breadcrumbModern: "Temporary > Hormonal Methods",
          breadcrumbTemporary: "Hormonal Methods",
        },
        ring: {
          title: "Contraceptive Vaginal Ring",
          description:
            "Flexible ring inserted into vagina monthly. Releases hormones continuously.",
          breadcrumbModern: "Temporary > Hormonal Methods",
          breadcrumbTemporary: "Hormonal Methods",
        },
        "copper-iucd": {
          title: "Copper IUCD",
          description:
            "T-shaped device with copper placed in uterus. Provides perfect protection for 5-12 years.",
          breadcrumbModern: "Temporary > IUD Methods",
          breadcrumbTemporary: "IUD Methods",
        },
        "lng-ius": {
          title: "LNG-IUS",
          description:
            "Hormonal IUD releasing levonorgestrel. Provides perfect protection for 3-5 years.",
          breadcrumbModern: "Temporary > IUD Methods",
          breadcrumbTemporary: "IUD Methods",
        },
        "tubal-ligation": {
          title: "Tubal Ligation",
          description:
            "Surgical procedure where fallopian tubes are tied. Provides permanent contraception for women.",
          breadcrumbModern: "Permanent Methods",
          breadcrumbTemporary: "Permanent Methods",
        },
        vasectomy: {
          title: "Vasectomy",
          description:
            "Permanent male sterilization where vas deferens are cut or sealed. Provides perfect efficacy.",
          breadcrumbModern: "Permanent Methods",
          breadcrumbTemporary: "Permanent Methods",
        },
      },
      searchTemporary: "Search temporary methods...",
      noResultsTemporary: 'Try searching for "barrier", "hormonal", "IUD", "condom", or "pills"',
    },
  },

  // ─── Natural Calculators ──────────────────────────────────────────────────────
  naturalCalculators: {
    fabTitle: "Natural Method Eligibility (FAB)",
    fabDescription:
      "Assess eligibility for Symptoms-Based (SYM) and Calendar-Based (CAL) fertility awareness methods. Get Accept, Caution, or Delay recommendations with STI/HIV and high-risk pregnancy advisories.",
    fabCta: "Check FAB Eligibility",
    standardDayTitle: "Standard Days Method Calculator",
    standardDayDescription:
      "Calculate your fertile days using the Standard Days Method. This method is suitable for women with regular cycles between 26-32 days. It identifies days 8-19 as potentially fertile days.",
    standardDayCta: "Use Standard Days Calculator",
    calendarTitle: "Calendar Method Calculator",
    calendarDescription:
      "Track your menstrual cycles to identify your fertile window. Enter your cycle lengths to calculate personalized fertile periods based on your unique cycle pattern.",
    calendarCta: "Use Calendar Method Calculator",
  },

  // ─── Sterilization Eligibility ─────────────────────────────────────────────────
  sterilization: {
    femaleTitle: "Female Sterilization Eligibility",
    femaleDescription:
      "Determine eligibility for female surgical sterilization using structured clinical logic. Evaluates conditions across multiple categories including cardiovascular, endocrine, gynecologic, and more to provide Accept, Caution, Delay, or Specialist Referral recommendations.",
    femaleCta: "Assess Female Eligibility",
    maleTitle: "Male Sterilization Eligibility",
    maleDescription:
      "Determine eligibility for male surgical sterilization (vasectomy) using WHO Medical Eligibility Criteria. Evaluates conditions including HIV status, endocrine disorders, genital infections, and scrotal structural abnormalities to provide Accept, Caution, Delay, or Special Setting recommendations.",
    maleCta: "Assess Male Eligibility",
  },

  // ─── Personalize ──────────────────────────────────────────────────────────────
  personalize: {
    title: "Personalize Your Choice",
    questionsCount: "{{count}} question",
    questionsCountPlural: "{{count}} questions",
    loadingQuestions: "Loading personalization questions...",
    preparingQuestions: "Preparing questions...",
    generatingResults: "Generating your personalized recommendations...",
    stepOf: "Step {{current}} of {{total}}",
    previous: "Previous",
    next: "Next",
    getResults: "Get Results",
  },

  // ─── MEC / Choose Contraceptive ───────────────────────────────────────────────
  mec: {
    howToUse: "How to use this feature",
    howToUseBody:
      "Take a thorough history from your client guided by the questions that will be displayed.",
    labTests: "Lab tests which may be required to answer some questions",
    labTestsBody: "RBG • UPT • FBC • Lipid profile • Pelvic USS",
    onceAnswered: "Once all questions are answered",
    onceAnsweredBody:
      "A list of contraceptives will be displayed with their safety level (MEC grade) based on your client's condition(s).",
    interpretation: "Interpretation",
    mec1: "MEC 1 = safe",
    mec2: "MEC 2 = benefits outweigh risk",
    mec3: "MEC 3 = risks outweigh benefits",
    mec4: "MEC 4 = unsafe",
    stepOf: "Step {{current}} of {{total}}",
    previous: "Previous",
    next: "Next",
    seeResults: "See Results",
    results: {
      suggestedTitle: "Suggested safe contraceptives (MEC 1)",
      suggestedDescription: "These methods have no restrictions based on your answers.",
      suggestedEmpty: "No methods in this category based on your answers.",
      greaterBenefitTitle: "Greater benefit than risk (MEC 2)",
      greaterBenefitDescription: "Advantages generally outweigh risks. Consider with your healthcare provider.",
      greaterBenefitEmpty: "No methods in this category.",
      avoidTitle: "Avoid these contraceptives (MEC 3/4)",
      avoidDescription: "Risks usually outweigh advantages or represent unacceptable health risk.",
      avoidEmpty: "No methods to avoid based on your answers.",
      whyMec: "Why MEC {{score}}:",
      personalizeButton: "Personalize your choice",
      personalizeHint: "Refine your options based on preferences (frequency, future pregnancy, etc.)",
      backToQuestions: "Back to Questions",
      startOver: "Start Over",
    },
  },

  // ─── Final Recommendation ────────────────────────────────────────────────────
  recommendation: {
    title: "Your Personalized Recommendation",
    noRecommendations: "No recommendations available",
    completeFirst: "Please complete the personalization questionnaire first.",
    bestMatch: "Your Best Match",
    bestMatchPlural: "Your Best Matches",
    bestMatchDescription:
      "This method perfectly aligns with your health profile and lifestyle preferences.",
    bestMatchDescriptionPlural:
      "These methods align well with your health profile and lifestyle preferences.",
    knowContraceptive: "Know Your Contraceptive",
    compareMethods: "Compare Contraceptive Methods",
    importantInfo: "Important Information",
    stiProtection: "STI Protection",
    stiProtectionBody:
      "None of the below methods provide protection against STIs, so if you think you're at an increased risk of STI, barrier methods should be used either alone acting both as a contraceptive and a protector for STI or you can use barrier methods along with your chosen contraceptive.",
    notRecommended: "Methods Not Recommended for You",
    notRecommendedDescription: "These methods were filtered out based on your preferences:",
    reason: "Reason",
    category: "Category",
    recommended: "Recommended",
    alternative: "Alternative",
    medicalDisclaimer: "Medical Disclaimer: ",
    medicalDisclaimerBody:
      "Recommendations are based on WHO guidelines and the details you shared. Please consult a healthcare provider before starting any contraceptive.",
  },

  // ─── Questionnaire (WHO MEC) ──────────────────────────────────────────────────
  questionnaire: questionnaireEn,

  // ─── Contraceptive Methods (detail pages, MEC names) ────────────────────────────
  methods: methodsEn,
} as const;

export default en;
export type TranslationKeys = typeof en;
