import { questionnaireSw } from "./questionnaire-sw";
import { fabSw } from "./fab-sw";
import { ecpSw } from "./ecp-sw";
import { methodsSw } from "./methods-sw";

const sw = {
  // ─── Common ──────────────────────────────────────────────────────────────────
  common: {
    appName: "ContraSafe",
    loading: "Inapakia…",
    save: "Hifadhi",
    cancel: "Ghairi",
    back: "Rudi",
    next: "Endelea",
    done: "Imekamilika",
    yes: "Ndiyo",
    no: "Hapana",
    or: "au",
    learnMore: "Jifunze zaidi",
    startOver: "Anza Upya",
    submit: "Wasilisha",
  },

  // ─── Navigation / Drawer ─────────────────────────────────────────────────────
  nav: {
    home: "Nyumbani",
    whoMecScreen: "Skrini ya WHO MEC",
    knowYourContraceptive: "Jua Uzazi wa Mpango Wako",
    naturalMethods: "Njia za Asili",
    modernMethods: "Njia za Kisasa",
    personalizeYourContraceptive: "Badilisha Uzazi wa Mpango Wako",
    chooseYourContraceptive: "Chagua Uzazi wa Mpango",
    compareMethods: "Linganisha Njia za Uzazi",
    naturalMethodCalculators: "Vihesabu vya Njia za Asili",
    standardDayCalculator: "Kihesabu cha Njia ya Siku za Kawaida",
    calendarMethodCalculator: "Kihesabu cha Njia ya Kalenda",
    emergencyContraception: "Uzazi wa Mpango wa Dharura",
    ecDescription: "Maelezo ya Uzazi wa Mpango wa Dharura",
    ecEligibility: "Ustahili wa Uzazi wa Mpango wa Dharura",
    naturalMethodEligibility: "Ustahili wa Njia za Asili (FAB)",
    sterilizationEligibility: "Ustahili wa Kufungwa",
    femaleSterilization: "Ustahili wa Kufungwa kwa Mwanamke",
    maleSterilization: "Ustahili wa Kufungwa kwa Mwanaume",
    settings: "Mipangilio",
  },

  // ─── Home ─────────────────────────────────────────────────────────────────────
  home: {
    exploreFeatures: "Chunguza Vipengele",
    chooseTitle: "Skrini ya WHO MEC",
    chooseDescription:
      "Skrini mteja kimatibabu ili kutoa chaguzi salama za uzazi wa mpango kulingana na WHO MEC 2025.",
    chooseCta: "Chagua Uzazi wa Mpango",
    knowTitle: "Kwa Wanawake Wanaotafuta Taarifa",
    knowDescription:
      "Ukitaka kujifunza zaidi kuhusu njia mbalimbali za uzazi wa mpango, angalia sehemu za Njia za Asili au Njia za Kisasa.",
    knowCta: "Tazama Njia",
    compareTitle: "Linganisha Njia",
    compareDescription:
      "Linganisha njia kwa njia kwa kutumia Zana yetu ya Kulinganisha ili uone tofauti zao na uchague inayokufaa zaidi.",
    compareCta: "Linganisha Njia",
    personalizeTitle: "Ushauri Uliobinafsishwa",
    personalizeDescription:
      "Hujui njia inayokufaa? Tembelea sehemu ya Kubinafsisha Uzazi wa Mpango wako kwa mapendekezo yaliyoundwa mahususi kwako.",
    personalizeCta: "Binafsisha Chaguo Lako",
    naturalTitle: "Vihesabu vya Njia za Asili",
    naturalDescription:
      "Unapendelea njia zisizo za kisasa? Jaribu Kihesabu cha Njia ya Kalenda au Kihesabu cha Njia ya Siku za Kawaida kutambua siku zako za uzazi na kuepuka tendo la ndoa bila kinga wakati huo.",
    naturalCta: "Vihesabu vya Njia za Asili",
    naturalMethodEligibilityTitle: "Ustahili wa Njia za Asili (FAB)",
    naturalMethodEligibilityDescription:
      "Tathmini ustahili wa njia za Uzazi Kulingana na Ufahamu (Kalenda, Siku za Kawaida, n.k.) kwa kutumia vigezo vya kliniki vilivyopangwa.",
    naturalMethodEligibilityCta: "Ustahili wa Njia za Asili",
    ecDescriptionTitle: "Maelezo ya Uzazi wa Mpango wa Dharura",
    ecDescriptionDescription:
      "Jifunze kuhusu njia za uzazi wa mpango wa dharura: levonorgestrel, ulipristal, COC Yuzpe, na IUD ya shaba. Ufanisi, faida, hasara, na jinsi ya kutumia.",
    ecDescriptionCta: "Tazama Maelezo ya EC",
    ecEligibilityTitle: "Ustahili wa Uzazi wa Mpango wa Dharura",
    ecEligibilityDescription:
      "Chuja ECP zisizo salama kulingana na WHO MEC 2025. Kiolesura kinachotumia checkboxes kwa LNG, UPA na COC Yuzpe na maonyo ya kliniki.",
    ecEligibilityCta: "Tathmini Ustahili wa EC",
    emergencyContraceptionTitle: "Uzazi wa Mpango wa Dharura",
    emergencyContraceptionDescription:
      "Jifunze kuhusu njia za uzazi wa mpango wa dharura zinazotumika baada ya ngono isiyo na kinga. Levonorgestrel, ulipristal, COC Yuzpe, na IUD ya shaba.",
    emergencyContraceptionCta: "Tazama Uzazi wa Mpango wa Dharura",
    sterilizationTitle: "Ustahili wa Kufungwa",
    sterilizationDescription:
      "Angalia ustahili wa uzazi wa mpango wa kudumu. Tathmini kufungwa kwa upasuaji kwa mwanamke au vasectomy kwa mwanaume kwa kutumia Vigezo vya WHO.",
    sterilizationCta: "Ustahili wa Kufungwa",
    settingsTitle: "Mipangilio",
    settingsDescription:
      "Badilisha kati ya uzoefu wa Mtoa Huduma za Afya na Umma.",
    settingsCta: "Mipangilio",
    footer: "@med.tutor.tz",
  },

  // ─── Welcome Card ─────────────────────────────────────────────────────────────
  welcome: {
    greeting: "Karibu ContraSafe",
    subtitle:
      "Mwongozo wa uzazi wa mpango unaotegemea ushahidi, ukitumia Vigezo vya Ustahili wa Kimatibabu vya WHO.",
  },

  // ─── Settings ────────────────────────────────────────────────────────────────
  settings: {
    title: "Mipangilio",
    appExperience: "Uzoefu wa Programu",
    appExperienceDescription:
      "Chagua jukumu lako ili kubinafsisha vipengele vinavyoonyeshwa.",
    healthcareProvider: "Mtoa Huduma za Afya",
  
    generalPublic: "Umma",
  
    language: "Lugha",
    languageDescription: "Chagua lugha unayoipendelea kwa programu.",
    languageEnglish: "English",
    languageSwahili: "Kiswahili",
  },

  // ─── Onboarding ──────────────────────────────────────────────────────────────
  onboarding: {
    skip: "Ruka",
    getStarted: "Anza",
    tapToGetStarted: "Gusa kuanza",
    next: "Endelea",
    slide1Title: "Karibu\nContraSafe",
    slide1Subtitle: "Mwongozo Wako wa Uzazi wa Mpango Salama",
    slide1Body:
      "Ukiwa mtoa huduma za afya au mwanamke anayetafuta njia za uzazi wa mpango zinazoweza kutegemewa, ContraSafe inarahisisha uzazi wa mpango kwa suluhisho salama ya kidijitali.",
    slide2Title: "Mwongozo Unaotegemea\nUshahidi",
    slide2Subtitle: "Inayoendeshwa na Vigezo vya WHO",
    slide2Body:
      "Imejengwa juu ya Vigezo vya Ustahili wa Kimatibabu vya WHO kwa Matumizi ya Uzazi wa Mpango (2015), ikitoa mapendekezo salama yanayotegemea ushahidi unaoweza kutegemewa.",
    slide3Title: "Mwongozo\nUliobinafsishwa",
    slide3Subtitle: "Ulioundwa Kwa Profaili Yako ya Afya",
    slide3Body:
      "Pata orodha ya chaguzi salama kulingana na historia yako ya matibabu, pamoja na mwongozo wa wataalamu kuhusu njia za kisasa na za asili—yote katika sehemu moja.",
    slide4Title: "Mpango wa Familia\n wa Asili",
    slide4Subtitle: "Kihesabu cha Njia ya Kalenda",
    slide4Body:
      "Udhibiti uzazi wako kwa kihesabu chetu cha Njia ya Kalenda kwa wale wanaopendelea mbinu ya asili.",
    roleSelectionTitle: "Binafsisha Uzoefu Wako",
    roleSelectionSubtitle: "Tafadhali chagua jukumu lako",
    roleHealthcareTitle: "Mtoa Huduma za Afya",
    roleHealthcareHint: "Ufikiaji kamili wa vipengele vyote",
    rolePublicTitle: "Umma",
    rolePublicHint: "Uzoefu rahisi, zana za ustahili zimefichwa",
    rolePublicHintShort: "Uzoefu rahisi uliobinafsishwa",
    roleSelectionWhoAreYou: "Wewe ni nani?",
    roleSelectionSubtitleAlt: "Chagua jukumu lako ili tubinafsishe uzoefu wako.",
    roleHealthcareDescription:
      "Fikia zana zote za kliniki ikiwemo tathmini za ustahili na vipengele vya kina.",
    rolePublicDescription:
      "Fikia taarifa muhimu za uzazi wa mpango na mwongozo ulioundwa kwa matumizi ya kila siku.",
    continueButton: "Endelea",
  },

  // ─── Compare Methods ─────────────────────────────────────────────────────────
  compare: {
    title: "Linganisha Njia za Uzazi wa Mpango",
    subtitle:
      "Chagua njia mbili na uchague unachotaka kulinganisha. Tazama tofauti kwa upande mmoja ili kukusaidia kufanya uamuzi wenye msingi.",
    firstMethod: "Njia ya Kwanza",
    secondMethod: "Njia ya Pili",
    whatToCompare: "Unataka kulinganisha nini?",
    compareButton: "Linganisha",
    previous: "Iliyotangulia",
    next: "Inayofuata",
    done: "Imekamilika",
    backToSelection: "Rudi kwa Chaguo",
    fieldDescription: "Maelezo",
    fieldEfficacy: "Ufanisi",
    efficacyTypicalUse: "Matumizi ya Kawaida",
    efficacyPerfectUse: "Matumizi Bora",
    fieldAdvantages: "Faida",
    fieldDisadvantages: "Hasara",
    fieldHowToUse: "Jinsi ya Kutumia",
    fieldTimeToWork: "Muda wa Kufanya Kazi",
    fieldSideNotes: "Maelezo ya Ziada",
    fieldCommonErrors: "Makosa ya Kawaida",
    searchPlaceholder: "Tafuta njia za uzazi wa mpango...",
    selectMethod: "Chagua njia...",
    noMethodsFound: "Hakuna njia zilizopatikana zinazolingana na utafutaji wako",
    noMethodsAvailable: "Hakuna njia zinazopatikana",
    progressOf: "Kulinganisha {{current}} ya {{total}}",
  },

  // ─── Know Contraceptive ──────────────────────────────────────────────────────
  knowContraceptive: {
    searchPlaceholder: "Tafuta njia za uzazi wa mpango...",
    noResults: 'Hakuna njia zilizopatikana zinazolingana na "{{query}}"',
    noResultsHintAll: 'Jaribu "tubal ligation", "kondomu", "levonorgestrel", "kalenda", au "IUD"',
    naturalMethodsTitle: "Njia za Asili",
    naturalMethodsDescription:
      "Chunguza njia za uzazi wa mpango za asili ikiwemo Uvumilivu wa Kunyonyesha, Njia ya Kalenda, na Njia ya Siku za Kawaida. Njia hizi zinafanya kazi na mzunguko wako wa uzazi wa asili.",
    naturalMethodsCta: "Tazama Njia za Asili",
    modernMethodsTitle: "Njia za Kisasa",
    modernMethodsDescription:
      "Gundua chaguzi za kisasa za uzazi wa mpango ikiwemo njia za muda na za kudumu. Hizi ni pamoja na chaguzi za homoni na zisizo za homoni zenye ufanisi na muda tofauti.",
    modernMethodsCta: "Tazama Njia za Kisasa",
    emergencyMethodsTitle: "Uzazi wa Mpango wa Dharura",
    emergencyMethodsDescription:
      "Njia zinazotumika baada ya ngono isiyo na kinga au kushindwa kwa uzazi wa mpango. Zinajumuisha levonorgestrel, ulipristal, COC Yuzpe, na IUD ya shaba. Zinafanikiwa zaidi zinapotumika haraka iwezekanavyo.",
    emergencyMethodsCta: "Tazama Njia za Dharura",
    searchNatural: "Tafuta njia za asili...",
    searchModern: "Tafuta njia za kisasa...",
    searchEmergency: "Tafuta uzazi wa mpango wa dharura...",
    noMethodsFound: "Hakuna njia zilizopatikana",
    noMethodsHint: 'Jaribu kutafuta "kunyonyesha", "kalenda", au "siku za kawaida"',
    knowMore: "Jifunze Zaidi",
    noMethodsHintModern: 'Jaribu kutafuta "muda", "kudumu", "kondomu", "vidonge", au "IUD"',
    noMethodsHintEmergency: 'Jaribu kutafuta "levonorgestrel", "ulipristal", "yuzpe", au "IUD ya shaba"',
    lamTitle: "Uvumilivu wa Kunyonyesha",
    lamDescription:
      "Njia ya asili ya uzazi wa mpango kwa wanawake wanaonyonyesha. Inapotumika vizuri, kunyonyesha peke yake kunaweza kutoa ulinzi wa asilimia 98 dhidi ya ujauzito kwa miezi 6 ya kwanza baada ya kuzaa.",
    calendarTitle: "Njia ya Kalenda",
    calendarDescription:
      "Njia ya uzazi wa mpango wa asili inayotambua siku 12 za uzazi katika mzunguko wa mwanamke. Inafaa zaidi kwa wanawake wenye mizunguko ya siku 26-32.",
    sdmTitle: "Njia ya Siku za Kawaida",
    sdmDescription:
      "Njia inayotegemea ufahamu wa uzazi kwa wanawake wenye mizunguko ya kawaida ya siku 26–32. Siku 8–19 zinachukuliwa kuwa za uzazi na zinahitaji kuepuka tendo la ndoa bila kinga. Inafaa zaidi inapochanganywa na viashiria vya ziada vya uzazi.",
    methodsData: {
      categories: {
        temporary: {
          title: "Njia za Muda",
          description:
            "Njia za uzazi wa mpango zinazoweza kusitishwa unapotaka kupata mimba. Zinajumuisha chaguzi za homoni na zisizo za homoni zenye ufanisi na muda tofauti.",
        },
        permanent: {
          title: "Njia za Kudumu",
          description:
            "Suluhu za muda mrefu za uzazi wa mpango zinazotoa ulinzi wa kudumu dhidi ya mimba. Njia hizi kwa kawaida haziwezi kubadilishwa na zinakufaa wale ambao wamekamilisha mpango wao wa familia.",
        },
        barrier: {
          title: "Njia za Kizuizi",
          description:
            "Vizuizi vya kimwili vinavyozuia mbegu kufikia yai. Zinajumuisha kondomu, diafragma, na kofia za kizazi. Njia hizi pia zinatoa ulinzi dhidi ya maambukizi ya ngono.",
        },
        hormonal: {
          title: "Njia za Homoni",
          description:
            "Njia za uzazi wa mpango zinazotumia homoni kuzuia mimba. Zinajumuisha vidonge vya uzazi wa mpango, bandeji, pete, na sindano. Zinafanikiwa sana zinapotumika kwa usahihi.",
        },
        iud: {
          title: "Njia za Kifaa cha Ndani ya Uterasi",
          description:
            "Vifaa vya ndani ya uterasi vinavyowekwa ndani ya uterasi. Zinajumuisha IUD za homoni na za shaba. Chaguzi za muda mrefu, zenye ufanisi mkubwa, na zinazoweza kubadilishwa.",
        },
      },
      specificMethods: {
        "male-condom": {
          title: "Kondomu ya Kiume",
          description:
            "Kifuniko chembamba kinachowekwa juu ya mboo. Inatoa ulinzi wa kizuizi cha kimwili dhidi ya mimba na magonjwa ya ngono.",
          breadcrumbModern: "Njia za Muda > Njia za Kizuizi",
          breadcrumbTemporary: "Njia za Kizuizi",
        },
        "female-condom": {
          title: "Kondomu ya Kike",
          description:
            "Njia ya kizuizi inayovaliwa na mwanamke. Inatoa ulinzi dhidi ya mimba na inaweza kuingizwa masaa kabla ya ngono.",
          breadcrumbModern: "Njia za Muda > Njia za Kizuizi",
          breadcrumbTemporary: "Njia za Kizuizi",
        },
        coc: {
          title: "Vidonge vya Mchanganyiko (COC)",
          description:
            "Vidonge vyenye homoni za estrogen na progestin. Inatoa ulinzi bora na hedhi za kawaida.",
          breadcrumbModern: "Njia za Muda > Njia za Homoni",
          breadcrumbTemporary: "Njia za Homoni",
        },
        pop: {
          title: "Vidonge vya Progestin Pekee (POP)",
          description:
            "Vidonge vyenye homoni ya progestin pekee. Ulinzi bora bila athari za estrogen nyingi.",
          breadcrumbModern: "Njia za Muda > Njia za Homoni",
          breadcrumbTemporary: "Njia za Homoni",
        },
        injection: {
          title: "Sindano za Uzazi wa Mpango",
          description:
            "Sindano za DMPA zinazotoa ulinzi wa miezi 3. Zinaweza kutumika wakati wa kunyonyesha.",
          breadcrumbModern: "Njia za Muda > Njia za Homoni",
          breadcrumbTemporary: "Njia za Homoni",
        },
        implants: {
          title: "Vipandikizo",
          description:
            "Fimbo laini inayowekwa chini ya ngozi. Inatoa ulinzi kamili kwa miaka 3-5.",
          breadcrumbModern: "Njia za Muda > Njia za Homoni",
          breadcrumbTemporary: "Njia za Homoni",
        },
        patch: {
          title: "Bandeji ya Mchanganyiko ya Uzazi wa Mpango",
          description:
            "Bandeji ya ngozi inayotoa estrogen na progestin. Inafanya kazi kwa muda mrefu kuliko vidonge.",
          breadcrumbModern: "Njia za Muda > Njia za Homoni",
          breadcrumbTemporary: "Njia za Homoni",
        },
        ring: {
          title: "Pete ya Uzazi wa Mpango ya Uke",
          description:
            "Pete laini inayoingizwa ukeni kila mwezi. Inatoa homoni zinazoendelea.",
          breadcrumbModern: "Njia za Muda > Njia za Homoni",
          breadcrumbTemporary: "Njia za Homoni",
        },
        "copper-iucd": {
          title: "IUD ya Shaba",
          description:
            "Kifaa cha umbo la T chenye shaba kinachowekwa uterasi. Inatoa ulinzi kamili kwa miaka 5-12.",
          breadcrumbModern: "Njia za Muda > Njia za IUD",
          breadcrumbTemporary: "Njia za IUD",
        },
        "lng-ius": {
          title: "LNG-IUS",
          description:
            "IUD ya homoni inayotoa levonorgestrel. Inatoa ulinzi kamili kwa miaka 3-5.",
          breadcrumbModern: "Njia za Muda > Njia za IUD",
          breadcrumbTemporary: "Njia za IUD",
        },
        "tubal-ligation": {
          title: "Kufunga Mijiko ya Fallopian",
          description:
            "Utaratibu wa upasuaji ambapo mijiko ya fallopian inafungwa. Inatoa uzazi wa mpango wa kudumu kwa wanawake.",
          breadcrumbModern: "Njia za Kudumu",
          breadcrumbTemporary: "Njia za Kudumu",
        },
        vasectomy: {
          title: "Vasektomi",
          description:
            "Kutupwa kwa kiume kwa kudumu ambapo mishipa ya mbegu inakatwa au kufungwa. Inatoa ufanisi kamili.",
          breadcrumbModern: "Njia za Kudumu",
          breadcrumbTemporary: "Njia za Kudumu",
        },
      },
      searchTemporary: "Tafuta njia za muda...",
      noResultsTemporary: 'Jaribu kutafuta "kizuizi", "homoni", "IUD", "kondomu", au "vidonge"',
    },
  },

  // ─── Natural Calculators ──────────────────────────────────────────────────────
  naturalCalculators: {
    infoCardTitle: "Kuhusu Njia Hizi",
    infoCardSdm:
      "Njia ya Siku za Kawaida (SDM): Kwa mizunguko ya kawaida ya siku 26–32; inatumia siku za uzazi zilizowekwa na ni yenye ufanisi zaidi inapotumika kwa usahihi.",
    infoCardCalendar:
      "Njia ya Kalenda (Rhythm): Kwa mizunguko ya siku 21–35; inahitaji miezi 6 ya kufuatilia na haiaminiki sana lakini imebinafsishwa zaidi.",
    infoCardDisclaimer:
      "Njia zote mbili huzuia mimba kwa kuepuka siku za uzazi na hazilindi dhidi ya maambukizi ya ngono (STI).",
    getStarted: "Anza",
    fabTitle: "Ustahili wa Njia za Asili (FAB)",
    fabDescription:
      "Tathmini ustahili wa njia za ufahamu wa uzazi zinazotegemea Dalili (SYM) na Kalenda (CAL). Pata mapendekezo ya Kubali, Tahadhari, au Ahirisha pamoja na maelezo ya STI/HIV na ujauzito wenye hatari kubwa.",
    fabCta: "Angalia Ustahili wa FAB",
    standardDayTitle: "Kihesabu cha Njia ya Siku za Kawaida",
    standardDayDescription:
      "Hesabu siku zako za uzazi kwa kutumia Njia ya Siku za Kawaida. Njia hii inafaa wanawake wenye mizunguko ya kawaida ya siku 26-32. Inatambua siku 8-19 kuwa za uzazi.",
    standardDayCta: "Tumia Kihesabu cha Siku za Kawaida",
    calendarTitle: "Kihesabu cha Njia ya Kalenda",
    calendarDescription:
      "Fuatilia mizunguko yako ya hedhi kutambua kipindi chako cha uzazi. Ingiza urefu wa mizunguko yako ili kuhesabu vipindi vya uzazi vilivyobinafsishwa kulingana na muundo wako wa mzunguko.",
    calendarCta: "Tumia Kihesabu cha Njia ya Kalenda",
  },

  // ─── Sterilization Eligibility ─────────────────────────────────────────────────
  sterilization: {
    femaleTitle: "Ustahili wa Kufungwa kwa Mwanamke",
    femaleDescription:
      "Amua ustahili wa kufungwa kwa upasuaji kwa mwanamke kwa kutumia mantiki ya kliniki iliyopangwa. Inatathmini hali katika makundi mengi ikiwemo moyo na mishipa, homoni, uzazi, na zaidi ili kutoa mapendekezo ya Kubali, Tahadhari, Ahirisha, au Rujumwa kwa Mtaalamu.",
    femaleCta: "Tathmini Ustahili wa Mwanamke",
    maleTitle: "Ustahili wa Kufungwa kwa Mwanaume",
    maleDescription:
      "Amua ustahili wa kufungwa kwa upasuaji kwa mwanaume (vasectomy) kwa kutumia Vigezo vya Ustahili wa Kimatibabu vya WHO. Inatathmini hali ikiwemo hali ya HIV, magonjwa ya homoni, maambukizi ya viungo vya uzazi, na uharibifu wa muundo wa mende ili kutoa mapendekezo ya Kubali, Tahadhari, Ahirisha, au Mazingira Maalum.",
    maleCta: "Tathmini Ustahili wa Mwanaume",
    navigator: {
      sectionOf: "Sehemu {{current}} ya {{total}}",
      previous: "Iliyotangulia",
      next: "Inayofuata",
      seeResults: "Tazama Matokeo",
    },
    female: {
      resultTitle: "Matokeo ya Ustahili wa Kufungwa kwa Mwanamke",
      clinicalAction: "Hatua ya Kliniki",
      conditionsIdentified: "Hali Zilizotambuliwa",
      detailedExplanation: "Maelezo ya Kina",
      importantAdvisory: "Onyo Muhimu",
      counsellingWarning:
        "⚠️ Uthibitishaji wa ushauri haujakamilika. Tafadhali hakikisha mahitaji yote ya ushauri yametimizwa kabla ya kuendelea.",
      goBack: "Rudi",
      startOver: "Anza Upya",
    },
    male: {
      resultTitle: "Matokeo ya Ustahili wa Kufungwa kwa Mwanaume (Vasektomi)",
      clinicalRecommendation: "Mapendekezo ya Kliniki",
      conditionsIdentified: "Hali Zilizotambuliwa",
      detailedExplanation: "Maelezo ya Kina",
      goBack: "Rudi",
      startOver: "Anza Upya",
    },
  },

  // ─── Personalize ──────────────────────────────────────────────────────────────
  personalize: {
    title: "Binafsisha Chaguo Lako",
    questionsCount: "Swali {{count}}",
    questionsCountPlural: "Maswali {{count}}",
    loadingQuestions: "Inapakia maswali ya ubinafsishaji...",
    preparingQuestions: "Inatayarisha maswali...",
    generatingResults: "Inatengeneza mapendekezo yako yaliyobinafsishwa...",
    stepOf: "Hatua {{current}} ya {{total}}",
    previous: "Iliyotangulia",
    next: "Inayofuata",
    getResults: "Pata Matokeo",
  },

  // ─── MEC / Choose Contraceptive ───────────────────────────────────────────────
  mec: {
    howToUse: "Jinsi ya kutumia kipengele hiki",
    howToUseBody:
      "Chukua historia kamili kutoka kwa mteja wako ukiongozwa na maswali yatakayonyeshwa.",
    labTests: "Majaribio ya maabara yanayoweza kuhitajika kujibu baadhi ya maswali",
    labTestsBody: "RBG • UPT • FBC • Profaili ya mafuta • Pelvic USS",
    onceAnswered: "Mara tu maswali yote yamejibiwa",
    onceAnsweredBody:
      "Orodha ya njia za uzazi wa mpango itaonyeshwa pamoja na kiwango chao cha usalama (daraja la MEC) kulingana na hali za mteja wako.",
    interpretation: "Tafsiri",
    mec1: "MEC 1 = salama",
    mec2: "MEC 2 = faida zinazidi hatari",
    mec3: "MEC 3 = hatari zinazidi faida",
    mec4: "MEC 4 = si salama",
    stepOf: "Hatua {{current}} ya {{total}}",
    previous: "Iliyotangulia",
    next: "Inayofuata",
    seeResults: "Tazama Matokeo",
    getStarted: "Anza",
    results: {
      suggestedTitle: "Njia za uzazi wa mpango zinazopendekezwa salama (MEC 1)",
      suggestedDescription: "Njia hizi hazina vikwazo kulingana na majibu yako.",
      suggestedEmpty: "Hakuna njia katika kategoria hii kulingana na majibu yako.",
      greaterBenefitTitle: "Faida kubwa kuliko hatari (MEC 2)",
      greaterBenefitDescription: "Faida kwa ujumla zinazidi hatari. Fikiria na mhudumu wako wa afya.",
      greaterBenefitEmpty: "Hakuna njia katika kategoria hii.",
      avoidTitle: "Epuka njia hizi za uzazi wa mpango (MEC 3/4)",
      avoidDescription: "Hatari kwa kawaida zinazidi faida au zinawakilisha hatari isiyokubalika ya afya.",
      avoidEmpty: "Hakuna njia za kuepuka kulingana na majibu yako.",
      whyMec: "Kwa nini MEC {{score}}:",
      personalizeButton: "Binafsisha chaguo lako",
      personalizeHint: "Boresha chaguzi zako kulingana na mapendeleo (mzunguko, mimba ya baadaye, n.k.)",
      backToQuestions: "Rudi kwa Maswali",
      startOver: "Anza Upya",
    },
  },

  // ─── Final Recommendation ────────────────────────────────────────────────────
  recommendation: {
    title: "Mapendekezo Yako Yaliyobinafsishwa",
    noRecommendations: "Hakuna mapendekezo yanayopatikana",
    completeFirst: "Tafadhali kamilisha maswali ya ubinafsishaji kwanza.",
    bestMatch: "Chaguo Lako Bora",
    bestMatchPlural: "Chaguzi Zako Bora",
    bestMatchDescription:
      "Njia hii inalingana vizuri na profaili yako ya afya na mapendeleo yako ya maisha.",
    bestMatchDescriptionPlural:
      "Njia hizi zinalingana vizuri na profaili yako ya afya na mapendeleo yako ya maisha.",
    knowContraceptive: "Jua Uzazi wa Mpango Wako",
    compareMethods: "Linganisha Njia za Uzazi wa Mpango",
    importantInfo: "Taarifa Muhimu",
    stiProtection: "Ulinzi wa STI",
    stiProtectionBody:
      "Hakuna njia hapa chini inayotoa ulinzi dhidi ya STI, kwa hivyo ukiwa na hatari kubwa ya STI, njia za kizuizi zinapaswa kutumika peke yake kama uzazi wa mpango na mlinzi wa STI, au unaweza kutumia njia za kizuizi pamoja na uzazi wa mpango uliochaguliwa.",
    notRecommended: "Njia Zisizopendekezwa Kwako",
    notRecommendedDescription: "Njia hizi zilitengwa kulingana na mapendeleo yako:",
    reason: "Sababu",
    category: "Kategoria",
    recommended: "Inapendekezwa",
    alternative: "Mbadala",
    medicalDisclaimer: "Onyo la Matibabu: ",
    medicalDisclaimerBody:
      "Mapendekezo yanategemea miongozo ya WHO na maelezo uliyoshiriki. Tafadhali wasiliana na mtoa huduma za afya kabla ya kuanza uzazi wowote wa mpango.",
  },

  // ─── Questionnaire (WHO MEC) ──────────────────────────────────────────────────
  questionnaire: questionnaireSw,

  // ─── Contraceptive Methods (detail pages, MEC names) ────────────────────────────
  methods: methodsSw,

  // ─── FAB Eligibility ────────────────────────────────────────────────────────────
  fab: fabSw,

  // ─── Emergency Contraception Safety ────────────────────────────────────────────
  ecp: ecpSw,

  // ─── Emergency Contraception Description (Know Your Contraceptive) ──────────────
  ecDescription: {
    overview: {
      title: "Uzazi wa Mpango wa Dharura ni Nini?",
      description:
        "Uzazi wa mpango wa dharura (EC) unarejelea njia za uzazi wa mpango zinazotumika baada ya ngono isiyo na kinga au kushindwa kwa uzazi wa mpango kuzuia mimba. Kwa kimsingi inafanya kazi kwa kuzuia au kuahirisha ovulation au kuzuia fertilization na haukatiki mimba iliyothibitishwa.",
      timeWindow:
        "Uzazi wa mpango wa dharura unapaswa kutumika haraka iwezekanavyo baada ya ngono isiyo na kinga, lakini njia zingine zinaendelea kuwa na ufanisi hadi siku 5 (masaa 120).",
      cardTitle: "Kuhusu Uzazi wa Mpango wa Dharura",
      cardDescription:
        "Muhtasari wa EC, lini kuitumia, mambo ya ushauri, na muhtasari wa chaguzi.",
    },
    whenToUse: {
      title: "Lini Uzazi wa Mpango wa Dharura Unapaswa Kutumika",
      items_0: "Ngono isiyo na kinga",
      items_1: "Kuvunjika au kuteleza kwa kondomu",
      items_2: "Kukosa vidonge vya uzazi wa mpango",
      items_3: "Unyanyasaji wa kijinsia bila uzazi wa mpango",
      items_4: "Matumizi yasiyo sahihi ya njia za uzazi wa mpango",
    },
    counseling: {
      title: "Mambo Muhimu ya Ushauri",
      items_0: "Uzazi wa mpango wa dharura hausababishi utoaji mimba",
      items_1: "Hauharibu mimba iliyopo ikiwa unachukuliwa bila kukusudia",
      items_2: "Hauathiri uzazi wa baadaye",
      items_3: "Jaribio la mimba linapaswa kufanywa ikiwa hedhi inayofuata inachelewa zaidi ya siku 7",
      items_4: "ECP hazizuii STI—pendekeza matumizi ya kondomu",
    },
    summary: {
      title: "Muhtasari wa Chaguzi za Uzazi wa Mpango wa Dharura",
      method: "Njia",
      timeWindow: "Kipindi cha muda",
      pregnancyRate: "Kiwango cha mimba",
      copperIud: "IUD ya shaba",
      ulipristal: "Ulipristal acetate",
      levonorgestrel: "Kidonge cha levonorgestrel",
      yuzpe: "Njia ya Yuzpe",
      higherFailure: "Kushindwa zaidi",
    },
    methods: {
      levonorgestrel: "Kidonge cha Dharura cha Levonorgestrel",
      levonorgestrelDesc: "Kidonge cha progestin. Kinafaa zaidi ndani ya masaa 72. Kinaweza kutumika hadi masaa 120.",
      ulipristal: "Kidonge cha Dharura cha Ulipristal Acetate",
      ulipristalDesc: "Kinafaa zaidi kuliko levonorgestrel. Kinafaa hadi siku 5 (masaa 120). Dozi moja.",
      yuzpe: "Vidonge vya Mchanganyiko (Njia ya Yuzpe)",
      yuzpeDesc: "Dozi kubwa za vidonge vya kawaida vya COC. Tumia wakati ECP maalum hazipatikani. Ndani ya masaa 72.",
      copperIud: "IUD ya Shaba (Dharura)",
      copperIudDesc: "Njia ya EC yenye ufanisi zaidi. Ingiza ndani ya siku 5. Inatoa uzazi wa mpango wa muda mrefu.",
    },
  },

  // ─── Calendar Method Calculator ─────────────────────────────────────────────────
  calendar: {
    navigator: {
      step1: "Hatua 1: Taarifa ya Ustahili",
      step2: "Hatua 2: Ingiza Urefu wa Mizunguko",
      step3: "Hatua 3: Hedhi ya Mwisho",
      default: "Kihesabu cha Njia ya Kalenda",
      progressComplete: "{{progress}}% imekamilika",
      previous: "Iliyotangulia",
      next: "Inayofuata",
      seeResults: "Tazama Matokeo",
    },
    results: {
      headerTitle: "Njia ya Kalenda",
      headerSubtitle: "Kalenda Yako ya Uzazi",
      yourResults: "MATOKEO YAKO",
      cycleCharacteristics: "Sifa za Mzunguko",
      shortestCycle: "Mzunguko mfupi zaidi:",
      longestCycle: "Mzunguko mrefu zaidi:",
      averageCycle: "Mzunguko wa wastani:",
      eligibility: "Ustahili:",
      eligible: "Unastahili ✓",
      notEligible: "Hustahili ✗",
      notRecommended: "Haipendekezwi",
      fertileDays: "Siku za Uzazi (Zisizo Salama)",
      fertileSubtitle: "Mimba Inawezekana — Epuka Ngono Isiyo na Kinga",
      from: "Kutoka:",
      to: "Hadi:",
      avoidUnprotected: "Epuka ngono isiyo na kinga wakati wa tarehe hizi.",
      safeDays: "Siku Salama",
      safeSubtitle: "Uwezekano Mdogo wa Mimba",
      beforeFertile: "Kabla ya Kipindi cha Uzazi",
      afterFertile: "Baada ya Kipindi cha Uzazi",
      safeDaysEnd: "Siku salama zinamalizia:",
      predictedNextPeriod: "Hedhi Inayotabiriwa Inayofuata",
      expectedOn: "Inatarajiwa karibu na:",
      recalculationReminder: "Ukumbusho wa Kuhesabu Upya",
      returnOn: "Rudi siku ya kwanza ya hedhi yako inayofuata:",
      recalculateOn: "Hesabu upya siku ya kwanza ya hedhi yako inayofuata:",
      recalculationWarning:
        "Ikiwa hedhi yako inakuja mapema au baadaye, matokeo hayakuaminiki tena.",
      importantInfo: "Taarifa Muhimu",
      goBack: "Rudi",
      calculateAgain: "Hesabu Tena",
      periodDatePassed: "Tarehe ya Hedhi Imepita",
      periodDatePassedMessage:
        "Tarehe ya hedhi yako inayotarajiwa imepita. Tafadhali ingiza siku ya kwanza ya hedhi yako mpya ili kupata siku salama sahihi.",
      recalculate: "Hesabu Upya",
      later: "Baadaye",
    },
    sections: {
      "eligibility-info": "Taarifa ya Ustahili",
      "cycle-lengths": "Ingiza Mizunguko 6 ya Mwisho ya Hedhi",
      "lmp-date": "Hedhi ya Mwisho",
    },
    questions: {
      "info-text":
        "Njia hii inahitaji mizunguko ya hedhi iliyo sawa. Ikiwa mizunguko yako ni mifupi kuliko siku 21 au mirefu kuliko siku 35, njia za kalenda zinaweza kuwa zisiamini.",
      "cycle-durations":
        "Ingiza urefu (kwa siku) wa mizunguko 6 yako ya mwisho ya hedhi:\n\nUrefu wa mzunguko = Idadi ya siku kutoka siku ya kwanza ya hedhi moja hadi siku ya kwanza ya hedhi inayofuata.",
      "lmp-date": "Chagua siku ya kwanza ya hedhi yako ya mwisho (LMP)",
    },
    placeholders: {
      "cycle-durations":
        "Kila ingizo lazima kiwe nambari kamili kati ya siku 21 na 35. Ikiwa mzunguko wowote ni mfupi kuliko 21 au mrefu kuliko 35, njia za kalenda zinaweza kuwa zisiamini.",
      "lmp-date": "Chagua siku ya kwanza ya hedhi yako ya mwisho",
    },
    calendarLabels: {
      safeDay: "Siku salama",
      fertileDay: "Siku ya uzazi — mimba inawezekana",
      expectedMenstruation: "Hedhi inayotarajiwa",
      tapInstruction: "Gusa siku kuona lebo yake. Sogeza usawa kuona mzunguko wako kamili.",
    },
  },
} as const;

export default sw;
