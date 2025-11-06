import React, { useState, useEffect } from "react";
import { Pencil, Trash2, X, MapPin, Eye } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";
import RoomsDetailsCard from "../../components/RoomsDetailsCard";
import EditRoom from "./EditRoom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import LoadingSpinner from "../../components/LoadingSpinner";

function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        setLoading(true);
        const statusParam =
          filterStatus !== "all" ? `?status=${filterStatus}` : "";
        const response = await axiosInstance.get(
          `/room/my-rooms${statusParam}`
        );
        const data = response.data;

        if (data.success) {
          setRooms(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRooms();
  }, [filterStatus]);

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setShowDetailsModal(true);
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleDeleteClick = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      const response = await axiosInstance.delete(`/room/${selectedRoom._id}`);
      const data = response.data;

      if (data.success) {
        setRooms(rooms.filter((room) => room._id !== selectedRoom._id));
        setShowDeleteModal(false);
        setSelectedRoom(null);
      } else {
        alert(data.message || "Failed to delete room");
      }
    } catch (err) {
      alert("Failed to delete room");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (roomId, formDataToSend) => {
    try {
      const response = await axiosInstance.put(
        `/room/${roomId}`,
        formDataToSend
      );
      const data = response.data;

      if (data.success) {
        setRooms(rooms.map((room) => (room._id === roomId ? data.data : room)));
        setShowEditModal(false);
        setSelectedRoom(null);
      } else {
        alert(data.message || "Failed to update room");
      }
    } catch (err) {
      alert("Failed to update room");
      console.error(err);
      throw err;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your rooms..." />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div id="rooms" className="mt-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">My Rooms</h1>
        <p className="text-gray-500 mt-2">Manage the rooms you have created</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-white">
            {["all", "available", "rented"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition capitalize ${
                  filterStatus === status
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No rooms found. Start by creating your first room!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
            {rooms.map((room) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48 bg-linear-to-br from-indigo-400 to-purple-400">
                  {room.images && room.images.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                      {room.title}
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        room.status === "available"
                          ? "bg-green-100 text-green-700"
                          : room.status === "rented"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(room)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-indigo-50 transition"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-indigo-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteClick(room)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {room.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2 capitalize">
                    <MapPin className="w-4 h-4 mr-2 shrink-0" />
                    <span className="text-sm">{room.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mb-4">
                    {room.rent?.toLocaleString()} ETB
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.accommodationType && (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs capitalize">
                        {room.accommodationType}
                      </span>
                    )}
                    {room.gender && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs capitalize">
                        {room.gender}
                      </span>
                    )}
                    {room.propertyType && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">
                        {room.propertyType}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {room.description || "No description available"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(room)}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      <EditRoom
        show={showEditModal}
        room={selectedRoom}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdate}
      />

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Room
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete "{selectedRoom?.title}"? This
                  action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDelete}
                    disabled={submitting}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetailsModal && selectedRoom && (
          <RoomsDetailsCard
            room={selectedRoom}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default MyRooms;
