import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://myrgpeoscybbgjhblqoe.supabase.co";
const supabaseAnonKey = "sb_publishable_xTMlO_rLs2wOtb0u7Jxliw_Me6V7sG-";

// On exporte uniquement l'instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
