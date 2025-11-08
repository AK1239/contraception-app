import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import NaturalMethodCard from '../../src/components/NaturalMethodCard';

export default function PermanentMethodsScreen() {
  const router = useRouter();

  const handleTubalLigationKnowMore = () => {
    router.push('/(drawer)/contraceptive-method/tubal-ligation');
  };

  const handleVasectomyKnowMore = () => {
    router.push('/(drawer)/contraceptive-method/vasectomy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Method Cards */}
        <View style={styles.methodsContainer}>
          <NaturalMethodCard
            title="Tubal Ligation"
            description="A surgical procedure where the fallopian tubes are tied and blocked. Provides permanent contraception for women with perfect efficacy. Usually irreversible."
            icon="🔒"
            onKnowMorePress={handleTubalLigationKnowMore}
            backgroundColor="#F0FDF4"
            buttonColor="#10B981"
          />

          <NaturalMethodCard
            title="Vasectomy"
            description="A permanent male sterilization procedure where the vas deferens are cut, tied, or sealed. Provides perfect efficacy. Usually irreversible."
            icon="🔒"
            onKnowMorePress={handleVasectomyKnowMore}
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

