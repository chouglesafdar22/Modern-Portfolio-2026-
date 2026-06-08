"use client";
import Link from "next/link";

interface Props {
    href: string;
    name: string;
    para: string;
}

export default function SocailCardLink({
    href,
    name,
    para
}: Props) {
    return (
        <Link
            href={href}
            target="_blank"
            className="block rounded-2xl border border-[#F2F3FF]/10 p-4 transition-all duration-300 hover:border-indigo-500"
        >
            <h5 className="text-xs md:text-sm xl:text-base merriweather-regular">
                {name}
            </h5>

            <p className="mt-1 text-[10px] md:text-xs xl:text-sm merriweather-light text-[#F2F3FF]/60">
                {para}
            </p>
        </Link>
    )
};