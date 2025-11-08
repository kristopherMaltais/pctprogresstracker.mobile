import { Header } from "@/components/Header";
import { HikesContextProvider } from "@/contexts/hikes/HikesContextProvider";
import { ServicesContextProvider } from "@/contexts/services/ServicesContextProvider";
import { ThemeContextProvider } from "@/contexts/theme/ThemeContextProvider";
import { UserChoicesContextProvider } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { ViewShotContextProvider } from "@/contexts/viewShot/ViewShotContextProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import i18n from "@/localization/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  i18n.init;
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView>
      <ViewShotContextProvider>
        <ThemeContextProvider>
          <ServicesContextProvider>
            <HikesContextProvider>
              <UserChoicesContextProvider>
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{
                        header: () => <Header pageTitle="Share my hike" />,
                      }}
                    />
                    <Stack.Screen
                      name="settings"
                      options={{
                        header: () => (
                          <Header
                            pageTitle={t("index:settings.title")}
                            showSettings={false}
                          />
                        ),
                      }}
                    />
                  </Stack>
                </ThemeProvider>
              </UserChoicesContextProvider>
            </HikesContextProvider>
          </ServicesContextProvider>
        </ThemeContextProvider>
      </ViewShotContextProvider>
    </GestureHandlerRootView>
  );
}
