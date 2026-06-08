"use client";
import { ReactNode } from "react";
import { motion, Transition } from "framer-motion";

type Direction = "left" | "right" | "up" | "down" | "fade";

interface ScrollWrapperProps {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    ease?: Transition["ease"];
}

export default function ScrollWrapper({
    children,
    direction = "up",
    delay = 0,
    ease = "easeInOut",
}: ScrollWrapperProps) {
    const initial = {
        opacity: 0,
        x:
            direction === "left"
                ? -100
                : direction === "right"
                    ? 100
                    : 0,
        y:
            direction === "up"
                ? -60
                : direction === "down"
                    ? 60
                    : 0,
    };

    return (
        <motion.div
            initial={initial}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.8,
                delay,
                ease,
            }}
        >
            {children}
        </motion.div>
    );
}