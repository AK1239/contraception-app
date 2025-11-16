import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModernMethodCard from '../../../src/components/ModernMethodCard';

export default function ModernMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleTemporaryOptions = () => {
    router.push('/(drawer)/know-contraceptive/temporary-methods');
  };

  const handlePermanentOptions = () => {
    router.push('/(drawer)/know-contraceptive/permanent-methods');
  };

  return (
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: Math.max(40, insets.bottom + 40) }}
      >
        {/* Method Cards */}
        <View style={styles.methodsContainer}>
          <ModernMethodCard
            title="Temporary Methods"
            description="Reversible contraceptive methods that can be stopped when you want to conceive. Includes hormonal and non-hormonal options with varying effectiveness and duration."
            icon="💊"
            onSeeOptionsPress={handleTemporaryOptions}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
          />

          <ModernMethodCard
            title="Permanent Methods"
            description="Long-term contraceptive solutions that provide permanent protection against pregnancy. These methods are typically irreversible and suitable for those who have completed their family planning."
            icon="🔒"
            onSeeOptionsPress={handlePermanentOptions}
            backgroundColor="#F0FDF4"
            buttonColor="#10B981"
          />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  methodsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
});

