import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeCard() {
  return (
    <Card style={styles.card} mode="elevated">
      <LinearGradient
        colors={["#ffffff", "#f0f7ff", "#dbeafe", "#93c5fd"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text variant="headlineMedium" style={styles.title}>
              Welcome Back!
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              Your trusted companion for making informed contraceptive choices.
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💙</Text>
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  gradient: {
    borderRadius: 24,
  },
  cardContent: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  textContainer: {
    flex: 1,
    gap: 10,
  },
  title: {
    color: "#1E3A8A",
    fontWeight: "800",
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  description: {
    color: "#1F2937",
    lineHeight: 22,
    fontSize: 15,
    opacity: 0.9,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  icon: {
    fontSize: 36,
  },
});

