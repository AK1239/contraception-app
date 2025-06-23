import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip, Divider, IconButton } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getMethodByKey } from "../../src/constants";
import { ContraceptiveMethodKey } from "../../src/types";

interface RecommendationData {
  recommended: ContraceptiveMethodKey[];
  notices: string[];
  eliminated: { method: ContraceptiveMethodKey; reason: string }[];
}

export default function FinalRecommendationPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse recommendation data from navigation params
  let recommendationData: RecommendationData | null = null;
  try {
    if (params.recommendationData) {
      recommendationData = JSON.parse(params.recommendationData as string);
    }
  } catch (error) {
    console.error("Error parsing recommendation data:", error);
  }

  if (!recommendationData) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text variant="titleMedium">No recommendations available</Text>
            <Text variant="bodyMedium" style={styles.errorText}>
              Please complete the personalization questionnaire first.
            </Text>
            <Button mode="contained" onPress={() => router.push("/medical-safety")}>
              Start Over
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const { recommended, notices, eliminated } = recommendationData;

  const renderMethodCard = (methodKey: ContraceptiveMethodKey, isRecommended: boolean = true) => {
    const method = getMethodByKey(methodKey);
    if (!method) return null;

    return (
      <Card key={methodKey} style={styles.methodCard}>
        <Card.Content>
          <View style={styles.methodHeader}>
            <View style={styles.methodNameContainer}>
              <Text variant="titleMedium" style={styles.methodName}>
                {method.name}
              </Text>
            </View>
            <Chip
              style={[
                styles.statusChip,
                { backgroundColor: isRecommended ? "#4CAF50" : "#FF9800" },
              ]}
              textStyle={styles.chipText}
            >
              {isRecommended ? "Recommended" : "Alternative"}
            </Chip>
          </View>
          <Text variant="bodyMedium" style={styles.methodDescription}>
            {method.description}
          </Text>
          {method.category && (
            <Text variant="bodySmall" style={styles.methodCategory}>
              Category: {method.category.charAt(0).toUpperCase() + method.category.slice(1)}
            </Text>
          )}
        </Card.Content>
      </Card>
    );
  };

  const getRecommendationSummary = () => {
    if (recommended.length === 0) {
      return "Based on your preferences, we couldn't find a perfect match. Please consider the alternative options below or adjust your preferences.";
    } else if (recommended.length === 1) {
      const method = getMethodByKey(recommended[0]);
      return `Based on your health profile and preferences, we recommend ${method?.name}. This method best matches your needs and lifestyle.`;
    } else {
      return `Based on your health profile and preferences, we've identified ${recommended.length} suitable contraceptive options for you.`;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header with back button */}
      <View style={styles.headerContainer}>
        <View style={styles.backButtonRow}>
          <IconButton
            icon="arrow-left"
            mode="contained-tonal"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text variant="headlineSmall" style={styles.title}>
            Your Personalized Recommendation
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {getRecommendationSummary()}
          </Text>
        </View>
      </View>

      {/* Primary Recommendations */}
      {recommended.length > 0 && (
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.categoryTitle, { color: "#4CAF50" }]}>
              ✅ Your Best Match{recommended.length > 1 ? "es" : ""}
            </Text>
            <Text variant="bodyMedium" style={styles.categoryDescription}>
              {recommended.length === 1
                ? "This method perfectly aligns with your health profile and lifestyle preferences."
                : "These methods align well with your health profile and lifestyle preferences."}
            </Text>
            {recommended.map((methodKey) => renderMethodCard(methodKey, true))}
          </Card.Content>
        </Card>
      )}

      {/* Important Notices */}
      {notices.length > 0 && (
        <Card style={styles.noticeCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.noticeTitle}>
              ⚠️ Important Information
            </Text>
            {notices.map((notice, index) => (
              <View key={index} style={styles.noticeItem}>
                <Text variant="bodyMedium" style={styles.noticeText}>
                  • {notice}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* STI Protection Notice */}
      <Card style={styles.stiCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.stiTitle}>
            🛡️ STI Protection
          </Text>
          <Text variant="bodyMedium" style={styles.stiText}>
            Most contraceptive methods don't protect against sexually transmitted infections (STIs).
            If you're at risk for STIs, consider using barrier methods (like condoms) along with
            your chosen contraceptive method for dual protection.
          </Text>
        </Card.Content>
      </Card>

      {/* Methods Not Recommended */}
      {eliminated.length > 0 && (
        <Card style={styles.eliminatedCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.eliminatedTitle}>
              ❌ Methods Not Recommended for You
            </Text>
            <Text variant="bodySmall" style={styles.eliminatedDescription}>
              These methods were filtered out based on your preferences:
            </Text>
            <Divider style={styles.divider} />
            {eliminated.map(({ method, reason }, index) => {
              const methodInfo = getMethodByKey(method);
              return (
                <View key={index} style={styles.eliminatedItem}>
                  <Text variant="bodyMedium" style={styles.eliminatedMethodName}>
                    {methodInfo?.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.eliminatedReason}>
                    Reason: {reason}
                  </Text>
                </View>
              );
            })}
          </Card.Content>
        </Card>
      )}

      {/* Next Steps */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.actionTitle}>
            🚀 Next Steps
          </Text>
          <Text variant="bodyMedium" style={styles.actionDescription}>
            Ready to learn more about your recommended method{recommended.length > 1 ? "s" : ""}
            or compare different options?
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={() => router.push("/(drawer)/know-contraceptive")}
              style={styles.secondaryButton}
            >
              Learn More About Methods
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push("/(drawer)/compare-methods")}
              style={styles.secondaryButton}
            >
              Compare All Methods
            </Button>

            <Button
              mode="text"
              onPress={() => router.push("/(drawer)/personalize")}
              style={styles.tertiaryButton}
            >
              Modify My Preferences
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Professional Disclaimer */}
      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            <Text style={{ fontWeight: "bold" }}>Medical Disclaimer: </Text>
            This recommendation is based on WHO Medical Eligibility Criteria and your provided
            information. It should not replace professional medical advice. Always consult with a
            healthcare provider before starting any contraceptive method. Your health status may
            change, and periodic reassessment is recommended.
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
  scrollContent: {
    paddingBottom: 100,
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    margin: 0,
  },
  titleContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: "#1a1a1a",
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
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
    lineHeight: 20,
  },
  methodCard: {
    marginBottom: 12,
    backgroundColor: "#fafafa",
    elevation: 2,
  },
  methodHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  methodNameContainer: {
    flex: 1,
    marginRight: 8,
  },
  methodName: {
    flexWrap: "wrap",
  },
  methodDescription: {
    marginBottom: 8,
    color: "#333",
    lineHeight: 20,
  },
  methodCategory: {
    color: "#666",
    fontStyle: "italic",
  },
  statusChip: {
    alignSelf: "flex-start",
    minWidth: 80,
    maxWidth: 120,
  },
  chipText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  noticeCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#fff3e0",
  },
  noticeTitle: {
    marginBottom: 12,
    fontWeight: "bold",
    color: "#e65100",
  },
  noticeItem: {
    marginBottom: 8,
  },
  noticeText: {
    color: "#e65100",
    lineHeight: 20,
  },
  stiCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e8f5e8",
  },
  stiTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  stiText: {
    color: "#2e7d32",
    lineHeight: 22,
  },
  eliminatedCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#fce4ec",
  },
  eliminatedTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#c2185b",
  },
  eliminatedDescription: {
    marginBottom: 12,
    color: "#ad1457",
  },
  divider: {
    marginBottom: 12,
  },
  eliminatedItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f8bbd9",
  },
  eliminatedMethodName: {
    fontWeight: "500",
    color: "#880e4f",
    marginBottom: 4,
  },
  eliminatedReason: {
    color: "#ad1457",
    fontStyle: "italic",
  },
  actionCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e3f2fd",
  },
  actionTitle: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  actionDescription: {
    marginBottom: 16,
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  secondaryButton: {
    paddingVertical: 4,
  },
  tertiaryButton: {
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
  errorCard: {
    margin: 16,
    backgroundColor: "#ffebee",
  },
  errorText: {
    color: "#c62828",
    marginBottom: 16,
  },
});
