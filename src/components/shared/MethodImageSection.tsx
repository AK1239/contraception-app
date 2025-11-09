import React, { memo } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { isValidImageSource, ImagePresets, createOptimizedImageStyle } from '../../utils/imageOptimization';

interface MethodImageSectionProps {
  image: ImageSourcePropType;
  variant?: 'description' | 'howToUse';
}

/**
 * Optimized image component for contraceptive method images
 * Uses memoization and image optimization utilities
 */
function MethodImageSection({ image, variant = 'description' }: MethodImageSectionProps) {
  // Validate image source before rendering
  if (!isValidImageSource(image)) {
    return null;
  }

  const imageStyle = variant === 'description' 
    ? [styles.descriptionImage, createOptimizedImageStyle(ImagePresets.card)]
    : [styles.howToUseImage, createOptimizedImageStyle(ImagePresets.comparison)];

  return (
    <View style={styles.imageContainer}>
      <Image 
        source={image} 
        style={imageStyle}
        resizeMode="contain"
      />
    </View>
  );
}

export default memo(MethodImageSection);

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 16,
    marginTop: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  descriptionImage: {
    width: '100%',
    maxWidth: 320,
    minHeight: 150,
    maxHeight: 250,
    borderRadius: 8,
  },
  howToUseImage: {
    width: '100%',
    maxWidth: 320,
    minHeight: 200,
    maxHeight: 300,
    borderRadius: 8,
    marginTop: 12,
  },
});

