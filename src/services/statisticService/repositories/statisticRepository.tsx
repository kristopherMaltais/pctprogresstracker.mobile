export type SharingMode = "downloadWithBackground" | "downloadNoBackground" | "instagram";

export interface StatisticEntry {
  isUserPremium: boolean;
  isStickerPremium: boolean;
  isHikePremium: boolean;
  stickerName: string | null;
  selectedHike: string | null;
  progressMode: string | null;
  skippedSection: number | null;
  location: number | null;
  sharingMode: SharingMode;
}

export interface StatisticRepository {
  addStatistic: (entry: StatisticEntry) => Promise<void>;
}
