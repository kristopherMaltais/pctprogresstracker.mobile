import { StatisticSupabaseRepository } from "@/src/services/statisticService/repositories/supabase/statisticSupabaseRepository";
import { StatisticServiceImpl } from "@/src/services/statisticService/services/statisticServiceImpl";
import { ShareMyHikeServices } from "../models/shareMyHikeServices";

export const initializeStatisticModule = (services: ShareMyHikeServices): void => {
  services["Statistic.StatisticRepository"] = new StatisticSupabaseRepository();
  services["Statistic.StatisticService"] = new StatisticServiceImpl(
    services["Statistic.StatisticRepository"]
  );
};
