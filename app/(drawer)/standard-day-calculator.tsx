import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CycleInputForm from "../../src/components/CycleInputForm";
import FertilePeriodCalendar from "../../src/components/FertilePeriodCalendar";
import FertilePeriodResults from "../../src/components/FertilePeriodResults";
import { 
  calculateFertilePeriod, 
  calculateCalendarDates, 
  FertilePeriodResult, 
  CalendarResult 
} from "../../src/utils/fertilePeriodCalculator";

type CalculatorStep = 'welcome' | 'input' | 'calendar' | 'results';

export default function StandardDayCalculator() {
  const [currentStep, setCurrentStep] = useState<CalculatorStep>('welcome');
  const [fertilePeriod, setFertilePeriod] = useState<FertilePeriodResult | null>(null);
  const [calendarResult, setCalendarResult] = useState<CalendarResult | null>(null);

  const handleCyclesSubmit = (cycles: number[]) => {
    try {
      const result = calculateFertilePeriod(cycles);
      setFertilePeriod(result);
      setCurrentStep('calendar');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleDateSelect = (date: Date) => {
    if (fertilePeriod) {
      try {
        const result = calculateCalendarDates(date, fertilePeriod);
        setCalendarResult(result);
        setCurrentStep('results');
      } catch (error) {
        Alert.alert('Error', 'Failed to calculate calendar dates');
      }
    }
  };

  const resetCalculator = () => {
    setCurrentStep('welcome');
    setFertilePeriod(null);
    setCalendarResult(null);
  };

  const getStepNumber = () => {
    switch(currentStep) {
      case 'welcome': return 0;
      case 'input': return 1;
      case 'calendar': return 2;
      case 'results': return 3;
      default: return 0;
    }
  };

  const renderWelcomeScreen = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={80} color="#059669" />
        </View>
        
        <Text style={styles.welcomeTitle}>Calendar Method</Text>
        <Text style={styles.welcomeSubtitle}>Fertility Calculator</Text>
        
        <View style={styles.noteCard}>
          <View style={styles.noteHeader}>
            <Ionicons name="information-circle" size={24} color="#059669" />
            <Text style={styles.noteHeaderText}>Before You Begin</Text>
          </View>
          
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.requirementText}>
              Your menstrual cycles must be <Text style={styles.bold}>regular</Text>
            </Text>
          </View>
          
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.requirementText}>
              Each cycle should be between <Text style={styles.bold}>26-32 days</Text>
            </Text>
          </View>
          
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.requirementText}>
              You need data from at least <Text style={styles.bold}>6 previous cycles</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => setCurrentStep('input')}
        >
          <Text style={styles.nextButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return renderWelcomeScreen();
      case 'input':
        return <CycleInputForm onCyclesSubmit={handleCyclesSubmit} />;
      case 'calendar':
        return (
          <FertilePeriodCalendar 
            onDateSelect={handleDateSelect}
            calendarResult={calendarResult || undefined}
          />
        );
      case 'results':
        return fertilePeriod && calendarResult ? (
          <FertilePeriodResults 
            fertilePeriod={fertilePeriod}
            calendarResult={calendarResult}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {currentStep !== 'welcome' && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(getStepNumber() / 3) * 100}%` }
              ]} 
            />
          </View>
          
          <View style={styles.stepIndicator}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, getStepNumber() >= 1 && styles.stepCircleActive]}>
                <Text style={[styles.stepNumber, getStepNumber() >= 1 && styles.stepNumberActive]}>1</Text>
              </View>
              <Text style={styles.stepLabel}>Enter Cycles</Text>
            </View>
            
            <View style={styles.stepDivider} />
            
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, getStepNumber() >= 2 && styles.stepCircleActive]}>
                <Text style={[styles.stepNumber, getStepNumber() >= 2 && styles.stepNumberActive]}>2</Text>
              </View>
              <Text style={styles.stepLabel}>Select Date</Text>
            </View>
            
            <View style={styles.stepDivider} />
            
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, getStepNumber() >= 3 && styles.stepCircleActive]}>
                <Text style={[styles.stepNumber, getStepNumber() >= 3 && styles.stepNumberActive]}>3</Text>
              </View>
              <Text style={styles.stepLabel}>View Results</Text>
            </View>
          </View>
        </View>
      )}

      {renderCurrentStep()}

      {currentStep !== 'welcome' && (
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetCalculator}
          >
            <Ionicons name="refresh" size={20} color="#6D28D9" />
            <Text style={styles.resetButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    paddingBottom: 40,
  },
  
  // Welcome Screen Styles
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
    fontFamily: "Poppins_700Bold",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Poppins_400Regular",
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
    marginBottom: 20,
    gap: 12,
  },
  noteHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
    fontFamily: "Poppins_700Bold",
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  requirementText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    flex: 1,
    fontFamily: "Poppins_400Regular",
  },
  bold: {
    fontWeight: "bold",
    color: "#059669",
    fontFamily: "Poppins_700Bold",
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
    fontFamily: "Poppins_700Bold",
  },
  
  // Progress Indicator Styles
  progressContainer: {
    backgroundColor: "#fff",
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#059669",
    borderRadius: 3,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: "#059669",
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#9CA3AF",
    fontFamily: "Poppins_700Bold",
  },
  stepNumberActive: {
    color: "#fff",
  },
  stepLabel: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  stepDivider: {
    height: 2,
    backgroundColor: "#E5E7EB",
    flex: 0.3,
    marginBottom: 30,
  },
  
  // Navigation Styles
  navigationContainer: {
    padding: 20,
    alignItems: "center",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#059669",
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resetButtonText: {
    fontSize: 15,
    color: "#059669",
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
  },
});


