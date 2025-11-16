import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function ContraceptiveMethodLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#4C1D95",
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
        name="[id]"
        options={{
          title: "Method Details",
        }}
      />
    </Stack>
  );
}

