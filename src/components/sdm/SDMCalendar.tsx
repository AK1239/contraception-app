/**
 * SDM Visual Calendar Component
 * Color-coded calendar showing fertile, safe, and expected period dates
 * RED = Fertile (unsafe), GREEN = Safe, GREY = Past dates
 * Tap a day to show label: "Safe day", "Fertile day — pregnancy possible", "Expected menstruation"
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore - Expo vector icons types
import { Ionicons } from '@expo/vector-icons';

interface CalendarDateData {
  date: Date;
  formattedDate: string;
  type: 'safe' | 'fertile' | 'expected-period';
  dayNumber: number;
}

interface SDMCalendarProps {
  calendarDates: CalendarDateData[];
  avgCycleLength: number;
  fertileRange?: string; // e.g., "Day 5-16" for dynamic display
}

function isDatePast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d < today;
}

export default function SDMCalendar({ calendarDates, avgCycleLength: _avgCycleLength, fertileRange }: SDMCalendarProps) {
  const { t } = useTranslation();

  const getTapLabel = (type: 'safe' | 'fertile' | 'expected-period'): string => {
    switch (type) {
      case 'fertile':
        return t('calendar.calendarLabels.fertileDay');
      case 'safe':
        return t('calendar.calendarLabels.safeDay');
      case 'expected-period':
        return t('calendar.calendarLabels.expectedMenstruation');
    }
  };
  // Group dates by week (7 days)
  const weeks: CalendarDateData[][] = [];
  for (let i = 0; i < calendarDates.length; i += 7) {
    weeks.push(calendarDates.slice(i, i + 7));
  }

  // Calculate the actual fertile day range from the data if not provided
  const calculateFertileDayRange = (): string => {
    if (fertileRange) return fertileRange;
    
    const fertileDays = calendarDates
      .filter(d => d.type === 'fertile')
      .map(d => d.dayNumber);
    
    if (fertileDays.length > 0) {
      const minDay = Math.min(...fertileDays);
      const maxDay = Math.max(...fertileDays);
      return `Day ${minDay}-${maxDay}`;
    }
    
    return 'Day 8-19'; // Default fallback for SDM
  };

  const getColorByType = (type: 'safe' | 'fertile' | 'expected-period', past: boolean) => {
    if (past) {
      return { bg: '#E5E7EB', border: '#9CA3AF', text: '#6B7280' };
    }
    switch (type) {
      case 'fertile':
        return { bg: '#FEE2E2', border: '#DC2626', text: '#991B1B' };
      case 'safe':
        return { bg: '#D1FAE5', border: '#059669', text: '#065F46' };
      case 'expected-period':
        return { bg: '#DBEAFE', border: '#2563EB', text: '#1E40AF' };
    }
  };

  const getLabel = (type: 'safe' | 'fertile' | 'expected-period') => {
    switch (type) {
      case 'fertile':
        return 'Fertile';
      case 'safe':
        return 'Safe';
      case 'expected-period':
        return 'Period';
    }
  };

  const handleDayPress = (dayData: CalendarDateData) => {
    Alert.alert(
      dayData.formattedDate,
      getTapLabel(dayData.type),
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calendar" size={20} color="#6D28D9" />
        <Text style={styles.headerText}>Your Cycle Calendar</Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
          <Text style={styles.legendText}>Fertile ({calculateFertileDayRange()})</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
          <Text style={styles.legendText}>Safe</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
          <Text style={styles.legendText}>Period</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#9CA3AF' }]} />
          <Text style={styles.legendText}>Past</Text>
        </View>
      </View>

      {/* Calendar Grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {week.map((dayData) => {
                const past = isDatePast(dayData.date);
                const colors = getColorByType(dayData.type, past);
                const dateObj = new Date(dayData.date);
                const dayOfMonth = dateObj.getDate();
                const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                
                return (
                  <TouchableOpacity
                    key={dayData.formattedDate}
                    style={[
                      styles.dayCell,
                      {
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => handleDayPress(dayData)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.dayNumber, { color: colors.text }]}>
                      {dayData.dayNumber}
                    </Text>
                    <Text style={[styles.dateText, { color: colors.text }]}>
                      {month} {dayOfMonth}
                    </Text>
                    <Text style={[styles.typeLabel, { color: colors.text }]}>
                      {getLabel(dayData.type)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Tap instruction */}
      <Text style={styles.instruction}>
        {t('calendar.calendarLabels.tapInstruction')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  calendarContainer: {
    flexDirection: 'column',
  },
  weekRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  dayCell: {
    width: 80,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  dateText: {
    fontSize: 11,
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  typeLabel: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  instruction: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    fontFamily: 'PlusJakartaSans_400Regular',
  },
});
