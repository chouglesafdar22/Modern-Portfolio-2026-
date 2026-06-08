"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PortfolioLoader() {
    const [loading, setLoading] = useState(true);

    const text = "Safdar Chougle";

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{
                        duration: 1,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="fixed inset-0 z-99999 flex items-center px-2.5 md:px-5 justify-center bg-[#121212]/80 backdrop-blur-lg scrollbar-none"
                >
                    <motion.h1
                        className="xl:text-5xl md:text-4xl text-3xl merriweather-medium text-center tracking-tight text-[#F2F3FF]"
                    >
                        {text.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.5,
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
}