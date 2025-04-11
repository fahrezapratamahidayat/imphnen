"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "./toast-provider";

export function DeviceAlertDialog() {
    const [isVisible, setIsVisible] = useState(true);
    const { showToast } = useToast();

    const closeDialog = () => {
        setIsVisible(false);

        // tampilin toast peringatan
        showToast("Anjir, ngeyel! Nanti meleduk!", "error", 8000);

        // tambahin efek getaran pada halaman setelah beberapa detik
        setTimeout(() => {
            // buat efek getaran dengan mengubah transform
            document.body.classList.add("shake-effect");

            // hapus class setelah animasi selesai
            setTimeout(() => {
                document.body.classList.remove("shake-effect");
            }, 1000); // 1 detik

            // tampilin pesan kedua setelah efek getaran
            showToast(
                "HP semakin panas... sudah mulai berasap! 🔥",
                "warning",
                5000
            );
        }, 3000); // 3 detik
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm sm:hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                        }}
                        className="relative w-full max-w-md"
                    >
                        <div className="relative bg-white rounded-xl overflow-hidden shadow-xl border-2 border-red-100">
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <svg width="100%" height="100%">
                                    <pattern
                                        id="warning-pattern"
                                        x="0"
                                        y="0"
                                        width="20"
                                        height="20"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M0 10h20M10 0v20"
                                            stroke="#ef4444"
                                            strokeWidth="0.5"
                                        />
                                    </pattern>
                                    <rect
                                        x="0"
                                        y="0"
                                        width="100%"
                                        height="100%"
                                        fill="url(#warning-pattern)"
                                    />
                                </svg>
                            </div>
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2"></div>
                            <div className="p-5 flex items-start">
                                <div className="flex-shrink-0 mr-4">
                                    <motion.div
                                        className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl"
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            repeatType: "loop",
                                        }}
                                    >
                                        ⚠️
                                    </motion.div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        HP Anda Kentang!
                                    </h3>
                                    <p className="text-red-500 text-sm font-medium">
                                        Peringatan untuk potato device
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 py-3">
                                <p className="text-gray-700 mb-3">
                                    Kami mendeteksi perangkat Anda memiliki
                                    spesifikasi rendah yang mungkin menyebabkan:
                                </p>

                                <ul className="space-y-2 mb-4">
                                    {[
                                        "Lag parah",
                                        "Mual-mual",
                                        "Demam berlebihan",
                                        "Frustasi tingkat tinggi",
                                    ].map((issue, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.3 + index * 0.1,
                                            }}
                                            className="flex items-center text-gray-700"
                                        >
                                            <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 text-red-500 flex-shrink-0">
                                                ×
                                            </span>
                                            <span>{issue}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="bg-amber-50 border border-dashed border-amber-200 rounded-lg p-3 mb-4">
                                    <p className="text-amber-800 text-sm">
                                        <span className="font-bold">
                                            Rekomendasi:
                                        </span>{" "}
                                        Daripada memaksakan perangkat Anda,
                                        lebih baik tutup situs ini dan lakukan
                                        aktivitas yang lebih cocok untuk HP
                                        kentang.
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 flex flex-col space-y-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        window.open(
                                            "https://www.facebook.com",
                                            "_blank"
                                        )
                                    }
                                    className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                    >
                                        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                                    </svg>
                                    Betul mending buka fesbuk aja
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={closeDialog}
                                    className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                                >
                                    Bodo Amat Pengen Lanjut!😡
                                </motion.button>
                            </div>
                            <div className="px-6 py-2 text-center">
                                <p className="text-gray-400 text-xs">
                                    IMPHNEN tidak bertanggung jawab atas
                                    kerusakan HP Anda, mending scroll fesbuk aja
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
