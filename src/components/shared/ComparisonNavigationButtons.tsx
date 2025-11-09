import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

interface ComparisonNavigationButtonsProps {
  isFirstField: boolean;
  isLastField: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onBackToSelection: () => void;
}

export default function ComparisonNavigationButtons({
  isFirstField,
  isLastField,
  onPrevious,
  onNext,
  onBackToSelection,
}: ComparisonNavigationButtonsProps) {
  return (
    <Card style={styles.navigationCard}>
      <Card.Content>
        <View style={styles.buttonContainer}>
          {!isFirstField ? (
            <>
              <Button
                mode="outlined"
                onPress={onPrevious}
                style={styles.navButton}
                labelStyle={styles.navButtonLabel}
              >
                Previous
              </Button>
              <View style={styles.spacer} />
              {isLastField ? (
                <Button
                  mode="contained"
                  onPress={onBackToSelection}
                  style={[styles.navButton, styles.primaryButton]}
                  labelStyle={styles.navButtonLabel}
                >
                  Done
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={onNext}
                  style={[styles.navButton, styles.primaryButton]}
                  labelStyle={styles.navButtonLabel}
                >
                  Next
                </Button>
              )}
            </>
          ) : (
            isLastField ? (
              <Button
                mode="contained"
                onPress={onBackToSelection}
                style={[styles.navButton, styles.primaryButton, styles.navButtonFullWidth]}
                labelStyle={styles.navButtonLabel}
              >
                Back to Selection
              </Button>
            ) : (
              <>
                <View style={styles.spacer} />
                <Button
                  mode="contained"
                  onPress={onNext}
                  style={[styles.navButton, styles.primaryButton, styles.navButtonRightAligned]}
                  labelStyle={styles.navButtonLabel}
                >
                  Next
                </Button>
              </>
            )
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  navigationCard: {
    margin: 16,
    marginBottom: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  navButton: {
    flex: 1,
  },
  navButtonFullWidth: {
    flex: 0,
    alignSelf: 'stretch',
  },
  navButtonRightAligned: {
    flex: 0,
    minWidth: 100,
  },
  primaryButton: {
    backgroundColor: '#6D28D9',
  },
  navButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 4,
  },
  spacer: {
    flex: 1,
  },
});

