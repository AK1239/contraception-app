/**
 * Theme utilities for ContraSafe
 * 
 * Centralized color mapping functions and theme constants
 * to reduce code duplication across components.
 */

export type ContraceptiveCategory = 
  | 'hormonal' 
  | 'non-hormonal' 
  | 'permanent' 
  | 'barrier' 
  | 'natural';

export type EfficacyLabel = 'Perfect' | 'Excellent' | 'Good' | string;

/**
 * Get background color for a contraceptive category
 * Used for cards, badges, and category-based UI elements
 */
export const getCategoryColor = (category: string): string => {
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

/**
 * Get icon background color for a contraceptive category
 * Used for icon containers and headers
 */
export const getCategoryIconBackground = (category: string): string => {
  switch (category) {
    case 'hormonal':
      return '#DBEAFE';
    case 'non-hormonal':
      return '#D1FAE5';
    case 'permanent':
      return '#FEE2E2';
    case 'barrier':
      return '#FEE2E2';
    case 'natural':
      return '#FEF3C7';
    default:
      return '#E5E7EB';
  }
};

/**
 * Get emoji icon for a contraceptive category
 */
export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'hormonal':
      return '💊';
    case 'non-hormonal':
      return '🔗';
    case 'permanent':
      return '✂️';
    case 'barrier':
      return '🛡️';
    case 'natural':
      return '🌿';
    default:
      return '📋';
  }
};

/**
 * Get background color for efficacy badge
 * Based on efficacy label (Perfect, Excellent, Good, etc.)
 */
export const getEfficacyBadgeColor = (label: string): string => {
  switch (label) {
    case 'Perfect':
      return '#D1FAE5';
    case 'Excellent':
      return '#D1FAE5';
    case 'Good':
      return '#DBEAFE';
    default:
      return '#F3F4F6';
  }
};

/**
 * Get text color for efficacy badge
 * Based on efficacy label to ensure proper contrast
 */
export const getEfficacyTextColor = (label: string): string => {
  switch (label) {
    case 'Perfect':
      return '#065F46';
    case 'Excellent':
      return '#065F46';
    case 'Good':
      return '#1E40AF';
    default:
      return '#374151';
  }
};

/**
 * Theme constants for consistent styling
 */
export const theme = {
  colors: {
    // Primary colors
    primary: '#6D28D9',
    primaryLight: '#e3f2fd',
    primaryDark: '#1976d2',
    
    // Category colors
    hormonal: '#e3f2fd',
    nonHormonal: '#e8f5e8',
    permanent: '#fff3e0',
    barrier: '#f3e5f5',
    natural: '#fce4ec',
    
    // Text colors
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    textDisabled: '#D1D5DB',
    
    // Background colors
    background: '#F9FAFB',
    backgroundSecondary: '#FFFFFF',
    backgroundTertiary: '#f5f5f5',
    
    // Border colors
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Efficacy colors
    efficacyPerfect: '#D1FAE5',
    efficacyPerfectText: '#065F46',
    efficacyExcellent: '#D1FAE5',
    efficacyExcellentText: '#065F46',
    efficacyGood: '#DBEAFE',
    efficacyGoodText: '#1E40AF',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  
  typography: {
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 24,
    },
    fontWeight: {
      normal: '400' as const,
      medium: '500' as const,
      semiBold: '600' as const,
      bold: '700' as const,
    },
  },
} as const;

