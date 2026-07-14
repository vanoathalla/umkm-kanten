import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import UMKMDetailClient from "./UMKMDetailClient";
import type { Metadata } from "next";
import type { UMKM } from "@/data/umkm";

export const dynamic = "force-dynamic";

// Map a raw Supabase row to the UMKM interface
function rowToUMKM(row: Record<string, unknown>): UMKM {
  return {
    id:             String(row.id ?? ""),
    nama:           String(row.nama ?? ""),
    logo:           String(row.logo ?? ""),
    cover:          String(row.cover ?? ""),
    kategori:       String(row.kategori ?? ""),
    deskripsi:      String(row.deskripsi ?? ""),
    sejarah:        String(row.sejarah ?? ""),
    alamat:         String(row.alamat ?? ""),
    rt:             String(row.rt ?? ""),
    maps:           String(row.maps ?? ""),
    whatsapp:       String(row.whatsapp ?? ""),
    instagram:      row.instagram ? String(row.instagram) : undefined,
    facebook:       row.facebook  ? String(row.facebook)  : undefined,
    shopee:         row.shopee    ? String(row.shopee)    : undefined,
    tokopedia:      row.tokopedia ? String(row.tokopedia) : undefined,
    jamOperasional: String(row.jam_operasional ?? ""),
    website:        row.website   ? String(row.website)   : undefined,
    featured:       Boolean(row.featured ?? false),
    produk:         Array.isArray(row.produk) ? row.produk : [],
    galeri:         Array.isArray(row.galeri) ? row.galeri : [],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase.from("umkm").select("*").eq("id", id).single();
  if (!data) return { title: "UMKM tidak ditemukan" };
  const umkm = rowToUMKM(data as Record<string, unknown>);
  return {
    title:       `${umkm.nama} | UMKM Desa Kanten`,
    description: umkm.deskripsi,
    openGraph: {
      title:       umkm.nama,
      description: umkm.deskripsi,
      images:      umkm.cover ? [umkm.cover] : [],
    },
  };
}

export default async function UMKMDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase.from("umkm").select("*").eq("id", id).single();
  if (!data || error) notFound();

  const umkm = rowToUMKM(data as Record<string, unknown>);

  // Fetch related UMKM: same kategori, exclude current
  const { data: relatedRaw } = await supabase
    .from("umkm")
    .select("*")
    .eq("kategori", umkm.kategori)
    .neq("id", id)
    .limit(4);

  let related = (relatedRaw ?? []).map((r) => rowToUMKM(r as Record<string, unknown>));

  // Fallback: if less than 3 related, fill with other UMKM
  if (related.length < 3) {
    const { data: othersRaw } = await supabase
      .from("umkm")
      .select("*")
      .neq("id", id)
      .limit(4);
    related = (othersRaw ?? []).map((r) => rowToUMKM(r as Record<string, unknown>));
  }

  return <UMKMDetailClient umkm={umkm} related={related} />;
}
