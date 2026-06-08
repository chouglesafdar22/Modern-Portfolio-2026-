"use client"
import PortfolioLoader from "@/components/PortfolioLoader";
import Navbar from "@/components/layout/Navbar";
import BottomBar from "@/components/layout/Bottombar";
import HeroSection from "@/components/Hero";
import { SkillsMarquee, RoleMarque } from "@/components/marque"
import AboutSection from "@/components/about";
import YoutubeShorts from "@/components/youtube-shorts";
import ProjectsSection from "@/components/project";
import SkillsSection from "@/components/skill";
import ServicesSection from "@/components/service";
import ContactSection from "@/components/contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <PortfolioLoader />
      <Navbar />
      <main>
        <HeroSection />
        <RoleMarque />
        <AboutSection />
        <YoutubeShorts />
        <ProjectsSection />
        <SkillsSection />
        <SkillsMarquee />
        <ServicesSection />
        <ContactSection />
      </main>
      <BottomBar />
      <Footer />
    </>
  );
};