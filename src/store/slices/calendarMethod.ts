/**
 * Redux slice for Calendar Method (Ogino-Knaus / Rhythm Method) Calculator
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarMethodState, CalendarMethodSectionKey, CalendarMethodEligibilityResult } from '../../types/calendarMethod';
import { getFirstCalendarMethodSection } from '../../utils/calendarMethodNavigation';

const initialState: CalendarMethodState = {
  answers: {
    cycleLengths: [null, null, null, null, null, null],
    lmpDate: null,
  },
  currentSection: null,
  evaluationResult: null,
  isComplete: false,
};

const calendarMethodSlice = createSlice({
  name: 'calendarMethod',
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
    setCurrentSection: (state, action: PayloadAction<CalendarMethodSectionKey>) => {
      state.currentSection = action.payload;
    },

    /**
     * Set evaluation result
     */
    setEvaluationResult: (state, action: PayloadAction<CalendarMethodEligibilityResult>) => {
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
    initializeCalendarMethod: (state) => {
      state.currentSection = getFirstCalendarMethodSection();
      state.isComplete = false;
    },

    /**
     * Reset all state
     */
    resetCalendarMethod: () => initialState,
  },
});

export const {
  setCycleLength,
  setLMPDate,
  setCurrentSection,
  setEvaluationResult,
  setComplete,
  initializeCalendarMethod,
  resetCalendarMethod,
} = calendarMethodSlice.actions;

export default calendarMethodSlice.reducer;
