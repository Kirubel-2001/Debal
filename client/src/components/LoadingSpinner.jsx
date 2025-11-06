// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function LoadingSpinner({ size = "md", fullScreen = true, message = "" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-20 w-20",
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`rounded-full border-4 border-gray-200 border-t-indigo-600 ${spinnerSize}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {message && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;
