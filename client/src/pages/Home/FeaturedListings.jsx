// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
export default function FeaturedListing() {
  return (
    <div>
      {/* Featured Listings */}
      <section id="listings" className="px-4 sm:px-6 lg:px-8">
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            
            <p className="text-xl text-gray-600">
              Discover the best rooms available right now
            </p>
          </motion.div>

          
      </section>
    </div>
  );
}
