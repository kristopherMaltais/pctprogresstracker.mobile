import { useHikes } from "@/contexts/hikes/HikesContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { Hike } from "@/models/hike";

import { HikeWithItinary } from "@/models/hikeWithItinary";
import { Itinary } from "@/models/itinary";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ItinarySelectModal } from "./ItinarySelectModal";

type DropDownHikeListProps = {};

type DropDownOption = {
  label: string;
  value: string;
};

export const DropDownHikeList: React.FC<DropDownHikeListProps> = ({}) => {
  const [hikeList, setHikeList] = useState<DropDownOption[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [_selectedHike, _setSelectedHike] = useState<Hike | HikeWithItinary>();
  const { hikes } = useHikes();
  const { selectedHike, setSelectedHike } = useUserChoices();
  const { t } = useTranslation();

  useEffect(() => {
    setHikeList(
      hikes.map((hike: Hike | HikeWithItinary) => ({
        label: hike.name,
        value: hike.id,
      }))
    );
  }, [hikes]);

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
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        onChange={updateSelectedHike}
        data={hikeList}
        value={selectedHike?.id}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={t("index:dropDownHikeListPlaceHolder")}
        disable={hikes.length == 0}
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

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 0,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  container: {
    width: "100%",
    height: 80,
    backgroundColor: "#FFCD3C",
  },
});
