import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface DrawerSection {
  id: string;
  title: string;
  icon: string;
  hasSubsections?: boolean;
  subsections?: DrawerSubsection[];
  route?: string;
}

interface DrawerSubsection {
  id: string;
  title: string;
  route: string;
}

const drawerSections: DrawerSection[] = [
  {
    id: 'home',
    title: 'Home',
    icon: 'home-outline',
    route: '/',
  },
  {
    id: 'know-contraceptive',
    title: 'Know Your Contraceptive',
    icon: 'information-circle-outline',
    hasSubsections: true,
    subsections: [
      {
        id: 'natural-methods',
        title: 'Natural Methods',
        route: '/natural-methods',
      },
      {
        id: 'modern-methods',
        title: 'Modern Methods',
        route: '/modern-methods',
      },
    ],
  },
  {
    id: 'choose-contraceptive',
    title: 'Choose Your Contraceptive',
    icon: 'checkmark-circle-outline',
    hasSubsections: true,
    subsections: [
      {
        id: 'medical-safety',
        title: 'Medical Safety',
        route: '/medical-safety',
      },
      {
        id: 'personalize',
        title: 'Personalize Your Contraceptive Choice',
        route: '/personalize',
      },
    ],
  },
  {
    id: 'compare-methods',
    title: 'Compare Contraceptive Methods',
    icon: 'git-compare-outline',
    route: '/compare-methods',
  },
  {
    id: 'standard-day-calculator',
    title: 'Natural Calendar Method Calculator',
    icon: 'calculator-outline',
    route: '/standard-day-calculator',
  },
];

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

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
    
    return (
      <View key={section.id} style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => {
            if (section.hasSubsections) {
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
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          {section.hasSubsections && (
            <Ionicons
              name={isExpanded ? 'chevron-down' : 'chevron-forward'}
              size={20}
              color="#666"
            />
          )}
        </TouchableOpacity>
        
        {section.hasSubsections && isExpanded && (
          <View style={styles.subsectionsContainer}>
            {section.subsections?.map((subsection) => (
              <TouchableOpacity
                key={subsection.id}
                style={styles.subsectionItem}
                onPress={() => handleNavigation(subsection.route)}
              >
                <Text style={styles.subsectionText}>● {subsection.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ContraSafe</Text>
      </View>
      
      <View style={styles.sectionsContainer}>
        {drawerSections.map(renderSection)}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop:20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6D28D9',
    fontFamily: 'Poppins_700Bold',
  },
  sectionsContainer: {
    paddingTop: 20,
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
    fontFamily: 'Poppins_600SemiBold',
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
  subsectionText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
});
