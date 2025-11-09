/**
 * Comprehensive contraceptive methods data
 * This file contains all contraceptive methods with their complete details
 * extracted from individual method pages.
 */

export interface ContraceptiveMethodData {
  id: string;
  name: string;
  shortName?: string;
  category: 'hormonal' | 'non-hormonal' | 'barrier' | 'permanent' | 'natural';
  icon: string;
  description: string;
  efficacy: {
    label: 'Good' | 'Excellent' | 'Perfect';
    typicalUse: string;
    perfectUse?: string;
  };
  advantages: string[];
  disadvantages: string[];
  howToUse: string;
  timeToWork: string;
  sideNotes?: string;
  commonErrors?: string[];
  conditionsRequired?: string[];
  additionalInfo?: {
    subtitle?: string;
    timeOfOnset?: string;
    warning?: string;
    additionalMethods?: {
      title: string;
      description: string;
    }[];
  };
}

export const CONTRACEPTIVE_METHODS_DATA: ContraceptiveMethodData[] = [
  {
    id: 'male-condom',
    name: 'Male Condom',
    category: 'barrier',
    icon: '🛡️',
    description: 'A male condom is a thin sheath that is placed over the glans (the end part) and the shaft of the penis of your sexual partner before any vaginal insertion. A physical barrier method that prevents pregnancy and protects against STDs',
    efficacy: {
      label: 'Good',
      typicalUse: 'With typical use the chance of pregnancy is 13%. Meaning that out of 100 women who use this method normally, there is a chance that 13 of them will become pregnant.',
      perfectUse: 'With perfect use the chance of pregnancy is 2%. Meaning that out of 100 women who use this method perfectly, there is a chance that 2 of them will become pregnant.',
    },
    advantages: [
      'Available easily',
      'Cheap',
      'Protects against Sexually Transmitted Diseases (STDs)',
    ],
    disadvantages: [
      "Can't be used in patients with latex allergy",
    ],
    howToUse: 'First check the expiry date and package for damage, then carefully open it with your fingers. Put it on only when the penis is fully erect, making sure the rim is on the outside. Pinch the tip to leave space for semen and roll it down smoothly to the base, keeping air out. If needed, use water-based or silicone-based lubricant (never oil with latex). During sex, make sure it stays in place, and after ejaculation withdraw while still erect, holding the base to prevent slipping. Tie or wrap the used condom and throw it in the trash—never reuse or flush it. Always use a new condom each time; don\'t double up.',
    timeToWork: 'Immediate',
    sideNotes: 'A male and a female condom should not be used at the same time.',
    commonErrors: [
      'Inconsistent use (a new condom should be used after every ejaculation)',
      'Using oil-based lubricants for latex condoms',
      'Incorrect placement of condom',
    ],
    additionalInfo: {
      warning: 'If the condom breaks, consider emergency contraception or HIV PEP depending on the situation.',
    },
  },
  {
    id: 'female-condom',
    name: 'Female Condom',
    category: 'barrier',
    icon: '🛡️',
    description: 'To be worn by the female during each coital act. Contains 2 flexible rings; 1 closed for insertion and the other open.',
    efficacy: {
      label: 'Good',
      typicalUse: 'With typical use the chance of pregnancy is 21%. Meaning that out of 100 women who use this method normally, there is a chance that 21 of them will become pregnant.',
      perfectUse: 'With perfect use the chance of pregnancy is 5%. Meaning that out of 100 women who use this method perfectly, there is a chance that 5 of them will become pregnant.',
    },
    advantages: [
      'Does not deteriorate with oil-based lubricants',
      'Provides some protection to the labia and the base of the penis during intercourse',
    ],
    disadvantages: [
      'Difficult placement',
      'Inner ring can cause discomfort',
      'If placed for a long duration it can result in a urinary tract infection (UTI)',
    ],
    howToUse: 'First check the expiry date and package, then carefully open it. Squeeze the inner ring at the closed end, insert it into the vagina like a tampon, and push it up until the ring rests behind the pubic bone while the outer ring stays outside covering the vulva. Guide the penis into the condom during sex to prevent it slipping to the side. After intercourse, twist the outer ring to keep semen inside and gently pull it out before standing up. Dispose of it in the trash—never flush or reuse. Female condoms can be inserted just before or even several hours before sex.',
    timeToWork: 'Immediate',
    sideNotes: 'Simultaneous use of both the female and male condom is NOT recommended because either of them can slip out during sexual intercourse.',
  },
  {
    id: 'coc',
    name: 'Combined Oral Contraceptives',
    shortName: 'COC',
    category: 'hormonal',
    icon: '💊',
    description: 'As the name suggests, these are combined oral contraceptives (COCs) meaning that these are pills containing both estrogen and progesterone hormone.',
    efficacy: {
      label: 'Excellent',
      typicalUse: 'With typical use; 93% (93 in 100 women) will not become pregnant while using COC. With perfect use (daily adherence) almost no women will become pregnant while being on COC.',
    },
    advantages: [
      'Regular and predictable menses',
      'Reduced occurrence of mittelschmerz (lower abdomen pain that occurs mid cycle)',
      'Increased iron stores for women with heavy menstrual bleeding',
      'Reduced chances of developing an ovarian cyst, ovarian cancer and uterus cancer',
      'Good cosmetic effects (reduced acne and facial hair)',
    ],
    disadvantages: [
      'Estrogen related side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)',
      'Need to take pill daily',
    ],
    howToUse: 'You need to go to clinic every month to collect your 1-month pills. You get a total of 28 pills. 21 of those have contraceptive hormones and 7 of them are iron supplements. You need to first complete the 21 pills, taking once daily for 21 days. Then on day 22 to day 28, you need to take only the iron supplements to allow your period to occur. Then on day 29 a new cycle will start; you\'ll take the hormonal pills again for 21 days and finish up with the iron supplements. This cycle repeats.',
    timeToWork: 'If started within first 5 days of menstrual cycle (bleeding days) then the pills will start working immediately. If started after the first five days of menstrual cycle, then use backup contraception e.g. condom or abstain from sex for 7 days whilst you\'re continuing to take pills.',
    sideNotes: 'If you miss 1 pill, take the pill as soon as you remember and follow it with the regularly scheduled pill. If you have missed 2 or more consecutive pills, then use a backup contraception method of contraception for 7 days. If you have missed your pills between day 21 and 28. Then no need stress on it, as pills within this time are iron supplements, however if you miss a hormonal pill then you\'ve to follow the above steps. After stopping the pills, fertility usually returns in 1 month but can take up to 3 months.',
  },
  {
    id: 'pop',
    name: 'Progestin Only Pills',
    shortName: 'POP',
    category: 'hormonal',
    icon: '💊',
    description: 'As the name suggests; these are Progestin Only Pills (POP) meaning that these are pills containing the progesterone hormone only (no estrogen).',
    efficacy: {
      label: 'Excellent',
      typicalUse: 'With typical use; 93% (93 in 100 women) will not become pregnant while using POP. With perfect use (daily timely adherence) almost no women will become pregnant while being on POPs.',
    },
    advantages: [
      'No high estrogen side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)',
      'Less painful periods',
      'Immediate return of fertility after stopping',
    ],
    disadvantages: [
      'Compliance to take pills daily',
      'Progesterone related side effects (mood changes, acne, irregular menstrual bleeding) and complications (bone weakness)',
      'Unscheduled bleeding and spotting',
    ],
    howToUse: 'Take 1 pill a day. Pill needs to be taken at same time every day.',
    timeToWork: 'If started within first 5 days of menstrual cycle, then the pills will start working immediately. If started after the first five days of menstrual then use backup contraception e.g. condom or abstain from sex for the next 2 days while you\'re continuing taking the pills.',
    sideNotes: 'If breastfeeding. start 6 weeks after childbirth. If the pill is taken more than 3 hours late then use condom/abstain from sex for the next 2 days and keep taking pills.',
  },
  {
    id: 'copper-iucd',
    name: 'Copper IUCD',
    shortName: 'Intrauterine Copper Device',
    category: 'non-hormonal',
    icon: '🔧',
    description: 'A small T-shaped device made of plastic and wrapped in copper that will be placed inside the uterus by a healthcare provider. Copper prevents pregnancy by stopping the sperms from swimming and combining with the egg, but even if the egg has combined by chance, then copper will also prevent it from growing further.',
    efficacy: {
      label: 'Perfect',
      typicalUse: 'Almost none of the women will become pregnant when inserted with Copper IUCD.',
    },
    advantages: [
      'The effect lasts longer (from 5 to 12 years depending on the model)',
      'Easily reversible (fertility resumes immediately after removal of copper IUCD)',
      'Can be inserted immediately after delivery',
    ],
    disadvantages: [
      'Risk of injuring uterus at time of insertion',
      'If a pregnancy does occur it is more likely to be ectopic (the fetus grows in a place apart from the uterus)',
      'Periods may become heavier, longer, and more crampy',
      'Cannot be used in people allergic to copper',
    ],
    howToUse: 'A healthcare provider will insert this small device into the uterus through the vagina.',
    timeToWork: 'Works immediately if inserted within 5 days of the start of your menstrual period. If inserted at other times in the cycle, backup contraception (e.g., condoms) is recommended for 7 days.',
    sideNotes: 'The IUCD can stay for 5 to 12 years however if you want to get it removed, you can do so anytime you want.',
    additionalInfo: {
      timeOfOnset: 'Works immediately if inserted within 5 days of the start of your menstrual period. If inserted at other times in the cycle, backup contraception (e.g., condoms) is recommended for 7 days.',
    },
  },
  {
    id: 'contraceptive-vaginal-ring',
    name: 'Contraceptive Vaginal Ring',
    category: 'hormonal',
    icon: '💍',
    description: 'The contraceptive vaginal ring is a small, soft, flexible plastic ring (about 5–6 cm wide) that a woman puts inside her vagina once a month. The ring slowly releases two hormones (estrogen and progestin) which prevent pregnancy from occurring.',
    efficacy: {
      label: 'Excellent',
      typicalUse: 'With typical use; 91% (91 in 100 women) will not become pregnant while using contraceptive vaginal ring. With perfect use almost no women will become pregnant while using contraceptive vaginal ring.',
    },
    advantages: [
      'Works are relatively longer than pills so no need to change every day',
      'Can be used in a person with regular nausea/malabsorption diseases',
      'Less breast tenderness, and mood swings compared with some oral contraceptives',
    ],
    disadvantages: [
      'Can cause vaginal irritation or discharge',
      'Can slip accidentally',
    ],
    howToUse: 'Insert the hormonal ring into vagina and leave it in place for the first 3 weeks, then remove the ring for 1 week. New ring applied in week 5.',
    timeToWork: 'If started within first 5 days of menstrual cycle (bleeding days) then the ring will start working immediately. If started after the first five days of menstrual cycle, then use backup contraception e.g. condom or abstain from sex for 7 days whilst you\'re continuing to use ring patch.',
    sideNotes: 'If the ring falls out, rinse with cool/warm water and reinsert. If ring is off for more than 3 hours, then use a backup contraception method of contraception for 7 days while still using the ring.',
  },
  {
    id: 'contraceptive-injection',
    name: 'Contraceptive Injections',
    shortName: 'DMPA',
    category: 'hormonal',
    icon: '💉',
    description: 'The contraceptive injection contains DMPA which is a progestin hormone (no estrogen). The hormone works by preventing the egg from released by the ovaries, it also thickens the mucus released by the cervix making it difficult for the sperms to enter the womb, it also thins out the endometrium (the part responsible for growing and maintaining an embryo).',
    efficacy: {
      label: 'Excellent',
      typicalUse: 'Less than 1 in 100 women will become pregnant.',
    },
    advantages: [
      'No high estrogen side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)',
      'Can be used during breastfeeding',
      'Less painful periods',
    ],
    disadvantages: [
      'Progesterone related side effects (mood changes, acne, irregular menstrual bleeding) and complications (bone weakness)',
      'Irregular periods',
      'Requires visits to the hospital every 3mo for injection',
      'Delayed return to fertility (it will take an average of 10 months after the last injection to become fertile again)',
    ],
    howToUse: 'A healthcare provider will inject the hormone into your upper arm or buttock. Since the effect of the injection lasts 3 months, you need to come back to your healthcare provider for the injection again after 3 months.',
    timeToWork: 'The contraceptive injection starts working right away if given within the first 7 days of a woman\'s period, but if given later in the cycle, an extra method (like condoms or abstinence) is needed for 7 days. After childbirth, breastfeeding women should start injections only after 6 weeks, at which point protection begins immediately. For non-breastfeeding women, if the injection is given within 21 days of delivery it works immediately, but if started after 21 days, 7 days of backup contraception are needed before full protection is established.',
    sideNotes: 'None',
  },
  {
    id: 'combination-patch',
    name: 'Combination Patch Contraceptive',
    category: 'hormonal',
    icon: '🩹',
    description: 'A transdermal patch is like a small sticker that you place on your skin. It slowly releases hormones (estrogen and progesterone) through your skin and into your blood over time.',
    efficacy: {
      label: 'Excellent',
      typicalUse: 'With typical use; 93% (93 in 100 women) will not become pregnant while using Combination patch contraceptive. With perfect use almost no women will become pregnant while on combination patch contraceptive.',
    },
    advantages: [
      'Works relatively longer than pills',
      'Easy to use',
      'Regular predictable menses',
    ],
    disadvantages: [
      'Estrogen related side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)',
      'Need to remember to change',
    ],
    howToUse: 'Stick the patch into the outer upper arm/stomach and leave it in place for the first 3 weeks, then remove the patch for 1 week. New patch applied in week 5.',
    timeToWork: 'If started within first 5 days of menstrual cycle (bleeding days) then the patch will start working immediately. If started after the first five days of menstrual cycle, then use backup contraception e.g. condom or abstain from sex for 7 days whilst you\'re continuing to use the patch.',
    sideNotes: 'If patch is off for more than 48 hours then use a backup method of contraception for 7 days while still using the patch.',
  },
  {
    id: 'implants',
    name: 'Implants',
    category: 'hormonal',
    icon: '🔧',
    description: 'A contraceptive implant is a tiny, flexible rod (about the size of a matchstick) that a healthcare provider puts under the skin of your upper arm. It releases a hormone called progestin slowly into your body over time. The hormone works by preventing the egg from released by the ovaries, it also thickens the mucus released by the cervix making it difficult for the sperms to enter the womb, it also thins out the endometrium (the part responsible for growing and maintaining an embryo).',
    efficacy: {
      label: 'Perfect',
      typicalUse: 'The chance of pregnancy is 0.15% for at least 3 years. Meaning almost no women will get pregnant when using this method.',
    },
    advantages: [
      'Longevity',
      'No high estrogen side effects (nausea, headache, breast tenderness) and complications (breast cancer, gallstones, clot formation in blood vessels)',
      'No effect on breastfeeding',
      'Prompt return to the previous state of fertility occurs upon removal',
    ],
    disadvantages: [
      'Menstrual irregularities',
      'Progesterone related side effects (mood changes, acne, irregular menstrual bleeding) and complications (bone weakness)',
      'Minor procedure is necessary for removal',
    ],
    howToUse: 'After the implant being placed by a healthcare provider. You don\'t have to do anything, just record the date of insertion. The implant will last for around 3 to 5 years. Your healthcare provider will tell you when to come back for removal.',
    timeToWork: 'Contraception begins 24h after insertion if inserted during the first five days of the menstrual cycle. If inserted after the first five days of menstrual cycle, then use backup contraception e.g. male condom for the sexual partner for 7 days after insertion.',
    sideNotes: 'The implant can stay for 3 to 5 years however if you want to get it removed, you can do so anytime you want.',
  },
  {
    id: 'lng-ius',
    name: 'LNG-IUS',
    shortName: 'Levonorgestrel Intrauterine System',
    category: 'hormonal',
    icon: '🔧',
    description: 'A small, T-shaped plastic device that is placed inside the uterus. It slowly releases levonorgestrel, a type of hormone similar to progesterone. The hormone thickens your cervical mucus so that the sperm cannot enter and also thins out the inner lining of your uterus making a difficult environment for the baby to grow.',
    efficacy: {
      label: 'Perfect',
      typicalUse: 'Almost no women will become pregnant while on a LNG-IUS.',
    },
    advantages: [
      'Lasts longer (depending on the brand, it can last for 3 to 5 years)',
      'Decreased menstrual blood loss, reduced menstrual pain',
      'Reduced risk of uterus and ovarian cancer',
      'Quick return to fertility after removal (usually the next cycle)',
    ],
    disadvantages: [
      'Risk of injuring uterus at time of insertion',
      'If a pregnancy does occur it is more likely to be ectopic (the fetus grows in a place apart from the uterus)',
    ],
    howToUse: 'A healthcare provider will insert this small device into the uterus through the vagina.',
    timeToWork: 'Works immediately if inserted within 5 days of the start of your menstrual period. If inserted at other times in the cycle, backup contraception (e.g., condoms) is recommended for 7 days.',
    sideNotes: 'The LNG-IUS can stay for 5 to 12 years however if you want to get it removed, you can do so anytime you want.',
  },
  {
    id: 'tubal-ligation',
    name: 'Tubal Ligation',
    shortName: 'Female Sterilization',
    category: 'permanent',
    icon: '🔒',
    description: 'A surgical procedure whereby the fallopian tubes are tied and hence blocked. This blocks the road for the sperm to reach the egg.',
    efficacy: {
      label: 'Perfect',
      typicalUse: 'Almost all of the women after this procedure will no longer be able to get pregnant.',
    },
    advantages: [
      'No hormonal related side effects',
    ],
    disadvantages: [
      'Usually permanent, so returning to fertility is not possible',
      'Exposure to general anesthesia and surgery related risks',
    ],
    howToUse: 'A doctor will perform a minor procedure.',
    timeToWork: 'Immediate',
    sideNotes: 'None',
  },
  {
    id: 'vasectomy',
    name: 'Vasectomy',
    shortName: 'Male Sterilization',
    category: 'permanent',
    icon: '🔒',
    description: 'A vasectomy is a permanent male sterilization procedure where the vas deferens (tubes that carry sperm from the testicles to the semen) are cut, tied, or sealed, so sperm cannot mix with semen. The testicles still produce sperm, but the sperm cannot leave the body.',
    efficacy: {
      label: 'Perfect',
      typicalUse: 'Almost all the men after this procedure will no longer be able to make a woman pregnant.',
    },
    advantages: [
      'No hormonal related side effects',
    ],
    disadvantages: [
      'Usually permanent, so returning to fertility is not possible',
      'Medical risks of surgery',
      'Alternative contraception is required until the ejaculate is confirmed to have no sperm (usually takes around 15-20 ejaculations)',
    ],
    howToUse: 'A doctor will perform a minor procedure.',
    timeToWork: 'As there is some remnant sperm remaining, the man is not considered sterile until he has produced sperm-free ejaculates which requires around 15-20 ejaculations which can take around 8-16 weeks. Until it is confirmed that the semen has no sperm, alternative forms of contraception should be used to prevent pregnancy.',
    sideNotes: 'A semen analysis is done after 8 to 16 weeks to confirm that the semen has no sperm. Confirmation is achieved once 2 semen samples are negative for sperm.',
  },
  {
    id: 'lactational-amenorrhea',
    name: 'Lactational Amenorrhea Method',
    shortName: 'LAM',
    category: 'natural',
    icon: '🤱',
    description: 'The act of breastfeeding changes the body\'s hormone balance in a way that you cannot get pregnant. This method only works for breastfeeding women and can be a very good contraceptive in the first 6 months of breastfeeding.',
    efficacy: {
      label: 'Excellent',
      typicalUse: 'The perfect use failure rate is 2%. Meaning that there is a chance that 2 in 100 women will get pregnant if they use this method perfectly.',
    },
    advantages: [
      'It can be used immediately after childbirth',
      'Periods are absent during the course of breastfeeding',
      'The process of returning to the normal stage after pregnancy is quicker',
    ],
    disadvantages: [
      'May be inconvenient',
      'It is difficult to predict when your fertility will return. Usually after 6 months, but can also occur before this time',
    ],
    howToUse: 'A minimum exclusive breastfeeding frequency of every 4 hours during the day and every 6 hours at night.',
    timeToWork: 'Effective immediately after birth.',
    conditionsRequired: [
      'Breastfeeding every 4 hours during the day and every 6 hours at night',
      'No supplementation of other foods or formula',
      'No return to menses',
      'The baby must be younger than 6 months for perfect use',
    ],
    sideNotes: 'The efficacy of this method reduces after 6 months of delivery.',
  },
  {
    id: 'standard-days-method',
    name: 'Calendar Method',
    shortName: 'Natural Family Planning',
    category: 'natural',
    icon: '📅',
    description: 'To understand the calendar method, you need to understand the menstrual cycle. The ovaries in your body are responsible for producing eggs that can be potentially fertilized by sperm. The egg is released once a month, The method predicts when the egg is out and that you should avoid sexual intercourse during the days when the egg is potentially out. Once the egg is out, it can survive for up to 24 hours and the sperms can fertilize the eggs for up to 3 days. Since the menstrual cycle is different for every woman, the days when the egg is out may also vary. Hence why there is a calculator to determine the fertile window (days when the egg is possibly out and when the sperms can fertilize the egg).',
    efficacy: {
      label: 'Good',
      typicalUse: 'With typical use, the chance of pregnancy is 25%, meaning that 75 out of 100 women will not become pregnant if this method is used.',
      perfectUse: 'If perfectly used, the chance of pregnancy is 5%, meaning that 95 out of 100 women will not become pregnant if this method is used perfectly.',
    },
    advantages: [
      'No side/adverse effects',
      'No cost',
      'May be the only method acceptable to couples for cultural or religious reasons',
    ],
    disadvantages: [
      'There is a significant chance of pregnancy',
      'Will not work if you have irregular menstrual cycles',
    ],
    howToUse: 'Keep track of your menstrual cycle and the days where fertility is likely using a calendar.',
    timeToWork: 'Immediate',
    conditionsRequired: [
      'Requires you to have regular menstrual cycles (cycle variation should not be more than 7 days). If your recent cycle took 28 days, the next one should occur not less than 21 days and no more than 35 days.',
    ],
    additionalInfo: {
      additionalMethods: [
        {
          title: 'A. The Cervical Mucus Method',
          description: 'The cervix is door of the womb. It normally produces mucus to lubricate the vagina. The mucus thickness is maximum when the egg is out hence Intercourse is allowed 4 days after the maximal cervical mucus until menstruation as within this period the egg is probably dead.',
        },
        {
          title: 'B. The Symptothermal Method',
          description: 'When the egg is out, the body temperature also rises. Temperature rise typically ranges between 0.2 and 0.5°C. Intercourse may be safe three days after the temperature elevation begins until the next period.',
        },
      ],
    },
  },
  {
    id: 'standard-days-method-sdm',
    name: 'Standard Days Method',
    shortName: 'SDM',
    category: 'natural',
    icon: '📅',
    description: 'The Standard Days Method (SDM) is a fertility awareness-based method for women with regular menstrual cycles of 26–32 days, helping identify fertile and safe days to prevent pregnancy. It assumes ovulation occurs mid-cycle, with days 8–19 considered fertile; couples avoid unprotected sex during this period. The method involves counting from the first day of menstrual bleeding to track fertile and non-fertile days accurately.',
    efficacy: {
      label: 'Good',
      typicalUse: 'About 12% chance of pregnancy, meaning 88 out of 100 women will not become pregnant with usual use.',
      perfectUse: 'About 5% chance of pregnancy, meaning 95 out of 100 women will not become pregnant if this method is used correctly.',
    },
    advantages: [
      'No side/adverse effects',
      'No cost',
      'Can be acceptable for couples for cultural or religious reasons',
      'Easy to use with consistent menstrual cycles',
    ],
    disadvantages: [
      'There is a notable chance of pregnancy',
      'Not effective for women with irregular menstrual cycles',
      'Requires daily attention to the menstrual cycle and careful tracking',
    ],
    howToUse: 'Track your menstrual cycle using a calendar or app. Identify days 8–19 as fertile days and avoid unprotected sex during this period. Days 1–7 and from day 20 onwards are considered safer for intercourse.',
    timeToWork: 'Immediate',
    conditionsRequired: [
      'Regular menstrual cycles (length between 26–32 days)',
      'Consistent tracking of cycle days',
    ],
    sideNotes: 'Since the fertile window may vary slightly among women, combining SDM with additional fertility indicators can improve effectiveness: monitoring cervical mucus changes (sticky, clear, egg-white mucus indicates fertility), observing basal body temperature shifts (temperature rises slightly after ovulation), and using ovulation predictor kits (optional for better accuracy).',
    additionalInfo: {
      additionalMethods: [
        {
          title: 'Monitoring Cervical Mucus Changes',
          description: 'Sticky, clear, egg-white mucus indicates fertility. This can help identify when ovulation is occurring and improve the accuracy of the Standard Days Method.',
        },
        {
          title: 'Observing Basal Body Temperature Shifts',
          description: 'Temperature rises slightly after ovulation (typically ranges between 0.2 and 0.5°C). Tracking this can provide additional confirmation of your fertile window.',
        },
        {
          title: 'Using Ovulation Predictor Kits',
          description: 'Optional for better accuracy. These kits detect the surge in luteinizing hormone that occurs before ovulation, providing more precise timing of your fertile period.',
        },
      ],
    },
  },
];

/**
 * Get a contraceptive method by its ID
 */
export const getContraceptiveMethodById = (id: string): ContraceptiveMethodData | undefined => {
  return CONTRACEPTIVE_METHODS_DATA.find(method => method.id === id);
};

/**
 * Get all methods by category
 */
export const getMethodsByCategory = (
  category: ContraceptiveMethodData['category']
): ContraceptiveMethodData[] => {
  return CONTRACEPTIVE_METHODS_DATA.filter(method => method.category === category);
};

/**
 * Get all method IDs
 */
export const getAllMethodIds = (): string[] => {
  return CONTRACEPTIVE_METHODS_DATA.map(method => method.id);
};

