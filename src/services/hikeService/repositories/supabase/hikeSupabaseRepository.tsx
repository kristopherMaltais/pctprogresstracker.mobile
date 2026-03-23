import { Hike } from "@/src/models/hike";
import { HikeRepository } from "../hikeRepository";
import { supabase } from "./supabaseClient";

export class HikeSupabaseRepository implements HikeRepository {
  constructor() {}

  async getHikes(page: number = 0, pageSize: number = 10): Promise<any[]> {
    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("trails")
      .select("id, name, totalDistance")
      .range(from, to)
      .order("name", { ascending: true });

    if (error) {
      console.error("Erreur de sélection Supabase:", error.message);
      throw error;
    }

    return data || [];
  }

  async getHikeById(id: string): Promise<Hike> {
    try {
      const { data, error } = await supabase
        .from("trails")
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
            decorations ( decoration )
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      // Transformation chirurgicale pour matcher ton type Hike
      return {
        ...data,
        stickers: data.stickers.map((s: any) => ({
          ...s,
          decorations: s.decorations.map((d: any) => d.decoration), // On extrait la string ici
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
        .from("trails")
        .select("id, name, totalDistance, isPremium")
        .ilike("name", `%${keyword}%`)
        .order("name", { ascending: true })
        .limit(10);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error("Erreur de recherche:", error);
      throw error;
    }
  }
}
