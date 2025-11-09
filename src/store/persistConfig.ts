import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig } from "redux-persist";

/**
 * AsyncStorage configuration for redux-persist
 * Uses AsyncStorage as the storage engine for React Native
 */
export const persistStorage = AsyncStorage;

/**
 * Persistence configuration for the questionnaire slice
 * Persists user answers, personalization, and completion status
 * but excludes navigation state (currentQuestionIndex, currentSection, validationErrors)
 * so users start fresh on app restart while keeping their answers
 */
export const questionnairePersistConfig: PersistConfig<any> = {
  key: "questionnaire",
  storage: persistStorage,
  // Only persist important data, exclude navigation/UI state
  whitelist: ["answers", "personalization", "isComplete"],
  // Don't persist navigation state - users should start from beginning of their section
  blacklist: ["currentQuestionIndex", "currentSection", "validationErrors"],
};

/**
 * Persistence configuration for the results slice
 * Persists MEC scores and recommendations to avoid recalculating on app restart
 * Excludes loading and error states as these are ephemeral
 */
export const resultsPersistConfig: PersistConfig<any> = {
  key: "results",
  storage: persistStorage,
  // Persist calculated results, but not loading/error states
  whitelist: ["mecScores", "recommendation"],
  blacklist: ["isCalculating", "error"],
};

