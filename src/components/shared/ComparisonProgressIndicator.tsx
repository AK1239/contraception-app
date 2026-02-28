import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { ComparisonField } from '../../services/methodDetailsService';

const FIELD_KEYS: Record<ComparisonField, string> = {
  description: "compare.fieldDescription",
  efficacy: "compare.fieldEfficacy",
  advantages: "compare.fieldAdvantages",
  disadvantages: "compare.fieldDisadvantages",
  howToUse: "compare.fieldHowToUse",
  timeToWork: "compare.fieldTimeToWork",
  sideNotes: "compare.fieldSideNotes",
  commonErrors: "compare.fieldCommonErrors",
};

interface ComparisonProgressIndicatorProps {
  currentIndex: number;
  totalFields: number;
  currentField: ComparisonField;
}

export default function ComparisonProgressIndicator({
  currentIndex,
  totalFields,
  currentField,
}: ComparisonProgressIndicatorProps) {
  const { t } = useTranslation();
  const progressPercentage = ((currentIndex + 1) / totalFields) * 100;

  return (
    <Card style={styles.progressCard}>
      <Card.Content>
        <View style={styles.progressHeader}>
          <Text variant="labelMedium" style={styles.progressText}>
            {t("compare.progressOf", { current: currentIndex + 1, total: totalFields })}
          </Text>
          <Text variant="labelSmall" style={styles.fieldNameText}>
            {t(FIELD_KEYS[currentField])}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  progressHeader: {
    marginBottom: 12,
  },
  progressText: {
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldNameText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6D28D9',
    borderRadius: 4,
  },
});

