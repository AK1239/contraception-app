import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface NotEligibleScreenProps {
  onExploreModernMethods: () => void;
  onStartOver: () => void;
}

export default function NotEligibleScreen({ 
  onExploreModernMethods, 
  onStartOver 
}: NotEligibleScreenProps) {
  return (
    <View style={styles.notEligibleContainer}>
      <View style={styles.notEligibleCard}>
        <View style={styles.warningIconContainer}>
          <Ionicons name="warning" size={64} color="#EF4444" />
        </View>
        
        <Text style={styles.notEligibleTitle}>Method Not Suitable</Text>
        
        <Text style={styles.notEligibleText}>
          Unfortunately, this method will not work for you because your menstrual cycles are not within the required range of 26-32 days.
        </Text>
        
        <Text style={styles.notEligibleText}>
          The Natural Standard Day Method requires regular cycles between 26 to 32 days to be effective.
        </Text>

        <View style={styles.suggestionCard}>
          <View style={styles.suggestionHeader}>
            <Ionicons name="bulb" size={24} color="#0EA5E9" />
            <Text style={styles.suggestionTitle}>We Recommend</Text>
          </View>
          
          <Text style={styles.suggestionText}>
            Consider exploring modern contraceptive methods that may be more suitable for your cycle pattern.
          </Text>

          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={onExploreModernMethods}
          >
            <Text style={styles.exploreButtonText}>Explore Modern Methods</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={onStartOver}
        >
          <Ionicons name="arrow-back" size={20} color="#059669" />
          <Text style={styles.backButtonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notEligibleContainer: {
    padding: 20,
  },
  notEligibleCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  warningIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#FEE2E2",
  },
  notEligibleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Poppins_700Bold",
  },
  notEligibleText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Poppins_400Regular",
  },
  suggestionCard: {
    backgroundColor: "#F0F9FF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    marginTop: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  suggestionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0EA5E9",
    fontFamily: "Poppins_700Bold",
  },
  suggestionText: {
    fontSize: 14,
    color: "#0C4A6E",
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: "Poppins_400Regular",
  },
  exploreButton: {
    backgroundColor: "#0EA5E9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  exploreButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    paddingLeft: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#059669",
  },
  backButtonText: {
    fontSize: 15,
    color: "#059669",
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
  },
});

