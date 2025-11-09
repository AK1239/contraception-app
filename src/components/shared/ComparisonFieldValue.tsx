import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text } from 'react-native-paper';
import { ComparisonField } from '../../services/methodDetailsService';
import { getEfficacyBadgeColor, getEfficacyTextColor } from '../../utils/theme';

interface ComparisonFieldValueProps {
  value: any;
  field: ComparisonField;
  methodImage?: ImageSourcePropType;
  howToUseImage?: ImageSourcePropType;
  methodName: string;
  categoryColor: string;
}

export default function ComparisonFieldValue({
  value,
  field,
  methodImage,
  howToUseImage,
  methodName,
  categoryColor,
}: ComparisonFieldValueProps) {
  return (
    <View style={styles.methodSection}>
      <View style={[styles.methodHeader, { backgroundColor: categoryColor + '80' }]}>
        <Text variant="titleMedium" style={styles.methodName}>
          {methodName}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        {/* Show image for description field or howToUseImage for howToUse field */}
        {field === 'description' && methodImage && (
          <View style={styles.comparisonImageContainer}>
            <Image 
              source={methodImage} 
              style={styles.comparisonImage}
              resizeMode="contain"
            />
          </View>
        )}
        {field === 'howToUse' && howToUseImage && (
          <View style={styles.comparisonImageContainer}>
            <Image 
              source={howToUseImage} 
              style={styles.comparisonImage}
              resizeMode="contain"
            />
          </View>
        )}
        {renderFieldValue(value, field)}
      </View>
    </View>
  );
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
            <View style={[styles.efficacyBadge, { backgroundColor: getEfficacyBadgeColor(value.label) }]}>
              <Text style={[styles.efficacyLabel, { color: getEfficacyTextColor(value.label) }]}>
                {value.label}
              </Text>
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
  methodSection: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 16,
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
  comparisonImageContainer: {
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  comparisonImage: {
    width: '100%',
    maxWidth: 250,
    height: 150,
    borderRadius: 6,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  efficacyLabel: {
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
});

