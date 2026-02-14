import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import questionnaireReducer from "./slices/questionnaire";
import resultsReducer from "./slices/results";
import fabEligibilityReducer from "./slices/fabEligibility";
import { questionnairePersistConfig, resultsPersistConfig } from "./persistConfig";

// Create persisted reducers with nested configuration for granular control
const persistedQuestionnaireReducer = persistReducer(questionnairePersistConfig, questionnaireReducer);
const persistedResultsReducer = persistReducer(resultsPersistConfig, resultsReducer);

// Combine reducers
const rootReducer = combineReducers({
  questionnaire: persistedQuestionnaireReducer,
  results: persistedResultsReducer,
  fabEligibility: fabEligibilityReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, "questionnaire/setAnswer"],
        ignoredActionsPaths: ["payload.timestamp"],
        ignoredPaths: [
          "questionnaire.answers.birthDate",
          "questionnaire.answers.birth-date",
          "questionnaire.answers.timestamp",
        ],
      },
    }),
});

// Create persistor for the store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
