"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    contentClassName?: string;
    reverse?: boolean;
    className?: string;
    nonColor?: boolean;
};

export default function Button({
    text,
    icon,
    onClick,
    href,
    contentClassName = "",
    reverse,
    className = "",
    nonColor
}: ButtonProps) {
    const content = (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`${reverse ? "flex-row-reverse" : ""} flex flex-row md:py-2 py-1 md:px-4 px-2.5 md:gap-2 gap-1.5 rounded-xl ${nonColor ? "text-[#F2F3FF] border-2 border-gray-400 hover:bg-gray-700 hover:border-indigo-500" : "text-[#F2F3FF] bg-indigo-500 hover:bg-[#F2F3FF] hover:text-[#121212]"} justify-center items-center text-center cursor-pointer w-fit merriweather-medium transition-all duration-300 ease-in-out uppercase ${contentClassName}`}
        >
            {text && <span>{text}</span>}
            {icon && <span>{icon}</span>}
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} target="_blank" className={`${className} flex justify-center items-center`}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${className} flex justify-center items-center`}>
            {content}
        </button>
    );
};

export function Button2({
    text,
    icon,
    onClick,
    href,
    contentClassName = "",
    reverse,
    className = "",
    nonColor
}: ButtonProps) {
    const content = (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`${reverse ? "flex-row-reverse" : ""} flex flex-row md:py-2 py-1 md:px-4 px-2.5 md:gap-2 gap-1.5 rounded-xl ${nonColor ? "text-[#F2F3FF] border-2 border-gray-400 hover:bg-gray-700 hover:border-indigo-500" : "text-[#F2F3FF] bg-indigo-500 hover:bg-[#F2F3FF] hover:text-[#121212]"} justify-center items-center text-center cursor-pointer w-fit merriweather-medium transition-all duration-300 ease-in-out uppercase ${contentClassName}`}
        >
            {text && <span>{text}</span>}
            {icon && <span>{icon}</span>}
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className={`${className} flex justify-center items-center`}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${className} flex justify-center items-center`}>
            {content}
        </button>
    );
}