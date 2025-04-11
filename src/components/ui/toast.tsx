"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Toast({
  message,
  type = "error",
  duration = 5000,
  isOpen,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  // Menentukan warna berdasarkan tipe
  const getColors = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-400 text-green-800";
      case "error":
        return "bg-red-50 border-red-400 text-red-800";
      case "warning":
        return "bg-amber-50 border-amber-400 text-amber-800";
      case "info":
        return "bg-blue-50 border-blue-400 text-blue-800";
      default:
        return "bg-gray-50 border-gray-400 text-gray-800";
    }
  };

  // Mendapatkan ikon berdasarkan tipe
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "💥";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "ℹ️";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5, rotate: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: [-5, 5, 0] }}
            exit={{ opacity: 0, scale: 0.8, y: 10, rotate: -10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              rotate: { duration: 0.5 }
            }}
            className={`max-w-sm transform -rotate-2 shadow-lg rounded-lg overflow-hidden border-l-4 ${getColors()}`}
          >
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0 mr-3">
                <span className="text-2xl">{getIcon()}</span>
              </div>
              <div className="flex-1 pt-0.5">
                <motion.p
                  className="text-sm font-medium"
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    repeat: 2,
                    repeatType: "reverse",
                    duration: 0.3,
                    delay: 0.5
                  }}
                >
                  {message}
                </motion.p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={onClose}
                  className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 rounded-md p-1.5 hover:bg-gray-100"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
