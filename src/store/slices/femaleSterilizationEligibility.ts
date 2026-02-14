import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FemaleSterilizationSectionKey, SterilizationEligibilityResult } from "../../types/sterilizationEligibility";
import type { AnswerValue } from "../../types/questionnaire";
import type { FemaleSterilizationAnswerState } from "../../config/femaleSterilizationSections";

interface FemaleSterilizationEligibilityState {
  answers: FemaleSterilizationAnswerState;
  currentSection: FemaleSterilizationSectionKey | null;
  evaluationResult: SterilizationEligibilityResult | null;
}

const initialState: FemaleSterilizationEligibilityState = {
  answers: {},
  currentSection: null,
  evaluationResult: null,
};

const femaleSterilizationEligibilitySlice = createSlice({
  name: "femaleSterilizationEligibility",
  initialState,
  reducers: {
    setFemaleSterilizationAnswer: (
      state,
      action: PayloadAction<{ questionId: string; value: AnswerValue }>
    ) => {
      const { questionId, value } = action.payload;
      state.answers[questionId] = value;
    },

    setFemaleSterilizationCurrentSection: (
      state,
      action: PayloadAction<FemaleSterilizationSectionKey | null>
    ) => {
      state.currentSection = action.payload;
    },

    setFemaleSterilizationEvaluationResult: (
      state,
      action: PayloadAction<SterilizationEligibilityResult | null>
    ) => {
      state.evaluationResult = action.payload;
    },

    resetFemaleSterilizationEligibility: (state) => {
      state.answers = {};
      state.currentSection = null;
      state.evaluationResult = null;
    },
  },
});

export const {
  setFemaleSterilizationAnswer,
  setFemaleSterilizationCurrentSection,
  setFemaleSterilizationEvaluationResult,
  resetFemaleSterilizationEligibility,
} = femaleSterilizationEligibilitySlice.actions;

export default femaleSterilizationEligibilitySlice.reducer;
