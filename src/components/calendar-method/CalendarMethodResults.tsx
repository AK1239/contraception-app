/**
 * Calendar Method Results Component
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
// @ts-ignore - Expo vector icons types
import { Ionicons } from '@expo/vector-icons';
import { CalendarMethodEligibilityResult } from '../../types/calendarMethod';

interface CalendarMethodResultsProps {
  result: CalendarMethodEligibilityResult;
  onReset: () => void;
}

export default function CalendarMethodResults({ result, onReset }: CalendarMethodResultsProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={48} color="#8B5CF6" />
        <Text style={styles.headerTitle}>Calendar Method</Text>
        <Text style={styles.headerSubtitle}>Rhythm Method Results</Text>
      </View>

      {/* Cycle Statistics */}
      {result.shortestCycle !== null && result.longestCycle !== null && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Ionicons name="stats-chart" size={24} color="#8B5CF6" />
              <Text style={styles.cardTitle}>Your Cycle Statistics</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Shortest cycle:</Text>
              <Text style={styles.statValue}>{result.shortestCycle} days</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Longest cycle:</Text>
              <Text style={styles.statValue}>{result.longestCycle} days</Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Eligibility Status */}
      <Card style={[styles.card, result.eligible ? styles.eligibleCard : styles.notEligibleCard]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons
              name={result.eligible ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={result.eligible ? '#8B5CF6' : '#DC2626'}
            />
            <Text style={styles.cardTitle}>
              {result.eligible ? 'Method Applicable' : 'Not Recommended'}
            </Text>
          </View>
          <Text style={styles.messageText}>{result.message}</Text>
          {result.warning && (
            <View style={styles.warningBox}>
              <Ionicons name="warning" size={20} color="#F59E0B" />
              <Text style={styles.warningText}>{result.warning}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Fertile Window (only if eligible and calculated) */}
      {result.eligible && result.earliestFertileDay !== null && result.latestFertileDay !== null && (
        <Card style={[styles.card, styles.fertileCard]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Ionicons name="warning" size={24} color="#DC2626" />
              <Text style={styles.cardTitle}>Fertile Window</Text>
            </View>
            <Text style={styles.windowSubtitle}>Avoid intercourse during these days</Text>
            <Divider style={styles.divider} />
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Cycle Days:</Text>
              <Text style={styles.dateValue}>
                Day {result.earliestFertileDay} to Day {result.latestFertileDay}
              </Text>
            </View>
            {result.fertileWindow && (
              <>
                <Divider style={styles.divider} />
                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>Start Date:</Text>
                  <Text style={styles.dateValue}>{result.fertileWindow.calendarDates.fertileStart}</Text>
                </View>
                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>End Date:</Text>
                  <Text style={styles.dateValue}>{result.fertileWindow.calendarDates.fertileEnd}</Text>
                </View>
              </>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Safe Days */}
      {result.eligible && result.safeWindow && (
        <Card style={[styles.card, styles.safeCard]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Ionicons name="shield-checkmark" size={24} color="#059669" />
              <Text style={styles.cardTitle}>Safe Days</Text>
            </View>
            <Text style={styles.windowSubtitle}>Lower pregnancy risk during these periods</Text>
            <Divider style={styles.divider} />
            
            <View style={styles.safeDaySection}>
              <Text style={styles.safeDayLabel}>
                Days 1-{result.earliestFertileDay! - 1} (before fertile window)
              </Text>
              <Text style={styles.safeDayDateRange}>
                {result.safeWindow.beforeFertile.calendarDates.start} - {result.safeWindow.beforeFertile.calendarDates.end}
              </Text>
            </View>
            
            <View style={styles.safeDaySection}>
              <Text style={styles.safeDayLabel}>
                Days {result.latestFertileDay! + 1}-32 (after fertile window)
              </Text>
              <Text style={styles.safeDayDateRange}>
                {result.safeWindow.afterFertile.calendarDate} onwards
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Educational Message */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
            <Text style={styles.cardTitle}>Important Information</Text>
          </View>
          <Text style={styles.educationalText}>{result.educationalMessage}</Text>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={onReset}
          style={styles.resetButton}
          labelStyle={styles.buttonLabel}
          icon="refresh"
        >
          Calculate Again
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  eligibleCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  notEligibleCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  fertileCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  safeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  messageText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    gap: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  windowSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_400Regular',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  safeDaySection: {
    marginBottom: 20,
  },
  safeDayLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  safeDayDateRange: {
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  safeDayText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 6,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  educationalText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  buttonContainer: {
    marginTop: 8,
  },
  resetButton: {
    borderRadius: 12,
    paddingVertical: 6,
    backgroundColor: '#8B5CF6',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
