import { supabase } from "@/src/services/hikeService/repositories/supabase/supabaseClient";
import { StatisticEntry, StatisticRepository } from "../statisticRepository";

export class StatisticSupabaseRepository implements StatisticRepository {
  constructor() {}

  async addStatistic(entry: StatisticEntry): Promise<void> {
    const { error } = await supabase.from("statistic").insert({
      isUserPremium: entry.isUserPremium,
      isStickerPremium: entry.isStickerPremium,
      isHikePremium: entry.isHikePremium,
      stickerName: entry.stickerName,
      selectedHike: entry.selectedHike,
      progressMode: entry.progressMode,
      skippedSection: entry.skippedSection,
      location: entry.location,
      sharingMode: entry.sharingMode,
    });

    if (error) {
      console.error("Erreur d'insertion Supabase:", error.message);
      throw error;
    }
  }
}
