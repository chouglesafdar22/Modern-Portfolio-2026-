"use client";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

interface LikeButtonProps {
    blogId: string;
    initialLikes: number;
}

export default function LikeButton({
    blogId,
    initialLikes,
}: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const likedKey = `blog_liked_${blogId}`;
        const savedLike=localStorage.getItem(likedKey);

        console.log("CurrentBLog ID:", blogId);
        console.log("Like Storage Key:", likedKey);
        console.log("Saved Like:",savedLike);

        setLiked(Boolean(savedLike));
        setLikes(initialLikes);

    }, [blogId, initialLikes]);

    const handleLike = async () => {
        if (liked || loading) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `/api/blogs/${blogId}/likes`,
                {
                    method: "POST",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to like blog."
                );
            }

            setLikes(data.likes);
            setLiked(true);

            localStorage.setItem(
                `blog_liked_${blogId}`,
                "true"
            );
        } catch (error) {
            console.error("Like error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLike}
            disabled={liked || loading}
            className={`inline-flex items-center cursor-pointer gap-2 rounded-xl border px-4 py-2.5 text-sm merriweather-medium transition ${liked
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-400"
                : "border-white/10 bg-white/3 text-[#F2F3FF]/70 hover:border-indigo-500/40 hover:text-indigo-400"
                } disabled:cursor-not-allowed`}
        >
            <span className="transition-all duration-150 ease-in-out">{liked ? <FaHeart /> : <FaRegHeart />}</span>

            <span>
                {likes} {likes === 1 ? "Like" : "Likes"}
            </span>
        </button>
    );
}