import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import ExpandableSection from '../../../src/components/ExpandableSection';
import { getContraceptiveMethodById } from '../../../src/utils/contraceptiveMethodsData';

export default function ContraceptiveMethodDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Get method data by ID
  const method = id ? getContraceptiveMethodById(id) : undefined;

  // If method not found, show error
  if (!method) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="headlineMedium" style={styles.errorTitle}>
            Method Not Found
          </Text>
          <Text variant="bodyMedium" style={styles.errorText}>
            The contraceptive method you're looking for doesn't exist.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Get category-based background color for icon container
  const getCategoryIconBackground = (category: string) => {
    switch (category) {
      case 'hormonal':
        return '#DBEAFE';
      case 'non-hormonal':
        return '#D1FAE5';
      case 'permanent':
        return '#FEE2E2';
      case 'barrier':
        return '#FEE2E2';
      case 'natural':
        return '#FEF3C7';
      default:
        return '#E5E7EB';
    }
  };

  // Get efficacy badge background color
  const getEfficacyBadgeColor = (label: string) => {
    switch (label) {
      case 'Perfect':
        return '#D1FAE5';
      case 'Excellent':
        return '#D1FAE5';
      case 'Good':
        return '#DBEAFE';
      default:
        return '#F3F4F6';
    }
  };

  // Get efficacy badge text color
  const getEfficacyTextColor = (label: string) => {
    switch (label) {
      case 'Perfect':
        return '#065F46';
      case 'Excellent':
        return '#065F46';
      case 'Good':
        return '#1E40AF';
      default:
        return '#374151';
    }
  };

  // Helper to extract highlighted numbers from text (like "13%" or "2%")
  const renderEfficacyText = (text: string) => {
    // Match patterns like "13%", "2%", "93%", etc.
    const parts = text.split(/(\d+%)/g);
    return (
      <Text>
        {parts.map((part, index) => {
          if (/\d+%/.test(part)) {
            return (
              <Text key={index} style={styles.highlight}>
                {part}
              </Text>
            );
          }
          return <Text key={index}>{part}</Text>;
        })}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={[styles.iconContainer, { backgroundColor: getCategoryIconBackground(method.category) }]}>
            <Text style={styles.icon}>{method.icon}</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>
            {method.name}
          </Text>
          {method.shortName && (
            <Text variant="titleSmall" style={styles.subtitle}>
              {method.shortName}
            </Text>
          )}
          <Text variant="bodyMedium" style={styles.description}>
            {method.description.includes('.') ? method.description.split('.')[0] + '.' : method.description}
          </Text>
        </View>

        {/* Expandable Sections */}
        <View style={styles.sectionsContainer}>
          {/* Description */}
          <ExpandableSection title="Description" icon="📝">
            {method.image && (
              <View style={styles.imageContainer}>
                <Image 
                  source={method.image} 
                  style={styles.descriptionImage}
                  resizeMode="contain"
                />
              </View>
            )}
            <Text variant="bodyMedium" style={styles.sectionText}>
              {method.description}
            </Text>
          </ExpandableSection>

          {/* Efficacy */}
          <ExpandableSection title="Efficacy" icon="📊">
            <View style={[styles.efficacyBadge, { backgroundColor: getEfficacyBadgeColor(method.efficacy.label) }]}>
              <Text style={[styles.efficacyLabel, { color: getEfficacyTextColor(method.efficacy.label) }]}>
                {method.efficacy.label}
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.sectionText}>
              {renderEfficacyText(method.efficacy.typicalUse)}
            </Text>
            {method.efficacy.perfectUse && (
              <Text variant="bodyMedium" style={[styles.sectionText, styles.marginTop]}>
                {renderEfficacyText(method.efficacy.perfectUse)}
              </Text>
            )}
          </ExpandableSection>

          {/* Advantages */}
          <ExpandableSection title="Advantages" icon="✅">
            <View style={styles.listContainer}>
              {method.advantages.map((advantage, index) => (
                <View key={index} style={styles.listItemRow}>
                  <View style={styles.bullet} />
                  <Text variant="bodyMedium" style={styles.listItemText}>
                    {advantage}
                  </Text>
                </View>
              ))}
            </View>
          </ExpandableSection>

          {/* Disadvantages */}
          <ExpandableSection title="Disadvantages" icon="⚠️">
            <View style={styles.listContainer}>
              {method.disadvantages.map((disadvantage, index) => (
                <View key={index} style={styles.listItemRow}>
                  <View style={[styles.bullet, styles.bulletWarning]} />
                  <Text variant="bodyMedium" style={styles.listItemText}>
                    {disadvantage}
                  </Text>
                </View>
              ))}
            </View>
          </ExpandableSection>

          {/* How to Use */}
          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={styles.sectionText}>
              {method.howToUse}
            </Text>
            {method.howToUseImage && (
              <View style={styles.imageContainer}>
                <Image 
                  source={method.howToUseImage} 
                  style={styles.howToUseImage}
                  resizeMode="contain"
                />
              </View>
            )}
          </ExpandableSection>

          {/* Time to Work / Time of Onset */}
          {method.additionalInfo?.timeOfOnset ? (
            <ExpandableSection title="Time of Onset of Action" icon="⏰">
              <Text variant="bodyMedium" style={styles.sectionText}>
                {method.additionalInfo.timeOfOnset}
              </Text>
            </ExpandableSection>
          ) : (
            <ExpandableSection title="Time to Work" icon="⏰">
              <Text variant="bodyMedium" style={styles.sectionText}>
                {method.timeToWork}
              </Text>
            </ExpandableSection>
          )}

          {/* Conditions Required */}
          {method.conditionsRequired && method.conditionsRequired.length > 0 && (
            <ExpandableSection title="Conditions Required" icon="📋">
              <View style={styles.listContainer}>
                {method.conditionsRequired.map((condition, index) => (
                  <View key={index} style={styles.listItemRow}>
                    <View style={styles.bullet} />
                    <Text variant="bodyMedium" style={styles.listItemText}>
                      {condition}
                    </Text>
                  </View>
                ))}
              </View>
            </ExpandableSection>
          )}

          {/* Side Notes */}
          {method.sideNotes && method.sideNotes !== 'None' && (
            <ExpandableSection title="Side Notes" icon="📌">
              <View style={styles.noteBox}>
                <Text variant="bodyMedium" style={styles.noteText}>
                  {method.sideNotes}
                </Text>
              </View>
            </ExpandableSection>
          )}

          {/* Common Errors */}
          {method.commonErrors && method.commonErrors.length > 0 && (
            <ExpandableSection title="Common Errors" icon="❌">
              <View style={styles.listContainer}>
                {method.commonErrors.map((error, index) => (
                  <View key={index} style={styles.listItemRow}>
                    <View style={[styles.bullet, styles.bulletWarning]} />
                    <Text variant="bodyMedium" style={styles.listItemText}>
                      {error}
                    </Text>
                  </View>
                ))}
              </View>
              {method.additionalInfo?.warning && (
                <View style={styles.warningBox}>
                  <Text variant="bodySmall" style={styles.warningText}>
                    {method.additionalInfo.warning}
                  </Text>
                </View>
              )}
            </ExpandableSection>
          )}

          {/* Additional Methods (for Calendar Method) */}
          {method.additionalInfo?.additionalMethods && method.additionalInfo.additionalMethods.length > 0 && (
            <ExpandableSection title="Additional Methods" icon="📚">
              {method.additionalInfo.additionalMethods.map((additionalMethod, index) => (
                <View key={index} style={styles.additionalMethodContainer}>
                  <Text variant="titleMedium" style={styles.additionalMethodTitle}>
                    {additionalMethod.title}
                  </Text>
                  <Text variant="bodyMedium" style={[styles.sectionText, styles.marginTop]}>
                    {additionalMethod.description}
                  </Text>
                </View>
              ))}
            </ExpandableSection>
          )}
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  efficacyLabel: {
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
    marginTop: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  warningText: {
    color: '#991B1B',
    lineHeight: 20,
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
  additionalMethodContainer: {
    marginBottom: 20,
  },
  additionalMethodTitle: {
    color: '#111827',
    fontWeight: '600',
    marginBottom: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    color: '#111827',
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 16,
    marginTop: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  descriptionImage: {
    width: '100%',
    maxWidth: 320,
    minHeight: 150,
    maxHeight: 250,
    borderRadius: 8,
  },
  howToUseImage: {
    width: '100%',
    maxWidth: 320,
    minHeight: 200,
    maxHeight: 300,
    borderRadius: 8,
    marginTop: 12,
  },
});

