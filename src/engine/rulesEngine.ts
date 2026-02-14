import type {
  ContraceptiveMethodKey,
  MECScore,
} from "../types/contraceptive";
import type {
  AnswerState,
  EvaluationResult,
  MECResult,
  Rule,
  RuleEffect,
} from "../types/rules";
import { METHODS } from "../types/rules";

/**
 * ContraSafe Rules Engine - WHO MEC-based contraceptive recommendation
 *
 * Pipeline:
 * 1. Validate inputs
 * 2. Normalize computed values (BMI, postpartum days/weeks)
 * 3. Run all rules in order
 * 4. Resolve overrides by max MEC per method (4 > 3 > 2 > 1)
 * 5. Return categorized results
 */
export class RulesEngine {
  private rules: Rule[];

  constructor(rules: Rule[] = []) {
    this.rules = [...rules].sort((a, b) => a.priority - b.priority);
  }

  /**
   * Evaluate all rules against the answer state and return categorized results
   */
  evaluate(answers: AnswerState): EvaluationResult {
    // 1. Initialize MEC scores to 1 for all methods
    const mecScores = this.createInitialScores();
    const mecReasons: Record<ContraceptiveMethodKey, string[]> = this.createInitialReasons();

    // 2. Normalize answers (compute BMI, dates, etc.)
    const normalizedAnswers = this.normalizeAnswers(answers);

    // 3. Evaluate all rules
    for (const rule of this.rules) {
      try {
        if (rule.trigger(normalizedAnswers)) {
          for (const effect of rule.effects) {
            this.applyEffect(effect, mecScores, mecReasons);
          }
        }
      } catch (error) {
        console.warn(`Rule ${rule.id} evaluation error:`, error);
      }
    }

    // 4. Categorize and return results
    return this.categorizeResults(mecScores, mecReasons);
  }

  /**
   * Add rules to the engine (e.g. when loading rule modules)
   */
  addRules(rules: Rule[]): void {
    this.rules.push(...rules);
    this.rules.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Set all rules (replaces existing)
   */
  setRules(rules: Rule[]): void {
    this.rules = [...rules].sort((a, b) => a.priority - b.priority);
  }

  private createInitialScores(): Record<ContraceptiveMethodKey, MECScore> {
    const scores = {} as Record<ContraceptiveMethodKey, MECScore>;
    for (const method of METHODS) {
      scores[method] = 1;
    }
    return scores;
  }

  private createInitialReasons(): Record<ContraceptiveMethodKey, string[]> {
    const reasons = {} as Record<ContraceptiveMethodKey, string[]>;
    for (const method of METHODS) {
      reasons[method] = [];
    }
    return reasons;
  }

  private applyEffect(
    effect: RuleEffect,
    mecScores: Record<ContraceptiveMethodKey, MECScore>,
    mecReasons: Record<ContraceptiveMethodKey, string[]>
  ): void {
    for (const methodKey of effect.methodKeys) {
      if (!METHODS.includes(methodKey)) continue;

      const currentScore = mecScores[methodKey];
      const newScore = effect.mec;

      // Apply max (worst restriction overrides)
      if (newScore > currentScore) {
        mecScores[methodKey] = newScore;
      }

      // Store reasons only for MEC 2/3/4 (not MEC 1)
      if (effect.mec >= 2 && !mecReasons[methodKey].includes(effect.reason)) {
        mecReasons[methodKey].push(effect.reason);
      }
    }
  }

  private normalizeAnswers(answers: AnswerState): AnswerState {
    const normalized: AnswerState = { ...answers };

    // Compute age
    const age = this.getNumber(answers, "age");
    if (age !== undefined) {
      normalized.computed = {
        ...normalized.computed,
        age,
      };
    }

    // Compute BMI from weight (kg) and height (cm)
    const weight = this.getNumber(answers, "weight");
    const height = this.getNumber(answers, "height");
    if (weight !== undefined && height !== undefined && height > 0) {
      const heightM = height / 100;
      const bmi = weight / (heightM * heightM);
      normalized.computed = {
        ...normalized.computed,
        bmi,
      };
    }

    // Compute irregular-periods from 6 cycle durations (variation > 7 days = irregular)
    const cycleDurations = answers["cycle-durations"];
    if (Array.isArray(cycleDurations) && cycleDurations.length >= 2) {
      const valid = cycleDurations.filter(
        (n): n is number => typeof n === "number" && n >= 21 && n <= 45 && n > 0
      );
      if (valid.length >= 2) {
        const min = Math.min(...valid);
        const max = Math.max(...valid);
        const range = max - min;
        (normalized as Record<string, unknown>)["irregular-periods"] = range > 7;
      }
    }

    // Compute days/weeks/months since birth
    const birthDate = answers["birth-date"];
    if (birthDate instanceof Date) {
      const now = new Date();
      const diffMs = now.getTime() - birthDate.getTime();
      const daysSinceBirth = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const weeksSinceBirth = Math.floor(daysSinceBirth / 7);
      const monthsSinceBirth = Math.floor(daysSinceBirth / 30);

      normalized.computed = {
        ...normalized.computed,
        daysSinceBirth,
        weeksSinceBirth,
        monthsSinceBirth,
      };
    }

    return normalized;
  }

  private getNumber(answers: AnswerState, key: string): number | undefined {
    const val = answers[key];
    if (typeof val === "number" && !isNaN(val)) return val;
    if (typeof val === "string") {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  }

  private categorizeResults(
    mecScores: Record<ContraceptiveMethodKey, MECScore>,
    mecReasons: Record<ContraceptiveMethodKey, string[]>
  ): EvaluationResult {
    const mecResults: MECResult[] = [];
    const suggested: ContraceptiveMethodKey[] = [];
    const greaterBenefit: ContraceptiveMethodKey[] = [];
    const avoid: ContraceptiveMethodKey[] = [];

    for (const methodKey of METHODS) {
      const score = mecScores[methodKey];
      const reasons = mecReasons[methodKey] || [];

      mecResults.push({
        methodKey,
        score,
        reasons: score >= 2 ? reasons : [],
      });

      if (score === 1) {
        suggested.push(methodKey);
      } else if (score === 2) {
        greaterBenefit.push(methodKey);
      } else if (score >= 3) {
        avoid.push(methodKey);
      }
    }

    return {
      mecResults,
      suggested,
      greaterBenefit,
      avoid,
    };
  }
}

/**
 * Create a rules engine instance with the given rules
 */
export function createRulesEngine(rules: Rule[]): RulesEngine {
  return new RulesEngine(rules);
}
