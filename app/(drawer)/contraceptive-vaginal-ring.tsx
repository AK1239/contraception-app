import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import ExpandableSection from '../../src/components/ExpandableSection';

export default function ContraceptiveVaginalRingDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💍</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            Contraceptive Vaginal Ring
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            A small, flexible plastic ring inserted into the vagina once a month
          </Text>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <ExpandableSection title="Description" icon="📝">
            <Text variant="bodyMedium" style={styles.sectionText}>
              The contraceptive vaginal ring is a small, soft, flexible plastic ring (about 5–6 cm wide) that a 
              woman puts inside her vagina once a month. The ring slowly releases two hormones (estrogen 
              and progestin) which prevent pregnancy from occurring.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Efficacy" icon="📊">
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>Excellent</Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              With typical use; <Text style={styles.highlight}>91% (91 in 100 women) will not become pregnant</Text> while using contraceptive 
              vaginal ring.
            </Text>
            <Text variant="bodyMedium" style={[styles.sectionText, styles.marginTop]}>
              With perfect use almost no women will become pregnant while using contraceptive vaginal ring.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Advantages" icon="✅">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Works are relatively longer than pills so no need to change every day
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Can be used in a person with regular nausea/malabsorption diseases
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Less breast tenderness, and mood swings compared with some oral contraceptives
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="Disadvantages" icon="⚠️">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Can cause vaginal irritation or discharge
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Can slip accidentally
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={styles.sectionText}>
              Insert the hormonal ring into vagina and leave it in place for the first 3 weeks, then remove the 
              ring for 1 week. <Text style={styles.highlight}>New ring applied in week 5</Text>.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Time to Work" icon="⏰">
            <Text variant="bodyMedium" style={styles.sectionText}>
              If started within first 5 days of menstrual cycle (bleeding days) then the ring will start working 
              immediately. If started after the first five days of menstrual cycle, then use backup contraception 
              e.g. condom or abstain from sex for 7 days whilst you're continuing to use ring patch.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Side Notes" icon="📌">
            <View style={styles.noteBox}>
              <Text variant="bodyMedium" style={styles.noteText}>
                If the ring falls out, rinse with cool/warm water and reinsert.
              </Text>
            </View>
            <View style={styles.warningBox}>
              <Text variant="bodySmall" style={styles.warningText}>
                If ring is off for more than 3 hours, then use a backup contraception method of contraception for 
                7 days while still using the ring.
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
    backgroundColor: '#DBEAFE',
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
    marginBottom: 8,
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
  marginTop: {
    marginTop: 12,
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
  listItemText: {
    flex: 1,
    color: '#4B5563',
    lineHeight: 24,
    fontSize: 15,
  },
  noteBox: {
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  noteText: {
    color: '#78350F',
    lineHeight: 20,
  },
  warningBox: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  warningText: {
    color: '#991B1B',
    lineHeight: 20,
  },
});

