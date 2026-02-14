import type { Rule } from "../../types/rules";

/** Section 5: Gynecological History - WHO MEC rules */
export const SECTION5_GYN_RULES: Rule[] = [
  // Q1: GTD, hCG decreasing -> f,g=3
  {
    id: "gtd-hcg-decreasing",
    section: "gyn-history",
    priority: 10,
    trigger: (a) =>
      a["has-gtd"] === true && a["hcg-trend"] === "decreasing",
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 3,
        reason: "GTD with decreasing hCG: IUDs may cause perforation",
      },
    ],
    description: "GTD decreasing hCG - IUDs MEC 3",
  },
  // Q1: GTD, hCG elevated -> f,g=4
  {
    id: "gtd-hcg-elevated",
    section: "gyn-history",
    priority: 11,
    trigger: (a) =>
      a["has-gtd"] === true && a["hcg-trend"] === "elevated",
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "GTD with persistently elevated hCG: IUDs contraindicated",
      },
    ],
    description: "GTD elevated hCG - IUDs MEC 4",
  },
  // Q2: Pap CIN -> a,b,i,k,d,e,g=2
  {
    id: "pap-cin",
    section: "gyn-history",
    priority: 20,
    trigger: (a) =>
      a["had-pap-smear"] === true && a["pap-result"] === "cin",
    effects: [
      {
        methodKeys: ["a", "b", "i", "k", "d", "e", "g"],
        mec: 2,
        reason: "CIN: Hormonal methods may affect cervical neoplasia progression",
      },
    ],
    description: "Pap CIN - hormonal MEC 2",
  },
  // Q2: Pap cervical cancer -> a,b,d,e,i,k,n=2, c=1, f,g=4
  {
    id: "pap-cervical-cancer-combined",
    section: "gyn-history",
    priority: 21,
    trigger: (a) =>
      a["had-pap-smear"] === true && a["pap-result"] === "cancer",
    effects: [
      {
        methodKeys: ["a", "b", "d", "e", "i", "k", "n"],
        mec: 2,
        reason: "Cervical cancer: Hormonal methods caution",
      },
    ],
    description: "Cervical cancer - hormonal MEC 2",
  },
  {
    id: "pap-cervical-cancer-iud",
    section: "gyn-history",
    priority: 22,
    trigger: (a) =>
      a["had-pap-smear"] === true && a["pap-result"] === "cancer",
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Cervical cancer: IUDs contraindicated",
      },
    ],
    description: "Cervical cancer - IUDs MEC 4",
  },
  // Q3: Breast swelling, not diagnosed -> ALL 2 except f,h,j,l,m,n,o=1
  {
    id: "breast-undiagnosed",
    section: "gyn-history",
    priority: 30,
    trigger: (a) =>
      a["breast-swelling"] === true && a["breast-diagnosed"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 2,
        reason: "Undiagnosed breast swelling: Hormonal methods caution until evaluated",
      },
    ],
    description: "Breast swelling undiagnosed",
  },
  // Q3: Breast cancer, currently present -> ALL 4 except f=1
  {
    id: "breast-cancer-current-combined",
    section: "gyn-history",
    priority: 31,
    trigger: (a) =>
      a["breast-swelling"] === true &&
      a["breast-diagnosis"] === "cancer" &&
      a["breast-cancer-present"] === "current",
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "h", "i", "j", "k", "l", "m", "n", "o"],
        mec: 4,
        reason: "Current breast cancer: Hormonal and most methods contraindicated",
      },
    ],
    description: "Breast cancer current - most MEC 4",
  },
  // Q3: Breast cancer, >5 years ago -> ALL 3 except f,h,j,l,m,n,o=1
  {
    id: "breast-cancer-past",
    section: "gyn-history",
    priority: 32,
    trigger: (a) =>
      a["breast-swelling"] === true &&
      a["breast-diagnosis"] === "cancer" &&
      a["breast-cancer-present"] === "past",
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 3,
        reason: "Breast cancer >5 years ago: Hormonal methods caution",
      },
    ],
    description: "Breast cancer past - hormonal MEC 3",
  },
  // Q4: Endometrial cancer -> f,g=4
  {
    id: "endometrial-cancer",
    section: "gyn-history",
    priority: 40,
    trigger: (a) => a["endometrial-cancer"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Endometrial cancer: IUDs contraindicated",
      },
    ],
    description: "Endometrial cancer - IUDs MEC 4",
  },
  // Q5: Ovarian cancer -> f,g=3
  {
    id: "ovarian-cancer",
    section: "gyn-history",
    priority: 50,
    trigger: (a) => a["ovarian-cancer"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 3,
        reason: "Ovarian cancer: IUDs caution",
      },
    ],
    description: "Ovarian cancer - IUDs MEC 3",
  },
  // Q6: Uterine fibroids, distorts cavity -> f,g=4
  {
    id: "fibroids-distort",
    section: "gyn-history",
    priority: 60,
    trigger: (a) =>
      a["uterine-fibroids"] === true && a["fibroids-distort-uterus"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Fibroids distorting uterine cavity: IUDs contraindicated",
      },
    ],
    description: "Fibroids distort cavity - IUDs MEC 4",
  },
  // Q7: Pelvic abnormalities, distorts cavity -> f,g=4
  {
    id: "pelvic-distorts",
    section: "gyn-history",
    priority: 70,
    trigger: (a) =>
      a["pelvic-abnormalities"] === true && a["pelvic-distorts-uterus"] === true,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 4,
        reason: "Pelvic abnormalities distorting cavity: IUDs contraindicated",
      },
    ],
    description: "Pelvic distorts - IUDs MEC 4",
  },
  // Q7: Pelvic abnormalities, no distortion -> f,g=2
  {
    id: "pelvic-no-distortion",
    section: "gyn-history",
    priority: 71,
    trigger: (a) =>
      a["pelvic-abnormalities"] === true && a["pelvic-distorts-uterus"] === false,
    effects: [
      {
        methodKeys: ["f", "g"],
        mec: 2,
        reason: "Pelvic abnormalities: IUD insertion may be more difficult",
      },
    ],
    description: "Pelvic no distortion - IUDs MEC 2",
  },
];
