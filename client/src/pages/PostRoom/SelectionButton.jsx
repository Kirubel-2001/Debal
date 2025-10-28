// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function SelectionButton({ selected, onClick, icon: Icon, label }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all ${
        selected ? "border-teal-400 bg-teal-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className={`h-6 w-6 ${selected ? "text-teal-500" : "text-gray-600"}`} />}
          <span className={`font-medium ${selected ? "text-teal-700" : "text-gray-700"}`}>
            {label}
          </span>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-teal-500 bg-teal-500" : "border-gray-300"
        }`}>
          {selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
    </motion.button>
  );
}

export default SelectionButton;