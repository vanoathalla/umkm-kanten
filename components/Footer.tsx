import Link from "next/link";
import { MapPin, Phone, Mail, Copyright, Code } from "lucide-react";

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#011f6d] text-white/65 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-[#ffaa4d] rounded-xl flex items-center justify-center">
                <span className="text-[#011f6d] font-bold text-lg aksara" aria-hidden="true">ꦏ</span>
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">Desa Kanten</p>
                <p className="text-[#ffaa4d] text-xs">Direktori UMKM</p>
              </div>
            </div>
            <p className="aksara text-[#ffaa4d]/50 text-base tracking-widest mb-3" aria-hidden="true">ꦱꦸꦩꦸꦂꦢꦺꦱꦏꦤ꧀ꦠꦺꦤ꧀</p>
            <p className="text-white/65 text-sm leading-relaxed mb-5 max-w-xs">
              Media promosi digital UMKM Desa Kanten, Kecamatan Imogiri, Kabupaten Bantul, D.I. Yogyakarta.
            </p>
            <div className="flex gap-2">
              <a href="#" aria-label="Instagram Desa Kanten" className="w-9 h-9 bg-white/10 hover:bg-[#ffaa4d] hover:text-[#011f6d] text-white/65 rounded-lg flex items-center justify-center transition-all duration-200">
                <IconInstagram size={15} />
              </a>
              <a href="#" aria-label="Facebook Desa Kanten" className="w-9 h-9 bg-white/10 hover:bg-[#ffaa4d] hover:text-[#011f6d] text-white/65 rounded-lg flex items-center justify-center transition-all duration-200">
                <IconFacebook size={15} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigasi">
            <p className="text-white text-sm font-semibold mb-4">Navigasi</p>
            <ul className="space-y-2">
              {[
                { href: "/",             label: "Beranda" },
                { href: "/umkm",         label: "Daftar UMKM" },
                { href: "/peta-potensi", label: "Peta Potensi" },
                { href: "/tentang",      label: "Tentang Desa" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 hover:text-[#ffaa4d] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Kontak Desa</p>
            <address className="not-italic space-y-3 text-sm">
              <p className="flex items-start gap-2.5 text-white/65">
                <MapPin size={14} className="text-[#ffaa4d] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Desa Kanten, Kec. Imogiri, Kab. Bantul, DIY 55782</span>
              </p>
              <p className="flex items-center gap-2.5 text-white/65">
                <Phone size={14} className="text-[#ffaa4d] shrink-0" aria-hidden="true" />
                <a href="tel:+02741234567" className="hover:text-[#ffaa4d] transition-colors">(0274) 123456</a>
              </p>
              <p className="flex items-center gap-2.5 text-white/65">
                <Mail size={14} className="text-[#ffaa4d] shrink-0" aria-hidden="true" />
                <a href="mailto:desafkanten@gmail.com" className="hover:text-[#ffaa4d] transition-colors">desafkanten@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <div className="flex items-center gap-1.5">
            <Copyright size={11} aria-hidden="true" />
            <span>2025 Direktori UMKM Desa Kanten. Hak cipta dilindungi.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Code size={11} aria-hidden="true" />
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
