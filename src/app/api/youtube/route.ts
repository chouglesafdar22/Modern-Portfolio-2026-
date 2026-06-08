import { NextResponse } from "next/server";

export async function GET() {
    try {
        const API_KEY = process.env.YOUTUBE_API_KEY;
        const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=20&order=date&type=video&key=${API_KEY}`,
            {
                next: {
                    revalidate: 3600,
                },
            }
        );

        const data = await response.json();

        return NextResponse.json(data.items);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}