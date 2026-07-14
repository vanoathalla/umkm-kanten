// seed_new.js - Insert new UMKM entries from user data
const { createClient } = require('@supabase/supabase-js');

const url = 'https://wdodrsbjnizedysminvk.supabase.co';
const key = 'sb_publishable_9CZOPNWuL181AtnrIzTUGA_6krcPNxU';
const supabase = createClient(url, key);

const entries = [
  // ── RT 01 ──
  {
    id: 'bibit-lele',
    nama: 'Bibit Lele',
    logo: '', cover: '',
    kategori: 'Pertanian',
    deskripsi: 'Penyedia bibit lele segar berkualitas untuk budidaya. Melayani pembelian bibit lele dalam berbagai ukuran.',
    sejarah: 'Usaha pembibitan lele di RT 01 yang melayani kebutuhan bibit bagi peternak lele di sekitar Desa Kanten.',
    alamat: 'RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul',
    rt: 'RT 01',
    maps: '', whatsapp: '620818272687',
    instagram: '', facebook: '', shopee: '', tokopedia: '',
    jam_operasional: '08.00 - 17.00 WIB (Setiap Hari)',
    featured: false,
    produk: [{ id: 'bibit-lele-item', nama: 'Bibit Lele', foto: '', harga: 0, deskripsi: 'Bibit lele segar siap budidaya.', status: 'tersedia' }],
    galeri: [],
  },
  {
    id: 'angkringan-kulon-omah',
    nama: 'Angkringan Kulon Omah',
    logo: '', cover: '',
    kategori: 'Makanan',
    deskripsi: 'Angkringan khas RT 01 tempat warga bersantai. Menyajikan aneka jajanan dan minuman angkringan yang hangat.',
    sejarah: 'Angkringan Kulon Omah hadir sebagai tempat ngumpul warga RT 01 dengan menu angkringan lengkap dan harga terjangkau.',
    alamat: 'RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul',
    rt: 'RT 01',
    maps: '', whatsapp: '6289602272254',
    instagram: '', facebook: '', shopee: '', tokopedia: '',
    jam_operasional: '17.00 - 23.00 WIB (Setiap Hari)',
    featured: false,
    produk: [
      { id: 'nasi-kucing-kulon', nama: 'Nasi Kucing', foto: '', harga: 3000, deskripsi: 'Nasi kucing aneka lauk.', status: 'tersedia' },
      { id: 'wedang-kulon', nama: 'Wedang Hangat', foto: '', harga: 3000, deskripsi: 'Aneka wedang hangat.', status: 'tersedia' },
    ],
    galeri: [],
  },
  {
    id: 'nasi-goreng-prima',
    nama: 'Nasi Goreng Prima',
    logo: '', cover: '',
    kategori: 'Makanan',
    deskripsi: 'Nasi goreng Prima khas RT 01 dengan cita rasa yang lezat dan harga terjangkau.',
    sejarah: 'Usaha nasi goreng rumahan di RT 01 yang melayani warga sekitar dengan menu nasi goreng pilihan.',
    alamat: 'RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul',
    rt: 'RT 01',
    maps: '', whatsapp: '',
    instagram: '', facebook: '', shopee: '', tokopedia: '',
    jam_operasional: '18.00 - 23.00 WIB (Setiap Hari)',
    featured: false,
    produk: [
      { id: 'nasgor-prima', nama: 'Nasi Goreng Prima', foto: '', harga: 12000, deskripsi: 'Nasi goreng spesial dengan bumbu pilihan.', status: 'tersedia' },
    ],
    galeri: [],
  },

  // ── RT 03 ──
  {
    id: 'salsabila-donuts',
    nama: 'Salsabila Donuts',
    logo: '', cover: '',
    kategori: 'Makanan',
    deskripsi: 'Donat homemade Salsabila yang lembut dan lezat dengan berbagai pilihan topping.',
    sejarah: 'Salsabila Donuts hadir sebagai usaha donat rumahan di RT 03 yang melayani konsumen harian maupun pesanan.',
    alamat: 'RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul',
    rt: 'RT 03',
    maps: '', whatsapp: '6287838187339',
    instagram: '', facebook: '', shopee: '', tokopedia: '',
    jam_operasional: '08.00 - 17.00 WIB (Setiap Hari, Pesanan diterima)',
    featured: false,
    produk: [
      { id: 'donat-salsabila', nama: 'Donat Aneka Topping', foto: '', harga: 3000, deskripsi: 'Donat lembut dengan berbagai pilihan topping.', status: 'tersedia' },
      { id: 'donat-pesanan', nama: 'Donat Pesanan (per lusin)', foto: '', harga: 30000, deskripsi: 'Pesanan donat minimal 1 lusin untuk acara.', status: 'tersedia' },
    ],
    galeri: [],
  },
  {
    id: 'batik-gumregah',
    nama: 'Batik Gumregah',
    logo: '', cover: '',
    kategori: 'Fashion',
    deskripsi: 'Batik tulis dan cap khas Kanten produksi Batik Gumregah. Mengangkat motif lokal Desa Kebonagung.',
    sejarah: 'Batik Gumregah berdiri sebagai usaha batik di RT 03 yang melestarikan seni batik tradisional dengan sentuhan motif khas Imogiri.',
    alamat: 'RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul',
    rt: 'RT 03',
    maps: '', whatsapp: '6288229514350',
    instagram: '', facebook: '', shopee: '', tokopedia: '',
    jam_operasional: '08.00 - 17.00 WIB (Setiap Hari)',
    featured: true,
    produk: [
      { id: 'batik-tulis', nama: 'Batik Tulis', foto: '', harga: 150000, deskripsi: 'Kain batik tulis motif khas Kebonagung.', status: 'tersedia' },
      { id: 'batik-cap', nama: 'Batik Cap', foto: '', harga: 80000, deskripsi: 'Kain batik cap dengan motif beragam.', status: 'tersedia' },
    ],
    galeri: [],
  },
];

// Updates for existing entries
const updates = [
  // Barokah Snack - update WA
  { id: 'barokah-snack', whatsapp: '6287809402360' },
];

async function run() {
  console.log('Inserting new UMKM entries...');
  const { data, error } = await supabase.from('umkm').upsert(entries, { onConflict: 'id' });
  if (error) {
    console.error('Insert error:', JSON.stringify(error, null, 2));
  } else {
    console.log(`Inserted/updated ${entries.length} entries OK`);
  }

  console.log('Updating existing entries...');
  for (const u of updates) {
    const { id, ...fields } = u;
    const { error: upErr } = await supabase.from('umkm').update(fields).eq('id', id);
    if (upErr) console.error(`Update ${id} error:`, upErr.message);
    else console.log(`Updated ${id} OK`);
  }

  console.log('Done!');
}

run();
