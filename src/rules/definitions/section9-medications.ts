import type { Rule } from "../../types/rules";

const hasMedication = (
  a: Record<string, unknown>,
  med: string
): boolean => {
  const list = a["medications-list"];
  if (Array.isArray(list)) return list.includes(med);
  if (typeof list === "string") return list === med;
  return false;
};

/** Section 9: Medication History - WHO MEC rules */
export const SECTION9_MEDICATIONS_RULES: Rule[] = [
  // Ritonavir -> ALL 2 except n=3, h,j,l,m,o=1
  {
    id: "ritonavir-diaphragm",
    section: "medication-history",
    priority: 10,
    trigger: (a) => a["on-medications"] === true && hasMedication(a, "ritonavir"),
    effects: [
      {
        methodKeys: ["n"],
        mec: 3,
        reason: "Ritonavir: Diaphragm efficacy may be reduced",
      },
    ],
    description: "Ritonavir - diaphragm MEC 3",
  },
  {
    id: "ritonavir-hormonal",
    section: "medication-history",
    priority: 11,
    trigger: (a) => a["on-medications"] === true && hasMedication(a, "ritonavir"),
    effects: [
      {
        methodKeys: ["a", "b", "c", "d", "e", "f", "g", "i", "k"],
        mec: 2,
        reason: "Ritonavir: Hormonal contraceptive efficacy may be affected",
      },
    ],
    description: "Ritonavir - hormonal MEC 2",
  },
  // Carbamazepine -> a,c,i,k=3, b,e=2
  {
    id: "carbamazepine-combined",
    section: "medication-history",
    priority: 20,
    trigger: (a) => a["on-medications"] === true && hasMedication(a, "carbamazepine"),
    effects: [
      {
        methodKeys: ["a", "c", "i", "k"],
        mec: 3,
        reason: "Carbamazepine: Reduces efficacy of COC, POP, patch, ring",
      },
    ],
    description: "Carbamazepine - COC/POP/patch/ring MEC 3",
  },
  {
    id: "carbamazepine-injectable-implant",
    section: "medication-history",
    priority: 21,
    trigger: (a) => a["on-medications"] === true && hasMedication(a, "carbamazepine"),
    effects: [
      {
        methodKeys: ["b", "e"],
        mec: 2,
        reason: "Carbamazepine: May reduce efficacy of injectable and implant",
      },
    ],
    description: "Carbamazepine - injectable/implant MEC 2",
  },
  // Lamotrigine -> a,b,i,k=3, b=2 (spec says "a and b and i and k = 3, b =2" - b appears twice, likely a typo; b probably 2)
  {
    id: "lamotrigine-combined",
    section: "medication-history",
    priority: 30,
    trigger: (a) => a["on-medications"] === true && hasMedication(a, "lamotrigine"),
    effects: [
      {
        methodKeys: ["a", "i", "k"],
        mec: 3,
        reason: "Lamotrigine: COC/patch/ring reduce lamotrigine levels",
      },
      {
        methodKeys: ["b"],
        mec: 2,
        reason: "Lamotrigine: Combined injectable may affect drug levels",
      },
    ],
    description: "Lamotrigine - combined MEC 3",
  },
  // Rifampicin -> a,c,i,k=3, b,e=2
  {
    id: "rifampicin-combined",
    section: "medication-history",
    priority: 40,
    trigger: (a) => a["on-medications"] === true && hasMedication(a, "rifampicin"),
    effects: [
      {
        methodKeys: ["a", "c", "i", "k"],
        mec: 3,
        reason: "Rifampicin: Reduces efficacy of COC, POP, patch, ring",
      },
    ],
    description: "Rifampicin - COC/POP/patch/ring MEC 3",
  },
  {
    id: "rifampicin-injectable-implant",
    section: "medication-history",
    priority: 41,
    trigger: (a) => a["on-medications"] === true && hasMedication(a, "rifampicin"),
    effects: [
      {
        methodKeys: ["b", "e"],
        mec: 2,
        reason: "Rifampicin: May reduce efficacy of injectable and implant",
      },
    ],
    description: "Rifampicin - injectable/implant MEC 2",
  },
];
