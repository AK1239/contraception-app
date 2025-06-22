import { StyleSheet, Text, View } from "react-native";

export default function MedicalSafetyPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Safety</Text>
      <Text style={styles.subtitle}>
        Take the medical questionnaire to find safe contraceptive options for you
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
