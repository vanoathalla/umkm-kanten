export interface Produk {
  id: string;
  nama: string;
  foto: string;
  harga: number;
  deskripsi: string;
  status: "tersedia" | "habis";
}

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
  produk: Produk[];
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


export const umkmData: UMKM[] = [
  // ── RT 01 ──────────────────────────────────────────────────────
  {
    id: "bubur-bu-wahyu",
    nama: "Bubur Pagi Bu Wahyu",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Bubur ayam hangat khas Bu Wahyu Ningrum, sajian sarapan pagi warga Kanten yang selalu dinantikan setiap hari.",
    sejarah: "Bu Wahyu telah berjualan bubur pagi sebagai andalan sarapan warga RT 01. Cita rasa gurih dan porsi melimpah menjadi daya tarik pelanggan setia.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01",
    maps: "",
    whatsapp: "6281234560001",
    jamOperasional: "05.30 - 08.00 WIB (Setiap Hari)",
    featured: true,
    galeri: [
      "",
      "",
    ],
    produk: [
      { id: "bubur-ayam", nama: "Bubur Ayam", foto: "", harga: 8000, deskripsi: "Bubur ayam hangat dengan topping lengkap.", status: "tersedia" },
      { id: "bubur-polos", nama: "Bubur Polos", foto: "", harga: 5000, deskripsi: "Bubur polos tanpa topping.", status: "tersedia" },
    ],
  },
  {
    id: "angkringan-pak-parji",
    nama: "Angkringan Pak Parji",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Angkringan legendaris RT 01 tempat warga ngumpul. Menjadi titip jual bagi beberapa UMKM tetangga sekitar.",
    sejarah: "Angkringan Pak Parji sudah lama menjadi pusat nongkrong warga. Selain makanan sendiri, beliau juga membantu UMKM lain dengan menerima titipan dagangan.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01",
    maps: "",
    whatsapp: "6281234560002",
    jamOperasional: "17.00 - 23.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "nasi-kucing", nama: "Nasi Kucing", foto: "", harga: 3000, deskripsi: "Nasi kucing aneka lauk.", status: "tersedia" },
      { id: "gorengan", nama: "Gorengan", foto: "", harga: 1000, deskripsi: "Gorengan tempe, tahu, bakwan.", status: "tersedia" },
      { id: "wedang-jahe", nama: "Wedang Jahe", foto: "", harga: 4000, deskripsi: "Wedang jahe hangat.", status: "tersedia" },
    ],
  },
  {
    id: "dafa-snack",
    nama: "Dafa Snack Bu Umiyatun",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Aneka snack dan camilan produksi rumahan Bu Umiyatun. Cocok untuk cemilan sehari-hari maupun oleh-oleh.",
    sejarah: "Bu Umiyatun memulai Dafa Snack sebagai usaha rumahan untuk menambah penghasilan keluarga dengan memproduksi berbagai camilan khas.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01",
    maps: "",
    whatsapp: "6281234560003",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "keripik-singkong", nama: "Keripik Singkong", foto: "", harga: 10000, deskripsi: "Keripik singkong renyah, kemasan 200gr.", status: "tersedia" },
      { id: "emping", nama: "Emping Melinjo", foto: "", harga: 15000, deskripsi: "Emping melinjo gurih, kemasan 200gr.", status: "tersedia" },
    ],
  },

  // ── RT 02 ──────────────────────────────────────────────────────
  {
    id: "barokah-snack",
    nama: "Barokah Snack Bu Sugiyem",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Produsen aneka kue dan jajanan pasar terlengkap di Kanten. Sudah lebih dari 20 tahun melayani pesanan dari warga hingga hajatan besar.",
    sejarah: "Bu Sugiyem merintis Barokah Snack sejak lebih dari 20 tahun lalu. Berawal dari menitipkan dagangan di angkringan sekitar 60–70 piece per hari, kini juga melayani pesanan nasi box, hantaran manten, dan katering lansia dari program Pemerintah Kabupaten Bantul.",
    alamat: "RT 02, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 02",
    maps: "",
    whatsapp: "6281234560004",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari, Pesanan bisa kapan saja)",
    featured: true,
    galeri: [
      "",
      "",
      "",
    ],
    produk: [
      { id: "risol-mayo", nama: "Risol Mayo", foto: "", harga: 3000, deskripsi: "Risol mayo renyah, siap titip dan pesanan.", status: "tersedia" },
      { id: "lemper", nama: "Lemper", foto: "", harga: 3500, deskripsi: "Lemper isi ayam gurih, cocok untuk hajatan.", status: "tersedia" },
      { id: "nasi-box", nama: "Nasi Box / Nasi Among-Among", foto: "", harga: 20000, deskripsi: "Nasi box lengkap untuk acara, hantaran, dan manten.", status: "tersedia" },
      { id: "katering-lansia", nama: "Katering Lansia (Program Bantul)", foto: "", harga: 15000, deskripsi: "Katering makanan sehat 2 box (makan siang & sore) program Pemkab Bantul.", status: "tersedia" },
    ],
  },
  {
    id: "ayam-katsu-bu-ulfa",
    nama: "Ayam Katsu Bu Ulfa",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Ayam katsu homemade crispy buatan Bu Ulfa, favorit anak-anak dan remaja warga Kanten.",
    sejarah: "Bu Ulfa mengembangkan resep ayam katsu rumahan yang kini menjadi salah satu jajanan favorit di RT 02.",
    alamat: "RT 02, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 02",
    maps: "",
    whatsapp: "6281234560005",
    jamOperasional: "10.00 - 19.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "ayam-katsu", nama: "Ayam Katsu", foto: "", harga: 12000, deskripsi: "Ayam katsu crispy dengan saus spesial.", status: "tersedia" },
      { id: "ayam-katsu-nasi", nama: "Paket Nasi + Ayam Katsu", foto: "", harga: 18000, deskripsi: "Paket nasi + ayam katsu + sambal.", status: "tersedia" },
    ],
  },
  {
    id: "sate-bu-sriyanti",
    nama: "Sate Bu Sriyanti",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Sate ayam dan kambing Bu Sriyanti dengan bumbu kacang khas Yogyakarta yang kaya rempah.",
    sejarah: "Bu Sriyanti berjualan sate dengan resep bumbu kacang turun-temurun yang sudah dikenal warga sekitar.",
    alamat: "RT 02, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 02",
    maps: "",
    whatsapp: "6281234560006",
    jamOperasional: "16.00 - 21.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "sate-ayam", nama: "Sate Ayam", foto: "", harga: 20000, deskripsi: "10 tusuk sate ayam + bumbu kacang.", status: "tersedia" },
      { id: "sate-kambing", nama: "Sate Kambing", foto: "", harga: 25000, deskripsi: "10 tusuk sate kambing + bumbu kecap.", status: "tersedia" },
    ],
  },

  // ── RT 03 ──────────────────────────────────────────────────────
  {
    id: "kue-bu-sugi",
    nama: "Kue & Jajanan Bu Sugi",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Produsen donat, pastel, dan nasi bakar sambel welut yang sudah berjualan 18 tahun. Setor 80–200 piece ke angkringan setiap hari.",
    sejarah: "Bu Sugi telah berjualan kue dan jajanan selama kurang lebih 18 tahun. Produknya dititipkan di angkringan dan pasar sekitar. Pada weekday bisa setor 80 piece, saat weekend bisa mencapai 100–200 piece.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03",
    maps: "",
    whatsapp: "6281234560007",
    jamOperasional: "06.00 - 16.00 WIB (Setiap Hari, Pesanan diterima)",
    featured: true,
    galeri: [
      "",
      "",
    ],
    produk: [
      { id: "donat", nama: "Donat", foto: "", harga: 2000, deskripsi: "Donat empuk aneka topping.", status: "tersedia" },
      { id: "pastel", nama: "Pastel", foto: "", harga: 2500, deskripsi: "Pastel isi sayur dan telur, renyah gurih.", status: "tersedia" },
      { id: "nasi-bakar-welut", nama: "Nasi Bakar Sambel Welut", foto: "", harga: 8000, deskripsi: "Nasi bakar dengan sambel welut khas Jawa.", status: "tersedia" },
    ],
  },
  {
    id: "tempe-bu-ning",
    nama: "Tempe Bu Ning",
    logo: "",
    cover: "",
    kategori: "Pertanian",
    deskripsi: "Tempe segar produksi rumahan Bu Ning, dibuat dari kedelai pilihan dengan proses tradisional yang terjaga kualitasnya.",
    sejarah: "Bu Ning memproduksi tempe sebagai usaha utama keluarga. Tempe dijual segar langsung ke konsumen maupun dititipkan di warung-warung sekitar.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03",
    maps: "",
    whatsapp: "6281234560008",
    jamOperasional: "06.00 - 12.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "tempe-papan", nama: "Tempe Papan", foto: "", harga: 5000, deskripsi: "Tempe papan segar siap masak.", status: "tersedia" },
      { id: "tempe-bulat", nama: "Tempe Bulat", foto: "", harga: 3000, deskripsi: "Tempe bulat ukuran sedang.", status: "tersedia" },
    ],
  },
  {
    id: "pastel-bu-murniati",
    nama: "Pastel Bu Murniati",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Pastel goreng homemade Bu Murniati dengan isian sayur segar dan telur, kulitnya renyah dan tidak berminyak.",
    sejarah: "Bu Murniati membuat pastel sebagai usaha sampingan yang kini menjadi sumber penghasilan tetap keluarga.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03",
    maps: "",
    whatsapp: "6281234560009",
    jamOperasional: "07.00 - 15.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "pastel-sayur", nama: "Pastel Sayur", foto: "", harga: 2500, deskripsi: "Pastel isi sayur wortel dan bihun.", status: "tersedia" },
      { id: "pastel-pesan", nama: "Pastel Pesanan (per 50 pcs)", foto: "", harga: 100000, deskripsi: "Pastel pesanan minimal 50 pcs untuk acara.", status: "tersedia" },
    ],
  },

  // ── RT 04 ──────────────────────────────────────────────────────
  {
    id: "nasi-goreng-mas-arif",
    nama: "Nasi Goreng Mas Arif",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Nasi goreng spesial Mas Arif Munawar yang sudah dikenal di beberapa pasar. Aktif berjualan di Pasar Barongan dan Depok setiap weekend.",
    sejarah: "Mas Arif Munawar mengembangkan usaha nasi gorengnya dari skala rumahan hingga kini aktif berjualan di Pasar Barongan dan weekend di Depok, selain tetap melayani di lokasi.",
    alamat: "RT 04, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 04",
    maps: "",
    whatsapp: "6281234560010",
    jamOperasional: "18.00 - 23.00 WIB (Setiap Hari)",
    featured: true,
    galeri: [
      "",
    ],
    produk: [
      { id: "nasi-goreng-spesial", nama: "Nasi Goreng Spesial", foto: "", harga: 15000, deskripsi: "Nasi goreng dengan topping telur dan ayam.", status: "tersedia" },
      { id: "nasi-goreng-seafood", nama: "Nasi Goreng Seafood", foto: "", harga: 20000, deskripsi: "Nasi goreng dengan udang dan cumi.", status: "tersedia" },
    ],
  },
  {
    id: "kripik-tempe-bu-rejeb",
    nama: "Kripik Tempe Bu Rejeb",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Kripik tempe renyah produksi rumahan Bu Rejeb. Selain kripik, juga menjual nasi goreng di RT 01.",
    sejarah: "Bu Rejeb dari RT 04 dikenal dengan dua usahanya: nasi goreng yang dijajakan di RT 01 dan kripik tempe produksi rumahan sebagai oleh-oleh khas.",
    alamat: "RT 04, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 04",
    maps: "",
    whatsapp: "6281234560011",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "kripik-tempe-ori", nama: "Kripik Tempe Original", foto: "", harga: 12000, deskripsi: "Kripik tempe renyah gurih, kemasan 200gr.", status: "tersedia" },
      { id: "kripik-tempe-pedas", nama: "Kripik Tempe Pedas", foto: "", harga: 13000, deskripsi: "Kripik tempe rasa pedas, kemasan 200gr.", status: "tersedia" },
    ],
  },
  {
    id: "kue-bu-suparti",
    nama: "Kue Kontainer Bu Suparti",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Aneka kue dan jajanan Bu Suparti yang berjualan menggunakan kontainer di lapangan, menjadi jujugan warga setiap hari.",
    sejarah: "Bu Suparti berjualan aneka kue di lapangan dengan menggunakan kontainer sebagai lapak yang kini sudah dikenal warga sekitar.",
    alamat: "RT 04, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 04",
    maps: "",
    whatsapp: "6281234560012",
    jamOperasional: "07.00 - 16.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "aneka-kue", nama: "Aneka Kue Tradisional", foto: "", harga: 2000, deskripsi: "Aneka kue tradisional Jawa per potong.", status: "tersedia" },
      { id: "kue-basah", nama: "Kue Basah", foto: "", harga: 3000, deskripsi: "Kue basah aneka jenis, per potong.", status: "tersedia" },
    ],
  },

  // ── RT 05 ──────────────────────────────────────────────────────
  {
    id: "tempe-mbah-bini",
    nama: "Tempe Mbah Bini",
    logo: "",
    cover: "",
    kategori: "Pertanian",
    deskripsi: "Produksi tempe tradisional Mbah Bini yang sudah berjalan lebih dari 10 tahun. Kini menggunakan bungkus daun pisang yang lebih alami.",
    sejarah: "Mbah Bini memproduksi tempe sejak lebih dari 10 tahun lalu. Sempat memproduksi kripik tempe, kini beralih fokus ke tempe daun (dibungkus daun pisang) yang lebih diminati karena cita rasanya lebih autentik. Produknya dititipkan di Warung Bu Tejo dan dijual langsung dari rumah.",
    alamat: "RT 05, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 05",
    maps: "",
    whatsapp: "6281234560013",
    jamOperasional: "06.00 - 11.00 WIB (Setiap Hari)",
    featured: true,
    galeri: [
      "",
    ],
    produk: [
      { id: "tempe-daun", nama: "Tempe Daun Pisang", foto: "", harga: 4000, deskripsi: "Tempe dibungkus daun pisang, lebih gurih dan alami.", status: "tersedia" },
      { id: "tempe-plastik", nama: "Tempe Plastik", foto: "", harga: 3000, deskripsi: "Tempe ukuran standar bungkus plastik.", status: "tersedia" },
    ],
  },
  {
    id: "kipas-batik-bu-yanti",
    nama: "Kipas Batik Bu Yanti",
    logo: "",
    cover: "",
    kategori: "Kerajinan",
    deskripsi: "Kipas batik souvenir handmade Bu Yanti yang sudah menembus pasar internasional. Pernah menerima pesanan dari Meksiko.",
    sejarah: "Bu Yanti berjualan kipas batik sejak tahun 1990-an. Selain melayani pesanan lokal, beliau pernah menerima pesanan dari luar negeri termasuk Meksiko. Menerima custom nama dan desain dengan harga mulai Rp2.000 hingga Rp20.000 per buah.",
    alamat: "RT 05, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 05",
    maps: "",
    whatsapp: "6281234560014",
    instagram: "kipas_batik_yanti",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: true,
    galeri: [
      "",
      "",
    ],
    produk: [
      { id: "kipas-batik-kecil", nama: "Kipas Batik Kecil", foto: "", harga: 5000, deskripsi: "Kipas batik ukuran kecil, cocok untuk souvenir.", status: "tersedia" },
      { id: "kipas-batik-sedang", nama: "Kipas Batik Sedang", foto: "", harga: 10000, deskripsi: "Kipas batik ukuran sedang dengan motif beragam.", status: "tersedia" },
      { id: "kipas-batik-besar", nama: "Kipas Batik Besar / Custom", foto: "", harga: 20000, deskripsi: "Kipas batik besar, bisa custom nama dan desain.", status: "tersedia" },
    ],
  },
  {
    id: "warung-bu-mugiyem",
    nama: "Warung & Gorengan Bu Mugiyem",
    logo: "",
    cover: "",
    kategori: "Makanan",
    deskripsi: "Warung kelontong sekaligus penjual gorengan Bu Mugiyem. Melayani pembeli dari rumah dan menerima pesanan gorengan.",
    sejarah: "Bu Mugiyem menjalankan dua usaha sekaligus: warung kelontong untuk kebutuhan sehari-hari dan gorengan yang dijual dari rumah serta menerima pesanan.",
    alamat: "RT 05, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 05",
    maps: "",
    whatsapp: "6281234560015",
    jamOperasional: "07.00 - 20.00 WIB (Setiap Hari)",
    featured: false,
    galeri: [
      "",
    ],
    produk: [
      { id: "gorengan-campur", nama: "Gorengan Campur", foto: "", harga: 1000, deskripsi: "Gorengan tempe, tahu, bakwan, per biji.", status: "tersedia" },
      { id: "kebutuhan-pokok", nama: "Kebutuhan Pokok (Kelontong)", foto: "", harga: 0, deskripsi: "Aneka kebutuhan pokok tersedia di warung.", status: "tersedia" },
    ],
  },

  // ── Showroom / Hub ─────────────────────────────────────────────
  {
    id: "showroom-prima-agung",
    nama: "Showroom Desa Prima Agung Mandiri",
    logo: "",
    cover: "",
    kategori: "Lainnya",
    deskripsi: "Pusat aneka oleh-oleh dan produk UMKM khas Kebonagung. Semua produk UMKM lokal terkumpul di satu tempat.",
    sejarah: "Showroom Desa Prima Agung Mandiri merupakan kelompok UMKM lingkup kelurahan yang berlokasi di RT 01 depan lapangan Kelurahan Kebonagung. Tempat ini menjadi etalase bersama seluruh produk UMKM Kebonagung, mulai dari snack, makanan ringan, olahan keripik, bakpia, hingga berbagai produk olahan lainnya.",
    alamat: "RT 01 (depan lapangan), Kelurahan Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01",
    maps: "",
    whatsapp: "6281234560016",
    jamOperasional: "08.00 - 17.00 WIB (Senin - Sabtu)",
    featured: true,
    galeri: [
      "",
      "",
    ],
    produk: [
      { id: "oleh-oleh-umkm", nama: "Paket Oleh-Oleh UMKM", foto: "", harga: 50000, deskripsi: "Paket oleh-oleh berisi berbagai produk UMKM Kebonagung.", status: "tersedia" },
      { id: "bakpia-lokal", nama: "Bakpia Lokal", foto: "", harga: 20000, deskripsi: "Bakpia khas Kebonagung produksi UMKM lokal.", status: "tersedia" },
    ],
  },
];
