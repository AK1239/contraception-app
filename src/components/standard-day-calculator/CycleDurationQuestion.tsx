import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface CycleDurationQuestionProps {
  onAnswer: (isInRange: boolean) => void;
}

export default function CycleDurationQuestion({ onAnswer }: CycleDurationQuestionProps) {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <View style={styles.questionNumber}>
            <Text style={styles.questionNumberText}>1</Text>
          </View>
          <Text style={styles.questionTitle}>Cycle Duration</Text>
        </View>
        
        <Text style={styles.questionText}>
          Is the duration of your menstrual cycle between 26 to 32 days?
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.answerButton, styles.yesButton]}
            onPress={() => onAnswer(true)}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.answerButtonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.answerButton, styles.noButton]}
            onPress={() => onAnswer(false)}
          >
            <Ionicons name="close-circle" size={24} color="#fff" />
            <Text style={styles.answerButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  questionNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
  },
  questionNumberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  questionText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  answerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  yesButton: {
    backgroundColor: "#059669",
  },
  noButton: {
    backgroundColor: "#EF4444",
  },
  answerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "PlusJakartaSans_700Bold",
  },
});

