// App.tsx
import { Setting } from "@/src/common/components/Setting";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { EditStartAndEndLocationModal } from "./EditStartAndEndLocationModal";

export const EditStartAndEndLocation: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <View style={styles(theme).container}>
      <Setting name="Change start location (mile 125)" onSettingPress={() => setIsModalVisible(true)} />
      <EditStartAndEndLocationModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={() => {}}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
