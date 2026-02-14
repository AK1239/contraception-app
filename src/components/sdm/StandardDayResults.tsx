/**
 * Standard Days Method Results Component
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
// @ts-ignore - Expo vector icons types
import { Ionicons } from '@expo/vector-icons';
import { SDMEligibilityResult } from '../../types/standardDayMethod';

interface StandardDayResultsProps {
  result: SDMEligibilityResult;
  onReset: () => void;
}

export default function StandardDayResults({ result, onReset }: StandardDayResultsProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="calendar" size={48} color="#059669" />
        <Text style={styles.headerTitle}>Standard Days Method</Text>
        <Text style={styles.headerSubtitle}>Your Results</Text>
      </View>

      {/* Average Cycle Length */}
      {result.avgCycleLength !== null && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Ionicons name="stats-chart" size={24} color="#059669" />
              <Text style={styles.cardTitle}>Average Cycle Length</Text>
            </View>
            <Text style={styles.avgCycleText}>{result.avgCycleLength.toFixed(1)} days</Text>
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
              color={result.eligible ? '#059669' : '#DC2626'}
            />
            <Text style={styles.cardTitle}>
              {result.eligible ? 'Eligible for SDM' : 'Not Eligible for SDM'}
            </Text>
          </View>
          <Text style={styles.messageText}>{result.message}</Text>
        </Card.Content>
      </Card>

      {/* Fertile Window (only if eligible and calculated) */}
      {result.eligible && result.fertileWindow && (
        <>
          <Card style={[styles.card, styles.fertileCard]}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Ionicons name="warning" size={24} color="#DC2626" />
                <Text style={styles.cardTitle}>Fertile Window (Day 8-19)</Text>
              </View>
              <Text style={styles.windowSubtitle}>Pregnancy risk is high during these days</Text>
              <Divider style={styles.divider} />
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Start Date:</Text>
                <Text style={styles.dateValue}>{result.fertileWindow.calendarDates.fertileStart}</Text>
              </View>
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>End Date:</Text>
                <Text style={styles.dateValue}>{result.fertileWindow.calendarDates.fertileEnd}</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Safe Days */}
          {result.safeWindow && (
            <Card style={[styles.card, styles.safeCard]}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Ionicons name="shield-checkmark" size={24} color="#059669" />
                  <Text style={styles.cardTitle}>Safe Days</Text>
                </View>
                <Text style={styles.windowSubtitle}>Lower pregnancy risk during these periods</Text>
                <Divider style={styles.divider} />
                <Text style={styles.safeDayText}>• Day 1-7 (before fertile window)</Text>
                <Text style={styles.safeDayText}>• Day 20 onward (after fertile window)</Text>
              </Card.Content>
            </Card>
          )}
        </>
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
  avgCycleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  eligibleCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
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
    backgroundColor: '#059669',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
