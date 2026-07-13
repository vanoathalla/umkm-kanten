"use client";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#011f6d]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80')",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full border border-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Aksara Jawa ornament */}
        <div
          className={`mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <span className="text-[#ffaa4d]/60 text-3xl aksara tracking-widest">ꦢꦺꦱꦏꦤ꧀ꦠꦺꦤ꧀</span>
        </div>

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-8 transition-all duration-700 delay-100 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <MapPin size={13} className="text-[#ffaa4d]" />
          <span className="text-white/80 text-xs font-medium tracking-wide">
            Imogiri, Bantul, D.I. Yogyakarta
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5 transition-all duration-700 delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Direktori UMKM
          <span className="block text-[#ffaa4d]">Desa Kanten</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Temukan produk unggulan UMKM lokal, dukung ekonomi desa, dan wujudkan kemakmuran bersama.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link href="/umkm" className="btn-gold text-base px-8 py-3.5">
            Jelajahi UMKM
            <ArrowRight size={18} />
          </Link>
          <Link href="/tentang" className="btn-outline-white text-base px-8 py-3.5">
            Tentang Desa
          </Link>
        </div>

        {/* Stats mini bar */}
        <div
          className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { num: "8+", label: "UMKM Aktif" },
            { num: "5", label: "RT" },
            { num: "7", label: "Kategori" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-[#ffaa4d]" style={{ fontFamily: "var(--font-poppins)" }}>
                {s.num}
              </p>
              <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-50">
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
