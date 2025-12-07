import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { Itinary } from "@/models/itinary";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ItinarySelectModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onItinarySelected: (itinary: Itinary) => void;
  itinaries: Itinary[];
};

export const ItinarySelectModal: React.FC<ItinarySelectModalProps> = ({
  isVisible,
  onCancel,
  onItinarySelected,
  itinaries,
}) => {
  const { t } = useTranslation();
  const { getIcon, theme } = useTheme();

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable style={styles(theme).centeredView} onPress={onCancel}>
        <View style={styles(theme).modalView}>
          <Text style={styles(theme).title}>{t("index:itinary")}</Text>
          {itinaries?.map((itinary: Itinary) => {
            return (
              <Pressable
                key={itinary.name}
                style={styles(theme).option}
                onPress={() => onItinarySelected(itinary)}
              >
                <Text style={styles(theme).optionText}>{itinary.name}</Text>
                <Image
                  style={styles(theme).icon}
                  source={getIcon("rightChevron")}
                />
              </Pressable>
            );
          })}
          <View style={styles(theme).buttonContainer}>
            <Pressable style={styles(theme).cancelButton} onPress={onCancel}>
              <Text>{t("index:cancel")}</Text>
            </Pressable>
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
    icon: {
      width: 15,
      height: 15,
    },
    option: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 12,
    },
    modalView: {
      margin: 20,
      width: "90%",
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
    title: {
      marginBottom: 15,
      fontWeight: "bold",
      fontSize: 16,
      color: theme.text,
    },
    optionText: {
      color: theme.text,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 20,
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    cancelButton: {
      padding: 12,
      borderRadius: 10,
      backgroundColor: "#E8E8EE",
    },
  });
