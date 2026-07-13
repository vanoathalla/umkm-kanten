import { umkmData } from "@/data/umkm";
import { notFound } from "next/navigation";
import UMKMDetailClient from "./UMKMDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return umkmData.map((u) => ({ id: u.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const umkm = umkmData.find((u) => u.id === id);
  if (!umkm) return { title: "UMKM tidak ditemukan" };
  return {
    title: `${umkm.nama} | UMKM Desa Kanten`,
    description: umkm.deskripsi,
    openGraph: {
      title: umkm.nama,
      description: umkm.deskripsi,
      images: [umkm.cover],
    },
  };
}

export default async function UMKMDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const umkm = umkmData.find((u) => u.id === id);
  if (!umkm) notFound();

  const related = umkmData.filter((u) => u.id !== id && u.kategori === umkm.kategori).slice(0, 4);
  const others = related.length < 3 ? umkmData.filter((u) => u.id !== id).slice(0, 4) : related;

  return <UMKMDetailClient umkm={umkm} related={others} />;
}
