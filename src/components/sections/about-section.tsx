"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";

const TiltCard = ({
    children,
    className = "",
    tiltFactor = 10,
    scale = 1.05,
}: {
    children: React.ReactNode;
    className?: string;
    tiltFactor?: number;
    scale?: number;
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

        // Kalkulasi tilt berdasarkan posisi mouse
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
            className={`transform-gpu ${className}`}
            style={{
                transformStyle: "preserve-3d",
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

const AnimatedBlob = ({
    className = "",
    delay = 0,
    duration = 20,
    size = "w-96 h-96",
}) => (
    <motion.div
        className={`absolute ${size} rounded-full mix-blend-multiply filter blur-3xl opacity-70 ${className}`}
        animate={{
            scale: [1, 1.1, 1.05, 1.15, 1],
            rotate: [0, 10, 5, 15, 0],
            x: [0, 20, -10, 5, 0],
            y: [0, -20, 10, -5, 0],
        }}
        transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
            times: [0, 0.25, 0.5, 0.75, 1],
        }}
    />
);

export default function AboutSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

    // Custom cursor effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setCursorVisible(true);
        const handleMouseLeave = () => setCursorVisible(false);

        const section = document.getElementById("about");
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
            id="about"
            className="relative py-24 bg-gradient-to-br from-white via-gray-50 to-sky-50 overflow-hidden"
        >
            <div className="relative" ref={ref}>
                {/* Custom cursor trail */}
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

                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Background blobs dengan variasi ukuran dan posisi */}
                    <AnimatedBlob className="bg-sky-100 -top-32 -right-32" />
                    <AnimatedBlob
                        className="bg-indigo-100 -bottom-32 -left-32"
                        delay={5}
                        duration={25}
                    />
                    <AnimatedBlob
                        className="bg-purple-100 top-1/4 -right-40"
                        size="w-64 h-64"
                        delay={2}
                        duration={18}
                    />
                    <AnimatedBlob
                        className="bg-blue-100 bottom-1/4 -left-28"
                        size="w-72 h-72"
                        delay={7}
                        duration={22}
                    />

                    {/* Floating Elements with parallax effect */}
                    <motion.div
                        className="absolute top-1/4 right-[10%] opacity-20"
                        style={{ y: y1, rotate: rotate1 }}
                    >
                        <motion.div
                            className="text-6xl"
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            💭
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-1/4 left-[10%] opacity-20"
                        style={{ y: y2, rotate: rotate2 }}
                    >
                        <motion.div
                            className="text-6xl"
                            animate={{ y: [0, 20, 0] }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            💻
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="absolute top-1/2 right-[15%] opacity-20"
                        style={{ y: y2 }}
                    >
                        <motion.div
                            className="text-7xl"
                            animate={{ y: [0, 25, 0] }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2,
                            }}
                        >
                            🧠
                        </motion.div>
                    </motion.div>

                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage:
                                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234299e1' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            }}
                        ></div>
                    </div>

                    {/* Decorative Shapes */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-4 h-4 rounded-full ${
                                i % 3 === 0
                                    ? "bg-sky-200"
                                    : i % 3 === 1
                                    ? "bg-indigo-200"
                                    : "bg-purple-200"
                            }`}
                            style={{
                                top: `${10 + i * 10}%`,
                                left: `${5 + i * 10}%`,
                            }}
                            animate={{
                                y: [0, 10, 0],
                                x: [0, i % 2 === 0 ? 10 : -10, 0],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header dengan glow effect */}
                        <div className="text-center mb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <motion.div
                                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-blue-300 rounded-full filter blur-3xl opacity-20"
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

                                <div className="inline-block bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-medium mb-4 shadow-lg transform rotate-1 hover:rotate-0 transition-transform">
                                    <span className="inline-block transform -rotate-1">
                                        Cerita Kami
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                                    Apa itu{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 relative inline-block">
                                        IMPHNEN
                                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"></div>
                                    </span>
                                    ?
                                </h2>

                                <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                                    Gerakan revolusioner yang mendobrak
                                    paradigma &quot;programmer harus
                                    coding&quot; dengan pendekatan berbasis
                                    konsep dan mindset.
                                </p>
                            </motion.div>
                        </div>

                        {/* Main Content */}
                        <div className="mb-20">
                            {/* Origin Story - 2 Column Layout with 3D Tilt effect */}
                            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-24">
                                {/* Left Column - Image with 3D tilt */}
                                <motion.div
                                    className="md:w-1/2"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <TiltCard className="relative">
                                        <div className="relative rounded-2xl overflow-hidden shadow-xl border-8 border-white transform rotate-2">
                                            <div className="aspect-[4/3] bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center overflow-hidden">
                                                {/* Animated background pattern */}
                                                <div className="absolute inset-0 opacity-10">
                                                    <svg
                                                        width="100%"
                                                        height="100%"
                                                        className="animate-slow-spin"
                                                    >
                                                        <pattern
                                                            id="pattern-circles"
                                                            x="0"
                                                            y="0"
                                                            width="20"
                                                            height="20"
                                                            patternUnits="userSpaceOnUse"
                                                            patternContentUnits="userSpaceOnUse"
                                                        >
                                                            <circle
                                                                id="pattern-circle"
                                                                cx="10"
                                                                cy="10"
                                                                r="1.6257413380501518"
                                                                fill="#fff"
                                                            ></circle>
                                                        </pattern>
                                                        <rect
                                                            x="0"
                                                            y="0"
                                                            width="100%"
                                                            height="100%"
                                                            fill="url(#pattern-circles)"
                                                        ></rect>
                                                    </svg>
                                                </div>

                                                <div className="text-center text-white p-8 relative z-10">
                                                    <motion.div
                                                        className="text-9xl mb-6 drop-shadow-xl"
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                            rotate: [0, 5, 0],
                                                            y: [0, -5, 0],
                                                        }}
                                                        transition={{
                                                            duration: 5,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                        }}
                                                    >
                                                        🧠
                                                    </motion.div>
                                                    <div className="font-bold text-2xl leading-tight">
                                                        Mind Over Matter <br />
                                                        <span className="opacity-80 text-lg">
                                                            Est. 2023
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Decorative elements */}
                                        <div className="absolute -top-8 -left-8 w-16 h-16 bg-indigo-100 rounded-full transform rotate-12"></div>
                                        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-sky-100 rounded-full transform -rotate-12"></div>

                                        <motion.div
                                            className="absolute -right-5 top-1/3 w-24 h-24 bg-white rounded-lg shadow-lg p-4 font-mono text-xs text-gray-500 flex items-center justify-center border border-gray-200 transform rotate-6"
                                            animate={{
                                                rotate: [6, 2, 6],
                                                y: [0, -8, 0],
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            {"/* No code needed */"}
                                        </motion.div>

                                        {/* Added code snippet floating element */}
                                        <motion.div
                                            className="absolute -left-10 bottom-20 w-28 h-28 bg-black text-green-400 rounded-lg shadow-lg p-3 font-mono text-[9px] flex items-center justify-center transform -rotate-6 opacity-80"
                                            animate={{
                                                rotate: [-6, -12, -6],
                                                y: [0, 8, 0],
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 1,
                                            }}
                                        >
                                            <div>
                                                <div className="text-purple-400">
                                                    function
                                                </div>
                                                <div>
                                                    <span className="text-yellow-400">
                                                        codeIsOptional
                                                    </span>
                                                    () {"{"}
                                                </div>
                                                <div className="ml-2 text-red-400">
                                                    return{" "}
                                                    <span className="text-blue-400">
                                                        true
                                                    </span>
                                                    ;
                                                </div>
                                                <div>{"}"}</div>
                                            </div>
                                        </motion.div>
                                    </TiltCard>
                                </motion.div>

                                {/* Right Column - Text Content with gradient text */}
                                <motion.div
                                    className="md:w-1/2"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h3 className="text-2xl font-extrabold mb-6 text-gray-800">
                                        Asal Mula{" "}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 relative">
                                            IMPHNEN
                                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
                                        </span>
                                    </h3>

                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        Berawal dari frustrasi kolektif terhadap
                                        tutorial coding yang membosankan dan
                                        error yang tak kunjung teratasi,
                                        sekelompok &quot;programmer yang malas
                                        coding&quot; mendirikan IMPHNEN pada
                                        tahun 2023-2024 lupa lagi.
                                    </p>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Nama IMPHNEN sendiri berasal dari
                                        singkatan &quot;Ingin Menjadi Progammer
                                        Handal, Namun Enggan Ngoding&quot; -
                                        menegaskan identitas kami sebagai
                                        programmer yang malas ngoding.
                                    </p>

                                    <TiltCard
                                        tiltFactor={5}
                                        scale={1.02}
                                        className="mb-8"
                                    >
                                        <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 relative z-10 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5"></div>
                                            <div className="flex">
                                                <div className="text-3xl mr-4">
                                                    💡
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">
                                                        Fun Fact
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Pendiri IMPHNEN awalnya
                                                        mencoba membuat website
                                                        tanpa coding selama 6
                                                        bulan. Hasilnya? Mereka
                                                        bener-benar malas
                                                        ngoding mending scroll
                                                        fesbuk.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            </div>

                            {/* Our Mission - Centered Layout with Tilted Cards */}
                            <div className="mb-24 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                        Misi Kami
                                    </h3>
                                    <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
                                        Kami percaya bahwa pemahaman konsep jauh
                                        lebih penting daripada kemampuan coding.
                                        IMPHNEN ada untuk menghilangkan hambatan
                                        dan menciptakan pendekatan baru dalam
                                        dunia programming.
                                    </p>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        {
                                            icon: "🚫",
                                            title: "Anti-Syntax Stress",
                                            description:
                                                "Bebaskan diri dari beban menghafal syntax dan error messages yang membingungkan. Fokus pada big picture, bukan semicolon yang hilang.",
                                            color: "from-sky-500 to-sky-400",
                                            rotate: "-rotate-2",
                                        },
                                        {
                                            icon: "🧩",
                                            title: "Konsep > Kode",
                                            description:
                                                "Kuasai konsep fundamental dan pola pikir pemecahan masalah. Kode hanyalah implementasi dari ide-ide brilian Anda.",
                                            color: "from-blue-500 to-indigo-500",
                                            rotate: "rotate-1",
                                        },
                                        {
                                            icon: "🤹‍♂️",
                                            title: "Programmer Lifestyle",
                                            description:
                                                "Nikmati gaya hidup programmer tanpa beban debugging hingga larut malam. Bicarakan konsep algoritma sambil menikmati kopi.",
                                            color: "from-indigo-500 to-purple-500",
                                            rotate: "-rotate-1",
                                        },
                                    ].map((card, i) => (
                                        <TiltCard
                                            key={i}
                                            className={`bg-white rounded-xl shadow-lg overflow-hidden relative group ${card.rotate}`}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: i * 0.1,
                                                }}
                                            >
                                                <div
                                                    className={`h-2 bg-gradient-to-r ${card.color}`}
                                                ></div>
                                                <div className="p-8">
                                                    <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110">
                                                        {card.icon}
                                                    </div>
                                                    <h4 className="text-xl font-bold mb-3 text-gray-800">
                                                        {card.title}
                                                    </h4>
                                                    <p className="text-gray-600">
                                                        {card.description}
                                                    </p>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                            </motion.div>
                                        </TiltCard>
                                    ))}
                                </div>
                            </div>

                            {/* How It Works - 3 Column Layout dengan koneksi animasi */}
                            <div className="mb-24">
                                <div className="text-center mb-12">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                            Bagaimana IMPHNEN Bekerja?
                                        </h3>
                                        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                                            Pendekatan unik kami mengubah cara
                                            Anda melihat dunia pemrograman.
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="relative">
                                    {/* Animated connection line */}
                                    <div className="hidden md:block absolute top-1/2 left-0 right-0 z-0 h-2 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 w-full"
                                            animate={{
                                                x: ["-100%", "100%"],
                                            }}
                                            transition={{
                                                duration: 5,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                                        {[
                                            {
                                                step: "01",
                                                title: "Dekonstruksi Kode",
                                                description:
                                                    "Lupakan tentang belajar coding. Kami memecah programming menjadi konsep-konsep filosofis yang bisa dimengerti tanpa harus menulis satu baris kode pun.",
                                                icon: "🔍",
                                                rotate: "rotate-2",
                                            },
                                            {
                                                step: "02",
                                                title: "Pemahaman Konseptual",
                                                description:
                                                    "Mengembangkan 'peta mental' tentang bagaimana program bekerja. Seperti memahami resep masakan tanpa harus pernah memasak.",
                                                icon: "🧠",
                                                rotate: "-rotate-1",
                                            },
                                            {
                                                step: "03",
                                                title: "Aplikasi Teoritis",
                                                description:
                                                    "Gunakan pemahaman konseptual untuk membicarakan solusi, tanpa perlu implementasi teknis. Gunakan frasa seperti 'arsitektur sistem', 'skalabilitas', dan 'paradigma'.",
                                                icon: "💬",
                                                rotate: "rotate-1",
                                            },
                                        ].map((step, i) => (
                                            <TiltCard
                                                key={i}
                                                className={`${step.rotate} perspective-1000`}
                                            >
                                                <motion.div
                                                    className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 relative transform-gpu backface-hidden"
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: i * 0.2,
                                                    }}
                                                >
                                                    {/* Animated gradient circle number */}
                                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white flex items-center justify-center font-bold absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg md:left-auto md:translate-x-0 overflow-hidden">
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600"
                                                            animate={{
                                                                x: [
                                                                    "-100%",
                                                                    "100%",
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 3,
                                                                repeat: Infinity,
                                                                ease: "linear",
                                                                delay: i,
                                                            }}
                                                        />
                                                        <span className="relative z-10">
                                                            {step.step}
                                                        </span>
                                                    </div>

                                                    <div className="text-5xl mb-5 mt-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                                                        {step.icon}
                                                    </div>
                                                    <h4 className="text-xl font-bold mb-3 text-gray-800">
                                                        {step.title}
                                                    </h4>
                                                    <p className="text-gray-600">
                                                        {step.description}
                                                    </p>

                                                    {/* Glowing dot */}
                                                    <motion.div
                                                        className="absolute -bottom-1 right-6 w-3 h-3 rounded-full bg-blue-400"
                                                        animate={{
                                                            opacity: [
                                                                0.2, 1, 0.2,
                                                            ],
                                                            scale: [1, 1.2, 1],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                            delay: i * 0.5,
                                                        }}
                                                    />
                                                </motion.div>
                                            </TiltCard>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Values and Principles - Alternating Layout with nicer visuals */}
                            <div>
                                <div className="text-center mb-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                            Nilai-nilai IMPHNEN
                                        </h3>
                                        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                                            Prinsip yang memandu komunitas kami
                                            dalam revolusi anti-coding.
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="space-y-20 md:space-y-32">
                                    {[
                                        {
                                            title: "Pemahaman Mengalahkan Implementasi",
                                            description:
                                                "Kenapa susah-susah menulis kode ketika Anda bisa memahami konsepnya saja? Kami percaya bahwa pemahaman yang mendalam tentang 'mengapa' lebih penting daripada 'bagaimana' mengimplementasikannya.",
                                            quote: "Coding adalah seni membingkai masalah, bukan hanya menulis solusi.",
                                            author: "Tidak Diketahui",
                                            image: "🎨",
                                            direction: "ltr",
                                            gradient:
                                                "from-sky-400 to-blue-500",
                                        },
                                        {
                                            title: "Komunitas di Atas Kompetensi",
                                            description:
                                                "Kami membangun komunitas yang mendukung, di mana anggota saling berbagi pemahaman konseptual tanpa terhalang oleh 'kemampuan teknis'. Diskusi filosofis tentang bagaimana program 'seharusnya' bekerja lebih menarik daripada debugging.",
                                            quote: "Saya bergabung dengan IMPHNEN dan sekarang saya bisa mendiskusikan machine learning tanpa pernah menulis satu baris kode Python pun!",
                                            author: "Member sejak 2023",
                                            image: "👥",
                                            direction: "rtl",
                                            gradient:
                                                "from-indigo-400 to-purple-500",
                                        },
                                        {
                                            title: "Pemikiran Kreatif Tanpa Batas Teknis",
                                            description:
                                                "Bebas dari batasan teknis seperti 'apa yang mungkin diimplementasikan', anggota IMPHNEN dapat mengeksplorasi ide-ide programming yang benar-benar inovatif dan revolusioner.",
                                            quote: "Ketika Anda tidak perlu memikirkan bagaimana mengimplementasikannya, kreativitas Anda benar-benar tidak terbatas.",
                                            author: "IMPHNEN Philosopher",
                                            image: "✨",
                                            direction: "ltr",
                                            gradient:
                                                "from-amber-400 to-orange-500",
                                        },
                                        {
                                            title: "Perubahan Ketika Saya join IMPHNEN",
                                            description:
                                                "saya join IMPHNEN pada tahun 2023, dan sekarang semenjak saya join IMPHNEN, saya jadi tidak mau buka vscode lagi mending scroll fesbuk 🥴",
                                            quote: "sekarang saya jadi pengguna facebook gila",
                                            author: "IMPHNEN Philosopher",
                                            image: "✨",
                                            direction: "rtl",
                                            gradient:
                                                "from-rose-400 to-pink-500",
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className={`flex flex-col ${
                                                item.direction === "rtl"
                                                    ? "md:flex-row-reverse"
                                                    : "md:flex-row"
                                            } items-center gap-10 md:gap-16`}
                                        >
                                            {/* Image Column - now with nicer 3D tilt */}
                                            <motion.div
                                                className="md:w-2/5"
                                                initial={{
                                                    opacity: 0,
                                                    x:
                                                        item.direction === "rtl"
                                                            ? 30
                                                            : -30,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                <TiltCard className="relative">
                                                    <div className="relative">
                                                        <div
                                                            className={`aspect-square bg-gradient-to-br ${
                                                                item.direction ===
                                                                "rtl"
                                                                    ? "rotate-3"
                                                                    : "-rotate-3"
                                                            } from-white to-gray-50 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden group border-2 border-white`}
                                                        >
                                                            <div
                                                                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                                                            ></div>

                                                            {/* Floating circles in background */}
                                                            <div className="absolute inset-0 overflow-hidden">
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, j) => (
                                                                        <motion.div
                                                                            key={
                                                                                j
                                                                            }
                                                                            className={`absolute w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} opacity-20`}
                                                                            style={{
                                                                                top: `${
                                                                                    20 +
                                                                                    j *
                                                                                        15
                                                                                }%`,
                                                                                left: `${
                                                                                    10 +
                                                                                    j *
                                                                                        20
                                                                                }%`,
                                                                            }}
                                                                            animate={{
                                                                                y: [
                                                                                    0,
                                                                                    -15,
                                                                                    0,
                                                                                ],
                                                                                x: [
                                                                                    0,
                                                                                    j %
                                                                                        2 ===
                                                                                    0
                                                                                        ? 15
                                                                                        : -15,
                                                                                    0,
                                                                                ],
                                                                                opacity:
                                                                                    [
                                                                                        0.1,
                                                                                        0.3,
                                                                                        0.1,
                                                                                    ],
                                                                            }}
                                                                            transition={{
                                                                                duration:
                                                                                    4 +
                                                                                    j,
                                                                                repeat: Infinity,
                                                                                ease: "easeInOut",
                                                                                delay:
                                                                                    j *
                                                                                    0.5,
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                            </div>

                                                            <motion.div
                                                                className="text-9xl transform group-hover:scale-110 transition-transform duration-500 relative z-10"
                                                                animate={{
                                                                    rotate: [
                                                                        0, 5,
                                                                        -5, 0,
                                                                    ],
                                                                    y: [
                                                                        0, -5,
                                                                        5, 0,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 10,
                                                                    repeat: Infinity,
                                                                    ease: "easeInOut",
                                                                }}
                                                            >
                                                                {item.image}
                                                            </motion.div>
                                                        </div>

                                                        <motion.div
                                                            className={`absolute ${
                                                                item.direction ===
                                                                "rtl"
                                                                    ? "-left-10"
                                                                    : "-right-10"
                                                            } bottom-10 bg-white rounded-xl p-5 shadow-xl border border-gray-100 max-w-xs transform ${
                                                                item.direction ===
                                                                "rtl"
                                                                    ? "-rotate-2"
                                                                    : "rotate-2"
                                                            }`}
                                                            animate={{
                                                                y: [0, -5, 0],
                                                                rotate:
                                                                    item.direction ===
                                                                    "rtl"
                                                                        ? [
                                                                              -2,
                                                                              -4,
                                                                              -2,
                                                                          ]
                                                                        : [
                                                                              2,
                                                                              4,
                                                                              2,
                                                                          ],
                                                            }}
                                                            transition={{
                                                                duration: 6,
                                                                repeat: Infinity,
                                                                ease: "easeInOut",
                                                            }}
                                                        >
                                                            <div className="absolute -top-2 -left-2 w-7 h-7 bg-gradient-to-br from-gray-100 to-white rounded-full border border-gray-200 flex items-center justify-center z-10">
                                                                <div className="text-xl">
                                                                    &quot;
                                                                </div>
                                                            </div>

                                                            <p className="italic text-gray-600 text-sm font-medium">
                                                                &quot;
                                                                {item.quote}
                                                                &quot;
                                                            </p>
                                                            <p className="text-gray-500 text-xs mt-2 font-medium">
                                                                — {item.author}
                                                            </p>
                                                        </motion.div>
                                                    </div>
                                                </TiltCard>
                                            </motion.div>

                                            {/* Text Column with better styling */}
                                            <motion.div
                                                className="md:w-3/5"
                                                initial={{
                                                    opacity: 0,
                                                    x:
                                                        item.direction === "rtl"
                                                            ? -30
                                                            : 30,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                <h3 className="text-2xl font-bold mb-4 text-gray-800 inline-block relative">
                                                    {item.title}
                                                    <div
                                                        className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r ${item.gradient} rounded-full`}
                                                    ></div>
                                                </h3>
                                                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <div
                                                        className={`w-12 h-1 bg-gradient-to-r ${item.gradient} rounded-full`}
                                                    ></div>
                                                    <div className="ml-3 font-medium bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                                                        Prinsip Inti
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Join the Movement - CTA with tilted design */}
                        <motion.div
                            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden border border-gray-100 transform rotate-1"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Floating blobs */}
                            <motion.div
                                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-full opacity-70"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 10, 0],
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-tr from-indigo-100 to-sky-100 rounded-full opacity-70"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, -10, 0],
                                    y: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2,
                                }}
                            />

                            <div className="relative z-10 flex flex-col md:flex-row items-center transform -rotate-1">
                                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-10">
                                    <motion.div
                                        className="text-5xl mb-4"
                                        animate={{
                                            y: [0, -10, 0],
                                            rotate: [0, 10, 0],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        🚀
                                    </motion.div>
                                    <a
                                        href="#community"
                                        className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block"
                                    >
                                        Bergabunglah dengan Revolusi Anti-Coding
                                        <div className="w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full mt-1"></div>
                                    </a>
                                    <p className="text-gray-600 text-lg">
                                        Jadilah bagian dari gerakan yang
                                        mengubah cara dunia memandang
                                        programming. Di IMPHNEN, kami
                                        membuktikan bahwa Anda bisa menjadi
                                        programmer tanpa perlu stress dengan
                                        coding.
                                    </p>
                                </div>
                                <div className="md:w-1/3 flex flex-col space-y-4">
                                    <TiltCard tiltFactor={15} scale={1.05}>
                                        <motion.div
                                            whileTap={{ scale: 0.95 }}
                                            className="transform rotate-3"
                                        >
                                            <Button className="w-full h-14 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white text-center px-6 py-3 rounded-lg font-bold text-lg shadow-lg border-2 border-white">
                                                Bergabung Sekarang{" "}
                                                <span className="ml-2">👀</span>
                                            </Button>
                                        </motion.div>
                                    </TiltCard>

                                    <TiltCard tiltFactor={15} scale={1.05}>
                                        <motion.div
                                            whileTap={{ scale: 0.95 }}
                                            className="transform -rotate-2"
                                        >
                                            <Button className="w-full h-14 bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 text-center px-6 py-3 rounded-lg font-bold text-lg shadow-md">
                                                Tidak Malas{" "}
                                                <span className="ml-2">🙄</span>
                                            </Button>
                                        </motion.div>
                                    </TiltCard>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes slow-spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-slow-spin {
                    animation: slow-spin 60s linear infinite;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .transform-gpu {
                    transform: translateZ(0);
                }
            `}</style>
        </section>
    );
}
