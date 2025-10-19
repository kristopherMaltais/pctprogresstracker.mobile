import { useLocalization } from "@/contexts/localization/LocalizationContextProvider";
import { Map } from "@/models/map";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropDownMapListProps = {
  maps: Map[];
  onChangeMap: (selectedMap: string) => void;
};

type DropDownMap = {
  label: string;
  value: string;
};

export const DropDownMapList: React.FC<DropDownMapListProps> = ({
  maps,
  onChangeMap,
}) => {
  const { t } = useLocalization();

  const [selectedMap, setSelectedMap] = useState<DropDownMap>();
  const [mapsList, setMapList] = useState<any>([]);

  const handleMapChange = (selectedMap: DropDownMap) => {
    setSelectedMap(selectedMap);
    onChangeMap(selectedMap.value);
  };

  useEffect(() => {
    setMapList(
      maps.map((map: Map) => ({
        label: map.name,
        value: map.id,
      }))
    );
  }, [maps]);

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        onChange={handleMapChange}
        data={mapsList}
        value={selectedMap}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={t("index:dropDownMapListPlaceHolder")}
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
