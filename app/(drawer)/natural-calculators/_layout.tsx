import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NaturalCalculatorsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={({ navigation, route }) => {
        return {
          headerStyle: {
            backgroundColor: "#4C1D95",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "PlusJakartaSans_600SemiBold",
          },
          headerBackTitle: "Back",
          headerLeft: () => <SmartBackButton navigation={navigation} route={route} colorScheme={colorScheme} />,
        };
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Natural Calculator Methods",
        }}
      />
    </Stack>
  );
}

function SmartBackButton({ 
  navigation, 
  route,
  colorScheme 
}: { 
  navigation: any;
  route: any;
  colorScheme: 'light' | 'dark' | null | undefined;
}) {
  const router = useRouter();

  const handlePress = () => {
    if (route.name === 'index') {
      router.push('/(drawer)');
      return;
    }

    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push('/(drawer)');
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center' }}
    >
      <Ionicons 
        name="arrow-back" 
        size={24} 
        color={colorScheme === "dark" ? "#fff" : "#fff"} 
      />
    </TouchableOpacity>
  );
}

