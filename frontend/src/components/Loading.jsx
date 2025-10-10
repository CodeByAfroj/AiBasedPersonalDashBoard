// NestedLoader.jsx
import { motion } from "framer-motion";

export default function Loadin() {
  return (
    <div className="flex items-center justify-center h-24 w-24">
      {/* Outer circle */}
      <motion.div
        className="absolute border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
      {/* Inner circle */}
      <motion.div
        className="border-4 border-yellow-400 border-t-transparent rounded-full w-8 h-8"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
    </div>
  );
}
