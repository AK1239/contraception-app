import React from "react";
import { View, StyleSheet } from "react-native";

type OnboardingDotsProps = {
  count: number;
  activeIndex: number;
};

export default function OnboardingDots({ count, activeIndex }: OnboardingDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex ? styles.dotActive : undefined]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E2E8F0",
    transition: "all 0.3s ease",
  },
  dotActive: {
    backgroundColor: "#3B82F6",
    width: 24,
    height: 10,
    borderRadius: 5,
  },
});


