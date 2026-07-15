import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#011f6d]">

      {/* CSS gradient background — no external image, zero LCP impact */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #1a3d96 0%, #011f6d 55%, #010f38 100%)",
        }}
      />

      {/* SVG geometric pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hero-grid" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0 L32 32 L0 0" fill="none" stroke="#ffaa4d" strokeWidth="0.5" />
            <path d="M0 64 L32 32 L64 64" fill="none" stroke="#ffaa4d" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.5" fill="#ffaa4d" />
            <circle cx="64" cy="0" r="1.5" fill="#ffaa4d" />
            <circle cx="0" cy="64" r="1.5" fill="#ffaa4d" />
            <circle cx="64" cy="64" r="1.5" fill="#ffaa4d" />
            <circle cx="32" cy="32" r="1" fill="#ffffff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Decorative glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full border border-white/5 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Aksara Jawa ornament */}
        <div className="mb-6 animate-fade-up" style={{ animationDelay: "0ms", animationFillMode: "both" }}>
          <span className="text-[#ffaa4d]/60 text-3xl aksara tracking-widest" aria-hidden="true">ꦢꦺꦱꦏꦤ꧀ꦠꦺꦤ꧀</span>
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-up"
          style={{ animationDelay: "80ms", animationFillMode: "both" }}
        >
          <MapPin size={13} className="text-[#ffaa4d]" aria-hidden="true" />
          <span className="text-white/90 text-xs font-medium tracking-wide">
            Imogiri, Bantul, D.I. Yogyakarta
          </span>
        </div>

        {/* Title — LCP element, no delay, no external image */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Direktori UMKM
          <span className="block text-[#ffaa4d]">Desa Kanten</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: "150ms", animationFillMode: "both" }}
        >
          Temukan produk unggulan UMKM lokal, dukung ekonomi desa, dan wujudkan kemakmuran bersama.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up"
          style={{ animationDelay: "220ms", animationFillMode: "both" }}
        >
          <Link href="/umkm" className="btn-gold text-base px-8 py-3.5">
            Jelajahi UMKM
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/tentang" className="btn-outline-white text-base px-8 py-3.5">
            Tentang Desa
          </Link>
        </div>

        {/* Stats mini bar */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-up"
          style={{ animationDelay: "350ms", animationFillMode: "both" }}
        >
          {[
            { num: "21+", label: "UMKM Aktif" },
            { num: "5",   label: "RT" },
            { num: "7",   label: "Kategori" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-[#ffaa4d]" style={{ fontFamily: "var(--font-poppins)" }}>
                {s.num}
              </p>
              <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-60" aria-hidden="true">
        <div className="w-5 h-8 border-2 border-white/50 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
