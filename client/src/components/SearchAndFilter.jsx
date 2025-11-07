import { useState } from "react";
import { Search, MapPin, DollarSign, Loader2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";

export default function SearchAndFilter({
  onSearchResults,
  onLoading,
  onError,
  onSearchParams, // NEW: Add this prop
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      setIsSearching(true);
      if (onLoading) onLoading(true);
      if (onError) onError(null);

      const params = {
        status: "available",
        page: 1,
        limit: 6,
        sort: "-createdAt",
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (location) {
        params.location = location;
      }

      if (priceRange) {
        const [min, max] = priceRange.split("-");
        if (min) params.minRent = min;
        if (max && max !== "+") params.maxRent = max;
      }

      // Send search params to parent
      if (onSearchParams) {
        onSearchParams(params);
      }

      const response = await axiosInstance.get("/room/rooms", { params });

      if (response.data.success) {
        if (onSearchResults) {
          onSearchResults({
            rooms: response.data.data,
            pagination: response.data.pagination,
          });
        }
      }
    } catch (error) {
      console.error("Error searching rooms:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to search rooms";
      if (onError) onError(errorMessage);
    } finally {
      setIsSearching(false);
      if (onLoading) onLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-2 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-3 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Start your search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Locations</option>
              <option value="bole">Bole</option>
              <option value="piassa">Piassa</option>
              <option value="arat-kilo">Arat Kilo</option>
              <option value="kazanchis">Kazanchis</option>
              <option value="megenagna">Megenagna</option>
              <option value="6-kilo">6 Kilo</option>
              <option value="4-kilo">4 Kilo</option>
              <option value="lebu">Lebu</option>
              <option value="summit">Summit</option>
            </select>
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Prices</option>
              <option value="0-5000">Below 5,000 ETB</option>
              <option value="5000-10000">5,000 - 10,000 ETB</option>
              <option value="10000-15000">10,000 - 15,000 ETB</option>
              <option value="15000-20000">15,000 - 20,000 ETB</option>
              <option value="20000+">Above 20,000 ETB</option>
            </select>
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}