import { MapPin, Users, Building2, Leaf, Star, TrendingUp, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Desa Kanten | Direktori UMKM",
  description: "Profil Desa Kanten, Kecamatan Imogiri, Kabupaten Bantul, DIY.",
};

const potensiBadge = [
  { icon: Leaf,       label: "Pertanian Organik",    accent: "#011f6d" },
  { icon: Star,       label: "Kerajinan Batik",       accent: "#ffaa4d" },
  { icon: Heart,      label: "Kuliner Tradisional",   accent: "#011f6d" },
  { icon: TrendingUp, label: "UMKM Berkembang",       accent: "#ffaa4d" },
];

const visi = [
  "Meningkatkan kesejahteraan warga melalui pemberdayaan UMKM lokal.",
  "Memperluas jangkauan pasar UMKM melalui digitalisasi.",
  "Melestarikan budaya dan kearifan lokal dalam setiap produk.",
  "Mendorong generasi muda berperan aktif dalam pengembangan ekonomi desa.",
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Page header — navy, seragam dengan halaman lain */}
      <div className="bg-[#011f6d] pt-28 pb-14 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <p className="aksara text-[#ffaa4d]/40 text-xl tracking-widest mb-2">ꦕꦫꦶꦠꦤ꧀ꦢꦺꦱ</p>
          <p className="section-label mb-2">Profil Desa</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
            Desa Kanten
          </h1>
          <p className="text-white/50 text-sm">Kecamatan Imogiri, Kabupaten Bantul, D.I. Yogyakarta</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Info cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: MapPin,    label: "Kecamatan",   value: "Imogiri" },
            { icon: Building2, label: "Kabupaten",   value: "Bantul" },
            { icon: Users,     label: "Jumlah Dusun",value: "3 Dusun" },
            { icon: Star,      label: "Kode Desa",   value: "55782" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 text-center hover:border-[#ffaa4d]/40 transition-all"
            >
              <div className="w-9 h-9 bg-[#011f6d]/8 dark:bg-[#ffaa4d]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <item.icon size={16} className="text-[#011f6d] dark:text-[#ffaa4d]" />
              </div>
              <p className="text-[10px] text-gray-400 mb-0.5">{item.label}</p>
              <p className="font-bold text-xs text-gray-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Profil */}
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Profil Desa Kanten</h2>
          <div className="space-y-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            <p>
              Desa Kanten merupakan salah satu desa yang terletak di wilayah Kecamatan Imogiri,
              Kabupaten Bantul, Daerah Istimewa Yogyakarta. Desa ini memiliki letak geografis
              yang strategis dengan potensi alam dan sumber daya manusia yang cukup besar untuk dikembangkan.
            </p>
            <p>
              Dengan luas wilayah yang mencakup tiga dusun utama yaitu Kanten Wetan, Kanten Kulon,
              dan Karangtengah, Desa Kanten memiliki beragam potensi ekonomi yang terus berkembang —
              mulai dari pertanian organik, kerajinan tangan, kuliner khas, hingga usaha fashion batik lokal.
            </p>
            <p>
              Melalui program digitalisasi UMKM ini, diharapkan setiap usaha kecil dan menengah dapat
              menjangkau pasar yang lebih luas dan meningkatkan kesejahteraan masyarakat Desa Kanten.
            </p>
          </div>
        </div>

        {/* Potensi */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Potensi Desa</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {potensiBadge.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-[#ffaa4d]/40 rounded-2xl p-5 transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: p.accent + "15", color: p.accent }}
                >
                  <p.icon size={18} />
                </div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visi — navy background */}
        <div className="bg-[#011f6d] rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-4 right-6">
            <span className="aksara text-[#ffaa4d]/20 text-5xl tracking-widest">ꦮꦶꦱꦶ</span>
          </div>
          <h2 className="text-xl font-bold mb-6">Visi Pengembangan UMKM</h2>
          <ul className="space-y-3 relative">
            {visi.map((v, i) => (
              <li key={i} className="flex items-start gap-3 text-white/70">
                <span className="w-5 h-5 bg-[#ffaa4d] text-[#011f6d] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed">{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lokasi Desa</h2>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <MapPin size={12} className="text-[#ffaa4d]" />
            <span>Desa Kanten, Kec. Imogiri, Kab. Bantul, DIY 55782</span>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <iframe
              title="Peta Desa Kanten"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2!2d110.3973!3d-7.9553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5b2f14a1b1b1%3A0x0!2sDesa%20Kanten%2C%20Imogiri!5e0!3m2!1sid!2sid!4v1234567890"
              className="w-full h-56"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
