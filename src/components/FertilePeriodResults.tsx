import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FertilePeriodResult, CalendarResult, formatDate } from '../utils/fertilePeriodCalculator';

interface FertilePeriodResultsProps {
  fertilePeriod: FertilePeriodResult;
  calendarResult: CalendarResult;
}

export default function FertilePeriodResults({ fertilePeriod, calendarResult }: FertilePeriodResultsProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={64} color="#10B981" />
        </View>
        
        <Text style={styles.title}>Your Results Are Ready!</Text>
        <Text style={styles.subtitle}>
          Here's your personalized fertility calendar
        </Text>
        

        {/* Fertile Period Card */}
        <View style={[styles.infoCard, styles.fertileCard]}>
          <View style={styles.cardHeader}>
            <Ionicons name="close-circle" size={20} color="#EF4444" />
            <Text style={[styles.sectionTitle, styles.fertileTitle]}>Fertile Period (Avoid)</Text>
          </View>
          
          <View style={styles.fertileRange}>
            <Text style={styles.fertileRangeText}>
              Day {fertilePeriod.earliestFertileDay} - {fertilePeriod.latestFertileDay} of your cycle
            </Text>
          </View>
          
          <View style={styles.datesList}>
            <View style={styles.dateItem}>
              <Ionicons name="calendar" size={16} color="#DC2626" />
              <Text style={styles.dateItemLabel}>Starts:</Text>
              <Text style={styles.dateItemValue}>
                {formatDate(calendarResult.fertileStartDate)}
              </Text>
            </View>
            
            <View style={styles.dateItem}>
              <Ionicons name="calendar" size={16} color="#DC2626" />
              <Text style={styles.dateItemLabel}>Ends:</Text>
              <Text style={styles.dateItemValue}>
                {formatDate(calendarResult.fertileEndDate)}
              </Text>
            </View>
          </View>
        </View>

        {/* Safe Days Card */}
        <View style={[styles.infoCard, styles.safeCard]}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            <Text style={[styles.sectionTitle, styles.safeTitle]}>Safe Days</Text>
          </View>
          
          <Text style={styles.safeDescription}>
            Lower pregnancy risk during these periods
          </Text>
          
          <View style={styles.safePeriods}>
            <View style={styles.safePeriodSection}>
              <Text style={styles.safePeriodLabel}>
                Day 1-7 (before fertile window)
              </Text>
              <Text style={styles.safePeriodDateRange}>
                {formatDate(calendarResult.safeStartDate)} - {formatDate(calendarResult.safeEndDate)}
              </Text>
            </View>
            
            <View style={styles.safePeriodSection}>
              <Text style={styles.safePeriodLabel}>
                Day 20 onward (after fertile window)
              </Text>
              <Text style={styles.safePeriodDateRange}>
                From {formatDate(calendarResult.fertileEndDate)} onwards
              </Text>
            </View>
          </View>
        </View>

        {/* Next Period Card */}
        <View style={[styles.infoCard, styles.periodCard]}>
          <View style={styles.cardHeader}>
            <Ionicons name="water" size={20} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, styles.periodTitle]}>Next Period Expected</Text>
          </View>
          
          <Text style={styles.nextPeriodDate}>
            {formatDate(calendarResult.nextPeriodDate)}
          </Text>
        </View>

        {/* Warning Section */}
        <View style={styles.warningSection}>
          <View style={styles.warningHeader}>
            <Ionicons name="alert-circle" size={24} color="#F59E0B" />
            <Text style={styles.warningTitle}>Important Reminders</Text>
          </View>
          
          <View style={styles.reminderItem}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#F59E0B" />
            <Text style={styles.reminderText}>
              These results apply only to this cycle; update after your next period begins.
            </Text>
          </View>
          
          <View style={styles.reminderItem}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#F59E0B" />
            <Text style={styles.reminderText}>
              Avoid intercourse during your fertile period to prevent pregnancy
            </Text>
          </View>
          
          <View style={styles.reminderItem}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#F59E0B" />
            <Text style={styles.reminderText}>
              Most effective for women with regular cycles (26-32 days)
            </Text>
          </View>
          
          <View style={styles.reminderItem}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#F59E0B" />
            <Text style={styles.reminderText}>
              Track your cycles consistently for better accuracy
            </Text>
          </View>
        </View>

        {/* Reminder Note */}
        <View style={styles.reminderNoteCard}>
          <Ionicons name="calendar-outline" size={24} color="#059669" />
          <Text style={styles.reminderNoteText}>
            Come back again to calculate when your next period starts
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
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
  successIcon: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
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
    marginBottom: 32,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  
  // Info Cards
  infoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  
  
  // Fertile Card
  fertileCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  fertileTitle: {
    color: '#991B1B',
  },
  fertileRange: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  fertileRangeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#991B1B',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  datesList: {
    gap: 8,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
  },
  dateItemLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  dateItemValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#991B1B',
    flex: 1,
    textAlign: 'right',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  
  // Safe Card
  safeCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#D1FAE5',
  },
  safeTitle: {
    color: '#065F46',
  },
  safeDescription: {
    fontSize: 14,
    color: '#065F46',
    marginBottom: 16,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  safePeriods: {
    gap: 8,
  },
  safePeriodSection: {
    marginBottom: 20,
  },
  safePeriodLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  safePeriodDateRange: {
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  safePeriodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
  },
  safePeriodBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safePeriodNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  safePeriodContent: {
    flex: 1,
  },
  safePeriodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  
  // Period Card
  periodCard: {
    backgroundColor: '#FAF5FF',
    borderColor: '#F3E8FF',
  },
  periodTitle: {
    color: '#6B21A8',
  },
  nextPeriodDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  
  // Warning Section
  warningSection: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400E',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  reminderText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  reminderNoteCard: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    alignItems: 'center',
  },
  reminderNoteText: {
    flex: 1,
    fontSize: 14,
    color: '#065F46',
    lineHeight: 20,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});

