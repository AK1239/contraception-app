import React, { useMemo, useCallback, memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip, Divider, IconButton } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { getMethodByKey } from "../../src/constants";
import { ContraceptiveMethodKey } from "../../src/types";
import { resetQuestionnaire, resetPersonalization } from "../../src/store/slices/questionnaire";
import { logger } from "../../src/services/logger";
import { handleError, ErrorCode } from "../../src/services/errorHandler";

interface RecommendationData {
  recommended: ContraceptiveMethodKey[];
  notices: string[];
  eliminated: { method: ContraceptiveMethodKey; reason: string }[];
  shouldShowPermanentMethods?: boolean;
  bmiTooHighFor3Weeks?: boolean;
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
      <Card.Content style={{ paddingVertical: 12, paddingHorizontal: 14 }}>
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
      <Text variant="bodySmall" style={styles.eliminatedMethodName}>
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
  const dispatch = useDispatch();
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
    dispatch(resetQuestionnaire());
    dispatch(resetPersonalization());
    router.push("/(drawer)/choose-contraceptive");
  }, [router, dispatch]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleKnowContraceptive = useCallback(() => {
    router.push("/(drawer)/know-contraceptive");
  }, [router]);

  const handleCompareMethods = useCallback(() => {
    router.push("/(drawer)/compare-methods");
  }, [router]);

  if (!recommendationData) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content style={{ paddingVertical: 12, paddingHorizontal: 14 }}>
            <Text variant="titleMedium" style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>No recommendations available</Text>
            <Text variant="bodySmall" style={styles.errorText}>
              Please complete the personalization questionnaire first.
            </Text>
            <Button mode="contained" onPress={handleStartOver} labelStyle={{ fontSize: 13, fontWeight: "600" }}>
              Start Over
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const { recommended, notices, eliminated } = recommendationData;

  

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(100, insets.bottom + 100) }]}
    >
      {/* App Bar Header */}
      <View style={styles.appBar}>
        <IconButton
          icon="arrow-left"
          size={20}
          iconColor="#FFFFFF"
          onPress={handleBack}
          style={styles.appBarButton}
        />
        <Text variant="titleMedium" style={styles.appBarTitle}>
          Your Personalized Recommendation
        </Text>
        <IconButton
          icon="refresh"
          size={20}
          iconColor="#FFFFFF"
          onPress={handleStartOver}
          style={styles.appBarButton}
        />
      </View>

    

      {/* Primary Recommendations */}
      {recommended.length > 0 && (
        <View style={styles.categoryCard}>
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
          <View style={styles.actionLinks}>
            <Button mode="outlined" onPress={handleKnowContraceptive} style={styles.linkButton} labelStyle={{ fontSize: 13, fontWeight: "600" }}>
              Know Your Contraceptive
            </Button>
            <Button mode="outlined" onPress={handleCompareMethods} style={styles.linkButton} labelStyle={{ fontSize: 13, fontWeight: "600" }}>
              Compare Contraceptive Methods
            </Button>
          </View>
        </View>
      )}

      {/* Important Notices */}
      {notices.length > 0 && (
        <Card style={styles.noticeCard}>
          <Card.Content style={{ paddingVertical: 12, paddingHorizontal: 14 }}>
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
        <Card.Content style={{ paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text variant="titleMedium" style={styles.stiTitle}>
            🛡️ STI Protection
          </Text>
          <Text variant="bodySmall" style={styles.stiText}>
          None of the below methods provide protection against STIs, so if you think you're at an increased risk of STI, barrier methods should be used either alone acting both as a contraceptive and a protector for STI or you can use barrier methods along with your chosen contraceptive.
          </Text>
        </Card.Content>
      </Card>

      {/* Methods Not Recommended */}
      {eliminated.length > 0 && (
        <Card style={styles.eliminatedCard}>
          <Card.Content style={{ paddingVertical: 12, paddingHorizontal: 14 }}>
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
        <Card.Content style={{ paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            <Text style={{ fontWeight: "700" }}>Medical Disclaimer: </Text>
            Recommendations are based on WHO guidelines and the details you shared. Please consult a healthcare provider before starting any contraceptive. 
          </Text>
        </Card.Content>
      </Card>

      {/* Start Over Button */}
      <View style={styles.startOverSection}>
        <Button
          mode="outlined"
          onPress={handleStartOver}
          icon="refresh"
          style={styles.startOverButton}
          labelStyle={{ fontSize: 14, fontWeight: "600" }}
        >
          Start Over
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#43099f",
    paddingTop: 50,
    paddingHorizontal: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#5B21B6",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  appBarButton: {
    margin: 0,
  },
  appBarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    paddingHorizontal: 8,
  },
  summarySection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  summaryText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 18,
  },
  categoryCard: {
    margin: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  categoryTitle: {
    fontWeight: "700",
    marginBottom: 4,
    fontSize: 16,
    marginTop: 20
  },
  categoryDescription: {
    marginBottom: 12,
    color: "#6B7280",
    lineHeight: 18,
    fontSize: 12,
  },
  methodCard: {
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  methodHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  methodNameContainer: {
    flex: 1,
    marginRight: 8,
  },
  methodName: {
    flexWrap: "wrap",
    fontSize: 14,
    fontWeight: "600",
  },
  methodDescription: {
    marginBottom: 6,
    color: "#6B7280",
    lineHeight: 18,
    fontSize: 12,
  },
  methodCategory: {
    color: "#6B7280",
    fontStyle: "italic",
    fontSize: 11,
  },
  statusChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chipText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  noticeCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    elevation: 0,
  },
  noticeTitle: {
    marginBottom: 8,
    fontWeight: "700",
    color: "#F59E0B",
    fontSize: 14,
  },
  noticeItem: {
    marginBottom: 6,
  },
  noticeText: {
    color: "#92400E",
    lineHeight: 16,
    fontSize: 11,
  },
  stiCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    elevation: 0,
  },
  stiTitle: {
    marginBottom: 8,
    fontWeight: "700",
    color: "#1E40AF",
    fontSize: 14,
  },
  stiText: {
    color: "#1E40AF",
    lineHeight: 18,
    fontSize: 11,
  },
  eliminatedCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
    elevation: 0,
  },
  eliminatedTitle: {
    marginBottom: 4,
    fontWeight: "700",
    color: "#DC2626",
    fontSize: 16,
  },
  eliminatedDescription: {
    marginBottom: 12,
    color: "#6B7280",
    fontSize: 12,
  },
  divider: {
    marginBottom: 12,
    backgroundColor: "#FEE2E2",
  },
  eliminatedItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FEE2E2",
  },
  eliminatedMethodName: {
    fontWeight: "600",
    color: "#991B1B",
    marginBottom: 4,
    fontSize: 13,
  },
  eliminatedReason: {
    color: "#6B7280",
    fontStyle: "italic",
    fontSize: 11,
  },
  actionCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    elevation: 0,
  },
  actionTitle: {
    marginBottom: 8,
    fontWeight: "700",
    fontSize: 14,
  },
  actionDescription: {
    marginBottom: 16,
    color: "#6B7280",
    lineHeight: 18,
    fontSize: 12,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 4,
    marginBottom: 4,
    borderRadius: 10,
  },
  secondaryButton: {
    paddingVertical: 4,
    borderRadius: 10,
  },
  tertiaryButton: {
    paddingVertical: 4,
    borderRadius: 10,
  },
  disclaimerCard: {
    margin: 16,
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    elevation: 0,
  },
  disclaimerText: {
    lineHeight: 16,
    color: "#92400E",
    fontSize: 11,
  },
  errorCard: {
    margin: 16,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    elevation: 0,
  },
  errorText: {
    color: "#DC2626",
    marginBottom: 16,
    fontSize: 12,
  },
  actionLinks: {
    marginTop: 12,
    gap: 8,
  },
  linkButton: {
    marginBottom: 6,
    borderRadius: 10,
    borderColor: "#D1D5DB",
  },
  startOverSection: {
    margin: 16,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  startOverButton: {
    paddingVertical: 6,
    borderRadius: 10,
    borderColor: "#D1D5DB",
  },
});
