import { StyleSheet, Text, View } from "react-native";

export default function AboutUsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About ContraSafe</Text>
      <Text style={styles.subtitle}>
        Learn more about our mission to provide reliable contraceptive guidance
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
