import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import Comment from "@/app/models/Comment";

interface CommentRouteProps {
    params: Promise<{
        id: string;
    }>;
}

export async function POST(
    request: Request,
    { params }: CommentRouteProps
) {
    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid blog ID." },
                { status: 400 }
            );
        }

        const body = await request.json();

        const name = body.name?.trim();
        const email = body.email?.trim().toLowerCase();
        const commentText = body.comment?.trim();
        const allowPublicDisplay = body.allowPublicDisplay === true;

        if (!name || !email || !commentText) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name, email and comment are required.",
                },
                { status: 400 }
            );
        }

        if (
            name.length > 80 ||
            email.length > 254 ||
            commentText.length > 2000
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "One or more fields exceed the allowed length.",
                },
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const blog = await Blog.findOne({
            _id: id,
            status: "published",
        });

        if (!blog) {
            return NextResponse.json(
                { success: false, message: "Published blog not found." },
                { status: 404 }
            );
        }

        await Comment.create({
            blogId: blog._id,
            name,
            email,
            comment: commentText,
            allowPublicDisplay,
            status: "pending",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Your comment has been submitted.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Comment submission error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to submit comment. Please try again.",
            },
            { status: 500 }
        );
    }
};

export async function GET(
    request: Request,
    { params }: CommentRouteProps
) {
    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid blog ID." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const comments = await Comment.find({
            blogId: id,
            allowPublicDisplay: true,
            status: "approved",
        })
            .select("name comment createdAt")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error("Fetch comments error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch comments.",
            },
            { status: 500 }
        );
    }
}