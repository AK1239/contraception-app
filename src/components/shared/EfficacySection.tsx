import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { getEfficacyBadgeColor, getEfficacyTextColor } from '../../utils/theme';

interface EfficacyData {
  label: string;
  typicalUse: string;
  perfectUse?: string;
}

interface EfficacySectionProps {
  efficacy: EfficacyData;
}

/**
 * Helper to extract highlighted numbers from text (like "13%" or "2%")
 */
function renderEfficacyText(text: string) {
  const parts = text.split(/(\d+%)/g);
  return (
    <Text>
      {parts.map((part, index) => {
        if (/\d+%/.test(part)) {
          return (
            <Text key={index} style={styles.highlight}>
              {part}
            </Text>
          );
        }
        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
}

export default function EfficacySection({ efficacy }: EfficacySectionProps) {
  return (
    <View>
      <View style={[styles.efficacyBadge, { backgroundColor: getEfficacyBadgeColor(efficacy.label) }]}>
        <Text style={[styles.efficacyLabel, { color: getEfficacyTextColor(efficacy.label) }]}>
          {efficacy.label}
        </Text>
      </View>
      <Text variant="bodyMedium" style={styles.sectionText}>
        {renderEfficacyText(efficacy.typicalUse)}
      </Text>
      {efficacy.perfectUse && (
        <Text variant="bodyMedium" style={[styles.sectionText, styles.marginTop]}>
          {renderEfficacyText(efficacy.perfectUse)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  efficacyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  efficacyLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  sectionText: {
    color: '#4B5563',
    lineHeight: 24,
    fontSize: 15,
  },
  marginTop: {
    marginTop: 12,
  },
  highlight: {
    color: '#111827',
    fontWeight: '600',
  },
});

