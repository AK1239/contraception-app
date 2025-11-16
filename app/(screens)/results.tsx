import React, { useMemo, useCallback, memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState } from "../../src/store";
import { getMethodByKey, MEC_CATEGORIES } from "../../src/constants";
import { MECScore } from "../../src/types";
import { LoadingOverlay } from "../../src/components/shared";
import { useMemoizedResults } from "../../src/hooks/useMemoizedResults";

/**
 * Memoized method card component to prevent unnecessary re-renders
 */
const MethodCard = memo(({ methodKey, score }: { methodKey: string; score: MECScore }) => {
  const method = useMemo(() => getMethodByKey(methodKey as any), [methodKey]);
  const mecCategory = useMemo(() => MEC_CATEGORIES[score], [score]);
  const chipColor = useMemo(() => MEC_CATEGORIES[score]?.color || "#666", [score]);

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
            style={[styles.mecChip, { backgroundColor: chipColor }]}
            textStyle={styles.mecChipText}
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
});

MethodCard.displayName = 'MethodCard';

export default function ResultsPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mecScores, isCalculating } = useSelector((state: RootState) => state.results);

  // Use memoized hook for expensive calculations
  const { safe, acceptable, sortedAvoidMethods, eligibleMethods } = useMemoizedResults(mecScores);

  // Memoize navigation handlers
  const handlePersonalize = useCallback(() => {
    router.push({
      pathname: "/(drawer)/personalize",
      params: { eligibleMethods: JSON.stringify(eligibleMethods) },
    });
  }, [router, eligibleMethods]);

  const handleCompareMethods = useCallback(() => {
    router.push("/(drawer)/compare-methods");
  }, [router]);

  const handleTakeQuestionnaire = useCallback(() => {
    router.push("/(drawer)/medical-safety");
  }, [router]);

  if (isCalculating) {
    return (
      <View style={styles.container}>
        <LoadingOverlay
          visible={true}
          message="Calculating your results..."
          modal={false}
        />
      </View>
    );
  }

  if (!mecScores) {
    return (
      <View style={styles.container}>
        <Text>No results available. Please complete the questionnaire first.</Text>
        <Button mode="contained" onPress={handleTakeQuestionnaire}>
          Take Questionnaire
        </Button>
      </View>
    );
  }

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
            onPress={handleTakeQuestionnaire}
            style={styles.backButton}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text variant="headlineSmall" style={styles.title}>
            Your Contraceptive Safety Assessment
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Based on WHO Medical Eligibility Criteria (MEC) 2015
          </Text>
        </View>
      </View>

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
            {safe.map((methodKey) => (
              <MethodCard key={methodKey} methodKey={methodKey} score={1} />
            ))}
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
            {acceptable.map((methodKey) => (
              <MethodCard key={methodKey} methodKey={methodKey} score={2} />
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Avoid Contraceptives (MEC 3 & 4) - sorted by MEC score */}
      {sortedAvoidMethods.length > 0 && (
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.categoryTitle, { color: "#F44336" }]}>
              ✕ Avoid These Contraceptives
            </Text>
            <Text variant="bodyMedium" style={styles.categoryDescription}>
              These methods have risks that outweigh the benefits for your health profile.
            </Text>
            {sortedAvoidMethods.map((methodKey) => {
              const score = mecScores[methodKey as keyof typeof mecScores] as MECScore;
              return <MethodCard key={methodKey} methodKey={methodKey} score={score} />;
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
              onPress={handlePersonalize}
              style={styles.primaryButton}
            >
              Personalize Your Choice
            </Button>

            <Button
              mode="outlined"
              onPress={handleCompareMethods}
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
  },
  mecDescription: {
    color: "#666",
    fontStyle: "italic",
  },
  mecChip: {
    alignSelf: "flex-start",
    minWidth: 60,
    maxWidth: 80,
  },
  mecChipText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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
});
