import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/helpers/getMeasurementUnit";
import { MeasurementUnit } from "@/models/measurementUnit";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ModalDistanceHikedInputProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const ModalDistanceHikedInput: React.FC<
  ModalDistanceHikedInputProps
> = ({ isVisible, onClose }) => {
  const { distanceHiked, setDistanceHiked, measurementUnit, selectedHike } =
    useUserChoices();

  const { theme } = useTheme();

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
    if (!isNaN(parsed)) {
      updateValue(parsed);
    } else {
      updateValue(0);
    }
  };

  const updateDistanceHiked = () => {
    setDistanceHiked(distanceHiked);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable
        style={styles(theme).centeredView}
        onPress={updateDistanceHiked}
      >
        <View style={styles(theme).modalView}>
          <View style={styles(theme).container}>
            <TextInput
              style={styles(theme).input}
              keyboardType="numeric"
              value={distanceHiked.toString()}
              onChangeText={handleChangeText}
              returnKeyType="done"
              onSubmitEditing={updateDistanceHiked}
              autoFocus
            />
            <Text style={styles(theme).measurementUnit}>
              {getMeasurementUnit(measurementUnit)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
    },
    modalView: {
      margin: 20,
      width: "75%",
      backgroundColor: theme.secondaryBackground,
      borderRadius: 20,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      fontSize: 30,
      color: theme.text,
      height: 40,
      minWidth: 20,
    },
    measurementUnit: { marginLeft: 4, color: theme.text },
  });
