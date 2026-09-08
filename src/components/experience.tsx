"use client";
import ExperienceCard from "./experienceCard";
import ScrollWrapper from "./ScrollWrapper";

export default function ExperienceSection() {
    return (
        <ScrollWrapper direction="down">
            <section
                id="experience"
                className="bg-[#1a1a1a] py-20 text-[#F2F3FF]"
            >
                <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

                    {/* Section Header */}
                    <div className="mb-10">
                        <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 lg:text-sm md:text-xs text-[10px] merriweather-regular text-indigo-500">
                            Experience
                        </span>

                        <h2 className="mt-3 text-3xl md:text-4xl xl:text-5xl merriweather-bold">
                            My Professional{" "}
                            <span className="text-indigo-500">Journey.</span>
                        </h2>

                        <p className="mt-2 xl:text-lg md:text-base text-sm text-[#F2F3FF]/70 wrap-break-word merriweather-medium">
                            A look at the roles, projects, and experiences that have
                            shaped my journey as a Full-Stack Engineer.
                        </p>
                    </div>

                    {/* Experience */}
                    <div className="space-y-6">
                        <ExperienceCard
                            company="GitPortify"
                            companyUrl="https://gitportify.vercel.app"
                            logo="/Images/company/GitPortify - Logo.png"
                            roles={[
                                {
                                    title: "Full-Stack Engineer",
                                    employmentType: "Self-employed",
                                    startDate: "Jan 2026",
                                    endDate: "Present",
                                    location: "India · Remote",
                                    description:
                                        "Building and shipping GitPortify, a SaaS platform that helps developers generate modern portfolio websites from their GitHub profiles in minutes, with unique public URLs.",
                                    skills: [
                                        "Next.js",
                                        "TypeScript",
                                        "Mern Stack",
                                        "Tailwind CSS",
                                        "GitHub OAuth",
                                        "REST APIs",
                                    ],
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>
        </ScrollWrapper>
    );
}