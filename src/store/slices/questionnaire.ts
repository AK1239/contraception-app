import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAnswers, AnswerValue, PersonalizationState } from "../../types";
import type { SectionKey } from "../../types/rules";
import type { EvaluationResult } from "../../types/rules";

interface QuestionnaireState {
  answers: UserAnswers;
  currentQuestionIndex: number;
  currentSection: "medical" | "personalization";
  /** WHO MEC: current section in questionnaire flow */
  mecCurrentSection: SectionKey | null;
  /** WHO MEC: section completion tracking */
  mecSectionProgress: Partial<Record<SectionKey, boolean>>;
  /** WHO MEC: evaluation result from rules engine */
  mecEvaluationResult: EvaluationResult | null;
  isComplete: boolean;
  validationErrors: Record<string, string>;
  personalization: PersonalizationState;
}

const initialState: QuestionnaireState = {
  answers: {},
  currentSection: "medical",
  currentQuestionIndex: 0,
  mecCurrentSection: null,
  mecSectionProgress: {},
  mecEvaluationResult: null,
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
      state.mecCurrentSection = null;
      state.mecSectionProgress = {};
      state.mecEvaluationResult = null;
    },

    // WHO MEC questionnaire actions
    setMECCurrentSection: (state, action: PayloadAction<SectionKey | null>) => {
      state.mecCurrentSection = action.payload;
    },
    setMECSectionComplete: (state, action: PayloadAction<SectionKey>) => {
      if (!state.mecSectionProgress) state.mecSectionProgress = {};
      state.mecSectionProgress[action.payload] = true;
    },
    setMECEvaluationResult: (state, action: PayloadAction<EvaluationResult | null>) => {
      state.mecEvaluationResult = action.payload;
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
      } else if (questionId === "heightWeight") {
        // Store height/weight object for BMI calculation
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
  setMECCurrentSection,
  setMECSectionComplete,
  setMECEvaluationResult,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
