import { NextResponse } from "next/server";
import {
    createAdminSession,
    verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const email = body.email?.trim();
        const password = body.password;

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and password are required.",
                },
                { status: 400 }
            );
        }

        const isValid = await verifyAdminCredentials(
            email,
            password
        );

        if (!isValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password.",
                },
                { status: 401 }
            );
        }

        await createAdminSession();

        return NextResponse.json({
            success: true,
            message: "Login successful.",
        });
    } catch (error) {
        console.error("Admin login error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}