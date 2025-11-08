import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import ExpandableSection from '../../src/components/ExpandableSection';

export default function CopperIUCDDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔧</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            Copper IUCD
          </Text>
          <Text variant="titleSmall" style={styles.subtitle}>
            Intrauterine Copper Device
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            A small T-shaped device made of plastic and wrapped in copper
          </Text>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <ExpandableSection title="Description" icon="📝">
            <Text variant="bodyMedium" style={styles.sectionText}>
              A small T-shaped device made of plastic and wrapped in copper that will be placed inside the 
              uterus by a healthcare provider. Copper prevents pregnancy by stopping the sperms from 
              swimming and combining with the egg, but even if the egg has combined by chance, then copper 
              will also prevent it from growing further.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Efficacy" icon="📊">
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>Perfect</Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              Almost none of the women will become pregnant when inserted with Copper IUCD.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Advantages" icon="✅">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  The effect lasts longer (from 5 to 12 years depending on the model)
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Easily reversible (fertility resumes immediately after removal of copper IUCD)
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Can be inserted immediately after delivery
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="Disadvantages" icon="⚠️">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Risk of injuring uterus at time of insertion
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  If a pregnancy does occur it is more likely to be ectopic (the fetus grows in a place 
                  apart from the uterus)
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Periods may become heavier, longer, and more crampy
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Cannot be used in people allergic to copper
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={styles.sectionText}>
              A healthcare provider will insert this small device into the uterus through the vagina.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Time of Onset of Action" icon="⏰">
            <Text variant="bodyMedium" style={styles.sectionText}>
              Works immediately if inserted within <Text style={styles.highlight}>5 days of the start of your menstrual period</Text>. If inserted at 
              other times in the cycle, backup contraception (e.g., condoms) is recommended for 7 days.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Side Notes" icon="📌">
            <View style={styles.noteBox}>
              <Text variant="bodyMedium" style={styles.noteText}>
                The IUCD can stay for 5 to 12 years however if you want to get it removed, you can do so 
                anytime you want.
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
    backgroundColor: '#D1FAE5',
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
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  noteText: {
    color: '#78350F',
    lineHeight: 20,
  },
});

