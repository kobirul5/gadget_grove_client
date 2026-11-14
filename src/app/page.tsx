import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import HeroSection from "@/components/home/HeroSection";
import NewTrendsSection from "@/components/home/NewTrendsSection";
import PopularCategoriesSection from "@/components/home/PopularCategoriesSection";
import PromoBannersSection from "@/components/home/PromoBannersSection";
import TopBrandProductsSection from "@/components/home/TopBrandProductsSection";
import TrendingNowSection from "@/components/home/TrendingNowSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PopularCategoriesSection />
      <NewTrendsSection />
      <FeaturedProductsSection />
      <PromoBannersSection />
      <FlashSaleSection />
      <TrendingNowSection />
      <TopBrandProductsSection />
    </main>
  );
}
