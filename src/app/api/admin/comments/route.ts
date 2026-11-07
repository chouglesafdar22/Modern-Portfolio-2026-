import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import Comment from "@/app/models/Comment";

export async function GET() {
    try {
        const session = await getAdminSession();

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized." },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const comments = await Comment.find()
            .populate("blogId", "title slug")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error("Admin comments fetch error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch comments.",
            },
            { status: 500 }
        );
    }
}