import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';

export default function IUDMethodsScreen() {
  const router = useRouter();

  const handleCopperIUCDKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/copper-iucd');
  };

  const handleLNGIUSKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/lng-ius');
  };

  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Method Cards */}
        <View style={styles.methodsContainer}>
          <NaturalMethodCard
            title="Copper IUCD"
            description="A small T-shaped device made of plastic and wrapped in copper placed inside the uterus. Provides perfect protection for 5-12 years. Easily reversible with immediate return to fertility."
            icon="🔧"
            onKnowMorePress={handleCopperIUCDKnowMore}
            backgroundColor="#F0FDF4"
            buttonColor="#10B981"
          />

          <NaturalMethodCard
            title="LNG-IUS"
            description="A small T-shaped plastic device that releases levonorgestrel hormone. Provides perfect protection for 3-5 years with decreased menstrual blood loss and reduced menstrual pain."
            icon="🔧"
            onKnowMorePress={handleLNGIUSKnowMore}
            backgroundColor="#F0FDF4"
            buttonColor="#10B981"
          />
        </View>
      </ScrollView>
    // </SafeAreaView>
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

