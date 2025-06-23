import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "react-native";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "#2196F3",
        drawerInactiveTintColor: "#666",
        drawerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
        },
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#2196F3",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "ContraSafe",
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
      <Drawer.Screen
        name="results"
        options={{
          drawerLabel: "Results",
          title: "Assessment Results",
          drawerItemStyle: { display: "none" }, // Hide from drawer menu
        }}
      />
    </Drawer>
  );
}
