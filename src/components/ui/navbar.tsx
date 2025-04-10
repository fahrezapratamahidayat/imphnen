"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Efek scroll untuk mengubah tampilan navbar saat di-scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden">
                            <Image
                                src="/images/logo/imphnen.png"
                                alt="IMPHNEN Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold text-sky-500">
                            IMPHNEN
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="#"
                            className="text-gray-700 hover:text-sky-500 transition-colors"
                        >
                            Beranda
                        </Link>
                        <Link
                            href="#about"
                            className="text-gray-700 hover:text-sky-500 transition-colors"
                        >
                            Tentang Kami
                        </Link>
                        <Link
                            href="#features"
                            className="text-gray-700 hover:text-sky-500 transition-colors"
                        >
                            Fitur
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-gray-700 hover:text-sky-500 transition-colors"
                        >
                            Harga
                        </Link>
                        <Link
                            href="#faq"
                            className="text-gray-700 hover:text-sky-500 transition-colors"
                        >
                            FAQ
                        </Link>
                        <Button className="bg-sky-500 text-white hover:bg-sky-600 ml-4 rounded-md">
                            Masuk
                        </Button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-md">
                        <div className="flex flex-col space-y-4 px-4">
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-sky-500 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Beranda
                            </Link>
                            <Link
                                href="#about"
                                className="text-gray-700 hover:text-sky-500 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                href="#features"
                                className="text-gray-700 hover:text-sky-500 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Fitur
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-gray-700 hover:text-sky-500 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Harga
                            </Link>
                            <Link
                                href="#faq"
                                className="text-gray-700 hover:text-sky-500 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                FAQ
                            </Link>
                            <Button
                                className="bg-sky-500 text-white hover:bg-sky-600 w-full rounded-md"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Masuk
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
