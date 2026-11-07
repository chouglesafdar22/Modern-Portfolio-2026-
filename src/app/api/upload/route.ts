import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];

export async function POST(request: Request) {
    try {
        // Check admin authentication
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

        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No image file provided.",
                },
                { status: 400 }
            );
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid image type. Use JPG, PNG, WebP, or GIF.",
                },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image size must be less than 10 MB.",
                },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<{
            secure_url: string;
            public_id: string;
        }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "modern-portfolio/blog",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error || !result) {
                        reject(
                            error ||
                            new Error(
                                "Cloudinary upload failed."
                            )
                        );
                        return;
                    }

                    resolve({
                        secure_url: result.secure_url,
                        public_id: result.public_id,
                    });
                }
            );

            uploadStream.end(buffer);
        });

        return NextResponse.json({
            success: true,
            message: "Image uploaded successfully.",
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        });
    } catch (error) {
        console.error("Image upload error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to upload image.",
            },
            { status: 500 }
        );
    }
}