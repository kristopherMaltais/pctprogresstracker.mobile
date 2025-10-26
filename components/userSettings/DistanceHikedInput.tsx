import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {};

export const DistanceHikedInput: React.FC<Props> = () => {
  const { distanceHiked, setDistanceHiked, measurementUnit, selectedHike } =
    useUserChoices();

  const getMaximumValue = () => {
    return measurementUnit == MeasurementUnit.KILOMETER
      ? selectedHike?.totalDistanceKilometer
      : selectedHike?.totalDistanceMile;
  };
  const updateValue = (newValue: number) => {
    const clamped = Math.max(0, Math.min(getMaximumValue()!, newValue));
    setDistanceHiked(clamped);
  };

  const handleChangeText = (text: string) => {
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed)) updateValue(parsed);
    else if (text === "") updateValue(0);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Distance hiked</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={distanceHiked.toString()}
            onChangeText={handleChangeText}
            returnKeyType="done"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  label: {
    fontSize: 18,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 120,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    backgroundColor: "#fff",
  },
  maxText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#666",
  },
});
