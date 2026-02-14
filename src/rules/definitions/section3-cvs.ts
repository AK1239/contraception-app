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

const getBP = (a: AnswerState): { systolic: number; diastolic: number } | undefined => {
  const bp = a["blood-pressure"];
  if (
    bp &&
    typeof bp === "object" &&
    "systolic" in bp &&
    "diastolic" in bp &&
    typeof (bp as { systolic: number; diastolic: number }).systolic === "number" &&
    typeof (bp as { systolic: number; diastolic: number }).diastolic === "number"
  ) {
    return bp as { systolic: number; diastolic: number };
  }
  return undefined;
};

/** Section 3: CVS Risk Factors - WHO MEC rules */
export const SECTION3_CVS_RULES: Rule[] = [
  // Q1: BMI >29, Age <18 -> a,b,k,d = 2
  {
    id: "bmi-over-29-age-under-18",
    section: "cvs-risk-factors",
    priority: 10,
    trigger: (a) => {
      const bmi = a.computed?.bmi;
      const age = getAge(a);
      return bmi !== undefined && bmi > 29 && age !== undefined && age < 18;
    },
    effects: [
      {
        methodKeys: ["a", "b", "k", "d"],
        mec: 2,
        reason: "BMI >29 and age <18: Hormonal methods may affect weight and bone",
      },
    ],
    description: "BMI >29 + age <18",
  },
  // Q1: BMI >29, Age >17 -> a,b,k = 2
  {
    id: "bmi-over-29-age-over-17",
    section: "cvs-risk-factors",
    priority: 11,
    trigger: (a) => {
      const bmi = a.computed?.bmi;
      const age = getAge(a);
      return bmi !== undefined && bmi > 29 && age !== undefined && age > 17;
    },
    effects: [
      {
        methodKeys: ["a", "b", "k"],
        mec: 2,
        reason: "BMI >29: Combined hormonal methods may have reduced efficacy",
      },
    ],
    description: "BMI >29 + age >17",
  },
  // Q2: Smoking, Age >34, <15 cigs -> a,b,i=3, k=2
  {
    id: "smoking-age-over-34-less-15",
    section: "cvs-risk-factors",
    priority: 20,
    trigger: (a) => {
      const age = getAge(a);
      const cigs = getNumber(a, "cigarettes-per-day");
      return (
        a["smokes"] === true &&
        age !== undefined &&
        age > 34 &&
        cigs !== undefined &&
        cigs < 15
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "i"],
        mec: 3,
        reason: "Smoking >34 years: Combined hormonal methods increase cardiovascular risk",
      },
      {
        methodKeys: ["k"],
        mec: 2,
        reason: "Smoking >34 years: Vaginal ring caution",
      },
    ],
    description: "Smoking age >34, <15 cigs/day",
  },
  // Q2: Smoking, Age >34, >14 cigs -> a,b,i=4, k=3
  {
    id: "smoking-age-over-34-more-14",
    section: "cvs-risk-factors",
    priority: 21,
    trigger: (a) => {
      const age = getAge(a);
      const cigs = getNumber(a, "cigarettes-per-day");
      return (
        a["smokes"] === true &&
        age !== undefined &&
        age > 34 &&
        cigs !== undefined &&
        cigs > 14
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "i"],
        mec: 4,
        reason: "Heavy smoking >34 years: Combined hormonal methods contraindicated",
      },
      {
        methodKeys: ["k"],
        mec: 3,
        reason: "Heavy smoking >34 years: Vaginal ring not recommended",
      },
    ],
    description: "Smoking age >34, >14 cigs/day",
  },
  // Q2: Smoking, Age <35 -> a,b,i,k=2
  {
    id: "smoking-age-under-35",
    section: "cvs-risk-factors",
    priority: 22,
    trigger: (a) => {
      const age = getAge(a);
      return a["smokes"] === true && age !== undefined && age < 35;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "Smoking <35 years: Combined hormonal methods caution",
      },
    ],
    description: "Smoking age <35",
  },
  // Q3: Hypertension - cannot measure BP -> a,b,i=3, c,d,e,g=2, k=3
  {
    id: "hypertension-cannot-measure",
    section: "cvs-risk-factors",
    priority: 30,
    trigger: (a) => {
      if (a["has-hypertension"] !== true) return false;
      const hasBP = a["has-bp-today"] === true;
      const canMeasure = a["can-measure-bp"] === true;
      return hasBP === false && canMeasure === false;
    },
    effects: [
      {
        methodKeys: ["a", "b", "i"],
        mec: 3,
        reason: "Hypertension, BP unknown: Combined hormonal methods increase stroke risk",
      },
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 2,
        reason: "Hypertension, BP unknown: Progestin methods generally acceptable",
      },
      {
        methodKeys: ["k"],
        mec: 3,
        reason: "Hypertension, BP unknown: Vaginal ring caution",
      },
    ],
    description: "Hypertension - cannot measure BP",
  },
  // Q3: BP 140-159/90-99 -> a,b,k=3, d=2
  {
    id: "hypertension-stage1",
    section: "cvs-risk-factors",
    priority: 31,
    trigger: (a) => {
      if (a["has-hypertension"] !== true) return false;
      const bp = getBP(a);
      return (
        bp !== undefined &&
        bp.systolic >= 140 &&
        bp.systolic <= 159 &&
        bp.diastolic >= 90 &&
        bp.diastolic <= 99
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "k"],
        mec: 3,
        reason: "Stage 1 hypertension: Combined hormonal methods increase cardiovascular risk",
      },
      {
        methodKeys: ["d"],
        mec: 2,
        reason: "Stage 1 hypertension: DMPA may affect blood pressure",
      },
    ],
    description: "BP 140-159/90-99",
  },
  // Q3: BP >159/>99 -> a,b,k=4, c,e,g=2, d=3, f=1
  {
    id: "hypertension-stage2-combined",
    section: "cvs-risk-factors",
    priority: 32,
    trigger: (a) => {
      if (a["has-hypertension"] !== true) return false;
      const bp = getBP(a);
      return bp !== undefined && (bp.systolic > 159 || bp.diastolic > 99);
    },
    effects: [
      {
        methodKeys: ["a", "b", "k"],
        mec: 4,
        reason: "Stage 2 hypertension: Combined hormonal methods contraindicated",
      },
    ],
    description: "BP >159/99 - combined MEC 4",
  },
  {
    id: "hypertension-stage2-progestin",
    section: "cvs-risk-factors",
    priority: 33,
    trigger: (a) => {
      if (a["has-hypertension"] !== true) return false;
      const bp = getBP(a);
      return bp !== undefined && (bp.systolic > 159 || bp.diastolic > 99);
    },
    effects: [
      {
        methodKeys: ["c", "e", "g"],
        mec: 2,
        reason: "Stage 2 hypertension: Progestin methods generally acceptable",
      },
      {
        methodKeys: ["d"],
        mec: 3,
        reason: "Stage 2 hypertension: DMPA may worsen hypertension",
      },
    ],
    description: "BP >159/99 - progestin/DMPA",
  },
  // Q3: BP <140/<90 but hx hypertension during pregnancy -> a,b,i,k=2
  {
    id: "hypertension-pregnancy-history",
    section: "cvs-risk-factors",
    priority: 34,
    trigger: (a) => {
      if (a["has-hypertension"] !== true || a["hypertension-during-pregnancy"] !== true)
        return false;
      const bp = getBP(a);
      return (
        bp !== undefined &&
        bp.systolic < 140 &&
        bp.diastolic < 90
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 2,
        reason: "History of hypertension during pregnancy: Combined methods caution",
      },
    ],
    description: "Controlled BP + pregnancy hypertension history",
  },
  // Q4: Diabetes >20 years -> a,b,i,k=3, c,e,g=2, d=3
  {
    id: "diabetes-more-than-20y",
    section: "cvs-risk-factors",
    priority: 40,
    trigger: (a) =>
      a["has-diabetes"] === true && a["diabetes-years-ago"] === "more-than-20",
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 3,
        reason: "Diabetes >20 years: Combined hormonal methods increase cardiovascular risk",
      },
      {
        methodKeys: ["c", "e", "g"],
        mec: 2,
        reason: "Diabetes >20 years: Progestin methods generally acceptable",
      },
      {
        methodKeys: ["d"],
        mec: 3,
        reason: "Diabetes >20 years: DMPA may affect glucose metabolism",
      },
    ],
    description: "Diabetes >20 years",
  },
  // Q4: Diabetes <20y with complications -> a,b,d,i,k=3, c,e,g=2
  {
    id: "diabetes-complications",
    section: "cvs-risk-factors",
    priority: 41,
    trigger: (a) =>
      a["has-diabetes"] === true &&
      a["diabetes-years-ago"] === "less-than-20" &&
      a["diabetes-complications"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "d", "i", "k"],
        mec: 3,
        reason: "Diabetes with complications: Hormonal methods increase risk",
      },
      {
        methodKeys: ["c", "e", "g"],
        mec: 2,
        reason: "Diabetes with complications: Progestin-only generally acceptable",
      },
    ],
    description: "Diabetes with complications",
  },
  // Q4: Diabetes <20y no complications -> ALL 2 except f,h,j,l,m,n,o=1
  {
    id: "diabetes-less-20y-no-complications",
    section: "cvs-risk-factors",
    priority: 42,
    trigger: (a) =>
      a["has-diabetes"] === true &&
      a["diabetes-years-ago"] === "less-than-20" &&
      a["diabetes-complications"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 2,
        reason: "Diabetes <20 years: Hormonal methods generally acceptable with monitoring",
      },
    ],
    description: "Diabetes <20y no complications",
  },
  // Q5: Vascular disease -> a,b,i,k=4, c=2, d=3, e=2, g=2
  {
    id: "vascular-disease-combined",
    section: "cvs-risk-factors",
    priority: 50,
    trigger: (a) => a["vascular-disease"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Vascular disease: Combined hormonal methods contraindicated",
      },
    ],
    description: "Vascular disease - combined MEC 4",
  },
  {
    id: "vascular-disease-progestin",
    section: "cvs-risk-factors",
    priority: 51,
    trigger: (a) => a["vascular-disease"] === true,
    effects: [
      {
        methodKeys: ["c", "e", "g"],
        mec: 2,
        reason: "Vascular disease: Progestin methods generally acceptable",
      },
      {
        methodKeys: ["d"],
        mec: 3,
        reason: "Vascular disease: DMPA caution",
      },
    ],
    description: "Vascular disease - progestin",
  },
  // Q6: Ischemic heart disease -> a,b,i,k=4, c,d,e,g=3
  {
    id: "ischemic-heart-disease",
    section: "cvs-risk-factors",
    priority: 60,
    trigger: (a) => a["ischemic-heart-disease"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Ischemic heart disease: Combined hormonal methods contraindicated",
      },
      {
        methodKeys: ["c", "d", "e", "g"],
        mec: 3,
        reason: "Ischemic heart disease: Progestin methods caution",
      },
    ],
    description: "Ischemic heart disease",
  },
  // Q7: Stroke -> a,b,i,k=4, c,d,e=3, g=2
  {
    id: "stroke-combined",
    section: "cvs-risk-factors",
    priority: 70,
    trigger: (a) => a["had-stroke"] === true,
    effects: [
      {
        methodKeys: ["a", "b", "i", "k"],
        mec: 4,
        reason: "Stroke history: Combined hormonal methods contraindicated",
      },
    ],
    description: "Stroke - combined MEC 4",
  },
  {
    id: "stroke-progestin",
    section: "cvs-risk-factors",
    priority: 71,
    trigger: (a) => a["had-stroke"] === true,
    effects: [
      {
        methodKeys: ["c", "d", "e"],
        mec: 3,
        reason: "Stroke history: Progestin methods caution",
      },
      {
        methodKeys: ["g"],
        mec: 2,
        reason: "Stroke history: LNG IUD generally acceptable",
      },
    ],
    description: "Stroke - progestin",
  },
  // Q8: Dyslipidemia - knows profile, abnormal -> ALL 2 except f,h,j,l,m,n,o=1
  {
    id: "dyslipidemia-abnormal",
    section: "cvs-risk-factors",
    priority: 80,
    trigger: (a) => {
      if (a["has-dyslipidemia"] !== true || a["knows-lipid-profile"] !== true)
        return false;
      const lp = a["lipid-profile"] as
        | { ldl: number; hdl: number; cholesterol: number; triglyceride: number }
        | undefined;
      if (!lp) return false;
      return (
        lp.ldl > 200 ||
        lp.hdl < 50 ||
        lp.cholesterol > 200 ||
        lp.triglyceride > 150
      );
    },
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 2,
        reason: "Abnormal lipid profile: Hormonal methods may affect lipids",
      },
    ],
    description: "Dyslipidemia with abnormal lipids",
  },
  // Q8: Dyslipidemia - doesn't know profile -> ALL 2 except f,h,j,l,m,n,o=1
  {
    id: "dyslipidemia-unknown-profile",
    section: "cvs-risk-factors",
    priority: 81,
    trigger: (a) =>
      a["has-dyslipidemia"] === true && a["knows-lipid-profile"] === false,
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "g", "i", "k"],
        mec: 2,
        reason: "Dyslipidemia, lipid profile unknown: Hormonal methods caution",
      },
    ],
    description: "Dyslipidemia - unknown lipid profile",
  },
];
