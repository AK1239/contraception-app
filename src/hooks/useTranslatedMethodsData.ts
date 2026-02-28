import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { getModernMethodsData, getTemporaryMethodsData } from "../data/methodsData";

type MethodId =
  | "male-condom"
  | "female-condom"
  | "coc"
  | "pop"
  | "injection"
  | "implants"
  | "patch"
  | "ring"
  | "copper-iucd"
  | "lng-ius"
  | "tubal-ligation"
  | "vasectomy";

type CategoryId = "temporary" | "permanent" | "barrier" | "hormonal" | "iud";

export function useTranslatedMethodsData() {
  const { t } = useTranslation();
  const router = useRouter();

  const getModernMethodsDataTranslated = () => {
    const raw = getModernMethodsData(router);
    return {
      categories: raw.categories.map((cat) => ({
        ...cat,
        title: t(`knowContraceptive.methodsData.categories.${cat.id as CategoryId}.title`),
        description: t(`knowContraceptive.methodsData.categories.${cat.id as CategoryId}.description`),
      })),
      specificMethods: raw.specificMethods.map((m) => ({
        ...m,
        title: t(`knowContraceptive.methodsData.specificMethods.${m.id as MethodId}.title`),
        description: t(`knowContraceptive.methodsData.specificMethods.${m.id as MethodId}.description`),
        breadcrumb: t(`knowContraceptive.methodsData.specificMethods.${m.id as MethodId}.breadcrumbModern`),
      })),
    };
  };

  const getTemporaryMethodsDataTranslated = (TShapeIcon: React.ReactElement) => {
    const raw = getTemporaryMethodsData(router, TShapeIcon);
    return {
      categories: raw.categories.map((cat) => ({
        ...cat,
        title: t(`knowContraceptive.methodsData.categories.${cat.id as CategoryId}.title`),
        description: t(`knowContraceptive.methodsData.categories.${cat.id as CategoryId}.description`),
      })),
      specificMethods: raw.specificMethods.map((m) => ({
        ...m,
        title: t(`knowContraceptive.methodsData.specificMethods.${m.id as MethodId}.title`),
        description: t(`knowContraceptive.methodsData.specificMethods.${m.id as MethodId}.description`),
        breadcrumb: t(`knowContraceptive.methodsData.specificMethods.${m.id as MethodId}.breadcrumbTemporary`),
      })),
    };
  };

  return {
    getModernMethodsData: getModernMethodsDataTranslated,
    getTemporaryMethodsData: getTemporaryMethodsDataTranslated,
    searchTemporaryPlaceholder: t("knowContraceptive.methodsData.searchTemporary"),
    noResultsTemporary: t("knowContraceptive.methodsData.noResultsTemporary"),
  };
}
