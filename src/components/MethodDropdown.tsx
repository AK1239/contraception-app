import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { ALL_COMPARISON_METHODS } from '../constants/contraceptiveMethods';

interface MethodDropdownProps {
  label: string;
  selectedMethodKey: string | null;
  onSelect: (methodKey: string) => void;
  excludeMethodKey?: string | null;
}

export default function MethodDropdown({
  label,
  selectedMethodKey,
  onSelect,
  excludeMethodKey,
}: MethodDropdownProps) {
  const [visible, setVisible] = useState(false);
  
  const availableMethods = ALL_COMPARISON_METHODS.filter(
    method => method.key !== excludeMethodKey
  );
  
  const selectedMethod = ALL_COMPARISON_METHODS.find(m => m.key === selectedMethodKey);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hormonal':
        return '#e3f2fd';
      case 'non-hormonal':
        return '#e8f5e8';
      case 'permanent':
        return '#fff3e0';
      case 'barrier':
        return '#f3e5f5';
      case 'natural':
        return '#fce4ec';
      default:
        return '#f5f5f5';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hormonal':
        return '💊';
      case 'non-hormonal':
        return '🔗';
      case 'permanent':
        return '✂️';
      case 'barrier':
        return '🛡️';
      case 'natural':
        return '🌿';
      default:
        return '📋';
    }
  };

  const handleSelect = (methodKey: string) => {
    onSelect(methodKey);
    setVisible(false);
  };

  const renderMethodItem = ({ item }: { item: typeof allMethods[0] }) => (
    <TouchableOpacity
      style={[
        styles.methodItem,
        { backgroundColor: getCategoryColor(item.category) },
        selectedMethodKey === item.key && styles.selectedMethodItem,
      ]}
      onPress={() => handleSelect(item.key)}
    >
      <View style={styles.methodItemContent}>
        <Text style={styles.methodIcon}>{getCategoryIcon(item.category)}</Text>
        <View style={styles.methodItemText}>
          <Text variant="titleMedium" style={styles.methodName}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.methodShortName}>
            {item.shortName}
          </Text>
        </View>
        {selectedMethodKey === item.key && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text variant="labelLarge" style={styles.label}>
        {label}
      </Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.dropdownContent}>
          {selectedMethod ? (
            <View style={styles.selectedContent}>
              <Text style={styles.selectedIcon}>
                {getCategoryIcon(selectedMethod.category)}
              </Text>
              <View style={styles.selectedText}>
                <Text variant="bodyLarge" style={styles.selectedMethodName}>
                  {selectedMethod.name}
                </Text>
                <Text variant="bodySmall" style={styles.selectedMethodShort}>
                  {selectedMethod.shortName}
                </Text>
              </View>
              <Chip
                style={[
                  styles.categoryChip,
                  { backgroundColor: getCategoryColor(selectedMethod.category) },
                ]}
                textStyle={styles.chipText}
              >
                {selectedMethod.category}
              </Chip>
            </View>
          ) : (
            <Text variant="bodyMedium" style={styles.placeholder}>
              Select a method...
            </Text>
          )}
          <Text style={styles.chevron}>▼</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="titleLarge" style={styles.modalTitle}>
                {label}
              </Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={availableMethods}
              keyExtractor={(item) => item.key}
              renderItem={renderMethodItem}
              style={styles.methodsList}
              contentContainerStyle={styles.methodsListContent}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: '#1E293B',
    fontWeight: '600',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    minHeight: 60,
    justifyContent: 'center',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  selectedText: {
    flex: 1,
  },
  selectedMethodName: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  selectedMethodShort: {
    color: '#6B7280',
  },
  categoryChip: {
    marginLeft: 8,
    height: 24,
  },
  chipText: {
    fontSize: 10,
    textTransform: 'capitalize',
  },
  placeholder: {
    color: '#9CA3AF',
    flex: 1,
  },
  chevron: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  methodsList: {
    flex: 1,
  },
  methodsListContent: {
    padding: 16,
  },
  methodItem: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedMethodItem: {
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  methodItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodItemText: {
    flex: 1,
  },
  methodName: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  methodShortName: {
    color: '#6B7280',
  },
  checkmark: {
    fontSize: 20,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
});

