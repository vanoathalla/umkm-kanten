"use client";
import { useState } from "react";
import { MapPin, Layers, Download, Maximize2, X } from "lucide-react";

const MAP_MODE: "iframe" | "image" | "pdf" | "coming" = "image";

const MAP_SRC = {
  iframe: "",
  image: "/peta umkm_page-0001.jpg",
  pdf: "",
};

const DOWNLOAD_URL = "/peta umkm_page-0001.jpg";

export default function PetaPotensiClient() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Page Header */}
      <div className="bg-[#011f6d] pt-28 pb-12 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <p className="aksara text-[#ffaa4d]/40 text-xl tracking-widest mb-2">ꦥꦺꦠ꧁ꦥꦺꦴꦠꦺꦤ꧀ꦱꦶ</p>
          <p className="section-label mb-2">Pemetaan Spasial</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
            Peta Potensi UMKM Desa Kanten
          </h1>
          <p className="text-white/60 text-sm max-w-xl leading-relaxed">
            Visualisasi sebaran dan potensi UMKM berdasarkan analisis spasial KKN Desa Kanten.
          </p>
          <div className="inline-flex items-center gap-2 mt-5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa4d]" />
            <span className="text-white/70 text-xs">Dibuat oleh Hasifa Azra Kamila — KKN UPNVY Unit 84.038 Jurusan T. Geologi</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Map viewer */}
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-[#011f6d] dark:text-[#ffaa4d]" />
              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                Peta Potensi Padukuhan Kanten
              </span>
            </div>
            <div className="flex items-center gap-2">
              {DOWNLOAD_URL && (
                <a
                  href={DOWNLOAD_URL}
                  download="peta-potensi-umkm-kanten.jpg"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#011f6d] dark:text-[#ffaa4d] hover:underline"
                >
                  <Download size={13} /> Unduh
                </a>
              )}
              <button
                onClick={() => setFullscreen(v => !v)}
                className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-400 hover:text-[#011f6d] dark:hover:text-white transition-colors"
                aria-label={fullscreen ? "Keluar fullscreen" : "Fullscreen"}
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Map area */}
          <div className={`relative bg-gray-100 dark:bg-gray-800 transition-all duration-300 ${fullscreen ? "h-[85vh]" : "h-[520px] sm:h-[640px]"}`}>
            {MAP_MODE === "image" && MAP_SRC.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={MAP_SRC.image}
                alt="Peta Potensi UMKM Padukuhan Kanten, Kalurahan Kebonagung, Kapanewon Imogiri, Kabupaten Bantul"
                className="w-full h-full object-contain"
              />
            ) : MAP_MODE === "iframe" && MAP_SRC.iframe ? (
              <iframe
                src={MAP_SRC.iframe}
                title="Peta Potensi UMKM Desa Kanten"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            ) : MAP_MODE === "pdf" && MAP_SRC.pdf ? (
              <iframe
                src={`${MAP_SRC.pdf}#toolbar=1&navpanes=0`}
                title="Peta Potensi UMKM Desa Kanten"
                className="w-full h-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 bg-[#011f6d]/8 rounded-2xl flex items-center justify-center">
                  <MapPin size={24} className="text-[#011f6d] dark:text-[#ffaa4d]" />
                </div>
                <p className="font-bold text-gray-700 dark:text-white text-base">Peta Segera Tersedia</p>
                <p className="text-gray-400 text-sm text-center max-w-xs">
                  Peta potensi UMKM sedang dalam proses pembuatan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition"
            onClick={() => setFullscreen(false)}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MAP_SRC.image}
            alt="Peta Potensi UMKM Kanten"
            className="max-w-full max-h-full object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
