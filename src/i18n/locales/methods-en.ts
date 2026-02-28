/**
 * Contraceptive method names and descriptions (English)
 * Keys match method ids from contraceptiveMethodsData and keys from contraceptiveMethods
 * Uses flat keys for arrays (advantages_0, advantages_1, etc.) to avoid i18next array nesting issues
 */
export const methodsEn = {
  // MEC method keys (a-o) - for MECResults, getMethodByKey
  mec: {
    a: "Combined oral contraceptive (COC)",
    b: "Combined injectable contraceptive",
    c: "Progestin only pill (POP)",
    d: "Depot Medroxyprogesterone Acetate (DMPA) injection",
    e: "Implant (includes Jadelle and Implanon)",
    f: "Copper IUD",
    g: "Levonorgestrel (LNG) IUD",
    h: "Female sterilization",
    i: "Combined patch contraceptive",
    j: "Barrier method",
    k: "Contraceptive vaginal ring",
    l: "Male condom",
    m: "Female condom",
    n: "Diaphragm",
    o: "Male sterilization",
  },

  // MEC method descriptions (for getMethodByKey / final recommendation)
  mecDesc: {
    a: "Daily oral contraceptive containing both estrogen and progestin hormones",
    b: "Monthly injection containing both estrogen and progestin hormones",
    c: "Daily oral contraceptive containing only progestin hormone",
    d: "Quarterly injection of progestin hormone",
    e: "Long-acting reversible contraceptive implanted under the skin",
    f: "Intrauterine device with copper that prevents fertilization",
    g: "Intrauterine device that releases progestin hormone",
    h: "Permanent surgical contraception (tubal ligation)",
    i: "Weekly patch containing both estrogen and progestin hormones",
    j: "Physical barrier methods like condoms, diaphragms, etc.",
    k: "Monthly vaginal ring containing both estrogen and progestin hormones",
    l: "Barrier method worn by the male during each act",
    m: "Barrier method worn by the female during each act",
    n: "Barrier method placed in the vagina before intercourse",
    o: "Permanent surgical contraception (vasectomy)",
  },

  // Category labels
  categories: {
    hormonal: "Hormonal",
    "non-hormonal": "Non-hormonal",
    barrier: "Barrier",
    permanent: "Permanent",
    natural: "Natural",
  },

  // MEC categories (for results display)
  mecCategories: {
    "1": {
      title: "No Restriction",
      description:
        "A condition for which there is no restriction for the use of the contraceptive method",
    },
    "2": {
      title: "Advantages Generally Outweigh Risks",
      description:
        "Advantages of using the method generally outweigh the theoretical or proven risks",
    },
    "3": {
      title: "Risks Usually Outweigh Advantages",
      description:
        "The theoretical or proven risks usually outweigh the advantages of using the method",
    },
    "4": {
      title: "Unacceptable Health Risk",
      description:
        "A condition that represents an unacceptable health risk if the contraceptive method is used",
    },
  },

  // Efficacy labels
  efficacyLabels: {
    Good: "Good",
    Excellent: "Excellent",
    Perfect: "Perfect",
  },

  // Detail page section titles
  sections: {
    description: "Description",
    efficacy: "Efficacy",
    advantages: "Advantages",
    disadvantages: "Disadvantages",
    howToUse: "How to Use",
    timeToWork: "Time to Work",
    timeOfOnset: "Time of Onset of Action",
    conditionsRequired: "Conditions Required",
    sideNotes: "Side Notes",
    commonErrors: "Common Errors",
    additionalMethods: "Additional Methods",
  },

  // Method not found
  methodNotFound: "Method Not Found",
  methodNotFoundDescription:
    "The contraceptive method you're looking for doesn't exist.",

  // Detailed method data - structure mirrors contraceptiveMethodsData
  // Using method id as key. Flat keys for arrays: advantages_0, advantages_1, etc.
  detail: {
    "male-condom": {
      name: "Male Condom",
      shortName: "Male Condom",
      description:
        "A male condom is a thin sheath that is placed over the glans (the end part) and the shaft of the penis of your sexual partner before any vaginal insertion. A physical barrier method that prevents pregnancy and protects against STDs",
      efficacy: {
        label: "Good",
        typicalUse:
          "With typical use the chance of pregnancy is 13%. Meaning that out of 100 women who use this method normally, there is a chance that 13 of them will become pregnant.",
        perfectUse:
          "With perfect use the chance of pregnancy is 2%. Meaning that out of 100 women who use this method perfectly, there is a chance that 2 of them will become pregnant.",
      },
      advantages_0: "Available easily",
      advantages_1: "Cheap",
      advantages_2: "Protects against Sexually Transmitted Diseases (STDs)",
      disadvantages_0: "Can't be used in patients with latex allergy",
      howToUse:
        "First check the expiry date and package for damage, then carefully open it with your fingers. Put it on only when the penis is fully erect, making sure the rim is on the outside. Pinch the tip to leave space for semen and roll it down smoothly to the base, keeping air out. If needed, use water-based or silicone-based lubricant (never oil with latex). During sex, make sure it stays in place, and after ejaculation withdraw while still erect, holding the base to prevent slipping. Tie or wrap the used condom and throw it in the trash—never reuse or flush it. Always use a new condom each time; don't double up.",
      timeToWork: "Immediate",
      sideNotes:
        "A male and a female condom should not be used at the same time.",
      commonErrors_0:
        "Inconsistent use (a new condom should be used after every ejaculation)",
      commonErrors_1: "Using oil-based lubricants for latex condoms",
      commonErrors_2: "Incorrect placement of condom",
      additionalInfo: {
        warning:
          "If the condom breaks, consider emergency contraception or HIV PEP depending on the situation.",
      },
    },
    "female-condom": {
      name: "Female Condom",
      shortName: "Female Condom",
      description:
        "To be worn by the female during each coital act. Contains 2 flexible rings; 1 closed for insertion and the other open.",
      efficacy: {
        label: "Good",
        typicalUse:
          "With typical use the chance of pregnancy is 21%. Meaning that out of 100 women who use this method normally, there is a chance that 21 of them will become pregnant.",
        perfectUse:
          "With perfect use the chance of pregnancy is 5%. Meaning that out of 100 women who use this method perfectly, there is a chance that 5 of them will become pregnant.",
      },
      advantages_0: "Does not deteriorate with oil-based lubricants",
      advantages_1:
        "Provides some protection to the labia and the base of the penis during intercourse",
      disadvantages_0: "Difficult placement",
      disadvantages_1: "Inner ring can cause discomfort",
      disadvantages_2:
        "If placed for a long duration it can result in a urinary tract infection (UTI)",
      howToUse:
        "First check the expiry date and package, then carefully open it. Squeeze the inner ring at the closed end, insert it into the vagina like a tampon, and push it up until the ring rests behind the pubic bone while the outer ring stays outside covering the vulva. Guide the penis into the condom during sex to prevent it slipping to the side. After intercourse, twist the outer ring to keep semen inside and gently pull it out before standing up. Dispose of it in the trash—never flush or reuse. Female condoms can be inserted just before or even several hours before sex.",
      timeToWork: "Immediate",
      sideNotes:
        "Simultaneous use of both the female and male condom is NOT recommended because either of them can slip out during sexual intercourse.",
    },
    coc: {
      name: "Combined Oral Contraceptives",
      shortName: "COC",
      description:
        "As the name suggests, these are combined oral contraceptives (COCs) meaning that these are pills containing both estrogen and progesterone hormone.",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "With typical use the chance of pregnancy is 6%. Meaning that out of 100 women who use this method normally, there is a chance that 6 of them will become pregnant.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost no women will become pregnant while being on COC.",
      },
      advantages_0: "Regular and predictable menses",
      advantages_1:
        "Reduced occurrence of mittelschmerz (lower abdomen pain that occurs mid cycle)",
      advantages_2:
        "Increased iron stores for women with heavy menstrual bleeding",
      advantages_3:
        "Reduced chances of developing an ovarian cyst, ovarian cancer and uterus cancer",
      advantages_4: "Good cosmetic effects (reduced acne and facial hair)",
      disadvantages_0:
        "Estrogen related side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)",
      disadvantages_1: "Need to take pill daily",
      howToUse:
        "You need to go to clinic every month to collect your 1-month pills. You get a total of 28 pills. 21 of those have contraceptive hormones and 7 of them are iron supplements. You need to first complete the 21 pills, taking once daily for 21 days. Then on day 22 to day 28, you need to take only the iron supplements to allow your period to occur. Then on day 29 a new cycle will start; you'll take the hormonal pills again for 21 days and finish up with the iron supplements. This cycle repeats.",
      timeToWork:
        "If started within first 5 days of menstrual cycle (bleeding days) then the pills will start working immediately. If started after the first five days of menstrual cycle, then use backup contraception e.g. condom or abstain from sex for 7 days whilst you're continuing to take pills.",
      sideNotes:
        "If you miss 1 pill, take the pill as soon as you remember and follow it with the regularly scheduled pill. If you have missed 2 or more consecutive pills, then use a backup contraception method of contraception for 7 days. If you have missed your pills between day 21 and 28. Then no need stress on it, as pills within this time are iron supplements, however if you miss a hormonal pill then you've to follow the above steps. After stopping the pills, fertility usually returns in 1 month but can take up to 3 months.",
    },
    pop: {
      name: "Progestin Only Pills",
      shortName: "POP",
      description:
        "As the name suggests; these are Progestin Only Pills (POP) meaning that these are pills containing the progesterone hormone only (no estrogen).",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "With typical use the chance of pregnancy is 6%. Meaning that out of 100 women who use this method normally, there is a chance that 6 of them will become pregnant.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost no women will become pregnant while being on POPs.",
      },
      advantages_0:
        "No high estrogen side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)",
      advantages_1: "Less painful periods",
      advantages_2: "Immediate return of fertility after stopping",
      disadvantages_0: "Compliance to take pills daily",
      disadvantages_1:
        "Progesterone related side effects (mood changes, acne, irregular menstrual bleeding) and complications (bone weakness)",
      disadvantages_2: "Unscheduled bleeding and spotting",
      howToUse:
        "Take 1 pill a day. Pill needs to be taken at same time every day.",
      timeToWork:
        "If started within first 5 days of menstrual cycle, then the pills will start working immediately. If started after the first five days of menstrual then use backup contraception e.g. condom or abstain from sex for the next 2 days while you're continuing taking the pills.",
      sideNotes:
        "If breastfeeding. start 6 weeks after childbirth. If the pill is taken more than 3 hours late then use condom/abstain from sex for the next 2 days and keep taking pills.",
    },
    "copper-iucd": {
      name: "Copper IUCD",
      shortName: "Intrauterine Copper Device",
      description:
        "A small T-shaped device made of plastic and wrapped in copper that will be placed inside the uterus by a healthcare provider. Copper prevents pregnancy by stopping the sperms from swimming and combining with the egg, but even if the egg has combined by chance, then copper will also prevent it from growing further.",
      efficacy: {
        label: "Perfect",
        typicalUse:
          "With typical use the chance of pregnancy is 0.8%. Meaning that less than 1 in 100 women will become pregnant when using Copper IUCD.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost no women will become pregnant.",
      },
      advantages_0:
        "The effect lasts longer (from 5 to 12 years depending on the model)",
      advantages_1:
        "Easily reversible (fertility resumes immediately after removal of copper IUCD)",
      advantages_2: "Can be inserted immediately after delivery",
      disadvantages_0: "Risk of injuring uterus at time of insertion",
      disadvantages_1:
        "If a pregnancy does occur it is more likely to be ectopic (the fetus grows in a place apart from the uterus)",
      disadvantages_2:
        "Periods may become heavier, longer, and more crampy",
      disadvantages_3: "Cannot be used in people allergic to copper",
      howToUse:
        "A healthcare provider will insert this small device into the uterus through the vagina.",
      timeToWork:
        "Works immediately if inserted within 5 days of the start of your menstrual period. If inserted at other times in the cycle, backup contraception (e.g., condoms) is recommended for 7 days.",
      sideNotes:
        "The IUCD can stay for 5 to 12 years however if you want to get it removed, you can do so anytime you want.",
      additionalInfo: {
        timeOfOnset:
          "Works immediately if inserted within 5 days of the start of your menstrual period. If inserted at other times in the cycle, backup contraception (e.g., condoms) is recommended for 7 days.",
      },
    },
    "contraceptive-vaginal-ring": {
      name: "Contraceptive Vaginal Ring",
      shortName: "Vaginal Ring",
      description:
        "The contraceptive vaginal ring is a small, soft, flexible plastic ring (about 5–6 cm wide) that a woman puts inside her vagina once a month. The ring slowly releases two hormones (estrogen and progestin) which prevent pregnancy from occurring.",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "With typical use the chance of pregnancy is 7%. Meaning that out of 100 women who use this method normally, there is a chance that 7 of them will become pregnant.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost no women will become pregnant while using the vaginal ring.",
      },
      advantages_0:
        "Works are relatively longer than pills so no need to change every day",
      advantages_1:
        "Can be used in a person with regular nausea/malabsorption diseases",
      advantages_2:
        "Less breast tenderness, and mood swings compared with some oral contraceptives",
      disadvantages_0: "Can cause vaginal irritation or discharge",
      disadvantages_1: "Can slip accidentally",
      howToUse:
        "Insert the hormonal ring into vagina and leave it in place for the first 3 weeks, then remove the ring for 1 week. New ring applied in week 5.",
      timeToWork:
        "If started within first 5 days of menstrual cycle (bleeding days) then the ring will start working immediately. If started after the first five days of menstrual cycle, then use backup contraception e.g. condom or abstain from sex for 7 days whilst you're continuing to use ring patch.",
      sideNotes:
        "If the ring falls out, rinse with cool/warm water and reinsert. If ring is off for more than 3 hours, then use a backup contraception method of contraception for 7 days while still using the ring.",
    },
    "contraceptive-injection": {
      name: "Contraceptive Injections",
      shortName: "DMPA",
      description:
        "The contraceptive injection contains DMPA which is a progestin hormone (no estrogen). The hormone works by preventing the egg from released by the ovaries, it also thickens the mucus released by the cervix making it difficult for the sperms to enter the womb, it also thins out the endometrium (the part responsible for growing and maintaining an embryo).",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "With typical use the chance of pregnancy is 4%. Meaning that out of 100 women who use this method normally with usual timing of injections, there is a chance that 4 of them will become pregnant.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost no women will become pregnant if injections are received on schedule.",
      },
      advantages_0:
        "No high estrogen side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)",
      advantages_1: "Can be used during breastfeeding",
      advantages_2: "Less painful periods",
      disadvantages_0:
        "Progesterone related side effects (mood changes, acne, irregular menstrual bleeding) and complications (bone weakness)",
      disadvantages_1: "Irregular periods",
      disadvantages_2: "Requires visits to the hospital every 3mo for injection",
      disadvantages_3:
        "Delayed return to fertility (it will take an average of 10 months after the last injection to become fertile again)",
      howToUse:
        "A healthcare provider will inject the hormone into your upper arm or buttock. Since the effect of the injection lasts 3 months, you need to come back to your healthcare provider for the injection again after 3 months.",
      timeToWork:
        "The contraceptive injection starts working right away if given within the first 7 days of a woman's period, but if given later in the cycle, an extra method (like condoms or abstinence) is needed for 7 days. After childbirth, breastfeeding women should start injections only after 6 weeks, at which point protection begins immediately. For non-breastfeeding women, if the injection is given within 21 days of delivery it works immediately, but if started after 21 days, 7 days of backup contraception are needed before full protection is established.",
      sideNotes: "None",
    },
    "combination-patch": {
      name: "Combination Patch Contraceptive",
      shortName: "Contraceptive Patch",
      description:
        "A transdermal patch is like a small sticker that you place on your skin. It slowly releases hormones (estrogen and progesterone) through your skin and into your blood over time.",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "With typical use the chance of pregnancy is 7%. Meaning that out of 100 women who use this method normally, there is a chance that 7 of them will become pregnant.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost no women will become pregnant while using the patch.",
      },
      advantages_0: "Works relatively longer than pills",
      advantages_1: "Easy to use",
      advantages_2: "Regular predictable menses",
      disadvantages_0:
        "Estrogen related side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)",
      disadvantages_1: "Need to remember to change",
      howToUse:
        "Stick the patch into the outer upper arm/stomach and leave it in place for the first 3 weeks, then remove the patch for 1 week. New patch applied in week 5.",
      timeToWork:
        "If started within first 5 days of menstrual cycle (bleeding days) then the patch will start working immediately. If started after the first five days of menstrual cycle, then use backup contraception e.g. condom or abstain from sex for 7 days whilst you're continuing to use the patch.",
      sideNotes:
        "If patch is off for more than 48 hours then use a backup method of contraception for 7 days while still using the patch.",
    },
    implants: {
      name: "Implants",
      shortName: "Contraceptive Implant",
      description:
        "A contraceptive implant is a tiny, flexible rod (about the size of a matchstick) that a healthcare provider puts under the skin of your upper arm. It releases a hormone called progestin slowly into your body over time. The hormone works by preventing the egg from released by the ovaries, it also thickens the mucus released by the cervix making it difficult for the sperms to enter the womb, it also thins out the endometrium (the part responsible for growing and maintaining an embryo).",
      efficacy: {
        label: "Perfect",
        typicalUse:
          "The chance of pregnancy is 0.3%. Meaning that less than 1 in 100 women will become pregnant when using this method.",
      },
      advantages_0: "Longevity",
      advantages_1:
        "No high estrogen side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)",
      advantages_2: "No effect on breastfeeding",
      advantages_3:
        "Prompt return to the previous state of fertility occurs upon removal",
      disadvantages_0: "Menstrual irregularities",
      disadvantages_1:
        "Progesterone related side effects (mood changes, acne, irregular menstrual bleeding) and complications (bone weakness)",
      disadvantages_2: "Minor procedure is necessary for removal",
      howToUse:
        "After the implant being placed by a healthcare provider. You don't have to do anything, just record the date of insertion. The implant will last for around 3 to 5 years. Your healthcare provider will tell you when to come back for removal.",
      timeToWork:
        "Contraception begins 24h after insertion if inserted during the first five days of the menstrual cycle. If inserted after the first five days of menstrual cycle, then use backup contraception e.g. male condom for the sexual partner for 7 days after insertion.",
      sideNotes:
        "The implant can stay for 3 to 5 years however if you want to get it removed, you can do so anytime you want.",
    },
    "lng-ius": {
      name: "LNG-IUS",
      shortName: "Levonorgestrel Intrauterine System",
      description:
        "A small, T-shaped plastic device that is placed inside the uterus. It slowly releases levonorgestrel, a type of hormone similar to progesterone. The hormone thickens your cervical mucus so that the sperm cannot enter and also thins out the inner lining of your uterus making a difficult environment for the baby to grow.",
      efficacy: {
        label: "Perfect",
        typicalUse:
          "With typical use the chance of pregnancy is 0.2%. Meaning that less than 1 in 100 women will become pregnant when using LNG-IUS.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost no women will become pregnant.",
      },
      advantages_0:
        "Lasts longer (depending on the brand, it can last for 3 to 5 years)",
      advantages_1: "Decreased menstrual blood loss, reduced menstrual pain",
      advantages_2: "Reduced risk of uterus and ovarian cancer",
      advantages_3:
        "Quick return to fertility after removal (usually the next cycle)",
      disadvantages_0: "Risk of injuring uterus at time of insertion",
      disadvantages_1:
        "If a pregnancy does occur it is more likely to be ectopic (the fetus grows in a place apart from the uterus)",
      howToUse:
        "A healthcare provider will insert this small device into the uterus through the vagina.",
      timeToWork:
        "Works immediately if inserted within 5 days of the start of your menstrual period. If inserted at other times in the cycle, backup contraception (e.g., condoms) is recommended for 7 days.",
      sideNotes:
        "The LNG-IUS can stay for 5 to 12 years however if you want to get it removed, you can do so anytime you want.",
    },
    "tubal-ligation": {
      name: "Tubal Ligation",
      shortName: "Female Sterilization",
      description:
        "A surgical procedure whereby the fallopian tubes are tied and hence blocked. This blocks the road for the sperm to reach the egg.",
      efficacy: {
        label: "Perfect",
        typicalUse:
          "With typical use the chance of pregnancy is 0.5%. Meaning that about 5 in 1000 women will become pregnant in one year.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost all women will not become pregnant after the procedure.",
      },
      advantages_0: "No hormonal related side effects",
      disadvantages_0:
        "Usually permanent, so returning to fertility is not possible",
      disadvantages_1:
        "Exposure to general anesthesia and surgery related risks",
      howToUse: "A doctor will perform a minor procedure.",
      timeToWork: "Immediate",
      sideNotes: "None",
    },
    vasectomy: {
      name: "Vasectomy",
      shortName: "Male Sterilization",
      description:
        "A vasectomy is a permanent male sterilization procedure where the vas deferens (tubes that carry sperm from the testicles to the semen) are cut, tied, or sealed, so sperm cannot mix with semen. The testicles still produce sperm, but the sperm cannot leave the body.",
      efficacy: {
        label: "Perfect",
        typicalUse:
          "With typical use the chance of pregnancy is 0.15%. Meaning that about 1–2 in 1000 couples will conceive in one year.",
        perfectUse:
          "With perfect use the chance of pregnancy is less than 1%. Meaning that almost all men will not cause pregnancy after confirmed azoospermia.",
      },
      advantages_0: "No hormonal related side effects",
      disadvantages_0:
        "Usually permanent, so returning to fertility is not possible",
      disadvantages_1: "Medical risks of surgery",
      disadvantages_2:
        "Alternative contraception is required until the ejaculate is confirmed to have no sperm (usually takes around 15-20 ejaculations)",
      howToUse: "A doctor will perform a minor procedure.",
      timeToWork:
        "As there is some remnant sperm remaining, the man is not considered sterile until he has produced sperm-free ejaculates which requires around 15-20 ejaculations which can take around 8-16 weeks. Until it is confirmed that the semen has no sperm, alternative forms of contraception should be used to prevent pregnancy.",
      sideNotes:
        "A semen analysis is done after 8 to 16 weeks to confirm that the semen has no sperm. Confirmation is achieved once 2 semen samples are negative for sperm.",
    },
    "lactational-amenorrhea": {
      name: "Lactational Amenorrhea Method",
      shortName: "LAM",
      description:
        "The act of breastfeeding changes the body's hormone balance in a way that you cannot get pregnant. This method only works for breastfeeding women and can be a very good contraceptive in the first 6 months of breastfeeding.",
      efficacy: {
        label: "Excellent",
        typicalUse:
          "With typical use the chance of pregnancy is 2%. Meaning that 2 in 100 women will become pregnant in one year when LAM criteria are followed under real-life conditions.",
        perfectUse:
          "With perfect use the chance of pregnancy is 2%. Meaning that 2 in 100 women will become pregnant if all LAM conditions are strictly met.",
      },
      advantages_0: "It can be used immediately after childbirth",
      advantages_1: "Periods are absent during the course of breastfeeding",
      advantages_2:
        "The process of returning to the normal stage after pregnancy is quicker",
      disadvantages_0: "May be inconvenient",
      disadvantages_1:
        "It is difficult to predict when your fertility will return. Usually after 6 months, but can also occur before this time",
      howToUse:
        "A minimum exclusive breastfeeding frequency of every 4 hours during the day and every 6 hours at night.",
      timeToWork: "Effective immediately after birth.",
      conditionsRequired_0:
        "Breastfeeding every 4 hours during the day and every 6 hours at night",
      conditionsRequired_1: "No supplementation of other foods or formula",
      conditionsRequired_2: "No return to menses",
      conditionsRequired_3:
        "The baby must be younger than 6 months for perfect use",
      sideNotes:
        "The efficacy of this method reduces after 6 months of delivery.",
    },
    "standard-days-method": {
      name: "Calendar Method",
      shortName: "Natural Family Planning",
      description:
        "To understand the calendar method, you need to understand the menstrual cycle. The ovaries in your body are responsible for producing eggs that can be potentially fertilized by sperm. The egg is released once a month, The method predicts when the egg is out and that you should avoid sexual intercourse during the days when the egg is potentially out. Once the egg is out, it can survive for up to 24 hours and the sperms can fertilize the eggs for up to 3 days. Since the menstrual cycle is different for every woman, the days when the egg is out may also vary. Hence why there is a calculator to determine the fertile window (days when the egg is possibly out and when the sperms can fertilize the egg).",
      efficacy: {
        label: "Good",
        typicalUse:
          "With typical use the chance of pregnancy is 19%. Meaning that 19 in 100 women will become pregnant in one year with usual use.",
        perfectUse:
          "With perfect use the chance of pregnancy is 5%. Meaning that 5 in 100 women will become pregnant if used perfectly.",
      },
      advantages_0: "No side/adverse effects",
      advantages_1: "No cost",
      advantages_2:
        "May be the only method acceptable to couples for cultural or religious reasons",
      disadvantages_0: "There is a significant chance of pregnancy",
      disadvantages_1:
        "Will not work if you have irregular menstrual cycles",
      howToUse:
        "Keep track of your menstrual cycle and the days where fertility is likely using a calendar.",
      timeToWork: "Immediate",
      conditionsRequired_0:
        "Requires you to have regular menstrual cycles (cycle variation should not be more than 7 days). If your recent cycle took 28 days, the next one should occur not less than 21 days and no more than 35 days.",
      additionalInfo: {
        additionalMethods_0_title: "A. The Cervical Mucus Method",
        additionalMethods_0_description:
          "The cervix is door of the womb. It normally produces mucus to lubricate the vagina. The mucus thickness is maximum when the egg is out hence Intercourse is allowed 4 days after the maximal cervical mucus until menstruation as within this period the egg is probably dead.",
        additionalMethods_1_title: "B. The Symptothermal Method",
        additionalMethods_1_description:
          "When the egg is out, the body temperature also rises. Temperature rise typically ranges between 0.2 and 0.5°C. Intercourse may be safe three days after the temperature elevation begins until the next period.",
      },
    },
    "standard-days-method-sdm": {
      name: "Standard Days Method",
      shortName: "SDM",
      description:
        "The Standard Days Method (SDM) is a fertility awareness-based method for women with regular menstrual cycles of 26–32 days, helping identify fertile and safe days to prevent pregnancy. It assumes ovulation occurs mid-cycle, with days 8–19 considered fertile; couples avoid unprotected sex during this period. The method involves counting from the first day of menstrual bleeding to track fertile and non-fertile days accurately.",
      efficacy: {
        label: "Good",
        typicalUse:
          "With typical use the chance of pregnancy is 13%. Meaning that 13 in 100 women will become pregnant with usual use.",
        perfectUse:
          "With perfect use the chance of pregnancy is 5%. Meaning that 5 in 100 women will become pregnant if used correctly every cycle.",
      },
      advantages_0: "No side/adverse effects",
      advantages_1: "No cost",
      advantages_2:
        "Can be acceptable for couples for cultural or religious reasons",
      advantages_3: "Easy to use with consistent menstrual cycles",
      disadvantages_0: "There is a notable chance of pregnancy",
      disadvantages_1:
        "Not effective for women with irregular menstrual cycles",
      disadvantages_2:
        "Requires daily attention to the menstrual cycle and careful tracking",
      howToUse:
        "Track your menstrual cycle using a calendar or app. Identify days 8–19 as fertile days and avoid unprotected sex during this period. Days 1–7 and from day 20 onwards are considered safer for intercourse.",
      timeToWork: "Immediate",
      conditionsRequired_0:
        "Regular menstrual cycles (length between 26–32 days)",
      conditionsRequired_1: "Consistent tracking of cycle days",
      sideNotes:
        "Since the fertile window may vary slightly among women, combining SDM with additional fertility indicators can improve effectiveness: monitoring cervical mucus changes (sticky, clear, egg-white mucus indicates fertility), observing basal body temperature shifts (temperature rises slightly after ovulation), and using ovulation predictor kits (optional for better accuracy).",
      additionalInfo: {
        additionalMethods_0_title: "Monitoring Cervical Mucus Changes",
        additionalMethods_0_description:
          "Sticky, clear, egg-white mucus indicates fertility. This can help identify when ovulation is occurring and improve the accuracy of the Standard Days Method.",
        additionalMethods_1_title: "Observing Basal Body Temperature Shifts",
        additionalMethods_1_description:
          "Temperature rises slightly after ovulation (typically ranges between 0.2 and 0.5°C). Tracking this can provide additional confirmation of your fertile window.",
        additionalMethods_2_title: "Using Ovulation Predictor Kits",
        additionalMethods_2_description:
          "Optional for better accuracy. These kits detect the surge in luteinizing hormone that occurs before ovulation, providing more precise timing of your fertile period.",
      },
    },
  },
} as const;
