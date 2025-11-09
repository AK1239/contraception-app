import { ImageSourcePropType, ImageStyle, StyleSheet } from 'react-native';

/**
 * Image optimization utilities
 * Provides best practices for image handling in React Native
 */

export interface OptimizedImageConfig {
  /**
   * Resize mode for the image
   * 'contain' - scales image to fit within bounds (recommended for most cases)
   * 'cover' - scales image to fill bounds (may crop)
   * 'stretch' - stretches image to fill bounds (may distort)
   * 'center' - centers image without scaling
   * 'repeat' - repeats image to fill bounds
   */
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat';
  
  /**
   * Maximum width for the image
   */
  maxWidth?: number;
  
  /**
   * Maximum height for the image
   */
  maxHeight?: number;
  
  /**
   * Whether to enable caching (default: true)
   */
  cache?: boolean;
}

/**
 * Creates optimized image styles based on configuration
 * 
 * @param config - Image optimization configuration
 * @returns StyleSheet with optimized image styles
 */
export function createOptimizedImageStyle(config: OptimizedImageConfig = {}): ImageStyle {
  const {
    maxWidth,
    maxHeight,
    resizeMode = 'contain',
  } = config;

  return StyleSheet.flatten([
    {
      resizeMode,
      ...(maxWidth && { maxWidth }),
      ...(maxHeight && { maxHeight }),
    },
  ]) as ImageStyle;
}

/**
 * Image quality presets for different use cases
 */
export const ImagePresets = {
  /**
   * Thumbnail images (small, fast loading)
   */
  thumbnail: {
    maxWidth: 100,
    maxHeight: 100,
    resizeMode: 'cover' as const,
  },
  
  /**
   * Card images (medium size)
   */
  card: {
    maxWidth: 300,
    maxHeight: 200,
    resizeMode: 'contain' as const,
  },
  
  /**
   * Full screen images (large, high quality)
   */
  fullScreen: {
    maxWidth: undefined,
    maxHeight: undefined,
    resizeMode: 'contain' as const,
  },
  
  /**
   * Comparison images (medium, consistent sizing)
   */
  comparison: {
    maxWidth: 250,
    maxHeight: 250,
    resizeMode: 'contain' as const,
  },
} as const;

/**
 * Validates image source before rendering
 * 
 * @param source - Image source to validate
 * @returns Whether the source is valid
 */
export function isValidImageSource(source: ImageSourcePropType | undefined): boolean {
  if (!source) return false;
  
  // For require() sources, they're always valid
  if (typeof source === 'number') return true;
  
  // For URI sources, check if URI exists
  if (typeof source === 'object' && 'uri' in source) {
    return !!source.uri;
  }
  
  return false;
}

