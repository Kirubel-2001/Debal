import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Home, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="cursor-pointer bg-white shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <Home className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Debal
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </a>
              <a
                href="#listings"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Browse Rooms
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                How It Works
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Post a Room
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-indigo-600">
                  Home
                </a>
                <a
                  href="#listings"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Browse Rooms
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  How It Works
                </a>
                <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                  Post a Room
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
