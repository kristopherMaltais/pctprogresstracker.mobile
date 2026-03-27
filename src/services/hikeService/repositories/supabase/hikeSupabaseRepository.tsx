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
      .select("id, name, isPremium, maps(count)")
      .eq("isActive", true)
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
        isPremium: hike.isPremium,
        mapCount: hike.maps[0].count,
      })) || []
    );
  }

  async getHikeById(id: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from("hikes")
        .select(
          `
          id, 
          name, 
          isPremium,
          isRoundtrip,
          maps (
            id,
            orientation,
            width,
            height,
            totalDistance,
            path,
            description,
            name,
            map_decoration (
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
        maps: data.maps.map((s: any) => ({
          id: s.id,
          orientation: s.orientation,
          width: s.width,
          height: s.height,
          totalDistance: s.totalDistance,
          path: s.path,
          name: s.name,
          description: s.description,
          decorations: s.map_decoration.map((sd: any) => sd.decorations.decoration),
        })),
      };
    } catch (error) {
      console.error("Erreur technique:", error);
      throw error;
    }
  }

  async searchHikes(keyword: string): Promise<Hike[]> {
    try {
      const { data, error } = await supabase
        .from("hikes")
        .select("id, name, isPremium, maps(count)")
        .eq("isActive", true)
        .ilike("name", `%${keyword}%`)
        .order("isPremium", { ascending: true })
        .order("name", { ascending: true })
        .limit(10);

      if (error) throw error;

      return (
        data?.map((hike: any) => ({
          id: hike.id,
          name: hike.name,
          isPremium: hike.isPremium,
          isRoundtrip: false,
        })) || []
      );
    } catch (error) {
      console.error("Erreur de recherche:", error);
      throw error;
    }
  }
}
