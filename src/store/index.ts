import { configureStore } from "@reduxjs/toolkit";
import questionnaireReducer from "./slices/questionnaire";
import resultsReducer from "./slices/results";

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    results: resultsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["questionnaire/setAnswer"],
        ignoredActionsPaths: ["payload.timestamp"],
        ignoredPaths: ["questionnaire.answers.birthDate", "questionnaire.answers.timestamp"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
