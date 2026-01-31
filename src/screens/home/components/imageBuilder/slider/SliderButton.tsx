import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";

type SliderButtonProps = {
  direction: "left" | "right";
  hide: boolean;
  onPress: (direction: "left" | "right") => void;
};

export const SliderButton: React.FC<SliderButtonProps> = ({ direction, hide, onPress }) => {
  const { getIcon, theme } = useTheme();

  const position = useRef(new Animated.Value(5)).current;

  const positionStyle = {} as any;
  if (direction === "left") {
    positionStyle.left = position;
    positionStyle.right = undefined;
  } else {
    positionStyle.right = position;
    positionStyle.left = undefined;
  }

  useEffect(() => {
    Animated.timing(position, {
      toValue: hide ? -100 : 5,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [hide]);

  return (
    <Animated.View style={[styles(theme).container, positionStyle]}>
      <TouchableOpacity style={styles(theme).button} onPress={() => onPress(direction)}>
        <Image
          style={[direction == "left" ? styles(theme).imageLeft : styles(theme).imageRight]}
          source={getIcon("rightChevron")}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
    container: {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: "80%",
      backgroundColor: theme.secondaryBackground,
      height: 40,
      width: 40,
      borderRadius: 20,
      elevation: 5,
    },
    imageLeft: {
      width: 10,
      height: 10,
      transform: [{ rotate: "180deg" }],
    },
    imageRight: {
      width: 10,
      height: 10,
    },
  });
