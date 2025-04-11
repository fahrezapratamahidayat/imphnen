"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({
    href,
    label,
    onClick = () => {},
    isActive = false,
}: {
    href: string;
    label: string;
    onClick: () => void;
    isActive: boolean;
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            className="relative px-1"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative flex items-center justify-center overflow-hidden group">
                <span
                    className={`relative z-10 font-medium transition-all duration-300 px-3 py-1 text-sm ${
                        isActive
                            ? "text-white"
                            : hovered
                            ? "text-white"
                            : "text-gray-700"
                    }`}
                >
                    {label}
                </span>
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: hovered || isActive ? 1 : 0,
                        opacity: hovered || isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </Link>
    );
};

const SocialLink = ({
    icon,
    href = "#",
    label,
}: {
    icon: React.ReactNode;
    href: string;
    label: string;
}) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-50 to-blue-50 text-sky-500 hover:text-blue-600 transition-colors border border-gray-100 shadow-sm"
        >
            {icon}
        </motion.a>
    );
};

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            const sections = [
                "hero",
                "about",
                "features",
                "community",
                "testimonials",
                "faq",
                "contact",
            ];
            for (const section of sections) {
                const element = document.getElementById(section || "hero");
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveLink(section ? `#${section}` : "#");
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigationItems = [
        { label: "Beranda", href: "#" },
        { label: "Tentang Kami", href: "#about" },
        { label: "Fitur", href: "#features" },
        { label: "Komunitas", href: "#community" },
        { label: "Testimoni", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
    ];

    return (
        <header className=" sticky top-0 left-0 right-0 z-50 transition-all duration-300 py-4 bg-transparent backdrop-blur-md">
            <motion.nav
                className={``}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <div className="container w-full  mx-auto px-4 z-10 relative">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="group relative">
                            <div className="flex items-center gap-2 z-10 relative">
                                <motion.div
                                    className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 p-0.5 overflow-hidden shadow-md"
                                    whileHover={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="bg-white w-full h-full rounded-md flex items-center justify-center relative overflow-hidden">
                                        <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 font-mono text-transparent bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text font-bold text-lg">
                                            &lt;/&gt;
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="relative overflow-hidden">
                                    <span className="text-xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent sm:hidden lg:block">
                                        IMPHNEN
                                    </span>
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 to-blue-600"
                                        initial={{ width: "0%" }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </Link>

                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                            <div className="bg-white/90 backdrop-blur-md rounded-full px-1.5 py-1 flex items-center shadow-md border border-gray-100">
                                {navigationItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        href={item.href}
                                        label={item.label}
                                        isActive={activeLink === item.href}
                                        onClick={() => {
                                            setActiveLink(item.href);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            <SocialLink
                                icon={
                                    <svg
                                        className={`w-6 h-6`}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                }
                                label="discord"
                                href="https://discord.gg/W4XyRAmPSD"
                            />
                            <SocialLink
                                icon={
                                    <svg
                                        className={`w-6 h-6`}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                }
                                label="Facebook"
                                href="https://www.facebook.com/groups/1032515944638255"
                            />
                            <SocialLink
                                icon={
                                    <svg
                                        className={`w-6 h-6`}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                }
                                label="instagram"
                                href="https://www.instagram.com"
                            />

                            {/* Theme toggle button */}
                            {/* <motion.button
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-50 to-blue-50 text-sky-500 hover:text-blue-600 transition-colors border border-gray-100 shadow-sm"
                                aria-label="Toggle dark mode"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line
                                        x1="12"
                                        y1="21"
                                        x2="12"
                                        y2="23"
                                    ></line>
                                    <line
                                        x1="4.22"
                                        y1="4.22"
                                        x2="5.64"
                                        y2="5.64"
                                    ></line>
                                    <line
                                        x1="18.36"
                                        y1="18.36"
                                        x2="19.78"
                                        y2="19.78"
                                    ></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line
                                        x1="21"
                                        y1="12"
                                        x2="23"
                                        y2="12"
                                    ></line>
                                    <line
                                        x1="4.22"
                                        y1="19.78"
                                        x2="5.64"
                                        y2="18.36"
                                    ></line>
                                    <line
                                        x1="18.36"
                                        y1="5.64"
                                        x2="19.78"
                                        y2="4.22"
                                    ></line>
                                </svg>
                            </motion.button> */}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden relative"
                            aria-label="Toggle menu"
                        >
                            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                                <div className="w-5 h-5 flex flex-col justify-center items-center gap-1 relative">
                                    <motion.span
                                        className="w-full h-0.5 bg-sky-500 rounded-full block"
                                        animate={{
                                            rotate: mobileMenuOpen ? 45 : 0,
                                            y: mobileMenuOpen ? 4 : 0,
                                        }}
                                    />
                                    <motion.span
                                        className="w-full h-0.5 bg-blue-500 rounded-full block"
                                        animate={{
                                            opacity: mobileMenuOpen ? 0 : 1,
                                        }}
                                    />
                                    <motion.span
                                        className="w-full h-0.5 bg-sky-500 rounded-full block"
                                        animate={{
                                            rotate: mobileMenuOpen ? -45 : 0,
                                            y: mobileMenuOpen ? -4 : 0,
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    opacity: { duration: 0.2 },
                                }}
                                className="md:hidden mt-2 overflow-hidden"
                            >
                                <div className="bg-white/95 backdrop-blur-md shadow-md rounded-xl border border-gray-100 p-3 overflow-hidden">
                                    {/* Mobile links */}
                                    <div className="space-y-1">
                                        {navigationItems.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{
                                                    x: -10,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    x: 0,
                                                    opacity: 1,
                                                }}
                                                transition={{
                                                    delay: index * 0.05,
                                                }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={`block py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                                                        activeLink === item.href
                                                            ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                                                            : "text-gray-700 hover:bg-sky-50"
                                                    }`}
                                                    onClick={() => {
                                                        setActiveLink(
                                                            item.href
                                                        );
                                                        setMobileMenuOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    {item.label}
                                                </Link>
                                            </motion.div>
                                        ))}

                                        {/* Social links for mobile */}
                                        <motion.div
                                            className="pt-2 flex justify-center gap-3"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay:
                                                    navigationItems.length *
                                                    0.05,
                                            }}
                                        >
                                            <SocialLink
                                                icon={
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="18"
                                                        height="18"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                                    </svg>
                                                }
                                                label="Twitter"
                                                href="https://twitter.com/imphnen"
                                            />
                                            <SocialLink
                                                icon={
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="18"
                                                        height="18"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                                                    </svg>
                                                }
                                                label="GitHub"
                                                href="https://github.com/imphnen"
                                            />
                                            <SocialLink
                                                icon={
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="18"
                                                        height="18"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                                                    </svg>
                                                }
                                                label="LinkedIn"
                                                href="https://www.linkedin.com/company/imphnen"
                                            />

                                            {/* Theme button for mobile */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-50 to-blue-50 text-sky-500 hover:text-blue-600 transition-colors border border-gray-100 shadow-sm"
                                                aria-label="Toggle dark mode"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="18"
                                                    height="18"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="5"
                                                    ></circle>
                                                    <line
                                                        x1="12"
                                                        y1="1"
                                                        x2="12"
                                                        y2="3"
                                                    ></line>
                                                    <line
                                                        x1="12"
                                                        y1="21"
                                                        x2="12"
                                                        y2="23"
                                                    ></line>
                                                    <line
                                                        x1="4.22"
                                                        y1="4.22"
                                                        x2="5.64"
                                                        y2="5.64"
                                                    ></line>
                                                    <line
                                                        x1="18.36"
                                                        y1="18.36"
                                                        x2="19.78"
                                                        y2="19.78"
                                                    ></line>
                                                    <line
                                                        x1="1"
                                                        y1="12"
                                                        x2="3"
                                                        y2="12"
                                                    ></line>
                                                    <line
                                                        x1="21"
                                                        y1="12"
                                                        x2="23"
                                                        y2="12"
                                                    ></line>
                                                    <line
                                                        x1="4.22"
                                                        y1="19.78"
                                                        x2="5.64"
                                                        y2="18.36"
                                                    ></line>
                                                    <line
                                                        x1="18.36"
                                                        y1="5.64"
                                                        x2="19.78"
                                                        y2="4.22"
                                                    ></line>
                                                </svg>
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </header>
    );
}
