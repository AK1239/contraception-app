import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

interface PregnancyNoticeProps {
  onGoHome: () => void;
  onReset: () => void;
}

export default function PregnancyNotice({ onGoHome, onReset }: PregnancyNoticeProps) {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.pregnancyCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.pregnancyTitle}>
            ⚠️ Important Notice
          </Text>
          <Text variant="bodyLarge" style={styles.pregnancyMessage}>
            You cannot use contraceptives while you are pregnant.
          </Text>
          <Text variant="bodyMedium" style={styles.pregnancyAdvice}>
            Please consult with your healthcare provider for guidance during pregnancy. You can
            return to use this tool after delivery when you're ready to plan your contraceptive
            options.
          </Text>

          <View style={styles.pregnancyActions}>
            <Button
              mode="contained"
              onPress={onGoHome}
              style={styles.homeButton}
            >
              Return to Home
            </Button>

            <Button mode="outlined" onPress={onReset} style={styles.resetButton}>
              Start Over 
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pregnancyCard: {
    margin: 16,
    backgroundColor: '#ffebee',
    elevation: 4,
  },
  pregnancyTitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#c62828',
  },
  pregnancyMessage: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#c62828',
    fontWeight: 'bold',
  },
  pregnancyAdvice: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    lineHeight: 20,
  },
  pregnancyActions: {
    gap: 12,
  },
  homeButton: {
    backgroundColor: '#1976d2',
  },
  resetButton: {
    borderColor: '#c62828',
  },
});

