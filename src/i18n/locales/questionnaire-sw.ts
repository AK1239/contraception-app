/**
 * WHO MEC Questionnaire translations (Tanzanian Kiswahili)
 * Keys match section keys and question ids from src/config/sections.ts
 */
export const questionnaireSw = {
  sections: {
    "menstrual-history": "Sehemu 1: Historia ya Hedhi",
    "pregnancy-history": "Sehemu 2: Historia ya Ujauzito",
    "cvs-risk-factors": "Sehemu 3: Mambo ya Hatari ya Moyo na Mishipa",
    prothrombotic: "Sehemu 4: Hali za Prothrombotic",
    "gyn-history": "Sehemu 5: Historia ya Uzazi",
    rti: "Sehemu 6: Maambukizi ya Mfumo wa Uzazi",
    comorbidities: "Sehemu 7: Magonjwa Mengine",
    "medication-history": "Sehemu 9: Historia ya Dawa",
  },
  questions: {
    age: "Umri wako ni miaka mingapi?",
    "cycle-durations":
      "Muda wa mizunguko yako ya hedhi (siku kati ya mwanzo wa hedhi). Ingiza angalau 2, au hadi 6.",
    "bleeding-days": "Idadi ya siku za damu kwa kila mzunguko?",
    "heavy-menstrual-bleeding":
      "Je, una damu nyingi wakati wa hedhi? (Kiasi kinachosumbua maisha yako ya kimwili/kijamii/kihemko)",
    "unexplained-vaginal-bleeding": "Je, una damu isiyo na maelezo kutoka uke?",
    "painful-menses-endometriosis":
      "Je, una maumivu makali wakati wa hedhi au una historia ya endometriosis?",
    "ever-pregnant": "Je, umewahi kuwa na ujauzito?",
    "birth-past-2y": "Je, umemzaa mtoto katika miaka 2 iliyopita?",
    "birth-date": "Lilikuwa lini?",
    breastfeeding: "Je, unaonyonyesha mtoto wako sasa?",
    "postpartum-risk-factors":
      "Je, una yoyote kati ya: DVT ya zamani, kansa inayohitaji matibabu, kushindwa kwa moyo, mishipa iliyovimba, upasuaji katika wiki 4 zilizopita au hivi karibuni, kulala kitandani, au uvutaji sigara?",
    "had-abortion": "Je, umewahi kuwa na utoaji mimba?",
    "septic-abortion":
      "Je, ulikuwa na maambukizi wakati wa utoaji mimba?",
    "abortion-week": "Je, utoaji mimba ulitokea katika wiki ngapi ya ujauzito?",
    "had-ectopic": "Je, umewahi kuwa na ujauzito wa nje ya tumbo?",
    weight: "Uzani (kg)",
    height: "Urefu (cm)",
    smokes: "Je, unavuta sigara sasa?",
    "cigarettes-per-day": "Unavuta sigara ngapi kwa siku?",
    "has-hypertension":
      "Je, una historia ya shinikizo la damu au shinikizo la damu wakati wa ujauzito?",
    "has-bp-today": "Je, umepima shinikizo la damu leo?",
    "can-measure-bp": "Je, unaweza kulipima?",
    "blood-pressure": "Shinikizo lako la damu ni nini?",
    "hypertension-during-pregnancy":
      "Je, una historia ya shinikizo la damu wakati wa ujauzito?",
    "has-diabetes": "Je, umewahi kuwa na ugonjwa wa sukari?",
    "diabetes-years-ago": "Ni muda gani uliopita?",
    "diabetes-complications":
      "Je, umewahi kuwa na matatizo ya ugonjwa wa sukari (neuropathy/nephropathy/retinopathy)?",
    "vascular-disease": "Vascular disease",
    "ischemic-heart-disease": "Ischemic heart disease",
    "had-stroke": "Stroke",
    "has-dyslipidemia": "Je, umewahi kuwa na ugonjwa wa mafuta ya damu?",
    "knows-lipid-profile": "Je, unajua matokeo yako ya mafuta ya damu?",
    "lipid-profile": "Ingiza matokeo ya mafuta ya damu (mg/dL)",
    "has-dvt":
      "Je, una historia ya DVT au una sasa DVT (mguu mmoja umevimba na ngozi nyekundu)?",
    "dvt-current": "Je, ipo sasa?",
    "family-dvt": "Je, una jamaa wa karibu wa kwanza aliyewahi kuwa na DVT?",
    "major-surgery": "Je, umefanya upasuaji mkubwa katika wiki 4 zilizopita?",
    "bed-rest-days": "Ulikuwa kitandani kwa muda gani baada ya upasuaji?",
    "valvular-heart-disease":
      "Je, umewahi kuwa na ugonjwa wa valvu za moyo?",
    "valvular-complicated":
      "Je, ulikuwa na matatizo (shinikizo la damu la mapafu/atrial fibrillation/subacute bacterial endocarditis)?",
    "has-sle":
      "Je, umewahi kuwa na SLE (Systemic Lupus Erythematosus)?",
    "sle-diagnosis": "Ilitambuliwa vipi?",
    "severe-thrombocytopenia":
      "Je, una thrombocytopenia kubwa (platelet <50k)?",
    immunosuppressive: "Je, unatumia dawa za kuzuia mfumo wa kinga?",
    "has-headaches": "Je, una maumivu ya kichwa mara kwa mara?",
    "migraine-like": "Je, ni kama migraine?",
    "migraine-aura": "Je, yanaambatana na aura?",
    "has-gtd":
      "Je, umetambuliwa hivi karibuni na ugonjwa wa gestational trophoblastic (GTD)?",
    "hcg-trend": "Mwelekeo wa kiwango chako cha hCG ni upi?",
    "had-pap-smear":
      "Je, umewahi kufanya kichocho cha Pap smear/biopsy kwa uchunguzi na utambuzi wa tumor ya shingo ya utazi?",
    "pap-result": "Histology ilikuwa nini?",
    "breast-swelling": "Je, una/ulikuwa na uvimbe wa matiti?",
    "breast-diagnosed": "Je, imetambuliwa/ilitambuliwa?",
    "breast-diagnosis": "Tathmini ni/ilikuwa nini?",
    "breast-cancer-present":
      "Je, ipo sasa au ilikuwa zaidi ya miaka 5 iliyopita?",
    "endometrial-cancer": "Endometrial cancer",
    "ovarian-cancer": "Ovarian cancer",
    "uterine-fibroids":
      "Je, umewahi kuwa na fibroids za tumbo na haujatibiwa kwa upasuaji?",
    "fibroids-distort-uterus":
      "Kulingana na matokeo ya radiolojia, je fibroids zinaharibu kimo cha tumbo?",
    "pelvic-abnormalities":
      "Je, umewahi kuwa na uharibifu wa anatomiki wa pelvic?",
    "pelvic-distorts-uterus":
      "Je, kuna ushahidi wa uharibifu wa kimo cha tumbo?",
    "has-pid":
      "Je, umewahi kuwa na ugonjwa wa maambukizi (PID)?",
    "pid-current": "Je, ipo sasa?",
    "pid-subsequent-pregnancy": "Je, ilifuatiwa na ujauzito?",
    "has-sti":
      "Je, unatambuliwa sasa na maambukizi ya ngono (STI) isipokuwa HIV na hepatitis B?",
    "sti-type": "Ni aina gani ya STI?",
    "has-hiv": "Je, umewahi kuwa na HIV?",
    "hiv-who-stage": "Hatua ya kliniki ya WHO ni ipi?",
    "pelvic-tb": "Je, umewahi kuwa na TB ya pelvic?",
    "gallbladder-disease": "Je, umewahi kuwa na ugonjwa wa kibofu?",
    "gallbladder-symptomatic": "Je, una dalili?",
    "gallbladder-treated": "Je, imetibiwa/ilitibiwa?",
    "gallbladder-treatment-type": "Ilitibiwa vipi?",
    cholestasis: "Je, umewahi kuwa na cholestasis inayohusiana na ujauzito?",
    "has-hepatitis": "Je, unatambuliwa sasa na hepatitis?",
    "hepatitis-type": "Ni aina gani ya hepatitis?",
    "has-cirrhosis": "Je, unatambuliwa sasa na cirrhosis?",
    "cirrhosis-decompensated": "Je, imeshindwa kufanya kazi?",
    "liver-tumor": "Je, umewahi kuwa na tumor ya ini?",
    "liver-tumor-type": "Je, ni benign au malignant?",
    "benign-liver-tumor-type": "Ni aina gani ya tumor ya ini ya benign?",
    "iron-deficiency-anemia": "Je, una upungufu wa chuma wa damu?",
    "sickle-cell":
      "Je, umetambuliwa na ugonjwa wa sickle cell?",
    "on-medications": "Je, unatumia dawa yoyote sasa?",
    "medications-list": "Je, dawa iko katika orodha ifuatayo?",
  },
  placeholders: {
    age: "Ingiza umri",
  },
  help: {
    "cycle-durations":
      "Ingiza urefu wa kila mzunguko kutoka mwanzo wa hedhi moja hadi mwanzo wa inayofuata. Uharibifu wa mzunguko unakokotwa kiotomatiki (tofauti > siku 7).",
  },
  options: {
    "diabetes-years-ago": {
      "more-than-20": "Zaidi ya miaka 20 iliyopita",
      "less-than-20": "Chini ya miaka 20 iliyopita",
    },
    "sle-diagnosis": {
      antiphospholipid: "Kupitia antiphospholipid antibodies",
      clinical: "Kwa kliniki",
    },
    "hcg-trend": {
      decreasing: "Inapungua",
      elevated: "Inaongezeka mara kwa mara",
    },
    "pap-result": {
      cin: "CIN",
      cancer: "Kansa ya shingo ya utazi",
      normal: "Matokeo ya kawaida",
    },
    "breast-diagnosis": {
      benign: "Ugonjwa wa matiti benign",
      cancer: "Kansa ya matiti",
    },
    "breast-cancer-present": {
      current: "Ipo sasa",
      past: "Zaidi ya miaka 5 iliyopita",
    },
    "sti-type": {
      purulent: "Purulent cervicitis/gonorrhea/chlamydia ya sasa",
      other: "STI nyingine (trichomonas, bacterial vaginosis, n.k.)",
    },
    "hiv-who-stage": {
      "stage1-2": "Hatua ya WHO 1 au 2",
      "stage3-4": "Hatua ya WHO 3 au 4",
    },
    "gallbladder-treatment-type": {
      medical: "Kwa dawa",
      surgical: "Kwa upasuaji",
    },
    "hepatitis-type": {
      acute: "Acute",
      chronic: "Chronic/carrier/resolved",
    },
    "liver-tumor-type": {
      benign: "Benign",
      malignant: "Malignant",
    },
    "benign-liver-tumor-type": {
      "hepatocellular-adenoma": "Hepatocellular adenoma",
      "focal-nodular-hyperplasia": "Focal nodular hyperplasia",
    },
    "medications-list": {
      ritonavir: "Ritonavir",
      carbamazepine: "Carbamazepine",
      lamotrigine: "Lamotrigine",
      rifampicin: "Rifampicin",
      none: "Hakuna yaliyo hapa juu",
    },
  },
  questionCount: "Swali {{count}}",
  questionCountPlural: "Maswali {{count}}",
} as const;
