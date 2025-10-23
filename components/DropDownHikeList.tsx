import { useHikes } from "@/contexts/hikesProvider/HikesContextProvider";
import { useLocalization } from "@/contexts/localization/LocalizationContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { Hike } from "@/models/hike";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropDownHikeListProps = {};

type DropDownHike = {
  label: string;
  value: string;
};

export const DropDownHikeList: React.FC<DropDownHikeListProps> = ({}) => {
  const { t } = useLocalization();

  const [hikeList, setHikeList] = useState<any>([]);
  const { hikes } = useHikes();
  const { selectedHike, setSelectedHike } = useUserChoices();

  useEffect(() => {
    setHikeList(
      hikes.map((hike: Hike) => ({
        label: hike.name,
        value: hike.id,
      }))
    );
  }, [hikes]);

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        onChange={setSelectedHike}
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
    opacity: 0.6,
    paddingHorizontal: 16,
  },
});
