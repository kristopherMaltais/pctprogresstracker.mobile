import { Hike } from "@/src/models/hike";

import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { DropDownOption } from "@/src/models/dropdownOption";
import { HikeWithItinary } from "@/src/models/hikeWithItinary";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Option } from "./Option";

type DropDownHikeListProps = {};

export const DropDownHikeList: React.FC<DropDownHikeListProps> = ({}) => {
  const [hikeList, setHikeList] = useState<DropDownOption[]>([]);
  const [_selectedHike, _setSelectedHike] = useState<Hike | HikeWithItinary>();
  const { isPremiumUnlocked, setIsPremiumModalVisible } = usePremium();
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const setSelectedHike = useUserSettingsStore((s) => s.setSelectedHike);
  const selectedHikeId = useUserSettingsStore((s) => s.selectedHikeId);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const updateSelectedHike = () => {};

  return (
    <View style={styles(theme).container}>
      <Dropdown
        style={styles(theme).dropdown}
        onChange={updateSelectedHike}
        search
        data={hikeList}
        value={selectedHike?.id}
        maxHeight={300}
        labelField="label"
        valueField="value"
        renderItem={(option: DropDownOption, selected?: boolean) => <Option option={option} selected={selected} />}
        placeholder={t("home:dropDownHikeListPlaceHolder")}
        disable={true}
        selectedTextStyle={{ color: theme.text }}
        containerStyle={{
          backgroundColor: theme.secondaryBackground,
          borderWidth: 0,
        }}
        inputSearchStyle={{
          borderColor: theme.text,
          color: theme.text,
          backgroundColor: theme.secondaryBackground,
        }}
        placeholderStyle={{ color: theme.text }}
        searchPlaceholder={t("home:dropDownHikeSearchInputPlaceholder")}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    dropdown: {
      backgroundColor: theme.background,
      marginTop: 0,
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 16,
    },
    container: {
      flex: 1,
    },
  });
