import type { Rule } from "../types/rules";
import { SECTION1_MENSTRUAL_RULES } from "./definitions/section1-menstrual";
import { SECTION2_PREGNANCY_RULES } from "./definitions/section2-pregnancy";
import { SECTION3_CVS_RULES } from "./definitions/section3-cvs";

/**
 * All WHO MEC rules - populated when section rules are encoded
 * Rules are evaluated in priority order; max MEC per method applies
 */
export const ALL_RULES: Rule[] = [
  ...SECTION1_MENSTRUAL_RULES,
  ...SECTION2_PREGNANCY_RULES,
  ...SECTION3_CVS_RULES,
];
