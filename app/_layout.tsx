import Settings from "@/components/appSettings/Settings";
import { Header } from "@/components/common/Header";
import { HikesContextProvider } from "@/contexts/hikes/HikesContextProvider";
import { LocalizationContextProvider } from "@/contexts/localization/LocalizationContextProvider";
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
import { useEffect, useState } from "react";
import { StatusBar, StatusBarStyle } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  i18n.init;
  const [isOpen, setIsOpen] = useState(false);
  const [statusBar, setStatusBar] = useState<StatusBarStyle>("light-content");

  useEffect(() => {
    setStatusBar(isOpen ? "dark-content" : "light-content");
  }, [isOpen]);

  return (
    <GestureHandlerRootView>
      <ValidationContextProvider>
        <PremiumContextProvider>
          <ViewShotContextProvider>
            <ThemeContextProvider>
              <ServicesContextProvider>
                <HikesContextProvider>
                  <LocalizationContextProvider>
                    <UserChoicesContextProvider>
                      <Drawer
                        open={isOpen}
                        onOpen={() => setIsOpen(true)}
                        onClose={() => setIsOpen(false)}
                        drawerPosition="right"
                        renderDrawerContent={() => <Settings />}
                        drawerStyle={{ width: "75%" }}
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
                                  <Header
                                    pageTitle="Share my Hike"
                                    toggleAppSettingsDrawer={() =>
                                      setIsOpen((prev) => !prev)
                                    }
                                  />
                                ),
                              }}
                            />
                          </Stack>
                          <StatusBar barStyle={statusBar} />
                        </ThemeProvider>
                      </Drawer>
                    </UserChoicesContextProvider>
                  </LocalizationContextProvider>
                </HikesContextProvider>
              </ServicesContextProvider>
            </ThemeContextProvider>
          </ViewShotContextProvider>
        </PremiumContextProvider>
      </ValidationContextProvider>
    </GestureHandlerRootView>
  );
}
