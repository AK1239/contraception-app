import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MIN_HEADER_PADDING = 16;

interface HeaderBackButtonProps {
  onPress: () => void;
  color?: string;
}

export function HeaderBackButton({
  onPress,
  color = "#fff",
}: HeaderBackButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { paddingLeft: Math.max(insets.left, MIN_HEADER_PADDING) },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={{ top: 8, bottom: 8, right: 8, left: 4 }}
    >
      <Ionicons name="arrow-back" size={24} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    paddingVertical: 4,
  },
});
