import { HikeSupabaseRepository } from "@/src/services/hikeService/repositories/supabase/hikeSupabaseRepository";
import { HikeServiceImpl } from "@/src/services/hikeService/services/hikeServiceImpl";
import { ShareMyHikeServices } from "../models/shareMyHikeServices";

export const initializeHikeModule = (services: ShareMyHikeServices): void => {
  services["Hike.HikeRepository"] = new HikeSupabaseRepository();
  services["Hike.HikeService"] = new HikeServiceImpl(services["Hike.HikeRepository"]);
};
