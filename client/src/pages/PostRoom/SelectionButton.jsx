// eslint-disable-next-line
import { motion } from "framer-motion";

function SelectionButton({ selected, onClick, icon: Icon, label }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-0.5 rounded-xl transition-all duration-300 ${
        selected
          ? "bg-linear-to-r from-indigo-600 to-purple-600"
          : "bg-gray-100/30 hover:bg-gray-200/50"
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-[10px] px-4 py-4 transition-all ${
          selected
            ? "bg-indigo-50 backdrop-blur-sm text-indigo-700"
            : "bg-white backdrop-blur-sm text-gray-700"
        }`}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon
              className={`h-6 w-6 ${
                selected ? "text-indigo-700" : "text-gray-600"
              }`}
            />
          )}
          <span className="font-medium">{label}</span>
        </div>
        
      </div>
    </motion.button>
  );
}

export default SelectionButton;
