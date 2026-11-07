import Link from "next/link";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import Image from "next/image";
import ViewCount from "@/components/blog/ViewCount";
import ViewTracker from "@/components/blog/ViewTracker";
import LikeButton from "@/components/blog/LikeButton";
import CommentForm from "@/components/blog/CommentForm";
import Comments from "@/components/blog/Comment";

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function IndividualBlogPage({
    params,
}: BlogPageProps) {
    const { slug } = await params;

    await connectToDatabase();

    const blogs = await Blog.find({ status: "published" })
        .sort({ publishedAt: -1 })
        .lean();

    const blogIndex = blogs.findIndex((item) => item.slug === slug);

    if (blogIndex === -1) {
        notFound();
    }

    const blog = blogs[blogIndex];

    const commentsRes = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${blog._id.toString()}/comments`,
        {
            cache: "no-store"
        }
    )

    const commentsData = await commentsRes.json();
    const comments = commentsData.success ? commentsData.comments : [];

    const previousBlog =
        blogIndex < blogs.length - 1 ? blogs[blogIndex + 1] : null;

    const nextBlog =
        blogIndex > 0 ? blogs[blogIndex - 1] : null;

    const formattedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    return (
        <main className="min-h-screen bg-[#121212] px-5 py-20 text-[#F2F3FF]">
            <ViewTracker blogId={blog._id.toString()} />
            <article className="mx-auto max-w-4xl">
                <Link
                    href="/blog"
                    className="text-sm text-[#F2F3FF]/60 transition hover:text-indigo-400"
                >
                    ← Back to Blog
                </Link>

                <header className="my-10">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#F2F3FF]/50">
                        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-indigo-400">
                            {blog.category}
                        </span>

                        {formattedDate && <span>{formattedDate}</span>}

                        <span>•</span>

                        <span>{blog.readingTime} min read</span>

                        <span>•</span>

                        <ViewCount views={blog.views} />

                        {/* <span>•</span> */}
                    </div>

                    <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                        {blog.title}
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-[#F2F3FF]/60">
                        {blog.excerpt}
                    </p>

                    <p className="mt-5 text-sm text-[#F2F3FF]/40">
                        By {blog.author}
                    </p>
                </header>

                {/* <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-white/10">
                    <Image
                        src={blog.coverImage!}
                        alt={blog.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 896px"
                    />
                </div> */}

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                    <LikeButton
                        blogId={blog._id.toString()}
                        initialLikes={blog.likes}
                    />
                </div>

                {(blog.youtubeUrl || blog.githubUrl || blog.linkedinUrl) && (
                    <div className="mt-12 border-t border-white/10 pt-8">
                        <h2 className="text-xl font-semibold">
                            Related Links
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-3">
                            {blog.youtubeUrl && (
                                <a
                                    href={blog.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-white/10 bg-white/3 px-4 py-2 text-sm text-[#F2F3FF]/70 transition hover:border-indigo-500/40 hover:text-indigo-400"
                                >
                                    YouTube →
                                </a>
                            )}

                            {blog.githubUrl && (
                                <a
                                    href={blog.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-white/10 bg-white/3 px-4 py-2 text-sm text-[#F2F3FF]/70 transition hover:border-indigo-500/40 hover:text-indigo-400"
                                >
                                    GitHub →
                                </a>
                            )}

                            {blog.linkedinUrl && (
                                <a
                                    href={blog.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-white/10 bg-white/3 px-4 py-2 text-sm text-[#F2F3FF]/70 transition hover:border-indigo-500/40 hover:text-indigo-400"
                                >
                                    LinkedIn →
                                </a>
                            )}

                            {blog.otherLinks?.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-white/10 bg-white/3 px-4 py-2 text-sm text-[#F2F3FF]/70 transition hover:border-indigo-500/40 hover:text-indigo-400"
                                >
                                    {link.title} →
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {(previousBlog || nextBlog) && (
                    <nav className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
                        {previousBlog ? (
                            <Link
                                href={`/blog/${previousBlog.slug}`}
                                className="group rounded-2xl border border-white/10 bg-white/3 p-5 transition hover:border-indigo-500/40"
                            >
                                <p className="text-xs uppercase tracking-wider text-[#F2F3FF]/40">
                                    Previous Article
                                </p>

                                <p className="mt-2 text-lg font-medium text-[#F2F3FF] transition group-hover:text-indigo-400">
                                    {previousBlog.title}
                                </p>

                                <p className="mt-3 text-sm text-[#F2F3FF]/50">
                                    ← Read older article
                                </p>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {nextBlog && (
                            <Link
                                href={`/blog/${nextBlog.slug}`}
                                className="group rounded-2xl border border-white/10 bg-white/3 p-5 transition hover:border-indigo-500/40"
                            >
                                <p className="text-xs uppercase tracking-wider text-[#F2F3FF]/40">
                                    Next Article
                                </p>

                                <p className="mt-2 text-lg font-medium text-[#F2F3FF] transition group-hover:text-indigo-400">
                                    {nextBlog.title}
                                </p>

                                <p className="mt-3 text-sm text-[#F2F3FF]/50">
                                    Read newer article →
                                </p>
                            </Link>
                        )}
                    </nav>
                )}

                <CommentForm blogId={blog._id.toString()} />
                <Comments comments={comments} />
            </article>
        </main>
    );
}