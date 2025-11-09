import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';

interface PregnancyNoticeProps {
  onGoHome: () => void;
  onReset: () => void;
}

export default function PregnancyNotice({ onGoHome, onReset }: PregnancyNoticeProps) {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Card with Icon */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.iconContainer}>
            <Text style={styles.warningIcon}>⚠️</Text>
          </View>
          <Text variant="titleMedium" style={styles.headerTitle}>
            Important Notice
          </Text>
          <Text variant="bodySmall" style={styles.headerSubtitle}>
            Pregnancy and Contraceptive Use
          </Text>
        </Card.Content>
      </Card>

      {/* Main Message Card */}
      <Card style={styles.messageCard}>
        <Card.Content>
          <View style={styles.messageContainer}>
            <Text variant="titleMedium" style={styles.mainMessage}>
              You cannot use contraceptives while you are pregnant.
            </Text>
            <Divider style={styles.divider} />
            <Text variant="bodySmall" style={styles.adviceText}>
              Please consult with your healthcare provider for guidance during pregnancy. 
              They can provide you with appropriate care and support throughout your pregnancy journey.
            </Text>
            <Text variant="bodySmall" style={styles.adviceText}>
              You can return to use this tool after delivery when you're ready to plan your 
              contraceptive options.
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Information Card */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text variant="titleSmall" style={styles.infoTitle}>
            💡 Next Steps
          </Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.bullet}>•</Text>
              <Text variant="bodySmall" style={styles.infoText}>
                Schedule a consultation with your healthcare provider
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.bullet}>•</Text>
              <Text variant="bodySmall" style={styles.infoText}>
                Discuss your pregnancy care and postpartum planning
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.bullet}>•</Text>
              <Text variant="bodySmall" style={styles.infoText}>
                Plan for contraceptive options after delivery
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons Card */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <Button
            mode="contained"
            onPress={onGoHome}
            style={styles.homeButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Return to Home
          </Button>

          <Button 
            mode="outlined" 
            onPress={onReset} 
            style={styles.resetButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.resetButtonLabel}
          >
            Start Over
          </Button>
        </Card.Content>
      </Card>

      {/* Footer Spacer */}
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  headerCard: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  warningIcon: {
    fontSize: 40,
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#DC2626',
    fontWeight: '700',
    letterSpacing: -0.2,
    fontSize: 18,
    lineHeight: 24,
  },
  headerSubtitle: {
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 18,
    fontSize: 13,
  },
  messageCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  messageContainer: {
    gap: 16,
  },
  mainMessage: {
    textAlign: 'center',
    color: '#991B1B',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.2,
    fontSize: 18,
  },
  divider: {
    marginVertical: 4,
    backgroundColor: '#FCA5A5',
  },
  adviceText: {
    color: '#7F1D1D',
    lineHeight: 20,
    textAlign: 'left',
    fontSize: 14,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  infoTitle: {
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
    letterSpacing: -0.2,
    fontSize: 16,
    lineHeight: 22,
  },
  infoList: {
    gap: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#6D28D9',
    fontWeight: '700',
    lineHeight: 20,
  },
  infoText: {
    flex: 1,
    color: '#4B5563',
    lineHeight: 20,
    fontSize: 14,
  },
  actionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  homeButton: {
    backgroundColor: '#6D28D9',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  resetButton: {
    borderRadius: 12,
    borderColor: '#D1D5DB',
    borderWidth: 1.5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#FFFFFF',
  },
  resetButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#6B7280',
  },
  footerSpacer: {
    height: 24,
  },
});

