import { Header } from "@/components/Header";
import { HikesContextProvider } from "@/contexts/hikesProvider/HikesContextProvider";
import { LocalizationContextProvider } from "@/contexts/localization/LocalizationContextProvider";
import { ScrollContextProvider } from "@/contexts/scrollProvider/ScrollContextProvider";
import { ServicesContextProvider } from "@/contexts/services/ServicesContextProvider";
import { UserChoicesContextProvider } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollContextProvider>
        <ServicesContextProvider>
          <HikesContextProvider>
            <UserChoicesContextProvider>
              <LocalizationContextProvider>
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{
                        header: () => <Header />,
                      }}
                    />
                  </Stack>
                </ThemeProvider>
              </LocalizationContextProvider>
            </UserChoicesContextProvider>
          </HikesContextProvider>
        </ServicesContextProvider>
      </ScrollContextProvider>
    </GestureHandlerRootView>
  );
}
