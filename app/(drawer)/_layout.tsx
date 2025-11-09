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
        name="temporary-methods"
        options={{
          drawerLabel: "Temporary Methods",
          title: "Temporary Methods",
        }}
      />
      <Drawer.Screen
        name="standard-day-calculator"
        options={{
          drawerLabel: "Calendar Method Calculator",
          title: "Calendar Method Calculator",
        }}
      />
      <Drawer.Screen
        name="barrier-methods"
        options={{
          drawerLabel: "Barrier Methods",
          title: "Barrier Methods",
        }}
      />
      <Drawer.Screen
        name="hormonal-methods"
        options={{
          drawerLabel: "Hormonal Methods",
          title: "Hormonal Methods",
        }}
      />
      <Drawer.Screen
        name="iud-methods"
        options={{
          drawerLabel: "IUD Methods",
          title: "Intrauterine Device Methods",
        }}
      />
      <Drawer.Screen
        name="permanent-methods"
        options={{
          drawerLabel: "Permanent Methods",
          title: "Permanent Methods",
        }}
      />
      <Drawer.Screen
        name="contraceptive-method"
        options={{
          drawerLabel: () => null,
          title: "Contraceptive Method",
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer>
  );
}
