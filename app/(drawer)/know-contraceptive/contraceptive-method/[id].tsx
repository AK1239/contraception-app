import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import ExpandableSection from '../../../../src/components/ExpandableSection';
import { getContraceptiveMethodById } from '../../../../src/utils/contraceptiveMethodsData';
import MethodHeader from '../../../../src/components/shared/MethodHeader';
import EfficacySection from '../../../../src/components/shared/EfficacySection';
import ListSection from '../../../../src/components/shared/ListSection';
import MethodImageSection from '../../../../src/components/shared/MethodImageSection';
import WarningBox from '../../../../src/components/shared/WarningBox';

export default function ContraceptiveMethodDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Get method data by ID
  const method = id ? getContraceptiveMethodById(id) : undefined;

  // If method not found, show error
  if (!method) {
    return (
      // <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="headlineMedium" style={styles.errorTitle}>
            Method Not Found
          </Text>
          <Text variant="bodyMedium" style={styles.errorText}>
            The contraceptive method you're looking for doesn't exist.
          </Text>
        </View>
      // </SafeAreaView>
    );
  }

  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <MethodHeader
          icon={method.icon}
          name={method.name}
          shortName={method.shortName}
          description={method.description}
          category={method.category}
        />

        <View style={styles.sectionsContainer}>
          <ExpandableSection title="Description" icon="📝">
            {method.image && <MethodImageSection image={method.image} variant="description" />}
            <Text variant="bodyMedium" style={[styles.sectionText, method.image && styles.textAfterImage]}>
              {method.description}
            </Text>
          </ExpandableSection>

          <ExpandableSection title="Efficacy" icon="📊">
            <EfficacySection efficacy={method.efficacy} />
          </ExpandableSection>

          <ExpandableSection title="Advantages" icon="✅">
            <ListSection items={method.advantages} />
          </ExpandableSection>

          <ExpandableSection title="Disadvantages" icon="⚠️">
            <ListSection items={method.disadvantages} variant="warning" />
          </ExpandableSection>

          <ExpandableSection title="How to Use" icon="📋">
            <Text variant="bodyMedium" style={[styles.sectionText, method.howToUseImage && styles.textBeforeImage]}>
              {method.howToUse}
            </Text>
            {method.howToUseImage && <MethodImageSection image={method.howToUseImage} variant="howToUse" />}
          </ExpandableSection>

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

          {method.conditionsRequired && method.conditionsRequired.length > 0 && (
            <ExpandableSection title="Conditions Required" icon="📋">
              <ListSection items={method.conditionsRequired} />
            </ExpandableSection>
          )}

          {method.sideNotes && method.sideNotes !== 'None' && (
            <ExpandableSection title="Side Notes" icon="📌">
              <WarningBox message={method.sideNotes} variant="note" />
            </ExpandableSection>
          )}

          {method.commonErrors && method.commonErrors.length > 0 && (
            <ExpandableSection title="Common Errors" icon="❌">
              <ListSection items={method.commonErrors} variant="warning" />
              {method.additionalInfo?.warning && (
                <WarningBox message={method.additionalInfo.warning} />
              )}
            </ExpandableSection>
          )}

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
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    paddingVertical: 20,
  },
  sectionsContainer: {
    paddingBottom: 24,
  },
  sectionText: {
    color: '#4B5563',
    lineHeight: 24,
    fontSize: 15,
  },
  textAfterImage: {
    marginTop: 5,
  },
  textBeforeImage: {
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 12,
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
});

