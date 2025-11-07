// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { PlusCircle, Search, MessageCircle } from "lucide-react";


export default function HeroSection() {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="pt-20  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your {" "}
              <span className=" bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Room in Addis Ababa
              </span>
            </h1>
            <p id="search" className="text-xl text-gray-600 max-w-2xl mx-auto flex items-center justify-center space-x-6">
  <span className="flex items-center space-x-1">
    <PlusCircle className="w-5 h-5 text-indigo-600" />
    <span>Free to list</span>
  </span>

  <span className="flex items-center space-x-1">
    <Search className="w-5 h-5 text-indigo-600" />
    <span>Search</span>
  </span>

  <span className="flex items-center space-x-1">
    <MessageCircle className="w-5 h-5 text-indigo-600" />
    <span>Communicate</span>
  </span>
</p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
