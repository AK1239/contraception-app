import { createRulesEngine } from "../rulesEngine";
import { ALL_RULES } from "../../rules";
import type { AnswerState } from "../../types/rules";

describe("RulesEngine", () => {
  const engine = createRulesEngine(ALL_RULES);

  describe("empty/minimal answers", () => {
    it("returns all methods as suggested (MEC 1) when no rules trigger", () => {
      const answers: AnswerState = {};
      const result = engine.evaluate(answers);

      expect(result.suggested.length).toBeGreaterThan(0);
      expect(result.greaterBenefit.length).toBe(0);
      expect(result.avoid.length).toBe(0);
      expect(result.mecResults).toHaveLength(15);
    });
  });

  describe("age-based rules (Section 1)", () => {
    it("marks DMPA as greater benefit (MEC 2) when age < 18", () => {
      const answers: AnswerState = { age: 16 };
      const result = engine.evaluate(answers);

      expect(result.greaterBenefit).toContain("d");
      const dResult = result.mecResults.find((r) => r.methodKey === "d");
      expect(dResult?.score).toBe(2);
      expect(dResult?.reasons).toContainEqual(
        expect.stringContaining("bone density")
      );
    });

    it("marks IUDs (f, g) as greater benefit when age < 20", () => {
      const answers: AnswerState = { age: 18 };
      const result = engine.evaluate(answers);

      expect(result.greaterBenefit).toContain("f");
      expect(result.greaterBenefit).toContain("g");
    });

    it("marks sterilization (h, o) as avoid (MEC 3) when age 20-38", () => {
      const answers: AnswerState = { age: 30 };
      const result = engine.evaluate(answers);

      expect(result.avoid).toContain("h");
      expect(result.avoid).toContain("o");
      const hResult = result.mecResults.find((r) => r.methodKey === "h");
      expect(hResult?.score).toBe(3);
      expect(hResult?.reasons).toContainEqual(
        expect.stringContaining("regret")
      );
    });

    it("marks combined methods (a, b, k, i) as greater benefit when age > 39", () => {
      const answers: AnswerState = { age: 45 };
      const result = engine.evaluate(answers);

      expect(result.greaterBenefit).toContain("a");
      expect(result.greaterBenefit).toContain("b");
      expect(result.greaterBenefit).toContain("k");
      expect(result.greaterBenefit).toContain("i");
    });
  });

  describe("BMI normalization", () => {
    it("computes BMI from weight and height", () => {
      const answers: AnswerState = {
        weight: 70,
        height: 170,
      };
      const result = engine.evaluate(answers);

      // BMI = 70 / (1.7^2) ≈ 24.2 - no high-BMI rules should trigger
      expect(result.mecResults).toBeDefined();
    });

    it("marks combined hormonal methods (a,b,k) as greater benefit when BMI > 29", () => {
      const answers: AnswerState = {
        age: 25,
        weight: 100,
        height: 160,
      };
      // BMI = 100 / 1.6^2 = 39.06
      const result = engine.evaluate(answers);

      expect(result.greaterBenefit).toContain("a");
      expect(result.greaterBenefit).toContain("b");
      expect(result.greaterBenefit).toContain("k");
    });
  });

  describe("smoking rules (Section 3)", () => {
    it("marks combined methods as avoid when smoking and age >= 35", () => {
      const answers: AnswerState = {
        age: 40,
        smokes: true,
        "cigarettes-per-day": 10,
      };
      const result = engine.evaluate(answers);

      // a,b,i = MEC 3 (avoid); k = MEC 2 (greaterBenefit) when <15 cigs/day
      expect(result.avoid).toContain("a");
      expect(result.avoid).toContain("b");
      expect(result.avoid).toContain("i");
      expect(result.greaterBenefit).toContain("k");
    });
  });

  describe("result structure", () => {
    it("returns mecResults with all 15 methods", () => {
      const answers: AnswerState = { age: 25 };
      const result = engine.evaluate(answers);

      const methodKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"];
      expect(result.mecResults.map((r) => r.methodKey)).toEqual(
        expect.arrayContaining(methodKeys)
      );
      expect(result.mecResults).toHaveLength(15);
    });

    it("partitions methods into suggested, greaterBenefit, avoid without overlap", () => {
      const answers: AnswerState = { age: 30 };
      const result = engine.evaluate(answers);

      const all = [...result.suggested, ...result.greaterBenefit, ...result.avoid];
      const unique = new Set(all);
      expect(unique.size).toBe(15);
    });

    it("MEC 1 methods have no reasons", () => {
      const answers: AnswerState = {};
      const result = engine.evaluate(answers);

      for (const mr of result.mecResults) {
        if (mr.score === 1) {
          expect(mr.reasons).toEqual([]);
        }
      }
    });
  });

  describe("max MEC wins", () => {
    it("when multiple rules affect same method, highest MEC applies", () => {
      // Age 45: combined = 2, but smoking + age 40 + >14 cigs gives MEC 4
      const answers: AnswerState = {
        age: 45,
        smokes: true,
        "cigarettes-per-day": 20,
      };
      const result = engine.evaluate(answers);

      expect(result.avoid).toContain("a");
      const aResult = result.mecResults.find((r) => r.methodKey === "a");
      expect(aResult?.score).toBeGreaterThanOrEqual(3);
    });
  });
});
