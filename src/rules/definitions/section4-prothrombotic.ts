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

/** Section 4: Prothrombotic Conditions - WHO MEC rules */
export const SECTION4_PROTHROMBOTIC_RULES: Rule[] = [
  // Q1: DVT current -> a,b,i,k=4, c,d,e,g=3, f=1
  {
    id: "dvt-current-combined",
    section: "prothrombotic",
    priority: 10,
    trigger: (a) => a["has-dvt"] === true && a["dvt-current"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Current DVT: Combined hormonal methods contraindicated (VTE risk)",
      },
    ],
    description: "Current DVT - combined MEC 4",
  },
  {
    id: "dvt-current-progestin",
    section: "prothrombotic",
    priority: 11,
    trigger: (a) => a["has-dvt"] === true && a["dvt-current"] === true,
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 3,
        reason: "Current DVT: Progestin methods caution",
      },
    ],
    description: "Current DVT - progestin MEC 3",
  },
  // Q1: DVT history (not current) -> a,b,i,k=4, c,d,e,g=2, f=1
  {
    id: "dvt-history-combined",
    section: "prothrombotic",
    priority: 12,
    trigger: (a) => a["has-dvt"] === true && a["dvt-current"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "DVT history: Combined hormonal methods contraindicated",
      },
    ],
    description: "DVT history - combined MEC 4",
  },
  {
    id: "dvt-history-progestin",
    section: "prothrombotic",
    priority: 13,
    trigger: (a) => a["has-dvt"] === true && a["dvt-current"] === false,
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 2,
        reason: "DVT history: Progestin methods generally acceptable",
      },
    ],
    description: "DVT history - progestin MEC 2",
  },
  // Q1: No DVT, family DVT -> a,b,i,k=2
  {
    id: "family-dvt",
    section: "prothrombotic",
    priority: 14,
    trigger: (a) => a["has-dvt"] === false && a["family-dvt"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Family history of DVT: Combined hormonal methods caution",
      },
    ],
    description: "Family DVT - combined MEC 2",
  },
  // Q2: Major surgery, bed rest >3 days -> a,b,i,k=4, c,d,e,g=2
  {
    id: "surgery-bed-rest-over-3d-combined",
    section: "prothrombotic",
    priority: 20,
    trigger: (a) => {
      const days = getNumber(a, "bed-rest-days");
      return a["major-surgery"] === true && days !== undefined && days > 3;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Major surgery with prolonged bed rest: Combined hormonal methods increase VTE risk",
      },
    ],
    description: "Surgery bed rest >3d - combined MEC 4",
  },
  {
    id: "surgery-bed-rest-over-3d-progestin",
    section: "prothrombotic",
    priority: 21,
    trigger: (a) => {
      const days = getNumber(a, "bed-rest-days");
      return a["major-surgery"] === true && days !== undefined && days > 3;
    },
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 2,
        reason: "Major surgery with prolonged bed rest: Progestin methods generally acceptable",
      },
    ],
    description: "Surgery bed rest >3d - progestin MEC 2",
  },
  // Q2: Major surgery, bed rest <4 days -> a,b,i,k=2
  {
    id: "surgery-bed-rest-under-4d",
    section: "prothrombotic",
    priority: 22,
    trigger: (a) => {
      const days = getNumber(a, "bed-rest-days");
      return a["major-surgery"] === true && days !== undefined && days < 4;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Major surgery with brief bed rest: Combined hormonal methods caution",
      },
    ],
    description: "Surgery bed rest <4d - combined MEC 2",
  },
  // Q3: Valvular heart disease complicated -> a,b,i,k=4, f,g=2
  {
    id: "valvular-complicated-combined",
    section: "prothrombotic",
    priority: 30,
    trigger: (a) =>
      a["valvular-heart-disease"] === true && a["valvular-complicated"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Complicated valvular heart disease: Combined hormonal methods contraindicated",
      },
    ],
    description: "Valvular complicated - combined MEC 4",
  },
  {
    id: "valvular-complicated-iud",
    section: "prothrombotic",
    priority: 31,
    trigger: (a) =>
      a["valvular-heart-disease"] === true && a["valvular-complicated"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "Complicated valvular heart disease: IUD insertion caution (endocarditis risk)",
      },
    ],
    description: "Valvular complicated - IUD MEC 2",
  },
  // Q3: Valvular heart disease not complicated -> a,b,i,k=2
  {
    id: "valvular-uncomplicated",
    section: "prothrombotic",
    priority: 32,
    trigger: (a) =>
      a["valvular-heart-disease"] === true && a["valvular-complicated"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Valvular heart disease: Combined hormonal methods caution",
      },
    ],
    description: "Valvular uncomplicated - combined MEC 2",
  },
  // Q4: SLE antiphospholipid -> a,b,k=4, c,d,e,g=3
  {
    id: "sle-antiphospholipid-combined",
    section: "prothrombotic",
    priority: 40,
    trigger: (a) => a["has-sle"] === true && a["sle-diagnosis"] === "antiphospholipid",
    effects: [
      {
        methodKeys: ["a", "b", "k"],
        mec: 4,
        reason: "SLE with antiphospholipid antibodies: Combined hormonal methods contraindicated",
      },
    ],
    description: "SLE antiphospholipid - combined MEC 4",
  },
  {
    id: "sle-antiphospholipid-progestin",
    section: "prothrombotic",
    priority: 41,
    trigger: (a) => a["has-sle"] === true && a["sle-diagnosis"] === "antiphospholipid",
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 3,
        reason: "SLE with antiphospholipid antibodies: Progestin methods caution",
      },
    ],
    description: "SLE antiphospholipid - progestin MEC 3",
  },
  // Q4: SLE clinical, severe thrombocytopenia -> d,f=3, h,j,l,m,n,o=1, rest=2
  {
    id: "sle-thrombocytopenia",
    section: "prothrombotic",
    priority: 42,
    trigger: (a) =>
      a["has-sle"] === true &&
      a["sle-diagnosis"] === "clinical" &&
      a["severe-thrombocytopenia"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "c", "e", "g", "i", "k"],
        mec: 2,
        reason: "SLE with thrombocytopenia: Hormonal methods caution",
      },
      {
        methodKeys: ["d", "f"],
        mec: 3,
        reason: "SLE with thrombocytopenia: DMPA and IUDs increase bleeding risk",
      },
    ],
    description: "SLE thrombocytopenia",
  },
  // Q4: SLE clinical, immunosuppressive -> ALL 2 except h,j,l,m,n,o=1
  {
    id: "sle-immunosuppressive",
    section: "prothrombotic",
    priority: 43,
    trigger: (a) =>
      a["has-sle"] === true &&
      a["sle-diagnosis"] === "clinical" &&
      a["severe-thrombocytopenia"] === false &&
      a["immunosuppressive"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "f", "g", "i", "k"],
        mec: 2,
        reason: "SLE on immunosuppressive: Hormonal methods caution",
      },
    ],
    description: "SLE immunosuppressive",
  },
  // Q5: Migraine with aura -> a,b,i,k=4, c,d,e,g=3
  {
    id: "migraine-aura-combined",
    section: "prothrombotic",
    priority: 50,
    trigger: (a) =>
      a["has-headaches"] === true &&
      a["migraine-like"] === true &&
      a["migraine-aura"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Migraine with aura: Combined hormonal methods contraindicated (stroke risk)",
      },
    ],
    description: "Migraine with aura - combined MEC 4",
  },
  {
    id: "migraine-aura-progestin",
    section: "prothrombotic",
    priority: 51,
    trigger: (a) =>
      a["has-headaches"] === true &&
      a["migraine-like"] === true &&
      a["migraine-aura"] === true,
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 3,
        reason: "Migraine with aura: Progestin methods caution",
      },
    ],
    description: "Migraine with aura - progestin MEC 3",
  },
  // Q5: Migraine without aura, age <35 -> a,b,i,k=3, rest hormonal=2
  {
    id: "migraine-no-aura-age-under-35-combined",
    section: "prothrombotic",
    priority: 52,
    trigger: (a) => {
      const age = getAge(a);
      return (
        a["has-headaches"] === true &&
        a["migraine-like"] === true &&
        a["migraine-aura"] === false &&
        age !== undefined &&
        age < 35
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Migraine without aura, age <35: Combined hormonal methods caution",
      },
    ],
    description: "Migraine no aura age <35 - combined MEC 3",
  },
  {
    id: "migraine-no-aura-age-under-35-progestin",
    section: "prothrombotic",
    priority: 53,
    trigger: (a) => {
      const age = getAge(a);
      return (
        a["has-headaches"] === true &&
        a["migraine-like"] === true &&
        a["migraine-aura"] === false &&
        age !== undefined &&
        age < 35
      );
    },
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 2,
        reason: "Migraine without aura, age <35: Progestin methods generally acceptable",
      },
    ],
    description: "Migraine no aura age <35 - progestin MEC 2",
  },
  // Q5: Migraine without aura, age >34 -> a,b,i=4, c,d,e,g=2, k=3
  {
    id: "migraine-no-aura-age-over-34-combined",
    section: "prothrombotic",
    priority: 54,
    trigger: (a) => {
      const age = getAge(a);
      return (
        a["has-headaches"] === true &&
        a["migraine-like"] === true &&
        a["migraine-aura"] === false &&
        age !== undefined &&
        age > 34
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "i"],
        mec: 4,
        reason: "Migraine without aura, age >34: Combined hormonal methods contraindicated",
      },
      {
        methodKeys: ["k"],
        mec: 3,
        reason: "Migraine without aura, age >34: Vaginal ring caution",
      },
    ],
    description: "Migraine no aura age >34 - combined MEC 4",
  },
  {
    id: "migraine-no-aura-age-over-34-progestin",
    section: "prothrombotic",
    priority: 55,
    trigger: (a) => {
      const age = getAge(a);
      return (
        a["has-headaches"] === true &&
        a["migraine-like"] === true &&
        a["migraine-aura"] === false &&
        age !== undefined &&
        age > 34
      );
    },
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 2,
        reason: "Migraine without aura, age >34: Progestin methods generally acceptable",
      },
    ],
    description: "Migraine no aura age >34 - progestin MEC 2",
  },
  // Q5: Headaches, not migraine-like -> a,b,i,k=2
  {
    id: "headaches-not-migraine",
    section: "prothrombotic",
    priority: 56,
    trigger: (a) =>
      a["has-headaches"] === true && a["migraine-like"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Regular headaches: Combined hormonal methods caution",
      },
    ],
    description: "Headaches not migraine - combined MEC 2",
  },
];
