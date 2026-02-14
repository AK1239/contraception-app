import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FABSectionKey } from "../../types/fabEligibility";
import type { FABEligibilityResult } from "../../types/fabEligibility";
import type { AnswerValue } from "../../types/questionnaire";
import type { FABAnswerState } from "../../config/fabSections";

interface FABEligibilityState {
  answers: FABAnswerState;
  currentSection: FABSectionKey | null;
  evaluationResult: FABEligibilityResult | null;
}

const initialState: FABEligibilityState = {
  answers: {},
  currentSection: null,
  evaluationResult: null,
};

const fabEligibilitySlice = createSlice({
  name: "fabEligibility",
  initialState,
  reducers: {
    setFABAnswer: (
      state,
      action: PayloadAction<{ questionId: string; value: AnswerValue }>
    ) => {
      const { questionId, value } = action.payload;
      state.answers[questionId] = value;
    },

    setFABCurrentSection: (
      state,
      action: PayloadAction<FABSectionKey | null>
    ) => {
      state.currentSection = action.payload;
    },

    setFABEvaluationResult: (
      state,
      action: PayloadAction<FABEligibilityResult | null>
    ) => {
      state.evaluationResult = action.payload;
    },

    resetFABEligibility: (state) => {
      state.answers = {};
      state.currentSection = null;
      state.evaluationResult = null;
    },
  },
});

export const {
  setFABAnswer,
  setFABCurrentSection,
  setFABEvaluationResult,
  resetFABEligibility,
} = fabEligibilitySlice.actions;

export default fabEligibilitySlice.reducer;
