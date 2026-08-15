"use client";
import Link from "next/link";

const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about-me" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact-me" },
];

const socials = [
    {
        name: "GitHub",
        href: "https://github.com/chouglesafdar22",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/safdar-chougle",
    },
    {
        name: "YouTube",
        href: "https://youtube.com/@chouglesafdar",
    },
    {
        name: "Fiverr",
        href: "https://www.fiverr.com/safdarchougle/",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/chouglesafdar22?igsh=cnY5cG0yY3gzZngz"
    }
];

export default function Footer() {
    return (
        <footer id="footer" className="bg-[#121212] text-[#F2F3FF] py-10">
            <div className="mx-auto w-full max-w-7xl px-4 lg:px-10">

                {/* Top */}
                <div className="grid gap-8 md:gap-12 md:grid-cols-3">

                    {/* About */}
                    <div>
                        <h3 className="text-xl md:text-2xl xl:text-3xl merriweather-bold">
                            Safdar Chougle
                        </h3>

                        <p className="mt-2.5 text-lg md:text-xl xl:text-2xl merriweather-medium text-[#F2F3FF]/70">
                            Full-Stack Developer
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg md:text-xl xl:text-2xl merriweather-medium">
                            Links
                        </h4>

                        <ul className="mt-2.5 space-y-1.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[#F2F3FF]/70 transition-all duration-300 hover:text-indigo-500 hover:translate-x-1 inline-block text-sm md:text-base merriweather-regular xl:text-lg"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-lg md:text-xl xl:text-2xl merriweather-medium">
                            Connect
                        </h4>

                        <ul className="mt-2.5 space-y-1.5">
                            {socials.map((social) => (
                                <li key={social.name}>
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        className="text-[#F2F3FF]/70 transition-all duration-300 hover:text-indigo-500 hover:translate-x-1 inline-block text-sm md:text-base merriweather-regular xl:text-lg "
                                    >
                                        {social.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-3 border-t border-[#F2F3FF]/10 pt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <p className="text-xs md:text-sm xl:text-base text-[#F2F3FF]/50 merriweather-light">
                        © {new Date().getFullYear()} Safdar Chougle. All rights reserved.
                    </p>

                    <p className="text-xs md:text-sm xl:text-base text-[#F2F3FF]/50 merriweather-light">
                        Built with Next.js, TypeScript & Tailwind CSS.
                    </p>
                </div>

            </div>
        </footer>
    );
}