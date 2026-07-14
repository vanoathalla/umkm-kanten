"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useDarkMode } from "@/components/DarkModeProvider";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/umkm", label: "Daftar UMKM" },
  { href: "/peta-potensi", label: "Peta Potensi" },
  { href: "/tentang", label: "Tentang Desa" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { dark, toggle } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !menuOpen;
  // Navbar selalu navy kecuali: light mode + bukan homepage, atau light mode + homepage + sudah scroll
  // Pake dark langsung dari context yang sudah sync dengan DOM
  const darkBg = dark || isTransparent || (isHome && !scrolled);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : dark
          ? "bg-[#011f6d] shadow-sm"
          : isHome && !scrolled
          ? "bg-transparent"
          : isHome && scrolled
          ? "bg-[#011f6d] shadow-sm"
          : "bg-white shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 bg-[#ffaa4d] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <span className="text-[#011f6d] font-bold text-base leading-none aksara">ꦏ</span>
            </div>
            <div className="leading-tight">
              <p className={`font-bold text-sm transition-colors ${darkBg ? "text-white" : "text-[#011f6d]"}`}>
                Desa Kanten
              </p>
              <p className="text-[#ffaa4d] text-[10px] font-medium">Direktori UMKM</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? darkBg ? "text-white" : "text-[#011f6d]"
                      : darkBg
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-gray-500 hover:text-[#011f6d] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-[#ffaa4d] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                darkBg
                  ? "text-white/60 hover:text-white hover:bg-white/10"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                darkBg
                  ? "text-white/60 hover:text-white hover:bg-white/10"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`border-t px-4 py-3 space-y-1 ${dark ? "bg-[#011f6d] border-white/10" : "bg-white border-gray-100"}`}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? dark
                      ? "bg-white/10 text-white"
                      : "bg-[#011f6d]/5 text-[#011f6d]"
                    : dark
                    ? "text-white/60 hover:bg-white/5 hover:text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#011f6d]"
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa4d] shrink-0" />}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
