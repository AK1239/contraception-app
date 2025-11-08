import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { ComparisonField } from '../services/methodDetailsService';
import { ALL_COMPARISON_METHODS } from '../constants/contraceptiveMethods';
import { getMethodDetails } from '../services/methodDetailsService';

interface ComparisonResultsProps {
  firstMethodKey: string | null;
  secondMethodKey: string | null;
  selectedFields: ComparisonField[];
}

export default function ComparisonResults({
  firstMethodKey,
  secondMethodKey,
  selectedFields,
}: ComparisonResultsProps) {
  const firstMethod = firstMethodKey ? ALL_COMPARISON_METHODS.find(m => m.key === firstMethodKey) : null;
  const secondMethod = secondMethodKey ? ALL_COMPARISON_METHODS.find(m => m.key === secondMethodKey) : null;

  if (!firstMethod || !secondMethod || selectedFields.length === 0 || !firstMethodKey || !secondMethodKey) {
    return null;
  }

  const firstDetails = getMethodDetails(firstMethodKey);
  const secondDetails = getMethodDetails(secondMethodKey);

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

  const renderField = (field: ComparisonField) => {
    const firstValue = getFieldValue(firstDetails, field);
    const secondValue = getFieldValue(secondDetails, field);

    // Always show the field card, even if data is not available
    // This provides a consistent comparison experience
    return (
      <Card key={field} style={styles.fieldCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.fieldTitle}>
            {getFieldLabel(field)}
          </Text>
          <Divider style={styles.divider} />
          <View style={styles.comparisonRow}>
            <View style={[styles.methodColumn, { backgroundColor: getCategoryColor(firstMethod.category) + '40' }]}>
              <Text variant="labelMedium" style={styles.methodHeader}>
                {firstMethod.shortName}
              </Text>
              <View style={styles.valueContainer}>
                {renderFieldValue(firstValue, field)}
              </View>
            </View>
            <View style={[styles.methodColumn, { backgroundColor: getCategoryColor(secondMethod.category) + '40' }]}>
              <Text variant="labelMedium" style={styles.methodHeader}>
                {secondMethod.shortName}
              </Text>
              <View style={styles.valueContainer}>
                {renderFieldValue(secondValue, field)}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.headerTitle}>
            Comparison Results
          </Text>
          <View style={styles.methodsHeader}>
            <View style={[styles.methodBadge, { backgroundColor: getCategoryColor(firstMethod.category) }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText}>
                {firstMethod.shortName}
              </Text>
            </View>
            <Text style={styles.vsText}>vs</Text>
            <View style={[styles.methodBadge, { backgroundColor: getCategoryColor(secondMethod.category) }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText}>
                {secondMethod.shortName}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {selectedFields.map(field => renderField(field))}
    </View>
  );
}

function getFieldValue(details: any, field: ComparisonField): any {
  if (!details) return null;
  
  switch (field) {
    case 'description':
      return details.description;
    case 'efficacy':
      return details.efficacy;
    case 'advantages':
      return details.advantages;
    case 'disadvantages':
      return details.disadvantages;
    case 'howToUse':
      return details.howToUse;
    case 'timeToWork':
      return details.timeToWork;
    case 'sideNotes':
      return details.sideNotes;
    case 'commonErrors':
      return details.commonErrors;
    default:
      return null;
  }
}

function getFieldLabel(field: ComparisonField): string {
  const labels: Record<ComparisonField, string> = {
    description: 'Description',
    efficacy: 'Efficacy',
    advantages: 'Advantages',
    disadvantages: 'Disadvantages',
    howToUse: 'How to Use',
    timeToWork: 'Time to Work',
    sideNotes: 'Side Notes',
    commonErrors: 'Common Errors',
  };
  return labels[field];
}

function renderFieldValue(value: any, field: ComparisonField): React.ReactNode {
  if (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
    return (
      <View style={styles.noDataContainer}>
        <Text variant="bodySmall" style={styles.noDataText}>
          Data not available yet
        </Text>
        <Text variant="bodySmall" style={styles.noDataSubtext}>
          Check individual method page for details
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
              <Text variant="bodySmall" style={styles.listText}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      );
    }
  }

  if (field === 'efficacy') {
    if (typeof value === 'object') {
      return (
        <View style={styles.efficacyContainer}>
          {value.rating && (
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>{value.rating}</Text>
            </View>
          )}
          {value.typicalUse && (
            <Text variant="bodySmall" style={styles.efficacyText}>
              Typical: {value.typicalUse}
            </Text>
          )}
          {value.perfectUse && (
            <Text variant="bodySmall" style={styles.efficacyText}>
              Perfect: {value.perfectUse}
            </Text>
          )}
        </View>
      );
    }
  }

  return (
    <Text variant="bodySmall" style={styles.textValue}>
      {String(value)}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  headerCard: {
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '700',
    color: '#111827',
  },
  methodsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  methodBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  methodBadgeText: {
    color: '#111827',
    fontWeight: '600',
  },
  vsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  fieldCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  fieldTitle: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  comparisonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  methodColumn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  methodHeader: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  valueContainer: {
    minHeight: 40,
  },
  textValue: {
    color: '#4B5563',
    lineHeight: 20,
  },
  noDataContainer: {
    paddingVertical: 8,
  },
  noDataText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  noDataSubtext: {
    color: '#D1D5DB',
    fontSize: 11,
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
    color: '#6B7280',
  },
  listText: {
    flex: 1,
    color: '#4B5563',
    lineHeight: 20,
  },
  efficacyContainer: {
    gap: 8,
  },
  efficacyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  efficacyLabel: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 12,
  },
  efficacyText: {
    color: '#4B5563',
    lineHeight: 18,
  },
});

