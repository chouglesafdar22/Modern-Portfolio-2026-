"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "./blog/BlogCard";
import ScrollWrapper from "./ScrollWrapper";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    category: string;
    publishedAt?: string;
    readingTime: number;
}

export default function BlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blogs");
                const data = await response.json();

                if (data.success && Array.isArray(data.blogs)) {
                    setBlogs(data.blogs.slice(0, 2));
                }
            } catch (error) {
                console.error("Failed to fetch homepage blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (!loading && blogs.length === 0) return null;

    return (
        <ScrollWrapper direction="up">
            <section id="blogs" className="relative bg-[#1a1a1a] py-20 text-[#F2F3FF]">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">

                    {/* Section Heading */}
                    <div className="mb-10 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
                        <div>
                            <p className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 lg:text-sm md:text-xs text-[10px] merriweather-regular text-indigo-500">
                                My Thoughts & Insights
                            </p>

                            <h2 className="mt-3 text-3xl md:text-4xl xl:text-5xl merriweather-bold">
                                Latest <span className="text-indigo-500">Articles.</span>
                            </h2>

                            <p className="mt-2 xl:text-lg md:text-base text-sm text-[#F2F3FF]/70 wrap-break-word merriweather-medium">
                                Sharing my learnings, development experiences,
                                technical insights, and things I discover along the way.
                            </p>
                        </div>

                        <Link
                            href="/blog"
                            className="group inline-flex w-fit items-center gap-2 border-b merriweather-regular border-indigo-400/40 pb-2 text-sm text-[#F2F3FF] transition hover:border-indigo-400 hover:text-indigo-400"
                        >
                            View all articles
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Blog Cards */}
                    {loading ? (
                        <div className="grid gap-7 md:grid-cols-2">
                            {[1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="aspect-4/3 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-7 md:grid-cols-2">
                            {blogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    title={blog.title}
                                    slug={blog.slug}
                                    excerpt={blog.excerpt}
                                    coverImage={blog.coverImage}
                                    category={blog.category}
                                    publishedAt={blog.publishedAt}
                                    readingTime={blog.readingTime}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </ScrollWrapper>
    );
}