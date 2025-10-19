import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
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

const { height } = Dimensions.get('window');

export default function OnboardingSlide({ title, subtitle, body, icon, logo, color = "#6366f1" }: OnboardingSlideProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fafafa', '#ffffff']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.contentContainer}>
        {/* Logo/Icon Section */}
        {(logo || icon) && (
          <View style={styles.iconSection}>
            {logo ? (
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
              </View>
            ) : (
              <>
                <View style={[styles.iconCircleOuter, { backgroundColor: color + '15' }]}>
                  <View style={[styles.iconCircle, { backgroundColor: color + '25' }]}>
                    <LinearGradient
                      colors={[color + '40', color + '20']}
                      style={styles.iconGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.icon}>{icon}</Text>
                    </LinearGradient>
                  </View>
                </View>
                
                {/* Decorative dots */}
                <View style={styles.decorativeDots}>
                  <View style={[styles.dot, { backgroundColor: color + '30' }]} />
                  <View style={[styles.dot, { backgroundColor: color + '20' }]} />
                  <View style={[styles.dot, { backgroundColor: color + '10' }]} />
                </View>
              </>
            )}
          </View>
        )}
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text variant="displaySmall" style={[styles.title, { color: color }]}>
            {title}
          </Text>
          {subtitle && (
            <View style={styles.subtitleContainer}>
              <Text variant="titleMedium" style={styles.subtitle}>
                {subtitle}
              </Text>
            </View>
          )}
        </View>
        
        {/* Body Section */}
        {body && (
          <View style={styles.bodySection}>
            <View style={styles.bodyCard}>
              <View style={[styles.bodyAccent, { backgroundColor: color }]} />
              <Text variant="bodyLarge" style={styles.body}>
                {body}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: height * 0.06,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  // Icon Section Styles
  iconSection: {
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  iconCircleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
  },
  decorativeDots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  // Title Section Styles
  titleSection: {
    alignItems: 'center',
    gap: 16,
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
  subtitleContainer: {
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
 
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontWeight: "600",
    lineHeight: 28,
    letterSpacing: 0.1,
    marginBottom:10,
    paddingHorizontal: 12,
  },
  // Body Section Styles
  bodySection: {
    marginBottom: 8,
  },
  bodyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.08)',
    position: 'relative',
    overflow: 'hidden',
  },
  bodyAccent: {
    position: 'absolute',
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
});