import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type ModalDistanceHikedInputProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const ModalDistanceHikedInput: React.FC<ModalDistanceHikedInputProps> = ({ isVisible, onClose }) => {
  const {
    displayedDistanceHiked,
    setDistanceHiked,
    measurementUnit,
    changeSelectedHikeTotalDistance,
    selectedHikeTotalDistance,
  } = useUserChoices();

  const { theme } = useTheme();
  const isIos = Platform.OS == "ios";
  const [_distanceHiked, _setDistanceHiked] = useState<number>(0);
  const [_selectedHikeTotalDistance, _setSelectedHikeTotalDistance] = useState<number>(0);

  useEffect(() => {
    _setDistanceHiked(displayedDistanceHiked);
    _setSelectedHikeTotalDistance(selectedHikeTotalDistance);
  }, [displayedDistanceHiked, selectedHikeTotalDistance]);

  const onChangeDistanceHiked = (text: string) => {
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(0, Math.min(_selectedHikeTotalDistance, parsed));
      _setDistanceHiked(clamped);
    } else {
      _setDistanceHiked(0);
    }
  };

  const onSelectedHikeChangeDistance = (text: string) => {
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed)) {
      _setSelectedHikeTotalDistance(parsed);
    } else {
      _setSelectedHikeTotalDistance(0);
    }
  };

  const updateDistanceHiked = () => {
    setDistanceHiked(_distanceHiked);
    changeSelectedHikeTotalDistance(_selectedHikeTotalDistance);
    onClose();
  };

  const inputRef = useRef<TextInput>(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onShow={() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }}
    >
      <Pressable style={styles(theme).centeredView} onPress={updateDistanceHiked} accessible={false}>
        <View style={styles(theme).modalView}>
          <View style={styles(theme).container}>
            <TextInput
              ref={inputRef}
              style={styles(theme).input}
              keyboardType="numeric"
              value={_distanceHiked.toString()}
              onChangeText={onChangeDistanceHiked}
              returnKeyType="done"
              onSubmitEditing={updateDistanceHiked}
            />
            <Text style={{ color: theme.text, marginHorizontal: 8, fontSize: 20 }}>/</Text>
            <TextInput
              style={{ ...styles(theme).input, height: isIos ? 40 : 60 }}
              keyboardType="numeric"
              value={_selectedHikeTotalDistance ? _selectedHikeTotalDistance.toString() : "0"}
              onChangeText={onSelectedHikeChangeDistance}
              returnKeyType="done"
              onSubmitEditing={updateDistanceHiked}
            />
            <Text style={styles(theme).measurementUnit}>{getMeasurementUnit(measurementUnit)}</Text>
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
      fontSize: 26,
      color: theme.text,
    },
    measurementUnit: { marginLeft: 4, color: theme.text },
  });
