"use client";
import { motion } from "framer-motion";
import SocailCardLink from "./SocailCardLink";
import ScrollWrapper from "./ScrollWrapper";

export default function AboutSection() {
    return (
        <ScrollWrapper direction="down">
            <section
                id="about-me"
                className="w-full bg-[#121212] text-[#F2F3FF] py-20"
            >
                <div className="mx-auto max-w-7xl w-full px-6 lg:px-10">
                    <div className="grid items-center md:gap-10 gap-6 md:grid-cols-2">
                        <div>
                            <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 lg:text-sm md:text-xs text-[10px] merriweather-regular text-indigo-500">
                                About Me
                            </span>

                            <h2 className="lg:text-5xl md:text-4xl text-3xl merriweather-bold leading-tight">
                                Building
                                <br />
                                <span className="text-indigo-500">digital products</span>
                                <br />
                                that turn ideas into reality.
                            </h2>

                            <p className="mt-4 lg:text-xl md:text-lg wrap-break-word text-base merriweather-medium leading-relaxed text-[#F2F3FF]/70">
                                I'm Safdar Chougle, a Full-Stack Engineer helping startups and businesses turn ideas into modern digital products — from websites and web applications to mobile apps, SaaS platforms, and AI-powered solutions. I work across the entire development process, from planning and architecture to frontend, backend, integrations, and deployment, with a focus on building reliable and scalable products.
                            </p>

                            <p className="mt-4 lg:text-xl md:text-lg wrap-break-word text-base merriweather-medium leading-relaxed text-[#F2F3FF]/70">
                                I enjoy turning ideas and business challenges into practical software solutions that are easy to use and built to grow. Whether it's launching a new product, improving an existing system, or automating a manual process with AI, I focus on clean code, strong performance, thoughtful user experiences, and solutions that create real value..
                            </p>
                        </div>

                        {/* Right Social Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="rounded-3xl border border-[#F2F3FF]/10 bg-[#1a1a1a]/80 py-3.5 px-4 backdrop-blur-xl">

                                <span className="inline-flex merriweather-regular rounded-full border border-indigo-500/30 px-3 py-1 text-xs text-indigo-500">
                                    Building in Public
                                </span>

                                <h3 className="mt-2.5 text-2xl merriweather-semibold">
                                    Social Presence
                                </h3>

                                <div className="mt-2.5 space-y-2.5">
                                    <SocailCardLink
                                        href={"https://drive.google.com/file/d/1dMvXkDTgqJnx62pv4RquUe_PVMiYd_N_/view?usp=drive_link"}
                                        name={"Resume"}
                                        para={"Projects, skills, and technical expertise."}
                                    />

                                    <SocailCardLink
                                        href={"https://www.youtube.com/@chouglesafdar"}
                                        name={"Youtube"}
                                        para={"Sharing my developer journey"}
                                    />

                                    <SocailCardLink
                                        href={"https://github.com/chouglesafdar22"}
                                        name={"GitHub"}
                                        para={"Projects & source code"}
                                    />

                                    <SocailCardLink
                                        href={"https://www.linkedin.com/in/safdar-chougle"}
                                        name={"LinkedIn"}
                                        para={"Professional network"}
                                    />

                                    <SocailCardLink
                                        href={"https://www.fiverr.com/safdarchougle/"}
                                        name={"Fiverr"}
                                        para={"Available for freelance work"}
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </ScrollWrapper>
    );
}