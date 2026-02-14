import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../../utils/theme";

interface PersonalizationHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
}

export const PersonalizationHeader: React.FC<PersonalizationHeaderProps> = ({
  totalQuestions,
}) => {
  return (
    <View style={styles.header}>
      <Text variant="titleLarge" style={styles.title}>
        Personalize Your Choice
      </Text>
      <View style={styles.questionCountBadge}>
        <Text variant="labelSmall" style={styles.questionCountText}>
          {totalQuestions} question{totalQuestions !== 1 ? "s" : ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 18,
    flex: 1,
  },
  questionCountBadge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  questionCountText: {
    color: "#6D28D9",
    fontSize: 11,
    fontWeight: "600",
  },
});

