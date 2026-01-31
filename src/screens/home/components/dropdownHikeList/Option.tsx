import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { DropDownOption } from "@/src/models/dropdownOption";
import { StyleSheet, Text, View } from "react-native";

type OptionProps = {
  option: DropDownOption;
  selected?: boolean;
};

export const Option: React.FC<OptionProps> = ({ option }) => {
  const { theme } = useTheme();
  return (
    <View
      key={option.value}
      style={{
        ...styles.container,
        backgroundColor: theme.secondaryBackground,
      }}
      onStartShouldSetResponder={() => (option.disabled ? true : false)}
    >
      <Text
        style={{
          ...styles.text,
          color: theme.text,
          opacity: option.disabled ? 0.2 : 1,
        }}
      >
        {option.label}
      </Text>
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
