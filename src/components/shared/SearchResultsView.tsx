import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MethodCategory, SpecificMethod } from '../../hooks/useSearchableMethodList';
import ModernMethodCard from '../ModernMethodCard';
import TemporaryMethodCard from '../TemporaryMethodCard';
import NaturalMethodCard from '../NaturalMethodCard';

interface SearchResultsViewProps {
  categories: MethodCategory[];
  specificMethods: SpecificMethod[];
  showGrouping: boolean;
  searchQuery: string;
  noResultsText?: string;
  categoryCardType?: 'modern' | 'temporary' | 'default';
}

export default function SearchResultsView({
  categories,
  specificMethods,
  showGrouping,
  searchQuery,
  noResultsText = "Try different search terms",
  categoryCardType = 'default',
}: SearchResultsViewProps) {
  const renderCategoryCard = (category: MethodCategory) => {
    const commonProps = {
      key: category.id,
      title: category.title,
      description: category.description,
      backgroundColor: category.backgroundColor,
      buttonColor: category.buttonColor,
    };

    if (categoryCardType === 'modern') {
      // ModernMethodCard only accepts string icons
      const iconString = typeof category.icon === 'string' ? category.icon : '📋';
      return (
        <ModernMethodCard
          {...commonProps}
          icon={iconString}
          onSeeOptionsPress={category.onPress}
        />
      );
    } else if (categoryCardType === 'temporary') {
      // TemporaryMethodCard accepts string or ReactNode
      return (
        <TemporaryMethodCard
          {...commonProps}
          icon={category.icon}
          onExplorePress={category.onPress}
        />
      );
    } else {
      // NaturalMethodCard only accepts string icons
      const iconString = typeof category.icon === 'string' ? category.icon : '📋';
      return (
        <NaturalMethodCard
          {...commonProps}
          icon={iconString}
          onKnowMorePress={category.onPress}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Show Categories Section */}
      {categories.length > 0 && (
        <View>
          {showGrouping && (
            <Text style={styles.sectionHeader}>
              Categories ({categories.length})
            </Text>
          )}
          {categories.map(renderCategoryCard)}
        </View>
      )}

      {/* Show Specific Methods Section */}
      {specificMethods.length > 0 && (
        <View>
          {showGrouping && (
            <Text style={styles.sectionHeader}>
              Specific Methods ({specificMethods.length})
            </Text>
          )}
          {specificMethods.map((method) => (
            <View key={method.id}>
              {/* Breadcrumb at the top */}
              <Text style={styles.breadcrumb}>{method.breadcrumb}</Text>
              <NaturalMethodCard
                title={method.title}
                description={method.description}
                icon={method.icon}
                onKnowMorePress={method.onPress}
                backgroundColor={method.backgroundColor}
                buttonColor={method.buttonColor}
              />
            </View>
          ))}
        </View>
      )}

      {/* No Results */}
      {searchQuery.trim() &&
        categories.length === 0 &&
        specificMethods.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No methods found</Text>
            <Text style={styles.noResultsSubtext}>{noResultsText}</Text>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#F9FAFB',
  },
  breadcrumb: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  noResultsContainer: {
    padding: 32,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
