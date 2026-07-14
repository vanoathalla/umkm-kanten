"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  MapPin, Clock, Phone, ShoppingBag,
  Share2, ChevronLeft, CheckCircle, XCircle, ExternalLink,
  MessageCircle, Tag, Globe, ImageOff
} from "lucide-react";
import type { UMKM } from "@/data/umkm";
import UMKMCard from "@/components/UMKMCard";
import QRCodeModal from "@/components/QRCodeModal";

/* ── helpers ── */
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const kategoriColor: Record<string, string> = {
  Makanan:   "bg-orange-100 text-orange-700",
  Minuman:   "bg-sky-100 text-sky-700",
  Kerajinan: "bg-amber-100 text-amber-700",
  Fashion:   "bg-pink-100 text-pink-700",
  Pertanian: "bg-amber-100 text-amber-700",
  Jasa:      "bg-violet-100 text-violet-700",
  Lainnya:   "bg-gray-100 text-gray-600",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0,
  }).format(price);
}

/* Step card — navy semua, konsisten */
const stepAccent = { bg: "bg-[#011f6d]", text: "text-white" };

export default function UMKMDetailClient({ umkm, related }: { umkm: UMKM; related: UMKM[] }) {
  const hasProduk = Array.isArray(umkm.produk) && umkm.produk.length > 0;
  const hasGaleri = Array.isArray(umkm.galeri) && umkm.galeri.filter(g => g).length > 0;

  // Only show tabs that have content
  type Tab = "info" | "produk" | "galeri";
  const availableTabs: Tab[] = ["info", ...(hasProduk ? ["produk" as Tab] : []), ...(hasGaleri ? ["galeri" as Tab] : [])];

  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [showQR, setShowQR]       = useState(false);
  const [galeriIdx, setGaleriIdx] = useState<number | null>(null);
  const [loaded, setLoaded]       = useState(false);

  const { ref: infoRef, inView: infoIn } = useInView();
  const { ref: produkRef, inView: produkIn } = useInView();
  const { ref: relatedRef, inView: relatedIn } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://umkm-kanten.vercel.app/umkm/${umkm.id}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: umkm.nama, text: umkm.deskripsi, url: currentUrl });
    } else {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link disalin ke clipboard!");
    }
  };

  const orderSteps = [
    { title: "Hubungi WhatsApp", desc: "Chat langsung dengan pemilik untuk tanya produk dan harga." },
    { title: "Datang Langsung", desc: "Kunjungi lokasi UMKM untuk melihat produk secara langsung." },
    umkm.shopee    ? { title: "Pesan via Shopee",    desc: "COD dan pengiriman ke seluruh Indonesia." } : null,
    umkm.instagram ? { title: "DM Instagram",        desc: "Hubungi via DM Instagram untuk pemesanan." } : null,
  ].filter(Boolean) as { title: string; desc: string }[];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Cover ── */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden mt-16 bg-[#011f6d]">
        {umkm.cover ? (
          <>
            <Image src={umkm.cover} alt={umkm.nama} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-[#ffaa4d]/30 aksara text-6xl">{umkm.nama.charAt(0)}</span>
              <p className="text-white/40 text-sm mt-2">{umkm.nama}</p>
            </div>
          </div>
        )}

        {/* Back button */}
        <div className={`absolute top-4 left-4 transition-all duration-500 ${loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
          <Link
            href="/umkm"
            className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl text-sm hover:bg-black/50 transition-colors"
          >
            <ChevronLeft size={15} /> Kembali
          </Link>
        </div>

        {/* Action buttons */}
        <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-500 delay-100 ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
          <button
            onClick={() => setShowQR(true)}
            className="text-white bg-black/30 backdrop-blur-sm p-2.5 rounded-xl hover:bg-black/50 transition-colors"
            title="QR Code"
          >
            <Tag size={17} />
          </button>
          <button
            onClick={handleShare}
            className="text-white bg-black/30 backdrop-blur-sm p-2.5 rounded-xl hover:bg-black/50 transition-colors"
            title="Bagikan"
          >
            <Share2 size={17} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-24">

        {/* ── Header card ── */}
        <div
          className={`bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 sm:p-8 mb-5 border border-gray-100 dark:border-white/10 transition-all duration-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg shrink-0 bg-gray-100 flex items-center justify-center">
              {umkm.logo
                ? <Image src={umkm.logo} alt={`Logo ${umkm.nama}`} width={96} height={96} className="object-cover" />
                : <span className="text-2xl font-bold text-gray-400">{umkm.nama.charAt(0)}</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${kategoriColor[umkm.kategori] || kategoriColor["Lainnya"]}`}>
                  {umkm.kategori}
                </span>
                {umkm.featured && (
                  <span className="w-5 h-5 bg-[#ffaa4d] rounded-full flex items-center justify-center text-[#011f6d] text-[11px]">
                    ★
                  </span>
                )}
              </div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {umkm.nama}
              </h1>
              <p className="flex items-center gap-1.5 text-gray-400 text-sm">
                <MapPin size={13} className="text-[#ffaa4d] shrink-0" />
                {umkm.alamat}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-white/10">
            <a
              href={`https://wa.me/${umkm.whatsapp}?text=Halo%20${encodeURIComponent(umkm.nama)}%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 sm:flex-none justify-center text-sm"
            >
              <MessageCircle size={16} /> Pesan via WhatsApp
            </a>
            {umkm.shopee && (
              <a href={umkm.shopee} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 sm:flex-none justify-center text-sm">
                <ShoppingBag size={16} /> Shopee
              </a>
            )}
            {umkm.tokopedia && (
              <a href={umkm.tokopedia} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 sm:flex-none justify-center text-sm">
                <ShoppingBag size={16} /> Tokopedia
              </a>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        {availableTabs.length > 1 && (
        <div className="flex gap-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-1.5 shadow-sm mb-5">
          {availableTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#011f6d] text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              {tab === "info" ? "Informasi" : tab === "produk" ? `Produk (${umkm.produk.length})` : `Galeri (${umkm.galeri.filter(g=>g).length})`}
            </button>
          ))}
        </div>
        )}

        {/* ────────────────────────── TAB: INFO ────────────────────────── */}
        {activeTab === "info" && (
          <div ref={infoRef} className="grid sm:grid-cols-2 gap-4">

            {/* Tentang */}
            <div className={`sm:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-500 ${infoIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-3">Tentang {umkm.nama}</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-3">{umkm.deskripsi}</p>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed text-sm">{umkm.sejarah}</p>
            </div>

            {/* Jam Operasional */}
            <div className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-500 delay-100 ${infoIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-4">Jam Operasional</h2>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#ffaa4d]/15 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#ffaa4d]" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pt-1">{umkm.jamOperasional}</p>
              </div>
            </div>

            {/* Kontak */}
            <div className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-500 delay-150 ${infoIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-4">Kontak</h2>
              <div className="space-y-2.5">
                <a href={`https://wa.me/${umkm.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#011f6d] dark:hover:text-[#ffaa4d] transition-colors">
                  <div className="w-8 h-8 bg-[#011f6d]/8 dark:bg-[#ffaa4d]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={13} className="text-[#011f6d] dark:text-[#ffaa4d]" />
                  </div>
                  +{umkm.whatsapp}
                </a>
                {umkm.instagram && (
                  <a href={`https://instagram.com/${umkm.instagram}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-500 hover:text-pink-600 transition-colors">
                    <div className="w-8 h-8 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center shrink-0 text-pink-500">
                      <IconInstagram size={13} />
                    </div>
                    @{umkm.instagram}
                  </a>
                )}
                {umkm.facebook && (
                  <a href={`https://facebook.com/${umkm.facebook}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center shrink-0 text-blue-500">
                      <IconFacebook size={13} />
                    </div>
                    {umkm.facebook}
                  </a>
                )}
                {umkm.website && (
                  <a href={umkm.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#011f6d] transition-colors">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Globe size={13} className="text-gray-500" />
                    </div>
                    Website <ExternalLink size={11} className="text-gray-300" />
                  </a>
                )}
              </div>
            </div>

            {/* Lokasi / Maps */}
            <div className={`sm:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-500 delay-200 ${infoIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-3">Lokasi</h2>
              <p className="flex items-start gap-2 text-sm text-gray-400 mb-4">
                <MapPin size={14} className="text-[#ffaa4d] shrink-0 mt-0.5" />
                {umkm.alamat}
              </p>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src={`https://maps.google.com/maps?q=${umkm.alamat}&output=embed`}
                  className="w-full h-52 sm:h-60"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`Lokasi ${umkm.nama}`}
                />
              </div>
            </div>

            {/* ── Cara Pemesanan ── */}
            <div className={`sm:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-500 delay-300 ${infoIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <h2 className="font-bold text-gray-900 dark:text-white text-base mb-5">Cara Pemesanan</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {orderSteps.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 hover:border-[#ffaa4d]/30 transition-all group"
                    >
                      <div className={`w-8 h-8 ${stepAccent.bg} ${stepAccent.text} rounded-lg flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-110 transition-transform`}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <a
                href={`https://wa.me/${umkm.whatsapp}?text=Halo%20${encodeURIComponent(umkm.nama)}%2C%20saya%20ingin%20memesan%20produk%20Anda`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full justify-center text-sm py-3.5"
              >
                <MessageCircle size={17} /> Pesan Sekarang via WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ────────────────────────── TAB: PRODUK ────────────────────────── */}
        {activeTab === "produk" && (
          <div ref={produkRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {umkm.produk.map((p, i) => (
              <div
                key={p.id}
                className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:border-[#ffaa4d]/30 hover:shadow-md transition-all duration-300 ${produkIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="relative h-44 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                  {p.foto
                    ? <Image src={p.foto} alt={p.nama} fill className="object-cover" loading="lazy" />
                    : <ImageOff size={28} className="text-gray-300" />
                  }
                  <div className={`absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
                    p.status === "tersedia"
                      ? "bg-[#ffaa4d]/90 text-[#011f6d]"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {p.status === "tersedia" ? <CheckCircle size={11} /> : <XCircle size={11} />}
                    {p.status === "tersedia" ? "Tersedia" : "Habis"}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{p.nama}</h3>
                  <p className="text-base font-bold text-[#011f6d] dark:text-[#ffaa4d] mb-2">{formatPrice(p.harga)}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{p.deskripsi}</p>
                  {p.status === "tersedia" && (
                    <a
                      href={`https://wa.me/${umkm.whatsapp}?text=Halo%2C%20saya%20ingin%20memesan%20${encodeURIComponent(p.nama)}%20dari%20${encodeURIComponent(umkm.nama)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold w-full justify-center text-xs py-2.5"
                    >
                      <MessageCircle size={13} /> Pesan
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ────────────────────────── TAB: GALERI ────────────────────────── */}
        {activeTab === "galeri" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {umkm.galeri.filter(g => g).map((g, i) => (
              <button
                key={i}
                onClick={() => setGaleriIdx(i)}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
              >
                <Image src={g} alt={`Galeri ${umkm.nama} ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                <div className="absolute inset-0 bg-[#011f6d]/0 group-hover:bg-[#011f6d]/20 transition-colors" />
              </button>
            ))}
            {umkm.galeri.filter(g => g).length === 0 && (
              <div className="col-span-3 py-16 flex flex-col items-center gap-3 text-gray-300">
                <ImageOff size={32} />
                <p className="text-sm">Belum ada foto galeri</p>
              </div>
            )}
          </div>
        )}

        {/* ── UMKM Lainnya ── */}
        {related.length > 0 && (
          <div ref={relatedRef} className="mt-14">
            <h2 className={`text-lg font-bold text-gray-900 dark:text-white mb-5 transition-all duration-500 ${relatedIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              UMKM Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((u, i) => (
                <div
                  key={u.id}
                  className={`transition-all duration-500 ${relatedIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <UMKMCard umkm={u} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Gallery Lightbox ── */}
      {galeriIdx !== null && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setGaleriIdx(null)}
        >
          <div className="relative max-w-3xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image src={umkm.galeri[galeriIdx]} alt="Galeri" fill className="object-contain" />
            <button
              onClick={() => setGaleriIdx(null)}
              className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors text-sm"
            >
              ✕
            </button>
            {galeriIdx > 0 && (
              <button
                onClick={() => setGaleriIdx(galeriIdx - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-[#ffaa4d] hover:text-[#011f6d] transition-colors text-lg leading-none"
              >
                ‹
              </button>
            )}
            {galeriIdx < umkm.galeri.length - 1 && (
              <button
                onClick={() => setGaleriIdx(galeriIdx + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-[#ffaa4d] hover:text-[#011f6d] transition-colors text-lg leading-none"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── QR Modal ── */}
      {showQR && <QRCodeModal url={currentUrl} nama={umkm.nama} onClose={() => setShowQR(false)} />}
    </div>
  );
}
