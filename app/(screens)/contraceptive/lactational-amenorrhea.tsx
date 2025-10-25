import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import ExpandableSection from '../../../src/components/ExpandableSection';

export default function LactationalAmenorrheaDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🤱</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            Lactational Amenorrhea Method
          </Text>
          <Text variant="titleSmall" style={styles.subtitle}>
            LAM
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            Natural contraception for breastfeeding women
          </Text>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <ExpandableSection title="Description" icon="📝">
            <Text variant="bodyMedium" style={styles.sectionText}>
              The act of breastfeeding changes the body's hormone balance in a way that you cannot get 
              pregnant. This method only works for breastfeeding women and can be a very good contraceptive 
              in the first 6 months of breastfeeding.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Efficacy" icon="📊">
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>Excellent</Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              The perfect use failure rate is <Text style={styles.highlight}>2%</Text>. Meaning that there is a chance that 2 in 100 women 
              will get pregnant if they use this method perfectly.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Advantages" icon="✅">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  It can be used immediately after childbirth
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Periods are absent during the course of breastfeeding
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  The process of returning to the normal stage after pregnancy is quicker
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="Disadvantages" icon="⚠️">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  May be inconvenient
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  It is difficult to predict when your fertility will return. Usually after 6 months, 
                  but can also occur before this time
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={styles.sectionText}>
              A minimum exclusive breastfeeding frequency of every <Text style={styles.highlight}>4 hours during the day</Text> and every <Text style={styles.highlight}>6 hours at night</Text>.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Time to Work" icon="⏰">
            <Text variant="bodyMedium" style={styles.sectionText}>
              Effective immediately after birth.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Conditions Required" icon="🔒">
            <View style={styles.warningBox}>
              <Text variant="bodyMedium" style={styles.warningTitle}>
                All of the following must be met:
              </Text>
            </View>
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={styles.bulletImportant} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Breastfeeding every 4 hours during the day and every 6 hours at night
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bulletImportant} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  No supplementation of other foods or formula
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bulletImportant} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  No return to menses
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bulletImportant} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  The baby must be younger than 6 months for perfect use
                </Text>
              </View>
            </View>
            <View style={styles.noteBox}>
              <Text variant="bodySmall" style={styles.noteText}>
                The efficacy of this method reduces after 6 months of delivery.
              </Text>
            </View>
          </ExpandableSection>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  headerCard: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    color: '#111827',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  description: {
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionsContainer: {
    paddingBottom: 24,
  },
  sectionText: {
    color: '#4B5563',
    lineHeight: 24,
    fontSize: 15,
  },
  highlight: {
    color: '#111827',
    fontWeight: '600',
  },
  efficacyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  efficacyLabel: {
    color: '#065F46',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    gap: 12,
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginTop: 8,
    marginRight: 12,
  },
  bulletWarning: {
    backgroundColor: '#F59E0B',
  },
  bulletImportant: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginTop: 8,
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
    color: '#4B5563',
    lineHeight: 24,
    fontSize: 15,
  },
  warningBox: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  warningTitle: {
    color: '#991B1B',
    fontWeight: '600',
    fontSize: 14,
  },
  noteBox: {
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  noteText: {
    color: '#78350F',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
