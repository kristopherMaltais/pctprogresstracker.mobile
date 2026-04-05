import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HikeSearchHeader } from "../common/components/headers/HikeSearchHeader";
import { useTheme } from "../contexts/theme/ThemeContextProvider";
import { Hike } from "../screens/hikeSearch/hike/Hike";
import { Hikes } from "../screens/hikeSearch/hikes/Hikes";

export type HikeSearchStackParamList = {
  hikes: undefined;
  hike: { id: string; name?: string };
};

export const HikeSearchNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<HikeSearchStackParamList>();
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ route }) => {
          const params = route.params as { id?: string; name?: string } | undefined;
          return <HikeSearchHeader title={params?.name} hikeId={params?.id} />;
        },
      }}
    >
      <Stack.Screen name="hikes" component={Hikes} />
      <Stack.Screen name="hike" component={Hike} />
    </Stack.Navigator>
  );
};
