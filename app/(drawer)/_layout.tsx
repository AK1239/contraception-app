import { Drawer } from "expo-router/drawer";
import { useColorScheme, View, Image } from "react-native";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "#6D28D9",
        drawerInactiveTintColor: "#666",
        drawerStyle: {
          backgroundColor: colorScheme === "dark" ? "#0b1220" : "#fff",
        },
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#0b1220" : "#4C1D95",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "Poppins_600SemiBold",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "ContraSafe",
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <Image
                source={require("../../assets/logo.png")}
                style={{ width: 40, height: 40, borderRadius: 20 }}
                resizeMode="cover"
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="know-contraceptive"
        options={{
          drawerLabel: "Know Your Contraceptive",
          title: "Know Your Contraceptive",
        }}
      />
      <Drawer.Screen
        name="choose-contraceptive"
        options={{
          drawerLabel: "Choose Your Contraceptive",
          title: "Choose Your Contraceptive",
        }}
      />
      <Drawer.Screen
        name="medical-safety"
        options={{
          drawerLabel: "Medical Safety",
          title: "Medical Safety",
        }}
      />
      <Drawer.Screen
        name="personalize"
        options={{
          drawerLabel: "Personalize Your Contraceptive Choice",
          title: "Personalize Your Choice",
        }}
      />
      <Drawer.Screen
        name="compare-methods"
        options={{
          drawerLabel: "Compare Contraceptive Methods",
          title: "Compare Methods",
        }}
      />
      <Drawer.Screen
        name="about-us"
        options={{
          drawerLabel: "About Us",
          title: "About Us",
        }}
      />
      <Drawer.Screen
        name="faqs"
        options={{
          drawerLabel: "FAQs",
          title: "Frequently Asked Questions",
        }}
      />
    </Drawer>
  );
}
