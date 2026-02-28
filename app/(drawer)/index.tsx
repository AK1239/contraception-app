import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import HomeSectionCard from "../../src/components/HomeSectionCard";
import WelcomeCard from "../../src/components/WelcomeCard";
import { useIsHealthcareProvider } from "../../src/hooks/useUserRole";

export default function HomePage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isHealthcareProvider = useIsHealthcareProvider();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: Math.max(40, insets.bottom + 40) }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.welcomeContainer}>
        <WelcomeCard />
      </View>

      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          {t("home.exploreFeatures")}
        </Text>
        <View style={styles.dividerLine} />
      </View>

      <HomeSectionCard
        leadingEmoji="🎯"
        title={t("home.chooseTitle")}
        description={t("home.chooseDescription")}
        ctaLabel={t("home.chooseCta")}
        onPress={() => router.push("/(drawer)/choose-contraceptive")}
        buttonColor="#6D28D9"
      />

      <HomeSectionCard
        leadingEmoji="📚"
        title={t("home.knowTitle")}
        description={t("home.knowDescription")}
        ctaLabel={t("home.knowCta")}
        onPress={() => router.push("/(drawer)/know-contraceptive")}
        buttonColor="#3B82F6"
      />

      <HomeSectionCard
        leadingEmoji="⚖️"
        title={t("home.compareTitle")}
        description={t("home.compareDescription")}
        ctaLabel={t("home.compareCta")}
        onPress={() => router.push("/(drawer)/compare-methods")}
        buttonColor="#EAB308"
      />

      <HomeSectionCard
        leadingEmoji="✨"
        title={t("home.personalizeTitle")}
        description={t("home.personalizeDescription")}
        ctaLabel={t("home.personalizeCta")}
        onPress={() => router.push("/(drawer)/personalize")}
        buttonColor="#EC4899"
      />

      <HomeSectionCard
        leadingEmoji="🌿"
        title={t("home.naturalTitle")}
        description={t("home.naturalDescription")}
        ctaLabel={t("home.naturalCta")}
        onPress={() => router.push("/(drawer)/natural-calculators")}
        buttonColor="#22C55E"
      />

      {isHealthcareProvider && (
        <HomeSectionCard
          leadingEmoji="✂️"
          title={t("home.sterilizationTitle")}
          description={t("home.sterilizationDescription")}
          ctaLabel={t("home.sterilizationCta")}
          onPress={() => router.push("/(drawer)/sterilization-eligibility")}
          buttonColor="#8B5CF6"
        />
      )}

  
      <Text style={styles.footerText}>{t("home.footer")}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    paddingBottom: 40,
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    color: "#1E293B",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  dividerLine: {
    height: 3,
    width: 50,
    backgroundColor: "#6D28D9",
    borderRadius: 2,
  },
  footerText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 16,
  },
});
