"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiHome, FiMenu, FiX } from "react-icons/fi";
import {
    LuFolderKanban,
    LuFileCode2,
    LuBriefcaseBusiness,
    LuBadgeCheck,
} from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";

const navItems = [
    {
        name: "Home",
        href: "#home",
        icon: <FiHome />,
    },
    {
        name: "About",
        href: "#about-me",
        icon: <FaRegUserCircle />,
    },
    {
        name: "Projects",
        href: "#projects",
        icon: <LuFolderKanban />,
    },
    {
        name: "Experience",
        href: "#experience",
        icon: <LuBriefcaseBusiness />,
    },
    {
        name: "Skills",
        href: "#skills",
        icon: <LuFileCode2 />,
    },
    {
        name: "Services",
        href: "#services",
        icon: <LuBadgeCheck />,
    },
    {
        name: "Contact",
        href: "#contact-me",
        icon: <RiContactsLine />,
    },
];

export default function BottomBar() {
    const [activeHash, setActiveHash] = useState("#home");
    const [isOpen, setIsOpen] = useState(false);
    const [hideBar, setHideBar] = useState(false);

    /* --------------------------------
       Active section detection
    --------------------------------- */
    useEffect(() => {
        const sections = navItems
            .map((item) =>
                document.getElementById(item.href.replace("#", ""))
            )
            .filter(Boolean) as HTMLElement[];

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visible.length > 0) {
                    setActiveHash(`#${visible[0].target.id}`);
                }
            },
            {
                threshold: [0.2, 0.4, 0.6],
                rootMargin: "-20% 0px -50% 0px",
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    /* --------------------------------
       Hide on Contact + Footer
    --------------------------------- */
    useEffect(() => {
        const contactSection =
            document.getElementById("contact-me");

        const footerSection =
            document.getElementById("footer");

        const sections = [
            contactSection,
            footerSection,
        ].filter(Boolean) as HTMLElement[];

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const shouldHide = entries.some(
                    (entry) => entry.isIntersecting
                );

                setHideBar(shouldHide);

                if (shouldHide) {
                    setIsOpen(false);
                }
            },
            {
                threshold: 0.2,
            }
        );

        sections.forEach((section) =>
            observer.observe(section)
        );

        return () => observer.disconnect();
    }, []);

    /* --------------------------------
       Escape key
    --------------------------------- */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, []);

    const handleNavigation = (href: string) => {
        setActiveHash(href);
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {!hideBar && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: 40,
                    }}
                    transition={{
                        duration: 0.35,
                        ease: "easeInOut",
                    }}
                    className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6"
                >
                    {/* --------------------------------
                        Vertical Menu
                    --------------------------------- */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    y: 20,
                                    transformOrigin:
                                        "bottom right",
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    y: 20,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                                className="absolute bottom-17 right-0"
                            >
                                <nav className="flex w-48 flex-col gap-1 rounded-3xl border border-[#F2F3FF]/10 bg-[#121212]/95 p-2 shadow-2xl backdrop-blur-xl cursor-pointer">
                                    {navItems.map((item, index) => {
                                        const active =
                                            activeHash ===
                                            item.href;

                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{
                                                    opacity: 0,
                                                    x: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    delay:
                                                        index *
                                                        0.035,
                                                }}
                                            >
                                                <Link
                                                    href={
                                                        item.href
                                                    }
                                                    onClick={() =>
                                                        handleNavigation(
                                                            item.href
                                                        )
                                                    }
                                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${active
                                                            ? "bg-[#F2F3FF] text-indigo-500"
                                                            : "text-[#F2F3FF]/70 hover:bg-[#1a1a1a] hover:text-indigo-500"
                                                        }`}
                                                >
                                                    <span className="flex w-5 items-center justify-center text-lg">
                                                        {
                                                            item.icon
                                                        }
                                                    </span>

                                                    <span
                                                        className={`text-sm ${active
                                                                ? "merriweather-medium"
                                                                : "merriweather-regular"
                                                            }`}
                                                    >
                                                        {
                                                            item.name
                                                        }
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --------------------------------
                        Toggle Button
                    --------------------------------- */}
                    <motion.button
                        type="button"
                        onClick={() =>
                            setIsOpen((prev) => !prev)
                        }
                        whileTap={{
                            scale: 0.92,
                        }}
                        aria-label={
                            isOpen
                                ? "Close navigation"
                                : "Open navigation"
                        }
                        aria-expanded={isOpen}
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F2F3FF]/15 bg-[#121212]/95 text-[#F2F3FF] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/60 hover:text-indigo-500 cursor-pointer"
                    >
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{
                                        opacity: 0,
                                        rotate: -90,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 90,
                                    }}
                                >
                                    <FiX className="text-xl" />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{
                                        opacity: 0,
                                        rotate: 90,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: -90,
                                    }}
                                >
                                    <FiMenu className="text-xl" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
