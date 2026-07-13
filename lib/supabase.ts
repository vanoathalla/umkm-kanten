import { createClient } from "@supabase/supabase-js";
import { UMKM } from "@/data/umkm";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
export const supabase = createClient(url, key);

// Export a type that matches the database row. We'll map it to our UMKM interface when fetching.
export type UMKMRow = UMKM;
