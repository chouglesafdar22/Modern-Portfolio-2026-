import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Safdar Chougle",
    description:
        "Explore articles, development insights, technical tutorials, and experiences shared by Safdar Chougle.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | Safdar Chougle",
        description:
            "Explore development insights, technical tutorials, and experiences.",
        type: "website",
        url: "/blog",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}