"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const TiltCard = ({
    children,
    className = "",
    index = 0,
}: {
    children: React.ReactNode;
    className?: string;
    index?: number;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{
                y: -5,
                boxShadow: "0 15px 30px -10px rgba(0,0,0,0.12)",
                scale: 1.02,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`bg-white rounded-xl overflow-hidden transition-all duration-300 transform-gpu ${className}`}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                animate={
                    isHovered
                        ? {
                              rotateX: [0, 2, 0, -2, 0],
                              rotateY: [0, -2, 0, 2, 0],
                          }
                        : {}
                }
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const TabButton = ({
    isActive,
    label,
    onClick,
}: {
    isActive: boolean;
    label: string;
    onClick: () => void;
}) => {
    return (
        <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-6 py-2.5 rounded-full font-medium shadow-sm transition-all duration-300 overflow-hidden ${
                isActive
                    ? "text-white"
                    : "bg-white text-gray-600 hover:bg-sky-50 hover:text-sky-600"
            }`}
            onClick={onClick}
        >
            {isActive && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600"
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundSize: "200% 200%",
                    }}
                />
            )}
            {isActive && (
                <motion.div
                    className="absolute inset-0 opacity-60 bg-sky-500 blur-lg rounded-full"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.85, 0.95, 0.85],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            )}

            <span className="relative z-10">{label}</span>
        </motion.button>
    );
};

interface Fitur {
    icon: string;
    iconBg: string;
    title: string;
    description: string;
    satirNote: string;
    tag: string;
    category: string[];
}

// dummy fitur-fitur
const fiturData: Fitur[] = [
    {
        icon: "🎙️",
        iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
        title: "Diskusi Mingguan via Voice Chat",
        description:
            "Bahas konsep pemrograman secara mendalam dalam sesi diskusi interaktif mingguan. Cocok untuk yang alergi keyboard.",
        satirNote:
            "Ngomong 'algoritma' 5x sehari membuat Anda terdengar seperti programmer sungguhan",
        tag: "Populer",
        category: ["all", "pemula"],
    },
    {
        icon: "📚",
        iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
        title: "Resource Library Khusus Konsep",
        description:
            "Akses perpustakaan sumber belajar yang fokus pada pemahaman konsep. Karena membaca dokumentasi > menulis kode.",
        satirNote: "Langsung ke TL;DR, skip bagian implementasi yang ribet",
        tag: "Dasar",
        category: ["all", "pemula"],
    },
    {
        icon: "🧠",
        iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
        title: "Mental Model Workshop",
        description:
            "Workshop untuk membangun model mental yang kuat. Bayangkan saja Anda sedang coding, dan itu sudah cukup.",
        satirNote:
            "Visualisasi adalah 90% coding, sisanya cuma implementasi sepele",
        tag: "Pemula Banget",
        category: ["all", "pemula"],
    },
    {
        icon: "🎮",
        iconBg: "bg-gradient-to-br from-pink-100 to-pink-200",
        title: "Gamifikasi Konsep Programming",
        description:
            "Belajar konsep pemrograman melalui game interaktif. Dapat XP dan level up tanpa pernah melihat error message.",
        satirNote: "Kalau ada error di game, salahkan developer-nya",
        tag: "Level Noob",
        category: ["all", "pemula"],
    },
    {
        icon: "🛑",
        iconBg: "bg-gradient-to-br from-red-100 to-red-200",
        title: "No-Code Discussion Club",
        description:
            "Forum diskusi elit di mana membahas kode dilarang keras. Hanya berfokus pada high-level abstraction dan konsep filosofis.",
        satirNote:
            "Kenapa menulis kode kalau Anda bisa menulis essay tentang kode?",
        tag: "Anti-Syntax",
        category: ["all", "anti-coding"],
    },
    {
        icon: "📝",
        iconBg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
        title: "Pseudocode-as-a-Product",
        description:
            "Belajar menulis pseudocode yang begitu detil sehingga bisa dianggap 'produk jadi'. Hasil akhir? Dokumen Word.",
        satirNote:
            "Client tidak perlu tahu kalau produknya cuma tulisan, bukan aplikasi beneran",
        tag: "Hardcore",
        category: ["all", "anti-coding"],
    },
    {
        icon: "👁️",
        iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
        title: "Visual Programming Tanpa Implementasi",
        description:
            "Buat flowchart dan diagram super kompleks yang terlihat impresif tapi tidak perlu diubah menjadi kode sungguhan.",
        satirNote:
            "Semakin banyak panah dan kotak, semakin seperti programmer profesional",
        tag: "Trending",
        category: ["all", "anti-coding"],
    },
    {
        icon: "💬",
        iconBg: "bg-gradient-to-br from-teal-100 to-teal-200",
        title: "Komunitas 'No-Code Programmers'",
        description:
            "Bergabung dengan ribuan 'programmer' lain yang juga alergi sintaks. Berbagi tips bagaimana terhindar dari aktivitas ngoding.",
        satirNote:
            "Jika kita semua setuju coding itu tidak perlu, maka itu akan jadi kenyataan",
        tag: "Revolution",
        category: ["all", "anti-coding"],
    },
    {
        icon: "🤖",
        iconBg: "bg-gradient-to-br from-cyan-100 to-cyan-200",
        title: "AI Code Generator Premium",
        description:
            "Masukkan deskripsi vague, dapatkan kode lengkap. Ada bug? Generate ulang sampai benar. Deadline besok? No problem.",
        satirNote: "Programmer sejati tahu cara mendelegasikan tugas—ke AI",
        tag: "Elite Hack",
        category: ["all", "pemalas-elite"],
    },
    {
        icon: "🔄",
        iconBg: "bg-gradient-to-br from-rose-100 to-rose-200",
        title: "Code Recycling Extreme",
        description:
            "Database kode open source yang bisa Anda klaim sebagai karya sendiri. Termasuk fitur 'Quick Rename' agar tidak ketahuan plagiat.",
        satirNote: "Kode yang bagus dicopy, kode yang hebat di-rename",
        tag: "Ultra Lazy",
        category: ["all", "pemalas-elite"],
    },
    {
        icon: "🏝️",
        iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
        title: "Remote 'Working' Masterclass",
        description:
            "Teknik canggih untuk terlihat sibuk coding saat sebenarnya Anda sedang tidur siang atau nonton Netflix.",
        satirNote:
            "Status 'Coding...' selama 4 jam = 5 menit kerja + 3 jam 55 menit scrolling media sosial",
        tag: "Work-Life Hack",
        category: ["all", "pemalas-elite"],
    },
    {
        icon: "💼",
        iconBg: "bg-gradient-to-br from-amber-100 to-amber-200",
        title: "Meeting Specialist Training",
        description:
            "Kuasai seni berbicara teknis di meeting tanpa pernah menyentuh kode. Termasuk 100+ template frasa teknikal yang terdengar rumit.",
        satirNote:
            "Jawab semua pertanyaan dengan 'akan saya cek dulu', lalu tidak pernah dicek",
        tag: "Corporate Survival",
        category: ["all", "pemalas-elite"],
    },
    {
        icon: "🧙‍♂️",
        iconBg: "bg-gradient-to-br from-violet-100 to-violet-200",
        title: "Excuse Generator Pro",
        description:
            "Generator alasan teknis yang terdengar valid kenapa kode Anda belum selesai. 'Sedang menunggu dependency resolver di background process!'",
        satirNote:
            "Semakin tidak masuk akal, semakin tidak ada yang berani mempertanyakan",
        tag: "Essential",
        category: ["all", "anti-coding", "pemalas-elite"],
    },
    {
        icon: "🔮",
        iconBg: "bg-gradient-to-br from-fuchsia-100 to-fuchsia-200",
        title: "Resume Builder for 'Programmers'",
        description:
            "Bikin CV yang membuatmu terlihat seperti wizard teknologi tanpa perlu bukti portfolio. Otomatis tambahkan 'Machine Learning', 'Blockchain', dan 'Quantum Computing'.",
        satirNote:
            "10 tahun pengalaman dalam teknologi yang baru berusia 3 tahun? Why not!",
        tag: "Career Hack",
        category: ["all", "pemalas-elite"],
    },
    {
        icon: "🎭",
        iconBg: "bg-gradient-to-br from-lime-100 to-lime-200",
        title: "Tech Buzzword Masterclass",
        description:
            "Kuasai seni menggunakan buzzword terkini seperti 'serverless', 'microservices', dan 'AI-driven' untuk menutupi ketidakmampuan coding.",
        satirNote:
            "Tidak ada masalah yang tidak bisa diselesaikan dengan blockchain—terutama masalah ketidakmampuan coding",
        tag: "Jargon Master",
        category: ["all", "pemula", "pemalas-elite"],
    },
    {
        icon: "🦥",
        iconBg: "bg-gradient-to-br from-sky-100 to-sky-200",
        title: "Productive Procrastination System",
        description:
            "Teknik revolusioner untuk menunda coding sambil tetap merasa produktif. Kurikulum: reorganisasi folder proyekmu untuk ke-50 kalinya.",
        satirNote: "Sibuk ≠ Produktif, tapi terlihat sibuk > terlihat malas",
        tag: "Life Hack",
        category: ["all", "anti-coding", "pemalas-elite"],
    },
];

const tabDescriptions = {
    all: {
        title: "Semua Fitur IMPHNEN",
        desc: "Kumpulan lengkap layanan kami untuk menjadi 'programmer' tanpa perlu ngoding.",
    },
    pemula: {
        title: "Fitur Khusus Pemula",
        desc: "Untuk Anda yang masih polos dan belum trauma dengan semicolon di tempat yang salah.",
    },
    "anti-coding": {
        title: "Fitur Anti-Coding",
        desc: "Solusi radikal bagi mereka yang sudah bersumpah tidak akan pernah lagi membuka terminal.",
    },
    "pemalas-elite": {
        title: "Fitur Pemalas Elite",
        desc: "Tingkatkan skill kemalasan Anda ke level pro. Minimum effort, maximum impression.",
    },
};

export default function FiturTabs() {
    const [activeTab, setActiveTab] = useState("pemula");

    const filteredFitur = fiturData.filter((fitur) =>
        fitur.category.includes(activeTab)
    );

    const tabs = [
        { id: "all", label: "Semua Fitur" },
        { id: "pemula", label: "Untuk Pemula" },
        { id: "anti-coding", label: "Untuk Anti-Coding" },
        { id: "pemalas-elite", label: "Untuk Pemalas Elite" },
    ];

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.id}
                        isActive={activeTab === tab.id}
                        label={tab.label}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>
            <div className="text-center mb-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl mx-auto max-w-3xl relative overflow-hidden shadow-md"
                    >
                        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <svg width="100%" height="100%">
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    rx="16"
                                    ry="16"
                                    stroke="url(#gradient-stroke)"
                                    strokeWidth="2"
                                    strokeDasharray="8 4"
                                    strokeLinecap="round"
                                    className="animate-dash"
                                />
                                <defs>
                                    <linearGradient
                                        id="gradient-stroke"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#38bdf8" />
                                        <stop
                                            offset="100%"
                                            stopColor="#3b82f6"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-3 relative inline-block">
                            {
                                tabDescriptions[
                                    activeTab as keyof typeof tabDescriptions
                                ].title
                            }
                            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"></div>
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {
                                tabDescriptions[
                                    activeTab as keyof typeof tabDescriptions
                                ].desc
                            }
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <AnimatePresence>
                    {filteredFitur.map((fitur, index) => (
                        <TiltCard key={fitur.title} index={index}>
                            <div className="p-0.5 bg-white rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-dashed border-gray-200">
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-200/20 via-blue-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-6 bg-white rounded-xl relative z-10">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="relative group">
                                            <div
                                                className={`${fitur.iconBg} w-16 h-16 rounded-lg flex items-center justify-center text-3xl shadow-md relative overflow-hidden border border-white group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="absolute w-1 h-1 bg-white rounded-full"
                                                                initial={{
                                                                    x: "50%",
                                                                    y: "50%",
                                                                }}
                                                                animate={{
                                                                    x: [
                                                                        "50%",
                                                                        `${
                                                                            10 +
                                                                            i *
                                                                                20
                                                                        }%`,
                                                                    ],
                                                                    y: [
                                                                        "50%",
                                                                        `${
                                                                            10 +
                                                                            (5 -
                                                                                i) *
                                                                                15
                                                                        }%`,
                                                                    ],
                                                                    opacity: [
                                                                        0, 1, 0,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration:
                                                                        1 +
                                                                        i * 0.2,
                                                                    repeat: Infinity,
                                                                    repeatType:
                                                                        "loop",
                                                                    ease: "easeOut",
                                                                    delay:
                                                                        i * 0.1,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>

                                                <span className="relative z-10">
                                                    {fitur.icon}
                                                </span>
                                            </div>
                                            <motion.div
                                                className="absolute inset-0 bg-blue-400/20 rounded-lg filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0, 0.6, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        </div>
                                        <span className="bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 text-xs px-4 py-1.5 rounded-full font-medium border border-sky-100 shadow-sm">
                                            {fitur.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                                        {fitur.title}
                                    </h3>
                                    <p className="text-gray-600 mb-5">
                                        {fitur.description}
                                    </p>
                                    <div className="border-2 border-dashed border-amber-200 rounded-lg p-4 bg-amber-50/50 relative">
                                        <div className="flex gap-3">
                                            <div className="text-amber-500 text-xl pt-0.5">
                                                💡
                                            </div>
                                            <p className="text-amber-800 font-medium">
                                                {fitur.satirNote}
                                            </p>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full border-2 border-amber-200"></div>
                                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white rounded-full border-2 border-amber-200"></div>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </AnimatePresence>
            </div>
            {filteredFitur.length === 0 && (
                <div className="text-center py-16 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl border-2 border-dashed border-sky-200 mb-16">
                    <div className="text-6xl mb-6 opacity-70">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        Tidak ada fitur ditemukan
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Ini aneh. Mungkin kita belum mengembangkan cara untuk
                        menghindari kategori ini?
                        <br />
                        Atau mungkin karena kita terlalu malas untuk
                        mengimplementasikannya.
                    </p>
                </div>
            )}
        </div>
    );
}
