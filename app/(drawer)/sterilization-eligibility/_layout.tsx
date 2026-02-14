import { Stack } from 'expo-router';

export default function SterilizationEligibilityLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4C1D95",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "PlusJakartaSans_600SemiBold",
        },
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Sterilization Eligibility",
        }}
      />
      <Stack.Screen
        name="female-sterilization-eligibility"
        options={{
          title: "Female Sterilization Eligibility",
        }}
      />
    </Stack>
  );
}
