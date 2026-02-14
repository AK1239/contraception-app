import type { ContraceptiveMethodKey } from "../types/contraceptive";

/** Display names for all 15 WHO MEC method keys */
export const MEC_METHOD_NAMES: Record<ContraceptiveMethodKey, string> = {
  a: "Combined oral contraceptive (COC)",
  b: "Combined injectable contraceptive",
  c: "Progestin only pill (POP)",
  d: "DMPA injection",
  e: "Implant",
  f: "Copper IUD",
  g: "LNG IUD",
  h: "Female sterilization",
  i: "Combined patch",
  j: "Barrier method (general)",
  k: "Vaginal ring",
  l: "Male condom",
  m: "Female condom",
  n: "Diaphragm",
  o: "Male sterilization",
};
