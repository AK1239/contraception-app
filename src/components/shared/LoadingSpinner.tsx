import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { theme } from '../../utils/theme';

interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default 'large'
   */
  size?: 'small' | 'large';
  
  /**
   * Color of the spinner
   * @default theme.colors.primary
   */
  color?: string;
  
  /**
   * Optional message to display below the spinner
   */
  message?: string;
  
  /**
   * Whether to center the spinner in its container
   * @default true
   */
  centered?: boolean;
}

/**
 * Reusable loading spinner component
 * 
 * @example
 * <LoadingSpinner message="Calculating results..." />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary,
  message,
  centered = true,
}) => {
  return (
    <View style={[styles.container, centered && styles.centered]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  message: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

