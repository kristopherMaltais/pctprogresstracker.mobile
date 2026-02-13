import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Header } from "../common/components/Header";
import { Home } from "../screens/home/Home";
import { AdvancedSettingsNavigation } from "./AdvancedSettingsNavigation";

export type RootStackParamList = {
  home: undefined;
  advancedSettings: undefined;
};

type NavigationProps = {
  setAreSettingsOpen: (flag: boolean) => void;
  areSettingsOpen: boolean;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC<NavigationProps> = ({ setAreSettingsOpen, areSettingsOpen }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          header: ({ route }) => (
            <Header pageTitle={route.name} toggleAppSettingsDrawer={() => setAreSettingsOpen(!areSettingsOpen)} />
          ),
        }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="advancedSettings" component={AdvancedSettingsNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
