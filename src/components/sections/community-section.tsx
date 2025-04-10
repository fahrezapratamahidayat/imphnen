"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const communities = [
    {
        name: "Discord Server",
        members: "5,430",
        description:
            "Channel voice chat khusus untuk diskusi konsep tanpa kode. Ruang #ide-tanpa-implementasi paling ramai!",
        icon: "discord",
        color: "bg-indigo-500",
        lightColor: "bg-indigo-100",
        link: "https://discord.gg/W4XyRAmPSD",
        stats: [
            { label: "Voice Channels", value: "12" },
            { label: "Text Channels", value: "24" },
            { label: "Daily Aktif", value: "342" },
        ],
        features: [
            "Weekly voice sharing 'Ngobrol Doang, Ngoding Ogah'",
            "Bot yang otomatis menegur member yang share kode",
            "Role 'Anti-Syntax Warrior' untuk member teraktif",
        ],
    },
    {
        name: "Facebook Group",
        members: "168,496",
        description:
            "Tempat sharing meme programming dan screenshot error tanpa solusi. Bebas mengeluh tentang debugging!",
        icon: "facebook",
        color: "bg-blue-600",
        lightColor: "bg-blue-100",
        link: "https://www.facebook.com/groups/1032515944638255",
        stats: [
            { label: "Posts/hari", value: "46" },
            { label: "Meme/minggu", value: "124" },
            { label: "Events", value: "5" },
        ],
        features: [
            "Thread mingguan 'Share Error Tanpa Solusi'",
            "Poll 'Framework Mana yang Paling Menyebalkan?'",
            "Album 'Client Request vs Budget Client'",
        ],
    },
    {
        name: "Instagram",
        members: "12,450",
        description:
            "Konten visual tentang gaya hidup programmer tanpa coding. Posting setup WFH keren sambil Netflix!",
        icon: "instagram",
        color: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500",
        lightColor: "bg-pink-100",
        link: "#join-instagram",
        stats: [
            { label: "Posts", value: "476" },
            { label: "Stories/hari", value: "35" },
            { label: "Followers Baru/minggu", value: "230" },
        ],
        features: [
            "Series 'Workstation Aesthetic yang Belum Pernah Dipakai Coding'",
            "Challenge #ProgrammerTanpaCode",
            "Reels tutorial 'Cara Terlihat Sibuk Saat Deadline'",
        ],
    },
];

export default function CommunitySection() {
    const [activeTab, setActiveTab] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // Fungsi untuk menampilkan icon yang sesuai
    const renderIcon = (iconName: string, size = 5) => {
        switch (iconName) {
            case "discord":
                return (
                    <svg
                        className={`w-${size} h-${size}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                );
            case "facebook":
                return (
                    <svg
                        className={`w-${size} h-${size}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                );
            case "instagram":
                return (
                    <svg
                        className={`w-${size} h-${size}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full filter blur-3xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>

            {/* Floating Social Media Icons */}
            <motion.div
                className="absolute top-1/4 left-10 md:left-20 z-0"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-16 h-16 rounded-xl bg-blue-100 shadow-lg flex items-center justify-center relative overflow-hidden">
                    <span className="text-blue-600 z-10">
                        {renderIcon("facebook", 8)}
                    </span>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-200 rounded-full"></div>
                    <div className="absolute -top-6 -left-6 w-10 h-10 bg-blue-50 rounded-full"></div>
                </div>
                <motion.div
                    className="w-6 h-6 bg-blue-200 rounded-full absolute -right-2 -bottom-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            <motion.div
                className="absolute top-1/3 right-10 md:right-24 z-0"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 shadow-lg flex items-center justify-center relative overflow-hidden">
                    <span className="text-pink-600 z-10">
                        {renderIcon("instagram", 7)}
                    </span>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-yellow-200/40 via-pink-200/40 to-purple-200/40"></div>
                </div>
                <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full absolute -left-3 -top-1"
                    animate={{
                        scale: [1, 0.8, 1],
                        opacity: [0.7, 0.5, 0.7],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 left-1/4 z-0 hidden md:block"
                animate={{
                    y: [0, 10, 0],
                    x: [0, -10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            >
                <div className="w-20 h-20 rounded-2xl bg-indigo-100 shadow-lg flex items-center justify-center relative overflow-hidden transform rotate-12">
                    <span className="text-indigo-600 z-10">
                        {renderIcon("discord", 10)}
                    </span>
                    <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-indigo-200/50 rounded-full"></div>
                    <div className="absolute -top-8 -left-8 w-16 h-16 bg-indigo-50 rounded-full"></div>
                </div>
                <motion.div
                    className="w-7 h-7 bg-indigo-300 rounded-full absolute -right-2 top-1/2"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </motion.div>

            {/* Particle effects */}
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${
                        i % 3 === 0
                            ? "bg-blue-400"
                            : i % 3 === 1
                            ? "bg-indigo-400"
                            : "bg-pink-400"
                    } opacity-70`}
                    style={{
                        top: `${15 + Math.random() * 70}%`,
                        left: `${5 + Math.random() * 90}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.7, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                />
            ))}

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                Bergabung dengan{" "}
                                <span className="text-sky-500">
                                    Komunitas Kami
                                </span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Temukan komunitas programmer yang tidak terlalu
                                serius dengan coding.
                                <span className="italic block text-sm mt-1">
                                    Semua platform, satu tujuan: terlihat
                                    seperti programmer tanpa coding!
                                </span>
                            </p>
                        </motion.div>
                    </div>

                    {/* 3D Floating Platform Cards */}
                    <div className="mb-16 hidden md:block">
                        <div className="grid grid-cols-3 gap-6">
                            {communities.map((community, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{
                                        y: -10,
                                        boxShadow:
                                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    }}
                                    className={`relative rounded-xl overflow-hidden cursor-pointer ${
                                        index === activeTab
                                            ? "ring-2 ring-sky-500"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    <div
                                        className={`h-40 ${community.color} relative overflow-hidden`}
                                    >
                                        {/* Platform icon */}
                                        <motion.div
                                            className="absolute right-4 top-4 text-white/90"
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: 1,
                                                rotate: [0, 10, 0],
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.2,
                                            }}
                                        >
                                            {renderIcon(community.icon, 10)}
                                        </motion.div>

                                        <motion.div
                                            className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: 360,
                                            }}
                                            transition={{
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                        <motion.div
                                            className="absolute right-1/4 top-1/3 w-6 h-6 bg-white/20 rounded-full"
                                            animate={{ y: [0, 10, 0] }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />

                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-white font-bold text-xl">
                                                {community.name}
                                            </h3>
                                            <div className="flex items-center mt-1">
                                                <div className="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs">
                                                    {community.members} anggota
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4">
                                        <p className="text-gray-600 text-sm mb-3">
                                            {community.description.substring(
                                                0,
                                                80
                                            )}
                                            ...
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex">
                                                {community.stats
                                                    .map((stat, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`${
                                                                idx > 0
                                                                    ? "ml-2 pl-2 border-l border-gray-200"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <div className="text-xs text-gray-500">
                                                                {stat.label}
                                                            </div>
                                                            <div className="text-sm font-medium">
                                                                {stat.value}
                                                            </div>
                                                        </div>
                                                    ))
                                                    .slice(0, 2)}
                                            </div>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Link
                                                    href={community.link}
                                                    className={`w-8 h-8 ${community.color} rounded-full flex items-center justify-center text-white`}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Community tabs (mobile) */}
                    <div className="mb-12 md:hidden">
                        <div className="flex justify-center flex-wrap gap-2">
                            {communities.map((community, index) => (
                                <motion.button
                                    key={index}
                                    className={`flex items-center px-5 py-3 rounded-full font-medium shadow-sm transition-all ${
                                        activeTab === index
                                            ? `${community.color} text-white shadow-md`
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                    onClick={() => setActiveTab(index)}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="mr-2">
                                        {renderIcon(community.icon)}
                                    </span>
                                    {community.name}
                                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                                        {community.members}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Active community details */}
                    {/* <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            <div
                                className={`${communities[activeTab].color} text-white p-6 md:p-8`}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <motion.div
                                            className="w-14 h-14 mr-4 bg-white/20 rounded-full flex items-center justify-center relative overflow-hidden"
                                            animate={{ rotate: [0, 10, 0] }}
                                            transition={{
                                                duration: 5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                }}
                                                className="absolute inset-1 bg-white/10 rounded-full"
                                            />
                                            <div className="relative z-10">
                                                {renderIcon(
                                                    communities[activeTab].icon,
                                                    7
                                                )}
                                            </div>
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl font-bold">
                                                {communities[activeTab].name}
                                            </h3>
                                            <p className="text-white/90 text-sm">
                                                {communities[activeTab].members}{" "}
                                                anggota yang bangga jadi
                                                programmer tanpa ngoding
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button className="bg-white text-gray-800 hover:bg-white/90 px-6 py-2 rounded-full font-medium transition-all shadow-md">
                                            Gabung Sekarang
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">
                                        Tentang Komunitas
                                    </h4>
                                    <p className="text-gray-600">
                                        {communities[activeTab].description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {communities[activeTab].stats.map(
                                        (stat, idx) => (
                                            <motion.div
                                                key={idx}
                                                className={`bg-${
                                                    communities[
                                                        activeTab
                                                    ].lightColor.split("-")[1]
                                                }-50 rounded-lg p-4 text-center`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: idx * 0.1,
                                                }}
                                            >
                                                <div className="text-2xl font-bold text-sky-500">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        )
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">
                                        Highlight Fitur
                                    </h4>
                                    <ul className="space-y-2">
                                        {communities[activeTab].features.map(
                                            (feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    className="flex items-start"
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: idx * 0.1,
                                                    }}
                                                >
                                                    <div
                                                        className={`text-white ${communities[activeTab].color} p-1 rounded-full mr-3 mt-0.5`}
                                                    >
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
                                                    <span className="text-gray-700">
                                                        {feature}
                                                    </span>
                                                </motion.li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    <span className="font-medium">
                                        Tingkat Aktivitas:
                                    </span>{" "}
                                    Sangat Aktif
                                </div>
                                <motion.a
                                    href={communities[activeTab].link}
                                    className="text-sky-500 hover:text-sky-600 font-medium flex items-center"
                                    whileHover={{ x: 3 }}
                                >
                                    Selengkapnya
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        ></path>
                                    </svg>
                                </motion.a>
                            </div>
                        </motion.div>
                    </AnimatePresence> */}

                    {/* Community stats */}
                    {/* <div className="mt-16 bg-sky-50 rounded-xl p-8 border border-sky-100 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-40"></div>
                        <div className="absolute right-1/4 bottom-0 w-16 h-16 bg-gradient-to-br from-sky-200 to-blue-200 rounded-full opacity-40"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                            <div className="mb-6 md:mb-0">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Bergabunglah dengan ribuan pengguna lainnya
                                </h3>
                                <p className="text-gray-600">
                                    Nikmati berbagai manfaat dari komunitas kami
                                    yang aktif dan berkembang
                                </p>
                            </div>
                            <Button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-medium">
                                Lihat Semua Komunitas
                            </Button>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
