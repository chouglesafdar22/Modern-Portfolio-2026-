"use client";
import { motion } from "framer-motion";
import Button, { Button2 } from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiContactsLine } from "react-icons/ri";
import Image from "next/image";
import ScrollWrapper from "./ScrollWrapper";

export default function HeroSection() {
  return (
    <ScrollWrapper direction="fade">
    <section id="home" className="relative overflow-hidden w-full bg-[#121212] text-[#F2F3FF] py-20"
    >
      {/* Glow Top Left */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[140px]" />
      {/* Glow Bottom Right */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[140px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F2F3FF 1px, transparent 1px), linear-gradient(to bottom, #F2F3FF 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-left"
          >
            <span className="text-3xl md:text-4xl lg:text-5xl merriweather-bold leading-tight">
              Hello! I'm
            </span>

            <div className="mt-2 flex flex-wrap items-center md:gap-2 gap-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl merriweather-extrabold leading-tight">
                Safdar
              </h1>

              <h1 className="text-5xl md:text-6xl lg:text-7xl merriweather-extrabold leading-tight text-indigo-500">
                Chougle
              </h1>
            </div>

            <p className="mt-4 wrap-break-word text-base md:text-lg lg:text-xl text-[#F2F3FF]/70 merriweather-medium">
              Full-Stack MERN Developer crafting modern, scalable, and user-centric web applications that deliver seamless digital experiences with React, Next.js, Node.js, Express.js, MongoDB and Tailwind CSS.
            </p>

            <span className="mt-4 inline-block rounded-full bg-indigo-500/20 px-4 py-1 text-sm text-white merriweather-regular">
              Available for projects
            </span>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Button
                text="Featured Projects"
                icon={<FaArrowRightLong />}
                contentClassName="xl:text-lg md:text-base text-sm md:py-3.5 py-2.5 md:px-7 px-5 md:w-auto w-full"
                className="md:w-auto w-full"
                href="#projects"
              />

              <Button2
                text="Contact Me"
                icon={<RiContactsLine />}
                reverse
                nonColor
                contentClassName="xl:text-lg md:text-base text-sm md:py-3.5 py-2.5 md:px-7 px-5 md:w-auto w-full"
                className="md:w-auto w-full"
                href="#contact-me"
              />
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end">
            <div className="relative overflow-hidden rounded-3xl border border-[#F2F3FF]/10">
              <Image
                src="/Images/my-image.jpg"
                alt="Safdar Chougle"
                width={500}
                height={650}
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </ScrollWrapper>
  );
};
