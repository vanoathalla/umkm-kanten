import Link from "next/link";
import { MapPin, Phone, Mail, Copyright, Code } from "lucide-react";

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#011f6d] text-white/60 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-[#ffaa4d] rounded-xl flex items-center justify-center">
                <span className="text-[#011f6d] font-bold text-lg aksara">ꦏ</span>
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">Desa Kanten</p>
                <p className="text-[#ffaa4d] text-xs">Direktori UMKM</p>
              </div>
            </div>
            {/* Aksara Jawa tagline */}
            <p className="aksara text-[#ffaa4d]/40 text-base tracking-widest mb-3">ꦱꦸꦩꦸꦂꦢꦺꦱꦏꦤ꧀ꦠꦺꦤ꧀</p>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              Media promosi digital UMKM Desa Kanten, Kecamatan Imogiri, Kabupaten Bantul, D.I. Yogyakarta.
            </p>
            <div className="flex gap-2">
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/8 hover:bg-[#ffaa4d] hover:text-[#011f6d] text-white/60 rounded-lg flex items-center justify-center transition-all duration-200">
                <IconInstagram size={15} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/8 hover:bg-[#ffaa4d] hover:text-[#011f6d] text-white/60 rounded-lg flex items-center justify-center transition-all duration-200">
                <IconFacebook size={15} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Navigasi</p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Beranda" },
                { href: "/umkm", label: "Daftar UMKM" },
                { href: "/peta-potensi", label: "Peta Potensi" },
                { href: "/tentang", label: "Tentang Desa" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 hover:text-[#ffaa4d] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Kontak Desa</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-white/40">
                <MapPin size={14} className="text-[#ffaa4d] mt-0.5 shrink-0" />
                <span>Desa Kanten, Kec. Imogiri, Kab. Bantul, DIY 55782</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/40">
                <Phone size={14} className="text-[#ffaa4d] shrink-0" />
                <span>(0274) 123456</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/40">
                <Mail size={14} className="text-[#ffaa4d] shrink-0" />
                <span>desafkanten@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#ffaa4d]/60">
          <div className="flex items-center gap-1.5">
            <Copyright size={11} className="text-[#ffaa4d]/40" />
            <span>2025 Direktori UMKM Desa Kanten. Hak cipta dilindungi.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Code size={11} className="text-[#ffaa4d]/40" />
            <span>
              Dikembangkan oleh R. Revano Athalla Kartika
              {" "}— KKN UPN &quot;Veteran&quot; Yogyakarta Unit 84.038
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
