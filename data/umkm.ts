export interface UMKM {
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
  instagram?: string;
  facebook?: string;
  shopee?: string;
  tokopedia?: string;
  jamOperasional?: string;
  website?: string;
  featured: boolean;
  galeri: string[];
}

export const kategoriList = [
  "Semua",
  "Makanan",
  "Minuman",
  "Kerajinan",
  "Fashion",
  "Pertanian",
  "Jasa",
  "Lainnya",
];

export const rtList = ["Semua RT", "RT 01", "RT 02", "RT 03", "RT 04", "RT 05"];
