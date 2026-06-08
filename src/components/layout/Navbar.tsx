"use client";
import Image from "next/image";
import Button from "../Button";
import { SiCalendly } from "react-icons/si";

export default function Navbar() {
    return (
        <nav className="top-0 z-40 w-full flex  justify-between items-center md:py-4 py-3 md:px-18 px-6 bg-[#121212]/50 backdrop-blur-lg">
            <div className="relative flex justify-center items-center md:h-14 h-10 md:w-14 w-10 overflow-hidden rounded-3xl">
                <Image
                    src="/Images/logo.png"
                    alt="logo"
                    fill
                    priority
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <Button
                text="book A Call"
                href="https://calendly.com/chouglesafdar22/30min"
                icon={<SiCalendly />}
                reverse
                contentClassName="xl:text-base md:text-sm text-xs"
            />
        </nav>
    );
}
