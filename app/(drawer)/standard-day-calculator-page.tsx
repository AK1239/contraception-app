import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { 
  calculateStandardDays, 
  formatDate, 
  formatDateShort,
  StandardDayResult 
} from "../../src/utils/standardDayCalculator";
import StandardDayCalendar from "../../src/components/StandardDayCalendar";

type CalculatorStep = 'welcome' | 'question1' | 'notEligible' | 'question2' | 'results';

export default function StandardDayCalculatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CalculatorStep>('welcome');
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [result, setResult] = useState<StandardDayResult | null>(null);

  const handleCycleRangeAnswer = (isInRange: boolean) => {
    if (isInRange) {
      setCurrentStep('question2');
    } else {
      setCurrentStep('notEligible');
    }
  };

  const handleDateSelect = (date: Date) => {
    setLastPeriodDate(date);
    const calculatedResult = calculateStandardDays(date);
    setResult(calculatedResult);
    setCurrentStep('results');
  };

  const resetCalculator = () => {
    setCurrentStep('welcome');
    setLastPeriodDate(null);
    setResult(null);
  };

  const handleExploreModernMethods = () => {
    router.push('/(drawer)/know-contraceptive/modern-methods');
  };

  const renderWelcomeScreen = () => (
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
          onPress={() => setCurrentStep('question1')}
        >
          <Text style={styles.nextButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuestion1 = () => (
    <View style={styles.questionContainer}>
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <View style={styles.questionNumber}>
            <Text style={styles.questionNumberText}>1</Text>
          </View>
          <Text style={styles.questionTitle}>Cycle Duration</Text>
        </View>
        
        <Text style={styles.questionText}>
          Is the duration of your menstrual cycle between 26 to 32 days?
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.answerButton, styles.yesButton]}
            onPress={() => handleCycleRangeAnswer(true)}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.answerButtonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.answerButton, styles.noButton]}
            onPress={() => handleCycleRangeAnswer(false)}
          >
            <Ionicons name="close-circle" size={24} color="#fff" />
            <Text style={styles.answerButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderNotEligible = () => (
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
            onPress={handleExploreModernMethods}
          >
            <Text style={styles.exploreButtonText}>Explore Modern Methods</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={resetCalculator}
        >
          <Ionicons name="arrow-back" size={20} color="#059669" />
          <Text style={styles.backButtonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuestion2 = () => (
    <View style={styles.questionContainer}>
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <View style={styles.questionNumber}>
            <Text style={styles.questionNumberText}>2</Text>
          </View>
          <Text style={styles.questionTitle}>Last Period Date</Text>
        </View>
        
        <Text style={styles.questionText}>
          When was the first day of your last period?
        </Text>

        <StandardDayCalendar onDateSelect={handleDateSelect} />
      </View>
    </View>
  );

  const renderResults = () => {
    if (!result || !lastPeriodDate) return null;

    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsCard}>
          <View style={styles.resultsHeader}>
            <Ionicons name="checkmark-circle" size={32} color="#059669" />
            <Text style={styles.resultsTitle}>Your Results</Text>
          </View>

          <View style={styles.resultSection}>
            <View style={styles.resultItem}>
              <View style={styles.resultItemHeader}>
                <Ionicons name="calendar" size={20} color="#059669" />
                <Text style={styles.resultItemTitle}>First Day of Last Period</Text>
              </View>
              <Text style={styles.resultItemValue}>
                {formatDate(lastPeriodDate)}
              </Text>
            </View>
          </View>

          <View style={styles.dangerDaysSection}>
            <View style={styles.dangerDaysHeader}>
              <Ionicons name="alert-circle" size={24} color="#EF4444" />
              <Text style={styles.dangerDaysTitle}>Danger Days</Text>
            </View>
            <Text style={styles.dangerDaysSubtitle}>
              Avoid sexual intercourse during these days (Day 8-19 of cycle)
            </Text>
            
            <View style={styles.dateRangeCard}>
              <View style={styles.dateRangeItem}>
                <Text style={styles.dateRangeLabel}>From:</Text>
                <Text style={styles.dateRangeValue}>
                  {formatDateShort(result.dangerStartDate)}
                </Text>
                <Text style={styles.dateRangeFull}>
                  {formatDate(result.dangerStartDate)}
                </Text>
              </View>
              
              <View style={styles.dateRangeDivider} />
              
              <View style={styles.dateRangeItem}>
                <Text style={styles.dateRangeLabel}>To:</Text>
                <Text style={styles.dateRangeValue}>
                  {formatDateShort(result.dangerEndDate)}
                </Text>
                <Text style={styles.dateRangeFull}>
                  {formatDate(result.dangerEndDate)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.safeDaysSection}>
            <View style={styles.safeDaysHeader}>
              <Ionicons name="shield-checkmark" size={24} color="#10B981" />
              <Text style={styles.safeDaysTitle}>Safe Days</Text>
            </View>
            <Text style={styles.safeDaysSubtitle}>
              Lower risk days for sexual intercourse
            </Text>
            
            <View style={styles.safeDaysCard}>
              <View style={styles.safeDayPeriod}>
                <Text style={styles.safeDayPeriodTitle}>Days 1-7 (Before danger period)</Text>
                <Text style={styles.safeDayPeriodDates}>
                  {formatDateShort(result.safeDaysBefore.startDate)} - {formatDateShort(result.safeDaysBefore.endDate)}
                </Text>
              </View>
              
              <View style={[styles.safeDayPeriod, styles.safeDayPeriodLast]}>
                <Text style={styles.safeDayPeriodTitle}>Days 20-32 (After danger period)</Text>
                <Text style={styles.safeDayPeriodDates}>
                  {formatDateShort(result.safeDaysAfter.startDate)} - {formatDateShort(result.safeDaysAfter.endDate)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.disclaimerCard}>
            <Ionicons name="information-circle" size={20} color="#6B7280" />
            <Text style={styles.disclaimerText}>
              This method is most effective when cycles are regular (26-32 days). 
              Always consult with a healthcare provider for personalized advice.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetCalculator}
          >
            <Ionicons name="refresh" size={20} color="#059669" />
            <Text style={styles.resetButtonText}>Calculate Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return renderWelcomeScreen();
      case 'question1':
        return renderQuestion1();
      case 'notEligible':
        return renderNotEligible();
      case 'question2':
        return renderQuestion2();
      case 'results':
        return renderResults();
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {renderCurrentStep()}
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
    marginBottom: 16,
    gap: 12,
  },
  noteHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
    fontFamily: "Poppins_700Bold",
  },
  noteText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 12,
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
  
  // Question Styles
  questionContainer: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  questionNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
  },
  questionNumberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins_700Bold",
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Poppins_700Bold",
  },
  questionText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  answerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  yesButton: {
    backgroundColor: "#059669",
  },
  noButton: {
    backgroundColor: "#EF4444",
  },
  answerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins_700Bold",
  },
  
  // Not Eligible Styles
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
  
  // Results Styles
  resultsContainer: {
    padding: 20,
  },
  resultsCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    gap: 12,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Poppins_700Bold",
  },
  resultSection: {
    marginBottom: 24,
  },
  resultItem: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  resultItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  resultItemTitle: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Poppins_500Medium",
  },
  resultItemValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
  },
  dangerDaysSection: {
    marginBottom: 24,
  },
  dangerDaysHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  dangerDaysTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4444",
    fontFamily: "Poppins_700Bold",
  },
  dangerDaysSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    fontFamily: "Poppins_400Regular",
  },
  dateRangeCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#FEE2E2",
  },
  dateRangeItem: {
    alignItems: "center",
  },
  dateRangeLabel: {
    fontSize: 12,
    color: "#991B1B",
    marginBottom: 8,
    fontFamily: "Poppins_500Medium",
  },
  dateRangeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 4,
    fontFamily: "Poppins_700Bold",
  },
  dateRangeFull: {
    fontSize: 13,
    color: "#991B1B",
    fontFamily: "Poppins_400Regular",
  },
  dateRangeDivider: {
    height: 1,
    backgroundColor: "#FEE2E2",
    marginVertical: 16,
  },
  safeDaysSection: {
    marginBottom: 24,
  },
  safeDaysHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  safeDaysTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10B981",
    fontFamily: "Poppins_700Bold",
  },
  safeDaysSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    fontFamily: "Poppins_400Regular",
  },
  safeDaysCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    gap: 16,
  },
  safeDayPeriod: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D1FAE5",
  },
  safeDayPeriodLast: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  safeDayPeriodTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#065F46",
    marginBottom: 8,
    fontFamily: "Poppins_600SemiBold",
  },
  safeDayPeriodDates: {
    fontSize: 16,
    color: "#047857",
    fontFamily: "Poppins_500Medium",
  },
  disclaimerCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
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
