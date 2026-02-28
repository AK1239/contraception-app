/**
 * Info card displaying SDM vs Calendar Method comparison
 * Shown on natural calculators index, calendar method calculator, and standard day calculator
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
// @ts-ignore - Expo vector icons types
import { Ionicons } from '@expo/vector-icons';

export default function NaturalMethodsInfoCard() {
  const { t } = useTranslation();

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="information-circle" size={24} color="#6D28D9" />
          <Text style={styles.title}>{t('naturalCalculators.infoCardTitle')}</Text>
        </View>
        <Text style={styles.paragraph}>{t('naturalCalculators.infoCardSdm')}</Text>
        <Text style={styles.paragraph}>{t('naturalCalculators.infoCardCalendar')}</Text>
        <Text style={[styles.paragraph, styles.disclaimer]}>
          {t('naturalCalculators.infoCardDisclaimer')}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderLeftColor: '#6D28D9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 12,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  disclaimer: {
    marginBottom: 0,
    fontStyle: 'italic',
    color: '#64748B',
  },
});
