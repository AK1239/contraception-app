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
    roleSelectionTitle: "Who are you?",
    roleSelectionSubtitle:
      "Select your role so we can personalize your experience.",
    roleHealthcareTitle: "Healthcare Provider",
    roleHealthcareDescription:
      "Access all clinical tools including eligibility assessments and advanced features.",
    rolePublicTitle: "General Public",
    rolePublicDescription:
      "Access essential contraceptive information and guidance tailored for everyday use.",
    continueButton: "Continue",
  },
} as const;

export default en;
export type TranslationKeys = typeof en;
