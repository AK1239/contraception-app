import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Card, Text, Button } from "react-native-paper";

type HomeSectionCardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  onPress: () => void;
  leadingEmoji?: string;
};

export default function HomeSectionCard({ title, description, ctaLabel, onPress, leadingEmoji }: HomeSectionCardProps) {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed
      ]}
    >
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.cardContent}>
          {/* Icon Container */}
          {leadingEmoji && (
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>{leadingEmoji}</Text>
            </View>
          )}

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
            onPress={onPress}
            style={styles.button} 
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            elevation={0}
          >
            {ctaLabel}
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cardContent: {
    padding: 20,
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  emoji: {
    fontSize: 28,
  },
  textContainer: {
    gap: 8,
  },
  title: {
    color: "#0F172A",
    fontWeight: "700",
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  description: {
    color: "#64748B",
    lineHeight: 22,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#0066FF",
    borderRadius: 12,
    marginTop: 4,
  },
  buttonContent: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});


