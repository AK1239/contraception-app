import type { Rule } from "../../types/rules";

/** Section 7: Comorbidities - WHO MEC rules */
export const SECTION7_COMORBIDITIES_RULES: Rule[] = [
  // Q1: Gallbladder symptomatic, treated medically -> a,b,i,k=3, rest hormonal=2, f,h,j,l,m,n,o=1
  {
    id: "gallbladder-medical-combined",
    section: "comorbidities",
    priority: 10,
    trigger: (a) =>
      a["gallbladder-disease"] === true &&
      a["gallbladder-symptomatic"] === true &&
      a["gallbladder-treated"] === true &&
      a["gallbladder-treatment-type"] === "medical",
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Gallbladder disease (medically treated): Combined hormonal methods may worsen disease",
      },
    ],
    description: "Gallbladder medical - combined MEC 3",
  },
  {
    id: "gallbladder-medical-progestin",
    section: "comorbidities",
    priority: 11,
    trigger: (a) =>
      a["gallbladder-disease"] === true &&
      a["gallbladder-symptomatic"] === true &&
      a["gallbladder-treated"] === true &&
      a["gallbladder-treatment-type"] === "medical",
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 2,
        reason: "Gallbladder disease (medically treated): Progestin methods generally acceptable",
      },
    ],
    description: "Gallbladder medical - progestin MEC 2",
  },
  // Q1: Gallbladder symptomatic, NOT treated or currently present -> a,b,i,k=3
  {
    id: "gallbladder-symptomatic-untreated-combined",
    section: "comorbidities",
    priority: 12,
    trigger: (a) =>
      a["gallbladder-disease"] === true &&
      a["gallbladder-symptomatic"] === true &&
      a["gallbladder-treated"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Symptomatic gallbladder disease (untreated): Combined hormonal methods may worsen disease",
      },
    ],
    description: "Gallbladder symptomatic untreated - combined MEC 3",
  },
  {
    id: "gallbladder-symptomatic-untreated-progestin",
    section: "comorbidities",
    priority: 13,
    trigger: (a) =>
      a["gallbladder-disease"] === true &&
      a["gallbladder-symptomatic"] === true &&
      a["gallbladder-treated"] === false,
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 2,
        reason: "Symptomatic gallbladder disease (untreated): Progestin methods generally acceptable",
      },
    ],
    description: "Gallbladder symptomatic untreated - progestin MEC 2",
  },
  // Q1: Gallbladder symptomatic, treated surgically -> ALL 2 except f,h,j,l,m,n,o=1 (no MEC 3)
  {
    id: "gallbladder-surgical",
    section: "comorbidities",
    priority: 14,
    trigger: (a) =>
      a["gallbladder-disease"] === true &&
      a["gallbladder-symptomatic"] === true &&
      a["gallbladder-treated"] === true &&
      a["gallbladder-treatment-type"] === "surgical",
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 2,
        reason: "Gallbladder disease (surgically treated): Hormonal methods generally acceptable",
      },
    ],
    description: "Gallbladder surgical - hormonal MEC 2",
  },
  // Q1: Gallbladder asymptomatic -> ALL 2 except f,h,j,l,m,n,o=1
  {
    id: "gallbladder-asymptomatic",
    section: "comorbidities",
    priority: 15,
    trigger: (a) =>
      a["gallbladder-disease"] === true && a["gallbladder-symptomatic"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 2,
        reason: "Gallbladder disease (asymptomatic): Hormonal methods generally acceptable",
      },
    ],
    description: "Gallbladder asymptomatic - hormonal MEC 2",
  },
  // Q2: Cholestasis -> a,b,i,k=2
  {
    id: "cholestasis",
    section: "comorbidities",
    priority: 20,
    trigger: (a) => a["cholestasis"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Pregnancy-related cholestasis history: Combined hormonal methods caution",
      },
    ],
    description: "Cholestasis - combined MEC 2",
  },
  // Q3: Hepatitis acute -> a,b,i,k=3
  {
    id: "hepatitis-acute",
    section: "comorbidities",
    priority: 30,
    trigger: (a) =>
      a["has-hepatitis"] === true && a["hepatitis-type"] === "acute",
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Acute hepatitis: Combined hormonal methods contraindicated (liver metabolism)",
      },
    ],
    description: "Acute hepatitis - combined MEC 3",
  },
  // Q4: Cirrhosis decompensated -> a,b,i,k=4, rest=3 except f,h,j,l,m,n,o=1
  {
    id: "cirrhosis-decompensated-combined",
    section: "comorbidities",
    priority: 40,
    trigger: (a) =>
      a["has-cirrhosis"] === true && a["cirrhosis-decompensated"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Decompensated cirrhosis: Combined hormonal methods contraindicated",
      },
    ],
    description: "Cirrhosis decompensated - combined MEC 4",
  },
  {
    id: "cirrhosis-decompensated-progestin",
    section: "comorbidities",
    priority: 41,
    trigger: (a) =>
      a["has-cirrhosis"] === true && a["cirrhosis-decompensated"] === true,
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 3,
        reason: "Decompensated cirrhosis: Progestin methods caution",
      },
    ],
    description: "Cirrhosis decompensated - progestin MEC 3",
  },
  // Q5: Liver tumor - hepatocellular adenoma -> a,i,k=4, rest hormonal=3
  {
    id: "liver-tumor-adenoma-combined",
    section: "comorbidities",
    priority: 50,
    trigger: (a) =>
      a["liver-tumor"] === true &&
      a["liver-tumor-type"] === "benign" &&
      a["benign-liver-tumor-type"] === "hepatocellular-adenoma",
    effects: [
      {
        methodKeys: ["a", "i", "k"],
        mec: 4,
        reason: "Hepatocellular adenoma: Estrogen-containing methods contraindicated",
      },
    ],
    description: "Liver adenoma - combined MEC 4",
  },
  {
    id: "liver-tumor-adenoma-progestin",
    section: "comorbidities",
    priority: 51,
    trigger: (a) =>
      a["liver-tumor"] === true &&
      a["liver-tumor-type"] === "benign" &&
      a["benign-liver-tumor-type"] === "hepatocellular-adenoma",
    effects: [
      {
        methodKeys: ["b", "c", "d", "e", "g"],
        mec: 3,
        reason: "Hepatocellular adenoma: Progestin methods caution",
      },
    ],
    description: "Liver adenoma - progestin MEC 3",
  },
  // Q5: Liver tumor - FNH -> ALL 2 except f,h,j,l,m,n,o=1
  {
    id: "liver-tumor-fnh",
    section: "comorbidities",
    priority: 52,
    trigger: (a) =>
      a["liver-tumor"] === true &&
      a["liver-tumor-type"] === "benign" &&
      a["benign-liver-tumor-type"] === "focal-nodular-hyperplasia",
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 2,
        reason: "Focal nodular hyperplasia: Hormonal methods generally acceptable",
      },
    ],
    description: "Liver FNH - hormonal MEC 2",
  },
  // Q5: Liver tumor malignant -> a,b,i,k=4, c,d,e,g=3
  {
    id: "liver-tumor-malignant-combined",
    section: "comorbidities",
    priority: 53,
    trigger: (a) =>
      a["liver-tumor"] === true && a["liver-tumor-type"] === "malignant",
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Malignant liver tumor: Combined hormonal methods contraindicated",
      },
    ],
    description: "Liver malignant - combined MEC 4",
  },
  {
    id: "liver-tumor-malignant-progestin",
    section: "comorbidities",
    priority: 54,
    trigger: (a) =>
      a["liver-tumor"] === true && a["liver-tumor-type"] === "malignant",
    effects: [
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 3,
        reason: "Malignant liver tumor: Progestin methods caution",
      },
    ],
    description: "Liver malignant - progestin MEC 3",
  },
  // Q6: Iron deficiency anemia -> f=2
  {
    id: "iron-deficiency-anemia",
    section: "comorbidities",
    priority: 60,
    trigger: (a) => a["iron-deficiency-anemia"] === true,
    effects: [
      {
        methodKeys: ["f"],
        mec: 2,
        reason: "Iron deficiency anemia: Copper IUD may increase menstrual bleeding",
      },
    ],
    description: "Iron deficiency - copper IUD MEC 2",
  },
  // Q7: Sickle cell -> a,b,i,k,f=2
  {
    id: "sickle-cell",
    section: "comorbidities",
    priority: 70,
    trigger: (a) => a["sickle-cell"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k", "f"],
        mec: 2,
        reason: "Sickle cell disease: Combined hormonal methods and copper IUD caution",
      },
    ],
    description: "Sickle cell - combined and copper IUD MEC 2",
  },
];
