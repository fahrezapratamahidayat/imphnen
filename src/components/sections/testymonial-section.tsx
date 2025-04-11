"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import TestimonialSlider from "../ui/TestimonialSlider";
import { useEffect, useState } from "react";
export default function TestymonialSection() {
    const [isMounted, setIsMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
        if (!isMounted) return;
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setCursorVisible(true);
        const handleMouseLeave = () => setCursorVisible(false);

        const section = document.getElementById("testimonials");
        if (section && isMounted) {
            section.addEventListener("mousemove", handleMouseMove);
            section.addEventListener("mouseenter", handleMouseEnter);
            section.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                section.removeEventListener("mousemove", handleMouseMove);
                section.removeEventListener("mouseenter", handleMouseEnter);
                section.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [isMounted]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return (
        <section
            id="testimonials"
            className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
        >
            <motion.div
                className="fixed w-6 h-6 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-md opacity-50 pointer-events-none z-50 sm:block hidden"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    opacity: cursorVisible ? 0.5 : 0,
                }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Blobs */}
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/50 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.3, 1], y: [0, 30, 0] }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Abstract Patterns */}
                <svg
                    className="absolute right-0 top-20 w-64 h-64 text-indigo-100 opacity-30"
                    viewBox="0 0 100 100"
                >
                    <circle cx="75" cy="50" r="20" fill="currentColor" />
                    <path
                        d="M20,20 L80,80"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M20,80 L80,20"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>

                <svg
                    className="absolute left-0 bottom-20 w-64 h-64 text-sky-100 opacity-30"
                    viewBox="0 0 100 100"
                >
                    <rect
                        x="20"
                        y="20"
                        width="60"
                        height="60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        rx="10"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                </svg>

                {/* Floating Elements */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-${i % 3 === 0 ? 2 : 1} h-${
                            i % 3 === 0 ? 2 : 1
                        } rounded-full ${
                            i % 3 === 0
                                ? "bg-sky-400/30"
                                : i % 3 === 1
                                ? "bg-indigo-400/30"
                                : "bg-purple-400/30"
                        }`}
                        style={{
                            top: `${10 + Math.random() * 80}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* Decorative Lines */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-12 w-px h-8 bg-gradient-to-b from-transparent to-sky-300"></div>
                            <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-transparent to-sky-300"></div>

                            {/* Headline with 3D effect */}
                            <div className="relative inline-block">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                <div className="relative inline-block bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-medium mb-4 transform -rotate-2 shadow-md">
                                    Suara Komunitas
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
                                Para{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                                    Filosofi Programmer
                                </span>
                            </h2>

                            {/* Accent Graphic */}
                            <div className="inline-block relative">
                                <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                                    Kisah mereka yang yang sudah join{" "}
                                    <span className="text-sky-500">
                                        IMPHNEN
                                    </span>
                                    yang sudah tidak capek-capek ngoding
                                </p>
                                <svg
                                    className="absolute -right-12 top-0 w-10 h-10 text-sky-400/30 animate-spin-slow"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M9.59,4.65C10.35,4.24 11.25,4 12.18,4c2.88,0 5.23,2.35 5.23,5.23 0,1.46 -0.61,2.79 -1.58,3.74l-0.71,0.71 -0.71,-0.71c0.97,-0.96 1.58,-2.29 1.58,-3.74 0,-2.88 -2.35,-5.23 -5.23,-5.23 -0.93,0 -1.83,0.24 -2.59,0.65z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    </div>

                    {/* Intro Stats - Floating Tilted Cards */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {[
                            {
                                stat: "97%",
                                label: "Berkurang stres debugging",
                                icon: "😌",
                                color: "from-sky-500 to-blue-500",
                                rotate: "rotate-2",
                            },
                            {
                                stat: "10x",
                                label: "Lebih banyak waktu untuk ngopi",
                                icon: "☕",
                                color: "from-blue-500 to-indigo-500",
                                rotate: "-rotate-2",
                            },
                            {
                                stat: "∞",
                                label: "Scroll fesbuk",
                                icon: "💭",
                                color: "from-indigo-500 to-purple-500",
                                rotate: "rotate-1",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                className={`bg-white rounded-lg p-6 shadow-xl relative overflow-hidden border border-gray-100 w-64 transform ${card.rotate} hover:scale-105 transition-transform`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.1,
                                }}
                                whileHover={{
                                    y: -10,
                                    boxShadow:
                                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    rotate: 0,
                                }}
                            >
                                <div
                                    className={`h-1.5 bg-gradient-to-r ${card.color} absolute top-0 left-0 right-0`}
                                ></div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-4xl">{card.icon}</div>
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xs text-gray-400 border border-gray-100">
                                        STAT
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-gray-800 mb-1">
                                    {card.stat}
                                </div>
                                <div className="text-gray-600 text-sm">
                                    {card.label}
                                </div>
                                <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full opacity-70"></div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative mb-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm transform -rotate-1">
                                <h3 className="font-bold text-xl text-gray-800 flex items-center">
                                    <span className="text-sky-500 mr-2">#</span>
                                    <span>SuaraMember</span>
                                    <span className="text-sky-500 ml-2">#</span>
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <TestimonialSlider />
                    </div>
                    <motion.div
                        className="mt-8 mx-auto max-w-lg text-center relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-amber-50 p-5 rounded-lg shadow-md transform rotate-1 relative">
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-red-300 rounded-sm"></div>
                            <p className="text-sm text-gray-700 font-handwriting">
                                Semua testimoni 100% asli, hanya sedikit
                                dilebih-lebihkan. Namun &quot;sedikit&quot;
                                adalah konsep relatif di IMPHNEN, seperti halnya
                                skill coding member IMPHNEN;
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sm text-gray-600 mb-6 relative inline-block">
                            <span className="relative z-10">
                                Anggota kami datang dari berbagai sepuh scroll
                                fesbuk
                            </span>
                            <motion.span
                                className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-200 -z-10"
                                animate={{
                                    width: ["0%", "100%", "100%"],
                                    left: ["50%", "0%", "0%"],
                                }}
                                transition={{
                                    duration: 1,
                                    delay: 0.5,
                                    ease: "easeOut",
                                }}
                            ></motion.span>
                        </p>

                        <motion.div
                            className="flex flex-wrap justify-center items-center gap-8 opacity-60"
                            animate={{
                                x: [0, -20, 0],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {[
                                { name: "gak tau", style: "font-serif" },
                                { name: "gak tau", style: "font-mono" },
                                {
                                    name: "gak tau",
                                    style: "font-bold italic",
                                },
                                {
                                    name: "gak tau",
                                    style: "tracking-widest",
                                },
                                { name: "gak tau", style: "font-light" },
                            ].map((company, i) => (
                                <div
                                    key={i}
                                    className={`text-gray-500 text-xl ${company.style}`}
                                >
                                    {company.name}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                    <div className="mt-24 mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 transform -rotate-1 rounded-xl shadow-lg"></div>
                        <motion.div
                            className="relative bg-white m-1 p-8 md:p-10 rounded-lg shadow-inner border border-gray-100 transform rotate-0"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-sky-400"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-indigo-400"></div>
                            <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-indigo-400"></div>
                            <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-sky-400"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left">
                                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-10">
                                    <div className="flex items-center justify-center md:justify-start mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.svg
                                                key={i}
                                                className="w-5 h-5 text-yellow-400"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 10, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    delay: i * 0.2,
                                                    repeat: Infinity,
                                                }}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </motion.svg>
                                        ))}
                                        <span className="ml-2 text-gray-600">
                                            4.9/5 dari 0 review nyata
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                                        Siap Berhenti{" "}
                                        <span className="relative">
                                            <span className="line-through">
                                                Coding
                                            </span>
                                            <motion.span
                                                className="absolute -bottom-1 left-0 right-0 h-1 bg-red-400 rounded-full"
                                                animate={{
                                                    scaleX: [1, 1.2, 1],
                                                    opacity: [0.7, 1, 0.7],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                }}
                                            ></motion.span>
                                        </span>{" "}
                                        dan Mulai{" "}
                                        <span className="text-sky-500">
                                            Bermalas-malasan
                                        </span>
                                        ?
                                    </h3>
                                    <p className="text-gray-600">
                                        Bergabunglah dengan ribuan anggota yang
                                        telah berevolusi dari programmer biasa
                                        menjadi proggamer yang bermalas-malasan.
                                    </p>
                                </div>
                                <div className="md:w-1/3">
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                            rotate: -2,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="transform rotate-2"
                                    >
                                        <a href="#community">
                                            <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white text-center px-6 py-3 rounded-lg font-medium shadow-xl">
                                                Bergabung Sekarang
                                            </Button>
                                        </a>
                                    </motion.div>
                                    <div className="mt-2 text-xs text-center text-gray-500">
                                        Tidak perlu coding skill, hanya perlu
                                        scroll fesbuk
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
