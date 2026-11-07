import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
    throw new Error(
        "Missing admin authentication environment variables."
    );
}

const secret = new TextEncoder().encode(ADMIN_SESSION_SECRET);

const COOKIE_NAME = "admin_session";

export async function verifyAdminCredentials(
    email: string,
    password: string
) {
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function createAdminSession() {
    const token = await new SignJWT({
        role: "admin",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
}

export async function getAdminSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, secret);

        if (payload.role !== "admin") {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}

export async function destroyAdminSession() {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
}