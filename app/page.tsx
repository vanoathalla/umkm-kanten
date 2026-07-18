import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import SearchSection from "@/components/home/SearchSection";
import AboutSection from "@/components/home/AboutSection";
import MapOverview from "@/components/home/MapOverview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Direktori UMKM Desa Kanten",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://umkmkanten.com",
    "description": "Temukan berbagai produk unggulan UMKM Desa Kanten, Kecamatan Imogiri, Kabupaten Bantul secara mudah dalam satu website.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL || "https://umkmkanten.com"}/umkm?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero is above-fold — render immediately */}
      <HeroSection />

      {/* Everything below is deferred with content-visibility */}
      <div className="below-fold">
        <StatsSection />
      </div>
      <div className="below-fold">
        <SearchSection />
      </div>
      <div className="below-fold">
        <AboutSection />
      </div>
      <div className="below-fold">
        <MapOverview />
      </div>
      <div className="below-fold">
        <CTASection />
      </div>
    </>
  );
}
