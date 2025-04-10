import { Navbar } from "@/components/ui/navbar";
import CommunitySection from "@/components/sections/community-section";
import HeroSection from "@/components/sections/hero-section";
import FiturSection from "@/components/sections/fitur-section";
import PhilosophySection from "@/components/sections/philosophy-section";
import FaqSection from "@/components/sections/faq-section";
import FooterSection from "@/components/sections/footer-section";
import AboutSection from "@/components/sections/about-section";
import TestymonialSection from "@/components/sections/testymonial-section";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <FiturSection />
            <CommunitySection />
            <PhilosophySection />
            <TestymonialSection />
            <FaqSection />
            <FooterSection />
        </div>
    );
}
