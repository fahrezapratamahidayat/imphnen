"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TiltCard = ({
    children,
    className = "",
    tiltFactor = 5,
    scale = 1.03,
    rotate = 0,
    style = {},
}: {
    children: React.ReactNode;
    className?: string;
    tiltFactor?: number;
    scale?: number;
    rotate?: number;
    style?: React.CSSProperties;
}) => {
    const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const posX = e.clientX - centerX;
        const posY = e.clientY - centerY;

        const tiltX = (posY / (rect.height / 2)) * -tiltFactor;
        const tiltY = (posX / (rect.width / 2)) * tiltFactor;

        setTiltValues({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
        setTiltValues({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            className={`transform-gpu transition-all duration-200 ${className}`}
            style={{
                transformStyle: "preserve-3d",
                transform: `rotate(${rotate}deg)`,
                ...style,
            }}
            whileHover={{ scale }}
            animate={{
                transform: `rotate(${rotate}deg)`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
};

const GlowBadge = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`inline-block relative ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="relative bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-1.5 rounded-full text-white font-medium">
            {children}
        </div>
    </div>
);

type ColorVariant = "sky" | "indigo" | "mixed";

const HybridCard = ({
    children,
    className = "",
    tiltFactor = 5,
    rotate = 0,
    hasDots = true,
    color = "sky",
}: {
    children: React.ReactNode;
    className?: string;
    tiltFactor?: number;
    rotate?: number;
    hasDots?: boolean;
    color?: ColorVariant;
}) => {
    const colorVariants: Record<ColorVariant, string> = {
        sky: "border-sky-200",
        indigo: "border-indigo-200",
        mixed: "border-blue-200",
    };

    return (
        <TiltCard className={className} tiltFactor={tiltFactor} rotate={rotate}>
            <div
                className={`bg-white border-2 border-dashed ${colorVariants[color]} rounded-xl p-5 relative shadow-md`}
            >
                {hasDots && (
                    <>
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white rounded-full border border-gray-200"></div>
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white rounded-full border border-gray-200"></div>
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white rounded-full border border-gray-200"></div>
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white rounded-full border border-gray-200"></div>
                    </>
                )}
                {children}
            </div>
        </TiltCard>
    );
};

const BackgroundParticles = ({ count = 30 }) => {
    const particles = [];

    for (let i = 0; i < count; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 10;

        particles.push(
            <motion.div
                key={i}
                className={`absolute rounded-full ${
                    i % 3 === 0
                        ? "bg-sky-200"
                        : i % 3 === 1
                        ? "bg-indigo-200"
                        : "bg-blue-200"
                }`}
                style={{
                    width: size,
                    height: size,
                    left: `${x}%`,
                    top: `${y}%`,
                    opacity: 0.3,
                }}
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    delay,
                }}
            />
        );
    }

    return <>{particles}</>;
};

const CodeSnippet = ({
    code,
    className = "",
}: {
    code: string;
    className?: string;
}) => (
    <div
        className={`font-mono text-xs md:text-sm bg-gray-900 text-gray-200 rounded-lg p-3 shadow-lg ${className}`}
    >
        <div className="flex items-center space-x-1.5 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <div className="space-y-1">
            {code.split("\n").map((line, i) => (
                <div key={i} className="flex">
                    <span className="text-gray-500 mr-2">{i + 1}</span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: line
                                .replace(
                                    /function|class|constructor|const|let|import|from/g,
                                    '<span class="text-sky-400">$&</span>'
                                )
                                .replace(
                                    /true|false|null|undefined/g,
                                    '<span class="text-yellow-400">$&</span>'
                                )
                                .replace(
                                    /\/\/.*/g,
                                    '<span class="text-green-400">$&</span>'
                                ),
                        }}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default function PhilosophySection() {
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

        const section = document.getElementById("philosophy");
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
            className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden"
            id="philosophy"
        >
            <motion.div
                className="fixed w-6 h-6 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-md opacity-50 pointer-events-none z-50"
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

                <BackgroundParticles count={40} />

                <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%">
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="#4299e1"
                                strokeWidth="0.5"
                            />
                        </pattern>
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#grid)"
                        />
                    </svg>
                </div>

                {/* Floating code elements */}
                {[
                    "function understand() {\n  /* logic > syntax */\n  return concepts;\n}",
                    "const knowledge = concepts\n  .map(c => understand(c))\n  .filter(c => c.useful);",
                    "class Programmer {\n  constructor(mindset) {\n    this.problemSolving = true;\n  }\n}",
                    "// AI hanyalah alat\n// scroll fesbuk adalah solusi\nimport { fesbuk } from 'brain';",
                ].map((code, i) => (
                    <motion.div
                        key={i}
                        className="absolute hidden md:block"
                        style={{
                            top: `${15 + i * 20}%`,
                            left: i % 2 === 0 ? "5%" : "80%",
                            opacity: 0.7,
                            scale: 0.8,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.7, 0],
                            y: [20, -30, 20],
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            delay: i * 3,
                        }}
                    >
                        <CodeSnippet code={code} />
                    </motion.div>
                ))}
            </div>

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
                    <div className="text-center mb-16 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <TiltCard
                                rotate={1}
                                tiltFactor={2}
                                className="inline-block"
                            >
                                <div className="inline-block px-12 py-8 border-2 border-dashed border-sky-200 rounded-xl relative bg-white shadow-md">
                                    <GlowBadge className="mb-4">
                                        Konsep & Pemikiran
                                    </GlowBadge>

                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                                        Filosofi{" "}
                                        <span className="relative">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                                                Kami
                                            </span>
                                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-400"></span>
                                        </span>
                                    </h2>

                                    <div className="flex justify-center space-x-3 text-gray-500 flex-wrap flex-col items-center">
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Berpikir",
                                                "Memahami",
                                                "Menyelesaikan",
                                            ].map((word, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{
                                                        delay: 0.1 * i,
                                                    }}
                                                    viewport={{ once: true }}
                                                    className="flex items-center"
                                                >
                                                    {i > 0 && (
                                                        <span className="mr-3 text-sky-300">
                                                            •
                                                        </span>
                                                    )}
                                                    <span>{word}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <span className="text-sky-300">
                                            meski kami malas ngoding, kami juga
                                            memiliki filosofi
                                        </span>
                                    </div>
                                </div>
                            </TiltCard>
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
                                                <div className="relative transform-gpu transition-all hover:scale-105">
                                                    <div className="text-7xl md:text-8xl filter drop-shadow-[0_10px_8px_rgba(0,0,0,0.04)]">
                                                        🧠
                                                    </div>
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
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                                        <span className="block mb-2">
                                            Filosofi
                                        </span>
                                        <span className="bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text">
                                            Pemahaman &gt; Syntax
                                        </span>
                                    </h2>

                                    <p className="text-xl leading-relaxed text-gray-600">
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
                                    </p>
                                </motion.div>

                                {/* Quote with tilted card */}
                                <TiltCard rotate={-1} scale={1.03}>
                                    <motion.div
                                        className="py-6 px-8 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl relative shadow-md"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <p className="text-gray-600 relative z-10 text-center">
                                            <span className="text-sky-400 text-4xl absolute -top-4 -left-2">
                                                &quot;
                                            </span>
                                            <span className="italic block px-6">
                                                Seorang pemrogram sejati
                                                memahami &quot;mengapa&quot;
                                                sebelum mempelajari
                                                &quot;bagaimana&quot;.
                                            </span>
                                            <span className="text-indigo-400 text-4xl absolute -bottom-8 -right-2">
                                                &quot;
                                            </span>
                                        </p>
                                    </motion.div>
                                </TiltCard>

                                <motion.p
                                    className="text-gray-600"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
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

                                {/* Philosophy points dengan mix tilt dan dashed */}
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    {[
                                        {
                                            title: "Konsep > Syntax",
                                            icon: "💡",
                                            desc: "Fokus pada pemahaman dasar",
                                            color: "sky",
                                            rotate: -2,
                                        },
                                        {
                                            title: "Pemahaman > Menghafal",
                                            icon: "🧠",
                                            desc: "Kuasai logika, bukan hapalan",
                                            color: "indigo",
                                            rotate: 1,
                                        },
                                        {
                                            title: "Masalah > Kode",
                                            icon: "🔍",
                                            desc: "Analisis sebelum implementasi",
                                            color: "sky",
                                            rotate: 2,
                                        },
                                        {
                                            title: "Logika > Bahasa",
                                            icon: "⚡",
                                            desc: "Platform-agnostic thinking",
                                            color: "indigo",
                                            rotate: -1,
                                        },
                                    ].map((point, i) => (
                                        <HybridCard
                                            key={i}
                                            color={point.color as ColorVariant}
                                            rotate={point.rotate}
                                            hasDots={false}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="text-3xl transform transition-transform group-hover:scale-110">
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
                                        </HybridCard>
                                    ))}
                                </div>
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
                                    <TiltCard
                                        key={i}
                                        className="absolute top-0 transform -translate-y-1/2"
                                        style={{ left: `${i * 30 + 5}%` }}
                                        tiltFactor={15}
                                        rotate={i % 2 === 0 ? 2 : -2}
                                        scale={1.1}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 * i }}
                                            className="bg-white shadow-md rounded-full p-2 relative"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 flex items-center justify-center text-white font-bold">
                                                {i + 1}
                                            </div>
                                            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-medium text-gray-700 bg-white px-3 py-1 rounded-lg border border-dashed border-sky-200">
                                                {step}
                                            </div>
                                        </motion.div>
                                    </TiltCard>
                                )
                            )}

                            <TiltCard
                                className="absolute bottom-10 right-10 w-24 h-24 opacity-70 hidden lg:block"
                                tiltFactor={10}
                                rotate={15}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0],
                                    }}
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
                                            strokeDasharray="10,5"
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
                                                <stop
                                                    offset="0%"
                                                    stopColor="#38bdf8"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#818cf8"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </motion.div>
                            </TiltCard>
                        </div>
                    </div>
                </div>
            </div>

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
