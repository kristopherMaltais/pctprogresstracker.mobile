import { STICKER_CONFIGS } from "@/src/screens/home/components/imageEditor/stickers/configs";
import { StickerVariant } from "@/src/screens/home/components/imageEditor/stickers/configs/types";
import { StickerFree } from "@/src/screens/home/components/imageEditor/stickers/StickerFree";
import { StickerFreeMapOnly } from "@/src/screens/home/components/imageEditor/stickers/StickerFreeMapOnly";
import { StickerProgressBar } from "@/src/screens/home/components/imageEditor/stickers/stickerProgressBar/StickerProgressBar";
import { StickerStats } from "@/src/screens/home/components/imageEditor/stickers/StickerStats";
import { StickerStats3Vertical } from "@/src/screens/home/components/imageEditor/stickers/StickerStats3Vertical";
import React, { createContext, useContext, useState } from "react";

type Sticker = {
  id: string;
  isPremium: boolean;
  sticker: React.JSX.Element;
  name: string;
};

export type { StickerFreeVariant } from "@/src/screens/home/components/imageEditor/stickers/configs/StickerFree.config";
export type { StickerFreeMapOnlyVariant } from "@/src/screens/home/components/imageEditor/stickers/configs/StickerFreeMapOnly.config";
export type {
  CardMode,
  StickerStats3VerticalVariant,
  StickerStatsVariant,
} from "@/src/screens/home/components/imageEditor/stickers/configs/StickerStats.config";

export type { StickerProgressBarVariant } from "@/src/screens/home/components/imageEditor/stickers/configs/StickerProgressBar.config";

interface StickerProps {
  stickers: Sticker[];
  currentSticker: Sticker;
  setCurrentSticker: (direction: "left" | "right") => void;
  setCurrentStickerByIndex: (index: number) => void;
  currentIndex: number;
  stickerCount: number;
  variantIndexMap: Record<string, number>;
  cycleVariant: (stickerId: string) => void;
  getCurrentVariant: <T extends StickerVariant>(stickerId: string) => T | undefined;
}

interface StickerProviderProps {
  children: React.ReactNode;
}

export const StickerContext = createContext<StickerProps | undefined>(undefined);

export const useSticker = (): StickerProps => {
  const context = useContext(StickerContext);
  if (!context) {
    throw new Error("useSticker must be used within a StickerProvider");
  }
  return context;
};

export const StickerContextProvider = ({ children }: StickerProviderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [variantIndexMap, setVariantIndexMap] = useState<Record<string, number>>({});

  const stickers: Sticker[] = [
    { id: "stickerFreeMapOnly", isPremium: false, sticker: <StickerFreeMapOnly key="freeMapOnly" />, name: "Map" },
    { id: "stickerFree", isPremium: false, sticker: <StickerFree key="free" />, name: "2 Stats" },
    { id: "stickerStats3", isPremium: true, sticker: <StickerStats key="stats3" mode={3} />, name: "3 Stats" },
    { id: "stickerStats4", isPremium: true, sticker: <StickerStats key="stats4" mode={4} />, name: "4 Stats" },
    { id: "stickerStats6", isPremium: true, sticker: <StickerStats key="stats6" mode={6} />, name: "6 Stats" },
    {
      id: "stickerStats3Vertical",
      isPremium: true,
      sticker: <StickerStats3Vertical key="stats3Vertical" />,
      name: "3 Stats Vertical",
    },
    {
      id: "stickerProgressBar",
      isPremium: true,
      sticker: <StickerProgressBar key="statsWithProgressBar" />,
      name: "Prog. Bar",
    },
  ];

  const _setCurrentSticker = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      if (direction === "right") {
        return prev === stickers.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? stickers.length - 1 : prev - 1;
      }
    });
  };

  const cycleVariant = (stickerId: string) => {
    const config = STICKER_CONFIGS[stickerId];
    if (!config) return;
    setVariantIndexMap((prev) => {
      const current = prev[stickerId] ?? 0;
      return { ...prev, [stickerId]: (current + 1) % config.variants.length };
    });
  };

  const getCurrentVariant = <T extends StickerVariant>(stickerId: string): T | undefined => {
    const config = STICKER_CONFIGS[stickerId];
    if (!config) return undefined;
    const index = variantIndexMap[stickerId] ?? 0;

    return config.variants[index] as T;
  };

  const setCurrentStickerByIndex = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(stickers.length - 1, index)));
  };

  const contextValue: StickerProps = {
    stickers,
    currentSticker: stickers[currentIndex],
    setCurrentSticker: _setCurrentSticker,
    setCurrentStickerByIndex,
    currentIndex,
    stickerCount: stickers.length,
    variantIndexMap,
    cycleVariant,
    getCurrentVariant,
  };

  return <StickerContext.Provider value={contextValue}>{children}</StickerContext.Provider>;
};
