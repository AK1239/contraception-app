import React from "react";
import { View, StyleSheet, useWindowDimensions, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import OnboardingSlide from "../src/components/OnboardingSlide";
import OnboardingDots from "../src/components/OnboardingDots";
import OnboardingControls from "../src/components/OnboardingControls";

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);

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
      title: "Personalized\nRecommendations",
      subtitle: "Tailored to Your Health Profile",
      body: "Get a personalized list of safe options based on your medical history, with expert guidance on modern and natural methods—all in one place.",
      icon: "💡",
      color: "#ec4899",
    },
    {
      title: "Natural Family\nPlanning",
      subtitle: "Standard Day Method Calculator",
      body: "Take control of your fertility with our Standard Day Method calculator for those who prefer a natural approach",
      icon: "🌱",
      color: "#10b981",
    },
  ];

  const [index, setIndex] = React.useState(0);

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

  const handleDone = () => {
    router.replace("/(drawer)");
  };

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


