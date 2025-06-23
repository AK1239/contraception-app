import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MECScores, ContraceptiveRecommendation } from "../../types";

interface ResultsState {
  mecScores: MECScores | null;
  recommendation: ContraceptiveRecommendation | null;
  isCalculating: boolean;
  error: string | null;
}

const initialState: ResultsState = {
  mecScores: null,
  recommendation: null,
  isCalculating: false,
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setCalculating: (state, action: PayloadAction<boolean>) => {
      state.isCalculating = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setMECScores: (state, action: PayloadAction<MECScores>) => {
      state.mecScores = action.payload;
      state.isCalculating = false;
      state.error = null;
    },

    setRecommendation: (state, action: PayloadAction<ContraceptiveRecommendation>) => {
      state.recommendation = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isCalculating = false;
    },

    clearResults: (state) => {
      state.mecScores = null;
      state.recommendation = null;
      state.isCalculating = false;
      state.error = null;
    },
  },
});

export const { setCalculating, setMECScores, setRecommendation, setError, clearResults } =
  resultsSlice.actions;

export default resultsSlice.reducer;
