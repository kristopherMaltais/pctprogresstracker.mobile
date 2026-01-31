import { Header } from "@/src/components/common/Header";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Home } from "../screens/Home";

export type RootStackParamList = {
  home: undefined;
};

type NavigationProps = {
  setAreSettingsOpen: (flag: boolean) => void;
  areSettingsOpen: boolean;
};

const Stack = createNativeStackNavigator();

export const Navigation: React.FC<NavigationProps> = ({ setAreSettingsOpen, areSettingsOpen }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          header: (props) => (
            <Header pageTitle="test" toggleAppSettingsDrawer={() => setAreSettingsOpen(!areSettingsOpen)} />
          ),
        }}
      >
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
