import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <div>
      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Room?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of users finding their perfect living space in
              Addis Ababa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Rooms
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
              >
                Post Your Room
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
