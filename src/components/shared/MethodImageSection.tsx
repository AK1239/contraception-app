import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface MethodImageSectionProps {
  image: ImageSourcePropType;
  variant?: 'description' | 'howToUse';
}

export default function MethodImageSection({ image, variant = 'description' }: MethodImageSectionProps) {
  return (
    <View style={styles.imageContainer}>
      <Image 
        source={image} 
        style={variant === 'description' ? styles.descriptionImage : styles.howToUseImage}
        resizeMode="contain"
      />
    </View>
  );
}

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

