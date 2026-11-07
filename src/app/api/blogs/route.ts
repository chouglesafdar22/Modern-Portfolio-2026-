import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
    try {
        await connectToDatabase();

        const blogs = await Blog.find({
            status: "published",
        })
            .sort({ publishedAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            blogs,
        });
    } catch (error) {
        console.error("Failed to fetch blogs:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch blogs.",
            },
            { status: 500 }
        );
    }
};

export async function POST(request: Request) {
    try {
        const session = await getAdminSession();

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized.",
                },
                { status: 401 }
            );
        }

        const body = await request.json();

        const {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            category,
            tags,
            author,
            status,
            publishedAt,
            youtubeUrl,
            githubUrl,
            linkedinUrl,
            otherLinks,
            readingTime,
        } = body;

        if (
            !title ||
            !slug ||
            !excerpt ||
            !content ||
            !category ||
            !author
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill in all required fields.",
                },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingBlog = await Blog.findOne({ slug });

        if (existingBlog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A blog with this slug already exists.",
                },
                { status: 409 }
            );
        };

        const blog = await Blog.create({
            title,
            slug,
            excerpt,
            content,
            coverImage,
            category,
            tags: tags || [],
            author,
            status: status || "draft",
            publishedAt:
                status === "published"
                    ? publishedAt || new Date()
                    : undefined,
            youtubeUrl: youtubeUrl || undefined,
            githubUrl: githubUrl || undefined,
            linkedinUrl: linkedinUrl || undefined,
            otherLinks: otherLinks || [],
            readingTime: readingTime || 1,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Blog created successfully.",
                blog,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Failed to create blog:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create blog.",
            },
            { status: 500 }
        );
    }
}