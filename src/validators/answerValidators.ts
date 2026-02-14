import type { AnswerValue } from "../types/questionnaire";
import type { SectionQuestion } from "../types/sections";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate a single answer based on question configuration
 */
export function validateAnswer(
  question: SectionQuestion,
  value: AnswerValue | undefined | null
): ValidationResult {
  if (question.required && (value === undefined || value === null || value === "")) {
    return { valid: false, error: "This question is required" };
  }

  if (value === undefined || value === null) {
    return { valid: true };
  }

  switch (question.type) {
    case "numeric": {
      const num = typeof value === "number" ? value : parseFloat(String(value));
      if (isNaN(num)) {
        return { valid: false, error: "Please enter a valid number" };
      }
      const { min, max } = question.validation ?? {};
      if (min !== undefined && num < min) {
        return { valid: false, error: `Value must be at least ${min}` };
      }
      if (max !== undefined && num > max) {
        return { valid: false, error: `Value must be at most ${max}` };
      }
      return { valid: true };
    }

    case "date": {
      const date = value instanceof Date ? value : new Date(value as string);
      if (isNaN(date.getTime())) {
        return { valid: false, error: "Please select a valid date" };
      }
      const { minDate, maxDate } = question.validation ?? {};
      if (minDate && date < minDate) {
        return { valid: false, error: "Date is too early" };
      }
      if (maxDate && date > maxDate) {
        return { valid: false, error: "Date is too late" };
      }
      return { valid: true };
    }

    case "blood-pressure": {
      const bp = value as { systolic?: number; diastolic?: number };
      if (!bp || typeof bp !== "object") {
        return { valid: false, error: "Please enter both systolic and diastolic values" };
      }
      const sys = bp.systolic ?? 0;
      const dia = bp.diastolic ?? 0;
      if (sys < 60 || sys > 250) {
        return { valid: false, error: "Systolic pressure should be between 60 and 250 mmHg" };
      }
      if (dia < 40 || dia > 150) {
        return { valid: false, error: "Diastolic pressure should be between 40 and 150 mmHg" };
      }
      if (sys <= dia) {
        return { valid: false, error: "Systolic should be higher than diastolic" };
      }
      return { valid: true };
    }

    case "lipid-profile": {
      const lp = value as {
        ldl?: number;
        hdl?: number;
        cholesterol?: number;
        triglyceride?: number;
      };
      if (!lp || typeof lp !== "object") {
        return { valid: false, error: "Please enter all lipid values" };
      }
      const ranges = [
        { key: "ldl", val: lp.ldl, min: 0, max: 500, label: "LDL" },
        { key: "hdl", val: lp.hdl, min: 0, max: 150, label: "HDL" },
        { key: "cholesterol", val: lp.cholesterol, min: 0, max: 500, label: "Cholesterol" },
        { key: "triglyceride", val: lp.triglyceride, min: 0, max: 1000, label: "Triglyceride" },
      ];
      for (const { val, min, max, label } of ranges) {
        const n = Number(val);
        if (isNaN(n) || n < min || n > max) {
          return { valid: false, error: `${label} should be between ${min} and ${max} mg/dL` };
        }
      }
      return { valid: true };
    }

    case "select-one":
    case "select-multiple":
    case "yes-no":
      return { valid: true };

    default:
      return { valid: true };
  }
}

/**
 * Validate age (common validation)
 */
export function validateAge(age: number | undefined): ValidationResult {
  if (age === undefined || age === null) {
    return { valid: false, error: "Age is required" };
  }
  const n = Number(age);
  if (isNaN(n) || n < 10 || n > 70) {
    return { valid: false, error: "Age should be between 10 and 70" };
  }
  return { valid: true };
}

/**
 * Validate BMI calculation
 */
export function validateBMI(weightKg: number, heightCm: number): ValidationResult {
  if (weightKg <= 0 || heightCm <= 0) {
    return { valid: false, error: "Weight and height must be positive" };
  }
  if (weightKg < 30 || weightKg > 200) {
    return { valid: false, error: "Weight should be between 30 and 200 kg" };
  }
  if (heightCm < 100 || heightCm > 250) {
    return { valid: false, error: "Height should be between 100 and 250 cm" };
  }
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  if (bmi < 10 || bmi > 70) {
    return { valid: false, error: "Calculated BMI is outside expected range" };
  }
  return { valid: true };
}
