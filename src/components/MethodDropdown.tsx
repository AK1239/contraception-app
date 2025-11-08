import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { CONTRACEPTIVE_METHODS_DATA, ContraceptiveMethodData } from '../utils/contraceptiveMethodsData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  
  const availableMethods = CONTRACEPTIVE_METHODS_DATA.filter(
    method => method.id !== excludeMethodKey
  );
  
  const selectedMethod = CONTRACEPTIVE_METHODS_DATA.find(m => m.id === selectedMethodKey);

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


  const handleSelect = (methodKey: string) => {
    onSelect(methodKey);
    setVisible(false);
  };

  const renderMethodItem = ({ item }: { item: ContraceptiveMethodData }) => (
    <TouchableOpacity
      style={[
        styles.methodItem,
        { backgroundColor: getCategoryColor(item.category) },
        selectedMethodKey === item.id && styles.selectedMethodItem,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <View style={styles.methodItemContent}>
        <View style={styles.methodItemText}>
          <Text variant="titleMedium" style={styles.methodName}>
            {item.name}
          </Text>
          {item.shortName && (
            <Text variant="bodySmall" style={styles.methodShortName}>
              {item.shortName}
            </Text>
          )}
          {item.description && (
            <Text variant="bodySmall" style={styles.methodDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>
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
              <View style={styles.selectedText}>
                <Text 
                  variant="bodyLarge" 
                  style={styles.selectedMethodName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {selectedMethod.name}
                </Text>
                {selectedMethod.shortName && (
                  <Text 
                    variant="bodySmall" 
                    style={styles.selectedMethodShort}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {selectedMethod.shortName}
                  </Text>
                )}
              </View>
              <Chip
                mode="flat"
                style={[
                  styles.categoryChip,
                  { backgroundColor: getCategoryColor(selectedMethod.category) },
                ]}
                textStyle={styles.chipText}
                compact={false}
              >
                {selectedMethod.category}
              </Chip>
            </View>
          ) : (
            <Text variant="bodyMedium" style={styles.placeholder}>
              Select a method...
            </Text>
          )}
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
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={availableMethods}
              keyExtractor={(item) => item.id}
              renderItem={renderMethodItem}
              style={styles.methodsList}
              contentContainerStyle={styles.methodsListContent}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text variant="bodyMedium" style={styles.emptyText}>
                    No methods available
                  </Text>
                </View>
              }
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
    width: '100%',
  },
  selectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  selectedText: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    marginRight: 8,
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
    height: 28,
    minHeight: 28,
    flexShrink: 0,
    alignSelf: 'center',
  },
  chipText: {
    fontSize: 11,
    textTransform: 'capitalize',
    fontWeight: '500',
    lineHeight: 15,
    includeFontPadding: false,
  },
  placeholder: {
    color: '#9CA3AF',
    flex: 1,
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
    height: SCREEN_HEIGHT * 0.8,
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexShrink: 0,
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
    flexGrow: 1,
  },
  methodsListContent: {
    padding: 16,
    paddingBottom: 32,
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
    marginTop: 2,
  },
  methodDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

