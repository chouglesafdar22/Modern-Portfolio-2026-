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
                                <span className="text-indigo-500">websites, mobile apps & SaaS products</span>
                                <br />
                                for startups and businesses.
                            </h2>

                            <p className="mt-4 lg:text-xl md:text-lg wrap-break-word text-base merriweather-medium leading-relaxed text-[#F2F3FF]/70">
                                I'm Safdar Chougle, a Full-Stack Developer who helps startups and businesses build websites, mobile apps, and SaaS products. I work across the entire development process—from planning and architecture to frontend, backend, and deployment—to create digital products that are fast, scalable, and built for long-term growth.
                            </p>

                            <p className="mt-4 lg:text-xl md:text-lg wrap-break-word text-base merriweather-medium leading-relaxed text-[#F2F3FF]/70">
                                I enjoy turning ideas into practical software solutions that solve real business problems. My focus is on building clean, maintainable systems with strong performance, thoughtful user experiences, and the flexibility to grow as a product evolves.
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
                                        href={"https://drive.google.com/file/d/1WcDqmtNFQTXEu93_7Z8fRZWV5hxhrWJ6/view?usp=drive_link"}
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