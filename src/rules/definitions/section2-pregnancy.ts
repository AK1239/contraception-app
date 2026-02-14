import type { Rule } from "../../types/rules";

/** Section 2: Pregnancy History - WHO MEC rules */
export const SECTION2_PREGNANCY_RULES: Rule[] = [
  // Q1: Never pregnant -> f, g = 2
  {
    id: "never-pregnant-iud",
    section: "pregnancy-history",
    priority: 10,
    trigger: (a) => a["ever-pregnant"] === false,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "Never pregnant: IUD insertion may be more difficult in nulliparous women",
      },
    ],
    description: "IUD caution for nulliparous women",
  },
  // Q2: Birth in past 2y - Breastfeeding, <2 days -> g = 2
  {
    id: "breastfeeding-less-than-2-days",
    section: "pregnancy-history",
    priority: 20,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days < 2;
    },
    effects: [
      {
        methodKeys: ["g"],
        mec: 2,
        reason: "Breastfeeding <2 days postpartum: LNG IUD caution",
      },
    ],
    description: "Breastfeeding <2 days - LNG IUD MEC 2",
  },
  // Q2: Breastfeeding 2 days to 4 weeks -> a,b,i,k=4, c=2, d=2, e=2, f,g=3
  {
    id: "breastfeeding-2d-4w-combined",
    section: "pregnancy-history",
    priority: 21,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days >= 2 && days <= 28;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Breastfeeding 2 days-4 weeks: Combined hormonal methods reduce milk supply",
      },
    ],
    description: "Breastfeeding 2d-4w - combined MEC 4",
  },
  {
    id: "breastfeeding-2d-4w-pop",
    section: "pregnancy-history",
    priority: 22,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days >= 2 && days <= 28;
    },
    effects: [
      {
        methodKeys: ["c", "d", "e"],
        mec: 2,
        reason: "Breastfeeding 2 days-4 weeks: Progestin-only methods acceptable",
      },
    ],
    description: "Breastfeeding 2d-4w - progestin MEC 2",
  },
  {
    id: "breastfeeding-2d-4w-iud",
    section: "pregnancy-history",
    priority: 23,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days >= 2 && days <= 28;
    },
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 3,
        reason: "Breastfeeding 2 days-4 weeks: IUD insertion risk of perforation",
      },
    ],
    description: "Breastfeeding 2d-4w - IUDs MEC 3",
  },
  // Q2: Breastfeeding 4-6 weeks -> a,b,i,k=4, c=2, d=2, e=2, f,g=1, h=4
  {
    id: "breastfeeding-4w-6w-combined",
    section: "pregnancy-history",
    priority: 24,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const weeks = a.computed?.weeksSinceBirth;
      return weeks !== undefined && weeks >= 4 && weeks <= 6;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Breastfeeding 4-6 weeks: Combined hormonal methods reduce milk supply",
      },
    ],
    description: "Breastfeeding 4-6w - combined MEC 4",
  },
  {
    id: "breastfeeding-4w-6w-progestin",
    section: "pregnancy-history",
    priority: 25,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const weeks = a.computed?.weeksSinceBirth;
      return weeks !== undefined && weeks >= 4 && weeks <= 6;
    },
    effects: [
      {
        methodKeys: ["c", "d", "e"],
        mec: 2,
        reason: "Breastfeeding 4-6 weeks: Progestin-only methods acceptable",
      },
    ],
    description: "Breastfeeding 4-6w - progestin MEC 2",
  },
  {
    id: "breastfeeding-4w-6w-sterilization",
    section: "pregnancy-history",
    priority: 26,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const weeks = a.computed?.weeksSinceBirth;
      return weeks !== undefined && weeks >= 4 && weeks <= 6;
    },
    effects: [
      {
        methodKeys: ["h"],
        mec: 4,
        reason: "Breastfeeding 4-6 weeks: Female sterilization risk",
      },
    ],
    description: "Breastfeeding 4-6w - female sterilization MEC 4",
  },
  // Q2: Breastfeeding 6 weeks to 6 months -> a,b,i,k=3
  {
    id: "breastfeeding-6w-6m",
    section: "pregnancy-history",
    priority: 27,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const weeks = a.computed?.weeksSinceBirth;
      const months = a.computed?.monthsSinceBirth;
      return (
        weeks !== undefined &&
        weeks >= 6 &&
        months !== undefined &&
        months <= 6
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Breastfeeding 6 weeks-6 months: Combined hormonal methods may reduce milk supply",
      },
    ],
    description: "Breastfeeding 6w-6m - combined MEC 3",
  },
  // Q2: Breastfeeding >6 months -> a,b,i,k=2
  {
    id: "breastfeeding-over-6m",
    section: "pregnancy-history",
    priority: 28,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== true) return false;
      const months = a.computed?.monthsSinceBirth;
      return months !== undefined && months > 6;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Breastfeeding >6 months: Combined hormonal methods generally acceptable",
      },
    ],
    description: "Breastfeeding >6m - combined MEC 2",
  },
  // Q2: NOT breastfeeding, <21 days
  {
    id: "not-breastfeeding-less-21d-risk",
    section: "pregnancy-history",
    priority: 30,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== false) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days < 21 && a["postpartum-risk-factors"] === true;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Postpartum <21 days with risk factors: Combined hormonal methods increase VTE risk",
      },
    ],
    description: "Not breastfeeding <21d with risk - combined MEC 4",
  },
  {
    id: "not-breastfeeding-less-21d-no-risk",
    section: "pregnancy-history",
    priority: 31,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== false) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days < 21 && a["postpartum-risk-factors"] === false;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Postpartum <21 days: Combined hormonal methods increase VTE risk",
      },
    ],
    description: "Not breastfeeding <21d - combined MEC 3",
  },
  // Q2: NOT breastfeeding, 21-42 days
  {
    id: "not-breastfeeding-21-42d-risk",
    section: "pregnancy-history",
    priority: 32,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== false) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days >= 21 && days <= 42 && a["postpartum-risk-factors"] === true;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Postpartum 21-42 days with risk factors: Combined hormonal methods caution",
      },
    ],
    description: "Not breastfeeding 21-42d with risk - combined MEC 3",
  },
  {
    id: "not-breastfeeding-21-42d-no-risk",
    section: "pregnancy-history",
    priority: 33,
    trigger: (a) => {
      if (a["birth-past-2y"] !== true || a["breastfeeding"] !== false) return false;
      const days = a.computed?.daysSinceBirth;
      return days !== undefined && days >= 21 && days <= 42 && a["postpartum-risk-factors"] === false;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Postpartum 21-42 days: Combined hormonal methods generally acceptable",
      },
    ],
    description: "Not breastfeeding 21-42d - combined MEC 2",
  },
  // Q3: Septic abortion -> f, g = 4
  {
    id: "septic-abortion",
    section: "pregnancy-history",
    priority: 40,
    trigger: (a) => a["septic-abortion"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Septic abortion: IUD contraindicated until infection resolved",
      },
    ],
    description: "Septic abortion - IUDs MEC 4",
  },
  // Q3: Abortion 13-26 weeks (not septic) -> f, g = 2
  {
    id: "abortion-13-26-weeks",
    section: "pregnancy-history",
    priority: 41,
    trigger: (a) => {
      if (a["had-abortion"] !== true || a["septic-abortion"] === true) return false;
      const week = typeof a["abortion-week"] === "number" ? a["abortion-week"] : undefined;
      return week !== undefined && week >= 13 && week <= 26;
    },
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "Second trimester abortion: IUD insertion caution",
      },
    ],
    description: "Abortion 13-26 weeks - IUDs MEC 2",
  },
  // Q4: Ectopic pregnancy -> c = 2
  {
    id: "ectopic-pregnancy",
    section: "pregnancy-history",
    priority: 50,
    trigger: (a) => a["had-ectopic"] === true,
    effects: [
      {
        methodKeys: ["c"],
        mec: 2,
        reason: "Ectopic pregnancy history: POP may have reduced efficacy",
      },
    ],
    description: "Ectopic pregnancy - POP MEC 2",
  },
];
