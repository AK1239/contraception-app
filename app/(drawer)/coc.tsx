import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import ExpandableSection from '../../src/components/ExpandableSection';

export default function COCDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💊</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            Combined Oral Contraceptives
          </Text>
          <Text variant="titleSmall" style={styles.subtitle}>
            COC
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            Pills containing both estrogen and progesterone hormones
          </Text>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          <ExpandableSection title="Description" icon="📝">
            <Text variant="bodyMedium" style={styles.sectionText}>
              As the name suggests, these are combined oral contraceptives (COCs) meaning that these are 
              pills containing both estrogen and progesterone hormone.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Efficacy" icon="📊">
            <View style={styles.efficacyBadge}>
              <Text style={styles.efficacyLabel}>Excellent</Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              With typical use; <Text style={styles.highlight}>93% (93 in 100 women) will not become pregnant</Text> while using COC. 
              With perfect use (daily adherence) almost no women will become pregnant while being on COC.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Advantages" icon="✅">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Regular and predictable menses
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Reduced occurrence of mittelschmerz (lower abdomen pain that occurs mid cycle)
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Increased iron stores for women with heavy menstrual bleeding
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Reduced chances of developing an ovarian cyst, ovarian cancer and uterus cancer
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={styles.bullet} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Good cosmetic effects (reduced acne and facial hair)
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="Disadvantages" icon="⚠️">
            <View style={styles.listContainer}>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Estrogen related side effects (nausea, headache, breast tenderness) and complications (breast 
                  cancer, gallstones, clot formation in blood vessels)
                </Text>
              </View>
              <View style={styles.listItemRow}>
                <View style={[styles.bullet, styles.bulletWarning]} />
                <Text variant="bodyMedium" style={styles.listItemText}>
                  Need to take pill daily
                </Text>
              </View>
            </View>
          </ExpandableSection>

          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={styles.sectionText}>
              You need to go to clinic every month to collect your 1-month pills. You get a total of 28 pills. <Text style={styles.highlight}>21 
              of those have contraceptive hormones and 7 of them are iron supplements</Text>. You need to first 
              complete the 21 pills, taking once daily for 21 days. Then on day 22 to day 28, you need to take 
              only the iron supplements to allow your period to occur. Then on day 29 a new cycle will start; 
              you'll take the hormonal pills again for 21 days and finish up with the iron supplements. This 
              cycle repeats.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Time to Work" icon="⏰">
            <Text variant="bodyMedium" style={styles.sectionText}>
              If started within first 5 days of menstrual cycle (bleeding days) then the pills will start working 
              immediately. If started after the first five days of menstrual cycle, then use backup contraception 
              e.g. condom or abstain from sex for 7 days whilst you're continuing to take pills.
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Side Notes" icon="📌">
            <Text variant="bodyMedium" style={styles.sectionText}>
              If you miss 1 pill, take the pill as soon as you remember and follow it with the regularly 
              scheduled pill. If you have missed 2 or more consecutive pills, then use a backup contraception 
              method of contraception for 7 days. If you have missed your pills between day 21 and 28. Then 
              no need stress on it, as pills within this time are iron supplements, however if you miss a 
              hormonal pill then you've to follow the above steps.
            </Text>
            <Text variant="bodyMedium" style={[styles.sectionText, styles.marginTop]}>
              After stopping the pills, fertility usually returns in 1 month but can take up to 3 months.
            </Text>
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
});

