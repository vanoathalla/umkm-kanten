"use client";
import { useState } from "react";
import { MapPin, Layers, Download, Maximize2, Info } from "lucide-react";

// ─────────────────────────────────────────────
//  KONFIGURASI PETA — ganti bagian ini nanti
//  setelah dapat file dari tim geologi
// ─────────────────────────────────────────────

/**
 * Pilih mode tampilan peta:
 *  "iframe"   → embed URL (Google MyMaps, ArcGIS Online, dll)
 *  "image"    → tampilkan file gambar (JPG/PNG)
 *  "pdf"      → embed PDF langsung di halaman
 *  "coming"   → placeholder "segera hadir" (default saat ini)
 */
const MAP_MODE: "iframe" | "image" | "pdf" | "coming" = "coming";

/** Isi sesuai mode yang dipilih */
const MAP_SRC = {
  iframe: "",   // contoh: "https://www.google.com/maps/d/embed?mid=XXXX"
  image: "",   // contoh: "/peta/peta-potensi-umkm.jpg"
  pdf: "",   // contoh: "/peta/peta-potensi-umkm.pdf"
};

/** Link download PDF (opsional, tampil kalau diisi) */
const DOWNLOAD_URL = "";

// ─────────────────────────────────────────────

const legendItems = [
  { color: "#011f6d", label: "Makanan & Minuman" },
  { color: "#ffaa4d", label: "Kerajinan & Fashion" },
  { color: "#10b981", label: "Pertanian" },
  { color: "#8b5cf6", label: "Jasa" },
];

const infoCards = [
  { icon: MapPin, value: "3", label: "Dusun Terpetakan" },
  { icon: Layers, value: "7", label: "Kategori Usaha" },
  { icon: MapPin, value: "8+", label: "Titik UMKM" },
];

export default function PetaPotensiClient() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Page Header — pt-16 untuk navbar, pt di header sendiri untuk konten */}
      <div className="bg-[#011f6d] pt-28 pb-12 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          {/* Aksara Jawa */}
          <p className="aksara text-[#ffaa4d]/40 text-xl tracking-widest mb-2">ꦥꦺꦠ꧁ꦥꦺꦴꦠꦺꦤ꧀ꦱꦶ</p>
          <p className="section-label mb-2">Pemetaan Spasial</p>
          <h1
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Peta Potensi UMKM Desa Kanten
          </h1>
          <p className="text-white/50 text-sm max-w-xl leading-relaxed">
            Visualisasi sebaran dan potensi UMKM berdasarkan analisis spasial
            KKN Desa Kanten.
          </p>

          {/* Credit badge */}
          <div className="inline-flex items-center gap-2 mt-5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa4d]" />
            <span className="text-white/60 text-xs">Dibuat oleh SIFA</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* ── Info cards ── */}
        <div className="grid grid-cols-3 gap-3">
          {infoCards.map((c) => (
            <div
              key={c.label}
              className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 text-center hover:border-[#ffaa4d]/40 transition-all"
            >
              <p className="text-2xl font-bold text-[#011f6d] dark:text-[#ffaa4d] mb-0.5"
                style={{ fontFamily: "var(--font-poppins)" }}>
                {c.value}
              </p>
              <p className="text-xs text-gray-400">{c.label}</p>
            </div>
          ))}
        </div>

        {/* ── Map viewer ── */}
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-[#011f6d] dark:text-[#ffaa4d]" />
              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                Peta Potensi UMKM
              </span>
            </div>
            <div className="flex items-center gap-2">
              {DOWNLOAD_URL && (
                <a
                  href={DOWNLOAD_URL}
                  download
                  className="flex items-center gap-1.5 text-xs font-medium text-[#011f6d] dark:text-[#ffaa4d] hover:underline"
                >
                  <Download size={13} />
                  Unduh
                </a>
              )}
              <button
                onClick={() => setFullscreen((v) => !v)}
                className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-400 hover:text-[#011f6d] dark:hover:text-white transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Map area */}
          <div
            className={`relative bg-gray-50 dark:bg-white/5 transition-all duration-300 ${fullscreen ? "h-[80vh]" : "h-[480px] sm:h-[560px]"
              }`}
          >
            {MAP_MODE === "iframe" && MAP_SRC.iframe ? (
              <iframe
                src={MAP_SRC.iframe}
                title="Peta Potensi UMKM Desa Kanten"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            ) : MAP_MODE === "image" && MAP_SRC.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={MAP_SRC.image}
                alt="Peta Potensi UMKM Desa Kanten"
                className="w-full h-full object-contain"
              />
            ) : MAP_MODE === "pdf" && MAP_SRC.pdf ? (
              <iframe
                src={`${MAP_SRC.pdf}#toolbar=1&navpanes=0`}
                title="Peta Potensi UMKM Desa Kanten"
                className="w-full h-full border-0"
              />
            ) : (
              /* ── Placeholder "segera hadir" ── */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 select-none">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#011f6d 1px, transparent 1px), linear-gradient(90deg, #011f6d 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Concentric rings */}
                {[160, 120, 80].map((size) => (
                  <div
                    key={size}
                    className="absolute rounded-full border border-[#011f6d]/10 dark:border-[#ffaa4d]/10"
                    style={{ width: size, height: size }}
                  />
                ))}

                <div className="relative flex flex-col items-center gap-3 text-center px-6">
                  <div className="w-14 h-14 bg-[#011f6d]/8 dark:bg-[#ffaa4d]/10 rounded-2xl flex items-center justify-center">
                    <MapPin size={24} className="text-[#011f6d] dark:text-[#ffaa4d]" />
                  </div>
                  <p className="font-bold text-gray-700 dark:text-white text-base">
                    Peta Segera Tersedia
                  </p>
                  <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                    Peta potensi UMKM sedang dalam proses pembuatan.
                    Akan segera dipublikasikan di sini.
                  </p>

                  {/* Hint untuk developer */}
                  <div className="mt-2 bg-[#011f6d]/5 dark:bg-[#ffaa4d]/10 border border-[#011f6d]/10 dark:border-[#ffaa4d]/20 rounded-xl px-4 py-3 text-left w-full max-w-sm">
                    <p className="text-xs font-semibold text-[#011f6d] dark:text-[#ffaa4d] mb-1.5 flex items-center gap-1.5">
                      <Info size={11} /> Cara integrasi peta
                    </p>
                    <ul className="text-[11px] text-gray-400 dark:text-gray-500 space-y-1 leading-relaxed">
                      <li>• <span className="font-mono">iframe</span> → Google MyMaps / ArcGIS Online</li>
                      <li>• <span className="font-mono">image</span> → JPG/PNG resolusi tinggi</li>
                      <li>• <span className="font-mono">pdf</span> → embed PDF langsung</li>
                      <li className="pt-0.5 text-[#011f6d] dark:text-[#ffaa4d]">
                        Edit <span className="font-mono">MAP_MODE</span> &amp; <span className="font-mono">MAP_SRC</span> di file ini
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Layers size={14} className="text-[#ffaa4d]" />
            Legenda
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {legendItems.map((l) => (
              <div key={l.label} className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: l.color }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Catatan ── */}
        <div className="flex items-start gap-3 bg-[#011f6d]/4 dark:bg-[#ffaa4d]/5 border border-[#011f6d]/10 dark:border-[#ffaa4d]/15 rounded-2xl p-4">
          <Info size={15} className="text-[#011f6d] dark:text-[#ffaa4d] shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Peta ini merupakan hasil analisis spasial oleh mahasiswa KKN jurusan Geologi.
            Data bersifat informatif dan dapat berubah seiring perkembangan UMKM di Desa Kanten.
          </p>
        </div>
      </div>
    </div>
  );
}
