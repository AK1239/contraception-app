import { ContraceptiveMethod, MECCategory, ContraceptiveMethodKey } from "../types/contraceptive";

// All contraceptive methods as defined in the app requirements
export const CONTRACEPTIVE_METHODS: ContraceptiveMethod[] = [
  // Original methods (a-g) for medical eligibility assessment
  {
    key: "a",
    name: "Combined oral contraceptive (COC)",
    shortName: "Combined Pill",
    category: "hormonal",
    description: "Daily oral contraceptive containing both estrogen and progestin hormones",
  },
  {
    key: "b",
    name: "Combined injectable contraceptive",
    shortName: "Combined Injectable",
    category: "hormonal",
    description: "Monthly injection containing both estrogen and progestin hormones",
  },
  {
    key: "c",
    name: "Progestin only pill (POP)",
    shortName: "Mini Pill",
    category: "hormonal",
    description: "Daily oral contraceptive containing only progestin hormone",
  },
  {
    key: "d",
    name: "Depot Medroxyprogesterone Acetate (DMPA) injection",
    shortName: "DMPA Injection",
    category: "hormonal",
    description: "Quarterly injection of progestin hormone",
  },
  {
    key: "e",
    name: "Implant (includes Jadelle and Implanon)",
    shortName: "Contraceptive Implant",
    category: "hormonal",
    description: "Long-acting reversible contraceptive implanted under the skin",
  },
  {
    key: "f",
    name: "Copper IUD",
    shortName: "Copper IUD",
    category: "non-hormonal",
    description: "Intrauterine device with copper that prevents fertilization",
  },
  {
    key: "g",
    name: "Levonorgestrel (LNG) IUD",
    shortName: "Hormonal IUD",
    category: "hormonal",
    description: "Intrauterine device that releases progestin hormone",
  },
  // h = Female sterilization, o = Male sterilization
  {
    key: "h",
    name: "Female sterilization",
    shortName: "Female Sterilization",
    category: "permanent",
    description: "Permanent surgical contraception (tubal ligation)",
  },
  {
    key: "i",
    name: "Combined patch contraceptive",
    shortName: "Contraceptive Patch",
    category: "hormonal",
    description: "Weekly patch containing both estrogen and progestin hormones",
  },
  {
    key: "j",
    name: "Barrier method",
    shortName: "Barrier Method",
    category: "barrier",
    description: "Physical barrier methods like condoms, diaphragms, etc.",
  },
  {
    key: "k",
    name: "Contraceptive vaginal ring",
    shortName: "Vaginal Ring",
    category: "hormonal",
    description: "Monthly vaginal ring containing both estrogen and progestin hormones",
  },
  {
    key: "l",
    name: "Male condom",
    shortName: "Male Condom",
    category: "barrier",
    description: "Barrier method worn by the male during each act",
  },
  {
    key: "m",
    name: "Female condom",
    shortName: "Female Condom",
    category: "barrier",
    description: "Barrier method worn by the female during each act",
  },
  {
    key: "n",
    name: "Diaphragm",
    shortName: "Diaphragm",
    category: "barrier",
    description: "Barrier method placed in the vagina before intercourse",
  },
  {
    key: "o",
    name: "Male sterilization",
    shortName: "Male Sterilization",
    category: "permanent",
    description: "Permanent surgical contraception (vasectomy)",
  },
];

// Natural methods mentioned in the app requirements
export const NATURAL_METHODS = [
  {
    key: "lactational-amenorrhea",
    name: "Lactational Amenorrhea Method (LAM)",
    shortName: "LAM",
    category: "natural",
    description: "Natural contraception through exclusive breastfeeding",
  },
  {
    key: "calendar-method",
    name: "Calendar Method",
    shortName: "Calendar Method",
    category: "natural",
    description: "Natural family planning based on menstrual cycle tracking",
  },
];

// Extended method interface for comparison (allows string keys for individual methods)
export interface ExtendedContraceptiveMethod {
  key: string;
  name: string;
  shortName: string;
  category: "hormonal" | "non-hormonal" | "barrier" | "permanent" | "natural";
  description?: string;
}

// All methods available for comparison (includes individual methods with detail pages)
// This extends the basic methods to include individual entries like male-condom, female-condom, etc.
export const ALL_COMPARISON_METHODS: ExtendedContraceptiveMethod[] = [
  // Hormonal methods
  {
    key: "coc",
    name: "Combined Oral Contraceptives (COC)",
    shortName: "Combined Pill",
    category: "hormonal",
    description: "Daily oral contraceptive containing both estrogen and progestin hormones",
  },
  {
    key: "pop",
    name: "Progestin Only Pills (POP)",
    shortName: "Mini Pill",
    category: "hormonal",
    description: "Daily oral contraceptive containing only progestin hormone",
  },
  {
    key: "contraceptive-injection",
    name: "Depot Medroxyprogesterone Acetate (DMPA) injection",
    shortName: "DMPA Injection",
    category: "hormonal",
    description: "Quarterly injection of progestin hormone",
  },
  {
    key: "implants",
    name: "Implant (includes Jadelle and Implanon)",
    shortName: "Contraceptive Implant",
    category: "hormonal",
    description: "Long-acting reversible contraceptive implanted under the skin",
  },
  {
    key: "combination-patch",
    name: "Combined patch contraceptive",
    shortName: "Contraceptive Patch",
    category: "hormonal",
    description: "Weekly patch containing both estrogen and progestin hormones",
  },
  {
    key: "contraceptive-vaginal-ring",
    name: "Contraceptive vaginal ring",
    shortName: "Vaginal Ring",
    category: "hormonal",
    description: "Monthly vaginal ring containing both estrogen and progestin hormones",
  },
  {
    key: "lng-ius",
    name: "Levonorgestrel (LNG) IUD",
    shortName: "Hormonal IUD",
    category: "hormonal",
    description: "Intrauterine device that releases progestin hormone",
  },
  {
    key: "b",
    name: "Combined injectable contraceptive",
    shortName: "Combined Injectable",
    category: "hormonal",
    description: "Monthly injection containing both estrogen and progestin hormones",
  },
  // Non-hormonal methods
  {
    key: "copper-iucd",
    name: "Copper IUD",
    shortName: "Copper IUD",
    category: "non-hormonal",
    description: "Intrauterine device with copper that prevents fertilization",
  },
  // Barrier methods
  {
    key: "male-condom",
    name: "Male Condom",
    shortName: "Male Condom",
    category: "barrier",
    description: "A physical barrier method that prevents pregnancy and protects against STDs",
  },
  {
    key: "female-condom",
    name: "Female Condom",
    shortName: "Female Condom",
    category: "barrier",
    description: "A barrier method worn by the female during each coital act",
  },
  // Permanent methods
  {
    key: "tubal-ligation",
    name: "Tubal Ligation",
    shortName: "Tubal Ligation",
    category: "permanent",
    description: "Permanent surgical contraception method for women",
  },
  {
    key: "vasectomy",
    name: "Vasectomy",
    shortName: "Vasectomy",
    category: "permanent",
    description: "Permanent surgical contraception method for men",
  },
  // Natural methods
  {
    key: "lactational-amenorrhea",
    name: "Lactational Amenorrhea Method (LAM)",
    shortName: "LAM",
    category: "natural",
    description: "Natural contraception through exclusive breastfeeding",
  },
  {
    key: "standard-days-method",
    name: "Standard Days Method",
    shortName: "Calendar Method",
    category: "natural",
    description: "Natural family planning based on menstrual cycle tracking",
  },
];

// WHO Medical Eligibility Criteria categories
export const MEC_CATEGORIES: Record<number, MECCategory> = {
  1: {
    score: 1,
    title: "No Restriction",
    description:
      "A condition for which there is no restriction for the use of the contraceptive method",
    color: "#4CAF50", // Green
  },
  2: {
    score: 2,
    title: "Advantages Generally Outweigh Risks",
    description:
      "Advantages of using the method generally outweigh the theoretical or proven risks",
    color: "#FFC107", // Amber
  },
  3: {
    score: 3,
    title: "Risks Usually Outweigh Advantages",
    description:
      "The theoretical or proven risks usually outweigh the advantages of using the method",
    color: "#FF9800", // Orange
  },
  4: {
    score: 4,
    title: "Unacceptable Health Risk",
    description:
      "A condition that represents an unacceptable health risk if the contraceptive method is used",
    color: "#F44336", // Red
  },
};

// Helper function to get method by key
export const getMethodByKey = (key: ContraceptiveMethodKey): ContraceptiveMethod | undefined => {
  return CONTRACEPTIVE_METHODS.find((method) => method.key === key);
};

// Helper function to get methods by category
export const getMethodsByCategory = (
  category: ContraceptiveMethod["category"]
): ContraceptiveMethod[] => {
  return CONTRACEPTIVE_METHODS.filter((method) => method.category === category);
};

// Helper function to get MEC category info
export const getMECCategory = (score: number): MECCategory => {
  return MEC_CATEGORIES[score] || MEC_CATEGORIES[4]; // Default to most restrictive if invalid score
};

// Initial MEC scores (all set to 1 - no restriction)
export const INITIAL_MEC_SCORES: Record<ContraceptiveMethodKey, 1> = {
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  e: 1,
  f: 1,
  g: 1,
  h: 1,
  i: 1,
  j: 1,
  k: 1,
  l: 1,
  m: 1,
  n: 1,
  o: 1,
};

// Methods that require medical evaluation before use
export const MEDICAL_EVALUATION_REQUIRED: ContraceptiveMethodKey[] = ["f", "g", "e", "h"];

// Methods that provide STI protection (j=barrier general, l=male condom, m=female condom)
export const STI_PROTECTION_METHODS: ContraceptiveMethodKey[] = ["j", "l", "m"];

// Hormonal vs non-hormonal method classification
export const HORMONAL_METHODS: ContraceptiveMethodKey[] = ["a", "b", "c", "d", "e", "g", "i", "k"];
export const NON_HORMONAL_METHODS: ContraceptiveMethodKey[] = ["f", "j"];
export const PERMANENT_METHODS: ContraceptiveMethodKey[] = ["h", "o"];

// Method frequency classifications for personalization
export const METHOD_FREQUENCY: Record<string, ContraceptiveMethodKey[]> = {
  daily: ["a", "c"],
  "every-3-weeks": ["i", "k"],
  weekly: ["i"],
  monthly: ["k"],
  quarterly: ["d"],
  "every-3-months": ["d"],
  "every-3-years": ["e"],
  "every-8-years": ["f", "g"],
  "long-term": ["e", "f", "g"],
  permanent: ["h", "o"],
  "as-needed": ["j", "l", "m", "n"],
};
