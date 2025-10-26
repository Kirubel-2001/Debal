import React, { useState } from "react";
import { Search, MapPin, DollarSign } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
export default function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  return (
    <div>
      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="">Select Location</option>
              <option value="bole">Bole</option>
              <option value="piassa">Piassa</option>
              <option value="arat-kilo">Arat Kilo</option>
              <option value="kazanchis">Kazanchis</option>
              <option value="megenagna">Megenagna</option>
            </select>
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="">Price Range</option>
              <option value="0-5000">Below 5,000 ETB</option>
              <option value="5000-10000">5,000 - 10,000 ETB</option>
              <option value="10000-15000">10,000 - 15,000 ETB</option>
              <option value="15000+">Above 15,000 ETB</option>
            </select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>Search Rooms</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
