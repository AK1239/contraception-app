import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Checkbox, Divider, DataTable, Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import { CONTRACEPTIVE_METHODS, NATURAL_METHODS } from "../../src/constants/contraceptiveMethods";

interface ComparisonData {
  effectiveness: string;
  duration: string;
  hormonal: string;
  cost: string;
  stiProtection: string;
  reversibility: string;
}

export default function CompareMethodsPage() {
  const router = useRouter();
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const allMethods = [...CONTRACEPTIVE_METHODS, ...NATURAL_METHODS];

  const getComparisonData = (methodKey: string): ComparisonData => {
    const data: Record<string, ComparisonData> = {
      a: {
        effectiveness: ">99%",
        duration: "Daily",
        hormonal: "Yes (Estrogen + Progestin)",
        cost: "Low-Medium",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      b: {
        effectiveness: ">99%",
        duration: "Monthly",
        hormonal: "Yes (Estrogen + Progestin)",
        cost: "Medium",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      c: {
        effectiveness: ">99%",
        duration: "Daily",
        hormonal: "Yes (Progestin only)",
        cost: "Low-Medium",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      d: {
        effectiveness: ">99%",
        duration: "3 months",
        hormonal: "Yes (Progestin only)",
        cost: "Medium",
        stiProtection: "No",
        reversibility: "12-18 months",
      },
      e: {
        effectiveness: ">99%",
        duration: "3-5 years",
        hormonal: "Yes (Progestin only)",
        cost: "High upfront, Low long-term",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      f: {
        effectiveness: ">99%",
        duration: "10 years",
        hormonal: "No",
        cost: "High upfront, Very Low long-term",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      g: {
        effectiveness: ">99%",
        duration: "5-7 years",
        hormonal: "Yes (Progestin only)",
        cost: "High upfront, Low long-term",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      h: {
        effectiveness: ">99%",
        duration: "Permanent",
        hormonal: "No",
        cost: "High",
        stiProtection: "No",
        reversibility: "Not reversible",
      },
      i: {
        effectiveness: "92-99%",
        duration: "Weekly",
        hormonal: "Yes (Estrogen + Progestin)",
        cost: "Medium",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      j: {
        effectiveness: "85-98%",
        duration: "Per use",
        hormonal: "No",
        cost: "Low",
        stiProtection: "Yes",
        reversibility: "N/A",
      },
      k: {
        effectiveness: "92-99%",
        duration: "Monthly",
        hormonal: "Yes (Estrogen + Progestin)",
        cost: "Medium-High",
        stiProtection: "No",
        reversibility: "Immediate",
      },
      "lactational-amenorrhea": {
        effectiveness: "98-99%",
        duration: "6 months max",
        hormonal: "Natural",
        cost: "Free",
        stiProtection: "No",
        reversibility: "N/A",
      },
      "calendar-method": {
        effectiveness: "76-88%",
        duration: "Continuous tracking",
        hormonal: "Natural",
        cost: "Free",
        stiProtection: "No",
        reversibility: "N/A",
      },
    };

    return (
      data[methodKey] || {
        effectiveness: "Varies",
        duration: "Varies",
        hormonal: "Varies",
        cost: "Varies",
        stiProtection: "Varies",
        reversibility: "Varies",
      }
    );
  };

  const handleMethodSelection = (methodKey: string) => {
    setSelectedMethods((prev) => {
      if (prev.includes(methodKey)) {
        return prev.filter((key) => key !== methodKey);
      } else if (prev.length < 4) {
        return [...prev, methodKey];
      }
      return prev;
    });
  };

  const selectedMethodsData = selectedMethods
    .map((key) => {
      const method = allMethods.find((m) => m.key === key);
      return { method, data: getComparisonData(key) };
    })
    .filter((item) => item.method);

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

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Compare Contraceptive Methods
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Select up to 4 methods to compare side-by-side. Tap the checkboxes to select methods for
            comparison.
          </Text>
        </Card.Content>
      </Card>

      {/* Selection Status */}
      <Card style={styles.statusCard}>
        <Card.Content>
          <View style={styles.statusHeader}>
            <Text variant="titleMedium">Selected: {selectedMethods.length}/4</Text>
            {selectedMethods.length >= 2 && (
              <Button
                mode="contained"
                onPress={() => setShowComparison(true)}
                style={styles.compareButton}
              >
                Compare Selected
              </Button>
            )}
          </View>
          {selectedMethods.length > 0 && (
            <View style={styles.selectedMethodsContainer}>
              {selectedMethods.map((key) => {
                const method = allMethods.find((m) => m.key === key);
                return method ? (
                  <Chip
                    key={key}
                    onClose={() => handleMethodSelection(key)}
                    style={styles.selectedChip}
                  >
                    {method.shortName}
                  </Chip>
                ) : null;
              })}
            </View>
          )}
        </Card.Content>
      </Card>

      {showComparison && selectedMethodsData.length >= 2 && (
        <Card style={styles.comparisonCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.comparisonTitle}>
              📊 Method Comparison
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <DataTable style={styles.dataTable}>
                {/* Header Row */}
                <DataTable.Header>
                  <DataTable.Title style={styles.firstColumn}>
                    <Text variant="bodySmall" style={styles.headerText}>
                      Feature
                    </Text>
                  </DataTable.Title>
                  {selectedMethodsData.map(({ method }) => (
                    <DataTable.Title key={method!.key} style={styles.methodColumn}>
                      <Text variant="bodySmall" style={styles.headerText}>
                        {method!.shortName}
                      </Text>
                    </DataTable.Title>
                  ))}
                </DataTable.Header>

                {/* Effectiveness Row */}
                <DataTable.Row>
                  <DataTable.Cell style={styles.firstColumn}>
                    <Text variant="bodySmall" style={styles.featureText}>
                      Effectiveness
                    </Text>
                  </DataTable.Cell>
                  {selectedMethodsData.map(({ method, data }) => (
                    <DataTable.Cell key={method!.key} style={styles.methodColumn}>
                      <Text variant="bodySmall">{data.effectiveness}</Text>
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>

                {/* Duration Row */}
                <DataTable.Row>
                  <DataTable.Cell style={styles.firstColumn}>
                    <Text variant="bodySmall" style={styles.featureText}>
                      Duration
                    </Text>
                  </DataTable.Cell>
                  {selectedMethodsData.map(({ method, data }) => (
                    <DataTable.Cell key={method!.key} style={styles.methodColumn}>
                      <Text variant="bodySmall">{data.duration}</Text>
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>

                {/* Hormonal Row */}
                <DataTable.Row>
                  <DataTable.Cell style={styles.firstColumn}>
                    <Text variant="bodySmall" style={styles.featureText}>
                      Hormones
                    </Text>
                  </DataTable.Cell>
                  {selectedMethodsData.map(({ method, data }) => (
                    <DataTable.Cell key={method!.key} style={styles.methodColumn}>
                      <Text variant="bodySmall">{data.hormonal}</Text>
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>

                {/* Cost Row */}
                <DataTable.Row>
                  <DataTable.Cell style={styles.firstColumn}>
                    <Text variant="bodySmall" style={styles.featureText}>
                      Cost
                    </Text>
                  </DataTable.Cell>
                  {selectedMethodsData.map(({ method, data }) => (
                    <DataTable.Cell key={method!.key} style={styles.methodColumn}>
                      <Text variant="bodySmall">{data.cost}</Text>
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>

                {/* STI Protection Row */}
                <DataTable.Row>
                  <DataTable.Cell style={styles.firstColumn}>
                    <Text variant="bodySmall" style={styles.featureText}>
                      STI Protection
                    </Text>
                  </DataTable.Cell>
                  {selectedMethodsData.map(({ method, data }) => (
                    <DataTable.Cell key={method!.key} style={styles.methodColumn}>
                      <Text
                        variant="bodySmall"
                        style={data.stiProtection === "Yes" ? styles.yesText : undefined}
                      >
                        {data.stiProtection}
                      </Text>
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>

                {/* Reversibility Row */}
                <DataTable.Row>
                  <DataTable.Cell style={styles.firstColumn}>
                    <Text variant="bodySmall" style={styles.featureText}>
                      Reversibility
                    </Text>
                  </DataTable.Cell>
                  {selectedMethodsData.map(({ method, data }) => (
                    <DataTable.Cell key={method!.key} style={styles.methodColumn}>
                      <Text variant="bodySmall">{data.reversibility}</Text>
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              </DataTable>
            </ScrollView>

            <Button
              mode="outlined"
              onPress={() => setShowComparison(false)}
              style={styles.hideButton}
            >
              Hide Comparison
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Method Selection */}
      <Card style={styles.methodsCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            💊 Modern Methods
          </Text>
          <Text variant="bodyMedium" style={styles.sectionDescription}>
            Select methods to compare their features side-by-side.
          </Text>
          <Divider style={styles.divider} />

          {CONTRACEPTIVE_METHODS.map((method) => (
            <View key={method.key} style={styles.methodItem}>
              <View
                style={[styles.methodCard, { backgroundColor: getCategoryColor(method.category) }]}
              >
                <Checkbox
                  status={selectedMethods.includes(method.key) ? "checked" : "unchecked"}
                  onPress={() => handleMethodSelection(method.key)}
                  disabled={!selectedMethods.includes(method.key) && selectedMethods.length >= 4}
                />
                <View style={styles.methodInfo}>
                  <Text variant="titleMedium" style={styles.methodName}>
                    {method.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.methodDescription}>
                    {method.shortName} • {method.category}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Natural Methods */}
      <Card style={styles.methodsCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🌿 Natural Methods
          </Text>
          <Divider style={styles.divider} />

          {NATURAL_METHODS.map((method) => (
            <View key={method.key} style={styles.methodItem}>
              <View
                style={[styles.methodCard, { backgroundColor: getCategoryColor(method.category) }]}
              >
                <Checkbox
                  status={selectedMethods.includes(method.key) ? "checked" : "unchecked"}
                  onPress={() => handleMethodSelection(method.key)}
                  disabled={!selectedMethods.includes(method.key) && selectedMethods.length >= 4}
                />
                <View style={styles.methodInfo}>
                  <Text variant="titleMedium" style={styles.methodName}>
                    {method.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.methodDescription}>
                    {method.shortName} • {method.category}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => router.push("/choose-contraceptive")}
              style={styles.primaryButton}
            >
              Get Personalized Recommendation
            </Button>
            <Button
              mode="outlined"
              onPress={() => router.push("/know-contraceptive")}
              style={styles.secondaryButton}
            >
              Learn More About Methods
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
  statusCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#f8f9fa",
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  compareButton: {
    backgroundColor: "#4CAF50",
  },
  selectedMethodsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedChip: {
    backgroundColor: "#e3f2fd",
  },
  comparisonCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  comparisonTitle: {
    textAlign: "center",
    marginBottom: 16,
    color: "#2e7d32",
    fontWeight: "bold",
  },
  dataTable: {
    minWidth: 600,
  },
  firstColumn: {
    minWidth: 100,
    maxWidth: 100,
  },
  methodColumn: {
    minWidth: 120,
    maxWidth: 120,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  featureText: {
    fontWeight: "500",
  },
  yesText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  hideButton: {
    marginTop: 16,
    borderColor: "#666",
  },
  methodsCard: {
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
  },
  divider: {
    marginBottom: 16,
  },
  methodItem: {
    marginBottom: 8,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    elevation: 1,
  },
  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  methodName: {
    fontWeight: "500",
    marginBottom: 4,
  },
  methodDescription: {
    color: "#666",
  },
  actionCard: {
    margin: 16,
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
});
