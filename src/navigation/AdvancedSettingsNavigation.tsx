import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "../contexts/theme/ThemeContextProvider";
import { AdvancedSettings } from "../screens/advancedSettings/AdvancedSettings";
import { EditHikeBoundaries } from "../screens/advancedSettings/editHikeBoundaries/EditHikeBoundaries";
import { EditSkippedSections } from "../screens/advancedSettings/EditSkippedSections";

export type AdvancedSettingsStackParamList = {
  advancedSettings: undefined;
  editHikeBoundaries: undefined;
  editSkippedSections: undefined;
};

export const AdvancedSettingsNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<AdvancedSettingsStackParamList>();
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="advancedSettings" component={AdvancedSettings} />
      <Stack.Screen name="editHikeBoundaries" component={EditHikeBoundaries} />
      <Stack.Screen name="editSkippedSections" component={EditSkippedSections} />
    </Stack.Navigator>
  );
};
