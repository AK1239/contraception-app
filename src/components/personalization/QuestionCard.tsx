import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
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
    <Card style={styles.questionCard}>
      <Card.Content>
        <PersonalizationInput
          question={question}
          value={value}
          onValueChange={onValueChange}
          error={error}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    margin: 16,
    marginBottom: 8,
  },
});

