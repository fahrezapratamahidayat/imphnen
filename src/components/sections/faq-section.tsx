"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";
export default function FaqSection() {
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

        const section = document.getElementById("faq");
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
            className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
            id="faq"
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
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/30 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-32 -left-20 w-80 h-80 bg-blue-200/20 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, -30, 0] }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Decorative Elements */}
                <div className="absolute top-1/4 right-[10%] opacity-10">
                    <motion.div
                        className="text-6xl"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        ❓
                    </motion.div>
                </div>
                <div className="absolute bottom-1/4 left-[5%] opacity-10">
                    <motion.div
                        className="text-6xl"
                        animate={{ rotate: [0, -10, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        🤔
                    </motion.div>
                </div>

                {/* Floating Tiny Elements */}
                {[...Array(100)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
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

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <div className="text-center mb-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-3"
                        >
                            Yang sering ditanya
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                            Pertanyaan yang{" "}
                            <span className="text-sky-500">
                                Mengusik Pikiran
                            </span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Berikut adalah jawaban untuk pertanyaan-pertanyaan
                            yang membuat Anda penasaran (atau tidak).
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto mt-12">
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.15,
                                    },
                                },
                            }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <Accordion
                                type="single"
                                collapsible
                                className="space-y-4"
                            >
                                {[
                                    {
                                        question:
                                            "Apakah IMPHNEN cocok untuk pemula tanpa background IT?",
                                        answer: "Oh tentu saja! Bahkan lebih baik lagi kalau Anda tidak punya background IT sama sekali. Otak Anda belum terkontaminasi dengan konsep-konsep coding yang membingungkan seperti 'logika' dan 'debugging'. Kami akan melatih Anda untuk menjadi programmer tanpa perlu memusingkan detail-detail kecil seperti... uh, menulis kode.",
                                        emoji: "🙈",
                                    },
                                    {
                                        question:
                                            "Apakah saya perlu laptop spesifikasi tinggi?",
                                        answer: "Sebenarnya, laptop cukeram untuk menjalankan fesbuk saya sudah cukup bahkan intel celeron juga sudah lebih dari cukup. Toh, programmer sejati lebih fokus pada konsep, bukan pada hal-hal sepele seperti 'menjalankan program' atau 'kompilasi kode'. Jika laptop Anda bisa menampilkan meme programming, Anda sudah siap bergabung dengan IMPHNEN. RGB lighting opsional, tapi sangat direkomendasikan untuk meningkatkan kemampuan 'programming tanpa coding'.",
                                        emoji: "💻",
                                    },
                                    {
                                        question:
                                            "Berapa lama waktu yang dibutuhkan untuk menguasai pemrograman dengan metode IMPHNEN?",
                                        answer: "Pertanyaan yang sangat bagus! Dengan metode kami, Anda bisa dengan bangga menyebut diri sebagai programmer hanya dalam waktu 3 hari. Cukup hafalkan beberapa terminologi seperti 'algoritma', 'framework', dan 'deployment', lalu sisipkan dalam percakapan normal. Untuk bonus poin, ucapkan 'Ya, itu cuma masalah optimasi' saat teman Anda mengeluhkan program yang lambat. Jika ada yang meminta Anda untuk menulis kode aktual, cukup jawab bahwa Anda lebih fokus pada 'arsitektur tingkat tinggi'.",
                                        emoji: "⏰",
                                    },
                                    {
                                        question:
                                            "Apakah saya bisa bekerja sebagai programmer setelah belajar di IMPHNEN?",
                                        answer: "Menjadi programmer dan bekerja sebagai programmer adalah dua hal yang berbeda, bukan? Di IMPHNEN kami fokus pada 'identitas programmer' daripada 'kemampuan programmer'. Jadi, ya, Anda akan menjadi programmer yang sangat meyakinkan di acara keluarga dan media sosial. Untuk pekerjaan, kami sarankan posisi 'Konsultan Strategi Digital' atau 'Visioner Teknologi' - posisi di mana Anda bisa banyak bicara tentang coding tanpa perlu melakukannya. Pro tip: Selalu bawa stiker laptop dengan logo GitHub dan Visual Studio.",
                                        emoji: "💼",
                                    },
                                    {
                                        question:
                                            "Bagaimana cara bergabung dengan komunitas IMPHNEN?",
                                        answer: "Proses bergabung super ketat dan selektif! Cukup klik tombol 'Gabung Sekarang', isi formulir dengan data valid (atau tidak, kami tidak benar-benar memeriksa), dan bayar biaya keanggotaan. Voila, Anda resmi menjadi anggota IMPHNEN! Bonus: Anda mendapatkan sertifikat digital 'Certified Non-Coding Developer' yang bisa dipamerkan di LinkedIn untuk menarik perhatian rekruter yang tidak membaca deskripsi dengan teliti.",
                                        emoji: "🚪",
                                    },
                                    {
                                        question:
                                            "Saya sudah bisa coding. Apakah IMPHNEN cocok untuk saya?",
                                        answer: "Oh, sayang sekali. Anda sudah terkontaminasi dengan pengetahuan aktual. Kami punya program 'Detoksifikasi Coding' khusus untuk kasus seperti Anda. Selama 30 hari, Anda akan dilarang menyentuh keyboard untuk coding dan hanya boleh berbicara tentang 'paradigma pemrograman revolusioner' tanpa implementasi nyata. Ini akan membantu Anda melupakan kebiasaan buruk seperti 'menulis kode yang berfungsi' dan 'menyelesaikan bug'.",
                                        emoji: "🧠",
                                    },
                                    {
                                        question:
                                            "Bagaimana IMPHNEN membantu saya belajar tanpa coding?",
                                        answer: "Metode kami sangat revolusioner: Anda akan mendapatkan akses ke ratusan screenshot kode tanpa konteks yang bisa Anda posting di Instagram dengan caption mendalam seperti 'Debugging session 😎'. Anda juga akan belajar cara terbaik untuk mengambil foto laptop dengan tampilan VS Code (dengan extension tema gelap wajib) dari sudut yang sempurna, sambil menikmati kopi yang sebenarnya sudah dingin. Dan jangan lupakan kursus 'Menjelaskan Apa Itu Blockchain Tanpa Benar-Benar Mengerti' kami yang sangat populer.",
                                        emoji: "📱",
                                    },
                                    {
                                        question:
                                            "Apa yang membuat IMPHNEN berbeda dari bootcamp programming lainnya?",
                                        answer: "Semua bootcamp lain hanya fokus pada hal-hal sepele seperti 'keterampilan praktis' dan 'portofolio proyek'. Di IMPHNEN, kami lebih fokus pada hal yang benar-benar penting: membangun personal branding Anda sebagai programmer tanpa beban membangun apapun yang sebenarnya berfungsi. Kenapa capek-capek belajar algoritma kompleks ketika Anda bisa memposting kebijaksanaan coding di Twitter? Kenapa stres dengan deadline proyek ketika Anda bisa mendiskusikan keunggulan framework yang bahkan tidak pernah Anda gunakan?",
                                        emoji: "🦄",
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            show: { opacity: 1, y: 0 },
                                        }}
                                    >
                                        <AccordionItem
                                            value={`item-${index}`}
                                            className="group border-none rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all"
                                        >
                                            <AccordionTrigger className="px-6 py-4 text-left text-gray-800 group-hover:bg-blue-50/50 transition-all">
                                                <div className="flex items-center">
                                                    <span className="mr-3 text-xl">
                                                        {item.emoji}
                                                    </span>
                                                    <span>{item.question}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 py-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 text-gray-600">
                                                <p className="italic text-gray-400 text-xs mb-2">
                                                    IMPHNEN menjawab dengan
                                                    bangga:
                                                </p>
                                                <p>{item.answer}</p>
                                                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                                    <div className="text-xs text-gray-400">
                                                        Puas dengan jawaban ini?
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <motion.button
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.9,
                                                            }}
                                                            className="text-gray-400 hover:text-green-500"
                                                        >
                                                            👍
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.9,
                                                            }}
                                                            className="text-gray-400 hover:text-red-500"
                                                        >
                                                            👎
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </motion.div>
                                ))}
                            </Accordion>
                        </motion.div>

                        {/* Additional FAQ Call-to-action */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="mt-12 bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full -ml-32 -mb-32"></div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Masih penasaran?
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Kami punya banyak jawaban (kebanyakan tidak
                                    berguna sih) untuk pertanyaan Anda yang lain
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                                            Tanya via Discord
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="outline"
                                            className="border-sky-500 text-sky-500 hover:bg-sky-50"
                                        >
                                            Kirim Pertanyaan
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Fun facts */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            {[
                                {
                                    stat: "98%",
                                    desc: "Alumni tidak pernah menulis kode nyata",
                                    emoji: "🤹‍♂️",
                                },
                                {
                                    stat: "100%",
                                    desc: "Tweet tentang coding daripada coding",
                                    emoji: "🐦",
                                },
                                {
                                    stat: "∞",
                                    desc: "Alasan kenapa tidak bisa ngoding hari ini",
                                    emoji: "🧩",
                                },
                            ].map((fact, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.1 + 0.3,
                                    }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-lg p-4 text-center shadow-md"
                                >
                                    <div className="text-2xl mb-1">
                                        {fact.emoji}
                                    </div>
                                    <div className="text-2xl font-bold text-sky-500">
                                        {fact.stat}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {fact.desc}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
