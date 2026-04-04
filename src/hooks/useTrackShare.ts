import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { SharingMode } from "@/src/services/statisticService/repositories/statisticRepository";
import { StatisticService } from "@/src/services/statisticService/services/statisticService";
import { usePremium } from "../contexts/premium/PremiumContextProvider";
import { useService } from "./useService";

export const useTrackShare = () => {
  const statisticService = useService("Statistic.StatisticService") as StatisticService;
  const { currentSticker } = useSticker();
  const { isPremiumUnlocked } = usePremium();
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const progressMode = useUserSettingsStore((s) => s.progressMode);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const location = useUserSettingsStore((s) => s.location);
  const showLogo = useUserSettingsStore((s) => s.showLogo);

  const trackShare = (sharingMode: SharingMode) => {
    statisticService
      .addStatistic({
        isUserPremium: isPremiumUnlocked,
        isStickerPremium: currentSticker.isPremium,
        isHikePremium: selectedHike?.isPremium ?? false,
        stickerName: currentSticker.id,
        selectedHike: selectedHike?.name ?? null,
        progressMode: progressMode,
        skippedSection: skippedSections.length,
        location: location.displayedLocation,
        sharingMode: sharingMode,
        isLogoCached: !showLogo,
      })
      .catch(() => {});
  };

  return { trackShare };
};
