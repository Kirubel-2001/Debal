import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  AlertCircle,
  Hotel,
  Building2,
  Building,
  Home,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

function SelectionButton({ selected, onClick, icon: Icon, label }) {
  return (
    <button
  type="button"
  onClick={onClick}
  className={`relative flex flex-col items-center justify-center p-0.5 rounded-xl transition-all duration-300
    ${selected ? "bg-linear-to-r from-indigo-600 to-purple-600" : "bg-gray-200/60 hover:bg-gray-300/60"}
  `}
>
  <div
    className={`flex flex-col items-center justify-center w-full h-full rounded-[10px] px-4 py-4 transition-all
      ${selected
        ? "bg-indigo-50 text-indigo-700"
        : "bg-white text-gray-700"
      }`}
  >
    {Icon && (
      <Icon
        className={`w-6 h-6 mb-2 ${
          selected ? "text-indigo-700" : "text-gray-600"
        }`}
      />
    )}
    <span className="text-sm font-medium">{label}</span>
  </div>
</button>

  );
}

function EditRoom({ show, room, onClose, onUpdate }) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    accommodationType: "room",
    propertyType: "apartment",
    gender: "male",
    rent: "",
    phone: "",
    status: "available",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const accommodationTypes = [
    { value: "room", label: "Room", icon: Hotel },
    { value: "property", label: "Whole property", icon: Building2 },
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: Building },
    { value: "condominium", label: "Condominium", icon: Building2 },
    { value: "house", label: "House", icon: Home },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "any", label: "Any" },
  ];

  const locations = [
    "Bole",
    "Kirkos",
    "Lemle",
    "Cazanchis",
    "Mekanisa",
    "Piassa",
    "Gulele",
    "Addis Ketema",
    "Yeka",
    "Akaki",
  ];

  useEffect(() => {
    if (room) {
      setFormData({
        title: room.title,
        description: room.description,
        location: room.location,
        accommodationType: room.accommodationType,
        propertyType: room.propertyType,
        gender: room.gender,
        rent: room.rent,
        phone: room.phone,
        status: room.status,
        images: room.images,
      });
      setPreviewImages(room.images || []);
      setNewImages([]);
    }
    if (show) {
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
  } else {
    // Re-enable when modal closes
    document.body.style.overflow = "auto";
  }

  // Clean up when component unmounts
  return () => {
    document.body.style.overflow = "auto";
  };
  }, [room, show]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (newImages.length > 0) {
      newImages.forEach((image) => {
        formDataToSend.append("images", image);
      });
    }

    try {
      await onUpdate(room._id, formDataToSend);
      setNewImages([]);
      setPreviewImages([]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
            {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[95vh]">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center ">
              <h2 className="text-2xl font-bold text-gray-900">Edit Room</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Title and Location */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Listing Title & Location
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Apartment in Bole"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="w-48">
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="">Select Location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc.toLowerCase()}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Accommodation Type */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  Accommodation type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {accommodationTypes.map((type) => (
                    <SelectionButton
                      key={type.value}
                      selected={formData.accommodationType === type.value}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          accommodationType: type.value,
                        })
                      }
                      icon={type.icon}
                      label={type.label}
                    />
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {genderOptions.map((type) => (
                    <SelectionButton
                      key={type.value}
                      selected={formData.gender === type.value}
                      onClick={() =>
                        setFormData({ ...formData, gender: type.value })
                      }
                      label={type.label}
                    />
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  Property type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {propertyTypes.map((type) => (
                    <SelectionButton
                      key={type.value}
                      selected={formData.propertyType === type.value}
                      onClick={() =>
                        setFormData({ ...formData, propertyType: type.value })
                      }
                      icon={type.icon}
                      label={type.label}
                    />
                  ))}
                </div>
              </div>

              {/* Rent */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  Rent
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    Br
                  </span>
                  <input
                    type="number"
                    name="rent"
                    placeholder="0"
                    value={formData.rent}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-28 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500 transition-all"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    per month
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe your room in detail..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+251................."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  required
                />
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                </select>
              </div>

              <hr className="my-8" />

              {/* Images */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Upload Photos
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload new images
                    </span>
                  </label>
                </div>
                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {previewImages.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700  py-3  transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {submitting ? "Updating..." : "Update Room"}
                </button>
              </div>
            </form>
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditRoom;
