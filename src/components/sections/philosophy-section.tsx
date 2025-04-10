"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function PhilosophySection() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <section
            className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden"
            id="philosophy"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/neuron-bg.svg')] opacity-5 bg-repeat"></div>
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -30, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Geometric decorative shapes */}
                <motion.div
                    className="absolute top-20 right-[15%] w-16 h-16 border-4 border-sky-300/30 rounded-lg"
                    animate={{ rotate: [0, 360], scale: [1, 0.9, 1] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute bottom-24 left-[10%] w-12 h-12 border-4 border-indigo-300/30 rounded-full"
                    animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute top-1/3 left-[7%] w-10 h-10"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full text-sky-300/30"
                    >
                        <path
                            d="M50 0 L100 50 L50 100 L0 50 Z"
                            fill="currentColor"
                        />
                    </svg>
                </motion.div>

                {/* Floating code elements */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-sky-500/20 font-mono text-xs md:text-sm"
                        style={{
                            top: `${15 + Math.random() * 75}%`,
                            left: `${5 + Math.random() * 90}%`,
                            transform: `rotate(${Math.random() * 20 - 10}deg)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.7, 0],
                            y: [20, -30, 20],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 8,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    >
                        {
                            [
                                "function understand() { /* logic > syntax */ }",
                                "const knowledge = concepts.map(c => understand(c));",
                                "class Programmer { constructor(mindset) { this.problemSolving = true; } }",
                                "// Kode hanya alat, pemikiran adalah esensi",
                                "import { concepts } from 'deep-understanding';",
                            ][i]
                        }
                    </motion.div>
                ))}
            </div>

            {/* Abstract SVG Shapes */}
            <motion.div
                className="absolute top-10 right-[10%] w-20 h-20 opacity-30"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <circle cx="50" cy="50" r="30" fill="url(#grad1)" />
                    <defs>
                        <linearGradient
                            id="grad1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            <motion.div
                className="absolute bottom-16 left-[15%] w-24 h-24 opacity-20"
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <path
                        d="M20,20 L80,20 L80,80 L20,80 Z"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="5"
                    />
                    <path
                        d="M30,30 L70,30 L70,70 L30,70 Z"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="5"
                    />
                    <path
                        d="M40,40 L60,40 L60,60 L40,60 Z"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="5"
                    />
                </svg>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Floating highlight bubbles */}
                <motion.div
                    className="absolute -top-10 -left-5 w-20 h-20 rounded-full bg-gradient-to-br from-sky-500/10 to-blue-500/10 backdrop-blur-sm p-4 flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="text-sky-500 text-3xl">🔍</span>
                </motion.div>

                <motion.div
                    className="absolute bottom-5 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm p-3 flex items-center justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="text-indigo-500 text-2xl">💡</span>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    {/* Header with 3D effect */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-gray-800">
                                Filosofi{" "}
                                <span className="relative">
                                    Kami
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-400"></span>
                                </span>
                            </h2>
                            <div className="mt-2 flex justify-center space-x-1">
                                {[
                                    "Berpikir",
                                    "•",
                                    "Memahami",
                                    "•",
                                    "Menyelesaikan",
                                ].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.1 * i }}
                                        viewport={{ once: true }}
                                        className="text-sm text-gray-500"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
                        {/* Left column - Brain visualization with enhanced 3D effect */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="md:w-1/2"
                        >
                            <div className="relative perspective-element">
                                {/* 3D Card */}
                                <motion.div
                                    whileHover={{
                                        transform: `perspective(1000px) rotateX(5deg) rotateY(-5deg)`,
                                    }}
                                    className="rounded-2xl p-1 bg-gradient-to-r from-sky-400 to-indigo-500 shadow-xl transform-gpu"
                                >
                                    <div className="bg-white rounded-xl p-6 relative">
                                        {/* Brain visualization */}
                                        <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                                            {/* Path curves */}
                                            <svg
                                                className="absolute inset-0 w-full h-full"
                                                viewBox="0 0 400 400"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M50,200 Q125,100 200,200 T350,200"
                                                    stroke="url(#path-gradient)"
                                                    strokeWidth="3"
                                                    fill="none"
                                                    opacity="0.2"
                                                />
                                                <path
                                                    d="M200,50 Q250,125 200,200 T200,350"
                                                    stroke="url(#path-gradient-2)"
                                                    strokeWidth="3"
                                                    fill="none"
                                                    opacity="0.2"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="path-gradient"
                                                        x1="0%"
                                                        y1="0%"
                                                        x2="100%"
                                                        y2="0%"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor="#38bdf8"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor="#818cf8"
                                                        />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="path-gradient-2"
                                                        x1="0%"
                                                        y1="0%"
                                                        x2="0%"
                                                        y2="100%"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor="#818cf8"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor="#38bdf8"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>

                                            {/* Pulsing circles */}
                                            {[...Array(4)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`absolute inset-0 rounded-full ${
                                                        [
                                                            "bg-sky-400/30",
                                                            "bg-indigo-400/30",
                                                            "bg-blue-400/30",
                                                            "bg-cyan-400/30",
                                                        ][i]
                                                    }`}
                                                    initial={{
                                                        opacity: 0.2,
                                                    }}
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [
                                                            0.1, 0.3, 0.1,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 4 + i,
                                                        repeat: Infinity,
                                                        delay: i * 0.5,
                                                    }}
                                                />
                                            ))}

                                            {/* Brain core with 3D shadow */}
                                            <motion.div
                                                className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                                                animate={{
                                                    boxShadow: [
                                                        "0 0 30px rgba(56,189,248,0.2)",
                                                        "0 0 50px rgba(56,189,248,0.4)",
                                                        "0 0 30px rgba(56,189,248,0.2)",
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                }}
                                            >
                                                {/* 3D-styled brain emoji */}
                                                <div className="relative transform-gpu transition-all hover:scale-105">
                                                    <div className="text-7xl md:text-8xl filter drop-shadow-[0_10px_8px_rgba(0,0,0,0.04)]">
                                                        🧠
                                                    </div>

                                                    {/* Glow effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-indigo-400/10 rounded-full filter blur-xl"></div>
                                                </div>
                                            </motion.div>

                                            {/* Outer glow */}
                                            <div className="absolute inset-12 bg-gradient-to-r from-sky-400/5 to-indigo-400/5 rounded-full filter blur-2xl"></div>

                                            {/* Knowledge particles with trailing effect */}
                                            {[...Array(12)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                                                    style={{
                                                        top: `${
                                                            50 +
                                                            (Math.random() *
                                                                40 -
                                                                20)
                                                        }%`,
                                                        left: `${
                                                            50 +
                                                            (Math.random() *
                                                                40 -
                                                                20)
                                                        }%`,
                                                    }}
                                                    animate={{
                                                        scale: [0, 1, 0],
                                                        opacity: [0, 0.8, 0],
                                                        x: [
                                                            0,
                                                            Math.random() * 60 -
                                                                30,
                                                        ],
                                                        y: [
                                                            0,
                                                            Math.random() * 60 -
                                                                30,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration:
                                                            3 +
                                                            Math.random() * 2,
                                                        repeat: Infinity,
                                                        delay:
                                                            Math.random() * 3,
                                                    }}
                                                >
                                                    <div className="absolute top-0 left-0 w-full h-full bg-sky-400/40 rounded-full blur-sm transform scale-150"></div>
                                                </motion.div>
                                            ))}

                                            {/* Neural connections with animated gradients */}
                                            {[...Array(8)].map((_, i) => {
                                                const angle =
                                                    i * 45 * (Math.PI / 180);
                                                const length =
                                                    50 + (i % 3) * 15;

                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 origin-bottom"
                                                        style={{
                                                            height: `${length}px`,
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: `translate(-50%, -100%) rotate(${angle}rad)`,
                                                        }}
                                                        animate={{
                                                            opacity: [
                                                                0.3, 0.8, 0.3,
                                                            ],
                                                            height: [
                                                                `${length}px`,
                                                                `${
                                                                    length + 10
                                                                }px`,
                                                                `${length}px`,
                                                            ],
                                                        }}
                                                        transition={{
                                                            duration:
                                                                2 + (i % 3),
                                                            repeat: Infinity,
                                                            delay: i * 0.2,
                                                        }}
                                                    >
                                                        <motion.div
                                                            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                                                            animate={{
                                                                scale: [
                                                                    1, 1.5, 1,
                                                                ],
                                                                opacity: [
                                                                    0.7, 1, 0.7,
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 1.5,
                                                                repeat: Infinity,
                                                                delay: i * 0.2,
                                                            }}
                                                        />
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Enhanced concept tags with 3D effect */}
                                        {[
                                            {
                                                text: "Problem Solving",
                                                x: -20,
                                                y: -40,
                                                delay: 0.2,
                                            },
                                            {
                                                text: "Logika",
                                                x: 140,
                                                y: -10,
                                                delay: 0.5,
                                            },
                                            {
                                                text: "Algoritma",
                                                x: 120,
                                                y: 100,
                                                delay: 0.7,
                                            },
                                            {
                                                text: "Konsep",
                                                x: -120,
                                                y: 20,
                                                delay: 0.3,
                                            },
                                            {
                                                text: "Abstraksi",
                                                x: -100,
                                                y: 120,
                                                delay: 0.6,
                                            },
                                        ].map((tag, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute bg-white shadow-lg border border-gray-100 text-sky-500 px-3 py-1 rounded-lg text-xs md:text-sm font-medium transform-gpu"
                                                style={{
                                                    left: "50%",
                                                    top: "50%",
                                                }}
                                                initial={{
                                                    opacity: 0,
                                                    x: 0,
                                                    y: 0,
                                                    scale: 0.8,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: tag.x,
                                                    y: tag.y,
                                                    scale: 1,
                                                }}
                                                whileHover={{
                                                    scale: 1.1,
                                                    boxShadow:
                                                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                                                }}
                                                transition={{
                                                    delay: tag.delay,
                                                    duration: 0.7,
                                                    type: "spring",
                                                }}
                                                viewport={{ once: true }}
                                            >
                                                <div className="flex items-center">
                                                    {i === 0 && (
                                                        <span className="mr-1">
                                                            🔍
                                                        </span>
                                                    )}
                                                    {i === 1 && (
                                                        <span className="mr-1">
                                                            ⚙️
                                                        </span>
                                                    )}
                                                    {i === 2 && (
                                                        <span className="mr-1">
                                                            📊
                                                        </span>
                                                    )}
                                                    {i === 3 && (
                                                        <span className="mr-1">
                                                            💭
                                                        </span>
                                                    )}
                                                    {i === 4 && (
                                                        <span className="mr-1">
                                                            🧩
                                                        </span>
                                                    )}
                                                    {tag.text}
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* Connection lines between tags */}
                                        <svg
                                            className="absolute inset-0 w-full h-full pointer-events-none"
                                            viewBox="0 0 400 400"
                                        >
                                            <line
                                                x1="140"
                                                y1="160"
                                                x2="260"
                                                y2="190"
                                                stroke="rgba(56,189,248,0.2)"
                                                strokeWidth="1"
                                                strokeDasharray="5,5"
                                            />
                                            <line
                                                x1="140"
                                                y1="160"
                                                x2="80"
                                                y2="220"
                                                stroke="rgba(56,189,248,0.2)"
                                                strokeWidth="1"
                                                strokeDasharray="5,5"
                                            />
                                            <line
                                                x1="260"
                                                y1="190"
                                                x2="260"
                                                y2="300"
                                                stroke="rgba(56,189,248,0.2)"
                                                strokeWidth="1"
                                                strokeDasharray="5,5"
                                            />
                                            <line
                                                x1="80"
                                                y1="220"
                                                x2="100"
                                                y2="320"
                                                stroke="rgba(56,189,248,0.2)"
                                                strokeWidth="1"
                                                strokeDasharray="5,5"
                                            />
                                            <line
                                                x1="100"
                                                y1="320"
                                                x2="260"
                                                y2="300"
                                                stroke="rgba(56,189,248,0.2)"
                                                strokeWidth="1"
                                                strokeDasharray="5,5"
                                            />
                                        </svg>
                                    </div>
                                </motion.div>

                                {/* Decorative elements around the 3D card */}
                                <div className="absolute -top-5 -right-5 w-10 h-10 bg-gradient-to-r from-sky-200 to-indigo-200 rounded-full opacity-70"></div>
                                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-r from-sky-300 to-indigo-300 rounded-full opacity-70"></div>

                                {/* Floating code snippets */}
                                <motion.div
                                    className="absolute -left-16 top-1/4 bg-white p-2 rounded-lg shadow-lg text-xs font-mono text-gray-700 max-w-[140px] hidden md:block"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                        y: {
                                            repeat: Infinity,
                                            duration: 3,
                                        },
                                        opacity: {
                                            duration: 0.5,
                                            delay: 1,
                                        },
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center space-x-1 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    </div>
                                    <code className="text-sky-600">
                                        function{" "}
                                        <span className="text-indigo-600">
                                            think
                                        </span>
                                        () <br />
                                        &nbsp;&nbsp;return learn;
                                        <br />
                                        {")"}
                                    </code>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right column - Philosophy text with enhanced styling */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="md:w-1/2 text-center md:text-left"
                        >
                            <div className="inline-block bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 rounded-full text-white mb-3 text-sm font-medium">
                                Pendekatan Kami
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                                <span className="block mb-2">Filosofi</span>
                                <span className="bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text">
                                    Pemahaman &gt; Syntax
                                </span>
                            </h2>

                            <div className="space-y-6">
                                <motion.p
                                    className="text-xl leading-relaxed text-gray-600"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    Di{" "}
                                    <span className="text-sky-500 font-semibold">
                                        IMPHNEN
                                    </span>
                                    , kami percaya bahwa pemahaman konsep
                                    fundamental jauh lebih penting daripada
                                    menghafal syntax. Coding bukan tentang
                                    mengetik, tapi tentang{" "}
                                    <span className="text-indigo-500 font-medium">
                                        berpikir dan menyelesaikan masalah
                                    </span>
                                    .
                                </motion.p>

                                {/* Quote with enhanced styling */}
                                <motion.div
                                    className="relative py-5 px-6 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-lg"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="absolute top-5 left-0 transform -translate-y-1/2 translate-x-4 text-sky-400 text-4xl">
                                        &quot;
                                    </div>
                                    <p className="italic text-gray-600 relative z-10 text-center">
                                        Seorang pemrogram sejati memahami
                                        &quot;mengapa&quot; sebelum mempelajari
                                        &quot;bagaimana&quot;.
                                    </p>
                                    <div className="absolute bottom-0 right-0 transform translate-y-1/2 -translate-x-4 text-indigo-400 text-4xl">
                                        &quot;
                                    </div>
                                </motion.div>

                                <motion.p
                                    className="text-gray-600"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    viewport={{ once: true }}
                                >
                                    Pendekatan kami berfokus pada membangun
                                    fondasi yang kuat, di mana Anda akan
                                    memahami &quot;
                                    <span className="text-sky-500 font-medium">
                                        mengapa
                                    </span>
                                    &quot; di balik setiap konsep pemrograman,
                                    bukan hanya &quot;
                                    <span className="text-gray-700 font-medium">
                                        bagaimana
                                    </span>
                                    &quot; untuk menuliskannya.
                                </motion.p>

                                {/* Philosophy points with 3D cards */}
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    {[
                                        {
                                            title: "Konsep > Syntax",
                                            icon: "💡",
                                            desc: "Fokus pada pemahaman dasar",
                                        },
                                        {
                                            title: "Pemahaman > Menghafal",
                                            icon: "🧠",
                                            desc: "Kuasai logika, bukan hapalan",
                                        },
                                        {
                                            title: "Masalah > Kode",
                                            icon: "🔍",
                                            desc: "Analisis sebelum implementasi",
                                        },
                                        {
                                            title: "Logika > Bahasa",
                                            icon: "⚡",
                                            desc: "Platform-agnostic thinking",
                                        },
                                    ].map((point, i) => (
                                        <motion.div
                                            key={i}
                                            className="group relative bg-white shadow-md rounded-xl p-4 border border-gray-100 overflow-hidden transform-gpu"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay: 0.5 + i * 0.1,
                                            }}
                                            viewport={{ once: true }}
                                            whileHover={{
                                                y: -5,
                                                boxShadow:
                                                    "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)",
                                                background:
                                                    "linear-gradient(to bottom right, white, rgba(240, 249, 255, 1))",
                                            }}
                                        >
                                            {/* Decorative corner accent */}
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-bl-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                            <div className="flex items-start space-x-3 relative z-10">
                                                <div className="text-3xl transform group-hover:scale-110 transition-transform">
                                                    {point.icon}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800">
                                                        {point.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        {point.desc}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hover indicator */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Call to action */}
                                <motion.div
                                    className="mt-8 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-5 relative overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-200/30 to-indigo-200/30 rounded-full -mr-10 -mt-10"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-200/30 to-sky-200/30 rounded-full -ml-6 -mb-6"></div>

                                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                Siap mengubah cara berpikir?
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Bergabunglah dengan komunitas
                                                yang memprioritaskan konsep
                                                daripada kode.
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full font-medium"
                                        >
                                            Mulai Sekarang
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional highlight section */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "🔄",
                                title: "Belajar - Praktik - Analisis",
                                description:
                                    "Metode kami berfokus pada siklus pemahaman, bukan menghafal kode.",
                                color: "from-sky-400/70 to-sky-300/70",
                            },
                            {
                                icon: "🛠️",
                                title: "Alat Berpikir",
                                description:
                                    "Kode hanyalah implementasi dari pola pikir pemecahan masalah.",
                                color: "from-indigo-400/70 to-indigo-300/70",
                            },
                            {
                                icon: "🌱",
                                title: "Berkembang Bersama",
                                description:
                                    "Komunitas yang mendukung perkembangan konseptual Anda.",
                                color: "from-cyan-400/70 to-sky-300/70",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="bg-white rounded-xl p-5 border border-gray-100 shadow-md relative overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 * i }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -5,
                                    boxShadow:
                                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                            >
                                <div
                                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} rounded-full -mr-10 -mt-10 opacity-20`}
                                ></div>
                                <div className="relative z-10">
                                    <div className="text-3xl mb-3">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Animated progress path */}
                    <div className="mt-16 relative hidden md:block">
                        <div className="h-20 mx-auto relative">
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 1000 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0,50 Q250,0 500,50 T1000,50"
                                    stroke="url(#progress-gradient)"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    fill="none"
                                />
                                <defs>
                                    <linearGradient
                                        id="progress-gradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#38bdf8" />
                                        <stop
                                            offset="100%"
                                            stopColor="#818cf8"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {["Konsep", "Pemahaman", "Aplikasi", "Inovasi"].map(
                                (step, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-0 bg-white shadow-md rounded-full p-2 transform -translate-y-1/2"
                                        style={{ left: `${i * 30 + 5}%` }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 * i }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 flex items-center justify-center text-white font-bold">
                                            {i + 1}
                                        </div>
                                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-medium text-gray-700">
                                            {step}
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating illustrated elements */}
            <motion.div
                className="absolute bottom-10 right-10 w-24 h-24 opacity-70 hidden lg:block"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <path
                        d="M50,10 L90,50 L50,90 L10,50 Z"
                        stroke="url(#diamond-gradient)"
                        strokeWidth="3"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="15"
                        stroke="url(#diamond-gradient)"
                        strokeWidth="3"
                        fill="none"
                    />
                    <defs>
                        <linearGradient
                            id="diamond-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            <motion.div
                className="absolute top-1/3 left-0 w-32 h-6 opacity-30 hidden lg:block"
                animate={{ x: [0, 10, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <svg
                    viewBox="0 0 100 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <line
                        x1="0"
                        y1="10"
                        x2="100"
                        y2="10"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="6,3"
                    />
                    <circle cx="30" cy="10" r="5" fill="#38bdf8" />
                    <circle cx="70" cy="10" r="5" fill="#818cf8" />
                </svg>
            </motion.div>
        </section>
    );
}
