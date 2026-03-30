import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AdvancesSettingsHeader } from "../common/components/headers/AdvancedSettingsHeader";
import { useTheme } from "../contexts/theme/ThemeContextProvider";
import { LocationInterval } from "../models/locationInterval";
import { AdvancedSettings } from "../screens/advancedSettings/AdvancedSettings";
import { Preferences } from "../screens/advancedSettings/Preferences";
import { ProgressInputModes } from "../screens/advancedSettings/progressInputModes/ProgressInputModes";
import { EditSkippedSection } from "../screens/advancedSettings/skippedSections/EditSkippedSection";
import { SkippedSections } from "../screens/advancedSettings/skippedSections/SkippedSections";

export type AdvancedSettingsStackParamList = {
  advancedSettings: undefined;
  editHikeBoundaries: undefined;
  skippedSections: undefined;
  editSkippedSection: { isEditMode: boolean; skippedSection?: LocationInterval };
  preferences: undefined;
  progressInputModes: undefined;
};

export const AdvancedSettingsNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<AdvancedSettingsStackParamList>();
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ route, options }) => <AdvancesSettingsHeader title={options.title} />,
      }}
    >
      <Stack.Screen
        name="advancedSettings"
        component={AdvancedSettings}
        options={{ title: "advancedSettings:screenTitle" }}
      />
      <Stack.Screen
        name="skippedSections"
        component={SkippedSections}
        options={{ title: "advancedSettings:skippedSections.title" }}
      />
      <Stack.Screen
        name="editSkippedSection"
        component={EditSkippedSection}
        options={({ route }) => ({
          title: route.params?.isEditMode
            ? "advancedSettings:editSkippedSection.titleEdit"
            : "advancedSettings:editSkippedSection.titleAdd",
        })}
      />
      <Stack.Screen
        name="preferences"
        component={Preferences}
        options={{ title: "advancedSettings:preferences.title" }}
      />
      <Stack.Screen
        name="progressInputModes"
        component={ProgressInputModes}
        options={{ title: "advancedSettings:progressInputModes.title" }}
      />
    </Stack.Navigator>
  );
};
