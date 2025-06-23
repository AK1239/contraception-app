import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "../../src/store";
import {
  categorizeRecommendations,
  getEligibleMethods,
} from "../../src/services/eligibilityEngine";
import { getMethodByKey, MEC_CATEGORIES } from "../../src/constants";
import { MECScore } from "../../src/types";

export default function ResultsPage() {
  const router = useRouter();
  const { mecScores } = useSelector((state: RootState) => state.results);

  if (!mecScores) {
    return (
      <View style={styles.container}>
        <Text>No results available. Please complete the questionnaire first.</Text>
        <Button mode="contained" onPress={() => router.push("/(drawer)/medical-safety")}>
          Take Questionnaire
        </Button>
      </View>
    );
  }

  const { safe, acceptable, avoid } = categorizeRecommendations(mecScores);
  const eligibleMethods = getEligibleMethods(mecScores);

  const getMECChipColor = (score: MECScore) => {
    return MEC_CATEGORIES[score]?.color || "#666";
  };

  const renderMethodCard = (methodKey: string, score: MECScore) => {
    const method = getMethodByKey(methodKey as any);
    if (!method) return null;

    const mecCategory = MEC_CATEGORIES[score];

    return (
      <Card key={methodKey} style={styles.methodCard}>
        <Card.Content>
          <View style={styles.methodHeader}>
            <Text variant="titleMedium">{method.name}</Text>
            <Chip
              style={[styles.mecChip, { backgroundColor: getMECChipColor(score) }]}
              textStyle={{ color: "white", fontSize: 12 }}
            >
              MEC {score}
            </Chip>
          </View>
          <Text variant="bodyMedium" style={styles.methodDescription}>
            {method.description}
          </Text>
          <Text variant="bodySmall" style={styles.mecDescription}>
            {mecCategory?.description}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Your Contraceptive Safety Assessment
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Based on WHO Medical Eligibility Criteria (MEC) 2015
          </Text>
        </Card.Content>
      </Card>

      {/* Safe Contraceptives (MEC 1) */}
      {safe.length > 0 && (
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.categoryTitle, { color: "#4CAF50" }]}>
              ✓ Suggested Safe Contraceptives
            </Text>
            <Text variant="bodyMedium" style={styles.categoryDescription}>
              These methods have no restrictions for your use.
            </Text>
            {safe.map((methodKey) => renderMethodCard(methodKey, 1))}
          </Card.Content>
        </Card>
      )}

      {/* Acceptable Contraceptives (MEC 2) */}
      {acceptable.length > 0 && (
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.categoryTitle, { color: "#FFC107" }]}>
              ⚠ Contraceptives with Greater Benefit than Risk
            </Text>
            <Text variant="bodyMedium" style={styles.categoryDescription}>
              The advantages of using these methods generally outweigh the risks for you.
            </Text>
            {acceptable.map((methodKey) => renderMethodCard(methodKey, 2))}
          </Card.Content>
        </Card>
      )}

      {/* Avoid Contraceptives (MEC 3 & 4) */}
      {avoid.length > 0 && (
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.categoryTitle, { color: "#F44336" }]}>
              ✕ Avoid These Contraceptives
            </Text>
            <Text variant="bodyMedium" style={styles.categoryDescription}>
              These methods have risks that outweigh the benefits for your health profile.
            </Text>
            {avoid.map((methodKey) => {
              const score = mecScores[methodKey as keyof typeof mecScores] as MECScore;
              return renderMethodCard(methodKey, score);
            })}
          </Card.Content>
        </Card>
      )}

      {/* Next Steps */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.nextStepsTitle}>
            Next Steps
          </Text>
          <Text variant="bodyMedium" style={styles.nextStepsText}>
            Based on your results, you have {eligibleMethods.length} medically appropriate
            contraceptive options. Let's personalize your choice based on your lifestyle and
            preferences.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() =>
                router.push({
                  pathname: "/(drawer)/personalize",
                  params: { eligibleMethods: JSON.stringify(eligibleMethods) },
                })
              }
              style={styles.primaryButton}
            >
              Personalize Your Choice
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push("/(drawer)/compare-methods")}
              style={styles.secondaryButton}
            >
              Compare Methods
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Disclaimer */}
      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            <Text style={{ fontWeight: "bold" }}>Important: </Text>
            This assessment is based on WHO guidelines and your provided information. Always consult
            with a healthcare provider before starting any contraceptive method. Results may change
            if your health status changes.
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
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
  },
  categoryCard: {
    margin: 16,
    marginBottom: 8,
  },
  categoryTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryDescription: {
    marginBottom: 16,
    color: "#666",
  },
  methodCard: {
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  methodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  methodDescription: {
    marginBottom: 8,
    color: "#333",
  },
  mecDescription: {
    color: "#666",
    fontStyle: "italic",
  },
  mecChip: {
    minWidth: 60,
  },
  actionCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e3f2fd",
  },
  nextStepsTitle: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  nextStepsText: {
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 4,
  },
  secondaryButton: {
    paddingVertical: 4,
  },
  disclaimerCard: {
    margin: 16,
    backgroundColor: "#fff3e0",
  },
  disclaimerText: {
    lineHeight: 18,
    color: "#e65100",
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
