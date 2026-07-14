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

export const umkmData: UMKM[] = [
  // ── RT 01 ──────────────────────────────────────────────────────
  {
    id: "bibit-lele",
    nama: "Bibit Lele",
    logo: "", cover: "",
    kategori: "Pertanian",
    deskripsi: "Penyedia bibit lele segar berkualitas untuk budidaya. Melayani pembelian bibit lele dalam berbagai ukuran.",
    sejarah: "Usaha pembibitan lele di RT 01 yang melayani kebutuhan bibit bagi peternak lele di sekitar Desa Kanten.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01", maps: "", whatsapp: "620818272687",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },
  {
    id: "angkringan-kulon-omah",
    nama: "Angkringan Kulon Omah",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Angkringan khas RT 01 tempat warga bersantai. Menyajikan aneka jajanan dan minuman angkringan yang hangat.",
    sejarah: "Angkringan Kulon Omah hadir sebagai tempat ngumpul warga RT 01 dengan menu angkringan lengkap dan harga terjangkau.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01", maps: "", whatsapp: "6289602272254",
    jamOperasional: "17.00 - 23.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },
  {
    id: "nasi-goreng-prima",
    nama: "Nasi Goreng Prima",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Nasi goreng Prima khas RT 01 dengan cita rasa yang lezat dan harga terjangkau.",
    sejarah: "Usaha nasi goreng rumahan di RT 01 yang melayani warga sekitar.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01", maps: "", whatsapp: "",
    jamOperasional: "18.00 - 23.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },
  {
    id: "bubur-bu-wahyu",
    nama: "Bubur Pagi Bu Wahyu",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Bubur ayam hangat khas Bu Wahyu Ningrum, sajian sarapan pagi warga Kanten yang selalu dinantikan setiap hari.",
    sejarah: "Bu Wahyu telah berjualan bubur pagi sebagai andalan sarapan warga RT 01. Cita rasa gurih dan porsi melimpah menjadi daya tarik pelanggan setia.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01", maps: "", whatsapp: "6281234560001",
    jamOperasional: "05.30 - 08.00 WIB (Setiap Hari)",
    featured: true, galeri: [],
  },
  {
    id: "angkringan-pak-parji",
    nama: "Angkringan Pak Parji",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Angkringan legendaris RT 01 tempat warga ngumpul. Menjadi titip jual bagi beberapa UMKM tetangga sekitar.",
    sejarah: "Angkringan Pak Parji sudah lama menjadi pusat nongkrong warga. Selain makanan sendiri, beliau juga membantu UMKM lain dengan menerima titipan dagangan.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01", maps: "", whatsapp: "6281234560002",
    jamOperasional: "17.00 - 23.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },
  {
    id: "dafa-snack",
    nama: "Dafa Snack Bu Umiyatun",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Aneka snack dan camilan produksi rumahan Bu Umiyatun. Cocok untuk cemilan sehari-hari maupun oleh-oleh.",
    sejarah: "Bu Umiyatun memulai Dafa Snack sebagai usaha rumahan untuk menambah penghasilan keluarga dengan memproduksi berbagai camilan khas.",
    alamat: "RT 01, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01", maps: "", whatsapp: "6281234560003",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },

  // ── RT 02 ──────────────────────────────────────────────────────
  {
    id: "barokah-snack",
    nama: "Barokah Snack Bu Sugiyem",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Produsen aneka kue dan jajanan pasar terlengkap di Kanten. Sudah lebih dari 20 tahun melayani pesanan dari warga hingga hajatan besar.",
    sejarah: "Bu Sugiyem merintis Barokah Snack sejak lebih dari 20 tahun lalu. Berawal dari menitipkan dagangan di angkringan sekitar 60–70 piece per hari, kini juga melayani pesanan nasi box, hantaran manten, dan katering lansia dari program Pemerintah Kabupaten Bantul.",
    alamat: "RT 02, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 02", maps: "", whatsapp: "6287809402360",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari, Pesanan bisa kapan saja)",
    featured: true, galeri: [],
  },
  {
    id: "ayam-katsu-bu-ulfa",
    nama: "Ayam Katsu Bu Ulfa",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Ayam katsu homemade crispy buatan Bu Ulfa, favorit anak-anak dan remaja warga Kanten.",
    sejarah: "Bu Ulfa mengembangkan resep ayam katsu rumahan yang kini menjadi salah satu jajanan favorit di RT 02.",
    alamat: "RT 02, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 02", maps: "", whatsapp: "6281234560005",
    jamOperasional: "10.00 - 19.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },
  {
    id: "sate-bu-sriyanti",
    nama: "Sate Bu Sriyanti",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Sate ayam dan kambing Bu Sriyanti dengan bumbu kacang khas Yogyakarta yang kaya rempah.",
    sejarah: "Bu Sriyanti berjualan sate dengan resep bumbu kacang turun-temurun yang sudah dikenal warga sekitar.",
    alamat: "RT 02, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 02", maps: "", whatsapp: "6281234560006",
    jamOperasional: "16.00 - 21.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },

  // ── RT 03 ──────────────────────────────────────────────────────
  {
    id: "salsabila-donuts",
    nama: "Salsabila Donuts",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Donat homemade Salsabila yang lembut dan lezat dengan berbagai pilihan topping. Cocok untuk camilan keluarga dan pesanan acara.",
    sejarah: "Salsabila Donuts hadir sebagai usaha donat rumahan di RT 03 yang melayani konsumen harian maupun pesanan dalam jumlah besar.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03", maps: "", whatsapp: "6287838187339",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari, Pesanan diterima)",
    featured: false, galeri: [],
  },
  {
    id: "batik-gumregah",
    nama: "Batik Gumregah",
    logo: "", cover: "",
    kategori: "Fashion",
    deskripsi: "Batik tulis dan cap khas Kanten produksi Batik Gumregah. Mengangkat motif lokal Desa Kebonagung dengan kualitas pengerjaan yang terjaga.",
    sejarah: "Batik Gumregah berdiri sebagai usaha batik di RT 03 yang melestarikan seni batik tradisional dengan sentuhan motif khas daerah Imogiri.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03", maps: "", whatsapp: "6288229514350",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: true, galeri: [],
  },
  {
    id: "kue-bu-sugi",
    nama: "Kue & Jajanan Bu Sugi",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Produsen donat, pastel, dan nasi bakar sambel welut yang sudah berjualan 18 tahun. Setor 80–200 piece ke angkringan setiap hari.",
    sejarah: "Bu Sugi telah berjualan kue dan jajanan selama kurang lebih 18 tahun. Produknya dititipkan di angkringan dan pasar sekitar. Pada weekday bisa setor 80 piece, saat weekend bisa mencapai 100–200 piece.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03", maps: "", whatsapp: "6281234560007",
    jamOperasional: "06.00 - 16.00 WIB (Setiap Hari, Pesanan diterima)",
    featured: true, galeri: [],
  },
  {
    id: "tempe-bu-ning",
    nama: "Tempe Bu Ning",
    logo: "", cover: "",
    kategori: "Pertanian",
    deskripsi: "Tempe segar produksi rumahan Bu Ning, dibuat dari kedelai pilihan dengan proses tradisional yang terjaga kualitasnya.",
    sejarah: "Bu Ning memproduksi tempe sebagai usaha utama keluarga. Tempe dijual segar langsung ke konsumen maupun dititipkan di warung-warung sekitar.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03", maps: "", whatsapp: "6281234560008",
    jamOperasional: "06.00 - 12.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },
  {
    id: "pastel-bu-murniati",
    nama: "Pastel Bu Murniati",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Pastel goreng homemade Bu Murniati dengan isian sayur segar dan telur, kulitnya renyah dan tidak berminyak.",
    sejarah: "Bu Murniati membuat pastel sebagai usaha sampingan yang kini menjadi sumber penghasilan tetap keluarga.",
    alamat: "RT 03, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 03", maps: "", whatsapp: "6281234560009",
    jamOperasional: "07.00 - 15.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },

  // ── RT 04 ──────────────────────────────────────────────────────
  {
    id: "nasi-goreng-mas-arif",
    nama: "Nasi Goreng Mas Arif",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Nasi goreng spesial Mas Arif Munawar yang sudah dikenal di beberapa pasar. Aktif berjualan di Pasar Barongan dan Depok setiap weekend.",
    sejarah: "Mas Arif Munawar mengembangkan usaha nasi gorengnya dari skala rumahan hingga kini aktif berjualan di Pasar Barongan dan weekend di Depok, selain tetap melayani di lokasi.",
    alamat: "RT 04, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 04", maps: "", whatsapp: "6281234560010",
    jamOperasional: "18.00 - 23.00 WIB (Setiap Hari)",
    featured: true, galeri: [],
  },
  {
    id: "kripik-tempe-bu-rejeb",
    nama: "Kripik Tempe Bu Rejeb",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Kripik tempe renyah produksi rumahan Bu Rejeb. Selain kripik, juga menjual nasi goreng di RT 01.",
    sejarah: "Bu Rejeb dari RT 04 dikenal dengan dua usahanya: nasi goreng yang dijajakan di RT 01 dan kripik tempe produksi rumahan sebagai oleh-oleh khas.",
    alamat: "RT 04, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 04", maps: "", whatsapp: "6281234560011",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },
  {
    id: "kue-bu-suparti",
    nama: "Kue Kontainer Bu Suparti",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Aneka kue dan jajanan Bu Suparti yang berjualan menggunakan kontainer di lapangan, menjadi jujugan warga setiap hari.",
    sejarah: "Bu Suparti berjualan aneka kue di lapangan dengan menggunakan kontainer sebagai lapak yang kini sudah dikenal warga sekitar.",
    alamat: "RT 04, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 04", maps: "", whatsapp: "6281234560012",
    jamOperasional: "07.00 - 16.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },

  // ── RT 05 ──────────────────────────────────────────────────────
  {
    id: "tempe-mbah-bini",
    nama: "Tempe Daun Mbah Bini",
    logo: "", cover: "",
    kategori: "Pertanian",
    deskripsi: "Produksi tempe tradisional Mbah Bini yang sudah berjalan lebih dari 10 tahun. Kini menggunakan bungkus daun pisang yang lebih alami.",
    sejarah: "Mbah Bini memproduksi tempe sejak lebih dari 10 tahun lalu. Sempat memproduksi kripik tempe, kini beralih fokus ke tempe daun (dibungkus daun pisang) yang lebih diminati karena cita rasanya lebih autentik.",
    alamat: "RT 05, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 05", maps: "", whatsapp: "6281234560013",
    jamOperasional: "06.00 - 11.00 WIB (Setiap Hari)",
    featured: true, galeri: [],
  },
  {
    id: "kipas-batik-bu-yanti",
    nama: "Souvenir Kipas Batik Bu Yanti",
    logo: "", cover: "",
    kategori: "Kerajinan",
    deskripsi: "Kipas batik souvenir handmade Bu Yanti yang sudah menembus pasar internasional. Pernah menerima pesanan dari Meksiko.",
    sejarah: "Bu Yanti berjualan kipas batik sejak tahun 1990-an. Selain melayani pesanan lokal, beliau pernah menerima pesanan dari luar negeri termasuk Meksiko. Menerima custom nama dan desain dengan harga mulai Rp2.000 hingga Rp20.000 per buah.",
    alamat: "RT 05, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 05", maps: "", whatsapp: "6281234560014",
    instagram: "kipas_batik_yanti",
    jamOperasional: "08.00 - 17.00 WIB (Setiap Hari)",
    featured: true, galeri: [],
  },
  {
    id: "warung-bu-mugiyem",
    nama: "Warung & Gorengan Bu Mugiyem",
    logo: "", cover: "",
    kategori: "Makanan",
    deskripsi: "Warung kelontong sekaligus penjual gorengan Bu Mugiyem. Melayani pembeli dari rumah dan menerima pesanan gorengan.",
    sejarah: "Bu Mugiyem menjalankan dua usaha sekaligus: warung kelontong untuk kebutuhan sehari-hari dan gorengan yang dijual dari rumah serta menerima pesanan.",
    alamat: "RT 05, Dusun Kanten, Desa Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 05", maps: "", whatsapp: "6281234560015",
    jamOperasional: "07.00 - 20.00 WIB (Setiap Hari)",
    featured: false, galeri: [],
  },

  // ── Showroom / Hub ─────────────────────────────────────────────
  {
    id: "showroom-prima-agung",
    nama: "Showroom Desa Prima Agung Mandiri",
    logo: "", cover: "",
    kategori: "Lainnya",
    deskripsi: "Pusat aneka oleh-oleh dan produk UMKM khas Kebonagung. Semua produk UMKM lokal terkumpul di satu tempat.",
    sejarah: "Showroom Desa Prima Agung Mandiri merupakan kelompok UMKM lingkup kelurahan yang berlokasi di RT 01 depan lapangan Kelurahan Kebonagung. Tempat ini menjadi etalase bersama seluruh produk UMKM Kebonagung.",
    alamat: "RT 01 (depan lapangan), Kelurahan Kebonagung, Kec. Imogiri, Bantul",
    rt: "RT 01", maps: "", whatsapp: "6281234560016",
    jamOperasional: "08.00 - 17.00 WIB (Senin - Sabtu)",
    featured: true, galeri: [],
  },
];
