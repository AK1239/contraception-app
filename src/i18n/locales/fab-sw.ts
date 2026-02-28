/**
 * FAB (Fertility Awareness-Based) Eligibility translations - Kiswahili
 */
export const fabSw = {
  sections: {
    "fab-current-pregnancy": "Sehemu 1: Ujauzito wa Sasa",
    "fab-postpartum": "Sehemu 2: Hali ya Baada ya Kuzaa",
    "fab-recent-abortion": "Sehemu 3: Utoaji Mimba wa Hivi Karibuni",
    "fab-life-stage": "Sehemu 4: Hatua ya Maisha",
    "fab-menstrual-infection": "Sehemu 5: Hedhi na Maambukizi",
    "fab-drugs-medical": "Sehemu 6: Dawa na Hali za Kiafya",
    "fab-sti-risk": "Sehemu 7: Hatari ya STI/HIV",
    "fab-pregnancy-risk": "Sehemu 8: Ukali wa Hatari ya Ujauzito",
  },
  questions: {
    "fab-currently-pregnant": "Je, mteja ana mimba sasa hivi?",
    "fab-delivered-last-6-months": "Je, mteja amezaa ndani ya miezi 6 iliyopita?",
    "fab-weeks-since-delivery": "Wiki tangu kuzaa",
    "fab-currently-breastfeeding": "Je, mteja ananyonyesha sasa hivi?",
    "fab-menses-resumed": "Je, hedhi imerudi?",
    "fab-abortion-last-4-weeks": "Je, mteja amefanya utoaji mimba ndani ya wiki 4 zilizopita?",
    "fab-age": "Umri",
    "fab-years-since-menarche": "Miaka tangu hedhi ya kwanza",
    "fab-perimenopausal-symptoms": "Dalili za karibu na ufukwe? (mzunguko usio sawa, joto la mwili)",
    "fab-irregular-vaginal-bleeding": "Je, kuna uvujaji usio wa kawaida wa uke?",
    "fab-abnormal-vaginal-discharge": "Je, kuna utokaji usio wa kawaida wa uke?",
    "fab-medications-affect-cycle":
      "Je, mteja anatumia dawa zinazoathiri ovulation, homoni, mzunguko wa kawaida, au ishara za uzazi?",
    "fab-chronic-elevated-temperature":
      "Je, mteja ana ugonjwa wa muda mrefu unaosababisha joto la mwili kuongezeka?",
    "fab-acute-febrile-illness": "Je, mteja ana ugonjwa wa papo hapo wenye homa?",
    "fab-sti-hiv-risk": "Je, mteja yuko katika hatari ya STI/HIV?",
    "fab-high-risk-pregnancy":
      "Je, mteja ana hali ambapo mimba ingeweza kuwa hatari kubwa ya afya?",
  },
  placeholders: {
    "fab-weeks-since-delivery": "Ingiza wiki",
    "fab-age": "Ingiza umri",
    "fab-years-since-menarche": "Ingiza miaka",
  },
  options: {
    "fab-currently-pregnant": {
      yes: "Ndiyo",
      no: "Hapana",
      unsure: "Sijui",
    },
  },
  navigator: {
    stepOf: "Hatua {{current}} ya {{total}}",
    previous: "Iliyotangulia",
    next: "Inayofuata",
    seeResults: "Tazama Matokeo",
  },
  results: {
    mainTitle: "Matokeo ya Ustahili wa FAB",
    subtitle:
      "Njia za FAB (zinazotegemea ufahamu wa uzazi) zinajumuisha Njia ya Dalili (SYM) na Njia ya Kalenda (CAL).",
    notApplicableTitle: "Njia za FAB Hazifai",
    notApplicableMessage: "Njia za FAB hazifai wakati wa ujauzito.",
    contributingFactors: "Mambo yanayochangia:",
    action: "Hatua:",
    advisories: "Maelekezo",
    categoryDefinitions: "Ufafanuzi wa Kategoria",
    defA: "A (Kubali) – Hakuna kikwazo",
    defC: "C (Tahadhari) – Ushauri wa ziada unahitajika",
    defD: "D (Ahirisha) – Njia ya muda inapendekezwa hadi hali itatuliwe",
    goBack: "Rudi",
    startOver: "Anza Upya",
  },
  methods: {
    SYM: "Njia ya Dalili (SYM)",
    CAL: "Njia ya Kalenda (CAL)",
  },
  categories: {
    A: "Kubali (hakuna kikwazo)",
    C: "Tahadhari (ushauri wa ziada unahitajika)",
    D: "Ahirisha (njia ya muda inapendekezwa hadi hali itatuliwe)",
  },
  explanations: {
    "SYM.A":
      "Hakuna vikwazo vilivyotambuliwa kwa ufuatiliaji wa dalili. Mteja anaweza kutumia SYM na ushauri wa kawaida.",
    "SYM.C":
      "Hali moja au zaidi za tahadhari zipo (mf. baada ya kuzaa, karibu na ufukwe, dawa). Ushauri wa ziada na tathmini ya utulivu wa mzunguko unapendekezwa.",
    "SYM.D":
      "Hali zipo zinazopunguza uaminifu wa ishara za uzazi (mf. kuzaa hivi karibuni, uvujaji usio sawa, ugonjwa wa papo hapo). Pendekeza njia mbadala hadi itatuliwe.",
    "CAL.A":
      "Hakuna vikwazo vilivyotambuliwa kwa ufuatiliaji wa kalenda. Mteja anaweza kutumia CAL na ushauri wa kawaida.",
    "CAL.C":
      "Hali moja au zaidi za tahadhari zipo (mf. mizunguko isiyo sawa, karibu na ufukwe). Ushauri wa ziada unapendekezwa.",
    "CAL.D":
      "Hali zipo zinazopunguza uaminifu wa njia ya kalenda. Pendekeza njia mbadala hadi itatuliwe.",
  },
  actions: {
    C: "Ushauri wa ziada unahitajika kabla ya matumizi.",
    D: "Pendekeza njia ya muda hadi hali itatuliwe.",
  },
  conditions: {
    postpartum: "Baada ya kuzaa",
    "postpartum-l6-bf": "Baada ya kuzaa (<wiki 6, ananyonyesha)",
    "postpartum-g6-no-menses":
      "Baada ya kuzaa (≥wiki 6, ananyonyesha, hedhi haijarudi)",
    "postpartum-bf-menses": "Baada ya kuzaa (ananyonyesha, hedhi imerudi)",
    "postpartum-bf": "Baada ya kuzaa (ananyonyesha)",
    "postpartum-l4-nobf": "Baada ya kuzaa (<wiki 4, hayanyonyeshi)",
    "postpartum-g4-nobf": "Baada ya kuzaa (≥wiki 4, hayanyonyeshi)",
    "postpartum-nobf": "Baada ya kuzaa (hayanyonyeshi)",
    "recent-abortion": "Utoaji mimba hivi karibuni (<wiki 4)",
    "years-since-menarche": "≤miaka 2 tangu hedhi ya kwanza",
    perimenopausal: "Dalili za karibu na ufukwe",
    "irregular-bleeding": "Uvujaji usio wa kawaida wa uke",
    "abnormal-discharge": "Utokaji usio wa kawaida wa uke",
    "medications-cycle": "Dawa zinazoathiri mzunguko/ishara za uzazi",
    "chronic-elevated-temp": "Joto la mwili linaloongezeka muda mrefu",
    "acute-febrile": "Ugonjwa wa papo hapo wenye homa",
  },
  advisories: {
    sti: "Njia za FAB hazilindi dhidi ya STI/HIV. Pendekeza matumizi sahihi na thabiti ya kondomu.",
    "high-risk-pregnancy":
      "Njia za FAB zinaweza kutofaa kwa sababu ya viwango vya juu vya kushindwa kwa matumizi ya kawaida.",
    "medication-evaluation": "Tathmini ya ziada ya utulivu wa mzunguko inahitajika.",
  },
};
