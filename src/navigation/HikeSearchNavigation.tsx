import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HikeSearchHeader } from "../common/components/headers/HikeSearchHeader";
import { useTheme } from "../contexts/theme/ThemeContextProvider";
import { Hike } from "../screens/hikeSearch/Hike";
import { Hikes } from "../screens/hikeSearch/hikes/Hikes";

export type HikeSearchStackParamList = {
  hikes: undefined;
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
      <Stack.Screen name="hikes" component={Hikes} />
      <Stack.Screen name="hike" component={Hike} />
    </Stack.Navigator>
  );
};
