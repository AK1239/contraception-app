import type { Rule } from "../../types/rules";

/** Section 6: Reproductive Tract Infections - WHO MEC rules */
export const SECTION6_RTI_RULES: Rule[] = [
  // Q1: PID current -> f,g=4
  {
    id: "pid-current",
    section: "rti",
    priority: 10,
    trigger: (a) => a["has-pid"] === true && a["pid-current"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Current PID: IUDs contraindicated until infection resolved",
      },
    ],
    description: "Current PID - IUDs MEC 4",
  },
  // Q1: PID past, no subsequent pregnancy -> f,g=2
  {
    id: "pid-past-no-pregnancy",
    section: "rti",
    priority: 11,
    trigger: (a) =>
      a["has-pid"] === true &&
      a["pid-current"] === false &&
      a["pid-subsequent-pregnancy"] === false,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "Past PID without subsequent pregnancy: IUD insertion caution",
      },
    ],
    description: "Past PID no pregnancy - IUDs MEC 2",
  },
  // Q2: STI purulent (gonorrhea/chlamydia) -> f,g=4
  {
    id: "sti-purulent",
    section: "rti",
    priority: 20,
    trigger: (a) =>
      a["has-sti"] === true && a["sti-type"] === "purulent",
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Purulent cervicitis/gonorrhea/chlamydia: IUDs contraindicated until treated",
      },
    ],
    description: "Purulent STI - IUDs MEC 4",
  },
  // Q2: STI other (trichomonas, BV) -> f,g=2
  {
    id: "sti-other",
    section: "rti",
    priority: 21,
    trigger: (a) =>
      a["has-sti"] === true && a["sti-type"] === "other",
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "Other STI (trichomonas, BV): IUD insertion caution",
      },
    ],
    description: "Other STI - IUDs MEC 2",
  },
  // Q3: HIV WHO Stage 1-2 -> f,g=2, n=3
  {
    id: "hiv-stage1-2-iud",
    section: "rti",
    priority: 30,
    trigger: (a) =>
      a["has-hiv"] === true && a["hiv-who-stage"] === "stage1-2",
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "HIV Stage 1-2: IUD insertion caution",
      },
    ],
    description: "HIV Stage 1-2 - IUDs MEC 2",
  },
  {
    id: "hiv-stage1-2-diaphragm",
    section: "rti",
    priority: 31,
    trigger: (a) =>
      a["has-hiv"] === true && a["hiv-who-stage"] === "stage1-2",
    effects: [
      {
        methodKeys: ["n"],
        mec: 3,
        reason: "HIV Stage 1-2: Diaphragm may increase candidiasis risk",
      },
    ],
    description: "HIV Stage 1-2 - diaphragm MEC 3",
  },
  // Q3: HIV WHO Stage 3-4 -> f,g,n=3
  {
    id: "hiv-stage3-4",
    section: "rti",
    priority: 32,
    trigger: (a) =>
      a["has-hiv"] === true && a["hiv-who-stage"] === "stage3-4",
    effects: [
      {
        methodKeys: ["f", "g", "n"],
        mec: 3,
        reason: "HIV Stage 3-4: IUD and diaphragm caution",
      },
    ],
    description: "HIV Stage 3-4 - IUDs and diaphragm MEC 3",
  },
  // Q4: Pelvic TB -> f,g=4
  {
    id: "pelvic-tb",
    section: "rti",
    priority: 40,
    trigger: (a) => a["pelvic-tb"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Pelvic TB: IUDs contraindicated",
      },
    ],
    description: "Pelvic TB - IUDs MEC 4",
  },
];
