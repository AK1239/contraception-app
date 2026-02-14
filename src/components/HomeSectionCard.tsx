import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Card, Text, Button } from "react-native-paper";

type HomeSectionCardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  onPress: () => void;
  leadingEmoji?: string;
  backgroundColor?: string;
  buttonColor?: string;
  disabled?: boolean;
};

export default function HomeSectionCard({ title, description, ctaLabel, onPress, leadingEmoji, backgroundColor = "#FFFFFF", buttonColor = "#6D28D9", disabled = false }: HomeSectionCardProps) {
  return (
    <Pressable 
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.pressable,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled
      ]}
    >
      <Card style={[styles.card, { backgroundColor }, disabled && styles.disabledCard]} mode="elevated">
        <Card.Content style={styles.cardContent}>
          {/* Icon Container */}
          {leadingEmoji && (
            <View style={[styles.iconContainer, disabled && styles.disabledIcon]}>
              <Text style={styles.emoji}>{leadingEmoji}</Text>
            </View>
          )}

          {/* Content Section */}
          <View style={styles.textContainer}>
            <Text variant="headlineSmall" style={[styles.title, disabled && styles.disabledText]}>
              {title}
            </Text>

            <Text variant="bodyMedium" style={[styles.description, disabled && styles.disabledText]}>
              {description}
            </Text>
          </View>

          {/* CTA Button */}
          <Button 
            mode="contained" 
            onPress={onPress}
            disabled={disabled}
            style={[styles.button, { backgroundColor: disabled ? "#D1D5DB" : buttonColor }]} 
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            elevation={disabled ? 0 : 2}
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
    fontSize: 16,
  },
  description: {
    color: "#64748B",
    lineHeight: 20,
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
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  disabled: {
    opacity: 0.6,
  },
  disabledCard: {
    backgroundColor: "#F9FAFB",
  },
  disabledIcon: {
    backgroundColor: "#E5E7EB",
    borderColor: "#D1D5DB",
  },
  disabledText: {
    color: "#9CA3AF",
  },});