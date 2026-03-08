/**
 * Contraceptive method names and descriptions (Kiswahili cha Tanzania)
 * Keys match method ids from contraceptiveMethodsData and keys from contraceptiveMethods
 * Uses flat keys for arrays (advantages_0, advantages_1, etc.) to avoid i18next array nesting issues
 */
export const methodsSw = {
  // MEC method keys (a-o)
  mec: {
    a: "Dawa ya kinywa ya pamoja (COC)",
    b: "Dawa ya sindano ya pamoja",
    c: "Dawa ya kinywa ya progestin peke yake (POP)",
    d: "Sindano ya Depot Medroxyprogesterone Acetate (DMPA)",
    e: "Kibano (Jadelle na Implanon)",
    f: "Kifaa cha shaba cha ndani ya tumbo (Copper IUD)",
    g: "Kifaa cha Levonorgestrel (LNG) cha ndani ya tumbo",
    h: "Kufungwa kwa mwanamke",
    i: "Kiraka cha dawa ya pamoja",
    j: "Njia ya kizuizi",
    k: "Pete ya uke ya uzazi wa mpango",
    l: "Kondomu ya mwanaume",
    m: "Kondomu ya mwanamke",
    n: "Diaphragm",
    o: "Kufungwa kwa mwanaume",
  },

  // MEC method descriptions
  mecDesc: {
    a: "Dawa ya kinywa ya kila siku yenye estrogen na progestin",
    b: "Sindano ya kila mwezi yenye estrogen na progestin",
    c: "Dawa ya kinywa ya progestin peke yake",
    d: "Sindano ya progestin ya kila robo mwaka",
    e: "Uzazi wa mpango wa muda mrefu unaoweza kubadilishwa unaowekwa chini ya ngozi",
    f: "Kifaa cha ndani ya tumbo cha shaba kinachozuia ujauzito",
    g: "Kifaa cha ndani ya tumbo kinachotoa homoni ya progestin",
    h: "Uzazi wa mpango wa kudumu kwa upasuaji (kufungwa kwa fallopian)",
    i: "Kiraka cha kila wiki kinacho na estrogen na progestin",
    j: "Njia za kizuizi kama kondomu, diaphragm, n.k.",
    k: "Pete ya uke ya kila mwezi yenye estrogen na progestin",
    l: "Njia ya kizuizi inayovaliwa na mwanaume kila tukio",
    m: "Njia ya kizuizi inayovaliwa na mwanamke kila tukio",
    n: "Njia ya kizuizi inayowekwa ukeni kabla ya tendo la ndoa",
    o: "Uzazi wa mpango wa kudumu kwa upasuaji (vasectomy)",
  },

  // Category labels
  categories: {
    hormonal: "Hormoni",
    "non-hormonal": "Si ya hormoni",
    barrier: "Kizuizi",
    permanent: "Kudumu",
    natural: "Asili",
    emergency: "Dharura",
  },

  // MEC categories
  mecCategories: {
    "1": {
      title: "Hakuna Vikwazo",
      description:
        "Hali ambayo hakuna vikwazo vya kutumia njia hii ya uzazi wa mpango",
    },
    "2": {
      title: "Faida Kwa Kawaida Zinazidi Hatari",
      description:
        "Faida za kutumia njia hii kwa kawaida zinazidi hatari za kinadharia au zilizothibitishwa",
    },
    "3": {
      title: "Hatari Kwa Kawaida Zinazidi Faida",
      description:
        "Hatari za kinadharia au zilizothibitishwa kwa kawaida zinazidi faida za kutumia njia hii",
    },
    "4": {
      title: "Hatari Isiyokubalika ya Afya",
      description:
        "Hali inayowakilisha hatari isiyokubalika ya afya ikiwa njia hii ya uzazi wa mpango itatumika",
    },
  },

  // Efficacy labels
  efficacyLabels: {
    Good: "Nzuri",
    Excellent: "Bora",
    Perfect: "Kamili",
  },

  // Detail page section titles
  sections: {
    description: "Maelezo",
    efficacy: "Ufanisi",
    advantages: "Faida",
    disadvantages: "Hasara",
    howToUse: "Jinsi ya Kutumia",
    timeToWork: "Muda wa Kuanza Kufanya Kazi",
    timeOfOnset: "Muda wa Kuanza Kufanya Kazi",
    conditionsRequired: "Masharti Yanayohitajika",
    sideNotes: "Maelezo ya Ziada",
    commonErrors: "Makosa ya Kawaida",
    additionalMethods: "Njia za Ziada",
  },

  // Method not found
  methodNotFound: "Njia Haijapatikana",
  methodNotFoundDescription:
    "Njia ya uzazi wa mpango unayoitafuta haipo.",

  // Detailed method data
  detail: {
    "male-condom": {
      name: "Kondomu ya Mwanaume",
      shortName: "Kondomu ya Mwanaume",
      description:
        "Kondomu ya mwanaume ni kifuniko nyembamba kinachowekwa juu ya ncha na mwili wa mboo ya mpenzi wako kabla ya kuingiza chochote ukeni. Njia ya kizuizi cha mwili inayozuia mimba na kulinda dhidi ya magonjwa ya zinaa",
      efficacy: {
        label: "Nzuri",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 13%. Maana yake kati ya wanawake 100 wanaotumia njia hii kwa kawaida, kuna uwezekano kwamba 13 wao watapata mimba.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni 2%. Maana yake kati ya wanawake 100 wanaotumia njia hii kikamilifu, kuna uwezekano kwamba 2 wao watapata mimba.",
      },
      advantages_0: "Inapatikana kwa urahisi",
      advantages_1: "Ni nafuu",
      advantages_2: "Inalinda dhidi ya Magonjwa ya Zinaa (STDs)",
      disadvantages_0: "Haiwezi kutumika kwa wagonjwa wenye mzio wa latex",
      howToUse:
        "Kwanza angalia tarehe ya kumaliza na pakiti kwa uharibifu, kisha fungua kwa uangalifu kwa vidole vyako. Weka tu wakati mboo iko imeimarika kabisa, ukihakikisha ukingo uko nje. Bonyeza ncha kuacha nafasi kwa manii na uisogeze chini kwa urahisi hadi msingi, ukizuia hewa. Ikiwa unahitaji, tumia mafuta ya maji au silicone (kamwe mafuta ya mafuta na latex). Wakati wa ngono, hakikisha inabaki mahali, na baada ya kumwaga manii ondoka bado ikiimarika, ukishika msingi kuzuia kuteleza. Funga au funika kondomu iliyotumika na utupie kwenye taka—kamwe usitumie tena au usisukume kwenye choo. Tumia kondomu mpya kila wakati; usitumie mbili pamoja.",
      timeToWork: "Mara moja",
      sideNotes:
        "Kondomu ya mwanaume na ya mwanamke haipaswi kutumika wakati mmoja.",
      commonErrors_0:
        "Matumizi yasiyothabiti (kondomu mpya inapaswa kutumika baada ya kila kumwaga manii)",
      commonErrors_1: "Kutumia mafuta ya mafuta kwa kondomu za latex",
      commonErrors_2: "Kuwekwa vibaya kwa kondomu",
      additionalInfo: {
        warning:
          "Ikiwa kondomu itavunjika, fikiria dawa ya dharura ya uzazi wa mpango au HIV PEP kulingana na hali.",
      },
    },
    "female-condom": {
      name: "Kondomu ya Mwanamke",
      shortName: "Kondomu ya Mwanamke",
      description:
        "Inavaliwa na mwanamke wakati wa kila tendo la ngono. Ina pete 2 zinazobadilika; 1 iliyofungwa kwa kuingiza na nyingine wazi.",
      efficacy: {
        label: "Nzuri",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 21%. Maana yake kati ya wanawake 100 wanaotumia njia hii kwa kawaida, kuna uwezekano kwamba 21 wao watapata mimba.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni 5%. Maana yake kati ya wanawake 100 wanaotumia njia hii kikamilifu, kuna uwezekano kwamba 5 wao watapata mimba.",
      },
      advantages_0: "Haichakuki na mafuta ya mafuta",
      advantages_1:
        "Inatoa ulinzi fulani kwa labia na msingi wa mboo wakati wa ngono",
      disadvantages_0: "Kuwekwa ni ngumu",
      disadvantages_1: "Pete ya ndani inaweza kusababisha usumbufu",
      disadvantages_2:
        "Ikiwa itawekwa kwa muda mrefu inaweza kusababisha maambukizo ya mfumo wa mkojo (UTI)",
      howToUse:
        "Kwanza angalia tarehe ya kumaliza na pakiti, kisha fungua kwa uangalifu. Bonyeza pete ya ndani kwenye mwisho uliofungwa, ingiza ukeni kama tampon, na usukume juu hadi pete ikae nyuma ya mfupa wa pubic huku pete ya nje ikibaki nje ikifunika vulva. Onyesha mboo kwenye kondomu wakati wa ngono kuzuia kuteleza kwa upande. Baada ya ngono, pinda pete ya nje kushika manii ndani na uivute polepole kabla ya kusimama. Itupa kwenye taka—kamwe usisukume chooni au usitumie tena. Kondomu za mwanamke zinaweza kuingizwa kabla tu ya ngono au hata masaa kadhaa kabla.",
      timeToWork: "Mara moja",
      sideNotes:
        "Matumizi ya pamoja ya kondomu ya mwanamke na mwanaume hayapendekezi kwa sababu yoyote inaweza kuteleza wakati wa ngono.",
    },
    coc: {
      name: "Dawa za Kinywa za Pamoja",
      shortName: "COC",
      description:
        "Kama jina linavyosema, hizi ni dawa za kinywa za pamoja (COCs) maana yake ni vidonge vyenye hormoni ya estrogen na progesterone.",
      efficacy: {
        label: "Bora",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 6%. Maana yake kati ya wanawake 100 wanaotumia njia hii kwa kawaida, kuna uwezekano kwamba 6 wao watapata mimba.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu hakuna mwanamke atakayepata mimba wakati wa COC.",
      },
      advantages_0: "Hedhi za kawaida na zinazotabiriwa",
      advantages_1:
        "Kupungua kwa maumivu ya chini ya tumbo yanayotokea katikati ya mzunguko",
      advantages_2:
        "Kuongezeka kwa hifadhi ya chuma kwa wanawake wenye damu nyingi ya hedhi",
      advantages_3:
        "Kupungua kwa uwezekano wa kista ya ovari, kansa ya ovari na kansa ya tumbo",
      advantages_4: "Athari nzuri za urembo (kupungua kwa chunusi na nywele za uso)",
      disadvantages_0:
        "Athari za estrogen (kichefuchefu, kichwa, matiti yanayosikia) na matatizo (kansa ya matiti, mawe ya chole, mkusanyiko wa damu kwenye mishipa)",
      disadvantages_1: "Inahitaji kuchukua kidonge kila siku",
      howToUse:
        "Unahitaji kwenda kliniki kila mwezi kuchukua vidonge vyako vya mwezi 1. Unapata jumla ya vidonge 28. 21 vya hizo vina hormoni za uzazi wa mpango na 7 ni ziada ya chuma. Unahitaji kwanza kumaliza vidonge 21, kuchukua mara moja kwa siku kwa siku 21. Kisha siku 22 hadi 28, unahitaji kuchukua tu ziada ya chuma ili kuruhusu hedhi kutokea. Kisha siku 29 mzunguko mpya utaanza; utachukua vidonge vya hormoni tena kwa siku 21 na kumalizia na ziada ya chuma. Mzunguko huu unarudia.",
      timeToWork:
        "Ikiwa imeanza ndani ya siku 5 za kwanza za mzunguko wa hedhi (siku za damu) basi vidonge vitaanza kufanya kazi mara moja. Ikiwa imeanza baada ya siku tano za kwanza za mzunguko wa hedhi, basi tumia njia ya ziada ya uzazi wa mpango k.m. kondomu au epuka ngono kwa siku 7 wakati unaendelea kuchukua vidonge.",
      sideNotes:
        "Ikiwa umekosa kidonge 1, chukua kidonge haraka unapokumbuka na uifuate na kidonge cha ratiba ya kawaida. Ikiwa umekosa vidonge 2 au zaidi mfululizo, basi tumia njia ya ziada ya uzazi wa mpango kwa siku 7. Ikiwa umekosa vidonge vyako kati ya siku 21 na 28, basi hakuna haja ya wasiwasi, kwa sababu vidonge wakati huu ni ziada ya chuma, hata hivyo ikiwa umekosa kidonge cha hormoni basi unafuata hatua za juu. Baada ya kuacha vidonge, uzazi kwa kawaida unarudi kwa mwezi 1 lakini unaweza kuchukua hadi miezi 3.",
    },
    pop: {
      name: "Vidonge vya Progestin Peke Yake",
      shortName: "POP",
      description:
        "Kama jina linavyosema; hizi ni Vidonge vya Progestin Peke Yake (POP) maana yake ni vidonge vyenye hormoni ya progesterone peke yake (hakuna estrogen).",
      efficacy: {
        label: "Bora",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 6%. Maana yake kati ya wanawake 100 wanaotumia njia hii kwa kawaida, kuna uwezekano kwamba 6 wao watapata mimba.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu hakuna mwanamke atakayepata mimba wakati wa POPs.",
      },
      advantages_0:
        "Hakuna athari za estrogen (kichefuchefu, kichwa, matiti yanayosikia) na matatizo (kansa ya matiti, mawe ya chole, mkusanyiko wa damu)",
      advantages_1: "Hedhi chache za maumivu",
      advantages_2: "Uzazi unarudi mara moja baada ya kuacha",
      disadvantages_0: "Uzingatiaji wa kuchukua vidonge kila siku",
      disadvantages_1:
        "Athari za progesterone (mabadiliko ya mhemko, chunusi, damu isiyo ya kawaida ya hedhi) na matatizo (udhaifu wa mifupa)",
      disadvantages_2: "Damu isiyo ya ratiba na madoa",
      howToUse:
        "Chukua kidonge 1 kwa siku. Kidonge kinahitaji kuchukuliwa wakati mmoja kila siku.",
      timeToWork:
        "Ikiwa imeanza ndani ya siku 5 za kwanza za mzunguko wa hedhi, basi vidonge vitaanza kufanya kazi mara moja. Ikiwa imeanza baada ya siku tano za hedhi basi tumia njia ya ziada ya uzazi wa mpango k.m. kondomu au epuka ngono kwa siku 2 zinazofuata wakati unaendelea kuchukua vidonge.",
      sideNotes:
        "Ikiwa unanyonyesha, anza wiki 6 baada ya kuzaa. Ikiwa kidonge kinachukuliwa zaidi ya saa 3 kuchelewa basi tumia kondomu/epuka ngono kwa siku 2 zinazofuata na uendelee kuchukua vidonge.",
    },
    "copper-iucd": {
      name: "Kifaa cha Shaba cha Ndani ya Tumbo",
      shortName: "Kifaa cha Shaba cha Ndani ya Tumbo",
      description:
        "Kifaa kidogo cha umbo la T kilichofanywa kwa plastiki na kufungwa kwa shaba kitakachowekwa ndani ya tumbo na mtoa huduma wa afya. Shaba inazuia mimba kwa kuzuia manii kusogea na kuungana na yai, lakini hata ikiwa yai limeungana kwa bahati, basi shaba pia itazuia kuendelea kukua.",
      efficacy: {
        label: "Kamili",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 0.8%. Maana yake chini ya mwanamke 1 kati ya 100 atapata mimba wakati wa kutumia Copper IUCD.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu hakuna mwanamke atakayepata mimba.",
      },
      advantages_0:
        "Athari inadumu kwa muda mrefu (kutoka miaka 5 hadi 12 kulingana na modeli)",
      advantages_1:
        "Inaweza kubadilishwa kwa urahisi (uzazi unarudi mara moja baada ya kuondoa copper IUCD)",
      advantages_2: "Inaweza kuingizwa mara moja baada ya kuzaa",
      disadvantages_0: "Hatari ya kuumiza tumbo wakati wa kuingiza",
      disadvantages_1:
        "Ikiwa mimba itatokea uwezekano mkubwa ni ectopic (mtoto anakua mahali pengine badala ya tumbo)",
      disadvantages_2: "Hedhi zinaweza kuwa nzito zaidi, ndefu zaidi, na zenye maumivu zaidi",
      disadvantages_3: "Haiwezi kutumika kwa watu wenye mzio wa shaba",
      howToUse:
        "Mtoa huduma wa afya ataingiza kifaa hiki kidogo ndani ya tumbo kupitia uke.",
      timeToWork:
        "Inafanya kazi mara moja ikiwa imeingizwa ndani ya siku 5 za mwanzo za hedhi yako. Ikiwa imeingizwa wakati mwingine katika mzunguko, njia ya ziada ya uzazi wa mpango (k.m. kondomu) inapendekeza kwa siku 7.",
      sideNotes:
        "IUCD inaweza kubaki kwa miaka 5 hadi 12 hata hivyo ikiwa unataka kuondolewa, unaweza kufanya hivyo wakati wowote unapotaka.",
      additionalInfo: {
        timeOfOnset:
          "Inafanya kazi mara moja ikiwa imeingizwa ndani ya siku 5 za mwanzo za hedhi yako. Ikiwa imeingizwa wakati mwingine katika mzunguko, njia ya ziada ya uzazi wa mpango (k.m. kondomu) inapendekeza kwa siku 7.",
      },
    },
    "contraceptive-vaginal-ring": {
      name: "Pete ya Uke ya Uzazi wa Mpango",
      shortName: "Pete ya Uke",
      description:
        "Pete ya uke ya uzazi wa mpango ni pete ndogo, laini, yenye kubadilika ya plastiki (karibu 5-6 cm upana) ambayo mwanamke anaweka ndani ya uke wake mara moja kwa mwezi. Pete inatoa hormoni mbili (estrogen na progestin) polepole zinazozuia mimba kutokea.",
      efficacy: {
        label: "Bora",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 7%. Maana yake kati ya wanawake 100 wanaotumia njia hii kwa kawaida, kuna uwezekano kwamba 7 wao watapata mimba.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu hakuna mwanamke atakayepata mimba wakati wa kutumia pete ya uke.",
      },
      advantages_0:
        "Inafanya kazi kwa muda mrefu zaidi kuliko vidonge hivyo hakuna haja ya kubadilisha kila siku",
      advantages_1:
        "Inaweza kutumika kwa mtu mwenye kichefuchefu/magonjwa ya kushindwa kumaliza chakula",
      advantages_2:
        "Matiti machache yanayosikia, na mabadiliko ya mhemko ikilinganishwa na dawa za kinywa",
      disadvantages_0: "Inaweza kusababisha uharibifu wa uke au kutokwa",
      disadvantages_1: "Inaweza kuteleza kwa bahati mbaya",
      howToUse:
        "Ingiza pete ya hormoni ndani ya uke na uiacha mahali kwa wiki 3 za kwanza, kisha ondoa pete kwa wiki 1. Pete mpya inawekwa wiki 5.",
      timeToWork:
        "Ikiwa imeanza ndani ya siku 5 za kwanza za mzunguko wa hedhi (siku za damu) basi pete itaanza kufanya kazi mara moja. Ikiwa imeanza baada ya siku tano za kwanza za hedhi basi tumia njia ya ziada ya uzazi wa mpango k.m. kondomu au epuka ngono kwa siku 7 wakati unaendelea kutumia pete.",
      sideNotes:
        "Ikiwa pete itaanguka, sukuma kwa maji baridi/joto na uingize tena. Ikiwa pete iko nje zaidi ya saa 3, basi tumia njia ya ziada ya uzazi wa mpango kwa siku 7 wakati bado unatumia pete.",
    },
    "contraceptive-injection": {
      name: "Sindano za Uzazi wa Mpango",
      shortName: "DMPA",
      description:
        "Sindano ya uzazi wa mpango ina DMPA ambayo ni hormoni ya progestin (hakuna estrogen). Hormoni inafanya kazi kwa kuzuia yai kutolewa na ovari, pia inainua unene wa kamasi inayotolewa na shingo ya tumbo kuifanya iwe ngumu kwa manii kuingia tumbo, pia inainua unene wa endometrium (sehemu inayohusika na kukua na kudumisha mtoto).",
      efficacy: {
        label: "Bora",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 4%. Maana yake kati ya wanawake 100 wanaotumia njia hii kwa kawaida na wakati wa kawaida wa sindano, kuna uwezekano kwamba 4 wao watapata mimba.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu hakuna mwanamke atakayepata mimba ikiwa sindano zinapokelewa kwa ratiba.",
      },
      advantages_0:
        "Hakuna athari za estrogen (kichefuchefu, kichwa, matiti yanayosikia) na matatizo (kansa ya matiti, mawe ya chole, mkusanyiko wa damu)",
      advantages_1: "Inaweza kutumika wakati wa kunyonyesha",
      advantages_2: "Hedhi chache za maumivu",
      disadvantages_0:
        "Athari za progesterone (mabadiliko ya mhemko, chunusi, damu isiyo ya kawaida ya hedhi) na matatizo (udhaifu wa mifupa)",
      disadvantages_1: "Hedhi zisizo za kawaida",
      disadvantages_2: "Inahitaji ziara hospitalini kila miezi 3 kwa sindano",
      disadvantages_3:
        "Uzazi unarudi baadaye (itachukua wastani wa miezi 10 baada ya sindano ya mwisho kuwa na uzazi tena)",
      howToUse:
        "Mtoa huduma wa afya atachoma hormoni kwenye mkono wako wa juu au matako. Kwa sababu athari ya sindano inadumu miezi 3, unahitaji kurudi kwa mtoa huduma wako wa afya kwa sindano tena baada ya miezi 3.",
      timeToWork:
        "Sindano ya uzazi wa mpango inaanza kufanya kazi mara moja ikiwa imetolewa ndani ya siku 7 za kwanza za hedhi ya mwanamke, lakini ikiwa imetolewa baadaye katika mzunguko, njia ya ziada (kama kondomu au kuepuka ngono) inahitajika kwa siku 7. Baada ya kuzaa, wanawake wanaonyonyesha wanapaswa kuanza sindano tu baada ya wiki 6, wakati ambao ulinzi unaanza mara moja. Kwa wanawake wasioonyonyesha, ikiwa sindano imetolewa ndani ya siku 21 za kuzaa inafanya kazi mara moja, lakini ikiwa imeanza baada ya siku 21, siku 7 za njia ya ziada ya uzazi wa mpango zinahitajika kabla ya ulinzi kamili kuanzishwa.",
      sideNotes: "Hakuna",
    },
    "combination-patch": {
      name: "Kiraka cha Dawa ya Pamoja",
      shortName: "Kiraka cha Uzazi wa Mpango",
      description:
        "Kiraka cha ngozi ni kama kisterki kidogo unachoweka kwenye ngozi yako. Inatoa hormoni (estrogen na progesterone) polepole kupitia ngozi yako na ndani ya damu yako kwa muda.",
      efficacy: {
        label: "Bora",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 7%. Maana yake kati ya wanawake 100 wanaotumia njia hii kwa kawaida, kuna uwezekano kwamba 7 wao watapata mimba.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu hakuna mwanamke atakayepata mimba wakati wa kutumia kiraka.",
      },
      advantages_0: "Inafanya kazi kwa muda mrefu zaidi kuliko vidonge",
      advantages_1: "Ni rahisi kutumia",
      advantages_2: "Hedhi za kawaida zinazotabiriwa",
      disadvantages_0:
        "Athari za estrogen (kichefuchefu, kichwa, matiti yanayosikia) na matatizo (kansa ya matiti, mawe ya chole, mkusanyiko wa damu)",
      disadvantages_1: "Inahitaji kukumbuka kubadilisha",
      howToUse:
        "Weka kiraka kwenye mkono wa juu wa nje/tumbo na uiacha mahali kwa wiki 3 za kwanza, kisha ondoa kiraka kwa wiki 1. Kiraka mpya kinawekwa wiki 5.",
      timeToWork:
        "Ikiwa imeanza ndani ya siku 5 za kwanza za mzunguko wa hedhi (siku za damu) basi kiraka kitaanza kufanya kazi mara moja. Ikiwa imeanza baada ya siku tano za kwanza za hedhi basi tumia njia ya ziada ya uzazi wa mpango k.m. kondomu au epuka ngono kwa siku 7 wakati unaendelea kutumia kiraka.",
      sideNotes:
        "Ikiwa kiraka kiko nje zaidi ya saa 48 basi tumia njia ya ziada ya uzazi wa mpango kwa siku 7 wakati bado unatumia kiraka.",
    },
    implants: {
      name: "Vibano",
      shortName: "Kibano cha Uzazi wa Mpango",
      description:
        "Kibano cha uzazi wa mpango ni fimbo ndogo, yenye kubadilika (karibu ukubwa wa kiberiti) ambayo mtoa huduma wa afya anaweka chini ya ngozi ya mkono wako wa juu. Inatoa hormoni inayoitwa progestin polepole ndani ya mwili wako kwa muda. Hormoni inafanya kazi kwa kuzuia yai kutolewa na ovari, pia inainua unene wa kamasi inayotolewa na shingo ya tumbo kuifanya iwe ngumu kwa manii kuingia tumbo, pia inainua unene wa endometrium.",
      efficacy: {
        label: "Kamili",
        typicalUse:
          "Uwezekano wa mimba ni 0.3%. Maana yake chini ya mwanamke 1 kati ya 100 atapata mimba wakati wa kutumia njia hii.",
      },
      advantages_0: "Inadumu muda mrefu",
      advantages_1:
        "Hakuna athari za estrogen (kichefuchefu, kichwa, matiti yanayosikia) na matatizo (kansa ya matiti, mawe ya chole, mkusanyiko wa damu)",
      advantages_2: "Hakuna athari kwa kunyonyesha",
      advantages_3:
        "Uzazi unarudi haraka kwa hali ya awali baada ya kuondolewa",
      disadvantages_0: "Hedhi zisizo za kawaida",
      disadvantages_1:
        "Athari za progesterone (mabadiliko ya mhemko, chunusi, damu isiyo ya kawaida ya hedhi) na matatizo (udhaifu wa mifupa)",
      disadvantages_2: "Utaratibu mdogo unahitajika kwa kuondolewa",
      howToUse:
        "Baada ya kibano kuwekwa na mtoa huduma wa afya. Huna haja ya kufanya chochote, rekodi tu tarehe ya kuingiza. Kibano kitadumu kwa karibu miaka 3 hadi 5. Mtoa huduma wako wa afya atakuambia lini kurudi kwa kuondolewa.",
      timeToWork:
        "Uzazi wa mpango unaanza saa 24 baada ya kuingiza ikiwa imeingizwa wakati wa siku tano za kwanza za mzunguko wa hedhi. Ikiwa imeingizwa baada ya siku tano za mzunguko wa hedhi, basi tumia njia ya ziada ya uzazi wa mpango k.m. kondomu ya mwanaume kwa mpenzi kwa siku 7 baada ya kuingiza.",
      sideNotes:
        "Kibano kinaweza kubaki kwa miaka 3 hadi 5 hata hivyo ikiwa unataka kuondolewa, unaweza kufanya hivyo wakati wowote unapotaka.",
    },
    "lng-ius": {
      name: "LNG-IUS",
      shortName: "Mfumo wa Levonorgestrel Ndani ya Tumbo",
      description:
        "Kifaa kidogo cha plastiki cha umbo la T kinachowekwa ndani ya tumbo. Inatoa levonorgestrel polepole, aina ya hormoni inayofanana na progesterone. Hormoni inainua kamasi ya shingo ya tumbo ili manii haiwezi kuingia na pia inainua unene wa ukuta wa ndani wa tumbo lako kuunda mazingira magumu kwa mtoto kukua.",
      efficacy: {
        label: "Kamili",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 0.2%. Maana yake chini ya mwanamke 1 kati ya 100 atapata mimba wakati wa kutumia LNG-IUS.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu hakuna mwanamke atakayepata mimba.",
      },
      advantages_0:
        "Inadumu kwa muda mrefu (kulingana na chapa, inaweza kudumu miaka 3 hadi 5)",
      advantages_1: "Kupungua kwa upotezaji wa damu ya hedhi, kupungua kwa maumivu ya hedhi",
      advantages_2: "Kupungua kwa hatari ya kansa ya tumbo na ovari",
      advantages_3:
        "Uzazi unarudi haraka baada ya kuondolewa (kwa kawaida mzunguko unaofuata)",
      disadvantages_0: "Hatari ya kuumiza tumbo wakati wa kuingiza",
      disadvantages_1:
        "Ikiwa mimba itatokea uwezekano mkubwa ni ectopic (mtoto anakua mahali pengine badala ya tumbo)",
      howToUse:
        "Mtoa huduma wa afya ataingiza kifaa hiki kidogo ndani ya tumbo kupitia uke.",
      timeToWork:
        "Inafanya kazi mara moja ikiwa imeingizwa ndani ya siku 5 za mwanzo za hedhi yako. Ikiwa imeingizwa wakati mwingine katika mzunguko, njia ya ziada ya uzazi wa mpango (k.m. kondomu) inapendekeza kwa siku 7.",
      sideNotes:
        "LNG-IUS inaweza kubaki kwa miaka 5 hadi 12 hata hivyo ikiwa unataka kuondolewa, unaweza kufanya hivyo wakati wowote unapotaka.",
    },
    "tubal-ligation": {
      name: "Kufungwa kwa Miguu ya Fallopian",
      shortName: "Kufungwa kwa Mwanamke",
      description:
        "Utaratibu wa upasuaji ambapo miguu ya fallopian inafungwa na hivyo kuzuiwa. Hii inazuia njia ya manii kufikia yai.",
      efficacy: {
        label: "Kamili",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 0.5%. Maana yake karibu wanawake 5 kati ya 1000 watapata mimba kwa mwaka mmoja.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu wanawake wote hawatapata mimba baada ya utaratibu.",
      },
      advantages_0: "Hakuna athari za hormoni",
      disadvantages_0:
        "Kwa kawaida ni ya kudumu, hivyo kurudi kwa uzazi haiwezekani",
      disadvantages_1:
        "Kukabiliwa na dawa ya usingizi na hatari zinazohusiana na upasuaji",
      howToUse: "Daktari atafanya utaratibu mdogo.",
      timeToWork: "Mara moja",
      sideNotes: "Hakuna",
    },
    vasectomy: {
      name: "Vasectomy",
      shortName: "Kufungwa kwa Mwanaume",
      description:
        "Vasectomy ni utaratibu wa kudumu wa kufungwa kwa mwanaume ambapo vas deferens (mabomba yanayobeba manii kutoka kwenye makende hadi manii) yanatenganishwa, kufungwa, au kufungwa, ili manii haiwezi kuchanganyika na manii. Makende bado yanazalisha manii, lakini manii haiwezi kutoka mwilini.",
      efficacy: {
        label: "Kamili",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 0.15%. Maana yake karibu jozi 1-2 kati ya 1000 watapata mimba kwa mwaka mmoja.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni chini ya 1%. Maana yake karibu wanaume wote hawatafanya mimba baada ya kuthibitishwa azoospermia.",
      },
      advantages_0: "Hakuna athari za hormoni",
      disadvantages_0:
        "Kwa kawaida ni ya kudumu, hivyo kurudi kwa uzazi haiwezekani",
      disadvantages_1: "Hatari za matibabu za upasuaji",
      disadvantages_2:
        "Njia ya ziada ya uzazi wa mpango inahitajika hadi manii yathibitishwe kuwa haina manii (kwa kawaida inachukua karibu 15-20 kumwaga manii)",
      howToUse: "Daktari atafanya utaratibu mdogo.",
      timeToWork:
        "Kwa sababu kuna manii yaliyobaki, mwanaume haachwa kuwa sterile hadi atakapozalisha manii bila manii ambayo inahitaji karibu 15-20 kumwaga manii ambayo inaweza kuchukua karibu wiki 8-16. Hadi manii ithibitishwe kuwa haina manii, njia mbadala za uzazi wa mpango zinapaswa kutumika kuzuia mimba.",
      sideNotes:
        "Uchambuzi wa manii unafanywa baada ya wiki 8 hadi 16 kuthibitisha kuwa manii haina manii. Uthibitishaji unafikiwa mara sampuli 2 za manii zina hasi kwa manii.",
    },
    "lactational-amenorrhea": {
      name: "Njia ya Hedhi ya Kunyonyesha",
      shortName: "LAM",
      description:
        "Kitendo cha kunyonyesha kinabadilisha usawa wa hormoni mwilini kwa njia ambayo huwezi kupata mimba. Njia hii inafanya kazi tu kwa wanawake wanaonyonyesha na inaweza kuwa njia nzuri ya uzazi wa mpango katika miezi 6 ya kwanza ya kunyonyesha.",
      efficacy: {
        label: "Bora",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 2%. Maana yake wanawake 2 kati ya 100 watapata mimba kwa mwaka mmoja wakati vigezo vya LAM vinafuatwa chini ya hali za maisha halisi.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni 2%. Maana yake wanawake 2 kati ya 100 watapata mimba ikiwa masharti yote ya LAM yanatimizwa kikamilifu.",
      },
      advantages_0: "Inaweza kutumika mara moja baada ya kuzaa",
      advantages_1: "Hedhi hazipo wakati wa kunyonyesha",
      advantages_2:
        "Mchakato wa kurudi kwa hali ya kawaida baada ya mimba ni wa haraka zaidi",
      disadvantages_0: "Inaweza kuwa isiyofaa",
      disadvantages_1:
        "Ni ngumu kutabiri lini uzazi wako utarudi. Kwa kawaida baada ya miezi 6, lakini pia unaweza kutokea kabla ya wakati huu",
      howToUse:
        "Kiwango cha chini cha kunyonyesha peke yake kila saa 4 mchana na kila saa 6 usiku.",
      timeToWork: "Inafanya kazi mara moja baada ya kuzaa.",
      conditionsRequired_0:
        "Kunyonyesha kila saa 4 mchana na kila saa 6 usiku",
      conditionsRequired_1: "Hakuna ziada ya vyakula vingine au formula",
      conditionsRequired_2: "Hakuna kurudi kwa hedhi",
      conditionsRequired_3:
        "Mtoto lazima awe na umri chini ya miezi 6 kwa matumizi kamili",
      sideNotes:
        "Ufanisi wa njia hii unapungua baada ya miezi 6 ya kuzaa.",
    },
    "standard-days-method": {
      name: "Njia ya Kalenda",
      shortName: "Mpango wa Familia wa Asili",
      description:
        "Kuelewa njia ya kalenda, unahitaji kuelewa mzunguko wa hedhi. Ovari mwilini mwako zinajibu kuzalisha mayai yanayoweza kuchanganywa na manii. Yai linatolewa mara moja kwa mwezi. Njia inatabiri lini yai limekwisha na kwamba unapaswa kuepuka ngono wakati wa siku ambazo yai linaweza kuwa nje. Mara yai likiwa nje, linaweza kuishi hadi saa 24 na manii inaweza kuchanganya mayai hadi siku 3. Kwa sababu mzunguko wa hedhi ni tofauti kwa kila mwanamke, siku ambazo yai liko nje zinaweza pia kutofautiana. Ndiyo maana kuna kikokotoo kuamua dirisha la uzazi (siku ambazo yai linaweza kuwa nje na wakati manii inaweza kuchanganya yai).",
      efficacy: {
        label: "Nzuri",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 19%. Maana yake wanawake 19 kati ya 100 watapata mimba kwa mwaka mmoja kwa matumizi ya kawaida.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni 5%. Maana yake wanawake 5 kati ya 100 watapata mimba ikiwa itatumika kikamilifu.",
      },
      advantages_0: "Hakuna athari/hasara",
      advantages_1: "Hakuna gharama",
      advantages_2:
        "Inaweza kuwa njia pekee inayokubalika kwa wanandoa kwa sababu za kitamaduni au kidini",
      disadvantages_0: "Kuna uwezekano mkubwa wa mimba",
      disadvantages_1: "Haitafanya kazi ikiwa una mizunguko isiyo ya kawaida ya hedhi",
      howToUse:
        "Fuatilia mzunguko wako wa hedhi na siku ambazo uzazi unaweza kutokea kwa kutumia kalenda.",
      timeToWork: "Mara moja",
      conditionsRequired_0:
        "Inahitaji kuwa na mizunguko ya kawaida ya hedhi (tofauti ya mzunguko haipaswi kuwa zaidi ya siku 7). Ikiwa mzunguko wako wa hivi karibuni ulichukua siku 28, ujao unapaswa kutokea si chini ya siku 21 na si zaidi ya siku 35.",
      additionalInfo: {
        additionalMethods_0_title: "A. Njia ya Kamasi ya Shingo ya Tumbo",
        additionalMethods_0_description:
          "Shingo ya tumbo ni mlango wa tumbo. Kwa kawaida inazalisha kamasi kulainisha uke. Unene wa kamasi ni upeo wakati yai liko nje hivyo Ngono inaruhusiwa siku 4 baada ya kamasi ya juu zaidi hadi hedhi kwa sababu katika kipindi hiki yai labda limekufa.",
        additionalMethods_1_title: "B. Njia ya Joto la Mwili",
        additionalMethods_1_description:
          "Wakati yai liko nje, joto la mwili pia linaongezeka. Kuongezeka kwa joto kwa kawaida kati ya 0.2 na 0.5°C. Ngono inaweza kuwa salama siku tatu baada ya kuongezeka kwa joto kuanza hadi hedhi inayofuata.",
      },
    },
    "standard-days-method-sdm": {
      name: "Njia ya Siku za Kawaida",
      shortName: "SDM",
      description:
        "Njia ya Siku za Kawaida (SDM) ni njia inayotegemea ufahamu wa uzazi kwa wanawake wenye mizunguko ya kawaida ya hedhi ya siku 26-32, kusaidia kutambua siku za uzazi na salama kuzuia mimba. Inachukulia ovulation inatokea katikati ya mzunguko, na siku 8-19 zinachukuliwa kuwa za uzazi; wanandoa wanakwepa ngono bila kinga katika kipindi hiki. Njia inajumuisha kuhesabu kutoka siku ya kwanza ya damu ya hedhi kufuatilia siku za uzazi na zisizo za uzazi kwa usahihi.",
      efficacy: {
        label: "Nzuri",
        typicalUse:
          "Kwa matumizi ya kawaida, uwezekano wa mimba ni 13%. Maana yake wanawake 13 kati ya 100 watapata mimba kwa matumizi ya kawaida.",
        perfectUse:
          "Kwa matumizi kamili, uwezekano wa mimba ni 5%. Maana yake wanawake 5 kati ya 100 watapata mimba ikiwa itatumika kwa usahihi kila mzunguko.",
      },
      advantages_0: "Hakuna athari/hasara",
      advantages_1: "Hakuna gharama",
      advantages_2:
        "Inaweza kukubalika kwa wanandoa kwa sababu za kitamaduni au kidini",
      advantages_3: "Ni rahisi kutumia na mizunguko ya hedhi thabiti",
      disadvantages_0: "Kuna uwezekano mkubwa wa mimba",
      disadvantages_1:
        "Haifai kwa wanawake wenye mizunguko isiyo ya kawaida ya hedhi",
      disadvantages_2:
        "Inahitaji umakini wa kila siku kwa mzunguko wa hedhi na ufuatiliaji wa makini",
      howToUse:
        "Fuatilia mzunguko wako wa hedhi kwa kutumia kalenda au programu. Tambua siku 8-19 kama siku za uzazi na epuka ngono bila kinga katika kipindi hiki. Siku 1-7 na kutoka siku 20 kuendelea zinachukuliwa kuwa salama zaidi kwa ngono.",
      timeToWork: "Mara moja",
      conditionsRequired_0:
        "Mizunguko ya kawaida ya hedhi (urefu kati ya siku 26-32)",
      conditionsRequired_1: "Ufuatiliaji thabiti wa siku za mzunguko",
      sideNotes:
        "Kwa sababu dirisha la uzazi linaweza kutofautiana kidogo kati ya wanawake, kuunganisha SDM na viashiria vya ziada vya uzazi kunaweza kuboresha ufanisi: kufuatilia mabadiliko ya kamasi ya shingo ya tumbo (kamasi nyembamba, wazi, ya yai inaonyesha uzazi), kuchunguza mabadiliko ya joto la msingi la mwili (joto linaongezeka kidogo baada ya ovulation), na kutumia vifaa vya kutabiri ovulation (hiari kwa usahihi bora).",
      additionalInfo: {
        additionalMethods_0_title: "Kufuatilia Mabadiliko ya Kamasi ya Shingo ya Tumbo",
        additionalMethods_0_description:
          "Kamasi nyembamba, wazi, ya yai inaonyesha uzazi. Hii inaweza kusaidia kutambua lini ovulation inatokea na kuboresha usahihi wa Njia ya Siku za Kawaida.",
        additionalMethods_1_title: "Kuchunguza Mabadiliko ya Joto la Msingi la Mwili",
        additionalMethods_1_description:
          "Joto linaongezeka kidogo baada ya ovulation (kwa kawaida kati ya 0.2 na 0.5°C). Kufuatilia hii kunaweza kutoa uthibitisho wa ziada wa dirisha lako la uzazi.",
        additionalMethods_2_title: "Kutumia Vifaa vya Kutabiri Ovulation",
        additionalMethods_2_description:
          "Hiari kwa usahihi bora. Vifaa hivi hutambua mwongozo wa hormoni ya luteinizing inayotokea kabla ya ovulation, ikitoa wakati sahihi zaidi wa kipindi chako cha uzazi.",
      },
    },
    "levonorgestrel-ec": {
      name: "Kidonge cha Dharura cha Levonorgestrel",
      shortName: "LNG EC",
      description:
        "Uzazi wa mpango wa dharura wa levonorgestrel una homoni ya progestin inayozuia mimba kwa kimsingi kwa kuahirisha au kuzuia ovulation. Haumalizi mimba iliyopo.",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "Kiwango cha mimba takriban 1–2% inapochukuliwa ndani ya kipindi kinachopendekezwa. Kinafaa zaidi kinapochukuliwa haraka iwezekanavyo baada ya ngono.",
        perfectUse:
          "Kiwango cha mimba takriban 1–2% inapochukuliwa ndani ya masaa 72.",
      },
      advantages_0: "Inapatikana kwa urahisi",
      advantages_1: "Rahisi kutumia",
      advantages_2: "Vikwazo vichache",
      advantages_3: "Hauathiri uzazi wa baadaye",
      disadvantages_0: "Ufanisi unapungua kadri muda unavyopita",
      disadvantages_1: "Si nzuri kama IUD ya shaba au ulipristal",
      disadvantages_2: "Inaweza kuwa si nzuri kwa wanawake wenye uzani au BMI ya juu",
      howToUse:
        "Chaguzi mbili za dozi: Dozi moja: 1.5 mg levonorgestrel kinywani. AU Mfumo wa dozi mbili: 0.75 mg levonorgestrel kuchukuliwa mara mbili, masaa 12 kati.",
      timeToWork:
        "Inapaswa kuchukuliwa ndani ya masaa 72 (siku 3) baada ya ngono isiyo na kinga. Bado inaweza kutumika hadi masaa 120, lakini ufanisi unapungua kadri muda unavyopita.",
      sideNotes:
        "Jaribio la mimba la kawaida halihitajiki kabla ya matumizi. Uzazi wa mpango wa kawaida unaweza kuanza mara moja baada ya kuchukua levonorgestrel EC. Ikiwa kutapika kutokea ndani ya masaa 3, dozi inapaswa kurudiwa.",
    },
    "ulipristal-acetate": {
      name: "Kidonge cha Dharura cha Ulipristal Acetate",
      shortName: "UPA",
      description:
        "Ulipristal acetate ni modulator ya mpokeaji wa progesterone inayahirisha ovulation hata wakati ovulation iko karibu. Inafaa zaidi kuliko levonorgestrel, hasa mwishoni mwa dirisha la siku 5.",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "Kiwango cha mimba takriban ~1.2%. Inadumisha ufanisi kote dirisha la masaa 120 baada ya ngono.",
        perfectUse: "Kiwango cha mimba takriban ~1.2%.",
      },
      advantages_0: "Inafaa zaidi kuliko levonorgestrel",
      advantages_1: "Inafaa hadi siku 5 (masaa 120)",
      advantages_2: "Mfumo wa dozi moja",
      disadvantages_0: "Inaweza kuhitaji dawa ya daktari katika nchi zingine",
      disadvantages_1: "Uzazi wa mpango wa homoni lazima uahirishwe baada ya matumizi",
      howToUse: "Dozi moja kinywani: 30 mg ulipristal acetate.",
      timeToWork:
        "Inafaa ikiwa inachukuliwa ndani ya masaa 120 (siku 5) baada ya ngono isiyo na kinga.",
      sideNotes:
        "Baada ya kuchukua ulipristal, uzazi wa mpango wa homoni haupaswi kuanza kwa siku 5 kwa sababu unaweza kupunguza ufanisi wa ulipristal. Tumia kondomu au epuka ngono wakati huu.",
    },
    "coc-yuzpe-ec": {
      name: "Vidonge vya Mchanganyiko (Njia ya Yuzpe)",
      shortName: "COC Yuzpe",
      description:
        "Njia ya Yuzpe inatumia dozi kubwa za vidonge vya kawaida vya uzazi wa mpango vyenye ethinyl estradiol na levonorgestrel.",
      efficacy: {
        label: "Good",
        typicalUse:
          "Si nzuri kama levonorgestrel au ulipristal. Kiwango cha juu cha athari kama kichefuchefu na kutapika.",
        perfectUse: "Si nzuri kama vidonge maalum vya uzazi wa mpango wa dharura.",
      },
      advantages_0:
        "Inaweza kutumika wakati vidonge maalum vya uzazi wa mpango wa dharura havipatikani",
      disadvantages_0: "Matukio ya juu ya kichefuchefu na kutapika",
      disadvantages_1:
        "Ufanisi wa chini ikilinganishwa na njia zingine za uzazi wa mpango wa dharura",
      howToUse:
        "Dozi mbili zilizochukuliwa masaa 12 kati. Kila dozi ina: 100 µg ethinyl estradiol na 0.5 mg levonorgestrel.",
      timeToWork:
        "Inapaswa kuchukuliwa ndani ya masaa 72 baada ya ngono isiyo na kinga.",
      sideNotes:
        "Kiwango cha juu cha kichefuchefu na kutapika ikilinganishwa na levonorgestrel au ulipristal. Fikiria dawa ya kuzuia kutapika ikiwa inapatikana.",
    },
    "copper-iud-emergency": {
      name: "Kifaa cha Ndani ya Uterasi cha Shaba (IUD ya Dharura)",
      shortName: "IUD ya Shaba EC",
      description:
        "Kifaa cha ndani ya uterasi cha shaba (Cu-IUD) kinaweza kuingizwa ndani ya uterasi kuzuia mimba baada ya ngono isiyo na kinga. Shaba inaingilia uwezo wa mbegu na fertilization na inaweza pia kuzuia implantation.",
      efficacy: {
        label: "Perfect",
        typicalUse:
          "Njia ya uzazi wa mpango wa dharura yenye ufanisi zaidi. Kiwango cha mimba takriban 0.1%.",
        perfectUse:
          "Ufanisi zaidi ya 99%. Kiwango cha mimba takriban 0.1%.",
      },
      advantages_0: "Njia ya EC yenye ufanisi zaidi",
      advantages_1: "Inatoa uzazi wa mpango wa muda mrefu (miaka 5–12)",
      advantages_2: "Kurudi kwa uzazi mara moja baada ya kuondolewa",
      disadvantages_0: "Inahitaji kuingizwa na mtoa huduma wa afya aliyejulishwa",
      disadvantages_1: "Inaweza kuongeza uvujaji wa hedhi na maumivu",
      disadvantages_2: "Haifai katika maambukizi fulani ya pelvis",
      howToUse:
        "Ingiza IUD ya shaba ndani ya siku 5 (masaa 120) ya ngono isiyo na kinga.",
      timeToWork: "Inafanya kazi mara moja baada ya kuingizwa.",
      sideNotes:
        "Vigezo vya ustahili kwa matumizi ya dharura ya IUD ya shaba yanafuata Vigezo vya Ustahili wa Kimatibabu vya WHO (MEC). IUD ya shaba haipaswi kutumika ikiwa mimba tayari imethibitishwa au ikiwa kuna vikwazo kama: maambukizi ya sasa ya pelvis, uvujaji usioelezeka wa uke, kansa ya shingo ya tumbo au uterasi.",
    },
  },
} as const;
