import { ContraceptiveMethodKey, MECScores, ContraceptiveRecommendation } from "./contraceptive";

// App navigation types for Expo Router
export type RootStackParamList = {
  index: undefined;
  "choose-contraceptive": undefined;
  "medical-safety": undefined;
  personalize: { eligibleMethods?: ContraceptiveMethodKey[] };
  "compare-methods": { methods?: ContraceptiveMethodKey[] };
  "know-contraceptive": undefined;
  "about-us": undefined;
  faqs: undefined;
  results: { mecScores: MECScores };
  "final-recommendation": { recommendation: ContraceptiveRecommendation };
};

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// App theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}
