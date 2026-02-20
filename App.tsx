import { registerRootComponent } from "expo";
import * as SplashScreen from "expo-splash-screen";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HikesContextProvider } from "./src/contexts/hikes/HikesContextProvider";
import { LocalizationContextProvider } from "./src/contexts/localization/LocalizationContextProvider";
import { PremiumContextProvider } from "./src/contexts/premium/PremiumContextProvider";
import { ServicesContextProvider } from "./src/contexts/services/ServicesContextProvider";
import { StickerContextProvider } from "./src/contexts/sticker/StickerContextProvider";
import { ThemeContextProvider } from "./src/contexts/theme/ThemeContextProvider";
import { ValidationContextProvider } from "./src/contexts/validation/ValidationContextProvider";
import { ViewShotContextProvider } from "./src/contexts/viewShot/ViewShotContextProvider";
import i18n from "./src/localization/i18n";
import { Navigation } from "./src/navigation/Navigation";
import { ScreenLayout } from "./src/screens/ScreenLayout";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function App() {
  i18n.init;

  const [areSettingsOpen, setAreSettingsOpen] = useState(false);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ValidationContextProvider>
          <PremiumContextProvider>
            <ViewShotContextProvider>
              <ThemeContextProvider>
                <ServicesContextProvider>
                  <HikesContextProvider>
                    <LocalizationContextProvider>
                      <StickerContextProvider>
                        <ScreenLayout areSettingsOpen={areSettingsOpen} setAreSettingsOpen={setAreSettingsOpen}>
                          <Navigation areSettingsOpen={areSettingsOpen} setAreSettingsOpen={setAreSettingsOpen} />
                        </ScreenLayout>
                      </StickerContextProvider>
                    </LocalizationContextProvider>
                  </HikesContextProvider>
                </ServicesContextProvider>
              </ThemeContextProvider>
            </ViewShotContextProvider>
          </PremiumContextProvider>
        </ValidationContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
