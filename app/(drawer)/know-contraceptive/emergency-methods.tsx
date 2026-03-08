import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import NaturalMethodCard from "../../../src/components/NaturalMethodCard";
import { useSearchableMethodList } from "../../../src/hooks/useSearchableMethodList";

export default function EmergencyMethodsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const allMethods = [
    {
      id: "ec-overview",
      type: "category" as const,
      title: t("ecDescription.overview.cardTitle"),
      description: t("ecDescription.overview.cardDescription"),
      icon: "📋",
      onPress: () => router.push("/(drawer)/know-contraceptive/emergency-overview"),
      backgroundColor: "#EDE9FE",
      buttonColor: "#7C3AED",
    },
    {
      id: "levonorgestrel-ec",
      type: "category" as const,
      title: t("ecDescription.methods.levonorgestrel"),
      description: t("ecDescription.methods.levonorgestrelDesc"),
      icon: "💊",
      onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/levonorgestrel-ec"),
      backgroundColor: "#F0F9FF",
      buttonColor: "#0EA5E9",
    },
    {
      id: "ulipristal-acetate",
      type: "category" as const,
      title: t("ecDescription.methods.ulipristal"),
      description: t("ecDescription.methods.ulipristalDesc"),
      icon: "💊",
      onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/ulipristal-acetate"),
      backgroundColor: "#F0FDF4",
      buttonColor: "#10B981",
    },
    {
      id: "coc-yuzpe-ec",
      type: "category" as const,
      title: t("ecDescription.methods.yuzpe"),
      description: t("ecDescription.methods.yuzpeDesc"),
      icon: "💊",
      onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/coc-yuzpe-ec"),
      backgroundColor: "#FEF3C7",
      buttonColor: "#F59E0B",
    },
    {
      id: "copper-iud-emergency",
      type: "category" as const,
      title: t("ecDescription.methods.copperIud"),
      description: t("ecDescription.methods.copperIudDesc"),
      icon: "🔧",
      onPress: () => router.push("/(drawer)/know-contraceptive/contraceptive-method/copper-iud-emergency"),
      backgroundColor: "#F0FDF4",
      buttonColor: "#059669",
    },
  ];

  const {
    filteredCategories,
    searchQuery,
    setSearchQuery,
  } = useSearchableMethodList(allMethods);

  return (
    <ScrollView
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t("knowContraceptive.searchEmergency")}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#6B7280"
        />
      </View>

      <View style={styles.methodsContainer}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((method) => (
            <NaturalMethodCard
              key={method.id}
              title={method.title}
              description={method.description}
              icon={typeof method.icon === "string" ? method.icon : "📋"}
              onKnowMorePress={method.onPress}
              backgroundColor={method.backgroundColor}
              buttonColor={method.buttonColor}
            />
          ))
        ) : (
          searchQuery.trim() && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>{t("knowContraceptive.noMethodsFound")}</Text>
              <Text style={styles.noResultsSubtext}>{t("knowContraceptive.noMethodsHintEmergency")}</Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
  },
  searchInput: {
    fontSize: 14,
  },
  methodsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  noResultsContainer: {
    padding: 32,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
