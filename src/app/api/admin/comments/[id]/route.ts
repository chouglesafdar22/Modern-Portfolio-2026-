import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import Comment from "@/app/models/Comment";

interface CommentRouteProps {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(
    request: Request,
    { params }: CommentRouteProps
) {
    try {
        const session = await getAdminSession();

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized." },
                { status: 401 }
            );
        }

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid comment ID." },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { status } = body;

        if (!["approved", "rejected", "pending"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid comment status." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const comment = await Comment.findByIdAndUpdate(
            id,
            { status },
            { returnDocument: "after", runValidators: true }
        );

        if (!comment) {
            return NextResponse.json(
                { success: false, message: "Comment not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Comment ${status} successfully.`,
            comment,
        });
    } catch (error) {
        console.error("Comment moderation error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update comment status.",
            },
            { status: 500 }
        );
    }
}