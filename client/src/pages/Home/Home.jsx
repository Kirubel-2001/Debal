import {
  HeroSection,
  StatsSection,
  FeaturedListings,
  FeaturedSection,
  HowItWorks,
  CTASection,
} from "./HomeExportBarrel.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import SearchAndFilter from "../../components/SearchAndFilter";

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Search and Filter */}
      <SearchAndFilter />

      {/* Featured Listings */}
      <FeaturedListings />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturedSection />

      {/* How It Works */}
      <HowItWorks />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
