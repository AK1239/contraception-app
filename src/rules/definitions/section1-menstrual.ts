import type { Rule } from "../../types/rules";
import type { AnswerState } from "../../types/rules";

const getAge = (a: AnswerState): number | undefined =>
  a.computed?.age ?? (typeof a.age === "number" ? a.age : undefined);

const getNumber = (a: AnswerState, key: string): number | undefined => {
  const val = a[key];
  if (typeof val === "number" && !isNaN(val)) return val;
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

/** Section 1: Menstrual History - WHO MEC rules */
export const SECTION1_MENSTRUAL_RULES: Rule[] = [
  // Q1: Age <18 -> d = 2
  {
    id: "age-under-18-dmpa",
    section: "menstrual-history",
    priority: 10,
    trigger: (a) => {
      const age = getAge(a);
      return age !== undefined && age < 18;
    },
    effects: [
      {
        methodKeys: ["d"],
        mec: 2,
        reason: "Age <18: DMPA may affect bone density in adolescents",
      },
    ],
    description: "DMPA restriction for users under 18",
  },
  // Q1: Age <20 -> f, g = 2
  {
    id: "age-under-20-iud",
    section: "menstrual-history",
    priority: 11,
    trigger: (a) => {
      const age = getAge(a);
      return age !== undefined && age < 20;
    },
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "Age <20: IUDs have greater risk in nulliparous adolescents",
      },
    ],
    description: "IUD restriction for users under 20",
  },
  // Q1: Age 20-38 -> h, o = 3 (possible regret)
  {
    id: "age-20-38-sterilization",
    section: "menstrual-history",
    priority: 12,
    trigger: (a) => {
      const age = getAge(a);
      return age !== undefined && age >= 20 && age <= 38;
    },
    effects: [
      {
        methodKeys: ["h", "o"],
        mec: 3,
        reason: "Age 20-38: Possible regret with permanent sterilization",
      },
    ],
    description: "Sterilization caution for reproductive age",
  },
  // Q1: Age >39 -> a, b, k, i = 2
  {
    id: "age-over-39-combined",
    section: "menstrual-history",
    priority: 13,
    trigger: (a) => {
      const age = getAge(a);
      return age !== undefined && age > 39;
    },
    effects: [
      {
        methodKeys: ["a", "b", "k", "i"],
        mec: 2,
        reason: "Age >39: Combined hormonal methods have increased cardiovascular risk",
      },
    ],
    description: "Combined methods caution for age over 39",
  },
  // Q1: Age >45 -> d = 2
  {
    id: "age-over-45-dmpa",
    section: "menstrual-history",
    priority: 14,
    trigger: (a) => {
      const age = getAge(a);
      return age !== undefined && age > 45;
    },
    effects: [
      {
        methodKeys: ["d"],
        mec: 2,
        reason: "Age >45: DMPA may accelerate bone loss",
      },
    ],
    description: "DMPA caution for age over 45",
  },
  // Q4: Prolonged (>8 days) OR HMB -> ALL 2 except a, b, g, h, i, j, k, l, m, n, o = 1
  {
    id: "prolonged-or-hmb",
    section: "menstrual-history",
    priority: 20,
    trigger: (a) => {
      const bleedingDays = getNumber(a, "bleeding-days");
      const hmb = a["heavy-menstrual-bleeding"] === true;
      const prolonged = bleedingDays !== undefined && bleedingDays > 8;
      return prolonged || hmb;
    },
    effects: [
      {
        methodKeys: ["c", "d", "e", "f"],
        mec: 2,
        reason: "Prolonged bleeding or HMB: Progestin-only and IUDs may have different bleeding patterns",
      },
    ],
    description: "Prolonged/HMB: most methods MEC 2, combined/barrier/sterilization stay 1",
  },
  // Q4: Irregular periods -> ALL 2 except a, b, f, g, h, i, j, k, l, m, n, o = 1
  {
    id: "irregular-periods",
    section: "menstrual-history",
    priority: 21,
    trigger: (a) => a["irregular-periods"] === true,
    effects: [
      {
        methodKeys: ["c", "d", "e"],
        mec: 2,
        reason: "Irregular periods: Progestin-only methods may cause irregular bleeding",
      },
    ],
    description: "Irregular periods: progestin-only MEC 2",
  },
  // Q5: Unexplained vaginal bleeding -> a,b,c,i,k=2, d,e=3, f,g=4
  {
    id: "unexplained-bleeding-2",
    section: "menstrual-history",
    priority: 30,
    trigger: (a) => a["unexplained-vaginal-bleeding"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "c", "i", "k"],
        mec: 2,
        reason: "Unexplained vaginal bleeding: Combined/progestin methods may mask pathology",
      },
    ],
    description: "Unexplained bleeding - combined/progestin MEC 2",
  },
  {
    id: "unexplained-bleeding-3",
    section: "menstrual-history",
    priority: 31,
    trigger: (a) => a["unexplained-vaginal-bleeding"] === true,
    effects: [
      {
        methodKeys: ["d", "e"],
        mec: 3,
        reason: "Unexplained vaginal bleeding: DMPA/implant may mask pathology",
      },
    ],
    description: "Unexplained bleeding - DMPA/implant MEC 3",
  },
  {
    id: "unexplained-bleeding-4",
    section: "menstrual-history",
    priority: 32,
    trigger: (a) => a["unexplained-vaginal-bleeding"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Unexplained vaginal bleeding: IUDs contraindicated until cause established",
      },
    ],
    description: "Unexplained bleeding - IUDs MEC 4",
  },
  // Q6: Painful menses/endometriosis -> f = 2
  {
    id: "endometriosis-copper-iud",
    section: "menstrual-history",
    priority: 40,
    trigger: (a) => a["painful-menses-endometriosis"] === true,
    effects: [
      {
        methodKeys: ["f"],
        mec: 2,
        reason: "Endometriosis/painful menses: Copper IUD may worsen symptoms",
      },
    ],
    description: "Endometriosis - copper IUD MEC 2",
  },
  // Q7: Latex allergy -> l, m = 3
  {
    id: "latex-allergy",
    section: "menstrual-history",
    priority: 50,
    trigger: (a) => a["latex-allergy"] === true,
    effects: [
      {
        methodKeys: ["l", "m"],
        mec: 3,
        reason: "Latex allergy: Male and female condoms contain latex",
      },
    ],
    description: "Latex allergy - condoms MEC 3",
  },
];
