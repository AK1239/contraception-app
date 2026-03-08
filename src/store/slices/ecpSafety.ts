import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ECPSafetyResult } from "../../types/ecpSafety";
import type { AnswerValue } from "../../types/questionnaire";
import type { ECPAnswerState } from "../../config/ecpSections";

interface ECPSafetyState {
  answers: ECPAnswerState;
  evaluationResult: ECPSafetyResult | null;
}

const initialState: ECPSafetyState = {
  answers: {},
  evaluationResult: null,
};

const ecpSafetySlice = createSlice({
  name: "ecpSafety",
  initialState,
  reducers: {
    setECPAnswer: (
      state,
      action: PayloadAction<{ questionId: string; value: AnswerValue }>
    ) => {
      const { questionId, value } = action.payload;
      state.answers[questionId] = value;
    },

    setECPEvaluationResult: (
      state,
      action: PayloadAction<ECPSafetyResult | null>
    ) => {
      state.evaluationResult = action.payload;
    },

    resetECPSafety: (state) => {
      state.answers = {};
      state.evaluationResult = null;
    },
  },
});

export const {
  setECPAnswer,
  setECPEvaluationResult,
  resetECPSafety,
} = ecpSafetySlice.actions;

export default ecpSafetySlice.reducer;
