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
    id: "wantsToContinueWithLongTerm",
    text: "If surgery isn't suitable for you, there are no other permanent methods but long-term options are available. Would you like to continue?",
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
