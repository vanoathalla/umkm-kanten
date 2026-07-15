"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { kategoriList } from "@/data/umkm";

interface Props {
  query: string;
  setQuery: (v: string) => void;
  kategori: string;
  setKategori: (v: string) => void;
}

export default function SearchFilter({ query, setQuery, kategori, setKategori }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 sm:p-5 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama UMKM atau produk..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#011f6d]/25 dark:focus:ring-[#ffaa4d]/25 text-sm transition"
        />
      </div>

      {/* Filter chips */}
      <div className="flex items-start gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1 shrink-0">
          <SlidersHorizontal size={13} />
          <span>Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {kategoriList.map((k) => (
            <button
              key={k}
              onClick={() => setKategori(k)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                kategori === k
                  ? "bg-[#011f6d] text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-[#011f6d]/10 hover:text-[#011f6d] dark:hover:text-white"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
