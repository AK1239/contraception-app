/**
 * Standard Days Method Section Navigator Component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ProgressBar } from 'react-native-paper';
import { SDMSectionKey } from '../../types/standardDayMethod';

interface StandardDaySectionNavigatorProps {
  currentSection: SDMSectionKey | null;
  progress: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  isFirstSection: boolean;
  isLastSection: boolean;
  canProceed: boolean;
}

export function StandardDaySectionNavigator({
  currentSection,
  progress,
  onPrevious,
  onNext,
  onComplete,
  isFirstSection,
  isLastSection,
  canProceed,
}: StandardDaySectionNavigatorProps) {
  const handleNext = () => {
    if (isLastSection && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  const getSectionLabel = (key: SDMSectionKey | null): string => {
    switch (key) {
      case 'eligibility-info':
        return 'Step 1: Eligibility Information';
      case 'cycle-lengths':
        return 'Step 2: Enter Cycle Lengths';
      case 'lmp-date':
        return 'Step 3: Last Menstrual Period';
      default:
        return 'Standard Days Method Calculator';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>{getSectionLabel(currentSection)}</Text>
        <ProgressBar progress={progress / 100} color="#059669" style={styles.progressBar} />
        <Text style={styles.progressPercentage}>{progress}% complete</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          mode="outlined"
          onPress={onPrevious}
          disabled={isFirstSection}
          style={[styles.button, styles.buttonPrevious]}
          labelStyle={styles.buttonLabel}
        >
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={handleNext}
          disabled={!canProceed}
          style={[styles.button, styles.buttonNext]}
          labelStyle={styles.buttonLabel}
          buttonColor="#059669"
        >
          {isLastSection ? 'See Results' : 'Next'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  progressPercentage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
  },
  buttonPrevious: {
    borderColor: '#D1D5DB',
  },
  buttonNext: {
    // backgroundColor set via buttonColor prop
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
