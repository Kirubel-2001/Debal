// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icons
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/User/userSlice";
import axios from "axios";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

    const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      await axios.post("/api/auth/signout"); // your backend API route
      dispatch(signOutUserSuccess());
      navigate("/"); // optional redirect to home page after logout
    } catch (error) {
      dispatch(
        signOutUserFailure(error.response?.data?.message || "Logout failed")
      );
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100 transition "
      >
        {open && currentUser ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
        >
          <ul className="flex flex-col p-2 space-y-2">
            <li>
              <a href="/profile" className="block px-4 py-2 hover:bg-indigo-50 rounded">Profile</a>
            </li>
            <li>
              <a href="/my-rooms" className="block px-4 py-2 hover:bg-indigo-50 rounded">My Rooms</a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-indigo-50 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default BurgerMenu;