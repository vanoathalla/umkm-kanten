import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import SearchSection from "@/components/home/SearchSection";
import FeaturedUMKM from "@/components/home/FeaturedUMKM";
import AboutSection from "@/components/home/AboutSection";
import MapOverview from "@/components/home/MapOverview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SearchSection />
      <FeaturedUMKM />
      <AboutSection />
      <MapOverview />
      <CTASection />
    </>
  );
}
