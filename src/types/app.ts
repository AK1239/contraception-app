import { ContraceptiveMethodKey,  ContraceptiveRecommendation } from "./contraceptive";

// App navigation types for Expo Router
export type RootStackParamList = {
  index: undefined;
  "choose-contraceptive": undefined;
  personalize: { eligibleMethods?: ContraceptiveMethodKey[] };
  "compare-methods": { methods?: ContraceptiveMethodKey[] };
  "about-us": undefined;
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
