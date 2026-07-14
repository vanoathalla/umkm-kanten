import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Direktori UMKM Desa Kanten | Imogiri, Bantul",
  description:
    "Temukan berbagai produk unggulan UMKM Desa Kanten, Kecamatan Imogiri, Kabupaten Bantul secara mudah dalam satu website.",
  keywords: "UMKM Desa Kanten, Imogiri, Bantul, produk lokal, katalog UMKM, Yogyakarta",
  openGraph: {
    title: "Direktori UMKM Desa Kanten",
    description: "Katalog digital UMKM Desa Kanten, Imogiri, Bantul",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white text-gray-900`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
