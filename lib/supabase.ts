import { createClient } from "@supabase/supabase-js";

// Debug: Log Supabase credentials (public values only)
const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
console.log('Supabase URL:', url);
console.log('Supabase Key (public):', key);

export const supabase = createClient(url, key);

export type UMKMRow = {
  id: string;
  nama: string;
  logo: string;
  cover: string;
  kategori: string;
  deskripsi: string;
  sejarah: string;
  alamat: string;
  rt: string;
  maps: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  shopee: string;
  tokopedia: string;
  jam_operasional: string;
  featured: boolean;
  produk: { id: string; nama: string; foto: string; harga: number; deskripsi: string; status: string }[];
  galeri: string[];
  created_at: string;
};
