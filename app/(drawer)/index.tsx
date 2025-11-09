import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import HomeSectionCard from "../../src/components/HomeSectionCard";
import WelcomeCard from "../../src/components/WelcomeCard";

export default function HomePage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Hero Card */}
      <View style={styles.welcomeContainer}>
        <WelcomeCard />
      </View>

      {/* Section Divider */}
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Explore Features
        </Text>
        <View style={styles.dividerLine} />
      </View>

      <HomeSectionCard
        leadingEmoji="👩‍⚕️"
        title="For Healthcare Providers"
        description="If you're a healthcare professional looking to select the safest contraceptive option for your client, head straight to the Choose Your Contraceptive – Medical Safety section."
        ctaLabel="Go to Medical Safety"
        onPress={() => router.push("/(drawer)/medical-safety")}
        buttonColor="#EF4444"
      />

      <HomeSectionCard
        leadingEmoji="📚"
        title="For Women Seeking Information"
        description="If you'd like to learn more about different contraceptives, explore the Natural Methods or Modern Methods sections."
        ctaLabel="View Methods"
        onPress={() => router.push("/(drawer)/know-contraceptive/natural-methods")}
        buttonColor="#3B82F6"
      />

      <HomeSectionCard
        leadingEmoji="⚖️"
        title="Compare Methods"
        description="Compare methods side by side with our Contraceptive Comparison Tool to see how they differ and decide what works best for you."
        ctaLabel="Compare Methods"
        onPress={() => router.push("/(drawer)/compare-methods")}
        buttonColor="#EAB308"
      />

      <HomeSectionCard
        leadingEmoji="✨"
        title="Personalized Guidance"
        description="Not sure which method suits your needs? Visit the Personalize Your Contraceptive section for tailored recommendations."
        ctaLabel="Personalize Your Choice"
        onPress={() => router.push("/(drawer)/personalize")}
        buttonColor="#EC4899"
      />

      <HomeSectionCard
        leadingEmoji="🌿"
        title="Natural Methods"
        description="Prefer non-modern methods? Try our Calendar Method Calculator to identify your fertile days and avoid unprotected intercourse during those times."
        ctaLabel="Calendar Method Calculator"
        onPress={() => router.push("/(drawer)/standard-day-calculator")}
        buttonColor="#22C55E"
      />

      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  footerSpacer: {
    height: 24,
  },
});