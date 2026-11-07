"use client"

interface ViewCountProps {
    views: number;
}

export default function ViewCount({ views }: ViewCountProps) {
    return (
        <span>
            {views.toLocaleString()}{" "}
            {views === 1 ? "view" : "views"}
        </span>
    );
}