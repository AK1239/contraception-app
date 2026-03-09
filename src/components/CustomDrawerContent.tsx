import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useIsHealthcareProvider } from '../hooks/useUserRole';

interface DrawerSubsection {
  id: string;
  labelKey: string;
  route: string;
}

interface DrawerSection {
  id: string;
  labelKey: string;
  icon: string;
  hasSubsections?: boolean;
  subsections?: DrawerSubsection[];
  route?: string;
  /** For public users: show as single item linking here instead of subsections */
  publicRoute?: string;
}

const drawerSections: DrawerSection[] = [
  {
    id: 'home',
    labelKey: 'nav.home',
    icon: 'home-outline',
    route: '/(drawer)',
  },
  {
    id: 'choose-contraceptive',
    labelKey: 'nav.whoMecScreen',
    icon: 'checkmark-circle-outline',
    route: '/(drawer)/choose-contraceptive',
  },
  {
    id: 'know-contraceptive',
    labelKey: 'nav.knowYourContraceptive',
    icon: 'information-circle-outline',
    hasSubsections: true,
    subsections: [
      {
        id: 'natural-methods',
        labelKey: 'nav.naturalMethods',
        route: '/(drawer)/know-contraceptive/natural-methods',
      },
      {
        id: 'modern-methods',
        labelKey: 'nav.modernMethods',
        route: '/(drawer)/know-contraceptive/modern-methods',
      },
      {
        id: 'emergency-methods',
        labelKey: 'nav.emergencyContraception',
        route: '/(drawer)/know-contraceptive/emergency-methods',
      },
    ],
  },
  {
    id: 'personalize',
    labelKey: 'nav.personalizeYourContraceptive',
    icon: 'heart-outline',
    route: '/(drawer)/personalize',
  },
  {
    id: 'compare-methods',
    labelKey: 'nav.compareMethods',
    icon: 'git-compare-outline',
    route: '/(drawer)/compare-methods',
  },
  {
    id: 'natural-method-calculators',
    labelKey: 'nav.naturalMethodCalculators',
    icon: 'calculator-outline',
    hasSubsections: true,
    subsections: [
      {
        id: 'standard-day-calculator',
        labelKey: 'nav.standardDayCalculator',
        route: '/(drawer)/standard-day-calculator-page',
      },
      {
        id: 'calendar-method-calculator',
        labelKey: 'nav.calendarMethodCalculator',
        route: '/(drawer)/calendar-method-calculator',
      },
    ],
  },
  {
    id: 'emergency-contraception',
    labelKey: 'nav.emergencyContraception',
    icon: 'medical-outline',
    hasSubsections: true,
    subsections: [
      {
        id: 'ec-description',
        labelKey: 'nav.ecDescription',
        route: '/(drawer)/know-contraceptive/emergency-methods',
      },
      {
        id: 'ec-eligibility',
        labelKey: 'nav.ecEligibility',
        route: '/(drawer)/ecp-safety',
      },
    ],
    publicRoute: '/(drawer)/emergency-contraception',
  },
  {
    id: 'natural-method-eligibility',
    labelKey: 'nav.naturalMethodEligibility',
    icon: 'leaf-outline',
    route: '/(drawer)/fab-eligibility',
  },
  {
    id: 'sterilization-eligibility',
    labelKey: 'nav.sterilizationEligibility',
    icon: 'medical-outline',
    hasSubsections: true,
    subsections: [
      {
        id: 'female-sterilization',
        labelKey: 'nav.femaleSterilization',
        route: '/(drawer)/female-sterilization-eligibility',
      },
      {
        id: 'male-sterilization',
        labelKey: 'nav.maleSterilization',
        route: '/(drawer)/male-sterilization-eligibility',
      },
    ],
  },
];

/** Section IDs hidden for general public */
const GENERAL_PUBLIC_HIDDEN_IDS = [
  'choose-contraceptive',
  'natural-method-eligibility',
  'sterilization-eligibility',
];

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { t } = useTranslation();
  const isHealthcareProvider = useIsHealthcareProvider();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const visibleSections = useMemo(() => {
    if (isHealthcareProvider) return drawerSections;
    return drawerSections.filter(
      (s) => !GENERAL_PUBLIC_HIDDEN_IDS.includes(s.id)
    );
  }, [isHealthcareProvider]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleNavigation = (route: string) => {
    router.push(route);
    props.navigation.closeDrawer();
  };

  const renderSection = (section: DrawerSection) => {
    const isExpanded = expandedSections.includes(section.id);
    const isPublicSingleItem = !isHealthcareProvider && section.publicRoute;

    return (
      <View key={section.id} style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => {
            if (isPublicSingleItem && section.publicRoute) {
              handleNavigation(section.publicRoute);
            } else if (section.hasSubsections) {
              toggleSection(section.id);
            } else if (section.route) {
              handleNavigation(section.route);
            }
          }}
        >
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name={section.icon as any}
              size={20}
              color="#6D28D9"
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>{t(section.labelKey)}</Text>
          </View>
          {section.hasSubsections && !isPublicSingleItem && (
            <Ionicons
              name={isExpanded ? 'chevron-down' : 'chevron-forward'}
              size={20}
              color="#666"
            />
          )}
        </TouchableOpacity>

        {section.hasSubsections && !isPublicSingleItem && isExpanded && (
          <View style={styles.subsectionsContainer}>
            {section.subsections?.map((subsection) => (
              <TouchableOpacity
                key={subsection.id}
                style={styles.subsectionItem}
                onPress={() => handleNavigation(subsection.route)}
              >
                <View style={styles.subsectionContent}>
                  <Text style={styles.subsectionBullet}>●</Text>
                  <Text style={styles.subsectionText}>{t(subsection.labelKey)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('common.appName')}</Text>
      </View>

      <View style={styles.sectionsContainer}>
        {visibleSections.map(renderSection)}
      </View>

      {/* ── Settings pinned at the bottom ───────────────────────────── */}
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => handleNavigation('/(drawer)/settings')}
        >
          <Ionicons name="settings-outline" size={20} color="#6D28D9" style={styles.sectionIcon} />
          <Text style={styles.settingsLabel}>{t('nav.settings')}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6D28D9',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  sectionsContainer: {
    paddingTop: 20,
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 10,
    borderRadius: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    flex: 1,
  },
  subsectionsContainer: {
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    marginTop: 4,
    borderRadius: 8,
    paddingVertical: 8,
  },
  subsectionItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingLeft: 40,
  },
  subsectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subsectionBullet: {
    fontSize: 16,
    color: '#6D28D9',
    marginRight: 12,
    fontWeight: 'bold',
  },
  subsectionText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'PlusJakartaSans_400Regular',
    flex: 1,
  },
  // ── Footer / Settings ─────────────────────────────────────────────────────
  footer: {
    paddingBottom: 20,
    paddingTop: 8,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    marginBottom: 8,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 10,
    borderRadius: 8,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});
