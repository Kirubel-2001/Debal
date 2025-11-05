// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import RoomsCard from "../../components/RoomsCard";
export default function FeaturedListing() {
  return (
    <div>
      {/* Featured Listings */}
      <section id="listings" className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Rooms
            </h2>
            <p className="text-xl text-gray-600">
              Discover the best rooms available right now
            </p>
          </motion.div>

          <RoomsCard />
        </div>
      </section>
    </div>
  );
}
