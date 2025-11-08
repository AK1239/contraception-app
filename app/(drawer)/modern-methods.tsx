import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ModernMethodCard from '../../src/components/ModernMethodCard';

export default function ModernMethodsScreen() {
  const router = useRouter();

  const handleTemporaryOptions = () => {
    router.push('/(drawer)/temporary-methods');
  };

  const handlePermanentOptions = () => {
    router.push('/(drawer)/permanent-methods');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
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
    </SafeAreaView>
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
  },
});
