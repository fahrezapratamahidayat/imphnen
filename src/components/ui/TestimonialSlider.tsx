"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const testimonials = [
    {
        name: "Agus Malas",
        role: "ex-Developer, kini Professional Concept Engineer",
        quote: "Sejak bergabung dengan IMPHNEN, saya bisa menyebut diri programmer tanpa membuka VS Code sama sekali. Cukup diskusi konsep, dan kerjaan tetap selesai. Efisiensi 300%!",
        avatar: "👨‍💻",
        backgroundColor: "bg-gradient-to-br from-sky-50 to-sky-100",
        accentColor: "from-sky-400 to-blue-600",
    },
    {
        name: "Dewi Santai",
        role: "Senior Algoritma Theorist",
        quote: "Sebelumnya saya harus debug sampai pagi. Sekarang? Saya bilang saja 'ini diluar scope pekerjaan saya'. IMPHNEN mengajarkan saya cara mendelegasikan semua coding ke orang lain.",
        avatar: "👩‍💼",
        backgroundColor: "bg-gradient-to-br from-purple-50 to-purple-100",
        accentColor: "from-purple-400 to-violet-600",
    },
    {
        name: "Budi Pintar",
        role: "Chief Coffee Officer, Tech Startup",
        quote: "Berkat komunitas IMPHNEN, saya berhasil fundraising 2 juta untuk startup saya tanpa punya produk. Hanya slide deck dan AI-generated mockup. Sungguh revolusioner!",
        avatar: "🧔",
        backgroundColor: "bg-gradient-to-br from-amber-50 to-amber-100",
        accentColor: "from-amber-400 to-orange-600",
    },
    {
        name: "Siti Strategis",
        role: "Pseudocode Specialist & Startup Founder",
        quote: "App saya belum jadi sampai sekarang, tapi saya sudah bisa presentasi di 5 konferensi IT sebagai 'thought leader'. Terima kasih IMPHNEN untuk strategi 'all-talk, no-code'!",
        avatar: "👩‍🦰",
        backgroundColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
        accentColor: "from-emerald-400 to-teal-600",
    },
    {
        name: "Roni Realistis",
        role: "Mantan Programmer, Kini Lifestyle Blogger",
        quote: "Dulu saya khawatir AI akan mengambil pekerjaan saya. Sekarang saya biarkan saja AI menulis semua kode, sementara saya memposting 'day in the life of a developer' di Instagram.",
        avatar: "👨‍🦱",
        backgroundColor: "bg-gradient-to-br from-rose-50 to-rose-100",
        accentColor: "from-rose-400 to-pink-600",
    },
];

export default function TestimonialSlider() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Auto-slide (pause on hover)
    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [isHovering]);

    // Navigasi manual
    const handlePrev = () => {
        setDirection(-1);
        setCurrent(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    const handleNext = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    // Animasi variants
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotateY: { duration: 0.8 },
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.9,
            rotateY: direction > 0 ? -45 : 45,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotateY: { duration: 0.8 },
            },
        }),
    };

    // Background floating elements
    const FloatingElement = ({
        children,
        className = "",
        delay = 0,
    }: {
        children: React.ReactNode;
        className?: string;
        delay?: number;
    }) => (
        <motion.div
            className={`absolute opacity-20 ${className}`}
            animate={{
                y: ["0%", "5%", "-5%", "0%"],
            }}
            transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                delay,
            }}
        >
            {children}
        </motion.div>
    );

    return (
        <div
            className="relative max-w-5xl mx-auto mb-20 pt-12 pb-8 px-4 overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <FloatingElement className="text-7xl top-12 -left-8">
                💭
            </FloatingElement>
            <FloatingElement className="text-6xl bottom-12 -right-8" delay={2}>
                💻
            </FloatingElement>
            <FloatingElement className="text-5xl bottom-20 left-8" delay={1}>
                🚀
            </FloatingElement>

            {/* Blob decoration */}
            <div className="absolute -top-10 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-100/30 to-sky-100/30 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-100/30 to-purple-100/30 blur-3xl"></div>

            <div className="relative">
                {/* Slider content */}
                <div className="overflow-hidden relative h-[400px] md:h-[340px] perspective-1000">
                    <AnimatePresence
                        initial={false}
                        custom={direction}
                        mode="popLayout"
                    >
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute w-full p-4"
                        >
                            <div
                                className={`bg-gradient-to-r ${testimonials[current].accentColor} p-1 rounded-2xl transform rotate-1 shadow-xl`}
                            >
                                <div
                                    className={`${testimonials[current].backgroundColor} rounded-xl p-8 transform -rotate-1 backdrop-blur-sm`}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        {/* Avatar with fun decorations */}
                                        <div className="shrink-0">
                                            <div className="relative group">
                                                <div className="w-24 h-24 bg-white rounded-2xl rotate-6 overflow-hidden shadow-lg border-2 border-white flex items-center justify-center transform transition-transform group-hover:rotate-0 duration-300">
                                                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                                                        {
                                                            testimonials[
                                                                current
                                                            ].avatar
                                                        }
                                                    </div>
                                                </div>

                                                {/* Badge */}
                                                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs shadow-md transform transition-transform group-hover:scale-110 duration-300">
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>

                                                {/* Pro badge */}
                                                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-3 py-1 text-xs shadow-md transform -rotate-12 transition-transform group-hover:rotate-0 duration-300 flex items-center">
                                                    <span className="mr-1">
                                                        IMPHNEN PRO
                                                    </span>
                                                    <svg
                                                        className="w-3 h-3"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content with enhanced styling */}
                                        <div className="flex-1">
                                            <div className="relative">
                                                <svg
                                                    width="42"
                                                    height="30"
                                                    className="absolute -top-4 -left-5 text-gray-300 opacity-60"
                                                    viewBox="0 0 42 30"
                                                    fill="currentColor"
                                                >
                                                    <path d="M11.7 30C8.3 30 5.3 28.4 2.9 25.2 0.9 22.4 0 19 0 15 0 10.6 1.5 6.5 4.5 2.7 7.5 0.9 11.4 0 16.5 0 17.9 0 19.4 0.1 21 0.3 21.6 0.4 21.9 0.5 21.9 0.7 21.9 0.9 21.8 1.1 21.5 1.2 21.2 1.3 21 1.4 20.9 1.5 17.9 1.5 15.5 3.1 13.5 6.3 11.6 9.5 10.6 13.6 10.6 18.6L9.6 23.7C9.6 24 9.8 24.1 10.1 24.1 10.6 24.1 11.3 23.5 12.2 22.3 13 21.1 13.8 20.3 14.4 19.8 15 19.4 15.4 19.1 15.8 19.1 16 19.1 16.2 19.2 16.4 19.4 16.6 19.6 16.7 19.8 16.7 20 16.7 21.4 15.6 23.3 13.6 25.7 11.6 28.5 9.7 30 7.9 30 7.9 30 6.6 30 4.1 30 2.9 30 2.3 30 2.3 30 4.3 30 6.8 28.4 9.8 25.1 9.6 28.3 9.7 30 11.7 30ZM32.7 30C29.3 30 26.3 28.4 23.9 25.2 21.9 22.4 21 19 21 15 21 10.6 22.5 6.5 25.5 2.7 28.5 0.9 32.4 0 37.5 0 38.9 0 40.4 0.1 42 0.3 42.6 0.4 42.9 0.5 42.9 0.7 42.9 0.9 42.8 1.1 42.5 1.2 42.2 1.3 42 1.4 41.9 1.5 38.9 1.5 36.5 3.1 34.5 6.3 32.6 9.5 31.6 13.6 31.6 18.6L30.6 23.7C30.6 24 30.8 24.1 31.1 24.1 31.6 24.1 32.3 23.5 33.2 22.3 34 21.1 34.8 20.3 35.4 19.8 36 19.4 36.4 19.1 36.8 19.1 37 19.1 37.2 19.2 37.4 19.4 37.6 19.6 37.7 19.8 37.7 20 37.7 21.4 36.6 23.3 34.6 25.7 32.6 28.5 30.7 30 28.9 30 28.9 30 27.6 30 25.1 30 23.9 30 23.3 30 23.3 30 25.3 30 27.8 28.4 30.8 25.1 30.6 28.3 30.7 30 32.7 30Z" />
                                                </svg>

                                                <blockquote className="text-lg md:text-xl font-medium text-gray-800 mb-6 leading-relaxed relative pl-2 z-10">
                                                    {
                                                        testimonials[current]
                                                            .quote
                                                    }
                                                </blockquote>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="font-bold text-lg text-gray-800">
                                                        {
                                                            testimonials[
                                                                current
                                                            ].name
                                                        }
                                                    </div>
                                                    <div className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent font-medium">
                                                        {
                                                            testimonials[
                                                                current
                                                            ].role
                                                        }
                                                    </div>
                                                </div>

                                                <div className="flex gap-1">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <motion.span
                                                                key={i}
                                                                initial={{
                                                                    scale: 0.5,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    scale: 1,
                                                                    opacity: 1,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        i * 0.1,
                                                                    duration: 0.3,
                                                                }}
                                                                className="text-amber-400 text-xl"
                                                            >
                                                                ★
                                                            </motion.span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation buttons - styled with gradient */}
                <button
                    onClick={handlePrev}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white border border-gray-100 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:scale-110 z-10 transition-transform duration-300"
                    aria-label="Previous testimonial"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text ">
                        <ChevronLeftIcon className="h-6 w-6" />
                    </div>
                </button>

                <button
                    onClick={handleNext}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white border border-gray-100 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:scale-110 z-10 transition-transform duration-300"
                    aria-label="Next testimonial"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text ">
                        <ChevronRightIcon className="h-6 w-6" />
                    </div>
                </button>

                {/* Indicator dots with gradient active state */}
                <div className="flex justify-center mt-8 gap-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > current ? 1 : -1);
                                setCurrent(index);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                index === current
                                    ? "w-10 bg-gradient-to-r from-blue-400 to-sky-500"
                                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Disclaimer - uncomment if needed */}
            <p className="text-center text-gray-500 mt-6 text-xs italic">
                IMPHNEN tidak bertanggung jawab jika Anda kecanduan scroll
                fesbuk
            </p>
        </div>
    );
}
