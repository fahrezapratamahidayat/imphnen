import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "IMPHNEN - Komunitas Proggamer Handal",
    description:
        "Belajar konsep pemrograman secara fundamental tanpa terjebak syntax. Bergabunglah dengan komunitas IMPHNEN untuk pengalaman belajar yang menyenangkan.",
    keywords: [
        "programming",
        "coding",
        "komunitas",
        "belajar coding",
        "pemrograman dasar",
        "imphnen",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
