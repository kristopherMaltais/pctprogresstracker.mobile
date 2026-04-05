import { StatisticEntry, StatisticRepository } from "../repositories/statisticRepository";
import { StatisticService } from "./statisticService";

export class StatisticServiceImpl implements StatisticService {
  private statisticRepository: StatisticRepository;

  constructor(statisticRepository: StatisticRepository) {
    this.statisticRepository = statisticRepository;
  }

  async addStatistic(entry: StatisticEntry): Promise<void> {
    return this.statisticRepository.addStatistic(entry);
  }
}
