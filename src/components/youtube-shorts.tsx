"use client";
import { useEffect, useState } from "react";
import { YoutubeVideo } from "@/types/youtube";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Button from "./Button";
import ScrollWrapper from "./ScrollWrapper";

export default function YoutubeShorts() {
    const [videos, setVideos] = useState<YoutubeVideo[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch("/api/youtube");
                const data = await res.json();

                setVideos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <ScrollWrapper direction="fade">
                <section
                    className="bg-[#1a1a1a] py-20 text-[#F2F3FF]"
                >
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex md:justify-center justify-start">
                            <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 lg:text-sm md:text-xs text-[10px] merriweather-regular text-indigo-500">
                                Social Presence
                            </span>
                        </div>

                        <div className="mt-3 md:text-center text-left">
                            <h2 className="text-3xl md:text-4xl xl:text-5xl merriweather-bold">
                                Building in Public
                            </h2>

                            <p className="mt-2 xl:text-lg md:text-base text-sm text-[#F2F3FF]/70 wrap-break-word merriweather-medium">
                                Sharing my journey as a Full-Stack MERN Developer.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className="h-112.5 animate-pulse rounded-3xl bg-[#121212]"
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollWrapper>
        );
    }

    return (
        <ScrollWrapper direction="fade">
            <section
                id="youtube-shorts"
                className="bg-[#1a1a1a] py-20 text-[#F2F3FF]"
            >
                <div className="mx-auto max-w-7xl px-6">
                    {/* Badge */}
                    <div className="flex md:justify-center justify-start">
                        <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 lg:text-base md:text-sm text-xs merriweather-regular text-indigo-500">
                            Social Presence
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mt-3 md:text-center text-left">
                        <h2 className="xl:text-5xl md:text-4xl text-3xl merriweather-bold">
                            Building in Public
                        </h2>

                        <p className="mx-auto mt-2 text-base md:text-lg xl:text-xl merriweather-regular max-w-3xl text-[#F2F3FF]/70">
                            Sharing my journey, projects, and lessons as a Full-Stack Engineer.
                        </p>
                    </div>

                    {/* Carousel */}
                    <div className="mt-16">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                prevEl: ".youtube-prev",
                                nextEl: ".youtube-next",
                            }}
                            pagination={{
                                clickable: true,
                                el: ".youtube-pagination",
                            }}
                            spaceBetween={24}
                            slidesPerView={1.1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1.5,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3.2,
                                },
                            }}
                            centeredSlides={true}
                        >
                            {videos.slice(0, 5).map((video) => (
                                <SwiperSlide key={video.id.videoId}>
                                    <Link
                                        href={`https://youtube.com/watch?v=${video.id.videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block"
                                    >
                                        <div className="overflow-hidden rounded-3xl border border-[#F2F3FF]/10 bg-[#121212] transition-all duration-300 hover:border-indigo-500">

                                            <div className="relative aspect-square overflow-hidden">
                                                <Image
                                                    src={video.snippet.thumbnails.high.url}
                                                    alt={video.snippet.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            <div className="p-5">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="line-clamp-2 text-sm merriweather-medium">
                                                        {video.snippet.title}
                                                    </h3>

                                                    <FaArrowUpRightFromSquare
                                                        className="shrink-0 text-indigo-500 text-base opacity-0 transition-all duration-300 group-hover:opacity-100"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-12 flex items-center justify-center gap-8">
                        <button className=" youtube-prev flex h-12 w-12 items-center justify-center rounded-full border border-[#F2F3FF]/10 bg-[#121212] transition-all duration-300 merriweather-medium hover:border-indigo-500 hover:text-indigo-500 cursor-pointer" >
                            <FaChevronLeft />
                        </button>

                        <div className="youtube-pagination cursor-pointer" />

                        <button className=" youtube-next flex h-12 w-12 items-center justify-center rounded-full border border-[#F2F3FF]/10 bg-[#121212] transition-all duration-300 merriweather-medium hover:border-indigo-500 hover:text-indigo-500 cursor-pointer" >
                            <FaChevronRight />
                        </button>
                    </div>

                    {/* View Channel Button */}
                    <div className="mt-12 flex justify-center">
                        <Button
                            text="View Channel"
                            href="https://www.youtube.com/@chouglesafdar"
                            icon={<FaArrowUpRightFromSquare />}
                            nonColor
                            contentClassName="md:py-3 py-2 md:px-5 px-3.5"
                        />
                    </div>
                </div>
            </section>
        </ScrollWrapper>
    )
};
