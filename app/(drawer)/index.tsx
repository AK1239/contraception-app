import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <Card style={styles.heroCard}>
        <Card.Content>
          <Text variant="headlineLarge" style={styles.heroTitle}>
            Welcome to ContraSafe
          </Text>
          <Text variant="titleMedium" style={styles.heroSubtitle}>
            Your Personalized Guide to Safer Family Planning
          </Text>

          <Text variant="bodyLarge" style={styles.heroQuestion}>
            Are you a healthcare provider or an individual seeking reliable and personalized contraceptive options?
          </Text>

          <Text variant="bodyMedium" style={styles.heroDescription}>
            ContraSafe is here to simplify and revolutionize the way we approach family planning. In a world where access to accurate, understandable, and tailored contraceptive information is critical—but often hard to find—we offer a smart, digital solution designed with YOU in mind.
          </Text>
        </Card.Content>
      </Card>

      {/* Key Benefits */}
      <Card style={styles.benefitsCard}>
        <Card.Content>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🩺</Text>
              <Text variant="bodyMedium" style={styles.benefitText}>
                No more guesswork.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📋</Text>
              <Text variant="bodyMedium" style={styles.benefitText}>
                No more outdated cards or complex manuals.
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>💡</Text>
              <Text variant="bodyMedium" style={styles.benefitText}>
                Just clear, guided choices based on your unique health profile.
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Why ContraSafe */}
      <Card style={styles.whyCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Why ContraSafe?
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌍</Text>
              <Text variant="bodyMedium" style={styles.featureText}>
                Designed to meet the real needs of women and providers
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🧠</Text>
              <Text variant="bodyMedium" style={styles.featureText}>
                Powered by the WHO Medical Eligibility Criteria for Contraceptive Use (2015).
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👩‍⚕️</Text>
              <Text variant="bodyMedium" style={styles.featureText}>
                Built to help providers make safe, evidence-based recommendations.
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text variant="bodyMedium" style={styles.featureText}>
                Easy for anyone to use – whether you’re choosing for yourself or supporting others.
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* What You'll Get */}
      <Card style={styles.resultsCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            What You'll Get:
          </Text>
          <View style={styles.resultsList}>
            <View style={styles.resultItem}>
              <Text style={styles.resultIcon}>✅</Text>
              <Text variant="bodyMedium" style={styles.resultText}>
                A personalized list of safe contraceptive options based on your medical and reproductive history
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultIcon}>✅</Text>
              <Text variant="bodyMedium" style={styles.resultText}>
                Expert guidance on both modern and natural methods with a comparison feature
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultIcon}>✅</Text>
              <Text variant="bodyMedium" style={styles.resultText}>
                Confidence and clarity in every decision
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Call to Action */}
      <Card style={styles.ctaCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.ctaTitle}>
            🛡 With ContraSafe, you’re not just choosing a method—you’re choosing safety, confidence, and control over your reproductive health.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => router.push("/choose-contraceptive")}
              style={styles.primaryButton}
              contentStyle={styles.buttonContent}
            >
              Tap to get started
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push("/know-contraceptive")}
              style={styles.secondaryButton}
              contentStyle={styles.buttonContent}
            >
              Learn About Methods
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Navigation */}
      <Card style={styles.navigationCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.navigationTitle}>
            Quick Navigation
          </Text>
          <Divider style={styles.divider} />

          <View style={styles.navigationGrid}>
            <Button
              mode="text"
              onPress={() => router.push("/know-contraceptive")}
              style={styles.navButton}
            >
              Know Your Contraceptive
            </Button>

            <Button
              mode="text"
              onPress={() => router.push("/compare-methods")}
              style={styles.navButton}
            >
              Compare Methods
            </Button>

            <Button mode="text" onPress={() => router.push("/about-us")} style={styles.navButton}>
              About Us
            </Button>

            <Button mode="text" onPress={() => router.push("/faqs")} style={styles.navButton}>
              FAQs
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  heroCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#E8F0FE",
    elevation: 6,
    borderRadius: 16,
    overflow: "hidden",
  },
  heroTitle: {
    textAlign: "center",
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroSubtitle: {
    textAlign: "center",
    color: "#1565c0",
    marginBottom: 16,
    fontStyle: "italic",
  },
  heroQuestion: {
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
    lineHeight: 24,
  },
  heroDescription: {
    textAlign: "center",
    lineHeight: 22,
    color: "#555",
  },
  benefitsCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#F9F5FF",
    elevation: 3,
    borderRadius: 16,
    overflow: "hidden",
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
    lineHeight: 20,
    fontWeight: "500",
  },
  whyCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#E8F5E9",
    elevation: 3,
    borderRadius: 16,
    overflow: "hidden",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2e7d32",
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    lineHeight: 20,
  },
  resultsCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#FFF8E1",
    elevation: 3,
    borderRadius: 16,
    overflow: "hidden",
  },
  resultsList: {
    gap: 16,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  resultIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  resultText: {
    flex: 1,
    lineHeight: 20,
  },
  ctaCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#FFEBEE",
    elevation: 3,
    borderRadius: 16,
    overflow: "hidden",
  },
  ctaTitle: {
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
    color: "#c62828",
    fontWeight: "500",
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#1976d2",
  },
  secondaryButton: {
    borderColor: "#1976d2",
  },
  buttonContent: {
    paddingVertical: 8,
  },
  navigationCard: {
    margin: 16,
    marginBottom: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  navigationTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  divider: {
    marginBottom: 16,
  },
  navigationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  navButton: {
    flex: 1,
    minWidth: "45%",
  },
});
