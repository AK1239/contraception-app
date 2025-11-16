import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ComparisonField, getFieldLabel } from '../services/methodDetailsService';
import { ALL_COMPARISON_METHODS } from '../constants/contraceptiveMethods';
import { getContraceptiveMethodById } from '../utils/contraceptiveMethodsData';
import { getCategoryColor } from '../utils/theme';
import { getFieldValue } from '../utils/comparisonUtils';
import ComparisonProgressIndicator from './shared/ComparisonProgressIndicator';
import ComparisonMethodsHeader from './shared/ComparisonMethodsHeader';
import ComparisonFieldValue from './shared/ComparisonFieldValue';
import ComparisonNavigationButtons from './shared/ComparisonNavigationButtons';

interface SequentialComparisonViewProps {
  firstMethodKey: string;
  secondMethodKey: string;
  selectedFields: ComparisonField[];
  currentFieldIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onBackToSelection: () => void;
}

export default function SequentialComparisonView({
  firstMethodKey,
  secondMethodKey,
  selectedFields,
  currentFieldIndex,
  onPrevious,
  onNext,
  onBackToSelection,
}: SequentialComparisonViewProps) {
  const insets = useSafeAreaInsets();
  const currentField = selectedFields[currentFieldIndex];
  const isFirstField = currentFieldIndex === 0;
  const isLastField = currentFieldIndex === selectedFields.length - 1;

  // Get method data from contraceptiveMethodsData
  const firstMethodData = getContraceptiveMethodById(firstMethodKey);
  const secondMethodData = getContraceptiveMethodById(secondMethodKey);

  // Fallback to ALL_COMPARISON_METHODS if not found
  const firstMethod = firstMethodData 
    ? { name: firstMethodData.name, shortName: firstMethodData.shortName || firstMethodData.name, category: firstMethodData.category }
    : ALL_COMPARISON_METHODS.find(m => m.key === firstMethodKey);
  const secondMethod = secondMethodData
    ? { name: secondMethodData.name, shortName: secondMethodData.shortName || secondMethodData.name, category: secondMethodData.category }
    : ALL_COMPARISON_METHODS.find(m => m.key === secondMethodKey);

  if (!firstMethod || !secondMethod || !currentField) {
    return null;
  }

  // Get field values
  const firstValue = getFieldValue(firstMethodData, currentField);
  const secondValue = getFieldValue(secondMethodData, currentField);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
      showsVerticalScrollIndicator={false}
    >
      <ComparisonProgressIndicator
        currentIndex={currentFieldIndex}
        totalFields={selectedFields.length}
        currentField={currentField}
      />

      <ComparisonMethodsHeader
        firstMethod={firstMethod}
        secondMethod={secondMethod}
        firstMethodImage={firstMethodData?.image}
        secondMethodImage={secondMethodData?.image}
      />

      <Card style={styles.comparisonCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.fieldTitle}>
            {getFieldLabel(currentField)}
          </Text>
          <Divider style={styles.divider} />
          
          <View style={styles.comparisonContainer}>
            <ComparisonFieldValue
              value={firstValue}
              field={currentField}
              methodImage={firstMethodData?.image}
              howToUseImage={firstMethodData?.howToUseImage}
              methodName={firstMethod.shortName}
              categoryColor={getCategoryColor(firstMethod.category)}
            />

            <ComparisonFieldValue
              value={secondValue}
              field={currentField}
              methodImage={secondMethodData?.image}
              howToUseImage={secondMethodData?.howToUseImage}
              methodName={secondMethod.shortName}
              categoryColor={getCategoryColor(secondMethod.category)}
            />
          </View>
        </Card.Content>
      </Card>

      <ComparisonNavigationButtons
        isFirstField={isFirstField}
        isLastField={isLastField}
        onPrevious={onPrevious}
        onNext={onNext}
        onBackToSelection={onBackToSelection}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  comparisonCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fieldTitle: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  divider: {
    marginBottom: 16,
  },
  comparisonContainer: {
    gap: 16,
  },
});

