import { StickerFree } from "@/src/screens/home/components/imageEditor/stickers/StickerFree";
import { StickerMapOnly } from "@/src/screens/home/components/imageEditor/stickers/StickerMapOnly";
import { StickerStatsWithProgressBar } from "@/src/screens/home/components/imageEditor/stickers/stickerStats/StickerStatsWithProgressBar";
import { StickerStats3 } from "@/src/screens/home/components/imageEditor/stickers/StickerStats3";
import { StickerStats3Vertical } from "@/src/screens/home/components/imageEditor/stickers/StickerStats3Vertical";
import { StickerStats4 } from "@/src/screens/home/components/imageEditor/stickers/StickerStats4";
import { StickerStats6 } from "@/src/screens/home/components/imageEditor/stickers/StickerStats6";
import React, { createContext, useContext, useState } from "react";

type Sticker = {
  isPremium: boolean;
  sticker: React.JSX.Element;
  name: string;
};

interface StickerProps {
  stickers: Sticker[];
  currentSticker: Sticker;
  setCurrentSticker: (direction: "left" | "right") => void;
  currentIndex: number;
  stickerCount: number;
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

  const stickers = [
    { isPremium: false, sticker: <StickerFree key="free" />, name: "A" },
    { isPremium: false, sticker: <StickerMapOnly key="mapOnly" />, name: "B" },
    { isPremium: false, sticker: <StickerStats3 key="stats3" />, name: "C" },
    { isPremium: false, sticker: <StickerStats4 key="stats4" />, name: "D" },
    { isPremium: true, sticker: <StickerStats6 key="stats6" />, name: "E" },
    { isPremium: true, sticker: <StickerStats3Vertical key="stats3Vertical" />, name: "F" },
    { isPremium: true, sticker: <StickerStatsWithProgressBar key="statsWithProgressBar" />, name: "G" },
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

  const contextValue: StickerProps = {
    stickers: stickers,
    currentSticker: stickers[currentIndex],
    setCurrentSticker: _setCurrentSticker,
    currentIndex: currentIndex,
    stickerCount: stickers.length,
  };

  return <StickerContext.Provider value={contextValue}>{children}</StickerContext.Provider>;
};
