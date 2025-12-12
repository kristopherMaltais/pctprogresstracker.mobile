import { useHikes } from "@/contexts/hikes/HikesContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { Hike } from "@/models/hike";

import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { DropDownOption } from "@/models/dropdownOption";
import { HikeWithItinary } from "@/models/hikeWithItinary";
import { Itinary } from "@/models/itinary";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ItinarySelectModal } from "../ItinarySelectModal";
import { Option } from "./Option";

type DropDownHikeListProps = {};

export const DropDownHikeList: React.FC<DropDownHikeListProps> = ({}) => {
  const [hikeList, setHikeList] = useState<DropDownOption[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [_selectedHike, _setSelectedHike] = useState<Hike | HikeWithItinary>();
  const { hikes } = useHikes();
  const { isPremiumUnlocked } = usePremium();
  const { selectedHike, setSelectedHike } = useUserChoices();
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    setHikeList(
      hikes
        .map((hike: Hike | HikeWithItinary) => ({
          label: hike.name,
          value: hike.id,
          disabled: hike.isPremium && !isPremiumUnlocked,
        }))
        .sort((a, b) => {
          const labelA = a.label.toLowerCase();
          const labelB = b.label.toLowerCase();

          if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
          return 0;
        })
    );
  }, [hikes, isPremiumUnlocked]);

  const updateSelectedHike = (option: DropDownOption) => {
    const hikeFound = hikes.find(
      (hike: Hike | HikeWithItinary) => hike.id === option.value
    );

    if (hikeFound) {
      if ("itinaries" in hikeFound) {
        _setSelectedHike(hikeFound);
        setIsModalVisible(true);
      } else {
        setSelectedHike(hikeFound);
      }
    }
  };

  const updateSelectedHikeWithItinary = (itinary: Itinary) => {
    if (_selectedHike) {
      setSelectedHike({
        ...itinary,
        ..._selectedHike,
      });
    }

    setIsModalVisible(false);
  };

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
        renderItem={(option: DropDownOption, selected?: boolean) => (
          <Option option={option} selected={selected} />
        )}
        placeholder={t("index:dropDownHikeListPlaceHolder")}
        disable={hikes.length == 0}
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
        searchPlaceholder={t("index:dropDownHikeSearchInputPlaceholder")}
      />
      {_selectedHike && "itinaries" in _selectedHike && (
        <ItinarySelectModal
          isVisible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
          }}
          itinaries={_selectedHike.itinaries}
          onItinarySelected={updateSelectedHikeWithItinary}
        />
      )}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    dropdown: {
      backgroundColor: theme.background,
      marginHorizontal: 16,
      marginTop: 0,
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 16,
    },
    container: {
      width: "100%",
      height: 80,
      backgroundColor: theme.header,
    },
  });
