"use client";
import { useEffect } from "react";

interface ViewTrackerProps {
    blogId: string;
}

export default function ViewTracker({
    blogId,
}: ViewTrackerProps) {
    useEffect(() => {
        const viewedKey = `blog_viewed_${blogId}`;

        if (sessionStorage.getItem(viewedKey)) {
            return;
        }

        const recordView = async () => {
            try {
                const response = await fetch(
                    `/api/blogs/${blogId}/views`,
                    {
                        method: "POST",
                    }
                );

                if (response.ok) {
                    sessionStorage.setItem(viewedKey, "true");
                }
            } catch (error) {
                console.error("Failed to record blog view:", error);
            }
        };

        recordView();
    }, [blogId]);

    return null;
}