// seed_umkm.ts - Insert sample UMKM entries into Supabase
import { supabase } from '@/lib/supabase';

// Helper to create a UMKM object with placeholders
function createUMKM(name: string, rt: string) {
  return {
    nama: name,
    logo: '/placeholder-logo.png',
    cover: '/placeholder-cover.png',
    kategori: 'Umum',
    deskripsi: `${name} adalah UMKM yang berlokasi di ${rt}.`,
    sejarah: 'Sejarah belum tersedia.',
    alamat: `Alamat ${name}`,
    rt: rt,
    maps: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    shopee: '',
    tokopedia: '',
    jam_operasional: '09:00 - 17:00',
    featured: false,
    produk: [],
    galeri: []
  };
}

const entries = [
  // RT 1
  createUMKM('Bibit Lele', 'RT 1'),
  createUMKM('Angkringan Lek Parji', 'RT 1'),
  createUMKM('B Karya', 'RT 1'),
  createUMKM('Daffa Snack', 'RT 1'),
  createUMKM('Angkringan Kulon Omah', 'RT 1'),
  createUMKM('Rumah Pak Dukuh', 'RT 1'),
  createUMKM('Grha Agung Kebonagung', 'RT 1'),
  createUMKM('Kelurahan Kebonagung', 'RT 1'),
  createUMKM('SD Negeri Kebonagung', 'RT 1'),
  createUMKM('Nasi Goreng Prima', 'RT 1'),
  // RT 2
  createUMKM('Taman Baca Sekar Agung', 'RT 2'),
  createUMKM('Barokah Snack', 'RT 2'),
  createUMKM('Smeja Bakehouse', 'RT 2'),
  // RT 3
  createUMKM('Salsabila Donuts', 'RT 3'),
  createUMKM('Batik Gumregah', 'RT 3'),
  // RT 4
  createUMKM('Kripik Tempe Bu Rejeb', 'RT 4'),
  // RT 5
  createUMKM('Pendopo Puntodewo', 'RT 5'),
  createUMKM('Souvenir Kipas', 'RT 5'),
  createUMKM('Tempe', 'RT 5')
];

async function run() {
  const { data, error } = await supabase.from('umkm').insert(entries);
  if (error) {
    console.error('Error inserting UMKM entries:', error);
    process.exit(1);
  } else {
    console.log('Successfully inserted entries:', data);
    process.exit(0);
  }
}

run();
