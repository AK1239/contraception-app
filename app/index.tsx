import React from "react";
import { View, StyleSheet, useWindowDimensions, StatusBar, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingSlide from "../src/components/OnboardingSlide";
import OnboardingDots from "../src/components/OnboardingDots";
import OnboardingControls from "../src/components/OnboardingControls";
import { logger } from "../src/services/logger";
import { handleError, ErrorCode } from "../src/services/errorHandler";

const ONBOARDING_COMPLETED_KEY = "@onboarding_completed";

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);
  const [isChecking, setIsChecking] = React.useState(true);
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  const slides = [
    {
      title: "Welcome to\nContraSafe",
      subtitle: "Your Personalized Guide to Safer Family Planning",
      body: "Whether you're a healthcare provider or a woman seeking reliable contraceptives, ContraSafe simplifies family planning with a safe digital solution",
      logo: require("../assets/logo.png"),
      color: "#6366f1",
    },
    {
      title: "Evidence-Based\nGuidance",
      subtitle: "Powered by WHO Standards",
      body: "Built on the WHO Medical Eligibility Criteria for Contraceptive Use (2015), providing safe, evidence-based recommendations you can trust.",
      icon: "🧠",
      color: "#8b5cf6",
    },
    {
      title: "Personalized\nGuide",
      subtitle: "Tailored to Your Health Profile",
      body: "Get a personalized list of safe options based on your medical history, with expert guidance on modern and natural methods—all in one place.",
      icon: "💡",
      color: "#ec4899",
    },
    {
      title: "Natural Family\nPlanning",
      subtitle: "Calendar Method Calculator",
      body: "Take control of your fertility with our Calendar Method calculator for those who prefer a natural approach",
      icon: "🌱",
      color: "#10b981",
    },
  ];

  const [index, setIndex] = React.useState(0);

  // Check if onboarding has been completed on mount
  React.useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
        if (onboardingCompleted === "true") {
          // User has already completed onboarding, redirect to home
          router.replace("/(drawer)");
        } else {
          // First time user, show onboarding
          setShowOnboarding(true);
        }
      } catch (error) {
        handleError(error, ErrorCode.DATA_LOAD_ERROR, "OnboardingScreen.checkOnboardingStatus");
        logger.error("Error checking onboarding status", error);
        // On error, show onboarding to be safe
        setShowOnboarding(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const flatListRef = React.useRef<Animated.FlatList<any>>(null);

  const handleNext = () => {
    if (index < slides.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handleDone = async () => {
    try {
      // Save onboarding completion status
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
      // Navigate to home screen
      router.replace("/(drawer)");
    } catch (error) {
      handleError(error, ErrorCode.DATA_SAVE_ERROR, "OnboardingScreen.handleDone");
      logger.error("Error saving onboarding status", error);
      // Navigate anyway even if saving fails
      router.replace("/(drawer)");
    }
  };

  // Show loading indicator while checking onboarding status
  if (isChecking) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  // Don't render onboarding if user has already completed it
  // (This should not be reached due to redirect, but added as safety)
  if (!showOnboarding) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <LinearGradient
        colors={['#ffffff', '#f8fafc']}
        style={styles.backgroundGradient}
      />
      
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnboardingSlide 
              title={item.title} 
              subtitle={item.subtitle} 
              body={item.body}
              icon={item.icon}
              logo={item.logo}
              color={item.color}
            />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          if (newIndex !== index) setIndex(newIndex);
        }}
        scrollEventThrottle={16}
        style={styles.flatList}
      />

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <OnboardingDots count={slides.length} activeIndex={index} />
          <OnboardingControls isLast={index === slides.length - 1} onNext={handleNext} onDone={handleDone} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flatList: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  footerContent: {
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    gap: 20,
  },
});


