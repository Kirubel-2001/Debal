import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";
import RoomsCard from "../../components/RoomsCard";
import EditRoom from "./EditRoom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

        {!loading && rooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No rooms found. Start by creating your first room!
            </p>
          </div>
        ) : (
          <RoomsCard
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            showActions={true}
            searchResults={{
              rooms: rooms,
              pagination: {
                currentPage: 1,
                totalPages: 1,
                totalRooms: rooms.length,
              },
            }}
            showStatus={true}
          />
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
    </div>
  );
}

export default MyRooms;