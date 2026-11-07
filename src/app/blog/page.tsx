import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

export default async function BlogPage() {
    await connectToDatabase();

    const blogs = await Blog.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .lean<import("@/app/models/Blog").IBlog[]>();

    return (
        <main className="min-h-screen bg-[#121212] px-5 py-20 text-[#F2F3FF]">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/"
                    className="text-sm merriweather-light cursor-pointer text-[#F2F3FF]/60 transition hover:text-indigo-400"
                >
                    ← Back to Home
                </Link>

                <div className="mt-10">
                    <p className="text-sm merriweather-medium uppercase tracking-[0.2em] text-indigo-400">
                        Blog
                    </p>

                    <h1 className="mt-3 text-4xl merriweather-semibold tracking-tight md:text-5xl">
                        Articles & Insights
                    </h1>

                    <p className="mt-4 max-w-2xl merriweather-regular text-base leading-7 text-[#F2F3FF]/60">
                        Thoughts, tutorials, projects, and things I learn while
                        building products and working with modern web technologies.
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <div className="mt-16 rounded-2xl border border-white/10 bg-white/3 px-6 py-12 text-center">
                        <p className="text-[#F2F3FF]/60 merriweather-light">
                            No published articles yet.
                        </p>
                    </div>
                ) : (
                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog._id.toString()}
                                title={blog.title}
                                slug={blog.slug}
                                excerpt={blog.excerpt}
                                coverImage={blog.coverImage!}
                                category={blog.category}
                                publishedAt={blog.publishedAt}
                                readingTime={blog.readingTime}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}