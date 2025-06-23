import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Divider, Surface } from "react-native-paper";

export default function AboutUsPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            About ContraSafe
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Your trusted companion for safe, informed contraceptive decisions
          </Text>
        </Card.Content>
      </Card>

      {/* Mission Statement */}
      <Card style={styles.missionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🎯 Our Mission
          </Text>
          <Text variant="bodyMedium" style={styles.missionText}>
            ContraSafe is dedicated to empowering individuals and healthcare providers with
            reliable, evidence-based contraceptive guidance. We believe that access to accurate
            contraceptive information is a fundamental right that can transform lives and
            communities.
          </Text>

          <View style={styles.valuesList}>
            <View style={styles.valueItem}>
              <Text style={styles.valueIcon}>🔬</Text>
              <View style={styles.valueContent}>
                <Text variant="titleMedium" style={styles.valueTitle}>
                  Evidence-Based
                </Text>
                <Text variant="bodyMedium" style={styles.valueDescription}>
                  All recommendations are based on WHO Medical Eligibility Criteria 2015
                </Text>
              </View>
            </View>

            <View style={styles.valueItem}>
              <Text style={styles.valueIcon}>🌍</Text>
              <View style={styles.valueContent}>
                <Text variant="titleMedium" style={styles.valueTitle}>
                  Accessible
                </Text>
                <Text variant="bodyMedium" style={styles.valueDescription}>
                  Making contraceptive information available to everyone, everywhere
                </Text>
              </View>
            </View>

            <View style={styles.valueItem}>
              <Text style={styles.valueIcon}>🔒</Text>
              <View style={styles.valueContent}>
                <Text variant="titleMedium" style={styles.valueTitle}>
                  Private & Secure
                </Text>
                <Text variant="bodyMedium" style={styles.valueDescription}>
                  Your health information is private and never shared without your consent
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* What We Do */}
      <Card style={styles.featuresCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            💡 What We Do
          </Text>

          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureNumber}>1</Text>
              <View style={styles.featureContent}>
                <Text variant="titleMedium" style={styles.featureTitle}>
                  Medical Safety Assessment
                </Text>
                <Text variant="bodyMedium" style={styles.featureDescription}>
                  Comprehensive 36-question assessment based on WHO guidelines to determine which
                  contraceptive methods are medically safe for you.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureNumber}>2</Text>
              <View style={styles.featureContent}>
                <Text variant="titleMedium" style={styles.featureTitle}>
                  Personalized Recommendations
                </Text>
                <Text variant="bodyMedium" style={styles.featureDescription}>
                  Tailored suggestions based on your lifestyle, preferences, and personal goals for
                  family planning.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureNumber}>3</Text>
              <View style={styles.featureContent}>
                <Text variant="titleMedium" style={styles.featureTitle}>
                  Educational Resources
                </Text>
                <Text variant="bodyMedium" style={styles.featureDescription}>
                  Detailed information about all contraceptive methods, including effectiveness,
                  side effects, and suitability.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureNumber}>4</Text>
              <View style={styles.featureContent}>
                <Text variant="titleMedium" style={styles.featureTitle}>
                  Method Comparison
                </Text>
                <Text variant="bodyMedium" style={styles.featureDescription}>
                  Side-by-side comparison of contraceptive methods to help you make informed
                  decisions about your reproductive health.
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* WHO Partnership */}
      <Card style={styles.whoCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🏥 WHO Medical Eligibility Criteria
          </Text>
          <Text variant="bodyMedium" style={styles.whoText}>
            ContraSafe is built on the foundation of the World Health Organization's Medical
            Eligibility Criteria for Contraceptive Use (2015). This internationally recognized
            framework ensures that our recommendations are:
          </Text>

          <View style={styles.whoFeatures}>
            <Text variant="bodyMedium" style={styles.whoFeature}>
              ✓ Medically accurate and up-to-date
            </Text>
            <Text variant="bodyMedium" style={styles.whoFeature}>
              ✓ Based on comprehensive research and evidence
            </Text>
            <Text variant="bodyMedium" style={styles.whoFeature}>
              ✓ Internationally recognized and trusted
            </Text>
            <Text variant="bodyMedium" style={styles.whoFeature}>
              ✓ Suitable for diverse populations and health profiles
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Contact & Support */}
      <Card style={styles.contactCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            📞 Contact & Support
          </Text>
          <Text variant="bodyMedium" style={styles.contactText}>
            We're here to help you navigate your contraceptive choices. While ContraSafe provides
            evidence-based guidance, we always recommend consulting with qualified healthcare
            providers for personalized medical advice.
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.supportInfo}>
            <Text variant="titleMedium" style={styles.supportTitle}>
              Need Help?
            </Text>
            <Text variant="bodyMedium" style={styles.supportText}>
              • Check our FAQs for common questions
            </Text>
            <Text variant="bodyMedium" style={styles.supportText}>
              • Consult with a healthcare provider for medical advice
            </Text>
            <Text variant="bodyMedium" style={styles.supportText}>
              • Review the educational resources in "Know Your Contraceptive"
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Disclaimer */}
      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.disclaimerTitle}>
            📋 Important Disclaimer
          </Text>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            ContraSafe is an educational tool designed to provide information based on WHO
            guidelines. It is not a substitute for professional medical advice, diagnosis, or
            treatment. Always seek the advice of your physician or other qualified health provider
            with any questions you may have regarding contraceptive methods or your reproductive
            health.
          </Text>
        </Card.Content>
      </Card>

      {/* Version Info */}
      <Surface style={styles.versionCard}>
        <Text variant="bodySmall" style={styles.versionText}>
          ContraSafe v1.0 • Based on WHO MEC 2015 • Built with ❤️ for better reproductive health
        </Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e3f2fd",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: "#1976d2",
  },
  subtitle: {
    textAlign: "center",
    color: "#1565c0",
    fontStyle: "italic",
  },
  missionCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#f3e5f5",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2e7d32",
  },
  missionText: {
    lineHeight: 22,
    marginBottom: 20,
    color: "#333",
  },
  valuesList: {
    gap: 16,
  },
  valueItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  valueIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#7b1fa2",
  },
  valueDescription: {
    color: "#666",
    lineHeight: 18,
  },
  featuresCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e8f5e8",
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    marginRight: 16,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2e7d32",
  },
  featureDescription: {
    color: "#666",
    lineHeight: 20,
  },
  whoCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#fff3e0",
  },
  whoText: {
    lineHeight: 20,
    marginBottom: 16,
    color: "#333",
  },
  whoFeatures: {
    gap: 8,
  },
  whoFeature: {
    color: "#e65100",
    lineHeight: 18,
  },
  contactCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e1f5fe",
  },
  contactText: {
    lineHeight: 20,
    marginBottom: 16,
    color: "#333",
  },
  divider: {
    marginBottom: 16,
  },
  supportInfo: {
    gap: 6,
  },
  supportTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0277bd",
  },
  supportText: {
    color: "#666",
    lineHeight: 18,
  },
  disclaimerCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#ffebee",
  },
  disclaimerTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#c62828",
  },
  disclaimerText: {
    lineHeight: 18,
    color: "#c62828",
  },
  versionCard: {
    margin: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    elevation: 1,
  },
  versionText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
  },
});
