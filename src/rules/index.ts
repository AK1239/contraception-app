import type { Rule } from "../types/rules";
import { SECTION1_MENSTRUAL_RULES } from "./definitions/section1-menstrual";
import { SECTION2_PREGNANCY_RULES } from "./definitions/section2-pregnancy";
import { SECTION3_CVS_RULES } from "./definitions/section3-cvs";
import { SECTION4_PROTHROMBOTIC_RULES } from "./definitions/section4-prothrombotic";
import { SECTION5_GYN_RULES } from "./definitions/section5-gyn";
import { SECTION6_RTI_RULES } from "./definitions/section6-rti";
import { SECTION7_COMORBIDITIES_RULES } from "./definitions/section7-comorbidities";
import { SECTION9_MEDICATIONS_RULES } from "./definitions/section9-medications";

/**
 * All WHO MEC rules - populated when section rules are encoded
 * Rules are evaluated in priority order; max MEC per method applies
 */
export const ALL_RULES: Rule[] = [
  ...SECTION1_MENSTRUAL_RULES,
  ...SECTION2_PREGNANCY_RULES,
  ...SECTION3_CVS_RULES,
  ...SECTION4_PROTHROMBOTIC_RULES,
  ...SECTION5_GYN_RULES,
  ...SECTION6_RTI_RULES,
  ...SECTION7_COMORBIDITIES_RULES,
  ...SECTION9_MEDICATIONS_RULES,
];
