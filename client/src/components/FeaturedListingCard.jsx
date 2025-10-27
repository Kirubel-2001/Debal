import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function FeaturedListingCard() {
  // Sample featured listings
  const featuredListings = [
    {
      id: 1,
      title: "Cozy Studio in Bole",
      location: "Bole, Addis Ababa",
      price: 8000,
      image:
        "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Studio+Bole",
      roomType: "Private Room",
      gender: "Any",
      amenities: "WiFi, Kitchen, Parking",
    },
    {
      id: 2,
      title: "Cozy Studio in Bole",
      location: "Bole, Addis Ababa",
      price: 8000,
      image:
        "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Studio+Bole",
      roomType: "Private Room",
      gender: "Any",
      amenities: "WiFi, Kitchen, Parking",
    },
    {
      id: 3,
      title: "Cozy Studio in Bole",
      location: "Bole, Addis Ababa",
      price: 8000,
      image:
        "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Studio+Bole",
      roomType: "Private Room",
      gender: "Any",
      amenities: "WiFi, Kitchen, Parking",
    },
    
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  
  return (
    <div className="pb-32">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {featuredListings.map((listing) => (
        <motion.div
          key={listing.id}
          variants={itemVariants}
          whileHover={{ y: -10 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="relative h-48 bg-linear-to-br from-indigo-400 to-purple-400">
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
              {listing.title}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{listing.location}</span>
            </div>
            <div className="text-2xl font-bold text-indigo-600 mb-4">
              {listing.price.toLocaleString()} ETB
              <span className="text-sm text-gray-500">/month</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                {listing.roomType}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                {listing.gender}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {listing.amenities}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
    </div>
  );
}