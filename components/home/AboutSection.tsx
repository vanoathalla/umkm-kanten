"use client";
import { Leaf, Heart, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const highlights = [
  {
    icon: Leaf,
    title: "Potensi Alam",
    desc: "Kekayaan alam yang mendukung UMKM pertanian dan kerajinan lokal Desa Kanten.",
    accent: "#011f6d",
  },
  {
    icon: Heart,
    title: "Budaya Lokal",
    desc: "Batik, anyaman, dan kuliner tradisional Jawa menjadi identitas kuat desa ini.",
    accent: "#ffaa4d",
  },
  {
    icon: Target,
    title: "Misi Pengembangan",
    desc: "Mendorong digitalisasi UMKM agar mampu bersaing di era modern.",
    accent: "#011f6d",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutSection() {
  const { ref: leftRef, inView: leftIn } = useInView();
  const { ref: rightRef, inView: rightIn } = useInView();

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div
            ref={leftRef}
            className={`transition-all duration-700 ${leftIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <p className="aksara text-[#ffaa4d] text-xl mb-1 tracking-widest">ꦕꦫꦶꦠꦤ꧀ꦢꦺꦱ</p>
            <p className="section-label mb-2">Mengenal Kami</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
              Tentang Desa Kanten
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-4">
              Desa Kanten terletak di Kecamatan Imogiri, Kabupaten Bantul, Daerah Istimewa Yogyakarta.
              Dengan kekayaan budaya dan potensi ekonomi lokal yang besar, desa ini aktif mengembangkan
              UMKM sebagai tulang punggung perekonomian warganya.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-8">
              Website ini hadir sebagai media promosi digital yang memudahkan masyarakat menemukan
              dan berinteraksi langsung dengan UMKM di Desa Kanten.
            </p>
            <Link href="/tentang" className="btn-primary">
              Pelajari Lebih Lanjut
            </Link>
          </div>

          {/* Right — cards */}
          <div
            ref={rightRef}
            className={`space-y-4 transition-all duration-700 ${rightIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className="flex items-start gap-4 rounded-2xl p-5 border border-gray-100 dark:border-white/10 hover:border-[#ffaa4d]/40 bg-white dark:bg-white/5 shadow-sm hover:shadow-md transition-all duration-300 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: h.accent + "15", color: h.accent }}
                >
                  <h.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{h.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
