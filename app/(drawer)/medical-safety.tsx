import { StyleSheet, View } from "react-native";
import { MedicalQuestionnaire } from "../../src/components/MedicalQuestionnaire";

export default function MedicalSafetyPage() {
  return (
    <View style={styles.container}>
      <MedicalQuestionnaire />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
