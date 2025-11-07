import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  Clock,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import RoomsDetailsCard from "./RoomsDetailsCard";
import LoadingSpinner from "./LoadingSpinner";

export default function RoomsCard({
  onViewDetails,
  onEdit,
  onDelete,
  showActions = false,
  searchResults = null,
  onResetSearch = null,
  showStatus = false,
  searchParams = null, // NEW: Add this prop to receive search parameters
}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [activeSearchParams, setActiveSearchParams] = useState(null);

  useEffect(() => {
    if (searchResults) {
      setIsSearchMode(true);
      setActiveSearchParams(searchParams);
      setListings(searchResults.rooms);
      setPagination(searchResults.pagination);
      setCurrentPage(searchResults.pagination.currentPage);
      setLoading(false);
    } else if (searchResults === null && isSearchMode) {
      // Reset to normal mode
      setIsSearchMode(false);
      setActiveSearchParams(null);
      setCurrentPage(1);
      fetchRooms(1);
    }
  }, [searchResults, searchParams]);

  useEffect(() => {
    if (!searchResults) {
      if (isSearchMode && activeSearchParams) {
        // Fetch with search parameters
        fetchRoomsWithSearch(currentPage, activeSearchParams);
      } else {
        // Fetch normally
        fetchRooms(currentPage);
      }
    }
  }, [currentPage]);

  const fetchRooms = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        limit: 6,
        page: page,
        sort: "-createdAt",
      };
      if (!showActions) {
        params.status = "available";
      }
      const response = await axiosInstance.get("/room/rooms", { params });

      if (response.data.success) {
        setListings(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError(err.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomsWithSearch = async (page, searchParameters) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        ...searchParameters,
        page: page,
        limit: 6,
      };

      const response = await axiosInstance.get("/room/rooms", { params });

      if (response.data.success) {
        setListings(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error("Error fetching rooms with search:", err);
      setError(err.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setCurrentPage(newPage);

      const section = document.getElementById("listings");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleViewDetails = (room) => {
    if (onViewDetails) {
      onViewDetails(room);
    } else {
      setSelectedRoom(room);
      setIsDetailsOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  const handleEdit = (room, e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(room);
    }
  };

  const handleDelete = (room, e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(room);
    }
  };

  const handleResetClick = () => {
    setIsSearchMode(false);
    setActiveSearchParams(null);
    if (onResetSearch) {
      onResetSearch();
    }
    setCurrentPage(1);
    fetchRooms(1);
  };

  const getPageNumbers = () => {
    if (!pagination) return [];

    const totalPages = pagination.totalPages;
    const current = currentPage;
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMs = now - created;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInHours < 24) {
      if (diffInHours === 0) {
        if (diffInMinutes === 0) {
          return "Just now";
        }
        return `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`;
      }
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
      const options = { month: "short", day: "numeric", year: "numeric" };
      return created.toLocaleDateString("en-US", options);
    }
  };

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

  if (loading) {
    return <LoadingSpinner message="Loading rooms..." />;
  }

  if (error) {
    return (
      <div className="pb-32 flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              if (isSearchMode) {
                handleResetClick();
              } else {
                fetchRooms(currentPage);
              }
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="pb-32 flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">
            {isSearchMode
              ? "No rooms found matching your search criteria."
              : "No rooms available at the moment."}
          </p>
          {isSearchMode && onResetSearch && (
            <button
              onClick={handleResetClick}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-15 max-w-7xl mx-auto">
      <motion.div
        key={currentPage}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {listings.map((listing) => (
          <motion.div
            key={listing._id}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative h-48 bg-linear-to-br from-indigo-400 to-purple-400">
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                  {listing.title}
                </div>
              )}
              <div className="absolute top-3 right-3">
                {showStatus ? (
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        listing.status === "available"
                          ? "bg-green-100 text-green-700"
                          : listing.status === "rented"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {listing.status}
                    </span>
                    {listing.createdAt && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-90 text-gray-700 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{getTimeAgo(listing.createdAt)}</span>
                      </span>
                    )}
                  </div>
                ) : (
                  listing.createdAt && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-90 text-gray-700 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(listing.createdAt)}</span>
                    </span>
                  )
                )}
              </div>
              {showActions && (
                <div className="absolute top-3 left-3 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleEdit(listing, e)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-indigo-50 transition"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4 text-indigo-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleDelete(listing, e)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {listing.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-2 capitalize">
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span className="text-sm">{listing.location}</span>
              </div>
              <div className="text-2xl font-bold text-indigo-600 mb-4">
                {listing.rent?.toLocaleString()} ETB
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.accommodationType && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs capitalize">
                    {listing.accommodationType}
                  </span>
                )}
                {listing.gender && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs capitalize">
                    {listing.gender}
                  </span>
                )}
                {listing.propertyType && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">
                    {listing.propertyType}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {listing.description ||
                  listing.amenities?.join(", ") ||
                  "No description available"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewDetails(listing)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-12">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mt-4 text-gray-600">
            <p>
              Page {currentPage} of {pagination.totalPages} (
              {pagination.totalRooms} total rooms)
            </p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isDetailsOpen && selectedRoom && (
          <RoomsDetailsCard
            room={selectedRoom}
            onClose={handleCloseDetails}
            showStatus={showStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}