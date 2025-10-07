import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/store";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    bodySmall: { ...MD3LightTheme.fonts.bodySmall, fontFamily: "Poppins_400Regular" },
    bodyMedium: { ...MD3LightTheme.fonts.bodyMedium, fontFamily: "Poppins_400Regular" },
    bodyLarge: { ...MD3LightTheme.fonts.bodyLarge, fontFamily: "Poppins_400Regular" },
    titleSmall: { ...MD3LightTheme.fonts.titleSmall, fontFamily: "Poppins_600SemiBold" },
    titleMedium: { ...MD3LightTheme.fonts.titleMedium, fontFamily: "Poppins_600SemiBold" },
    titleLarge: { ...MD3LightTheme.fonts.titleLarge, fontFamily: "Poppins_700Bold" },
    labelLarge: { ...MD3LightTheme.fonts.labelLarge, fontFamily: "Poppins_500Medium" },
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Set global defaults for React Native primitives
      const RNText: any = Text as unknown as { defaultProps?: any };
      if (RNText.defaultProps == null) RNText.defaultProps = {};
      RNText.defaultProps.style = [
        { fontFamily: "Poppins_400Regular" },
        RNText.defaultProps.style,
      ];

      const RNTextInput: any = TextInput as unknown as { defaultProps?: any };
      if (RNTextInput.defaultProps == null) RNTextInput.defaultProps = {};
      RNTextInput.defaultProps.style = [
        { fontFamily: "Poppins_400Regular" },
        RNTextInput.defaultProps.style,
      ];

      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={styles.container}>
          <StatusBar style="auto" />
          <Slot />
        </GestureHandlerRootView>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
