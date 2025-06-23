// Barrel export for all constants
export * from "./contraceptiveMethods";
export * from "./questions";

// Additional constants that might be added later
export const APP_NAME = "ContraSafe";
export const APP_VERSION = "1.0.0";

// UI Constants
export const COLORS = {
  primary: "#2196F3",
  secondary: "#FFC107",
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3",
  background: "#FFFFFF",
  surface: "#F5F5F5",
  text: "#212121",
  textSecondary: "#757575",
} as const;

// App configuration
export const CONFIG = {
  questionnaire: {
    maxQuestionsPerPage: 1,
    allowSkipping: false,
    requireAllAnswers: true,
  },
  recommendations: {
    maxRecommendations: 5,
    showMECScores: true,
  },
} as const;
