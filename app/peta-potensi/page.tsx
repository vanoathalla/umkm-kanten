import type { Metadata } from "next";
import PetaPotensiClient from "./PetaPotensiClient";

export const metadata: Metadata = {
  title: "Peta Potensi UMKM | Direktori UMKM Desa Kanten",
  description:
    "Peta potensi sebaran UMKM Desa Kanten, Kecamatan Imogiri, Kabupaten Bantul berdasarkan analisis spasial.",
};

export default function PetaPotensiPage() {
  return <PetaPotensiClient />;
}
