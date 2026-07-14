"use client";
import { MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
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

type UMKMItem = { id: string; nama: string; rt: string };

export default function MapOverview() {
  const { ref, inView } = useInView();
  const [umkmList, setUmkmList] = useState<UMKMItem[]>([]);

  useEffect(() => {
    supabase
      .from("umkm")
      .select("id, nama, rt")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setUmkmList(data as UMKMItem[]);
      });
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#011f6d]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <p className="section-label mb-1">Lokasi</p>
          <h2 className="section-title dark:text-white mb-3">Peta UMKM Desa Kanten</h2>
          <p className="section-subtitle dark:text-gray-400 text-sm">
            Temukan lokasi UMKM kami di seluruh dusun Desa Kanten
          </p>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 mb-8">
          <iframe
            title="Peta Desa Kanten"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2!2d110.3973!3d-7.9553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5b2f14a1b1b1%3A0x0!2sDesa%20Kanten%2C%20Imogiri%2C%20Bantul!5e0!3m2!1sid!2sid!4v1234567890"
            className="w-full h-80"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Location list */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {umkmList.map((u, i) => (
            <Link
              key={u.id}
              href={`/umkm/${u.id}`}
              className={`flex items-center gap-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-[#ffaa4d]/40 rounded-xl p-4 transition-all duration-300 group hover:shadow-sm ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-8 h-8 bg-[#011f6d]/8 dark:bg-[#ffaa4d]/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-[#011f6d] dark:text-[#ffaa4d]" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs text-gray-900 dark:text-white truncate group-hover:text-[#011f6d] dark:group-hover:text-[#ffaa4d] transition-colors">
                  {u.nama}
                </p>
                <p className="text-[11px] text-gray-400 truncate">{u.rt}</p>
              </div>
            </Link>
          ))}
          {umkmList.length === 0 && (
            <div className="col-span-3 py-8 text-center text-gray-400 text-sm">
              Memuat data UMKM...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
