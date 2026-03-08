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
  categoryCardType?: 'modern' | 'temporary' | 'default';
}

export default function SearchResultsView({
  categories,
  specificMethods,
  showGrouping,
  searchQuery,
  categoryCardType = 'default',
}: SearchResultsViewProps) {
  const renderCategoryCard = (category: MethodCategory) => {
    const title = category.title;
    const description = category.description;
    const backgroundColor = category.backgroundColor;
    const buttonColor = category.buttonColor;

    if (categoryCardType === 'modern') {
      const iconString = typeof category.icon === 'string' ? category.icon : '📋';
      return (
        <ModernMethodCard
          title={title}
          description={description}
          backgroundColor={backgroundColor}
          buttonColor={buttonColor}
          icon={iconString}
          onSeeOptionsPress={category.onPress}
        />
      );
    } else if (categoryCardType === 'temporary') {
      return (
        <TemporaryMethodCard
          title={title}
          description={description}
          backgroundColor={backgroundColor}
          buttonColor={buttonColor}
          icon={category.icon}
          onExplorePress={category.onPress}
        />
      );
    } else {
      const iconString = typeof category.icon === 'string' ? category.icon : '📋';
      return (
        <NaturalMethodCard
          title={title}
          description={description}
          backgroundColor={backgroundColor}
          buttonColor={buttonColor}
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
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              {renderCategoryCard(category)}
            </React.Fragment>
          ))}
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
  },
});
