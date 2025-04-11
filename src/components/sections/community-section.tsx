"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Community = {
    name: string;
    members: string;
    description: string;
    icon: string;
    color: string;
    gradient: string;
    lightColor: string;
    link: string;
    stats: { label: string; value: string }[];
    features: string[];
};
const communities: Community[] = [
    {
        name: "Discord Server",
        members: "5,430",
        description:
            "Channel voice chat khusus untuk diskusi konsep tanpa kode. Ruang #ide-tanpa-implementasi paling ramai!",
        icon: "discord",
        color: "bg-indigo-500",
        gradient: "from-indigo-500 to-indigo-600",
        lightColor: "bg-indigo-100",
        link: "https://discord.gg/W4XyRAmPSD",
        stats: [
            { label: "Voice Channels", value: "12" },
            { label: "Text Channels", value: "24" },
            { label: "Daily Aktif", value: "342" },
        ],
        features: [
            "Weekly voice sharing 'Ngobrol Doang, Ngoding Ogah'",
            "Bot yang otomatis menegur member yang rajin ngoding",
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
        gradient: "from-blue-500 to-blue-700",
        lightColor: "bg-blue-100",
        link: "https://www.facebook.com/groups/1032515944638255",
        stats: [
            { label: "Posts/hari", value: "46" },
            { label: "Meme/minggu", value: "124" },
            { label: "Events", value: "5" },
        ],
        features: [
            "Thread mingguan 'Share Error Tanpa Solusi'",
            "Poll 'Framework Mana yang Paling Menyebalkan? pasti php sih'",
            "berbagi screenshot error tanpa solusi",
        ],
    },
    {
        name: "Instagram",
        members: "12,450",
        description:
            "Konten visual tentang gaya hidup programmer tanpa coding. Posting setup WFH keren sambil Netflix!",
        icon: "instagram",
        color: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500",
        gradient: "from-pink-500 via-fuchsia-500 to-purple-600",
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

const CommunityCard = ({
    community,
    index,
    isActive,
    onClick,
}: {
    community: Community;
    index: number;
    isActive: boolean;
    onClick: () => void;
}) => {
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.3 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const posX = (e.clientX - centerX) / 20;
        const posY = (e.clientY - centerY) / 20;
        setPosition({ x: posX, y: -posY });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    const renderIcon = (iconName: string, size = 10) => {
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

    return (
        <motion.div
            ref={cardRef}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 transform-gpu ${
                isActive ? "ring-2 ring-sky-500 shadow-lg" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={
                isInView
                    ? {
                          opacity: 1,
                          y: 0,
                          transition: {
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                              delay: index * 0.1,
                          },
                      }
                    : {}
            }
            style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="relative w-full h-full"
                animate={
                    hovered
                        ? {
                              rotateX: position.y,
                              rotateY: position.x,
                          }
                        : {
                              rotateX: 0,
                              rotateY: 0,
                          }
                }
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div
                    className={`h-40 bg-gradient-to-r ${community.gradient} relative overflow-hidden`}
                >
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

                    {/* Particle effects */}
                    {hovered && (
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1.5 h-1.5 bg-white rounded-full"
                                    initial={{
                                        x: "50%",
                                        y: "50%",
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    animate={{
                                        x: [`50%`, `${20 + i * 15}%`],
                                        y: [`50%`, `${30 + i * 10}%`],
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 1 + i * 0.2,
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: i * 0.1,
                                    }}
                                />
                            ))}
                        </div>
                    )}

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

                <div className="bg-white p-5 group-hover:bg-gray-50 transition-colors">
                    <p className="text-gray-600 mb-4">
                        {community.description}
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
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
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                href={community.link}
                                className={`w-9 h-9 bg-gradient-to-r ${community.gradient} rounded-full flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all`}
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

                {/* Shine effect */}
                <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 ${
                        isActive ? "opacity-30" : ""
                    }`}
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transform: "skewX(-15deg)",
                        animationName: "shine",
                        animationDuration: "1.5s",
                        animationIterationCount: "infinite",
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

// Detailed View Component
const CommunityDetail = ({
    community,
    isVisible,
}: {
    community: Community;
    isVisible: boolean;
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-10"
                >
                    <div
                        className={`bg-gradient-to-r ${community.gradient} p-6 relative overflow-hidden`}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white">
                                {renderIcon(community.icon, 8)}
                            </div>
                            <div>
                                <h3 className="text-white text-2xl font-bold">
                                    {community.name}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                                        {community.members} anggota
                                    </div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.span
                                                key={i}
                                                className="text-yellow-300"
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                ★
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%">
                                <defs>
                                    <pattern
                                        id="smallGrid"
                                        width="20"
                                        height="20"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M 20 0 L 0 0 0 20"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="0.5"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="url(#smallGrid)"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-gray-800 mb-3 text-lg">
                                    Tentang Komunitas
                                </h4>
                                <p className="text-gray-600 mb-4">
                                    {community.description}
                                </p>

                                <div className="grid grid-cols-3 gap-4 my-5">
                                    {community.stats.map((stat, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gray-50 rounded-lg p-3 text-center"
                                        >
                                            <div className="text-gray-500 text-xs">
                                                {stat.label}
                                            </div>
                                            <div className="font-bold text-gray-800 text-lg">
                                                {stat.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-4"
                                >
                                    <Link href={community.link}>
                                        <Button
                                            className={`bg-gradient-to-r ${community.gradient} text-white w-full py-6 rounded-xl font-medium shadow-md`}
                                        >
                                            Bergabung dengan {community.name}
                                            <svg
                                                className="w-5 h-5 ml-2"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    d="M5 12h14M12 5l7 7-7 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-800 mb-3 text-lg">
                                    Fitur Unggulan
                                </h4>
                                <div className="space-y-3">
                                    {community.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg"
                                        >
                                            <div
                                                className={`w-8 h-8 mt-0.5 bg-gradient-to-r ${community.gradient} rounded-full flex items-center justify-center text-white flex-shrink-0`}
                                            >
                                                <span className="font-bold">
                                                    {idx + 1}
                                                </span>
                                            </div>
                                            <p className="text-gray-700">
                                                {feature}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-lg p-4 mt-5">
                                    <div className="flex items-start gap-3">
                                        <div className="text-amber-500 text-xl">
                                            💡
                                        </div>
                                        <div>
                                            <p className="text-amber-800 font-medium">
                                                Saran IMPHNEN:
                                            </p>
                                            <p className="text-amber-700 text-sm">
                                                Bergabunglah dengan komunitas
                                                ini jika Anda lebih suka scroll
                                                fesbuk
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

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

export default function CommunitySection() {
    const [activeTab, setActiveTab] = useState(0);
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

        const section = document.getElementById("community");
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
            className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50"
            id="community"
        >
            <motion.div
                className="fixed w-6 h-6 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-md opacity-50 pointer-events-none z-[999px] bg-red-500 sm:block hidden"
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-50 rounded-full filter blur-3xl opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>

            <motion.div
                className="absolute top-1/4 left-10 md:left-20 z-0 sm:block hidden"
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
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center relative overflow-hidden">
                    <span className="text-white z-10">
                        {renderIcon("facebook", 8)}
                    </span>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0ic2NhbGUoMikiPjxwYXRoIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZD0iTTAgMGgxMHYxMEgwem0xMCAxMGgxMHYxMEgxMHoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-20"></div>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-400 rounded-full opacity-30"></div>
                    <div className="absolute -top-6 -left-6 w-10 h-10 bg-blue-300 rounded-full opacity-20"></div>
                </div>
                <motion.div
                    className="w-6 h-6 bg-blue-300 rounded-full absolute -right-2 -bottom-2"
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
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg flex items-center justify-center relative overflow-hidden">
                    <span className="text-white z-10">
                        {renderIcon("instagram", 7)}
                    </span>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiIGQ9Ik0wIDBoMnYySDB6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-20"></div>
                </div>
                <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full absolute -left-3 -top-1 opacity-60"
                    animate={{
                        scale: [1, 0.8, 1],
                        opacity: [0.6, 0.4, 0.6],
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
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg flex items-center justify-center relative overflow-hidden transform rotate-12">
                    <span className="text-white z-10">
                        {renderIcon("discord", 10)}
                    </span>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-20"></div>
                </div>
                <motion.div
                    className="w-7 h-7 bg-indigo-300 rounded-full absolute -right-2 top-1/2 opacity-70"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </motion.div>

            {/* Particle effects */}
            {[...Array(55)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${
                        i % 3 === 0
                            ? "bg-blue-400"
                            : i % 3 === 1
                            ? "bg-indigo-400"
                            : "bg-pink-400"
                    } opacity-0`}
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                        y: [0, -40],
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeOut",
                    }}
                />
            ))}

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-3 shadow-sm">
                                Komunitas
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                Bergabung dengan{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                                    Komunitas Kami
                                </span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Temukan komunitas programmer yang tidak terlalu
                                serius dengan coding.
                                <span className="block text-sm mt-1 text-gray-500">
                                    Semua platform, satu tujuan: terlihat
                                    seperti programmer tanpa coding!
                                </span>
                            </p>
                        </motion.div>
                    </div>

                    <div className="mb-12 hidden md:block">
                        <div className="grid grid-cols-3 gap-6">
                            {communities.map((community, index) => (
                                <CommunityCard
                                    key={index}
                                    community={community}
                                    index={index}
                                    isActive={activeTab === index}
                                    onClick={() => setActiveTab(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-8 md:hidden">
                        <div className="flex justify-center flex-wrap gap-2">
                            {communities.map((community, index) => (
                                <motion.button
                                    key={index}
                                    className={`flex items-center px-5 py-3 rounded-full font-medium shadow-sm transition-all ${
                                        activeTab === index
                                            ? `bg-gradient-to-r ${community.gradient} text-white shadow-md`
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
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <CommunityDetail
                        community={communities[activeTab]}
                        isVisible={true}
                    />

                    {/* CTA Section */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mt-12 max-w-3xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                            Tidak yakin join{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                                IMPHNEN
                            </span>
                            ?
                        </h3>
                        <p className="text-gray-600 mb-8">
                            ikuti kami untuk bermalasan-malasan dan bersama
                            IMPHNEN kita scroll fesbuk
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {communities.map((community, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={community.link}
                                        className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-full shadow-md bg-gradient-to-r ${community.gradient}`}
                                    >
                                        <span className="text-white">
                                            {renderIcon(community.icon, 5)}
                                        </span>
                                        <span>Join {community.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div> */}
                </div>
            </div>
        </section>
    );
}
