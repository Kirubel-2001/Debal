import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleScrollTo = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-50">
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
                onClick={() => handleScrollTo("home")}
                className="text-gray-700 hover:text-indigo-600 transition cursor-pointer"
              >
                Home
              </a>
              <a
                onClick={() => handleScrollTo("search")}
                className="text-gray-700 hover:text-indigo-600 transition cursor-pointer"
              >
                Browse Rooms
              </a>
              <a
                onClick={() => handleScrollTo("how-it-works")}
                className="text-gray-700 hover:text-indigo-600 transition cursor-pointer"
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/signin")}
                    className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                  >
                    Sign In
                  </motion.button>
                )}
              </div>
            </div>

            {/* Mobile Menu - Only BurgerMenu */}
            <div className="md:hidden">
              <BurgerMenu />
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
