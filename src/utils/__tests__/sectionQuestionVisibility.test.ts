import {
  isQuestionVisible,
  getVisibleSectionQuestions,
} from "../sectionQuestionVisibility";
import type { SectionQuestion } from "../../types/sections";
import type { AnswerState } from "../../types/rules";

describe("sectionQuestionVisibility", () => {
  const questions: SectionQuestion[] = [
    {
      id: "q1",
      text: "Question 1",
      type: "yes-no",
      required: true,
    },
    {
      id: "q2",
      text: "Question 2",
      type: "yes-no",
      required: true,
      conditional: { dependsOn: "q1", expectedValue: true },
    },
    {
      id: "q3",
      text: "Question 3",
      type: "yes-no",
      required: true,
      conditional: { dependsOn: "q1", expectedValue: false },
    },
  ];

  describe("isQuestionVisible", () => {
    it("returns true for questions without conditional", () => {
      expect(isQuestionVisible(questions[0], {})).toBe(true);
    });

    it("returns true when dependent value matches expectedValue", () => {
      expect(
        isQuestionVisible(questions[1], { q1: true } as AnswerState)
      ).toBe(true);
      expect(
        isQuestionVisible(questions[2], { q1: false } as AnswerState)
      ).toBe(true);
    });

    it("returns false when dependent value does not match", () => {
      expect(
        isQuestionVisible(questions[1], { q1: false } as AnswerState)
      ).toBe(false);
      expect(
        isQuestionVisible(questions[2], { q1: true } as AnswerState)
      ).toBe(false);
    });

    it("returns false when dependent value is undefined", () => {
      expect(isQuestionVisible(questions[1], {} as AnswerState)).toBe(false);
    });
  });

  describe("getVisibleSectionQuestions", () => {
    it("returns all questions when no conditionals or all match", () => {
      const visible = getVisibleSectionQuestions(
        [questions[0]],
        {} as AnswerState
      );
      expect(visible).toHaveLength(1);
      expect(visible[0].id).toBe("q1");
    });

    it("filters by conditional - q1 yes shows q2", () => {
      const visible = getVisibleSectionQuestions(
        questions,
        { q1: true } as AnswerState
      );
      expect(visible).toHaveLength(2);
      expect(visible.map((q) => q.id)).toEqual(["q1", "q2"]);
    });

    it("filters by conditional - q1 no shows q3", () => {
      const visible = getVisibleSectionQuestions(
        questions,
        { q1: false } as AnswerState
      );
      expect(visible).toHaveLength(2);
      expect(visible.map((q) => q.id)).toEqual(["q1", "q3"]);
    });
  });
});
