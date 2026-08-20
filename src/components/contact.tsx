"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./Button";
import { IoLogoGithub, IoLogoLinkedin, IoLogoWhatsapp, IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";
import { PiReadCvLogo } from "react-icons/pi";
import { SiFiverr } from "react-icons/si";
import { SiCalendly } from "react-icons/si";
import ScrollWrapper from "./ScrollWrapper";

const socials = [
    {
        name: "Resume",
        href: "https://drive.google.com/file/d/1WcDqmtNFQTXEu93_7Z8fRZWV5hxhrWJ6/view?usp=drive_link",
        icon: <PiReadCvLogo />,
    },
    {
        name: "GitHub",
        href: "https://github.com/chouglesafdar22",
        icon: <IoLogoGithub />,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/safdar-chougle",
        icon: <IoLogoLinkedin />,
    },
    {
        name: "YouTube",
        href: "https://youtube.com/@chouglesafdar",
        icon: <FaYoutube />,
    },
    {
        name: "Fiverr",
        href: "https://www.fiverr.com/safdarchougle/",
        icon: <SiFiverr />,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/chouglesafdar22?igsh=cnY5cG0yY3gzZngz",
        icon: <IoLogoInstagram />
    }
];

export default function ContactSection() {
    return (
        <ScrollWrapper direction="fade">
            <section
                id="contact-me"
                className="relative overflow-hidden bg-[#1a1a1a] py-24 text-[#F2F3FF]"
            >
                {/* Background Glow */}
                <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                    {/* Section Label */}
                    <div className="mb-5 flex items-center md:justify-center justify-start">
                        <span className="inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs md:text-sm merriweather-regular text-indigo-500">
                            Contact
                        </span>
                    </div>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <h2 className="mt-3.5 text-3xl md:text-4xl xl:text-5xl md:text-center text-left merriweather-bold leading-none">
                            Let's Build
                        </h2>

                        <h2 className="mt-1.5 text-3xl md:text-4xl xl:text-5xl md:text-center text-left merriweather-bold leading-none text-indigo-500">
                            Something Meaningful.
                        </h2>

                        <p className="mt-3.5 xl:text-lg md:text-base text-sm md:text-center text-left text-[#F2F3FF]/70 mx-auto max-w-3xl wrap-break-word merriweather-medium">
                            Have an idea, a business challenge, or a product you want to build? Let’s connect and turn it into a modern digital solution.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="mt-6 flex flex-wrap justify-center gap-5">
                        <Button
                            text={"Schedule A call"}
                            icon={<SiCalendly />}
                            reverse
                            href={"https://calendly.com/chouglesafdar22/30min"}
                            contentClassName="xl:text-xl md:text-lg text-base md:py-3 py-1.5 md:px-6 px-3.5 w-full md:w-auto"
                            className="w-full md:w-auto"
                        />
                        <Button
                            text={"whatsapp"}
                            icon={<IoLogoWhatsapp />}
                            reverse
                            href={"https://wa.me/919730241435?text=Hello%20Safdar,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20project,%20opportunity,%20collaboration,%20or%20role%20that%20aligns%20with%20your%20expertise.%0A%0AI%20look%20forward%20to%20connecting%20with%20you%20and%20exploring%20how%20we%20can%20work%20together%20to%20build%20something%20meaningful."}
                            contentClassName="xl:text-xl md:text-lg text-base md:py-3 py-1.5 md:px-6 px-3.5 w-full md:w-auto"
                            nonColor
                            className="w-full md:w-auto"
                        />
                    </div>

                    {/* Info Strip */}
                    <div className="mt-7.5 overflow-hidden rounded-3xl border border-[#F2F3FF]/10 bg-[#121212]">
                        <div className="grid md:grid-cols-3">
                            <div className="border-b border-[#F2F3FF]/10 p-8 md:border-b-0 md:border-r">
                                <p className="text-xs uppercase merriweather-regular tracking-[0.2em] text-indigo-500">
                                    Email
                                </p>
                                <Link href={"mailto:chouglesafdar22@gmail.com"}>
                                    <h3 className="mt-1.5 text-base md:text-lg xl:text-xl merriweather-medium">
                                        chouglesafdar22@gmail.com
                                    </h3>
                                </Link>
                            </div>

                            <div className="border-b border-[#F2F3FF]/10 p-8 md:border-b-0 md:border-r">
                                <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 merriweather-regular">
                                    Location
                                </p>

                                <h3 className="mt-1.5 text-base md:text-lg xl:text-xl merriweather-medium">
                                    Mumbai, India
                                </h3>
                            </div>

                            <div className="border-b border-[#F2F3FF]/10 p-8 md:border-b-0 md:border-r">
                                <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 merriweather-regular">
                                    Phone
                                </p>
                                <Link href={"tel:+919730241435"}>
                                    <h3 className="mt-1.5 text-base md:text-lg xl:text-xl merriweather-medium">
                                        +91 9730241435
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Social Pills */}
                    <div className="mt-7.5 flex flex-wrap justify-center items-center gap-3.5">
                        {socials.map((social) => (
                            <Button
                                key={social.name}
                                href={social.href}
                                icon={social.icon}
                                text={social.name}
                                reverse
                                nonColor
                                contentClassName="xl:text-lg md:text-base text-sm rounded-full merriweather-regular"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </ScrollWrapper>
    );
};
