import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
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
