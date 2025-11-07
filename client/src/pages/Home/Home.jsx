import { useState } from "react";
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
import RoomsCard from "../../components/RoomsCard.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearchParams = (params) => {
    setSearchParams(params);
  };

  const handleLoading = (loading) => {
    setIsSearching(loading);
  };

  const handleError = (error) => {
    setSearchError(error);
    setSearchResults(null);
  };

  const handleReset = () => {
    setSearchResults(null);
    setSearchParams(null);
    setSearchError(null);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilter
          onSearchResults={handleSearchResults}
          onSearchParams={handleSearchParams}
          onLoading={handleLoading}
          onError={handleError}
          onReset={handleReset}
        />
      </div>

      <FeaturedListings />

      <div
        id="listings"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {searchError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{searchError}</p>
          </div>
        )}
        {isSearching ? (
          <LoadingSpinner message="Loading rooms..." />
        ) : (
          <RoomsCard
            searchResults={searchResults}
            searchParams={searchParams}
            onResetSearch={handleReset}
          />
        )}
      </div>

      <StatsSection />
      <FeaturedSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Home;