import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function KnowContraceptiveLayout() {
  const colorScheme = useColorScheme();
  return (
       <Stack
        screenOptions={({ navigation, route }) => {
          if (route.name === 'contraceptive-method') {
            return {
              headerShown: false,
            };
          }

          return {
            headerStyle: {
              backgroundColor: "#4C1D95",
              },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontFamily: "Poppins_600SemiBold",
            },
            headerBackTitle: "Back",
            headerLeft: () => <SmartBackButton navigation={navigation} route={route} colorScheme={colorScheme} />,
          };
        }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Know Your Contraceptive",
        }}
      />
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

    if (route.name === 'natural-methods' || route.name === 'modern-methods') {
      router.push('/(drawer)/know-contraceptive');
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

