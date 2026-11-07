"use client";
import { useState } from "react";

interface CommentActionsProps {
    commentId: string;
    initialStatus: "pending" | "approved" | "rejected";
}

export default function CommentActions({
    commentId,
    initialStatus,
}: CommentActionsProps) {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);

    const updateStatus = async (
        newStatus: "pending" | "approved" | "rejected"
    ) => {
        setLoading(true);

        try {
            const response = await fetch(
                `/api/admin/comments/${commentId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update comment.");
            }

            setStatus(newStatus);
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5 flex flex-wrap gap-3">
            {status !== "approved" && (
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => updateStatus("approved")}
                    className="rounded-lg bg-green-500/10 px-4 py-2 merriweather-regular text-sm text-green-400 transition hover:bg-green-500/20 disabled:opacity-50 cursor-pointer"
                >
                    Approve
                </button>
            )}

            {status !== "rejected" && (
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => updateStatus("rejected")}
                    className="rounded-lg bg-red-500/10 px-4 py-2 merriweather-regular text-sm text-red-400 transition hover:bg-red-500/20 disabled:opacity-50 cursor-pointer"
                >
                    Reject
                </button>
            )}

            {status !== "pending" && (
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => updateStatus("pending")}
                    className="rounded-lg border border-white/10 px-4 py-2 merriweather-regular text-sm text-[#F2F3FF]/60 transition hover:border-white/20 disabled:opacity-50 cursor-pointer"
                >
                    Restore to Pending
                </button>
            )}
        </div>
    );
}