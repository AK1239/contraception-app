import { Drawer } from "expo-router/drawer";
import { useColorScheme, View, Image } from "react-native";
import CustomDrawerContent from "../../src/components/CustomDrawerContent";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
        name="natural-methods"
        options={{
          drawerLabel: "Natural Methods",
          title: "Natural Methods",
        }}
      />
      <Drawer.Screen
        name="modern-methods"
        options={{
          drawerLabel: "Modern Methods",
          title: "Modern Methods",
        }}
      />
      <Drawer.Screen
        name="standard-day-calculator"
        options={{
          drawerLabel: "Natural Standard Day Method Calculator",
          title: "Standard Day Calculator",
        }}
      />
      <Drawer.Screen
        name="lactational-amenorrhea"
        options={{
          drawerLabel: "Lactational Amenorrhea Method",
          title: "Lactational Amenorrhea Method",
        }}
      />
      <Drawer.Screen
        name="standard-days-method"
        options={{
          drawerLabel: "Standard Days Method",
          title: "Standard Days Method",
        }}
      />
    </Drawer>
  );
}
