import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../../utils/theme';

interface SkeletonScreenProps {
  /**
   * Number of skeleton lines to display
   * @default 3
   */
  lines?: number;
  
  /**
   * Whether to show a skeleton card
   * @default false
   */
  showCard?: boolean;
  
  /**
   * Number of skeleton cards to display
   * @default 1
   */
  cards?: number;
}

/**
 * Skeleton loading screen component
 * Provides a shimmer effect for better perceived performance
 * 
 * @example
 * <SkeletonScreen lines={5} showCard />
 */
export const SkeletonScreen: React.FC<SkeletonScreenProps> = ({
  lines = 3,
  showCard = false,
  cards = 1,
}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnimation]);

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  if (showCard) {
    return (
      <View style={styles.container}>
        {Array.from({ length: cards }).map((_, cardIndex) => (
          <SkeletonCard key={cardIndex} shimmerOpacity={shimmerOpacity} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLine
          key={index}
          shimmerOpacity={shimmerOpacity}
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </View>
  );
};

interface SkeletonLineProps {
  width: string | number;
  shimmerOpacity: Animated.AnimatedInterpolation<number>;
}

const SkeletonLine: React.FC<SkeletonLineProps> = ({ width, shimmerOpacity }) => {
  return (
    <View style={styles.lineContainer}>
      <Animated.View
        style={[
          styles.skeletonLine,
          { width, opacity: shimmerOpacity },
        ]}
      />
    </View>
  );
};

interface SkeletonCardProps {
  shimmerOpacity: Animated.AnimatedInterpolation<number>;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ shimmerOpacity }) => {
  return (
    <View style={styles.card}>
      <Animated.View
        style={[
          styles.cardHeader,
          { opacity: shimmerOpacity },
        ]}
      />
      <Animated.View
        style={[
          styles.cardLine,
          { opacity: shimmerOpacity },
        ]}
      />
      <Animated.View
        style={[
          styles.cardLine,
          { width: '80%', opacity: shimmerOpacity },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    flex: 1,
  },
  lineContainer: {
    marginBottom: theme.spacing.md,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
  },
  card: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  cardHeader: {
    height: 24,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
    width: '70%',
  },
  cardLine: {
    height: 14,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    width: '100%',
  },
});

