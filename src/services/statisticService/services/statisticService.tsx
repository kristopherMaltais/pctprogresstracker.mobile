import { StatisticEntry } from "../repositories/statisticRepository";

export interface StatisticService {
  addStatistic: (entry: StatisticEntry) => Promise<void>;
}
