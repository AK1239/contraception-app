import React, { useMemo, useCallback, memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip, Divider, IconButton } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getMethodByKey } from "../../src/constants";
import { ContraceptiveMethodKey } from "../../src/types";
import { logger } from "../../src/services/logger";
import { handleError, ErrorCode } from "../../src/services/errorHandler";

interface RecommendationData {
  recommended: ContraceptiveMethodKey[];
  notices: string[];
  eliminated: { method: ContraceptiveMethodKey; reason: string }[];
  shouldShowPermanentMethods?: boolean;
}

/**
 * Memoized method card component for recommendations
 */
const RecommendationMethodCard = memo(({ 
  methodKey, 
  isRecommended 
}: { 
  methodKey: ContraceptiveMethodKey; 
  isRecommended: boolean;
}) => {
  const method = useMemo(() => getMethodByKey(methodKey), [methodKey]);
  const chipColor = useMemo(() => isRecommended ? "#4CAF50" : "#FF9800", [isRecommended]);
  const chipLabel = useMemo(() => isRecommended ? "Recommended" : "Alternative", [isRecommended]);

  if (!method) return null;

  return (
    <Card style={styles.methodCard}>
      <Card.Content>
        <View style={styles.methodHeader}>
          <View style={styles.methodNameContainer}>
            <Text variant="titleMedium" style={styles.methodName}>
              {method.name}
            </Text>
          </View>
          <Chip
            style={[styles.statusChip, { backgroundColor: chipColor }]}
            textStyle={styles.chipText}
          >
            {chipLabel}
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
});

RecommendationMethodCard.displayName = 'RecommendationMethodCard';

/**
 * Memoized eliminated method item component
 */
const EliminatedMethodItem = memo(({ 
  method, 
  reason 
}: { 
  method: ContraceptiveMethodKey; 
  reason: string;
}) => {
  const methodInfo = useMemo(() => getMethodByKey(method), [method]);

  if (!methodInfo) return null;

  return (
    <View style={styles.eliminatedItem}>
      <Text variant="bodyMedium" style={styles.eliminatedMethodName}>
        {methodInfo.name}
      </Text>
      <Text variant="bodySmall" style={styles.eliminatedReason}>
        Reason: {reason}
      </Text>
    </View>
  );
});

EliminatedMethodItem.displayName = 'EliminatedMethodItem';

export default function FinalRecommendationPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  // Memoize parsed recommendation data
  const recommendationData = useMemo<RecommendationData | null>(() => {
    try {
      if (params.recommendationData) {
        return JSON.parse(params.recommendationData as string);
      }
    } catch (error) {
      handleError(error, ErrorCode.DATA_INVALID_FORMAT, "FinalRecommendationPage");
      logger.error("Error parsing recommendation data", error, {
        recommendationData: params.recommendationData,
      });
    }
    return null;
  }, [params.recommendationData]);

  // Memoize navigation handlers
  const handleStartOver = useCallback(() => {
    router.push("/medical-safety");
  }, [router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!recommendationData) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text variant="titleMedium">No recommendations available</Text>
            <Text variant="bodyMedium" style={styles.errorText}>
              Please complete the personalization questionnaire first.
            </Text>
            <Button mode="contained" onPress={handleStartOver}>
              Start Over
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const { recommended, notices, eliminated } = recommendationData;

  // Memoize recommendation summary
  const recommendationSummary = useMemo(() => {
    if (recommended.length === 0) {
      return "Based on your preferences, we couldn't find a perfect match. Please consider the alternative options below or adjust your preferences.";
    } else if (recommended.length === 1) {
      const method = getMethodByKey(recommended[0]);
      return `Based on your health profile and preferences, we recommend ${method?.name}. This method best matches your needs and lifestyle.`;
    } else {
      return `Based on your health profile and preferences, we've identified ${recommended.length} suitable contraceptive options for you.`;
    }
  }, [recommended]);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(100, insets.bottom + 100) }]}
    >
      {/* Header with back button */}
      <View style={styles.headerContainer}>
        <View style={styles.backButtonRow}>
          <IconButton
            icon="arrow-left"
            mode="contained-tonal"
            onPress={handleBack}
            style={styles.backButton}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text variant="headlineSmall" style={styles.title}>
            Your Personalized Recommendation
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {recommendationSummary}
          </Text>
        </View>
      </View>

      {/* Primary Recommendations */}
      {recommended.length > 0 && (
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.categoryTitle, { color: "#4CAF50" }]}>
              ✅ Your Best Match{recommended.length > 1 ? "es" : ""}
            </Text>
            <Text variant="bodySmall" style={styles.categoryDescription}>
              {recommended.length === 1
                ? "This method perfectly aligns with your health profile and lifestyle preferences."
                : "These methods align well with your health profile and lifestyle preferences."}
            </Text>
            {recommended.map((methodKey) => (
              <RecommendationMethodCard 
                key={methodKey} 
                methodKey={methodKey} 
                isRecommended={true} 
              />
            ))}
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
              <View key={`notice-${index}`} style={styles.noticeItem}>
                <Text variant="bodySmall" style={styles.noticeText}>
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
          <Text variant="bodySmall" style={styles.stiText}>
          Most contraceptives do not protect against STIs. If you're at risk, use a condom or other barrier method for protection along with your chosen contraceptive.
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
            {eliminated.map(({ method, reason }, index) => (
              <EliminatedMethodItem 
                key={`eliminated-${method}-${index}`}
                method={method} 
                reason={reason} 
              />
            ))}
          </Card.Content>
        </Card>
      )}

    

      {/* Professional Disclaimer */}
      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            <Text style={{ fontWeight: "bold" }}>Medical Disclaimer: </Text>
            Recommendations are based on WHO guidelines and the details you shared. Please consult a healthcare provider before starting any contraceptive. 
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
  primaryButton: {
    paddingVertical: 4,
    marginBottom: 4,
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
