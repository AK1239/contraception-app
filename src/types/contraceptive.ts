// WHO Medical Eligibility Criteria scoring system
export type MECScore = 1 | 2 | 3 | 4;

// Contraceptive method keys as defined in the app requirements
export type ContraceptiveMethodKey =
  | "a" // Combined oral contraceptive (COC)
  | "b" // Combined injectable contraceptive
  | "c" // Progestin only pill (POP)
  | "d" // Depot Medroxyprogesterone Acetate (DMPA) injection
  | "e" // Implant (includes Jadelle and implanon)
  | "f" // Copper IUD
  | "g" // Levonogestrel (LNG) IUD
  | "h" // Sterilization
  | "i" // Combined patch contraceptive
  | "j" // Barrier method
  | "k"; // Contraceptive vaginal ring

// Contraceptive method definition
export interface ContraceptiveMethod {
  key: ContraceptiveMethodKey;
  name: string;
  shortName: string;
  category: "hormonal" | "non-hormonal" | "barrier" | "permanent";
  description?: string;
}

// WHO MEC scores for all contraceptive methods
export type MECScores = Record<ContraceptiveMethodKey, MECScore>;

// Utility types for WHO MEC categories
export interface MECCategory {
  score: MECScore;
  title: string;
  description: string;
  color: string;
}

// Final recommendation structure
export interface ContraceptiveRecommendation {
  recommended: ContraceptiveMethod[];
  acceptable: ContraceptiveMethod[];
  avoid: ContraceptiveMethod[];
  personalized?: ContraceptiveMethod[];
}
