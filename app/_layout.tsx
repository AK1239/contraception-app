import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/store";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
import { logger } from "../src/services/logger";
import {
  useFonts,
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    bodySmall: { ...MD3LightTheme.fonts.bodySmall, fontFamily: "PlusJakartaSans_400Regular" },
    bodyMedium: { ...MD3LightTheme.fonts.bodyMedium, fontFamily: "PlusJakartaSans_400Regular" },
    bodyLarge: { ...MD3LightTheme.fonts.bodyLarge, fontFamily: "PlusJakartaSans_400Regular" },
    titleSmall: { ...MD3LightTheme.fonts.titleSmall, fontFamily: "PlusJakartaSans_600SemiBold" },
    titleMedium: { ...MD3LightTheme.fonts.titleMedium, fontFamily: "PlusJakartaSans_600SemiBold" },
    titleLarge: { ...MD3LightTheme.fonts.titleLarge, fontFamily: "PlusJakartaSans_700Bold" },
    labelLarge: { ...MD3LightTheme.fonts.labelLarge, fontFamily: "PlusJakartaSans_500Medium" },
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_200ExtraLight,
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Set global defaults for React Native primitives
      const RNText: any = Text as unknown as { defaultProps?: any };
      if (RNText.defaultProps == null) RNText.defaultProps = {};
      RNText.defaultProps.style = [
        { fontFamily: "PlusJakartaSans_400Regular" },
        RNText.defaultProps.style,
      ];

      const RNTextInput: any = TextInput as unknown as { defaultProps?: any };
      if (RNTextInput.defaultProps == null) RNTextInput.defaultProps = {};
      RNTextInput.defaultProps.style = [
        { fontFamily: "PlusJakartaSans_400Regular" },
        RNTextInput.defaultProps.style,
      ];

      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log error to our logging service
        logger.error('Root Error Boundary caught an error', error, {
          componentStack: errorInfo.componentStack,
        });
      }}
    >
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={styles.container}>
            <StatusBar style="auto" />
            <ErrorBoundary>
              <Slot />
            </ErrorBoundary>
          </GestureHandlerRootView>
        </PaperProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
