import Link from "next/link";
import { Store, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#011f6d] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <p className="aksara text-[#ffaa4d]/60 text-2xl tracking-widest mb-3" aria-hidden="true">ꦢꦥ꧀ꦠꦫꦏꦤ꧀ꦈꦱꦲ</p>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
          Miliki Bisnis di Desa Kanten?
        </h2>
        <p className="text-white/75 text-base mb-10 leading-relaxed max-w-lg mx-auto">
          Daftarkan UMKM Anda dan jangkau lebih banyak pelanggan melalui direktori digital ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/umkm"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#011f6d] font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-sm"
          >
            <Store size={18} aria-hidden="true" />
            Lihat Semua UMKM
          </Link>
          <a
            href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20mendaftarkan%20UMKM%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#ffaa4d] text-[#011f6d] font-bold px-8 py-3.5 rounded-xl hover:bg-[#ff9826] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-sm"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Daftarkan UMKM
          </a>
        </div>
      </div>
    </section>
  );
}
