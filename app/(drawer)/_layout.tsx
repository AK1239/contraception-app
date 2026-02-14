import { Drawer } from "expo-router/drawer";
import { useColorScheme, View, Image } from "react-native";
import CustomDrawerContent from "../../src/components/CustomDrawerContent";
import { StartOverHeaderButton } from "../../src/components/StartOverHeaderButton";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#6D28D9",
        drawerInactiveTintColor: "#666",
        drawerStyle: {
          backgroundColor: "#fff",
        },
        headerStyle: {
          backgroundColor: "#4C1D95",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "PlusJakartaSans_600SemiBold",
        },
      }}
    >
      {/* Home Screen */}
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
      
      {/* Know Your Contraceptive - Stack Navigator */}
      <Drawer.Screen
        name="know-contraceptive"
        options={{
          drawerItemStyle: { display: 'none' }, // Hide from drawer, accessed via CustomDrawerContent
          headerShown: false, // Stack will handle headers
        }}
      />
      
      {/* Natural Calculators - Stack Navigator */}
      <Drawer.Screen
        name="natural-calculators"
        options={{
          drawerItemStyle: { display: 'none' }, // Hide from drawer, accessed via navigation
          headerShown: false, // Stack will handle headers
        }}
      />
      
      {/* Sterilization Eligibility - Stack Navigator */}
      <Drawer.Screen
        name="sterilization-eligibility"
        options={{
          drawerItemStyle: { display: 'none' }, // Hide from drawer, accessed via CustomDrawerContent
          headerShown: false, // Stack will handle headers
        }}
      />
      
      {/* WHO MEC Questionnaire - Choose Your Contraceptive */}
      <Drawer.Screen
        name="choose-contraceptive"
        options={{
          drawerItemStyle: { display: "none" },
          drawerLabel: "Choose Your Contraceptive",
          title: "Choose Your Contraceptive",
          headerRight: () => <StartOverHeaderButton />,
        }}
      />

      {/* Natural Method (FAB) Eligibility */}
      <Drawer.Screen
        name="fab-eligibility"
        options={{
          drawerItemStyle: { display: "none" },
          drawerLabel: "Natural Method Eligibility (FAB)",
          title: "Natural Method Eligibility",
          headerRight: () => <StartOverHeaderButton fabMode />,
        }}
      />

      {/* Female Sterilization Eligibility */}
      <Drawer.Screen
        name="female-sterilization-eligibility"
        options={{
          drawerItemStyle: { display: "none" },
          drawerLabel: "Female Sterilization Eligibility",
          title: "Female Sterilization Eligibility",
          headerRight: () => <StartOverHeaderButton femaleSterilizationMode />,
        }}
      />

      {/* Male Sterilization Eligibility */}
      <Drawer.Screen
        name="male-sterilization-eligibility"
        options={{
          drawerItemStyle: { display: "none" },
          drawerLabel: "Male Sterilization Eligibility",
          title: "Male Sterilization Eligibility",
          headerRight: () => <StartOverHeaderButton maleSterilizationMode />,
        }}
      />
      
      {/* Choose Your Contraceptive Screens */}
      <Drawer.Screen
        name="personalize"
        options={{
          drawerItemStyle: { display: 'none' }, // Controlled by CustomDrawerContent
          drawerLabel: "Personalize Your Contraceptive Choice",
          title: "Personalize Your Choice",
          headerRight: () => <StartOverHeaderButton />,
        }}
      />
      
      {/* Compare Methods */}
      <Drawer.Screen
        name="compare-methods"
        options={{
          drawerItemStyle: { display: 'none' }, // Controlled by CustomDrawerContent
          drawerLabel: "Compare Contraceptive Methods",
          title: "Compare Methods",
        }}
      />
      
      {/* Calendar Calculator */}
      <Drawer.Screen
        name="calendar-method-calculator"
        options={{
          drawerItemStyle: { display: 'none' }, // Controlled by CustomDrawerContent
          drawerLabel: "Calendar Method Calculator",
          title: "Calendar Method Calculator",
          headerRight: () => <StartOverHeaderButton calendarMethodMode />,
        }}
      />
      
      {/* Standard Day Calculator */}
      <Drawer.Screen
        name="standard-day-calculator-page"
        options={{
          drawerItemStyle: { display: 'none' }, // Controlled by CustomDrawerContent
          drawerLabel: "Standard Day Calculator",
          title: "Standard Day Calculator",
          headerRight: () => <StartOverHeaderButton sdmMode />,
        }}
      />
    </Drawer>
  );
}
