import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  X,
  MapPin,
  Home,
  Calendar,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function RoomsDetailsCard({ room, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 useEffect(() => {
    document.body.style.overflow = "hidden"; // stop background scroll
    return () => {
      document.body.style.overflow = "auto"; // restore on close
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700";
      case "rented":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (room.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (room.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl max-w-lg w-full my-8 shadow-2xl overflow-hidden"
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>

          {room.images && room.images.length > 0 ? (
            <div className="relative h-56 bg-gray-200">
              <img
                src={room.images[currentImageIndex]}
                alt={`${room.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {room.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-800" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-800" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-2 py-0.5 rounded-full text-white text-xs">
                    {currentImageIndex + 1} / {room.images.length}
                  </div>
                </>
              )}

              {room.status && (
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                      room.status
                    )}`}
                  >
                    {room.status}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-56 bg-linear-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
              <div className="text-white text-center">
                <Home className="w-10 h-10 mx-auto mb-2" />
                <p className="text-lg font-semibold">{room.title}</p>
              </div>
            </div>
          )}

          {room.images && room.images.length > 1 && (
            <div className="flex gap-1.5 p-2 overflow-x-auto bg-gray-50">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition ${
                    currentImageIndex === index
                      ? "border-indigo-600"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {room.title}
            </h2>
            <div className="flex items-center text-gray-600 mb-2 capitalize">
              <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
              <span className="text-xs">{room.location}</span>
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              {room.rent?.toLocaleString()} ETB
              <span className="text-sm text-gray-500 font-normal">/month</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {room.accommodationType && (
              <div className="flex items-center space-x-1.5 text-gray-700">
                <Home className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-semibold text-xs capitalize">
                    {room.accommodationType}
                  </p>
                </div>
              </div>
            )}

            {room.propertyType && (
              <div className="flex items-center space-x-1.5 text-gray-700">
                <Home className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Property</p>
                  <p className="font-semibold text-xs capitalize">
                    {room.propertyType}
                  </p>
                </div>
              </div>
            )}

            {room.createdAt && (
              <div className="flex items-center space-x-1.5 text-gray-700">
                <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Listed</p>
                  <p className="font-semibold text-xs">
                    {new Date(room.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {room.description && (
            <div className="mb-3">
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                Description
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {room.description}
              </p>
            </div>
          )}

          {room.amenities && room.amenities.length > 0 && (
            <div className="mb-3">
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium capitalize"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {room.phone && (
            <div className="mb-3">
              <a
                href={`tel:${room.phone}`}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{room.phone}</span>
              </a>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold text-xs"
          >
            Save for Later
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}