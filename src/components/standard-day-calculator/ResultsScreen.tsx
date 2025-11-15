import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatDate, formatDateShort, StandardDayResult } from "../../utils/standardDayCalculator";

interface ResultsScreenProps {
  lastPeriodDate: Date;
  result: StandardDayResult;
  onCalculateAgain: () => void;
}

export default function ResultsScreen({ 
  lastPeriodDate, 
  result, 
  onCalculateAgain 
}: ResultsScreenProps) {
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

        <View style={styles.reminderNoteCard}>
          <Ionicons name="calendar-outline" size={24} color="#059669" />
          <Text style={styles.reminderNoteText}>
            Come back again to calculate when your next period starts
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={onCalculateAgain}
        >
          <Ionicons name="refresh" size={20} color="#059669" />
          <Text style={styles.resetButtonText}>Calculate Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  reminderNoteCard: {
    flexDirection: "row",
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    alignItems: "center",
  },
  reminderNoteText: {
    flex: 1,
    fontSize: 14,
    color: "#065F46",
    lineHeight: 20,
    fontFamily: "Poppins_500Medium",
  },
});

