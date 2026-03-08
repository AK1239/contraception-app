import { useMemo } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTranslatedMethodsData } from "./useTranslatedMethodsData";
import type { MethodCategory, SpecificMethod } from "./useSearchableMethodList";

/**
 * Returns categories and specific methods for the Know Your Contraceptive index page.
 * Enables searching any contraceptive method directly from the main Know page.
 */
export function useKnowIndexData() {
  const router = useRouter();
  const { t } = useTranslation();
  const { getModernMethodsData } = useTranslatedMethodsData();

  return useMemo(() => {
    const categories: MethodCategory[] = [
      {
        id: "natural-methods",
        type: "category",
        title: t("knowContraceptive.naturalMethodsTitle"),
        description: t("knowContraceptive.naturalMethodsDescription"),
        icon: "🌿",
        onPress: () => router.push("/(drawer)/know-contraceptive/natural-methods"),
        backgroundColor: "#F0FDF4",
        buttonColor: "#10B981",
      },
      {
        id: "modern-methods",
        type: "category",
        title: t("knowContraceptive.modernMethodsTitle"),
        description: t("knowContraceptive.modernMethodsDescription"),
        icon: "💊",
        onPress: () => router.push("/(drawer)/know-contraceptive/modern-methods"),
        backgroundColor: "#F0F9FF",
        buttonColor: "#0EA5E9",
      },
      {
        id: "emergency-methods",
        type: "category",
        title: t("knowContraceptive.emergencyMethodsTitle"),
        description: t("knowContraceptive.emergencyMethodsDescription"),
        icon: "⏱️",
        onPress: () => router.push("/(drawer)/know-contraceptive/emergency-methods"),
        backgroundColor: "#EDE9FE",
        buttonColor: "#7C3AED",
      },
    ];

    const naturalMethods: SpecificMethod[] = [
      {
        id: "lactational-amenorrhea",
        type: "specific",
        title: t("knowContraceptive.lamTitle"),
        description: t("knowContraceptive.lamDescription"),
        breadcrumb: t("knowContraceptive.naturalMethodsTitle"),
        icon: "🤱",
        onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/lactational-amenorrhea"),
        backgroundColor: "#F0F9FF",
        buttonColor: "#0EA5E9",
      },
      {
        id: "standard-days-method",
        type: "specific",
        title: t("knowContraceptive.calendarTitle"),
        description: t("knowContraceptive.calendarDescription"),
        breadcrumb: t("knowContraceptive.naturalMethodsTitle"),
        icon: "📅",
        onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/standard-days-method"),
        backgroundColor: "#F0FDF4",
        buttonColor: "#10B981",
      },
      {
        id: "standard-days-method-sdm",
        type: "specific",
        title: t("knowContraceptive.sdmTitle"),
        description: t("knowContraceptive.sdmDescription"),
        breadcrumb: t("knowContraceptive.naturalMethodsTitle"),
        icon: "📅",
        onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/standard-days-method-sdm"),
        backgroundColor: "#FEF3C7",
        buttonColor: "#F59E0B",
      },
    ];

    const modernData = getModernMethodsData();
    const modernMethods: SpecificMethod[] = modernData.specificMethods.map((m) => ({
      ...m,
      breadcrumb: t("knowContraceptive.modernMethodsTitle"),
    }));

    const emergencyMethods: SpecificMethod[] = [
      {
        id: "levonorgestrel-ec",
        type: "specific",
        title: t("ecDescription.methods.levonorgestrel"),
        description: t("ecDescription.methods.levonorgestrelDesc"),
        breadcrumb: t("knowContraceptive.emergencyMethodsTitle"),
        icon: "💊",
        onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/levonorgestrel-ec"),
        backgroundColor: "#F0F9FF",
        buttonColor: "#0EA5E9",
      },
      {
        id: "ulipristal-acetate",
        type: "specific",
        title: t("ecDescription.methods.ulipristal"),
        description: t("ecDescription.methods.ulipristalDesc"),
        breadcrumb: t("knowContraceptive.emergencyMethodsTitle"),
        icon: "💊",
        onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/ulipristal-acetate"),
        backgroundColor: "#F0FDF4",
        buttonColor: "#10B981",
      },
      {
        id: "coc-yuzpe-ec",
        type: "specific",
        title: t("ecDescription.methods.yuzpe"),
        description: t("ecDescription.methods.yuzpeDesc"),
        breadcrumb: t("knowContraceptive.emergencyMethodsTitle"),
        icon: "💊",
        onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/coc-yuzpe-ec"),
        backgroundColor: "#FEF3C7",
        buttonColor: "#F59E0B",
      },
      {
        id: "copper-iud-emergency",
        type: "specific",
        title: t("ecDescription.methods.copperIud"),
        description: t("ecDescription.methods.copperIudDesc"),
        breadcrumb: t("knowContraceptive.emergencyMethodsTitle"),
        icon: "🔧",
        onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/copper-iud-emergency"),
        backgroundColor: "#F0FDF4",
        buttonColor: "#059669",
      },
    ];

    const specificMethods: SpecificMethod[] = [
      ...naturalMethods,
      ...modernMethods,
      ...emergencyMethods,
    ];

    return { categories, specificMethods };
  }, [router, t, getModernMethodsData]);
}
