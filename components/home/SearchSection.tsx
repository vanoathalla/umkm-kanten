"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { kategoriList } from "@/data/umkm";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (kategori !== "Semua") params.set("kategori", kategori);
    router.push(`/umkm?${params.toString()}`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="section-label mb-1">Pencarian</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Cari UMKM</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Temukan UMKM favorit Anda dengan mudah
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 space-y-4">
          {/* Search bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Cari nama UMKM atau produk..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#011f6d]/30 dark:focus:ring-[#ffaa4d]/30 text-sm transition"
              />
            </div>
            <button onClick={handleSearch} className="btn-primary px-6 py-3 shrink-0 text-sm">
              Cari
            </button>
          </div>

          {/* Kategori chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {kategoriList.map((k) => (
              <button
                key={k}
                onClick={() => setKategori(k)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  kategori === k
                    ? "bg-[#011f6d] text-white shadow-sm"
                    : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-[#011f6d]/10 hover:text-[#011f6d] dark:hover:text-white"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
