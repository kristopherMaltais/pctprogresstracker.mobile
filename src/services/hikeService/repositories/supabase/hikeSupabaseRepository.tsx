import { Hike } from "@/src/models/hike";
import { HikeRepository } from "../hikeRepository";
import { supabase } from "./supabaseClient";

export class HikeSupabaseRepository implements HikeRepository {
  constructor() {}

  async getHikes(page: number = 0, pageSize: number = 10): Promise<any[]> {
    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("hikes")
      .select("id, name, totalDistance, isPremium, stickers(count)")
      .range(from, to)
      .order("isPremium", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error("Erreur de sélection Supabase:", error.message);
      throw error;
    }

    return (
      data?.map((hike: any) => ({
        id: hike.id,
        name: hike.name,
        totalDistance: hike.totalDistance,
        isPremium: hike.isPremium,
        stickerCount: hike.stickers[0].count,
      })) || []
    );
  }

  async getHikeById(id: string): Promise<Hike> {
    try {
      const { data, error } = await supabase
        .from("hikes")
        .select(
          `
          id, 
          name, 
          totalDistance,
          isPremium,
          isRoundtrip,
          stickers (
            id,
            orientation,
            width,
            height,
            distance,
            path,
            sticker_decorations (
              decorations (
                decoration
              )
            )
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      return {
        ...data,
        stickers: data.stickers.map((s: any) => ({
          id: s.id,
          orientation: s.orientation,
          width: s.width,
          height: s.height,
          distance: s.distance,
          path: s.path,
          decorations: s.sticker_decorations.map((sd: any) => sd.decorations.decoration),
        })),
      } as Hike;
    } catch (error) {
      console.error("Erreur technique:", error);
      throw error;
    }
  }

  async searchHikes(keyword: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from("hikes")
        .select("id, name, totalDistance, isPremium, stickers(count)")
        .ilike("name", `%${keyword}%`)
        .order("isPremium", { ascending: true })
        .order("name", { ascending: true })
        .limit(10);

      if (error) throw error;

      return (
        data?.map((hike: any) => ({
          id: hike.id,
          name: hike.name,
          totalDistance: hike.totalDistance,
          isPremium: hike.isPremium,
          stickerCount: hike.stickers?.length || 0,
        })) || []
      );
    } catch (error) {
      console.error("Erreur de recherche:", error);
      throw error;
    }
  }
}
