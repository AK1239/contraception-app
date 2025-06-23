import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionnaireState, UserAnswers, AnswerValue } from "../../types";

const initialState: QuestionnaireState = {
  currentSection: "pregnancy-check",
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false,
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionId: string; value: AnswerValue }>) => {
      const { questionId, value } = action.payload;
      state.answers[questionId] = value;
    },

    clearAnswer: (state, action: PayloadAction<string>) => {
      delete state.answers[action.payload];
    },

    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },

    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },

    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },

    setSection: (state, action: PayloadAction<QuestionnaireState["currentSection"]>) => {
      state.currentSection = action.payload;
    },

    setComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },

    resetQuestionnaire: (state) => {
      state.currentSection = "pregnancy-check";
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.isComplete = false;
    },

    setAnswers: (state, action: PayloadAction<UserAnswers>) => {
      state.answers = action.payload;
    },
  },
});

export const {
  setAnswer,
  clearAnswer,
  setCurrentQuestion,
  nextQuestion,
  previousQuestion,
  setSection,
  setComplete,
  resetQuestionnaire,
  setAnswers,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
