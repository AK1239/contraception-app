/**
 * Redux slice for Standard Days Method (SDM) Calculator
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SDMState, SDMSectionKey, SDMEligibilityResult } from '../../types/standardDayMethod';
import { getFirstSDMSection } from '../../utils/standardDayNavigation';

const initialState: SDMState = {
  answers: {
    cycleLengths: [null, null, null, null, null, null],
    lmpDate: null,
  },
  currentSection: null,
  evaluationResult: null,
  isComplete: false,
};

const standardDayMethodSlice = createSlice({
  name: 'standardDayMethod',
  initialState,
  reducers: {
    /**
     * Set answer for a specific cycle length (0-5 index)
     */
    setCycleLength: (state, action: PayloadAction<{ index: number; value: number | null }>) => {
      const { index, value } = action.payload;
      if (index >= 0 && index < 6) {
        state.answers.cycleLengths[index] = value;
      }
    },

    /**
     * Set LMP date
     */
    setLMPDate: (state, action: PayloadAction<Date | null>) => {
      state.answers.lmpDate = action.payload;
    },

    /**
     * Set current section
     */
    setCurrentSection: (state, action: PayloadAction<SDMSectionKey>) => {
      state.currentSection = action.payload;
    },

    /**
     * Set evaluation result
     */
    setEvaluationResult: (state, action: PayloadAction<SDMEligibilityResult>) => {
      state.evaluationResult = action.payload;
    },

    /**
     * Mark questionnaire as complete
     */
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },

    /**
     * Initialize calculator (set first section)
     */
    initializeSDM: (state) => {
      state.currentSection = getFirstSDMSection();
      state.isComplete = false;
    },

    /**
     * Reset all state
     */
    resetSDM: () => initialState,
  },
});

export const {
  setCycleLength,
  setLMPDate,
  setCurrentSection,
  setEvaluationResult,
  setComplete,
  initializeSDM,
  resetSDM,
} = standardDayMethodSlice.actions;

export default standardDayMethodSlice.reducer;
