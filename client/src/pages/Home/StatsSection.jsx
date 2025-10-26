import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "500+", label: "Active Listings" },
    { number: "1000+", label: "Happy Users" },
    { number: "50+", label: "Neighborhoods" },
    { number: "24/7", label: "Support" },
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
      {/* Stats Section */}
      <section className="py-12 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-indigo-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
