import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { getCategoryColor } from '../../utils/theme';

interface MethodInfo {
  shortName: string;
  category: string;
}

interface ComparisonMethodsHeaderProps {
  firstMethod: MethodInfo;
  secondMethod: MethodInfo;
  firstMethodImage?: ImageSourcePropType;
  secondMethodImage?: ImageSourcePropType;
}

export default function ComparisonMethodsHeader({
  firstMethod,
  secondMethod,
  firstMethodImage,
  secondMethodImage,
}: ComparisonMethodsHeaderProps) {
  return (
    <Card style={styles.headerCard}>
      <Card.Content>
        <View style={styles.methodsHeader}>
          <View style={styles.methodHeaderSection}>
            {firstMethodImage && (
              <View style={styles.methodImageContainer}>
                <Image 
                  source={firstMethodImage} 
                  style={styles.methodHeaderImage}
                  resizeMode="contain"
                />
              </View>
            )}
            <View style={[styles.methodBadge, { backgroundColor: getCategoryColor(firstMethod.category) }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText} numberOfLines={1}>
                {firstMethod.shortName}
              </Text>
            </View>
          </View>
          <Text style={styles.vsText}>vs</Text>
          <View style={styles.methodHeaderSection}>
            {secondMethodImage && (
              <View style={styles.methodImageContainer}>
                <Image 
                  source={secondMethodImage} 
                  style={styles.methodHeaderImage}
                  resizeMode="contain"
                />
              </View>
            )}
            <View style={[styles.methodBadge, { backgroundColor: getCategoryColor(secondMethod.category) }]}>
              <Text variant="titleMedium" style={styles.methodBadgeText} numberOfLines={1}>
                {secondMethod.shortName}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  methodsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  methodHeaderSection: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  methodImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodHeaderImage: {
    width: '100%',
    height: '100%',
  },
  methodBadge: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  methodBadgeText: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '700',
  },
  vsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
    alignSelf: 'center',
    marginTop: 8,
  },
});

