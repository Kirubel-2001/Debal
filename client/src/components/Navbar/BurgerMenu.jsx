import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/User/userSlice";
import axiosInstance from "../../utils/axiosInstance";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      await axiosInstance.post("/auth/signout");
      dispatch(signOutUserSuccess());
      setOpen(false);
      navigate("/");
    } catch (error) {
      dispatch(
        signOutUserFailure(error.response?.data?.message || "Logout failed")
      );
    }
  };

  const handleScrollTo = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
        >
          <ul className="flex flex-col p-2 space-y-2">
            {/* These items only show on mobile (md:hidden) */}
            <li className="md:hidden">
              <button
                onClick={() => handleScrollTo("home")}
                className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
              >
                Home
              </button>
            </li>
            <li className="md:hidden">
              <button
                onClick={() => handleScrollTo("search")}
                className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
              >
                Browse Rooms
              </button>
            </li>
            <li className="md:hidden border-b pb-2">
              <button
                onClick={() => handleScrollTo("how-it-works")}
                className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
              >
                How It Works
              </button>
            </li>
            <li className="md:hidden  ">
              <button
                onClick={() =>
                  handleNavigation(currentUser ? "/post" : "/signup")
                }
                className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
              >
                Post Your Room
              </button>
            </li>

            {currentUser ? (
              <>
                <li>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/my-rooms")}
                    className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
                  >
                    My Rooms
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className=" md:hidden">
                <button
                  onClick={() => handleNavigation("/signin")}
                  className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default BurgerMenu;
