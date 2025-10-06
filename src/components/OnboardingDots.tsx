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
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  dotActive: {
    backgroundColor: "#2563EB",
  },
});


