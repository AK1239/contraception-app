import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}

export default function ExpandableSection({
  title,
  children,
  icon,
  isExpanded = false,
  onToggle
}: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleToggle} 
        style={[styles.header, expanded && styles.headerExpanded]}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
        </View>
        <Text style={styles.chevron}>
          {expanded ? '−' : '+'}
        </Text>
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  headerExpanded: {
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 22,
    marginRight: 12,
  },
  title: {
    color: '#111827',
    fontWeight: '600',
    flex: 1,
    fontSize: 16,
  },
  chevron: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: '300',
    width: 24,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
  },
});
