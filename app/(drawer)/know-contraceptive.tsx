import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Chip, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import { CONTRACEPTIVE_METHODS, NATURAL_METHODS } from "../../src/constants/contraceptiveMethods";

export default function KnowContraceptivePage() {
  const router = useRouter();

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

  const renderMethodCard = (method: any, isNatural: boolean = false) => {
    const handlePress = () => {
      const methodId = isNatural ? method.key : method.key;
      router.push(`/contraceptive/${methodId}`);
    };

    return (
      <TouchableOpacity key={method.key} onPress={handlePress}>
        <Card style={[styles.methodCard, { backgroundColor: getCategoryColor(method.category) }]}>
          <Card.Content>
            <View style={styles.methodHeader}>
              <View style={styles.methodTitleContainer}>
                <Text style={styles.categoryIcon}>{getCategoryIcon(method.category)}</Text>
                <View style={styles.methodTextContainer}>
                  <Text variant="titleMedium" style={styles.methodName}>
                    {method.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.methodShortName}>
                    {method.shortName}
                  </Text>
                </View>
              </View>
              <Chip
                style={[
                  styles.categoryChip,
                  { backgroundColor: getCategoryColor(method.category) },
                ]}
                textStyle={styles.categoryChipText}
              >
                {method.category}
              </Chip>
            </View>

            <Text variant="bodyMedium" style={styles.methodDescription}>
              {method.description}
            </Text>

            <View style={styles.methodFooter}>
              <Text variant="bodySmall" style={styles.tapToLearn}>
                Tap to learn more →
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Know Your Contraceptive
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Learn about different contraceptive methods and how they work. Tap on any method to get
            detailed information.
          </Text>
        </Card.Content>
      </Card>

      {/* Modern Methods */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            💊 Modern Contraceptive Methods
          </Text>
          <Text variant="bodyMedium" style={styles.sectionDescription}>
            Evidence-based contraceptive methods with proven effectiveness and safety profiles.
          </Text>
          <Divider style={styles.divider} />

          {CONTRACEPTIVE_METHODS.map((method) => renderMethodCard(method))}
        </Card.Content>
      </Card>

      {/* Natural Methods */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🌿 Natural Family Planning Methods
          </Text>
          <Text variant="bodyMedium" style={styles.sectionDescription}>
            Natural methods that don't require devices or medications, based on understanding your
            fertility cycle.
          </Text>
          <Divider style={styles.divider} />

          {NATURAL_METHODS.map((method) => renderMethodCard(method, true))}
        </Card.Content>
      </Card>

      {/* Categories Legend */}
      <Card style={styles.legendCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.legendTitle}>
            Method Categories
          </Text>
          <View style={styles.legendGrid}>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>💊</Text>
              <Text variant="bodySmall" style={styles.legendText}>
                Hormonal
              </Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>🔗</Text>
              <Text variant="bodySmall" style={styles.legendText}>
                Non-hormonal
              </Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>✂️</Text>
              <Text variant="bodySmall" style={styles.legendText}>
                Permanent
              </Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>🛡️</Text>
              <Text variant="bodySmall" style={styles.legendText}>
                Barrier
              </Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>🌿</Text>
              <Text variant="bodySmall" style={styles.legendText}>
                Natural
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Disclaimer */}
      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            <Text style={{ fontWeight: "bold" }}>Important: </Text>
            This information is for educational purposes only. Effectiveness and suitability vary by
            individual. Always consult with a healthcare provider before choosing or changing
            contraceptive methods.
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
    color: "#2e7d32",
  },
  sectionDescription: {
    marginBottom: 12,
    color: "#666",
    lineHeight: 20,
  },
  divider: {
    marginBottom: 16,
  },
  methodCard: {
    marginBottom: 12,
    elevation: 2,
  },
  methodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  methodTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodName: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
  },
  methodShortName: {
    color: "#666",
    fontStyle: "italic",
  },
  categoryChip: {
    marginLeft: 8,
  },
  categoryChipText: {
    fontSize: 10,
    textTransform: "capitalize",
  },
  methodDescription: {
    lineHeight: 20,
    color: "#444",
    marginBottom: 12,
  },
  methodFooter: {
    alignItems: "flex-end",
  },
  tapToLearn: {
    color: "#1976d2",
    fontStyle: "italic",
  },
  legendCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#f8f9fa",
  },
  legendTitle: {
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "bold",
  },
  legendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 12,
  },
  legendItem: {
    alignItems: "center",
    minWidth: "18%",
  },
  legendIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  legendText: {
    textAlign: "center",
    fontSize: 10,
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
