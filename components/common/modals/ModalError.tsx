import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React, { useEffect } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalErrorProps = {
  message: string;
  isVisible: boolean;
  closeModal: () => void;
};

export const ModalError: React.FC<ModalErrorProps> = ({
  isVisible,
  closeModal,
  message,
}) => {
  const TIME_AUTO_CLOSE_MS = 2500;
  const { getIcon, theme } = useTheme();

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        closeModal();
      }, TIME_AUTO_CLOSE_MS);
    }
  }, [isVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable style={styles(theme).centeredView} onPress={closeModal}>
        <View style={styles(theme).modalView}>
          <View style={styles(theme).imageContainer}>
            <Image style={styles(theme).image} source={getIcon("error")} />
          </View>
          <View>
            <Text style={styles(theme).message}>{message}</Text>
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
      width: "90%",
      height: 220,
      backgroundColor: theme.secondaryBackground,
      borderRadius: 20,
      padding: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    message: {
      fontWeight: "bold",
      textAlign: "center",
      color: theme.text,
    },
    image: {
      width: 70,
      height: 70,
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 30,
    },
  });
