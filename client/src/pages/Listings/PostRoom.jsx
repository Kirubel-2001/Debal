import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ArrowLeft,
  Upload,
  X,
  MapPin,
  DollarSign,
  BedDouble,
  Wifi,
  Car,
  Utensils,
  Zap,
  Droplet,
  Wind,
  Tv,
  CheckCircle,
  AlertCircle,
  Hotel,
  Building2,
  Building,
  DoorOpen,
  Caravan,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";

function PostRoom() {
  // `currentStep` state is removed.
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    roomType: "",
    gender: "",
    amenities: [],
    contactPhone: "",
    photos: [],
  });

  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("room");
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment");

  const accommodationTypes = [
    { value: "room", label: "Room", icon: Hotel },
    { value: "property", label: "Whole property", icon: Building2 },
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: Building },
    { value: "condominium", label: "Condominium", icon: Building2 },
    { value: "house", label: "House", icon: Home },
  ];

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Image upload handlers remain the same
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previewImages.length > 5) {
      setErrors((prev) => ({ ...prev, photos: "Maximum 5 photos allowed" }));
      return;
    }

    const newPreviews = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
    setErrors((prev) => ({ ...prev, photos: "" }));
  };

  const removeImage = (imageId) => {
    setPreviewImages((prev) => prev.filter((img) => img.id !== imageId));
    // Note: You might also want to update formData.photos here if you're sending files
  };

  // `validateStep` is replaced with a single `validateForm` function
  const validateForm = () => {
    const newErrors = {};

    // --- Validation from Step 1 ---
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.description.length < 50)
      newErrors.description = "Description must be at least 50 characters";

    // --- Validation from Step 2 ---
    if (!formData.price) newErrors.price = "Price is required";
    if (formData.price < 1000)
      newErrors.price = "Price must be at least 1000 ETB";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.roomType) newErrors.roomType = "Room type is required";
    if (!formData.gender) newErrors.gender = "Gender preference is required";

    // --- Validation from Step 3 ---

    if (
      formData.contactPhone &&
      !/^(?:\+251|0)?[79]\d{8}$/.test(formData.contactPhone)
    ) {
      newErrors.contactPhone = "Please enter a valid Ethiopian phone number";
    }
    if (previewImages.length === 0)
      newErrors.photos = "At least one photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // `nextStep` and `prevStep` are removed.

  // `handleSubmit` now calls the single `validateForm` function
  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate API call
      console.log("Form Submitted:", formData);
      setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
    } else {
      console.log("Validation Failed:", errors);
      // Optional: Scroll to the first error
    }
  };

  // `steps` array is removed.

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <Navbar/>
<motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-5 text-center text-3xl md:text-4xl font-bold text-indigo-600 mb-2"
            >
              Got a spare room?
              <span className="text-xl block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Post it on Debal for free!
              </span>
            </motion.h1>
     

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* `AnimatePresence` for steps is removed. The form is just one block. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {/* All form content is now in one block, separated by headings */}

          {/* --- Section 1: Basic Info --- */}
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Listing Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Cozy Studio Apartment in Bole"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                placeholder="Describe your room in detail... (minimum 50 characters)"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {formData.description.length} / 50 characters minimum
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Room Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Room details</h2>

            {/* Accommodation Type */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                Accommodation type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {accommodationTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedAccommodation(type.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAccommodation === type.value
                          ? "border-teal-400 bg-teal-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`h-6 w-6 ${
                              selectedAccommodation === type.value
                                ? "text-teal-500"
                                : "text-gray-600"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              selectedAccommodation === type.value
                                ? "text-teal-700"
                                : "text-gray-700"
                            }`}
                          >
                            {type.label}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedAccommodation === type.value
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedAccommodation === type.value && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                Property type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {propertyTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPropertyType(type.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPropertyType === type.value
                          ? "border-teal-400 bg-teal-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`h-5 w-5 ${
                              selectedPropertyType === type.value
                                ? "text-teal-500"
                                : "text-gray-600"
                            }`}
                          />
                          <span
                            className={`font-medium text-sm ${
                              selectedPropertyType === type.value
                                ? "text-teal-700"
                                : "text-gray-700"
                            }`}
                          >
                            {type.label}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPropertyType === type.value
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPropertyType === type.value && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Rent */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Rent
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  Br
                </span>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.rent}
                  onChange={(e) =>
                    setFormData({ ...formData, rent: e.target.value })
                  }
                  className="w-full pl-12 pr-28 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  per month
                </span>
              </div>
            </div>
          </motion.div>

          {/* --- Section 3: Contact & Photos --- */}
          <hr className="my-8" />
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contact & Photos
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="+251................."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  errors.contactPhone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contactPhone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.contactPhone}
                </p>
              )}
            </div>

            {errors.contact && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.contact}
              </p>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Photos (Maximum 5)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {previewImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={img.url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {previewImages.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {errors.photos && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.photos}
                </p>
              )}

              <p className="text-sm text-gray-500">
                Upload up to 5 photos. First photo will be the cover image.
              </p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Submit Listing</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Success Modal  */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Listing Submitted!
              </h3>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.href = "/")} // Redirect to home
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Go to Home
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowSuccess(false);
                    // Reset the form
                    setFormData({
                      title: "",
                      description: "",
                      price: "",
                      location: "",
                      roomType: "",
                      gender: "",
                      amenities: [],
                      contactPhone: "",
                      photos: [],
                    });
                    setPreviewImages([]);
                    setErrors({});
                  }}
                  className="w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
                >
                  Post Another Room
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PostRoom;
