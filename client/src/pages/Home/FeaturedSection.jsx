import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Search, TrendingUp, Shield, Clock } from "lucide-react";

export default function FeaturedSection() {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Easy Search",
      description:
        "Find your perfect room with our simple search and filter system",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Listings",
      description:
        "All listings are moderated to ensure quality and authenticity",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Response",
      description: "Connect directly with room owners and get fast responses",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Best Prices",
      description: "Competitive pricing across Addis Ababa neighborhoods",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <div>
      <section className="pt-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Debal?
            </h2>
            <p className="text-xl text-gray-600">
              We make finding a room simple and secure
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
