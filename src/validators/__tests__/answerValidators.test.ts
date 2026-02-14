import {
  validateAnswer,
  validateAge,
  validateBMI,
} from "../answerValidators";
import type { SectionQuestion } from "../../types/sections";

describe("answerValidators", () => {
  describe("validateAnswer", () => {
    it("fails required question when value is empty", () => {
      const q: SectionQuestion = {
        id: "req",
        text: "Required?",
        type: "yes-no",
        required: true,
      };
      expect(validateAnswer(q, undefined).valid).toBe(false);
      expect(validateAnswer(q, null).valid).toBe(false);
      expect(validateAnswer(q, "").valid).toBe(false);
    });

    it("passes required question when value is provided", () => {
      const q: SectionQuestion = {
        id: "req",
        text: "Required?",
        type: "yes-no",
        required: true,
      };
      expect(validateAnswer(q, true).valid).toBe(true);
      expect(validateAnswer(q, false).valid).toBe(true);
    });

    it("validates numeric min/max", () => {
      const q: SectionQuestion = {
        id: "num",
        text: "Number",
        type: "numeric",
        required: true,
        validation: { min: 10, max: 100 },
      };
      expect(validateAnswer(q, 50).valid).toBe(true);
      expect(validateAnswer(q, 5).valid).toBe(false);
      expect(validateAnswer(q, 5).error).toContain("at least 10");
      expect(validateAnswer(q, 150).valid).toBe(false);
      expect(validateAnswer(q, 150).error).toContain("at most 100");
    });

    it("rejects non-numeric for numeric type", () => {
      const q: SectionQuestion = {
        id: "num",
        text: "Number",
        type: "numeric",
        required: false,
      };
      expect(validateAnswer(q, "abc").valid).toBe(false);
    });

    it("validates blood pressure ranges", () => {
      const q: SectionQuestion = {
        id: "bp",
        text: "Blood pressure",
        type: "blood-pressure",
        required: true,
      };
      expect(
        validateAnswer(q, { systolic: 120, diastolic: 80 }).valid
      ).toBe(true);
      expect(
        validateAnswer(q, { systolic: 50, diastolic: 80 }).valid
      ).toBe(false);
      expect(
        validateAnswer(q, { systolic: 100, diastolic: 120 }).valid
      ).toBe(false); // systolic must be > diastolic
    });

    it("validates cycle-durations requires all 6 values in range", () => {
      const q: SectionQuestion = {
        id: "cycle-durations",
        text: "Cycle durations",
        type: "cycle-durations",
        required: true,
        validation: { min: 21, max: 45 },
      };
      expect(validateAnswer(q, [28, 30, 29, 28, 31, 27]).valid).toBe(true);
      expect(validateAnswer(q, [28, 30]).valid).toBe(false);
      expect(validateAnswer(q, [28, 30, 29, 28, 31, 15]).valid).toBe(false);
    });

    it("passes yes-no without validation rules", () => {
      const q: SectionQuestion = {
        id: "yn",
        text: "Yes or no?",
        type: "yes-no",
        required: true,
      };
      expect(validateAnswer(q, true).valid).toBe(true);
      expect(validateAnswer(q, false).valid).toBe(true);
    });
  });

  describe("validateAge", () => {
    it("fails when age is undefined", () => {
      expect(validateAge(undefined).valid).toBe(false);
    });

    it("fails when age is out of range", () => {
      expect(validateAge(5).valid).toBe(false);
      expect(validateAge(80).valid).toBe(false);
    });

    it("passes when age is in range", () => {
      expect(validateAge(25).valid).toBe(true);
      expect(validateAge(10).valid).toBe(true);
      expect(validateAge(70).valid).toBe(true);
    });
  });

  describe("validateBMI", () => {
    it("fails when weight or height invalid", () => {
      expect(validateBMI(0, 170).valid).toBe(false);
      expect(validateBMI(70, 0).valid).toBe(false);
      expect(validateBMI(20, 170).valid).toBe(false); // weight < 30
      expect(validateBMI(70, 50).valid).toBe(false); // height < 100
    });

    it("passes for reasonable values", () => {
      expect(validateBMI(70, 170).valid).toBe(true);
      expect(validateBMI(60, 165).valid).toBe(true);
    });
  });
});
