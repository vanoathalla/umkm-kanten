"use client";
import Link from "next/link";
import { umkmData } from "@/data/umkm";
import UMKMCard from "@/components/UMKMCard";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

export default function FeaturedUMKM() {
  const featured = umkmData.filter((u) => u.featured);
  const { ref, inView } = useInView();

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-1">Pilihan Terbaik</p>
            {/* Aksara Jawa */}
            <p className="aksara text-[#ffaa4d]/70 text-lg tracking-widest mb-1">ꦈꦩ꧀ꦏꦩ꧀ꦲꦸꦔꦒꦸꦭꦤ꧀</p>
            <h2 className="section-title dark:text-white">UMKM Unggulan</h2>
          </div>
          <Link
            href="/umkm"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#011f6d] dark:text-[#ffaa4d] hover:gap-3 transition-all"
          >
            Lihat Semua <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((u, i) => (
            <div
              key={u.id}
              className={`transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <UMKMCard umkm={u} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
