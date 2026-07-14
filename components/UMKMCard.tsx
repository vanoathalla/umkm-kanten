"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, ImageOff } from "lucide-react";
import type { UMKM } from "@/data/umkm";

const kategoriColor: Record<string, string> = {
  Makanan:   "bg-orange-50 text-orange-600 border-orange-100",
  Minuman:   "bg-sky-50 text-sky-600 border-sky-100",
  Kerajinan: "bg-amber-50 text-amber-700 border-amber-100",
  Fashion:   "bg-pink-50 text-pink-600 border-pink-100",
  Pertanian: "bg-amber-50 text-amber-700 border-amber-100",
  Jasa:      "bg-violet-50 text-violet-600 border-violet-100",
  Lainnya:   "bg-gray-50 text-gray-500 border-gray-100",
};

/** Tampilkan Image hanya kalau src tidak kosong */
function SafeImage({ src, alt, fill, width, height, className, sizes, loading }: {
  src: string; alt: string; fill?: boolean;
  width?: number; height?: number;
  className?: string; sizes?: string;
  loading?: "lazy" | "eager";
}) {
  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-white/5">
        <ImageOff size={24} className="text-gray-300 dark:text-gray-600" />
      </div>
    );
  }
  if (fill) {
    return <Image src={src} alt={alt} fill className={className} sizes={sizes} loading={loading} />;
  }
  return <Image src={src} alt={alt} width={width!} height={height!} className={className} loading={loading} />;
}

export default function UMKMCard({ umkm }: { umkm: UMKM }) {
  return (
    <Link
      href={`/umkm/${umkm.id}`}
      className="group block bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-[#ffaa4d]/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-white/5">
        <SafeImage
          src={umkm.cover}
          alt={umkm.nama}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {umkm.cover && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />}

        {/* Kategori badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${kategoriColor[umkm.kategori] || kategoriColor["Lainnya"]}`}>
            {umkm.kategori}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/10 shrink-0 border border-gray-100 dark:border-white/10 flex items-center justify-center">
            {umkm.logo
              ? <Image src={umkm.logo} alt={`Logo ${umkm.nama}`} width={40} height={40} className="object-cover" />
              : <span className="text-xs font-bold text-gray-400">{umkm.nama.charAt(0)}</span>
            }
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-[#011f6d] dark:group-hover:text-[#ffaa4d] transition-colors truncate">
              {umkm.nama}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="text-gray-300 shrink-0" />
              <span className="text-[11px] text-gray-400 truncate">{umkm.rt}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {umkm.deskripsi}
        </p>

        <div className="flex items-center justify-end">
          <span className="flex items-center gap-1 text-xs font-semibold text-[#011f6d] dark:text-[#ffaa4d] group-hover:gap-2 transition-all">
            Detail <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}
