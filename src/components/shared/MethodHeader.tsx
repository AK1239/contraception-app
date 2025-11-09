import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { getCategoryIconBackground } from '../../utils/theme';

interface MethodHeaderProps {
  icon: string;
  name: string;
  shortName?: string;
  description: string;
  category: string;
}

export default function MethodHeader({
  icon,
  name,
  shortName,
  description,
  category,
}: MethodHeaderProps) {
  return (
    <View style={styles.headerCard}>
      <View style={[styles.iconContainer, { backgroundColor: getCategoryIconBackground(category) }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text variant="headlineMedium" style={styles.title}>
        {name}
      </Text>
      {shortName && (
        <Text variant="titleSmall" style={styles.subtitle}>
          {shortName}
        </Text>
      )}
      <Text variant="bodyMedium" style={styles.description}>
        {description.includes('.') ? description.split('.')[0] + '.' : description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    color: '#111827',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  description: {
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

