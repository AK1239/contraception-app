import { Stack, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { HeaderBackButton } from '../../../src/components/shared/HeaderBackButton';

export default function EmergencyContraceptionLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: "#4C1D95",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "PlusJakartaSans_600SemiBold",
        },
        headerBackTitle: "Back",
        headerLeft: () => (
          <SmartBackButton navigation={navigation} route={route} colorScheme={colorScheme} />
        ),
      })}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Emergency Contraception",
        }}
      />
    </Stack>
  );
}

function SmartBackButton({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
  colorScheme?: "light" | "dark" | null | undefined;
}) {
  const router = useRouter();

  const handlePress = () => {
    if (route.name === "index") {
      router.push("/(drawer)");
      return;
    }

    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push("/(drawer)");
    }
  };

  return <HeaderBackButton onPress={handlePress} />;
}
