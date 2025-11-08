import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { ComparisonField, getFieldLabel } from '../services/methodDetailsService';
import { ALL_COMPARISON_METHODS } from '../constants/contraceptiveMethods';
import { getContraceptiveMethodById } from '../utils/contraceptiveMethodsData';

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hormonal':
        return '#e3f2fd';
      case 'non-hormonal':
        return '#e8f5e8';
      case 'permanent':
        return '#fff3e0';
      case 'barrier':
        return '#f3e5f5';
      case 'natural':
        return '#fce4ec';
      default:
        return '#f5f5f5';
    }
  };

  const progressPercentage = ((currentFieldIndex + 1) / selectedFields.length) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Indicator */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <View style={styles.progressHeader}>
            <Text variant="labelMedium" style={styles.progressText}>
              Comparison {currentFieldIndex + 1} of {selectedFields.length}
            </Text>
            <Text variant="labelSmall" style={styles.fieldNameText}>
              {getFieldLabel(currentField)}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
        </Card.Content>
      </Card>

      {/* Methods Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.methodsHeader}>
            <View style={[styles.methodBadge, { backgroundColor: getCategoryColor(firstMethod.category) }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText} numberOfLines={1}>
                {firstMethod.shortName}
              </Text>
            </View>
            <Text style={styles.vsText}>vs</Text>
            <View style={[styles.methodBadge, { backgroundColor: getCategoryColor(secondMethod.category) }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText} numberOfLines={1}>
                {secondMethod.shortName}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Field Comparison */}
      <Card style={styles.comparisonCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.fieldTitle}>
            {getFieldLabel(currentField)}
          </Text>
          <Divider style={styles.divider} />
          
          <View style={styles.comparisonContainer}>
            {/* First Method */}
            <View style={styles.methodSection}>
              <View style={[styles.methodHeader, { backgroundColor: getCategoryColor(firstMethod.category) + '80' }]}>
                <Text variant="titleMedium" style={styles.methodName}>
                  {firstMethod.shortName}
                </Text>
              </View>
              <View style={styles.valueContainer}>
                {renderFieldValue(firstValue, currentField)}
              </View>
            </View>

            {/* Second Method */}
            <View style={styles.methodSection}>
              <View style={[styles.methodHeader, { backgroundColor: getCategoryColor(secondMethod.category) + '80' }]}>
                <Text variant="titleMedium" style={styles.methodName}>
                  {secondMethod.shortName}
                </Text>
              </View>
              <View style={styles.valueContainer}>
                {renderFieldValue(secondValue, currentField)}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Navigation Buttons */}
      <Card style={styles.navigationCard}>
        <Card.Content>
          <View style={styles.buttonContainer}>
            {!isFirstField ? (
              <>
                <Button
                  mode="outlined"
                  onPress={onPrevious}
                  style={styles.navButton}
                  labelStyle={styles.navButtonLabel}
                >
                  Previous
                </Button>
                <View style={styles.spacer} />
                {isLastField ? (
                  <Button
                    mode="contained"
                    onPress={onBackToSelection}
                    style={[styles.navButton, styles.primaryButton]}
                    labelStyle={styles.navButtonLabel}
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    onPress={onNext}
                    style={[styles.navButton, styles.primaryButton]}
                    labelStyle={styles.navButtonLabel}
                  >
                    Next
                  </Button>
                )}
              </>
            ) : (
              isLastField ? (
                <Button
                  mode="contained"
                  onPress={onBackToSelection}
                  style={[styles.navButton, styles.primaryButton, styles.navButtonFullWidth]}
                  labelStyle={styles.navButtonLabel}
                >
                  Back to Selection
                </Button>
              ) : (
                <>
                  <View style={styles.spacer} />
                  <Button
                    mode="contained"
                    onPress={onNext}
                    style={[styles.navButton, styles.primaryButton, styles.navButtonRightAligned]}
                    labelStyle={styles.navButtonLabel}
                  >
                    Next
                  </Button>
                </>
              )
            )}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

function getFieldValue(methodData: any, field: ComparisonField): any {
  if (!methodData) return null;
  
  switch (field) {
    case 'description':
      return methodData.description;
    case 'efficacy':
      return methodData.efficacy;
    case 'advantages':
      return methodData.advantages;
    case 'disadvantages':
      return methodData.disadvantages;
    case 'howToUse':
      return methodData.howToUse;
    case 'timeToWork':
      return methodData.timeToWork;
    case 'sideNotes':
      return methodData.sideNotes;
    case 'commonErrors':
      return methodData.commonErrors;
    default:
      return null;
  }
}

function renderFieldValue(value: any, field: ComparisonField): React.ReactNode {
  if (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
    return (
      <View style={styles.noDataContainer}>
        <Text variant="bodySmall" style={styles.noDataText}>
          Data not available
        </Text>
      </View>
    );
  }

  if (field === 'advantages' || field === 'disadvantages' || field === 'commonErrors') {
    if (Array.isArray(value)) {
      return (
        <View style={styles.listContainer}>
          {value.map((item: string, index: number) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text variant="bodyMedium" style={styles.listText}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      );
    }
  }

  if (field === 'efficacy') {
    if (typeof value === 'object' && value !== null) {
      return (
        <View style={styles.efficacyContainer}>
          {value.label && (
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>{value.label}</Text>
            </View>
          )}
          {value.typicalUse && (
            <View style={styles.efficacyTextContainer}>
              <Text variant="labelSmall" style={styles.efficacyLabelText}>
                Typical Use:
              </Text>
              <Text variant="bodySmall" style={styles.efficacyText}>
                {value.typicalUse}
              </Text>
            </View>
          )}
          {value.perfectUse && (
            <View style={styles.efficacyTextContainer}>
              <Text variant="labelSmall" style={styles.efficacyLabelText}>
                Perfect Use:
              </Text>
              <Text variant="bodySmall" style={styles.efficacyText}>
                {value.perfectUse}
              </Text>
            </View>
          )}
        </View>
      );
    }
  }

  return (
    <Text variant="bodyMedium" style={styles.textValue}>
      {String(value)}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
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
  headerCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  methodsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  methodBadge: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  methodBadgeText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
  },
  vsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
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
  methodSection: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  methodHeader: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  methodName: {
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  valueContainer: {
    padding: 16,
    minHeight: 60,
  },
  textValue: {
    color: '#4B5563',
    lineHeight: 24,
  },
  noDataContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  noDataText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  listText: {
    flex: 1,
    color: '#4B5563',
    lineHeight: 22,
  },
  efficacyContainer: {
    gap: 12,
  },
  efficacyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  efficacyLabel: {
    color: '#1E40AF',
    fontWeight: '700',
    fontSize: 14,
  },
  efficacyTextContainer: {
    gap: 4,
  },
  efficacyLabelText: {
    color: '#111827',
    fontWeight: '600',
  },
  efficacyText: {
    color: '#4B5563',
    lineHeight: 20,
  },
  navigationCard: {
    margin: 16,
    marginBottom: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  navButton: {
    flex: 1,
  },
  navButtonFullWidth: {
    flex: 0,
    alignSelf: 'stretch',
  },
  navButtonRightAligned: {
    flex: 0,
    minWidth: 100,
  },
  primaryButton: {
    backgroundColor: '#6D28D9',
  },
  navButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 4,
  },
  spacer: {
    flex: 1,
  },
});

