"use client";
import { Badge } from "../ui/badge";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setCursorVisible(true);
        const handleMouseLeave = () => setCursorVisible(false);

        const section = document.getElementById("hero");
        if (section) {
            section.addEventListener("mousemove", handleMouseMove);
            section.addEventListener("mouseenter", handleMouseEnter);
            section.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                section.removeEventListener("mousemove", handleMouseMove);
                section.removeEventListener("mouseenter", handleMouseEnter);
                section.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);

    return (
        <section
            className="overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-white"
            id="hero"
        >
            <div className="relative" ref={ref}>
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
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 justify-between w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 text-left"
                            >
                                <Badge className="mb-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-1.5 text-sm font-medium shadow-sm">
                                    Komunitas Paling Enggan Ngoding 2025
                                </Badge>

                                <div className="relative">
                                    <h1 className="text-5xl md:text-6xl font-bold mb-2 text-gray-800">
                                        Ingin Menjadi
                                    </h1>
                                    <h1 className="text-5xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                                        Programmer
                                    </h1>
                                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 relative inline-block">
                                        Handal
                                        <span className="absolute -top-4 -right-8 text-2xl text-amber-500 transform rotate-12">
                                            *
                                        </span>
                                    </h1>

                                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl animate-bounce-slow">
                                            🤔
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <p className="text-xl text-gray-700 font-medium">
                                        Tapi{" "}
                                        <span className="line-through">
                                            Suka
                                        </span>{" "}
                                        Enggan Ngoding?
                                    </p>
                                    <div className="bg-gray-100 px-2 py-1 rounded-md">
                                        <span className="text-blue-500 font-bold animate-pulse">
                                            ERROR 404:
                                        </span>{" "}
                                        <span className="text-gray-500 text-sm">
                                            motivation_not_found
                                        </span>
                                    </div>
                                </div>

                                <p className="text-2xl mb-8 font-semibold text-sky-500">
                                    <span className="inline-block mr-2">
                                        IMPHNEN
                                    </span>
                                    <span className="relative text-gray-800 text-lg">
                                        solusi tanpa{" "}
                                        <span className="italic">
                                            runtime error
                                        </span>
                                        !
                                    </span>
                                </p>

                                <div className="mt-6 mb-8 bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-lg border-l-4 border-amber-300 text-amber-800 relative">
                                    <div className="absolute -top-3 -left-3 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-md text-amber-500 text-sm">
                                        &quot;
                                    </div>
                                    <p className="italic mb-2 font-medium">
                                        &quot;Kenapa capek-capek ngoding? kalau
                                        scroll fesbuk aja lebih seru&quot;
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs bg-amber-100 px-2 py-1 rounded text-amber-700">
                                            #EngganNgodingGang
                                        </span>
                                        <p className="text-right text-amber-600 text-sm font-medium">
                                            - Programmer Yang Terlalu Santai
                                        </p>
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-md text-amber-500 text-sm">
                                        &quot;
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <Button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 px-8 py-4 rounded-md font-medium transition-all shadow-md flex items-center gap-2">
                                        <a href="#fitur">Jelajahi Fitur</a>
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1.5,
                                            }}
                                        >
                                            👨‍💻
                                        </motion.div>
                                    </Button>
                                    <Button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-8 py-4 rounded-md font-medium transition-all shadow-sm flex items-center gap-2 group">
                                        <span>Gabung Discord</span>
                                        <motion.div className="text-sky-500 group-hover:text-blue-600 transition-transform group-hover:translate-x-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </motion.div>
                                    </Button>
                                </div>

                                <p className="text-xs text-gray-400 mt-4">
                                    Kami tidak menjamin Anda akan jadi handal
                                    ngoding, tetapi kami menjamin anda akan
                                    semakin malas ngoding
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-full md:w-1/2 mt-12 md:mt-0"
                            >
                                <div className="relative">
                                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full opacity-60 blur-sm" />
                                    <div className="relative bg-gradient-to-br from-sky-50 to-blue-50 p-10 rounded-2xl border-2 border-dashed border-sky-200 flex flex-col items-center transform rotate-1 shadow-lg">
                                        <div className="absolute -top-5 -right-5 bg-white p-3 rounded-full shadow-md">
                                            <div className="text-sky-500 text-3xl">
                                                💡
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between items-center mb-6">
                                            <div className="h-3 w-3 rounded-full bg-red-400" />
                                            <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                            <div className="h-3 w-3 rounded-full bg-green-400" />
                                        </div>

                                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 mb-6">
                                            IMPHNEN
                                        </h2>

                                        <div className="w-full bg-white/70 backdrop-blur-sm p-4 rounded-lg mb-6 font-mono text-sm">
                                            <div className="flex">
                                                <span className="text-purple-500">
                                                    const
                                                </span>
                                                <span className="text-blue-500 mx-2">
                                                    meaning
                                                </span>
                                                <span className="text-gray-500">
                                                    =
                                                </span>
                                                <span className="text-gray-500 mx-2">{`{`}</span>
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-amber-600">
                                                    I
                                                </span>
                                                <span className="text-gray-500">
                                                    :
                                                </span>
                                                <span className="text-green-500 ml-2">
                                                    &quot;Ingin&quot;
                                                </span>
                                                <span className="text-gray-500">
                                                    ,
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-amber-600">
                                                    M
                                                </span>
                                                <span className="text-gray-500">
                                                    :
                                                </span>
                                                <span className="text-green-500 ml-2">
                                                    &quot;Menjadi&quot;
                                                </span>
                                                <span className="text-gray-500">
                                                    ,
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-amber-600">
                                                    P
                                                </span>
                                                <span className="text-gray-500">
                                                    :
                                                </span>
                                                <span className="text-green-500 ml-2">
                                                    &quot;Programmer&quot;
                                                </span>
                                                <span className="text-gray-500">
                                                    ,
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-amber-600">
                                                    H
                                                </span>
                                                <span className="text-gray-500">
                                                    :
                                                </span>
                                                <span className="text-green-500 ml-2">
                                                    &quot;Handal&quot;
                                                </span>
                                                <span className="text-gray-500">
                                                    ,
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-amber-600">
                                                    N
                                                </span>
                                                <span className="text-gray-500">
                                                    :
                                                </span>
                                                <span className="text-green-500 ml-2">
                                                    &quot;Namun&quot;
                                                </span>
                                                <span className="text-gray-500">
                                                    ,
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-amber-600">
                                                    E
                                                </span>
                                                <span className="text-gray-500">
                                                    :
                                                </span>
                                                <span className="text-green-500 ml-2">
                                                    &quot;Enggan&quot;
                                                </span>
                                                <span className="text-gray-500">
                                                    ,
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <span className="text-amber-600">
                                                    N
                                                </span>
                                                <span className="text-gray-500">
                                                    :
                                                </span>
                                                <span className="text-green-500 ml-2">
                                                    &quot;Ngoding&quot;
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{`}`}</span>
                                                <span className="text-gray-500">
                                                    ;
                                                </span>
                                                <span className="ml-2 animate-pulse">
                                                    |
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-lg font-medium text-center text-gray-600">
                                            <span className="bg-yellow-100 px-2 py-0.5 rounded mr-1">
                                                Namun
                                            </span>
                                            <span className="bg-red-100 px-2 py-0.5 rounded mr-1">
                                                Enggan
                                            </span>
                                            <span className="bg-purple-100 px-2 py-0.5 rounded">
                                                Ngoding
                                            </span>
                                        </p>

                                        <div className="absolute -bottom-5 -left-5 bg-white p-2 rounded-full shadow-md">
                                            <div className="text-amber-500 text-2xl">
                                                ⚠️
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-blue-100 rounded-full opacity-60 blur-sm" />

                                    {/* Floating elements */}
                                    <motion.div
                                        className="absolute -top-8 right-10 text-lg"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                        }}
                                    >
                                        🚫
                                    </motion.div>
                                    <motion.div
                                        className="absolute bottom-0 right-4 text-xl"
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            delay: 0.5,
                                        }}
                                    >
                                        💤
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-sky-50 rounded-full filter blur-3xl opacity-70" />
                    <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-70" />
                    <div className="absolute top-1/3 left-1/4 w-5 h-5 bg-amber-300 rounded-full opacity-70" />
                    <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-sky-300 rounded-full opacity-70" />
                </div>
            </div>
        </section>
    );
}
