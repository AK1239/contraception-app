import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import ExpandableSection from '../../src/components/ExpandableSection';

export default function StandardDaysMethodDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📅</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            Standard Days Method
          </Text>
          <Text variant="titleSmall" style={styles.subtitle}>
            Natural Family Planning
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            A natural contraceptive method based on menstrual cycle tracking
          </Text>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <ExpandableSection title="Description" icon="📝">
            <Text variant="bodyMedium" style={styles.sectionText}>
              To understand the standard day method, you need to understand the menstrual cycle. The ovaries 
              in your body are responsible for producing eggs that can be potentially fertilized by sperm. The 
              egg is released once a month, The method predicts when the egg is out and that you should avoid 
              sexual intercourse during the days when the egg is potentially out.
            </Text>
            <View style={{ height: 20 }} />
            <Text variant="bodyMedium" style={styles.sectionText}>
              Once the egg is out, it can survive for up to <Text style={styles.highlight}>24 hours</Text> and the sperms can fertilize the eggs for up 
              to <Text style={styles.highlight}>3 days</Text>. Since the menstrual cycle is different for every woman, the days when the egg is out 
              may also vary. Hence why there is a calculator to determine the fertile window (days when the egg 
              is possibly out and when the sperms can fertilize the egg).
            </Text>
            <View style={{ height: 20 }} />
            <Text variant="bodyMedium" style={styles.sectionText}>
              The fertile window calculator can be found in the sidebar.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Efficacy" icon="📊">
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>Good</Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              If perfectly used, the chance of pregnancy is <Text style={styles.highlight}>5%</Text>, meaning that 95 out of 100 women will not 
              become pregnant if this method is used perfectly.
            </Text>
            <View style={{ height: 20 }} />
            <Text variant="bodyMedium" style={styles.sectionText}>
              With typical use, the chance of pregnancy is <Text style={styles.highlight}>25%</Text>, meaning that 75 out of 100 women will not 
              become pregnant if this method is used.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Advantages" icon="✅">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  No side/adverse effects
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  No cost
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  May be the only method acceptable to couples for cultural or religious reasons
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="Disadvantages" icon="⚠️">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  There is a significant chance of pregnancy
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Will not work if you have irregular menstrual cycles
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={styles.sectionText}>
              Keep track of your menstrual cycle and the days where fertility is likely using a calendar.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Time to Work" icon="⏰">
            <Text variant="bodyMedium" style={styles.sectionText}>
              Immediate
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Conditions Required" icon="🔒">
            <View style={styles.warningBox}>
              <Text variant="bodyMedium" style={styles.warningTitle}>
                Conditions required to be effective:
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              Requires you to have regular menstrual cycles (cycle variation should not be more than <Text style={styles.highlight}>7 days</Text>). If 
              your recent cycle took 28 days, the next one should occur not less than 21 days and no more than 35 days.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Additional Methods" icon="🔬">
            <Text variant="bodyMedium" style={styles.sectionText}>
              As the fertile window is 100% difficult to predict. You can use the below additional methods to 
              increases the chances of finding the fertile period:
            </Text>
            <View style={{ height: 12 }} />
            <View style={styles.subsectionContainer}>
              <Text variant="titleSmall" style={styles.subsectionTitle}>
                A. The Cervical Mucus Method
              </Text>
              <Text variant="bodyMedium" style={styles.sectionText}>
                The cervix is door of the womb. It normally produces mucus to lubricate the vagina. The mucus 
                thickness is maximum when the egg is out hence Intercourse is allowed <Text style={styles.highlight}>4 days after the maximal 
                cervical mucus</Text> until menstruation as within this period the egg is probably dead.
              </Text>
            </View>
            <View style={{ height: 12 }} />

            <View style={styles.subsectionContainer}>
              <Text variant="titleSmall" style={styles.subsectionTitle}>
                B. The Symptothermal Method
              </Text>
              <Text variant="bodyMedium" style={styles.sectionText}>
                When the egg is out, the body temperature also rises. Temperature rise typically ranges between 
                <Text style={styles.highlight}>0.2 and 0.5°C</Text>. Intercourse may be safe <Text style={styles.highlight}>three days after the temperature elevation begins</Text> until the next period.
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
    backgroundColor: '#F0FDF4',
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
  subsectionContainer: {
    marginTop: 16,
    paddingLeft: 8,
  },
  subsectionTitle: {
    color: '#111827',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
});
