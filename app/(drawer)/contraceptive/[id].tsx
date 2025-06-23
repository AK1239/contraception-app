import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip, Divider, Surface } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  CONTRACEPTIVE_METHODS,
  NATURAL_METHODS,
} from "../../../src/constants/contraceptiveMethods";

export default function ContraceptiveDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the method by ID
  const allMethods = [...CONTRACEPTIVE_METHODS, ...NATURAL_METHODS];
  const method = allMethods.find((m) => m.key === id);

  if (!method) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text variant="titleMedium">Method Not Found</Text>
            <Text variant="bodyMedium" style={styles.errorText}>
              The contraceptive method you're looking for doesn't exist.
            </Text>
            <Button mode="contained" onPress={() => router.back()}>
              Go Back
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hormonal":
        return "#e3f2fd";
      case "non-hormonal":
        return "#e8f5e8";
      case "permanent":
        return "#fff3e0";
      case "barrier":
        return "#f3e5f5";
      case "natural":
        return "#fce4ec";
      default:
        return "#f5f5f5";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hormonal":
        return "💊";
      case "non-hormonal":
        return "🔗";
      case "permanent":
        return "✂️";
      case "barrier":
        return "🛡️";
      case "natural":
        return "🌿";
      default:
        return "📋";
    }
  };

  const getMethodDetails = () => {
    // Placeholder detailed information - in a real app, this would come from a data source
    const details = {
      effectiveness: "",
      howItWorks: "",
      advantages: [] as string[],
      disadvantages: [] as string[],
      sideEffects: [] as string[],
      whenToUse: "",
      whenNotToUse: "",
    };

    switch (method.key) {
      case "a":
        details.effectiveness = "More than 99% effective when used correctly";
        details.howItWorks =
          "Contains synthetic versions of estrogen and progestin hormones. Prevents ovulation, thickens cervical mucus, and thins the uterine lining.";
        details.advantages = [
          "Highly effective when used correctly",
          "Can make periods lighter and more regular",
          "May reduce acne",
          "Can reduce risk of ovarian and endometrial cancer",
          "Reversible - fertility returns quickly after stopping",
        ];
        details.disadvantages = [
          "Must be taken daily at the same time",
          "Doesn't protect against STIs",
          "May not be suitable for all women",
          "Can be affected by certain medications",
        ];
        details.sideEffects = [
          "Nausea",
          "Breast tenderness",
          "Headaches",
          "Mood changes",
          "Spotting between periods",
        ];
        details.whenToUse =
          "Suitable for most healthy women who want effective, reversible contraception";
        details.whenNotToUse =
          "Not recommended for women with history of blood clots, certain cancers, or severe migraines with aura";
        break;

      case "f":
        details.effectiveness = "More than 99% effective";
        details.howItWorks =
          "Copper ions create an environment that is toxic to sperm and eggs, preventing fertilization. Also makes the uterine lining inhospitable to implantation.";
        details.advantages = [
          "Highly effective and long-lasting (up to 10 years)",
          "No hormones",
          "Immediately reversible",
          "Can be used while breastfeeding",
          "Cost-effective over time",
        ];
        details.disadvantages = [
          "Requires insertion by healthcare provider",
          "May cause heavier periods initially",
          "Doesn't protect against STIs",
          "Small risk of expulsion or perforation",
        ];
        details.sideEffects = [
          "Heavier menstrual bleeding",
          "More painful periods",
          "Spotting between periods",
          "Cramping",
        ];
        details.whenToUse = "Good for women who want long-term, hormone-free contraception";
        details.whenNotToUse =
          "Not suitable for women with copper allergy, active pelvic infection, or unexplained vaginal bleeding";
        break;

      case "j":
        details.effectiveness = "85-98% effective depending on correct usage";
        details.howItWorks =
          "Physical barrier that prevents sperm from reaching the egg. Condoms also provide protection against sexually transmitted infections.";
        details.advantages = [
          "Provides STI protection",
          "No hormones",
          "Available without prescription",
          "Can be used as needed",
          "Inexpensive and widely available",
        ];
        details.disadvantages = [
          "Must be used every time",
          "Can break or slip",
          "May reduce sensation",
          "Requires partner cooperation",
        ];
        details.sideEffects = ["Possible latex allergy reactions", "Irritation (rare)"];
        details.whenToUse = "Ideal for people who want STI protection along with contraception";
        details.whenNotToUse =
          "Not suitable for those with severe latex allergies (non-latex options available)";
        break;

      default:
        details.effectiveness = "Effectiveness varies by method";
        details.howItWorks =
          "This method works through specific mechanisms. Consult with a healthcare provider for detailed information.";
        details.advantages = ["Consult healthcare provider for specific advantages"];
        details.disadvantages = ["Consult healthcare provider for specific disadvantages"];
        details.sideEffects = ["Consult healthcare provider for potential side effects"];
        details.whenToUse =
          "Speak with a healthcare provider to determine if this method is right for you";
        details.whenNotToUse = "Your healthcare provider will assess any contraindications";
    }

    return details;
  };

  const details = getMethodDetails();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={[styles.headerCard, { backgroundColor: getCategoryColor(method.category) }]}>
        <Card.Content>
          <View style={styles.headerContent}>
            <Text style={styles.methodIcon}>{getCategoryIcon(method.category)}</Text>
            <View style={styles.headerTextContainer}>
              <Text variant="headlineSmall" style={styles.methodTitle}>
                {method.name}
              </Text>
              <Text variant="titleMedium" style={styles.methodShortName}>
                {method.shortName}
              </Text>
            </View>
            <Chip style={styles.categoryChip}>{method.category}</Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Description */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            📋 Description
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {method.description}
          </Text>
        </Card.Content>
      </Card>

      {/* Effectiveness */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            📊 Effectiveness
          </Text>
          <Surface style={styles.effectivenessCard}>
            <Text variant="bodyLarge" style={styles.effectivenessText}>
              {details.effectiveness}
            </Text>
          </Surface>
        </Card.Content>
      </Card>

      {/* How It Works */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ⚙️ How It Works
          </Text>
          <Text variant="bodyMedium" style={styles.howItWorks}>
            {details.howItWorks}
          </Text>
        </Card.Content>
      </Card>

      {/* Advantages */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ✅ Advantages
          </Text>
          {details.advantages.map((advantage, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text variant="bodyMedium" style={styles.listText}>
                {advantage}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Disadvantages */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            ⚠️ Considerations
          </Text>
          {details.disadvantages.map((disadvantage, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text variant="bodyMedium" style={styles.listText}>
                {disadvantage}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Side Effects */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🔍 Possible Side Effects
          </Text>
          {details.sideEffects.map((sideEffect, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text variant="bodyMedium" style={styles.listText}>
                {sideEffect}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* When to Use / When Not to Use */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🎯 Suitability
          </Text>
          <View style={styles.suitabilityContainer}>
            <View style={styles.suitabilitySection}>
              <Text variant="titleMedium" style={[styles.suitabilityTitle, { color: "#4CAF50" }]}>
                Good for:
              </Text>
              <Text variant="bodyMedium" style={styles.suitabilityText}>
                {details.whenToUse}
              </Text>
            </View>
            <Divider style={styles.suitabilityDivider} />
            <View style={styles.suitabilitySection}>
              <Text variant="titleMedium" style={[styles.suitabilityTitle, { color: "#F44336" }]}>
                Not recommended for:
              </Text>
              <Text variant="bodyMedium" style={styles.suitabilityText}>
                {details.whenNotToUse}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => router.push("/compare-methods")}
              style={styles.primaryButton}
            >
              Compare with Other Methods
            </Button>
            <Button
              mode="outlined"
              onPress={() => router.push("/choose-contraceptive")}
              style={styles.secondaryButton}
            >
              Get Personalized Recommendation
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Disclaimer */}
      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            <Text style={{ fontWeight: "bold" }}>Medical Disclaimer: </Text>
            This information is for educational purposes only and should not replace professional
            medical advice. Always consult with a qualified healthcare provider before making
            decisions about contraceptive methods.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  errorCard: {
    margin: 16,
    backgroundColor: "#ffebee",
  },
  errorText: {
    color: "#c62828",
    marginBottom: 16,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  methodTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1976d2",
  },
  methodShortName: {
    color: "#666",
    fontStyle: "italic",
  },
  categoryChip: {
    marginLeft: 8,
  },
  sectionCard: {
    margin: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2e7d32",
  },
  description: {
    lineHeight: 22,
    color: "#333",
  },
  effectivenessCard: {
    padding: 16,
    backgroundColor: "#e8f5e8",
    borderRadius: 8,
  },
  effectivenessText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#2e7d32",
  },
  howItWorks: {
    lineHeight: 22,
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
    color: "#2e7d32",
  },
  listText: {
    flex: 1,
    lineHeight: 20,
  },
  suitabilityContainer: {
    gap: 16,
  },
  suitabilitySection: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  suitabilityTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  suitabilityText: {
    lineHeight: 20,
  },
  suitabilityDivider: {
    marginVertical: 8,
  },
  actionCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e3f2fd",
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
  disclaimerCard: {
    margin: 16,
    backgroundColor: "#fff3e0",
  },
  disclaimerText: {
    lineHeight: 18,
    color: "#e65100",
  },
});
