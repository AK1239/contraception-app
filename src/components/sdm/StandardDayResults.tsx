/**
 * Standard Days Method Results Component
 * Updated with complete date calculations, visual calendar, and safety alerts
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
// @ts-ignore - Expo vector icons types
import { Ionicons } from '@expo/vector-icons';
import { SDMEligibilityResult } from '../../types/standardDayMethod';
import SDMCalendar from './SDMCalendar';

interface StandardDayResultsProps {
  result: SDMEligibilityResult;
  onReset: () => void;
}

export default function StandardDayResults({ result, onReset }: StandardDayResultsProps) {
  const [showPeriodAlert, setShowPeriodAlert] = useState(false);

  useEffect(() => {
    // Check if predicted period date has passed
    if (result.nextPeriod && result.lmpDate) {
      const today = new Date();
      const predictedDate = new Date(result.nextPeriod.predictedDate);
      
      if (today > predictedDate && !showPeriodAlert) {
        setShowPeriodAlert(true);
        Alert.alert(
          'Period Date Passed',
          'Your expected period date has passed. Please enter the first day of your new period to generate accurate safe days.',
          [
            { text: 'Recalculate', onPress: onReset, style: 'default' },
            { text: 'Later', style: 'cancel' },
          ]
        );
      }
    }
  }, [result.nextPeriod, result.lmpDate, showPeriodAlert, onReset]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="calendar" size={48} color="#6D28D9" />
        <Text style={styles.headerTitle}>Standard Days Method</Text>
        <Text style={styles.headerSubtitle}>Your Fertility Calendar</Text>
      </View>

      {/* Summary Card */}
      <Card style={[styles.card, styles.summaryCard]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={24} color="#6D28D9" />
            <Text style={styles.cardTitle}>📊 YOUR RESULTS</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Average cycle length:</Text>
            <Text style={styles.summaryValue}>{result.avgCycleLength} days</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Eligibility:</Text>
            <Text style={[styles.summaryValue, result.eligible ? styles.eligible : styles.notEligible]}>
              {result.eligible ? 'Eligible ✓' : 'Not Eligible ✗'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Eligibility Status */}
      {!result.eligible && (
        <Card style={[styles.card, styles.notEligibleCard]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Ionicons name="close-circle" size={24} color="#DC2626" />
              <Text style={styles.cardTitle}>Not Eligible for SDM</Text>
            </View>
            <Text style={styles.messageText}>{result.message}</Text>
          </Card.Content>
        </Card>
      )}

      {/* Fertile Window (only if eligible and calculated) */}
      {result.eligible && result.fertileWindow && (
        <>
          <Card style={[styles.card, styles.fertileCard]}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Ionicons name="warning" size={24} color="#DC2626" />
                <Text style={styles.cardTitle}>🔴 Fertile (Unsafe) Days</Text>
              </View>
              <Text style={styles.windowSubtitle}>Pregnancy Possible — Avoid Unprotected Intercourse</Text>
              <Divider style={styles.divider} />
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>From:</Text>
                <Text style={styles.dateValue}>{result.fertileWindow.calendarDates.fertileStart}</Text>
              </View>
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>To:</Text>
                <Text style={styles.dateValue}>{result.fertileWindow.calendarDates.fertileEnd}</Text>
              </View>
              <View style={styles.warningBox}>
                <Ionicons name="alert-circle" size={16} color="#DC2626" />
                <Text style={styles.warningText}>
                  Avoid unprotected intercourse during these dates.
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Safe Days */}
          {result.safeWindow && (
            <Card style={[styles.card, styles.safeCard]}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Ionicons name="shield-checkmark" size={24} color="#059669" />
                  <Text style={styles.cardTitle}>🟢 Safe Days</Text>
                </View>
                <Text style={styles.windowSubtitle}>Low Pregnancy Probability</Text>
                <Divider style={styles.divider} />
                
                <Text style={styles.safeSectionHeader}>Before Fertile Window</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>From:</Text>
                  <Text style={styles.dateValue}>{result.safeWindow.beforeFertile.calendarDates.start}</Text>
                </View>
                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>To:</Text>
                  <Text style={styles.dateValue}>{result.safeWindow.beforeFertile.calendarDates.end}</Text>
                </View>
                
                <Divider style={styles.divider} />
                
                <Text style={styles.safeSectionHeader}>After Fertile Window</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>From:</Text>
                  <Text style={styles.dateValue}>{result.safeWindow.afterFertile.calendarDates.start}</Text>
                </View>
                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>To:</Text>
                  <Text style={styles.dateValue}>{result.safeWindow.afterFertile.calendarDates.end}</Text>
                </View>
                
                <View style={styles.infoBox}>
                  <Ionicons name="information-circle" size={16} color="#059669" />
                  <Text style={styles.infoText}>
                    Safe days END on: {result.safeWindow.afterFertile.calendarDates.end}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}

          {/* Predicted Next Period */}
          {result.nextPeriod && (
            <Card style={[styles.card, styles.periodCard]}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Ionicons name="water" size={24} color="#2563EB" />
                  <Text style={styles.cardTitle}>🩸 Predicted Next Period</Text>
                </View>
                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>Expected on or around:</Text>
                  <Text style={[styles.dateValue, styles.periodDate]}>
                    {result.nextPeriod.formattedDate}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}

          {/* Recalculation Reminder */}
          {result.recalculationDate && (
            <Card style={[styles.card, styles.recalculationCard]}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Ionicons name="sync" size={24} color="#F59E0B" />
                  <Text style={styles.cardTitle}>🔁 Recalculation Reminder</Text>
                </View>
                <Text style={styles.recalculationText}>
                  Return on the first day of your next period: <Text style={styles.bold}>{result.recalculationDate.formattedDate}</Text>
                </Text>
                <Text style={styles.recalculationWarning}>
                  If bleeding starts earlier or later, previous safe days are no longer reliable.
                </Text>
              </Card.Content>
            </Card>
          )}

          {/* Visual Calendar */}
          {result.calendarDates && (
            <Card style={styles.card}>
              <Card.Content>
                <SDMCalendar 
                  calendarDates={result.calendarDates} 
                  avgCycleLength={result.avgCycleLength || 28}
                />
              </Card.Content>
            </Card>
          )}
        </>
      )}

      {/* Educational Message */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="book" size={24} color="#3B82F6" />
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
    backgroundColor: '#FFFFFF',
  },
  summaryCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6D28D9',
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#4A5568',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  eligible: {
    color: '#059669',
  },
  notEligible: {
    color: '#DC2626',
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
  periodCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  recalculationCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  messageText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
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
  periodDate: {
    color: '#2563EB',
  },
  safeSectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  warningText: {
    fontSize: 14,
    color: '#991B1B',
    marginLeft: 8,
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#065F46',
    marginLeft: 8,
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  recalculationText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  recalculationWarning: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans_700Bold',
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
    backgroundColor: '#059669',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
