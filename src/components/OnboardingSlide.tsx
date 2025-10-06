import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type OnboardingSlideProps = {
  title: string;
  subtitle?: string;
  body?: string;
};

export default function OnboardingSlide({ title, subtitle, body }: OnboardingSlideProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="titleMedium" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
      {body ? (
        <Text variant="bodyLarge" style={styles.body}>
          {body}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    textAlign: "center",
    color: "#1f2937",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    color: "#374151",
  },
  body: {
    textAlign: "center",
    color: "#4b5563",
    lineHeight: 22,
  },
});


