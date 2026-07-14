"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { rtList } from "@/data/umkm";
import { supabase } from "@/lib/supabase";
import type { UMKM } from "@/data/umkm";
import UMKMCard from "@/components/UMKMCard";
import SearchFilter from "@/components/SearchFilter";
import SkeletonCard from "@/components/SkeletonCard";
import { Store, SlidersHorizontal } from "lucide-react";

function UMKMListContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [kategori, setKategori] = useState(searchParams.get("kategori") || "Semua");
  const [rt, setRt] = useState("Semua RT");
  const [loading, setLoading] = useState(true);
  const [umkmData, setUmkmData] = useState<UMKM[]>([]);

  useEffect(() => {
    supabase
      .from('umkm')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else if (data) {
          const transformed = data.map((row) => ({
            id: row.id,
            nama: row.nama,
            logo: (row as any).logo ?? '',
            cover: (row as any).cover ?? '',
            kategori: row.kategori,
            deskripsi: row.deskripsi,
            sejarah: (row as any).sejarah ?? '',
            alamat: row.alamat,
            rt: row.rt,
            maps: (row as any).maps ?? '',
            whatsapp: (row as any).whatsapp ?? '',
            jamOperasional: (row as any).jam_operasional ?? '',
            website: (row as any).website ?? '',
            featured: (row as any).featured ?? false,
            galeri: (row as any).galeri ?? [],
          })) as unknown as UMKM[];
          setUmkmData(transformed);
        }
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return umkmData.filter((u) => {
      const q = query.toLowerCase();
      const matchQuery =
        q === "" ||
        u.nama.toLowerCase().includes(q) ||
        u.deskripsi.toLowerCase().includes(q);
      const matchKategori = kategori === "Semua" || u.kategori === kategori;
      const matchRt = rt === "Semua RT" || u.rt === rt;
      return matchQuery && matchKategori && matchRt;
    });
  }, [query, kategori, rt, umkmData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <SearchFilter query={query} setQuery={setQuery} kategori={kategori} setKategori={setKategori} />
      </div>

      {/* RT filter */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
          <SlidersHorizontal size={13} /> Filter RT:
        </span>
        {rtList.map((r) => (
          <button
            key={r}
            onClick={() => setRt(r)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              rt === r
                ? "bg-[#ffaa4d] border-[#ffaa4d] text-[#011f6d]"
                : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-[#ffaa4d]/50 hover:text-[#011f6d] dark:hover:text-white"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-6">
        Menampilkan{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> UMKM
        {query && (
          <span>
            {" "}untuk &ldquo;<span className="text-[#011f6d] dark:text-[#ffaa4d]">{query}</span>&rdquo;
          </span>
        )}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-24 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store size={28} className="text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">UMKM tidak ditemukan</h3>
          <p className="text-gray-400 text-sm mb-6">Coba kata kunci atau filter yang berbeda</p>
          <button
            onClick={() => { setQuery(""); setKategori("Semua"); setRt("Semua RT"); }}
            className="btn-primary text-sm"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((u, i) => (
            <div
              key={u.id}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
            >
              <UMKMCard umkm={u} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UMKMPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      {/* Page header — langsung mulai dari top, navbar sudah fixed di atasnya */}
      <div className="bg-[#011f6d] pt-28 pb-14 mb-10 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#ffaa4d]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Aksara Jawa */}
          <p className="aksara text-[#ffaa4d]/40 text-xl tracking-widest mb-2">ꦢꦥ꧀ꦠꦂꦈꦩ꧀ꦏꦩ꧀</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
            Daftar UMKM Desa Kanten
          </h1>
          <p className="text-white/50 text-sm">
            UMKM terbaik dari Desa Kanten
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        }
      >
        <UMKMListContent />
      </Suspense>
    </div>
  );
}
