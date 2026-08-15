"use client";
import {
    RiCodeSSlashLine,
    RiLayout4Line,
    RiSmartphoneLine,
    RiGlobalLine,
} from "react-icons/ri";
import { Button2 } from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import ScrollWrapper from "./ScrollWrapper";

const services = [
    {
        title: "Websites & Business Platforms",
        description:
            "Designing and developing modern websites, landing pages, and business platforms that are fast, responsive, and built to grow with your business.",
        icon: <RiGlobalLine />,
    },
    {
        title: "Custom Web Applications",
        description:
            "Building custom web applications, dashboards, booking systems, and internal tools tailored to your business workflows and operational needs.",
        icon: <RiLayout4Line />,
    },
    {
        title: "SaaS Product Development",
        description:
            "Helping startups build scalable SaaS products, MVPs, customer portals, authentication systems, APIs, and cloud-ready application architectures.",
        icon: <RiCodeSSlashLine />,
    },
    {
        title: "Mobile App Development",
        description:
            "Developing cross-platform mobile applications with modern technologies, seamless user experiences, and scalable backend integrations.",
        icon: <RiSmartphoneLine />,
    },
];

export default function ServicesSection() {
    return (
        <ScrollWrapper direction="down">
            <section
                id="services"
                className="bg-[#121212] py-20 text-[#F2F3FF]"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    {/* Header */}
                    <div className="mb-14">
                        <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs md:text-sm merriweather-regular text-indigo-500">
                            Services
                        </span>

                        <h2 className="mt-3 text-3xl md:text-4xl xl:text-5xl merriweather-bold">
                            What I Can{" "}
                            <span className="text-indigo-500">
                                Build.
                            </span>
                        </h2>

                        <p className="mt-2 xl:text-lg md:text-base text-sm merriweather-medium text-[#F2F3FF]/70 wrap-break-word">
                            Helping startups, businesses, and founders transform ideas into modern, scalable, and user-focused digital products.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="group rounded-3xl border border-[#F2F3FF]/10 bg-[#1a1a1a] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500"
                            >
                                {/* Icon */}
                                <h3
                                    className="flex md:h-16 h-14 md:w-16 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl md:text-2xl xl:text-3xl text-indigo-500 merriweather-regular"
                                >
                                    {service.icon}
                                </h3>

                                {/* Content */}
                                <h3 className="mt-4 text-lg md:text-xl xl:text-2xl merriweather-regular">
                                    {service.title}
                                </h3>

                                <p className="mt-2.5 text-base min-h-27.5 md:text-lg xl:text-xl text-[#F2F3FF]/70 merriweather-light">
                                    {service.description}
                                </p>

                                {/* Bottom Link */}
                                <Button2
                                    text="Discuss Project"
                                    icon={<FaArrowRightLong />}
                                    nonColor
                                    contentClassName="mt-2 merriweather-regular xl:text-base text-sm"
                                    href="#contact-me"
                                    className="flex justify-start"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ScrollWrapper>
    );
}