import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

interface LikeRouteProps {
    params: Promise<{
        id: string;
    }>;
}

export async function POST(
    request: Request,
    { params }: LikeRouteProps
) {
    try {
        const { id } = await params;

        await connectToDatabase();

        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
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
            likes: blog.likes,
        });
    } catch (error) {
        console.error("Like error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update likes.",
            },
            { status: 500 }
        );
    }
}