import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HikeSearchHeader } from "../common/components/headers/HikeSearchHeader";
import { useTheme } from "../contexts/theme/ThemeContextProvider";
import { Hike } from "../screens/hikeSearch/Hike";
import { HikeList } from "../screens/hikeSearch/HikeList";

export type HikeSearchStackParamList = {
  hikeList: undefined;
  hike: { id: string };
};

export const HikeSearchNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<HikeSearchStackParamList>();
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ route }) => <HikeSearchHeader />,
      }}
    >
      <Stack.Screen name="hikeList" component={HikeList} />
      <Stack.Screen name="hike" component={Hike} />
    </Stack.Navigator>
  );
};
