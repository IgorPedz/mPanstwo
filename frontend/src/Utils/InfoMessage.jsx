import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function InfoMessage({ message, type = "success", onClose }) {
  // type: "success" | "error" | "info"
  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const Icon = type === "success" ? CheckCircleIcon : type === "error" ? XMarkIcon : CheckCircleIcon;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-between p-3 rounded mb-4 shadow ${colors[type]}`}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{message}</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700 transition"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}