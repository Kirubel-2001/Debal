import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Edit2,
  Save,
  X,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/User/userSlice";
import Footer from "../../components/Footer";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [editData, setEditData] = useState({ ...profileData });
  
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (currentUser?.user) {
      const userData = {
        name: currentUser.user.name || "",
        email: currentUser.user.email || "",
        phone: currentUser.user.phone || "",
      };
      setProfileData(userData);
      setEditData(userData);
    }
  }, [currentUser]);

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
    setUpdateError(null);
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
    setUpdateError(null);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSave = async () => {
    if (!currentUser?.user?.id) return;

    // Validate password if provided
    if (passwordData.newPassword || passwordData.confirmPassword) {
      if (!passwordData.newPassword || !passwordData.confirmPassword) {
        setUpdateError("Please fill in both password fields or leave them empty");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        setUpdateError("Password must be at least 6 characters long");
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setUpdateError("Passwords do not match");
        return;
      }
    }

    try {
      setUpdateError(null);
      setUpdateSuccess(false);
      dispatch(updateUserStart());

      const updatePayload = { ...editData };
      if (passwordData.newPassword) {
        updatePayload.password = passwordData.newPassword;
      }

      const response = await axiosInstance.put(
        `/user/update/${currentUser.user.id}`,
        updatePayload
      );

      const updatedUserData = {
        user: response.data,
        accessToken: currentUser.accessToken,
      };

      dispatch(updateUserSuccess(updatedUserData));
      setProfileData(editData);
      setPasswordData({ newPassword: "", confirmPassword: "" });
      setIsEditing(false);
      setUpdateSuccess(true);

      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";
      setUpdateError(errorMessage);
      dispatch(updateUserFailure(errorMessage));
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setIsEditing(false);
    setUpdateError(null);
  };

  if (!currentUser?.user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">
            Please sign in to view your profile
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {updateSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Profile updated successfully!
          </motion.div>
        )}

        {/* Error Message */}
        {(updateError || error) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {updateError || error}
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-8 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {profileData.name}
                </h2>
              </div>
              <div className="flex gap-2">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-indigo-600 mt-1" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 block mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-600 mt-1" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 block mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-600 mt-1" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 block mb-1">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-indigo-600 mt-1" />
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 block mb-1">
                      New Password {!isEditing && "(optional)"}
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <input
                          type={showPassword.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            handlePasswordChange("newPassword", e.target.value)
                          }
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Leave empty to keep current"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword.new ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-900">••••••••</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-indigo-600 mt-1" />
                    <div className="flex-1">
                      <label className="text-sm text-gray-500 block mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            handlePasswordChange("confirmPassword", e.target.value)
                          }
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword.confirm ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;