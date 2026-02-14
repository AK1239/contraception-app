import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MaleSterilizationSectionKey, MaleSterilizationEligibilityResult } from "../../types/maleSterilizationEligibility";
import type { AnswerValue } from "../../types/questionnaire";
import type { MaleSterilizationAnswerState } from "../../config/maleSterilizationSections";

interface MaleSterilizationEligibilityState {
  answers: MaleSterilizationAnswerState;
  currentSection: MaleSterilizationSectionKey | null;
  evaluationResult: MaleSterilizationEligibilityResult | null;
}

const initialState: MaleSterilizationEligibilityState = {
  answers: {},
  currentSection: null,
  evaluationResult: null,
};

const maleSterilizationEligibilitySlice = createSlice({
  name: "maleSterilizationEligibility",
  initialState,
  reducers: {
    setMaleSterilizationAnswer: (
      state,
      action: PayloadAction<{ questionId: string; value: AnswerValue }>
    ) => {
      const { questionId, value } = action.payload;
      state.answers[questionId] = value;
    },

    setMaleSterilizationCurrentSection: (
      state,
      action: PayloadAction<MaleSterilizationSectionKey | null>
    ) => {
      state.currentSection = action.payload;
    },

    setMaleSterilizationEvaluationResult: (
      state,
      action: PayloadAction<MaleSterilizationEligibilityResult | null>
    ) => {
      state.evaluationResult = action.payload;
    },

    resetMaleSterilizationEligibility: (state) => {
      state.answers = {};
      state.currentSection = null;
      state.evaluationResult = null;
    },
  },
});

export const {
  setMaleSterilizationAnswer,
  setMaleSterilizationCurrentSection,
  setMaleSterilizationEvaluationResult,
  resetMaleSterilizationEligibility,
} = maleSterilizationEligibilitySlice.actions;

export default maleSterilizationEligibilitySlice.reducer;
