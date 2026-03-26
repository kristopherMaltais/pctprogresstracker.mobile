import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type InputSwitchProps = {
  value: boolean;
  onToggle: (value: boolean) => void;
  label: string;
  isDisabled?: boolean;
};

export const InputSwitch: React.FC<InputSwitchProps> = ({ value, onToggle, label, isDisabled }) => {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(value ? 22 : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 22 : 0,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
  }, [value]);

  return (
    <Pressable
      style={{ ...styles(theme).container, opacity: isDisabled ? 0.5 : 1 }}
      onPress={() => !isDisabled && onToggle(!value)}
    >
      <Text style={styles(theme).label}>{label}</Text>
      <View style={[styles(theme).switch, value && { backgroundColor: theme.primary, opacity: 1 }]}>
        <Animated.View
          style={[styles(theme).thumb, value && { backgroundColor: "white" }, { transform: [{ translateX }] }]}
        />
      </View>
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingHorizontal: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
    },
    switch: {
      width: 48,
      height: 26,
      borderRadius: 6,
      backgroundColor: theme.text,
      opacity: 0.2,
      padding: 2,
      justifyContent: "center",
    },
    thumb: {
      width: 22,
      height: 22,
      borderRadius: 4,
      backgroundColor: "white",
      opacity: 0.8,
    },
  });
