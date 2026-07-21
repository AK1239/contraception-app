import React from "react";
import { View, StyleSheet, Image, ScrollView, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

type OnboardingSlideProps = {
  title: string;
  subtitle?: string;
  body?: string;
  icon?: string;
  logo?: any;
  color?: string;
};

export default function OnboardingSlide({ title, subtitle, body, icon, logo, color = "#6366f1" }: OnboardingSlideProps) {
  const { height } = useWindowDimensions();
  const compact = height < 720;
  const logoSize = compact ? 96 : 140;
  const iconOuter = compact ? 88 : 120;
  const iconInner = compact ? 72 : 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fafafa', '#ffffff']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: compact ? 12 : height * 0.04,
            paddingBottom: 16,
            justifyContent: compact ? "flex-start" : "space-between",
            gap: compact ? 16 : 0,
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {(logo || icon) && (
          <View style={[styles.iconSection, compact && { marginTop: 0 }]}>
            {logo ? (
              <View style={styles.logoContainer}>
                <Image
                  source={logo}
                  style={{ width: logoSize, height: logoSize, borderRadius: logoSize / 2 }}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <>
                <View
                  style={[
                    styles.iconCircleOuter,
                    {
                      backgroundColor: color + "15",
                      width: iconOuter,
                      height: iconOuter,
                      borderRadius: iconOuter / 2,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      {
                        backgroundColor: color + "25",
                        width: iconInner,
                        height: iconInner,
                        borderRadius: iconInner / 2,
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={[color + "40", color + "20"]}
                      style={[
                        styles.iconGradient,
                        {
                          width: iconInner,
                          height: iconInner,
                          borderRadius: iconInner / 2,
                        },
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={[styles.icon, compact && { fontSize: 36 }]}>{icon}</Text>
                    </LinearGradient>
                  </View>
                </View>

                {!compact && (
                  <View style={styles.decorativeDots}>
                    <View style={[styles.dot, { backgroundColor: color + "30" }]} />
                    <View style={[styles.dot, { backgroundColor: color + "20" }]} />
                    <View style={[styles.dot, { backgroundColor: color + "10" }]} />
                  </View>
                )}
              </>
            )}
          </View>
        )}

        <View style={styles.titleSection}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color }, compact && styles.titleCompact]}
          >
            {title}
          </Text>
          {subtitle && (
            <View style={styles.subtitleContainer}>
              <Text
                variant="titleMedium"
                style={[styles.subtitle, compact && styles.subtitleCompact]}
              >
                {subtitle}
              </Text>
            </View>
          )}
        </View>

        {body && (
          <View style={styles.bodySection}>
            <View style={[styles.bodyCard, compact && styles.bodyCardCompact]}>
              <View style={[styles.bodyAccent, { backgroundColor: color }]} />
              <Text
                variant="bodyLarge"
                style={[styles.body, compact && styles.bodyCompact]}
              >
                {body}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    minHeight: 0,
  },
  scrollView: {
    flex: 1,
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 28,
  },
  iconSection: {
    alignItems: "center",
    marginTop: 10,
    position: "relative",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleOuter: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  iconGradient: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 48,
  },
  decorativeDots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  titleSection: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 8,
  },
  title: {
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 42,
    fontSize: 32,
    paddingHorizontal: 8,
  },
  titleCompact: {
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  subtitleContainer: {
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontWeight: "600",
    lineHeight: 28,
    letterSpacing: 0.1,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  subtitleCompact: {
    lineHeight: 22,
    marginBottom: 0,
    fontSize: 15,
  },
  bodySection: {
    marginBottom: 8,
  },
  bodyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.08)",
    position: "relative",
    overflow: "hidden",
  },
  bodyCardCompact: {
    padding: 20,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  bodyAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  body: {
    textAlign: "center",
    color: "#475569",
    lineHeight: 28,
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.15,
  },
  bodyCompact: {
    fontSize: 15,
    lineHeight: 22,
  },
});
