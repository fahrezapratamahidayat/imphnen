"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FooterSection() {
    return (
        <footer
            className="bg-gradient-to-br from-white to-sky-50 text-gray-800 pt-20 pb-10 relative overflow-hidden"
            id="contact"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-sky-200 rounded-full filter blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-50"></div>

                {/* Decorative Lines */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-100 to-transparent"
                        style={{ top: `${10 + i * 20}%`, opacity: 0.5 }}
                    ></div>
                ))}

                {/* Floating Code Elements */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-sky-500/20 font-mono text-sm hidden md:block"
                        style={{
                            top: `${20 + i * 30}%`,
                            right: `${5 + i * 10}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            delay: i * 5,
                        }}
                    >
                        {
                            [
                                "function learnWithoutCoding() { return 'IMPHNEN'; }",
                                "&lt;Programmer thoughts={conceptOnly} /&gt;",
                                "// Life is too short for debugging",
                            ][i]
                        }
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex flex-col">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="mb-6"
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex items-center justify-center mr-3">
                                        <Image
                                            src="/images/logo/imphnen.png"
                                            alt="IMPHNEN Logo"
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                    <span className="text-xl font-bold text-sky-500">
                                        IMPHNEN
                                    </span>
                                </div>
                            </motion.div>

                            <p className="text-gray-600 mb-6">
                                Komunitas Para Calon Programmer Tanpa Stress
                                Coding. Berpikir &gt; Mengetik.
                            </p>

                            <div className="flex space-x-4 mb-6">
                                {[
                                    {
                                        icon: "facebook",
                                        path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                                    },
                                    {
                                        icon: "instagram",
                                        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                                    },
                                    {
                                        icon: "discord",
                                        path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z",
                                    },
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-100 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors"
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d={social.path} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="text-sm text-gray-500">
                                © 2025 IMPHNEN. All rights reserved.
                            </div>
                        </div>
                    </div>

                    {[
                        {
                            title: "Navigasi",
                            links: [
                                { label: "Beranda", href: "#" },
                                { label: "Tentang Kami", href: "#about" },
                                { label: "Fitur", href: "#features" },
                                {
                                    label: "Testimoni",
                                    href: "#testimonials",
                                },
                                { label: "Komunitas", href: "#community" },
                                { label: "Filosofi", href: "#philosophy" },
                                { label: "FAQ", href: "#faq" },
                                { label: "Kontak", href: "#contact" },
                            ],
                        },
                        {
                            title: "Komunitas",
                            links: [
                                {
                                    label: "Discord Server",
                                    href: "https://discord.gg/W4XyRAmPSD",
                                },
                                {
                                    label: "Facebook Group",
                                    href: "https://www.facebook.com/groups/1032515944638255",
                                },
                                {
                                    label: "Instagram",
                                    href: "https://www.instagram.com",
                                },
                            ],
                        },
                        {
                            title: "Sumber Daya",
                            links: [
                                { label: "Blog", href: "#blog" },
                                { label: "Dokumentasi", href: "#docs" },
                                {
                                    label: "Panduan Tidak Ngoding",
                                    href: "#guides",
                                },
                                {
                                    label: "Inspirasi Konsep",
                                    href: "#concepts",
                                },
                                { label: "Free Materials", href: "#resources" },
                            ],
                        },
                    ].map((column, i) => (
                        <div key={i} className="col-span-1">
                            <h3 className="font-semibold text-lg mb-4 relative">
                                {column.title}
                                <div className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"></div>
                            </h3>
                            <ul className="space-y-3">
                                {column.links.map((link, j) => (
                                    <motion.li key={j} whileHover={{ x: 3 }}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-sky-600 transition-colors flex items-center"
                                        >
                                            <svg
                                                className="w-3 h-3 mr-2 text-sky-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {link.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        <span>Made with 🧠 by IMPHNEN</span>
                        <span className="mx-2">•</span>
                        <motion.span
                            whileHover={{ color: "#3B82F6" }}
                            className="cursor-help"
                            title="Ini benar-benar ada kodenya lho"
                        >
                            Actually coded by humans
                        </motion.span>
                    </div>
                </div>

                {/* Easter Egg */}
                <motion.div
                    className="absolute right-4 bottom-4 text-2xl cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    title="Easter egg: Anda menemukan icon ini! Kemampuan observasi Anda lebih baik dari kemampuan coding kami."
                >
                    🥚
                </motion.div>
            </div>
        </footer>
    );
}
