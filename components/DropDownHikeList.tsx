import { useHikes } from "@/contexts/hikesProvider/HikesContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { Hike } from "@/models/hike";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropDownHikeListProps = {};

type DropDownOption = {
  label: string;
  value: string;
};

export const DropDownHikeList: React.FC<DropDownHikeListProps> = ({}) => {
  const [hikeList, setHikeList] = useState<DropDownOption[]>([]);
  const { hikes } = useHikes();
  const { selectedHike, setSelectedHike } = useUserChoices();
  const { t } = useTranslation();

  useEffect(() => {
    setHikeList(
      hikes.map((hike: Hike) => ({
        label: hike.name,
        value: hike.id,
      }))
    );
  }, [hikes]);

  const updateSelectedHike = (option: DropDownOption) => {
    const hikeFound = hikes.find((hike: Hike) => hike.id === option.value);
    setSelectedHike(hikeFound!);
  };

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        onChange={updateSelectedHike}
        data={hikeList}
        value={selectedHike}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={t("index:dropDownHikeListPlaceHolder")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
});
