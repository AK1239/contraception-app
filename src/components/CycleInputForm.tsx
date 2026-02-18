import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CycleInputFormProps {
  onCyclesSubmit: (cycles: number[]) => void;
}

export default function CycleInputForm({ onCyclesSubmit }: CycleInputFormProps) {
  const [cycles, setCycles] = useState<string[]>(['', '', '', '', '', '']);
  const [additionalCycles, setAdditionalCycles] = useState<string[]>([]);

  const addCycleField = () => {
    setAdditionalCycles(prev => [...prev, '']);
  };

  const updateCycle = (index: number, value: string, isAdditional: boolean = false) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (isAdditional) {
      const newAdditional = [...additionalCycles];
      newAdditional[index] = numericValue;
      setAdditionalCycles(newAdditional);
    } else {
      const newCycles = [...cycles];
      newCycles[index] = numericValue;
      setCycles(newCycles);
    }
  };

  const validateAndSubmit = () => {
    const allCycles = [...cycles, ...additionalCycles].filter(cycle => cycle !== '');
    const cycleNumbers = allCycles.map(cycle => parseInt(cycle, 10));

    // Validation
    if (cycleNumbers.length < 6) {
      Alert.alert('Insufficient Data', 'Please enter at least 6 menstrual cycle durations.');
      return;
    }

    const invalidCycles = cycleNumbers.filter(cycle => cycle < 26 || cycle > 32);
    if (invalidCycles.length > 0) {
      Alert.alert(
        'Invalid Cycle Duration', 
        'All cycle durations must be between 26 and 32 days. Please check your entries.'
      );
      return;
    }

    onCyclesSubmit(cycleNumbers);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerIcon}>
          <Ionicons name="create-outline" size={32} color="#6D28D9" />
        </View>
        
        <Text style={styles.title}>Enter Your Cycle Data</Text>
        <Text style={styles.subtitle}>
          Enter the duration (in days) of your previous menstrual cycles
        </Text>
        
        <View style={styles.requiredCyclesContainer}>
          <View style={styles.labelContainer}>
            <Ionicons name="calendar" size={18} color="#6D28D9" />
            <Text style={styles.requiredLabel}>Required cycles</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Min. 6</Text>
            </View>
          </View>
          
          <View style={styles.cyclesGrid}>
            {cycles.map((cycle, index) => (
              <View key={index} style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, cycle && styles.inputFilled]}
                    value={cycle}
                    onChangeText={(value) => updateCycle(index, value)}
                    placeholder="--"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <Text style={styles.daysLabel}>days</Text>
                </View>
                <Text style={styles.asterisk}>*</Text>
              </View>
            ))}
          </View>
        </View>

        {additionalCycles.length > 0 && (
          <View style={styles.additionalCyclesContainer}>
            <View style={styles.labelContainer}>
              <Ionicons name="add-circle" size={18} color="#10B981" />
              <Text style={styles.additionalLabel}>Additional cycles</Text>
              <View style={[styles.badge, styles.optionalBadge]}>
                <Text style={styles.optionalBadgeText}>Optional</Text>
              </View>
            </View>
            
            <View style={styles.cyclesGrid}>
              {additionalCycles.map((cycle, index) => (
                <View key={`additional-${index}`} style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[styles.input, cycle && styles.inputFilled]}
                      value={cycle}
                      onChangeText={(value) => updateCycle(index, value, true)}
                      placeholder="--"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <Text style={styles.daysLabel}>days</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={addCycleField}
        >
          <Ionicons name="add-circle-outline" size={20} color="#6D28D9" />
          <Text style={styles.addButtonText}>Add More Cycles</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={validateAndSubmit}
        >
          <Text style={styles.submitButtonText}>Next: Select Date</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerIcon: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontWeight: 'bold',
  },
  requiredCyclesContainer: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  requiredLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  badge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6D28D9',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  additionalCyclesContainer: {
    marginBottom: 24,
  },
  additionalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  optionalBadge: {
    backgroundColor: '#D1FAE5',
  },
  optionalBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  cyclesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F9FAFB',
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1F2937',
  },
  inputFilled: {
    borderColor: '#6D28D9',
    backgroundColor: '#fff',
  },
  daysLabel: {
    position: 'absolute',
    bottom: 2,
    right: 8,
    fontSize: 9,
    color: '#9CA3AF',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  asterisk: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6D28D9',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#6D28D9',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
