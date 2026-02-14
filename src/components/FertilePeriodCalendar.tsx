import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CalendarResult, getDayOfCycle } from '../utils/fertilePeriodCalculator';

interface FertilePeriodCalendarProps {
  onDateSelect: (date: Date) => void;
  calendarResult?: CalendarResult;
}

export default function FertilePeriodCalendar({ onDateSelect, calendarResult }: FertilePeriodCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayMonth, setDisplayMonth] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Don't call onDateSelect immediately - wait for user confirmation
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelect(selectedDate);
    }
  };

  const formatSelectedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(displayMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setDisplayMonth(newMonth);
  };

  const getCalendarDays = () => {
    const currentMonth = displayMonth.getMonth();
    const currentYear = displayMonth.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
    return date >= startDate && date <= endDate;
  };

  const getDateStyle = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (calendarResult) {
      if (isDateInRange(checkDate, calendarResult.fertileStartDate, calendarResult.fertileEndDate)) {
        return styles.fertileDate;
      }
      if (isDateInRange(checkDate, calendarResult.safeStartDate, calendarResult.safeEndDate)) {
        return styles.safeDate;
      }
    }
    
    return styles.normalDate;
  };

  const getDateTextStyle = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (calendarResult) {
      if (isDateInRange(checkDate, calendarResult.fertileStartDate, calendarResult.fertileEndDate)) {
        return styles.fertileDateText;
      }
      if (isDateInRange(checkDate, calendarResult.safeStartDate, calendarResult.safeEndDate)) {
        return styles.safeDateText;
      }
    }
    
    return styles.normalDateText;
  };

  const days = getCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonth = displayMonth.getMonth();
  const currentYear = displayMonth.getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerIcon}>
          <Ionicons name="calendar" size={32} color="#6D28D9" />
        </View>
        
        <Text style={styles.title}>Select Your Last Period Date</Text>
        <Text style={styles.subtitle}>
          When was the first day of your last menstrual period?
        </Text>
        
        <View style={styles.calendarContainer}>
          <View style={styles.monthHeader}>
            <TouchableOpacity 
              style={styles.monthNav}
              onPress={() => navigateMonth('prev')}
            >
              <Ionicons name="chevron-back" size={24} color="#6D28D9" />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {monthNames[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity 
              style={styles.monthNav}
              onPress={() => navigateMonth('next')}
            >
              <Ionicons name="chevron-forward" size={24} color="#6D28D9" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.dayNamesRow}>
            {dayNames.map(day => (
              <Text key={day} style={styles.dayName}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {days.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth;
              const isSelected = selectedDate && 
                date.getDate() === selectedDate.getDate() && 
                date.getMonth() === selectedDate.getMonth() && 
                date.getFullYear() === selectedDate.getFullYear();
              const today = new Date();
              const isToday = date.getDate() === today.getDate() && 
                date.getMonth() === today.getMonth() && 
                date.getFullYear() === today.getFullYear();
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateCell,
                    getDateStyle(date),
                    isSelected && styles.selectedDate,
                    !isCurrentMonth && styles.otherMonthDate,
                    isToday && !isSelected && styles.todayDate,
                  ]}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text style={[
                    styles.dateText,
                    getDateTextStyle(date),
                    !isCurrentMonth && styles.otherMonthText,
                    isSelected && styles.selectedDateText,
                    isToday && !isSelected && styles.todayText,
                  ]}>
                    {date.getDate()}
                  </Text>
                  {calendarResult && isCurrentMonth && (
                    <Text style={styles.dayOfCycle}>
                      {getDayOfCycle(date, calendarResult.lastPeriodDate)}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {calendarResult && (
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.safeColor]} />
              <Text style={styles.legendText}>Safe days</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.fertileColor]} />
              <Text style={styles.legendText}>Fertile days</Text>
            </View>
          </View>
        )}

        {selectedDate && (
          <View style={styles.confirmationSection}>
            <View style={styles.selectedDateContainer}>
              <Ionicons name="calendar-outline" size={20} color="#6D28D9" />
              <View style={styles.selectedDateTextContainer}>
                <Text style={styles.selectedDateLabel}>Selected date:</Text>
                <Text style={styles.selectedDateValue}>
                  {formatSelectedDate(selectedDate)}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm & Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerIcon: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  calendarContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthNav: {
    padding: 8,
    borderRadius: 8,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  dateCell: {
    width: '13.5%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  dayOfCycle: {
    fontSize: 9,
    color: '#9CA3AF',
    fontFamily: 'PlusJakartaSans_400Regular',
    marginTop: 2,
  },
  normalDate: {
    backgroundColor: '#fff',
  },
  normalDateText: {
    color: '#374151',
  },
  todayDate: {
    borderWidth: 2,
    borderColor: '#6D28D9',
  },
  todayText: {
    color: '#6D28D9',
    fontWeight: 'bold',
  },
  safeDate: {
    backgroundColor: '#D1FAE5',
  },
  safeDateText: {
    color: '#065F46',
    fontWeight: 'bold',
  },
  fertileDate: {
    backgroundColor: '#FEE2E2',
  },
  fertileDateText: {
    color: '#991B1B',
    fontWeight: 'bold',
  },
  otherMonthDate: {
    backgroundColor: 'transparent',
  },
  otherMonthText: {
    color: '#E5E7EB',
  },
  selectedDate: {
    backgroundColor: '#6D28D9',
    borderWidth: 0,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 6,
  },
  safeColor: {
    backgroundColor: '#D1FAE5',
  },
  fertileColor: {
    backgroundColor: '#FEE2E2',
  },
  legendText: {
    fontSize: 13,
    color: '#374151',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  confirmationSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  selectedDateTextContainer: {
    flex: 1,
  },
  selectedDateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  selectedDateValue: {
    fontSize: 15,
    color: '#6D28D9',
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  confirmButton: {
    backgroundColor: '#6D28D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
