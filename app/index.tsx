import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import OnboardingSlide from "../src/components/OnboardingSlide";
import OnboardingDots from "../src/components/OnboardingDots";
import OnboardingControls from "../src/components/OnboardingControls";

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);

  const slides = [
    {
      title: "Welcome to ContraSafe",
      subtitle: "Your Personalized Guide to Safer Family Planning",
      body:
        "Are you a healthcare provider or an individual seeking reliable and personalized contraceptive options?\n\nContraSafe is here to simplify and revolutionize the way we approach family planning. In a world where access to accurate, understandable, and tailored contraceptive information is critical—but often hard to find—we offer a smart, digital solution designed with YOU in mind.\n\n🩺No more guesswork.\n📋No more outdated cards or complex manuals.\n💡Just clear, guided choices based on your unique health profile.",
    },
    {
      title: "Why ContraSafe?",
      body:
        "🌍 Designed to meet the real needs of women and providers\n🧠 Powered by the WHO Medical Eligibility Criteria for Contraceptive Use (2015).\n👩‍⚕ Built to help providers make safe, evidence-based recommendations.\n📱 Easy for anyone to use – whether you’re choosing for yourself or supporting others.",
    },
    {
      title: "What You’ll Get:",
      body:
        "✅ A personalized list of safe contraceptive options based on your medical and reproductive history\n✅ Expert guidance on both modern and natural methods with a comparison feature\n✅ Confidence and clarity in every decision\n\n🛡 With ContraSafe, you’re not just choosing a method—you’re choosing safety, confidence, and control over your reproductive health.",
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
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnboardingSlide title={item.title} subtitle={item.subtitle} body={item.body} />
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
      />

      <View style={styles.footer}>
        <OnboardingDots count={slides.length} activeIndex={index} />
        <OnboardingControls isLast={index === slides.length - 1} onNext={handleNext} onDone={handleDone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  footer: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 16,
    gap: 12,
  },
});


