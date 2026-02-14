import React from "react";
import { View, StyleSheet } from "react-native";
import { PersonalizationInput } from "../QuestionInput";
import { PersonalizationQuestion } from "../../constants/questions";
import { AnswerValue } from "../../types";

interface QuestionCardProps {
  question: PersonalizationQuestion;
  value: AnswerValue | undefined;
  onValueChange: (value: AnswerValue) => void;
  error?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onValueChange,
  error,
}) => {
  return (
    <View style={styles.container}>
      <PersonalizationInput
        question={question}
        value={value}
        onValueChange={onValueChange}
        error={error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});

