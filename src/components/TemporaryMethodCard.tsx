import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

interface TemporaryMethodCardProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  onExplorePress: () => void;
  backgroundColor?: string;
  buttonColor?: string;
}

export default function TemporaryMethodCard({
  title,
  description,
  icon,
  onExplorePress,
  backgroundColor = "#FFFFFF",
  buttonColor = "#6D28D9"
}: TemporaryMethodCardProps) {
  return (
    <Pressable 
      onPress={onExplorePress}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed
      ]}
    >
      <Card style={[styles.card, { backgroundColor }]} mode="elevated">
        <Card.Content style={styles.cardContent}>
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            {typeof icon === 'string' ? (
              <Text style={styles.emoji}>{icon}</Text>
            ) : (
              icon
            )}
          </View>

          {/* Content Section */}
          <View style={styles.textContainer}>
            <Text variant="headlineSmall" style={styles.title}>
              {title}
            </Text>

            <Text variant="bodyMedium" style={styles.description}>
              {description}
            </Text>
          </View>

          {/* CTA Button */}
          <Button 
            mode="contained" 
            onPress={onExplorePress}
            style={[styles.button, { backgroundColor: buttonColor }]} 
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            elevation={2}
          >
            Explore
          </Button>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardContent: {
    padding: 20,
    gap: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "#E0E7FF",
  },
  emoji: {
    fontSize: 30,
  },
  textContainer: {
    gap: 8,
  },
  title: {
    color: "#0F172A",
    fontWeight: "700",
    letterSpacing: -0.5,
    lineHeight: 26,
    fontSize: 18,
  },
  description: {
    color: "#64748B",
    lineHeight: 22,
    fontSize: 14,
  },
  button: {
    borderRadius: 14,
    marginTop: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
