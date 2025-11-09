import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface ListSectionProps {
  items: string[];
  variant?: 'default' | 'warning';
}

export default function ListSection({ items, variant = 'default' }: ListSectionProps) {
  return (
    <View style={styles.listContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.listItemRow}>
          <View style={[styles.bullet, variant === 'warning' && styles.bulletWarning]} />
          <Text variant="bodyMedium" style={styles.listItemText}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginTop: 8,
    marginRight: 12,
  },
  bulletWarning: {
    backgroundColor: '#F59E0B',
  },
  listItemText: {
    flex: 1,
    color: '#4B5563',
    lineHeight: 24,
    fontSize: 15,
  },
});

