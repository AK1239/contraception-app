import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAnswers, AnswerValue, PersonalizationState } from "../../types";

interface QuestionnaireState {
  answers: UserAnswers;
  currentQuestionIndex: number;
  currentSection: "medical" | "personalization";
  isComplete: boolean;
  validationErrors: Record<string, string>;
  personalization: PersonalizationState;
}

const initialState: QuestionnaireState = {
  currentSection: "medical",
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false,
  validationErrors: {},
  personalization: {
    answers: {},
  },
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
      state.currentSection = "medical";
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.isComplete = false;
    },

    setAnswers: (state, action: PayloadAction<UserAnswers>) => {
      state.answers = action.payload;
    },

    // Personalization actions
    setPersonalizationAnswer: (
      state,
      action: PayloadAction<{ questionId: string; value: AnswerValue }>
    ) => {
      const { questionId, value } = action.payload;
      state.personalization.answers[questionId] = value;

      // Update specific personalization fields
      if (questionId === "wantsFuturePregnancy") {
        state.personalization.wantsFuturePregnancy = value as boolean;
      } else if (questionId === "okayWithIrregularPeriods") {
        state.personalization.okayWithIrregularPeriods = value as boolean;
      } else if (questionId === "wantsSurgicalMethod") {
        state.personalization.wantsSurgicalMethod = value as boolean;
      } else if (questionId === "wantsToContinueWithLongTerm") {
        // Store in answers only (not in top-level fields as it's not in the type)
        // This is fine as it's accessed via answers record
      } else if (questionId === "preferredFrequency") {
        state.personalization.preferredFrequency =
          value as PersonalizationState["preferredFrequency"];
      } else if (questionId === "currentBMI") {
        state.personalization.currentBMI = value as number;
      }
    },
    resetPersonalization: (state) => {
      state.personalization = {
        answers: {},
      };
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
  setPersonalizationAnswer,
  resetPersonalization,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
