import { Map } from "@/models/map";
import { MapRepository } from "../repositories/mapRepository";
import { MapService } from "./mapService";

export class MapServiceImpl implements MapService {
  private mapRepository: MapRepository;

  constructor(mapRepository: MapRepository) {
    this.mapRepository = mapRepository;
  }

  async getMaps(): Promise<Map[]> {
    return this.mapRepository.getMaps();
  }
}
