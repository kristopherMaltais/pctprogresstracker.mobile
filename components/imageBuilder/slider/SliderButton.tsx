import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";

type SliderButtonProps = {
  direction: "left" | "right";
  hide: boolean;
  changeIndex: (direction: string) => void;
};

export const SliderButton: React.FC<SliderButtonProps> = ({
  direction,
  hide,
  changeIndex,
}) => {
  const { getIcon } = useTheme();

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
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [hide]);

  return (
    <Animated.View style={[styles.container, positionStyle]}>
      <TouchableOpacity onPress={() => changeIndex(direction)}>
        <Image
          style={[direction == "left" ? styles.imageLeft : styles.imageRight]}
          source={getIcon("rightChevron")}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 300,
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 20,
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
