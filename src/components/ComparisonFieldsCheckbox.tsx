import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { COMPARISON_FIELDS, ComparisonField } from '../services/methodDetailsService';

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

interface ComparisonFieldsCheckboxProps {
  selectedFields: ComparisonField[];
  onToggleField: (field: ComparisonField) => void;
}

export default function ComparisonFieldsCheckbox({
  selectedFields,
  onToggleField,
}: ComparisonFieldsCheckboxProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text variant="labelLarge" style={styles.label}>
        {t("compare.whatToCompare")}
      </Text>
      <View style={styles.fieldsContainer}>
        {COMPARISON_FIELDS.map((field) => {
          const isSelected = selectedFields.includes(field.key);
          return (
            <TouchableOpacity
              key={field.key}
              style={[
                styles.fieldItem,
                isSelected && styles.fieldItemSelected,
              ]}
              onPress={() => onToggleField(field.key)}
              activeOpacity={0.7}
            >
              <Checkbox
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => onToggleField(field.key)}
                color="#3B82F6"
              />
              <Text
                variant="bodyMedium"
                style={[
                  styles.fieldLabel,
                  isSelected && styles.fieldLabelSelected,
                ]}
              >
                {t(FIELD_KEYS[field.key])}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 12,
    color: '#1E293B',
    fontWeight: '600',
  },
  fieldsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  fieldItemSelected: {
    backgroundColor: '#EFF6FF',
  },
  fieldLabel: {
    flex: 1,
    color: '#4B5563',
  },
  fieldLabelSelected: {
    color: '#1E40AF',
    fontWeight: '600',
  },
});

