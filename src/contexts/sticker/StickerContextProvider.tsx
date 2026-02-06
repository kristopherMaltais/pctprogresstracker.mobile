import { StickerMap } from "@/src/screens/home/components/imageBuilder/stickers/StickerMap";
import { StickerMapLarge } from "@/src/screens/home/components/imageBuilder/stickers/stickerMapLarge";
import { StickerStats } from "@/src/screens/home/components/imageBuilder/stickers/stickerStats/StickerStats";
import React, { createContext, useContext, useState } from "react";

type Sticker = {
  isPremium: boolean;
  sticker: React.JSX.Element;
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
    { isPremium: false, sticker: <StickerMap key="small" /> },
    { isPremium: true, sticker: <StickerStats key="stats" /> },
    { isPremium: true, sticker: <StickerMapLarge key="large" /> },
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
