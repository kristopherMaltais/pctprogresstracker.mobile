import { Header } from "@/components/Header";
import { LocalizationContextProvider } from "@/contexts/localization/LocalizationContextProvider";
import { ServicesContextProvider } from "@/contexts/services/ServicesContextProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ServicesContextProvider>
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
    </ServicesContextProvider>
  );
}
