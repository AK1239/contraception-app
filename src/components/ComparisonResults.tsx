import React, { memo, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { ComparisonField, getFieldLabel } from '../services/methodDetailsService';
import { getCategoryColor } from '../utils/theme';
import { useMemoizedComparison } from '../hooks/useMemoizedComparison';

interface ComparisonResultsProps {
  firstMethodKey: string | null;
  secondMethodKey: string | null;
  selectedFields: ComparisonField[];
}

/**
 * Memoized field card component for comparison results
 */
const ComparisonFieldCard = memo(({ 
  field, 
  firstValue, 
  secondValue, 
  firstMethod, 
  secondMethod 
}: {
  field: ComparisonField;
  firstValue: any;
  secondValue: any;
  firstMethod: { shortName: string; category: string };
  secondMethod: { shortName: string; category: string };
}) => {
  const firstCategoryColor = useMemo(
    () => getCategoryColor(firstMethod.category) + '40',
    [firstMethod.category]
  );
  const secondCategoryColor = useMemo(
    () => getCategoryColor(secondMethod.category) + '40',
    [secondMethod.category]
  );

  return (
    <Card style={styles.fieldCard}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.fieldTitle}>
          {getFieldLabel(field)}
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.comparisonRow}>
          <View style={[styles.methodColumn, { backgroundColor: firstCategoryColor }]}>
            <Text variant="labelMedium" style={styles.methodHeader}>
              {firstMethod.shortName}
            </Text>
            <View style={styles.valueContainer}>
              {renderFieldValue(firstValue, field)}
            </View>
          </View>
          <View style={[styles.methodColumn, { backgroundColor: secondCategoryColor }]}>
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
});

ComparisonFieldCard.displayName = 'ComparisonFieldCard';

function ComparisonResults({
  firstMethodKey,
  secondMethodKey,
  selectedFields,
}: ComparisonResultsProps) {
  // Use memoized hook for expensive lookups
  const { firstMethod, secondMethod, firstDetails, secondDetails, isValid } = 
    useMemoizedComparison(firstMethodKey, secondMethodKey, selectedFields);

  if (!isValid || !firstMethod || !secondMethod) {
    return null;
  }

  // Memoize field values extraction
  const fieldValues = useMemo(() => {
    return selectedFields.map(field => ({
      field,
      firstValue: getFieldValue(firstDetails, field),
      secondValue: getFieldValue(secondDetails, field),
    }));
  }, [selectedFields, firstDetails, secondDetails]);

  // Memoize header colors
  const firstCategoryColor = useMemo(
    () => getCategoryColor(firstMethod.category),
    [firstMethod.category]
  );
  const secondCategoryColor = useMemo(
    () => getCategoryColor(secondMethod.category),
    [secondMethod.category]
  );

  const renderField = useCallback(({ field, firstValue, secondValue }: {
    field: ComparisonField;
    firstValue: any;
    secondValue: any;
  }) => {
    return (
      <ComparisonFieldCard
        key={field}
        field={field}
        firstValue={firstValue}
        secondValue={secondValue}
        firstMethod={firstMethod}
        secondMethod={secondMethod}
      />
    );
  }, [firstMethod, secondMethod]);

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.headerTitle}>
            Comparison Results
          </Text>
          <View style={styles.methodsHeader}>
            <View style={[styles.methodBadge, { backgroundColor: firstCategoryColor }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText}>
                {firstMethod.shortName}
              </Text>
            </View>
            <Text style={styles.vsText}>vs</Text>
            <View style={[styles.methodBadge, { backgroundColor: secondCategoryColor }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText}>
                {secondMethod.shortName}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {fieldValues.map(({ field, firstValue, secondValue }) => 
        renderField({ field, firstValue, secondValue })
      )}
    </View>
  );
}

export default memo(ComparisonResults);

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


/**
 * Memoized list item component for better performance
 */
const ListItem = memo(({ item }: { item: string }) => (
  <View style={styles.listItem}>
    <Text style={styles.bullet}>•</Text>
    <Text variant="bodySmall" style={styles.listText}>
      {item}
    </Text>
  </View>
));
ListItem.displayName = 'ListItem';

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
            <ListItem key={`${item}-${index}`} item={item} />
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

