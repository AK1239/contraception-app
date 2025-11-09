import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface WarningBoxProps {
  message: string;
  variant?: 'warning' | 'note';
}

export default function WarningBox({ message, variant = 'warning' }: WarningBoxProps) {
  return (
    <View style={[styles.box, variant === 'note' && styles.noteBox]}>
      <Text variant="bodySmall" style={[styles.text, variant === 'note' && styles.noteText]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  noteBox: {
    backgroundColor: '#FFFBEB',
    borderLeftColor: '#F59E0B',
  },
  text: {
    color: '#991B1B',
    lineHeight: 20,
  },
  noteText: {
    color: '#78350F',
  },
});

