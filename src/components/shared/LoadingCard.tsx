import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from '../../utils/theme';

interface LoadingCardProps {
  /**
   * Title to display in the card
   */
  title?: string;
  
  /**
   * Message to display below the spinner
   */
  message?: string;
  
  /**
   * Whether to show a compact version
   * @default false
   */
  compact?: boolean;
}

/**
 * Card-based loading component
 * Useful for loading states within card layouts
 * 
 * @example
 * <LoadingCard title="Processing" message="Please wait..." />
 */
export const LoadingCard: React.FC<LoadingCardProps> = ({
  title,
  message,
  compact = false,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={[styles.content, compact && styles.compact]}>
        {title && (
          <Text style={styles.title}>{title}</Text>
        )}
        <ActivityIndicator
          size={compact ? 'small' : 'large'}
          color={theme.colors.primary}
          style={styles.spinner}
        />
        {message && (
          <Text style={styles.message}>{message}</Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.spacing.lg,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
    minHeight: 150,
  },
  compact: {
    paddingVertical: theme.spacing.md,
    minHeight: 80,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  spinner: {
    marginVertical: theme.spacing.md,
  },
  message: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});

