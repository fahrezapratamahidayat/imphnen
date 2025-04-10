"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import FiturTabs from "../ui/FiturTabs";

type Particle = {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
};

const DataAnut = [
    {
        icon: "🛌",
        title: "Lazy Evaluation++",
        description:
            "Tidak hanya mengevaluasi ekspresi saat diperlukan, tapi juga menunda pembuatan ekspresi tersebut sampai deadline mendesak.",
        color: "from-sky-400 to-blue-500",
        bg: "bg-gradient-to-br from-sky-50 to-sky-100",
        rotate: "-rotate-2",
    },
    {
        icon: "📋",
        title: "Copy-Oriented Programming",
        description:
            "Mengapa menulis kode sendiri kalau Stack Overflow sudah menyediakan segalanya? CTRL+C, CTRL+V adalah keterampilan utama.",
        color: "from-blue-400 to-indigo-500",
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        rotate: "rotate-1",
    },
    {
        icon: "🎭",
        title: "Pseudo-Driven Development",
        description:
            "Fokus pada penulisan pseudocode yang sangat detil, hingga tidak perlu lagi menulis kode yang sebenarnya.",
        color: "from-indigo-400 to-purple-500",
        bg: "bg-gradient-to-br from-purple-50 to-purple-100",
        rotate: "-rotate-1",
    },
    {
        icon: "💰",
        title: "Budget-Driven Debugging",
        description:
            'Tidak perlu fix bug yang sulit—cukup yakinkan client bahwa itu sebenarnya adalah "fitur premium" yang memerlukan upgrade paket.',
        color: "from-emerald-400 to-green-500",
        bg: "bg-gradient-to-br from-green-50 to-green-100",
        rotate: "rotate-1",
    },
    {
        icon: "🔄",
        title: "Scapegoat Architecture",
        description:
            'Rancang sistem agar selalu ada teknologi/framework yang bisa disalahkan saat terjadi masalah. "Ah, ini bug di library-nya, bukan di kode kita."',
        color: "from-amber-400 to-orange-500",
        bg: "bg-gradient-to-br from-amber-50 to-amber-100",
        rotate: "-rotate-2",
    },
    {
        icon: "🎮",
        title: "Comment-Only Programming",
        description:
            'Tulis rencana kode dalam bentuk komentar super detil. Jika ada yang tanya mana implementasinya, jawab "Sedang dalam pengembangan."',
        color: "from-rose-400 to-pink-500",
        bg: "bg-gradient-to-br from-rose-50 to-rose-100",
        rotate: "rotate-2",
    },
];

const TiltCard = ({
    children,
    className = "",
    tiltFactor = 10,
    scale = 1.03,
    initialRotate = "0",
}: {
    children: React.ReactNode;
    className?: string;
    tiltFactor?: number;
    scale?: number;
    initialRotate?: string;
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
                transform: `rotate(${initialRotate})`,
            }}
            whileHover={{ scale }}
            animate={{
                transform: `perspective(1000px) rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg)`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
};

const AnimatedBlob = ({ className = "", delay = 0, duration = 15 }) => (
    <motion.div
        className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${className}`}
        animate={{
            scale: [1, 1.2, 1.1, 1.3, 1],
            x: [0, 30, -20, 10, 0],
            y: [0, -30, 10, -20, 0],
            rotate: [0, 30, 15, 45, 0],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
        }}
    />
);

const GlowingIcon = ({
    children,
    size = "text-3xl",
    delay = 0,
    duration = 5,
    className = "",
}: {
    children: React.ReactNode;
    size?: string;
    delay?: number;
    duration?: number;
    className?: string;
}) => (
    <motion.div
        className={`relative ${size} ${className}`}
        animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    >
        <div className="absolute inset-0 rounded-full bg-blue-300 filter blur-xl opacity-30 scale-125"></div>
        <div className="relative z-10">{children}</div>
    </motion.div>
);

export default function FiturSection() {
    // Parallax scrolling effect
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15]);

    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // generate random particles effect
        const newParticles = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * 5,
            color:
                i % 3 === 0
                    ? "bg-sky-200"
                    : i % 3 === 1
                    ? "bg-indigo-200"
                    : "bg-purple-200",
        }));

        setParticles(newParticles);
    }, []);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setCursorVisible(true);
        const handleMouseLeave = () => setCursorVisible(false);

        const section = document.getElementById("features");
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
            className="py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden"
            id="features"
        >
            <div className="relative " ref={ref}>
                <motion.div
                    className="fixed w-6 h-6 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-md opacity-50 pointer-events-none z-50 bg-red-500"
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
                <AnimatedBlob className="bg-sky-200 w-96 h-96 -top-32 -left-32" />
                <AnimatedBlob
                    className="bg-indigo-200 w-80 h-80 bottom-20 -right-20"
                    delay={2}
                />
                <AnimatedBlob
                    className="bg-purple-200 w-64 h-64 top-1/3 right-10"
                    delay={4}
                    duration={20}
                />
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className={`absolute rounded-full ${particle.color} opacity-30`}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
                <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%" className="absolute">
                        <pattern
                            id="pattern-grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="#4299e1"
                                strokeWidth="0.5"
                                opacity="0.3"
                            />
                        </pattern>
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#pattern-grid)"
                        />
                    </svg>
                </div>
                <motion.div
                    className="absolute top-20 right-[10%] text-7xl opacity-20"
                    style={{ y: y1, rotate: rotate1 }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                    >
                        💻
                    </motion.div>
                </motion.div>
                <motion.div
                    className="absolute bottom-20 left-[10%] text-6xl opacity-20"
                    style={{ y: y2, rotate: rotate2 }}
                >
                    <motion.div
                        animate={{ rotate: [0, -10, 0], y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 8 }}
                    >
                        📱
                    </motion.div>
                </motion.div>
                <motion.div
                    className="absolute top-1/3 left-[15%] text-6xl opacity-20"
                    style={{ y: y1, rotate: rotate2 }}
                >
                    <motion.div
                        animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 7, delay: 1 }}
                    >
                        🚀
                    </motion.div>
                </motion.div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 relative"
                        >
                            <motion.div
                                className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-blue-300 rounded-full filter blur-3xl opacity-20"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.3, 0.2],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <h2 className="text-3xl md:text-5xl font-bold mb-6 inline-block relative">
                                <motion.span
                                    className="inline-block text-gray-800 mr-2"
                                    animate={{ rotate: [-1, 1, -1] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 5,
                                    }}
                                >
                                    Fitur
                                </motion.span>
                                <motion.span
                                    className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
                                    animate={{ rotate: [1, -1, 1] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 5,
                                    }}
                                >
                                    Unggulan
                                </motion.span>
                                <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-300 to-blue-500 rounded-full"></div>
                            </h2>

                            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                                Berbagai fitur dan layanan yang memungkinkan
                                Anda menyebut diri &quot;programmer&quot;
                                <motion.span
                                    className="text-sm italic ml-1 inline-block"
                                    animate={{
                                        opacity: [0.7, 1, 0.7],
                                        x: [0, 2, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                    }}
                                >
                                    tapi malas ngoding
                                </motion.span>
                                .
                            </p>
                        </motion.div>
                        <FiturTabs />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-xl relative mb-20 overflow-hidden transform rotate-1"
                        >
                            <motion.div
                                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-sky-200 rounded-full opacity-40 transform translate-x-20 -translate-y-20"
                                animate={{
                                    scale: [1, 1.2, 1.1, 1],
                                    rotate: [0, 10, 5, 0],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.div
                                className="absolute bottom-0 left-0 w-52 h-52 bg-gradient-to-tr from-indigo-100 to-purple-200 rounded-full opacity-40 transform -translate-x-20 translate-y-20"
                                animate={{
                                    scale: [1, 1.1, 1.2, 1],
                                    rotate: [0, -10, -5, 0],
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2,
                                }}
                            />

                            <div className="relative transform -rotate-1">
                                <h3 className="text-3xl font-bold mb-8 text-gray-800 inline-block relative">
                                    Paradigma &quot;Anti-Programming&quot; yang
                                    Kami Anut
                                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
                                    {DataAnut.map((item, i) => (
                                        <TiltCard
                                            key={i}
                                            className={`${item.rotate}`}
                                            initialRotate={item.rotate}
                                        >
                                            <div
                                                className={`${item.bg} rounded-xl p-6 border border-white shadow-lg overflow-hidden relative group`}
                                            >
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full filter blur-xl opacity-50 transform translate-x-10 -translate-y-10 group-hover:translate-x-5 transition-all duration-700"></div>

                                                <div className="relative z-10">
                                                    <GlowingIcon
                                                        className="mb-4"
                                                        delay={i * 0.5}
                                                    >
                                                        <div
                                                            className={`bg-gradient-to-r ${item.color} w-14 h-14 rounded-lg text-2xl text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                                                        >
                                                            {item.icon}
                                                        </div>
                                                    </GlowingIcon>

                                                    <h4 className="font-bold text-lg mb-3 text-gray-800">
                                                        {item.title}
                                                    </h4>

                                                    <p className="text-gray-600">
                                                        {item.description}
                                                    </p>
                                                    <div className="absolute bottom-3 right-3 flex space-x-1">
                                                        {[...Array(3)].map(
                                                            (_, j) => (
                                                                <motion.div
                                                                    key={j}
                                                                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} opacity-50`}
                                                                    animate={{
                                                                        opacity:
                                                                            [
                                                                                0.3,
                                                                                0.6,
                                                                                0.3,
                                                                            ],
                                                                        scale: [
                                                                            1,
                                                                            1.2,
                                                                            1,
                                                                        ],
                                                                    }}
                                                                    transition={{
                                                                        duration: 2,
                                                                        delay:
                                                                            j *
                                                                                0.3 +
                                                                            i *
                                                                                0.2,
                                                                        repeat: Infinity,
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TiltCard>
                                    ))}
                                </div>
                                <TiltCard tiltFactor={5} scale={1.02}>
                                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-5 flex items-start gap-4 border border-amber-200 shadow-md relative transform rotate-1 overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-full bg-amber-50 opacity-50 pointer-events-none"></div>
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOGUzYWYiPjwvcmVjdD4KPC9zdmc+')] opacity-20 pointer-events-none"></div>

                                        <div className="relative z-10">
                                            <div className="text-amber-500 text-3xl mt-1 transform -rotate-12">
                                                ⚠️
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex-1">
                                            <p className="text-amber-800 font-bold text-lg mb-2">
                                                Catatan Penting:
                                            </p>
                                            <p className="text-amber-700">
                                                Paradigma di atas bercanda sih.
                                                Meskipun kami bercanda, kami
                                                tetap mendorong pemahaman konsep
                                                yang kuat. Ngoding itu memang
                                                susah, tapi tetap penting untuk
                                                scroll fesbuk biar ga stress dan
                                                sayangi tubuh anda.
                                            </p>

                                            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-amber-700 opacity-10 transform rotate-12 hidden md:block"></div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
