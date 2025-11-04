import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Home, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/User/userSlice";
import axiosInstance from "../../utils/axiosInstance";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleScrollTo = (id) => {
    if (window.location.pathname !== "/") {
      // Navigate to home first
      navigate("/", { state: { scrollTo: id } });
    } else {
      // Already on home, just scroll
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      await axiosInstance.post("/auth/signout"); // your backend API route
      dispatch(signOutUserSuccess());
      navigate("/"); // optional redirect to home page after logout
    } catch (error) {
      dispatch(
        signOutUserFailure(error.response?.data?.message || "Logout failed")
      );
    }
  };

  return (
    <div className="sticky top-0 z-100">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="cursor-pointer bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <Home className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Debal
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                onClick={()=>handleScrollTo("home")}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </a>
              <a
                onClick={() => handleScrollTo("search")}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Browse Rooms
              </a>
              <a
                onClick={() => handleScrollTo("how-it-works")}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                How It Works
              </a>

              <div className="flex items-center space-x-3">
                <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(currentUser ? "/post" : "/signup")}
                      className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
                    >
                      Post a Room
                    </motion.button>
                {currentUser ? (
                  <BurgerMenu />
                  
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/signin")}
                      className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                    >
                      Sign In
                    </motion.button>
                  </>
                )}
                    
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-4">
                <a
                  onClick={() => navigate("/")}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Home
                </a>
                <a
                  onClick={() => handleScrollTo("search")}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Browse Rooms
                </a>
                <a
                  onClick={() => handleScrollTo("how-it-works")}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  How It Works
                </a>

                {currentUser ? (
                  <>
                    <a
                      onClick={() => navigate("/profile")}
                      className="text-gray-700 hover:text-indigo-600"
                    >
                      Profile
                    </a>
                    <a
                      onClick={() => navigate("/my-rooms")}
                      className="text-gray-700 hover:text-indigo-600"
                    >
                      My Rooms
                    </a>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-500 border border-red-500 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/signin")}
                      className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg"
                    >
                      Sign In
                    </button>
                  </>
                )}
                    <button
                      onClick={() => navigate(currentUser ? "/post" : "/signup")}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                      Post a Room
                    </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
