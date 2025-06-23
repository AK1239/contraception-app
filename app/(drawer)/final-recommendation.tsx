import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip, Divider } from "react-native-paper";
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
            <Text variant="titleMedium">{method.name}</Text>
            <Chip
              style={[
                styles.statusChip,
                { backgroundColor: isRecommended ? "#4CAF50" : "#FF9800" },
              ]}
              textStyle={{ color: "white", fontSize: 12 }}
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            🎯 Your Personalized Recommendation
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {getRecommendationSummary()}
          </Text>
        </Card.Content>
      </Card>

      {/* Primary Recommendations */}
      {recommended.length > 0 && (
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.sectionTitle, { color: "#4CAF50" }]}>
              ✅ Your Best Match{recommended.length > 1 ? "es" : ""}
            </Text>
            <Text variant="bodyMedium" style={styles.sectionDescription}>
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
              mode="contained"
              onPress={() => router.push("/know-contraceptive")}
              style={styles.primaryButton}
            >
              Learn More About Methods
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push("/compare-methods")}
              style={styles.secondaryButton}
            >
              Compare Methods
            </Button>

            <Button
              mode="text"
              onPress={() => router.push("/personalize")}
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
    lineHeight: 20,
  },
  sectionCard: {
    margin: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionDescription: {
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
    minWidth: 80,
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
    backgroundColor: "#f3e5f5",
  },
  actionTitle: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#7b1fa2",
  },
  actionDescription: {
    marginBottom: 16,
    color: "#8e24aa",
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 4,
    backgroundColor: "#7b1fa2",
  },
  secondaryButton: {
    paddingVertical: 4,
    borderColor: "#7b1fa2",
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
