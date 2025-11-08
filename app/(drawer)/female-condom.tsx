import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import ExpandableSection from '../../src/components/ExpandableSection';

export default function FemaleCondomDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🛡️</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            Female Condom
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            A barrier method worn by the female during each coital act
          </Text>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <ExpandableSection title="Description" icon="📝">
            <Text variant="bodyMedium" style={styles.sectionText}>
              To be worn by the female during each coital act.
            </Text>
            <Text variant="bodyMedium" style={[styles.sectionText, styles.marginTop]}>
              Contains 2 flexible rings; 1 closed for insertion and the other open.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Efficacy" icon="📊">
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>Good</Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              With typical use the chance of pregnancy is <Text style={styles.highlight}>21%</Text>. Meaning that out of 100 women who use this 
              method normally, there is a chance that 21 of them will become pregnant.
            </Text>
            <Text variant="bodyMedium" style={[styles.sectionText, styles.marginTop]}>
              With perfect use the chance of pregnancy is <Text style={styles.highlight}>5%</Text>. Meaning that out of 100 women who use this 
              method perfectly, there is a chance that 5 of them will become pregnant.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Advantages" icon="✅">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Does not deteriorate with oil-based lubricants
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Provides some protection to the labia and the base of the penis during intercourse
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="Disadvantages" icon="⚠️">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Difficult placement
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Inner ring can cause discomfort
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  If placed for a long duration it can result in a urinary tract infection (UTI)
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={styles.sectionText}>
              First check the expiry date and package, then carefully open it. Squeeze the inner ring at the closed 
              end, insert it into the vagina like a tampon, and push it up until the ring rests behind the pubic bone 
              while the outer ring stays outside covering the vulva. Guide the penis into the condom during sex 
              to prevent it slipping to the side. After intercourse, twist the outer ring to keep semen inside and 
              gently pull it out before standing up. Dispose of it in the trash—never flush or reuse. Female 
              condoms can be inserted just before or even several hours before sex.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Time to Work" icon="⏰">
            <Text variant="bodyMedium" style={styles.sectionText}>
              Immediate
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Side Notes" icon="📌">
            <View style={styles.noteBox}>
              <Text variant="bodyMedium" style={styles.noteText}>
                Simultaneous use of both the female and male condom is NOT recommended because either of 
                them can slip out during sexual intercourse.
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
    backgroundColor: '#FEE2E2',
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
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  efficacyLabel: {
    color: '#1E40AF',
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

