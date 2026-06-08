"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 z-9999 h-0.5 origin-left bg-linear-to-r from-indigo-500 via-indigo-300 to-indigo-500 shadow-[0_0_20px_rgba(255,0,0,0.8)]"
            style={{
                scaleX: scrollYProgress,
                width: "100%",
            }}
        />
    );
}