import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={80} color="#059669" />
        </View>
        
        <Text style={styles.welcomeTitle}>Natural Standard Day Method</Text>
        <Text style={styles.welcomeSubtitle}>Fertility Calculator</Text>
        
        <View style={styles.noteCard}>
          <View style={styles.noteHeader}>
            <Ionicons name="information-circle" size={24} color="#059669" />
            <Text style={styles.noteHeaderText}>Important Note</Text>
          </View>
          
          <Text style={styles.noteText}>
            To proceed further, you must be sure that your menstrual cycles are <Text style={styles.bold}>regular</Text>.
          </Text>
          
          <Text style={styles.noteText}>
            If the gap between one cycle and the next is less than 21 days or more than 35 days, then you have irregular cycles.
          </Text>
          
          <Text style={styles.noteText}>
            The duration of the cycles should be between <Text style={styles.bold}>26 to 32 days</Text>.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={onGetStarted}
        >
          <Text style={styles.nextButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    minHeight: 600,
  },
  welcomeCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#D1FAE5",
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  noteCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  noteHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  noteText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  bold: {
    fontWeight: "bold",
    color: "#059669",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  nextButton: {
    backgroundColor: "#059669",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "PlusJakartaSans_700Bold",
  },
});

