import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KnowContraceptiveLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#4C1D95' }}>
       <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#0b1220" : "#4C1D95",
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "Poppins_600SemiBold",
          },
          headerBackTitle: "Back",
        }}
    >
      <Stack.Screen
        name="natural-methods"
        options={{
          title: "Natural Methods",
        }}
      />
      <Stack.Screen
        name="modern-methods"
        options={{
          title: "Modern Methods",
        }}
      />
      <Stack.Screen
        name="temporary-methods"
        options={{
          title: "Temporary Methods",
        }}
      />
      <Stack.Screen
        name="permanent-methods"
        options={{
          title: "Permanent Methods",
        }}
      />
      <Stack.Screen
        name="barrier-methods"
        options={{
          title: "Barrier Methods",
        }}
      />
      <Stack.Screen
        name="hormonal-methods"
        options={{
          title: "Hormonal Methods",
        }}
      />
      <Stack.Screen
        name="iud-methods"
        options={{
          title: "IUD Methods",
        }}
      />
      <Stack.Screen
        name="contraceptive-method"
        options={{
          headerShown: false, // Let the nested stack handle the header
        }}
      />
    </Stack>
    </SafeAreaView>
   
  );
}

