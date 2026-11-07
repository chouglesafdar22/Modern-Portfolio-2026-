import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

interface ViewRouteProps {
    params: Promise<{
        id: string;
    }>;
}

export async function POST(
    request: Request,
    { params }: ViewRouteProps
) {
    try {
        const { id } = await params;

        await connectToDatabase();

        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        ).lean();

        if (!blog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            views: blog.views,
        });
    } catch (error) {
        console.error("View count error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update view count.",
            },
            { status: 500 }
        );
    }
}