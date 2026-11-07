"use client"
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    category: string;
    publishedAt?: string | Date;
    readingTime: number;
}

export default function BlogCard({
    title,
    slug,
    excerpt,
    coverImage,
    category,
    publishedAt,
    readingTime,
}: BlogCardProps) {
    const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : "";

    return (
        <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/30">
            <Link href={`/blog/${slug}`} className="block">
                <div className="relative aspect-video overflow-hidden bg-white/5">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-[#F2F3FF]/50">
                        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-indigo-400">
                            {category}
                        </span>

                        {formattedDate && <span>{formattedDate}</span>}

                        <span>•</span>

                        <span>{readingTime} min read</span>
                    </div>

                    <h2 className="mt-4 text-xl merriweather-semibold leading-tight text-[#F2F3FF] transition group-hover:text-indigo-400">
                        {title}
                    </h2>

                    <p className="mt-3 line-clamp-3 merriweather-medium text-sm leading-6 text-[#F2F3FF]/60">
                        {excerpt}
                    </p>

                    <div className="mt-5 text-sm merriweather-regular text-indigo-400">
                        Read article →
                    </div>
                </div>
            </Link>
        </article>
    );
}