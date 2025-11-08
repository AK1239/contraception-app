import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import MethodDropdown from '../../src/components/MethodDropdown';
import ComparisonFieldsCheckbox from '../../src/components/ComparisonFieldsCheckbox';
import SequentialComparisonView from '../../src/components/SequentialComparisonView';
import { ComparisonField, COMPARISON_FIELDS } from '../../src/services/methodDetailsService';

// Initialize with all fields selected by default
const getAllComparisonFields = (): ComparisonField[] => {
  return COMPARISON_FIELDS.map(field => field.key);
};

export default function CompareMethodsPage() {
  const [firstMethodKey, setFirstMethodKey] = useState<string | null>(null);
  const [secondMethodKey, setSecondMethodKey] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<ComparisonField[]>(getAllComparisonFields());
  const [isComparing, setIsComparing] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  const handleToggleField = (field: ComparisonField) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const canCompare = firstMethodKey && secondMethodKey && selectedFields.length > 0;

  const handleCompare = () => {
    if (canCompare) {
      setIsComparing(true);
      setCurrentFieldIndex(0);
    }
  };

  const handleNext = () => {
    if (currentFieldIndex < selectedFields.length - 1) {
      setCurrentFieldIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(prev => prev - 1);
    }
  };

  const handleBackToSelection = () => {
    setIsComparing(false);
    setCurrentFieldIndex(0);
  };

  // Show sequential comparison view when comparing
  if (isComparing && firstMethodKey && secondMethodKey) {
    return (
      <SequentialComparisonView
        firstMethodKey={firstMethodKey}
        secondMethodKey={secondMethodKey}
        selectedFields={selectedFields}
        currentFieldIndex={currentFieldIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onBackToSelection={handleBackToSelection}
      />
    );
  }

  // Show selection UI
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerIconContainer}>
            <Text style={styles.headerIcon}>⚖️</Text>
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            Compare Contraceptive Methods
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Select two methods and choose what you want to compare. See side-by-side differences to help you make an informed decision.
          </Text>
        </Card.Content>
      </Card>

      {/* Method Selection */}
      <Card style={styles.selectionCard}>
        <Card.Content>
          <MethodDropdown
            label="First Contraceptive"
            selectedMethodKey={firstMethodKey}
            onSelect={setFirstMethodKey}
            excludeMethodKey={secondMethodKey}
          />

          <MethodDropdown
            label="Second Contraceptive"
            selectedMethodKey={secondMethodKey}
            onSelect={setSecondMethodKey}
            excludeMethodKey={firstMethodKey}
          />
        </Card.Content>
      </Card>

      {/* Comparison Fields Selection */}
      <Card style={styles.fieldsCard}>
        <Card.Content>
          <ComparisonFieldsCheckbox
            selectedFields={selectedFields}
            onToggleField={handleToggleField}
          />
        </Card.Content>
      </Card>

      {/* Compare Button */}
      <Card style={styles.buttonCard}>
        <Card.Content>
          <Button
            mode="contained"
            style={styles.compareButton}
            labelStyle={styles.compareButtonLabel}
            disabled={!canCompare}
            onPress={handleCompare}
          >
            Compare
          </Button>
        </Card.Content>
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerIconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 48,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#111827',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 22,
  },
  selectionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fieldsCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helperCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  helperText: {
    textAlign: 'center',
    color: '#78350F',
    lineHeight: 20,
  },
  actionCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  secondaryButton: {
    borderColor: '#3B82F6',
  },
  disclaimerCard: {
    margin: 16,
    marginBottom: 24,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  disclaimerText: {
    lineHeight: 20,
    color: '#9A3412',
    textAlign: 'center',
  },
  buttonCard: {
    margin: 16,
    marginBottom: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  compareButton: {
    backgroundColor: '#6D28D9',
    paddingVertical: 8,
  },
  compareButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
    color: '#FFFFFF',
  },
});
