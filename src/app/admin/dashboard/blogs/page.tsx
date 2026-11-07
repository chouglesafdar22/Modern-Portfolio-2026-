import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

export default async function AdminBlogPage() {
    await connectToDatabase();

    const blogs = await Blog.find({})
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl merriweather-semibold tracking-tight sm:text-3xl">
                        Blog
                    </h1>

                    <p className="mt-1 merriweather-regular text-sm text-[#F2F3FF]/50">
                        Manage your portfolio articles and blog posts.
                    </p>
                </div>

                <Link
                    href="/admin/dashboard/blogs/new"
                    className="inline-flex w-fit items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm merriweather-medium text-white transition hover:bg-indigo-500"
                >
                    + New Blog
                </Link>
            </div>

            {/* Blog list */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/2">
                {blogs.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <h2 className="text-lg merriweather-medium">
                            No blog posts yet
                        </h2>

                        <p className="mt-2 text-sm merriweather-regular text-[#F2F3FF]/40">
                            Create your first blog post to get started.
                        </p>

                        <Link
                            href="/admin/dashboard/blogs/new"
                            className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm merriweather-medium text-white transition hover:bg-indigo-500"
                        >
                            Create Blog
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id.toString()}
                                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="truncate text-base merriweather-medium">
                                            {blog.title}
                                        </h2>

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[11px] merriweather-medium ${blog.status === "published"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-yellow-500/10 text-yellow-400"
                                                }`}
                                        >
                                            {blog.status}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm merriweather-light text-[#F2F3FF]/40">
                                        {blog.category} ·{" "}
                                        {blog.readingTime} min read
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        target="_blank"
                                        className="rounded-lg border merriweather-regular border-white/10 px-3 py-2 text-xs text-[#F2F3FF]/60 transition hover:bg-white/5 hover:text-[#F2F3FF]"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        href={`/admin/dashboard/blogs/${blog._id}`}
                                        className="rounded-lg border merriweather-regular border-white/10 px-3 py-2 text-xs text-[#F2F3FF]/60 transition hover:bg-white/5 hover:text-[#F2F3FF]"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}