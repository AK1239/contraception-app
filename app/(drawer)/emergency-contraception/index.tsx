import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import NaturalMethodCard from "../../../src/components/NaturalMethodCard";

export default function EmergencyContraceptionIndexScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const subcategoryCards = [
    {
      id: "ec-description",
      title: t("home.ecDescriptionTitle"),
      description: t("home.ecDescriptionDescription"),
      icon: "📋",
      onPress: () => router.push("/(drawer)/know-contraceptive/emergency-methods"),
      backgroundColor: "#EDE9FE",
      buttonColor: "#7C3AED",
    },
    {
      id: "ec-eligibility",
      title: t("home.ecEligibilityTitle"),
      description: t("home.ecEligibilityDescription"),
      icon: "💊",
      onPress: () => router.push("/(drawer)/ecp-safety"),
      backgroundColor: "#F5F3FF",
      buttonColor: "#6D28D9",
    },
  ];

  return (
    <ScrollView
      style={styles.content}
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
    >
      <View style={styles.cardsContainer}>
        {subcategoryCards.map((card) => (
          <NaturalMethodCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onKnowMorePress={card.onPress}
            backgroundColor={card.backgroundColor}
            buttonColor={card.buttonColor}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
