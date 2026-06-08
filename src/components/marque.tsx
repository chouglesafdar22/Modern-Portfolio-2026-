"use client";
import { motion } from "framer-motion";
import { RiNextjsFill } from "react-icons/ri";
import { FaReact, FaGitAlt, FaFigma } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { DiNodejs } from "react-icons/di";
import { SiExpress, SiMongodb, SiTailwindcss, SiFramer, SiPostman } from "react-icons/si";
import { IoLogoGithub, IoLogoVercel } from "react-icons/io5";

const skills = [
    { name: "React.js", icon: <FaReact /> },
    { name: "Next.js", icon: <RiNextjsFill /> },
    { name: "TypeScript", icon: <BiLogoTypescript /> },
    { name: "Node.js", icon: <DiNodejs /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "GitHub", icon: <IoLogoGithub /> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "Figma", icon: <FaFigma /> },
    { name: "Framer Motion", icon: <SiFramer /> },
    { name: "Vercel", icon: <IoLogoVercel /> },
    { name: "Postman", icon: <SiPostman /> }
];

const roles = [
    { name: "Full-Stack Developer" },
    { name: "MERN Stack Developer" },
    { name: "React.js Developer" },
    { name: "Next.js Developer" },
    { name: "UI Developer" },
    { name: "UI Desginer" }
];

export function SkillsMarquee() {
    return (
        <div className="overflow-hidden py-6 bg-[#1a1a1a]">
            <motion.div
                animate={{ x: ["0%", "-33.333%"] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
                className="flex w-max md:gap-6 gap-4"
            >
                {[...skills, ...skills, ...skills].map((skill, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-2 rounded-full border border-[#F2F3FF]/10 bg-[#F2F3FF]/5 px-5 py-2.5 text-[#F2F3FF] hover:bg-indigo-600/20 hover:text-indigo-600 transition-colors duration-300"
                        >
                            <span className="text-sm md:text-base xl:text-lg merriweather-regular">{skill.icon}</span>
                            <span className="text-xs md:text-sm xl:text-base merriweather-regular">{skill.name}</span>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export function RoleMarque() {
    return (
        <div className="overflow-hidden py-8 bg-[#1a1a1a]">
            <motion.div
                animate={{ x: ["0%", "-33.333%"] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
                className="flex w-max md:gap-6 gap-4"
            >
                {[...roles, ...roles, ...roles].map((role, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center rounded-full border border-[#F2F3FF]/10 bg-[#F2F3FF]/5 px-5 py-2.5 text-[#F2F3FF] hover:bg-indigo-600/20 hover:text-indigo-600 transition-colors duration-300"
                        >
                            <span className="text-xs md:text-sm xl:text-base merriweather-regular">{role.name}</span>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    )
}
