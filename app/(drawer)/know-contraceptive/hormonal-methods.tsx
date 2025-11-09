import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import NaturalMethodCard from '../../../src/components/NaturalMethodCard';

export default function HormonalMethodsScreen() {
  const router = useRouter();

  const handleCOCKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/coc');
  };

  const handlePOPKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/pop');
  };

  const handleInjectionKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/contraceptive-injection');
  };

  const handleImplantsKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/implants');
  };

  const handlePatchKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/combination-patch');
  };

  const handleRingKnowMore = () => {
    router.push('/(drawer)/know-contraceptive/contraceptive-method/contraceptive-vaginal-ring');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Method Cards */}
        <View style={styles.methodsContainer}>
          <NaturalMethodCard
            title="Combined Oral Contraceptives (COC)"
            description="Pills containing both estrogen and progesterone hormones. Provides excellent protection with regular, predictable menses and reduced risk of certain cancers."
            icon="💊"
            onKnowMorePress={handleCOCKnowMore}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
          />

          <NaturalMethodCard
            title="Progestin Only Pills (POP)"
            description="Pills containing only progesterone hormone (no estrogen). Excellent protection with no high estrogen side effects. Must be taken at the same time daily."
            icon="💊"
            onKnowMorePress={handlePOPKnowMore}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
          />

          <NaturalMethodCard
            title="Contraceptive Injections"
            description="Injections containing DMPA (progestin hormone) that provide 3 months of protection. Less painful periods and can be used during breastfeeding."
            icon="💉"
            onKnowMorePress={handleInjectionKnowMore}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
          />

          <NaturalMethodCard
            title="Implants"
            description="A tiny, flexible rod placed under the skin of the upper arm. Provides perfect protection for 3-5 years. No daily maintenance required."
            icon="🔧"
            onKnowMorePress={handleImplantsKnowMore}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
          />

          <NaturalMethodCard
            title="Combination Patch Contraceptive"
            description="A transdermal patch that releases estrogen and progesterone through the skin. Works longer than pills with regular, predictable menses."
            icon="🩹"
            onKnowMorePress={handlePatchKnowMore}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
          />

          <NaturalMethodCard
            title="Contraceptive Vaginal Ring"
            description="A small, flexible plastic ring inserted into the vagina once a month. Releases hormones continuously. No daily maintenance required."
            icon="💍"
            onKnowMorePress={handleRingKnowMore}
            backgroundColor="#F0F9FF"
            buttonColor="#0EA5E9"
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

