import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

interface BlogLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    try {
        await connectToDatabase();

        const { slug } = await params;

        const blog = await Blog.findOne({
            slug,
            status: "published",
        }).lean();

        if (!blog) {
            return {
                title: "Article Not Found | Safdar Chougle",
                description: "This article does not exist or is unavailable.",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const title = blog.title;
        const description =
            blog.excerpt || "Read the latest article by Safdar Chougle.";

        const baseUrl =
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        const url = `${baseUrl}/blog/${slug}`;

        const image = blog.coverImage || "/default-og-image.png";

        return {
            title: `${title} | Safdar Chougle`,
            description,

            alternates: {
                canonical: url,
            },

            openGraph: {
                title: `${title} | Safdar Chougle`,
                description,
                url,
                siteName: "Safdar Chougle",
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
                type: "article",
                publishedTime: blog.publishedAt
                    ? new Date(blog.publishedAt).toISOString()
                    : undefined,
                authors: ["Safdar Chougle"],
            },

            twitter: {
                card: "summary_large_image",
                title: `${title} | Safdar Chougle`,
                description,
                images: [image],
            },

            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        console.error("Blog metadata error:", error);

        return {
            title: "Blog | Safdar Chougle",
            description: "Read articles and development insights by Safdar Chougle.",
        };
    }
}

export default function BlogPostLayout({
    children,
}: BlogLayoutProps) {
    return <>{children}</>;
}