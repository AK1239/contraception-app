import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { resetQuestionnaire, resetPersonalization } from "../store/slices/questionnaire";

/**
 * Header bar button that resets the questionnaire and personalization,
 * then navigates to choose-contraceptive to start over.
 */
export function StartOverHeaderButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePress = () => {
    dispatch(resetQuestionnaire());
    dispatch(resetPersonalization());
    router.replace("/(drawer)/choose-contraceptive");
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
