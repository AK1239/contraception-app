import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { resetQuestionnaire, resetPersonalization } from "../store/slices/questionnaire";
import { resetFABEligibility } from "../store/slices/fabEligibility";
import { resetFemaleSterilizationEligibility } from "../store/slices/femaleSterilizationEligibility";

interface StartOverHeaderButtonProps {
  /** When true, resets FAB eligibility flow instead of MEC questionnaire */
  fabMode?: boolean;
  /** When true, resets Female Sterilization eligibility flow */
  sterilizationMode?: boolean;
}

/**
 * Header bar button that resets the questionnaire and navigates to start over.
 * Use fabMode for Natural Method Eligibility flow.
 * Use sterilizationMode for Female Sterilization Eligibility flow.
 */
export function StartOverHeaderButton({ fabMode = false, sterilizationMode = false }: StartOverHeaderButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePress = () => {
    if (sterilizationMode) {
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
