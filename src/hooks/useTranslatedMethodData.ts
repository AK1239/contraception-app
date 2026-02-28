import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  CONTRACEPTIVE_METHODS_DATA,
  getContraceptiveMethodById,
} from "../utils/contraceptiveMethodsData";
import { getMethodByKey } from "../constants/contraceptiveMethods";
import type { ContraceptiveMethodData } from "../utils/contraceptiveMethodsData";
import type { ContraceptiveMethod } from "../types/contraceptive";
import type { ContraceptiveMethodKey } from "../types/contraceptive";

/**
 * Helper to resolve translated array (advantages_0, advantages_1, ...)
 */
function getTranslatedArray(
  t: (key: string) => string,
  baseKey: string,
  original: string[]
): string[] {
  return original.map((item, i) => {
    const key = `${baseKey}_${i}`;
    const translated = t(key);
    return translated !== key ? translated : item;
  });
}

/**
 * Returns contraceptive method data with all user-facing strings translated.
 */
export function useTranslatedMethodData() {
  const { t } = useTranslation();

  const translateMethodData = useCallback(
    (method: ContraceptiveMethodData): ContraceptiveMethodData => {
      const id = method.id;
      const base = `methods.detail.${id}`;

      const advantages = getTranslatedArray(
        t,
        `${base}.advantages`,
        method.advantages
      );
      const disadvantages = getTranslatedArray(
        t,
        `${base}.disadvantages`,
        method.disadvantages
      );
      const commonErrors = method.commonErrors
        ? getTranslatedArray(t, `${base}.commonErrors`, method.commonErrors)
        : undefined;
      const conditionsRequired = method.conditionsRequired
        ? getTranslatedArray(
            t,
            `${base}.conditionsRequired`,
            method.conditionsRequired
          )
        : undefined;

      const efficacyLabel = method.efficacy.label;
      const displayEfficacyLabel =
        t(`methods.efficacyLabels.${efficacyLabel}`) !==
        `methods.efficacyLabels.${efficacyLabel}`
          ? t(`methods.efficacyLabels.${efficacyLabel}`)
          : efficacyLabel;

      const additionalInfo = method.additionalInfo
        ? {
            ...method.additionalInfo,
            subtitle: method.additionalInfo.subtitle,
            timeOfOnset: method.additionalInfo.timeOfOnset
              ? t(`${base}.additionalInfo.timeOfOnset`) !==
                `${base}.additionalInfo.timeOfOnset`
                ? t(`${base}.additionalInfo.timeOfOnset`)
                : method.additionalInfo.timeOfOnset
              : undefined,
            warning: method.additionalInfo.warning
              ? t(`${base}.additionalInfo.warning`) !==
                `${base}.additionalInfo.warning`
                ? t(`${base}.additionalInfo.warning`)
                : method.additionalInfo.warning
              : undefined,
            additionalMethods: method.additionalInfo.additionalMethods?.map(
              (am, idx) => {
                const titleKey = `${base}.additionalInfo.additionalMethods_${idx}_title`;
                const descKey = `${base}.additionalInfo.additionalMethods_${idx}_description`;
                return {
                  title: t(titleKey) !== titleKey ? t(titleKey) : am.title,
                  description:
                    t(descKey) !== descKey ? t(descKey) : am.description,
                };
              }
            ),
          }
        : undefined;

      return {
        ...method,
        name: t(`${base}.name`) !== `${base}.name` ? t(`${base}.name`) : method.name,
        shortName:
          method.shortName && t(`${base}.shortName`) !== `${base}.shortName`
            ? t(`${base}.shortName`)
            : method.shortName,
        description:
          t(`${base}.description`) !== `${base}.description`
            ? t(`${base}.description`)
            : method.description,
        category: method.category,
        efficacy: {
          ...method.efficacy,
          label: method.efficacy.label,
          displayLabel: displayEfficacyLabel,
          typicalUse:
            t(`${base}.efficacy.typicalUse`) !== `${base}.efficacy.typicalUse`
              ? t(`${base}.efficacy.typicalUse`)
              : method.efficacy.typicalUse,
          perfectUse: method.efficacy.perfectUse
            ? t(`${base}.efficacy.perfectUse`) !== `${base}.efficacy.perfectUse`
              ? t(`${base}.efficacy.perfectUse`)
              : method.efficacy.perfectUse
            : undefined,
        },
        advantages,
        disadvantages,
        howToUse:
          t(`${base}.howToUse`) !== `${base}.howToUse`
            ? t(`${base}.howToUse`)
            : method.howToUse,
        timeToWork:
          t(`${base}.timeToWork`) !== `${base}.timeToWork`
            ? t(`${base}.timeToWork`)
            : method.timeToWork,
        sideNotes:
          method.sideNotes && method.sideNotes !== "None"
            ? t(`${base}.sideNotes`) !== `${base}.sideNotes`
              ? t(`${base}.sideNotes`)
              : method.sideNotes
            : method.sideNotes,
        commonErrors,
        conditionsRequired,
        additionalInfo,
      };
    },
    [t]
  );

  const getTranslatedMethodById = useCallback(
    (id: string): ContraceptiveMethodData | undefined => {
      const method = getContraceptiveMethodById(id);
      return method ? translateMethodData(method) : undefined;
    },
    [translateMethodData]
  );

  const translatedMethodsData = useMemo(
    () => CONTRACEPTIVE_METHODS_DATA.map(translateMethodData),
    [translateMethodData]
  );

  const getTranslatedMethodByKey = useCallback(
    (key: ContraceptiveMethodKey): ContraceptiveMethod | undefined => {
      const method = getMethodByKey(key);
      if (!method) return undefined;
      const mecName = t(`methods.mec.${key}`);
      const mecDesc = t(`methods.mecDesc.${key}`);
      return {
        ...method,
        name: mecName !== `methods.mec.${key}` ? mecName : method.name,
        shortName: method.shortName,
        description: mecDesc !== `methods.mecDesc.${key}` ? mecDesc : method.description,
        category: method.category,
      };
    },
    [t]
  );

  const getTranslatedMecMethodName = useCallback(
    (key: ContraceptiveMethodKey): string => {
      const name = t(`methods.mec.${key}`);
      return name !== `methods.mec.${key}` ? name : key;
    },
    [t]
  );

  return {
    getTranslatedMethodById,
    getTranslatedMethodByKey,
    getTranslatedMecMethodName,
    translatedMethodsData,
    translateMethodData,
  };
}
