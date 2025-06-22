import { StyleSheet, Text, View } from "react-native";

export default function ChooseContraceptivePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Contraceptive</Text>
      <Text style={styles.subtitle}>
        Get personalized recommendations based on your health profile
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
