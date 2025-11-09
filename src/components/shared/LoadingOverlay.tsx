import React from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';
import { theme } from '../../utils/theme';

interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  visible: boolean;
  
  /**
   * Optional message to display
   */
  message?: string;
  
  /**
   * Whether to show as a modal overlay (blocks interaction)
   * @default true
   */
  modal?: boolean;
  
  /**
   * Background color of the overlay
   * @default 'rgba(0, 0, 0, 0.5)'
   */
  backgroundColor?: string;
}

/**
 * Full-screen or overlay loading component
 * 
 * @example
 * <LoadingOverlay visible={isLoading} message="Processing..." />
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
  modal = true,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  const content = (
    <View style={[styles.overlay, { backgroundColor }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        {message && (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>
    </View>
  );

  if (modal) {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => {}}
      >
        {content}
      </Modal>
    );
  }

  return visible ? content : null;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.medium,
  },
});

