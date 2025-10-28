import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import RoomDetailsForm from "./RoomDetailsForm";
import PhotoUpload from "./PhotoUpload";
import SuccessModal from "./SuccessModal";
import Footer from "../../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";

function PostRoom() {
  const { currentUser } = useSelector((state) => state.user);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    accommodationType: "room",
    propertyType: "apartment",
    gender: "male",
    rent: "",
    description: "",
    phone: "",
    owner: currentUser.user.id,
  });
  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previewImages.length > 5) {
      setErrors((prev) => ({ ...prev, photos: "Maximum 5 photos allowed" }));
      return;
    }

    const newPreviews = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setErrors((prev) => ({ ...prev, photos: "" }));
  };

  const removeImage = (imageId) => {
    setPreviewImages((prev) => {
      const image = prev.find((img) => img.id === imageId);
      if (image) URL.revokeObjectURL(image.url);
      return prev.filter((img) => img.id !== imageId);
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.rent) newErrors.rent = "Rent is required";
    if (formData.rent < 200) newErrors.rent = "Rent must be at least 200 ETB";
    if (!formData.location) newErrors.location = "Location is required";
    if (formData.phone && !/^(?:\+251|0)?[79]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Ethiopian phone number";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (previewImages.length === 0)
      newErrors.photos = "At least one photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const res = await axios.post("/api/room/create", formData);
      console.log("Response:", res.data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Post request failed:", error);
      if (error.response) {
        setErrors(
          error.response.data.message || "Post request failed. Please try again."
        );
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      accommodationType: "room",
      propertyType: "apartment",
      gender: "male",
      rent: "",
      description: "",
      phone: "",
    });
    previewImages.forEach((img) => URL.revokeObjectURL(img.url));
    setPreviewImages([]);
    setErrors({});
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <Navbar />

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

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {/* Room Details Form */}
          <RoomDetailsForm
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onFormDataChange={handleFormDataChange}
          />
          {/* Photo Upload */}

          <PhotoUpload
            previewImages={previewImages}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            error={errors.photos}
          />

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
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        onPostAnother={resetForm}
      />
      <Footer />
    </div>
  );
}

export default PostRoom;
