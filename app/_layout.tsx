import { Header } from "@/components/Header";
import { HikesContextProvider } from "@/contexts/hikesProvider/HikesContextProvider";
import { ScrollContextProvider } from "@/contexts/scrollProvider/ScrollContextProvider";
import { ServicesContextProvider } from "@/contexts/services/ServicesContextProvider";
import { ThemeContextProvider } from "@/contexts/theme/ThemeContextProvider";
import { UserChoicesContextProvider } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import i18n from "@/localization/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  i18n.init;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContextProvider>
        <ScrollContextProvider>
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
                          <Header pageTitle="Settings" showSettings={false} />
                        ),
                      }}
                    />
                  </Stack>
                </ThemeProvider>
              </UserChoicesContextProvider>
            </HikesContextProvider>
          </ServicesContextProvider>
        </ScrollContextProvider>
      </ThemeContextProvider>
    </GestureHandlerRootView>
  );
}
