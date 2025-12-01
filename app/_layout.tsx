import { Settings } from "@/components/appSettings/Settings";
import { Header } from "@/components/common/Header";
import { HikesContextProvider } from "@/contexts/hikes/HikesContextProvider";
import { PremiumContextProvider } from "@/contexts/premium/PremiumContextProvider";
import { ServicesContextProvider } from "@/contexts/services/ServicesContextProvider";
import { ThemeContextProvider } from "@/contexts/theme/ThemeContextProvider";
import { UserChoicesContextProvider } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { ValidationContextProvider } from "@/contexts/validation/ValidationContextProvider";
import { ViewShotContextProvider } from "@/contexts/viewShot/ViewShotContextProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import i18n from "@/localization/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Drawer } from "react-native-drawer-layout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  i18n.init;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <GestureHandlerRootView>
      <ValidationContextProvider>
        <PremiumContextProvider>
          <ViewShotContextProvider>
            <ThemeContextProvider>
              <ServicesContextProvider>
                <HikesContextProvider>
                  <UserChoicesContextProvider>
                    <Drawer
                      open={isOpen}
                      onOpen={() => setIsOpen(true)}
                      onClose={() => setIsOpen(false)}
                      drawerPosition="right"
                      renderDrawerContent={() => <Settings />}
                      drawerStyle={{ width: "70%" }}
                      swipeEnabled={true}
                    >
                      <ThemeProvider
                        value={
                          colorScheme === "dark" ? DarkTheme : DefaultTheme
                        }
                      >
                        <Stack>
                          <Stack.Screen
                            name="index"
                            options={{
                              header: () => (
                                <Header pageTitle="Share my Hike" />
                              ),
                            }}
                          />
                        </Stack>
                      </ThemeProvider>
                    </Drawer>
                  </UserChoicesContextProvider>
                </HikesContextProvider>
              </ServicesContextProvider>
            </ThemeContextProvider>
          </ViewShotContextProvider>
        </PremiumContextProvider>
      </ValidationContextProvider>
    </GestureHandlerRootView>
  );
}
