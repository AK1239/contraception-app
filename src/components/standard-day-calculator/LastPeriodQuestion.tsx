import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import StandardDayCalendar from "../StandardDayCalendar";

interface LastPeriodQuestionProps {
  onDateSelect: (date: Date) => void;
}

export default function LastPeriodQuestion({ onDateSelect }: LastPeriodQuestionProps) {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <View style={styles.questionNumber}>
            <Text style={styles.questionNumberText}>2</Text>
          </View>
          <Text style={styles.questionTitle}>Last Period Date</Text>
        </View>
        
        <Text style={styles.questionText}>
          When was the first day of your last period?
        </Text>

        <StandardDayCalendar onDateSelect={onDateSelect} />
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
    fontFamily: "PlusJakartaSans_400Regular",
  },
});

