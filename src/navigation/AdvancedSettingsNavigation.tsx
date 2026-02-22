import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AdvancesSettingsHeader } from "../common/components/headers/AdvancedSettingsHeader";
import { useTheme } from "../contexts/theme/ThemeContextProvider";
import { LocationInterval } from "../models/locationInterval";
import { AdvancedSettings } from "../screens/advancedSettings/AdvancedSettings";
import { EditHikeTotalDistance } from "../screens/advancedSettings/EditHikeTotalDistance";
import { EditSkippedSection } from "../screens/advancedSettings/skippedSections/EditSkippedSection";
import { SkippedSections } from "../screens/advancedSettings/skippedSections/SkippedSections";

export type AdvancedSettingsStackParamList = {
  advancedSettings: undefined;
  editHikeBoundaries: undefined;
  skippedSections: undefined;
  editSkippedSection: { isEditMode: boolean; skippedSection?: LocationInterval };
  editHikeTotalDistance: undefined;
};

export const AdvancedSettingsNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<AdvancedSettingsStackParamList>();
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ route }) => <AdvancesSettingsHeader pageTitle={route.name} toggleAppSettingsDrawer={() => {}} />,
      }}
    >
      <Stack.Screen name="advancedSettings" component={AdvancedSettings} />
      <Stack.Screen name="skippedSections" component={SkippedSections} />
      <Stack.Screen name="editSkippedSection" component={EditSkippedSection} />
      <Stack.Screen name="editHikeTotalDistance" component={EditHikeTotalDistance} />
    </Stack.Navigator>
  );
};
