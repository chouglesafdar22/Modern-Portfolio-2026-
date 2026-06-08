"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import { LuFolderKanban, LuFileCode2, LuBriefcaseBusiness } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";

const navItems = [
    { name: "Home", href: "#home", icon: <FiHome /> },
    { name: "About", href: "#about-me", icon: <FaRegUserCircle /> },
    { name: "Projects", href: "#projects", icon: <LuFolderKanban /> },
    { name: "Skills", href: "#skills", icon: <LuFileCode2 /> },
    { name: "Services", href: "#services", icon: <LuBriefcaseBusiness /> },
    { name: "Contact", href: "#contact-me", icon: <RiContactsLine /> },
];

export default function BottomBar() {
    const [activeHash, setActiveHash] = useState("");
    const [hideBar, setHideBar] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);
                if (visible) setActiveHash(`#${visible.target.id}`);
            },
            { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -40% 0px" }
        );

        navItems.forEach((item) => {
            const section = document.getElementById(item.href.slice(1));
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const footerSection = document.getElementById("footer");

        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideBar(entry.isIntersecting);
            },
            {
                threshold: 0.6,
            }
        );
        if (footerSection) observer.observe(footerSection);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <motion.div
            animate={{
                y: hideBar ? 120 : 0,
                opacity: hideBar ? 0 : 1,
            }}
            transition={{
                duration: 0.35,
                ease: "easeInOut",
            }}
            className={`${hideBar ? "hide" : "flex"} justify-center items-center fixed bottom-5 left-1/2 z-50 -translate-x-1/2 w-full max-w-xl px-2`}>
            <nav className="flex items-center justify-between gap-1 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-2xl">
                {navItems.map((item) => {
                    const active = activeHash === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveHash(item.href)}
                            className={`flex flex-col items-center gap-1 rounded-full md:px-5 px-2 md:py-3 py-1.5 transition-all duration-300 ${active
                                ? "bg-[#F2F3FF] text-indigo-500 merriweather-medium"
                                : "text-[#F2F3FF]/70 hover:text-indigo-500 merriweather-regular"
                                }`}
                        >
                            <span className="text-base sm:text-xl">{item.icon}</span>
                            <span className="text-[10px] sm:text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </motion.div>
    );
};
