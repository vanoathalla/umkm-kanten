import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import SearchSection from "@/components/home/SearchSection";
import AboutSection from "@/components/home/AboutSection";
import MapOverview from "@/components/home/MapOverview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
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
