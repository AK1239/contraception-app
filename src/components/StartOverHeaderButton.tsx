import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { resetQuestionnaire, resetPersonalization } from "../store/slices/questionnaire";
import { resetFABEligibility } from "../store/slices/fabEligibility";
import { resetFemaleSterilizationEligibility } from "../store/slices/femaleSterilizationEligibility";
import { resetMaleSterilizationEligibility } from "../store/slices/maleSterilizationEligibility";

interface StartOverHeaderButtonProps {
  /** When true, resets FAB eligibility flow instead of MEC questionnaire */
  fabMode?: boolean;
  /** When true, resets Female Sterilization eligibility flow */
  femaleSterilizationMode?: boolean;
  /** When true, resets Male Sterilization eligibility flow */
  maleSterilizationMode?: boolean;
}

/**
 * Header bar button that resets the questionnaire and navigates to start over.
 * Use fabMode for Natural Method Eligibility flow.
 * Use femaleSterilizationMode for Female Sterilization Eligibility flow.
 * Use maleSterilizationMode for Male Sterilization Eligibility flow.
 */
export function StartOverHeaderButton({ fabMode = false, femaleSterilizationMode = false, maleSterilizationMode = false }: StartOverHeaderButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePress = () => {
    if (maleSterilizationMode) {
      dispatch(resetMaleSterilizationEligibility());
      router.replace("/(drawer)/male-sterilization-eligibility");
    } else if (femaleSterilizationMode) {
      dispatch(resetFemaleSterilizationEligibility());
      router.replace("/(drawer)/female-sterilization-eligibility");
    } else if (fabMode) {
      dispatch(resetFABEligibility());
      router.replace("/(drawer)/fab-eligibility");
    } else {
      dispatch(resetQuestionnaire());
      dispatch(resetPersonalization());
      router.replace("/(drawer)/choose-contraceptive");
    }
  };

  return (
    <View style={{ marginRight: 8 }}>
      <IconButton
        icon="refresh"
        size={24}
        iconColor="#fff"
        onPress={handlePress}
        accessibilityLabel="Start over"
      />
    </View>
  );
}
