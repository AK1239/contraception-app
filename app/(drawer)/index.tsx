import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import HomeSectionCard from "../../src/components/HomeSectionCard";

export default function HomePage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
   

      <HomeSectionCard
        leadingEmoji="👩‍⚕️"
        title="For Healthcare Providers"
        description="If you’re a healthcare professional looking to select the safest contraceptive option for your client, head straight to the Choose Your Contraceptive – Medical Safety section."
        ctaLabel="Go to Medical Safety"
        onPress={() => router.push("/medical-safety")}
      />

      <HomeSectionCard
        leadingEmoji="👩"
        title="For Women Seeking Information"
        description="If you’d like to learn more about different contraceptives, explore the Know Your Contraceptive section."
        ctaLabel="Know Your Contraceptive"
        onPress={() => router.push("/know-contraceptive")}
      />

      <HomeSectionCard
        leadingEmoji="⚖️"
        title="Still Unsure?"
        description="Compare methods side by side with our Contraceptive Comparison Tool to see how they differ and decide what works best for you."
        ctaLabel="Compare Methods"
        onPress={() => router.push("/compare-methods")}
      />

      <HomeSectionCard
        leadingEmoji="✨"
        title="Personalized Guidance"
        description="Not sure which method suits your needs? Visit the Personalize Your Contraceptive section for tailored recommendations."
        ctaLabel="Personalize Your Choice"
        onPress={() => router.push("/personalize")}
      />

      <HomeSectionCard
        leadingEmoji="🌿"
        title="Natural Methods"
        description="Prefer non-modern methods? Try our Standard Days Method Calculator to identify your fertile days and avoid unprotected intercourse during those times."
        ctaLabel="Standard Days Calculator"
        onPress={() => router.push("/standard-day-calculator")}
      />

      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  heroCard: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
  },
  heroTitle: {
    textAlign: "center",
    color: "#0066ff",
    fontWeight: "700",
    marginBottom: 4,
  },
  heroSubtitle: {
    textAlign: "center",
    color: "#374151",
  },
  footerSpacer: {
    height: 24,
  },
});
