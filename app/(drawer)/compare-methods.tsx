import { StyleSheet, Text, View } from "react-native";

export default function CompareMethodsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compare Contraceptive Methods</Text>
      <Text style={styles.subtitle}>
        Side-by-side comparison of different contraceptive options
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
