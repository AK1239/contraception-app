import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StandardDayCalendarProps {
  onDateSelect: (date: Date) => void;
}

export default function StandardDayCalendar({ onDateSelect }: StandardDayCalendarProps) {
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

  const formatSelectedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
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
      <View style={styles.calendarContainer}>
        <View style={styles.monthHeader}>
          <TouchableOpacity 
            style={styles.monthNav}
            onPress={() => navigateMonth('prev')}
          >
            <Ionicons name="chevron-back" size={24} color="#059669" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity 
            style={styles.monthNav}
            onPress={() => navigateMonth('next')}
          >
            <Ionicons name="chevron-forward" size={24} color="#059669" />
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
                  isSelected && styles.selectedDate,
                  !isCurrentMonth && styles.otherMonthDate,
                  isToday && !isSelected && styles.todayDate,
                ]}
                onPress={() => handleDateSelect(date)}
                disabled={!isCurrentMonth}
              >
                <Text style={[
                  styles.dateText,
                  !isCurrentMonth && styles.otherMonthText,
                  isSelected && styles.selectedDateText,
                  isToday && !isSelected && styles.todayText,
                ]}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {selectedDate && (
        <View style={styles.confirmationSection}>
          <View style={styles.selectedDateContainer}>
            <Ionicons name="calendar-outline" size={20} color="#059669" />
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
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
    fontFamily: 'Poppins_700Bold',
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
    fontFamily: 'Poppins_600SemiBold',
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
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Poppins_600SemiBold',
  },
  todayDate: {
    borderWidth: 2,
    borderColor: '#059669',
  },
  todayText: {
    color: '#059669',
    fontWeight: 'bold',
  },
  selectedDate: {
    backgroundColor: '#059669',
    borderWidth: 0,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherMonthDate: {
    backgroundColor: 'transparent',
  },
  otherMonthText: {
    color: '#E5E7EB',
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
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  selectedDateTextContainer: {
    flex: 1,
  },
  selectedDateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Poppins_500Medium',
  },
  selectedDateValue: {
    fontSize: 15,
    color: '#059669',
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  confirmButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
});

