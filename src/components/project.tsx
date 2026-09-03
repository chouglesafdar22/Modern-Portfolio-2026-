"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import Button from "./Button";
import ScrollWrapper from "./ScrollWrapper";

const projects = [
    {
        id: 1,
        title: "GitPortify",
        description: "A production-ready portfolio builder built for developers to create, customize, and publish professional portfolio websites without writing code. The platform includes GitHub OAuth authentication, portfolio customization, dynamic content management, and instant publishing, with a focus on performance, usability, and a smooth user experience.",
        image: "/Images/Projects/gitportify.png",
        technologies: ["Next.js", "React + TypeScript", "Tailwind CSS", "ShadCN UI", "Node.js (via Next.js API routes)", "MongoDB", "NextAuth (GitHub OAuth)", "Framer Motion", "Vercel"],
        live: "https://gitportify.vercel.app",
        github: "https://github.com/chouglesafdar22/GitPortify",
    },
    {
        id: 2,
        title: "FragranceStore",
        description: "A production-ready full-stack E-commerce application designed around a complete online shopping workflow. It includes authentication, product and inventory management, cart and checkout functionality, order management, invoices, returns, an admin dashboard, image uploads, and API-driven backend services.",
        image: "/Images/Projects/fragrancestore.png",
        technologies: ["Next.js", "MongoDB", "Node.js", "TypeScript", "ShadCN Ui", "Context API", "Axios", "MERN Stack", "Vercel", "Render", "Cloudinary"],
        live: "https://fragrancestore.vercel.app/",
        github: "https://github.com/chouglesafdar22/Modern-Ecommerce",
    },
    {
        id: 3,
        title: "Pharmacy Management System",
        description: "A complete desktop application built to manage pharmacy operations including inventory, suppliers, billing, sales reports, and stock monitoring. It also includes role-based access, PDF invoice generation, and automated alerts for low stock and upcoming medicine expiry.",
        image: "/Images/Projects/pharamacy_m_s.png",
        technologies: [
            "Python",
            "PyQt5",
            "SQL",
            "Role-Based Authentication",
            "PDF Generation",
            "Desktop Application"
        ],
        live: "https://drive.google.com/file/d/12wdKbUn83CAOqJY0Ah_DxIZ68ixY621N/view?usp=drive_link",
        github: "https://github.com/chouglesafdar22/PharmacyApp",
    },
    {
        id: 4,
        title: "Portfolio Website (2026)",
        description: "A modern, responsive portfolio website built to showcase my work, technical skills, services, and development journey. Designed with a clean interface, responsive layouts, smooth interactions, and performance in mind to create a professional experience across devices.",
        image: "/Images/Projects/portfolio_web.png",
        technologies: ["Next.js", "Tailwind CSS", "TypeScript", "React.js", "Node.js (via Next.js API routes)", "Framer Motion"],
        live: "https://safdarchougle.vercel.app",
        github: "https://github.com/chouglesafdar22/Modern-Portfolio-2026-",
    },
];

export default function ProjectsSection() {
    return (
        <ScrollWrapper direction="down">
            <section id="projects" className="relative bg-[#121212] py-20 text-[#F2F3FF]"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    {/* Header */}
                    <div className="mb-10">
                        <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 lg:text-sm md:text-xs text-[10px] merriweather-regular text-indigo-500">
                            Projects
                        </span>

                        <h2 className="mt-3 text-3xl md:text-4xl xl:text-5xl merriweather-bold">
                            Featured{" "}
                            <span className="text-indigo-500">
                                Build.
                            </span>
                        </h2>

                        <p className="mt-2 xl:text-lg md:text-base text-sm text-[#F2F3FF]/70 wrap-break-word merriweather-medium">
                            A collection of projects showcasing my full-stack engineer skills.
                        </p>
                    </div>
                    {/* Sticky Cards */}
                    <div className="sticky">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="sticky top-24 mb-16 h-auto"
                                style={{
                                    zIndex: projects.length - index,
                                }}
                            >
                                <motion.div
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    initial={{
                                        opacity: 0,
                                        y: 80,
                                        scale: 0.95,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="overflow-hidden h-full rounded-4xl border border-[#F2F3FF]/10 bg-[#1a1a1a]"
                                >
                                    <div className="grid lg:grid-cols-2">
                                        {/* Image */}
                                        <div className="relative aspect-video md:aspect-auto">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-fill"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col justify-center p-4 lg:p-8">
                                            <span className="text-sm uppercase merriweather-regular tracking-[0.2em] text-indigo-500">
                                                Project 0{project.id}
                                            </span>

                                            <h3 className="mt-2.5 text-2xl md:text-3xl xl:text-4xl merriweather-medium">
                                                {project.title}
                                            </h3>

                                            <p className="mt-2.5 text-[#F2F3FF]/70 merriweather-regular">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="mt-3 flex flex-wrap gap-3">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-full bg-indigo-500/10 px-4 py-2 text-xs text-indigo-500 merriweather-light"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Buttons */}
                                            <div className="mt-5 flex flex-wrap gap-4">
                                                <Button
                                                    href={project.live}
                                                    text={"Live Demo"}
                                                    icon={<FaArrowUpRightFromSquare />}
                                                    className="md:w-auto w-full"
                                                    contentClassName="xl:text-base text-sm md:w-auto w-full"
                                                />
                                                <Button
                                                    href={project.github}
                                                    text={"GitHub"}
                                                    icon={<FaGithub />}
                                                    nonColor
                                                    reverse
                                                    className="md:w-auto w-full"
                                                    contentClassName="xl:text-base text-sm md:w-auto w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ScrollWrapper>
    );
};