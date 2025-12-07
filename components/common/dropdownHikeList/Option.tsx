import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { DropDownOption } from "@/models/dropdownOption";
import { StyleSheet, Text, View } from "react-native";

type OptionProps = {
  option: DropDownOption;
  selected?: boolean;
};

export const Option: React.FC<OptionProps> = ({ option, selected }) => {
  const { theme } = useTheme();
  return (
    <View
      key={option.value}
      style={{
        ...styles.container,
        backgroundColor: theme.background,
      }}
      onStartShouldSetResponder={() => (option.disabled ? true : false)}
    >
      <Text style={{ ...styles.text, color: theme.text }}>{option.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 16,
  },
});
