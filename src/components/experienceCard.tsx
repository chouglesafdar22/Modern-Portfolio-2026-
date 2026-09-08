"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

export interface ExperienceRole {
    title: string;
    employmentType?: string;
    startDate: string;
    endDate?: string;
    location?: string;
    description: string;
    skills?: string[];
}

interface ExperienceCardProps {
    company: string;
    companyUrl?: string;
    logo?: string;
    roles: ExperienceRole[];
}

export default function ExperienceCard({
    company,
    companyUrl,
    logo,
    roles,
}: ExperienceCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl border border-[#F2F3FF]/10 bg-[#121212] p-6 md:p-8"
        >
            {/* Company Header */}
            <div className="flex items-center justify-center gap-4">
                {/* Company Logo */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#F2F3FF]/10 bg-[#121212]">
                    {logo ? (
                        <Image
                            src={logo}
                            alt={`${company} logo`}
                            fill
                            sizes="18px"
                            className="object-cover p-1"
                        />
                    ) : (
                        <span className="xl:text-2xl md:text-xl text-lg font-semibold text-indigo-500">
                            {company.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Company Details */}
                <div className="min-w-0 flex-1 justify-center items-center">
                    {companyUrl ? (
                        <Link
                            href={companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5"
                        >
                            <h3 className="xl:text-2xl md:text-xl text-lg merriweather-bold text-[#F2F3FF] transition-colors duration-300 group-hover:text-indigo-500">
                                {company}
                            </h3>

                            <FiArrowUpRight className="lg:text-base md:text-sm text-xs text-[#F2F3FF]/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                        </Link>
                    ) : (
                        <h3 className="xl:text-2xl md:text-xl text-lg merriweather-bold text-[#F2F3FF]">
                            {company}
                        </h3>
                    )}
                </div>
            </div>

            {/* Roles */}
            <div className="mt-8 space-y-8">
                {roles.map((role, index) => (
                    <div
                        key={`${role.title}-${index}`}
                        className="relative"
                    >
                        {/* Timeline */}
                        {index < roles.length - 1 && (
                            <div className="absolute left-6.75 top-12 h-[calc(100%+2rem)] w-px bg-[#F2F3FF]/10" />
                        )}

                        <div className="flex gap-6">
                            {/* Timeline Dot */}
                            <div className="relative z-10 mt-1 flex h-2.5 w-2.5 shrink-0 translate-x-5.5 items-center justify-center rounded-full bg-indigo-500 ring-6 ring-[#1a1a1a]" />

                            {/* Role Content */}
                            <div className="ml-5 min-w-0 flex-1">
                                <h4 className="xl:text-xl md:text-lg text-base merriweather-semibold text-[#F2F3FF]">
                                    {role.title}
                                </h4>

                                <div className="mt-2 flex flex-wrap items-center merriweather-ligh gap-x-2 gap-y-1 text-sm text-[#F2F3FF]/60">
                                    <span>
                                        {role.startDate}{" "}
                                        –{" "}
                                        {role.endDate || "Present"}
                                    </span>

                                    {role.employmentType && (
                                        <>
                                            <span>·</span>
                                            <span>{role.employmentType}</span>
                                        </>
                                    )}
                                </div>

                                {role.location && (
                                    <div className="mt-1 flex items-center gap-1.5 text-sm merriweather-light text-[#F2F3FF]/60">
                                        <FiMapPin className="text-indigo-500" />
                                        <span>{role.location}</span>
                                    </div>
                                )}

                                <p className="mt-5 max-w-3xl leading-7 merriweather-regular text-[#F2F3FF]/70 xl:text-lg md:text-base text-sm">
                                    {role.description}
                                </p>

                                {/* Skills */}
                                {role.skills && role.skills.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {role.skills.map((skill) => (
                                            <span
                                                key={`${skill}`}
                                                className="rounded-full bg-indigo-500/10 px-4 py-2 text-xs text-indigo-500 merriweather-light"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.article>
    );
}