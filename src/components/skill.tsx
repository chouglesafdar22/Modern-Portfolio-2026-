"use client";
import {
    RiReactjsLine,
    RiNextjsLine,
    RiTailwindCssFill,
    RiNodejsLine,
    RiGithubFill,
} from "react-icons/ri";
import {
    SiTypescript,
    SiExpress,
    SiMongodb,
    SiGit,
    SiVercel,
    SiPostman,
    SiFramer
} from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import ScrollWrapper from "./ScrollWrapper";
import { TbBrandReactNative } from "react-icons/tb";

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            {
                name: "React.js",
                icon: <RiReactjsLine />,
            },
            {
                name: "Next.js",
                icon: <RiNextjsLine />,
            },
            {
                name: "TypeScript",
                icon: <SiTypescript />,
            },
            {
                name: "React Native",
                icon: <TbBrandReactNative />
            },
            {
                name: "Tailwind CSS",
                icon: <RiTailwindCssFill />,
            },
            {
                name: "Framer Motion",
                icon: <SiFramer />,
            },
        ],
    },

    {
        title: "Backend",
        skills: [
            {
                name: "Node.js",
                icon: <RiNodejsLine />,
            },
            {
                name: "Express.js",
                icon: <SiExpress />,
            },
            {
                name: "MongoDB",
                icon: <SiMongodb />,
            },
        ],
    },

    {
        title: "Tools",
        skills: [
            {
                name: "Git",
                icon: <SiGit />,
            },
            {
                name: "GitHub",
                icon: <RiGithubFill />,
            },
            {
                name: "Vercel",
                icon: <SiVercel />,
            },
            {
                name: "Postman",
                icon: <SiPostman />,
            },
            {
                name: "Figma",
                icon: <FaFigma />
            },
            {
                name: "Framer",
                icon: <SiFramer />
            }
        ],
    },
];

export default function SkillsSection() {
    return (
        <ScrollWrapper direction="right">
            <section
                id="skills"
                className="bg-[#121212] py-20 text-[#F2F3FF]"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    {/* Header */}
                    <div className="mb-14">
                        <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 lg:text-sm md:text-xs text-[10px] merriweather-regular text-indigo-500">
                            Technical Stack
                        </span>

                        <h2 className="mt-3 text-2xl md:text-3xl xl:text-4xl merriweather-bold">
                            Skills &{" "}
                            <span className="text-indigo-500">
                                Technologies.
                            </span>
                        </h2>

                        <p className="mt-2.5 wrap-break-word text-sm md:text-base xl:text-lg merriweather-medium text-[#F2F3FF]/70">
                            Technologies and tools I use to build modern,
                            scalable and responsive web applications.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="space-y-12">
                        {skillCategories.map((category) => (
                            <div key={category.title}>
                                <h3 className="mb-6 text-lg md:text-xl xl:text-2xl merriweather-medium">
                                    {category.title}
                                </h3>

                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {category.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className=" group flex items-center gap-4 rounded-3xl border border-[#F2F3FF]/10 bg-[#1a1a1a] p-6 transition-all duration-300 hover:-translate-y-1  hover:border-indigo-500"
                                        >
                                            <div
                                                className="flex h-12 w-12 items-center justify-center rounded-2xl merriweather-regular bg-indigo-500/10 text-lg md:text-xl xl:text-2xl text-indigo-500"
                                            >
                                                {skill.icon}
                                            </div>

                                            <div>
                                                <h4 className="merriweather-regular text-base md:text-lg xl:text-xl">
                                                    {skill.name}
                                                </h4>

                                                <p className="text-xs merriweather-light text-[#F2F3FF]/50">
                                                    Technology
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ScrollWrapper>
    );
}