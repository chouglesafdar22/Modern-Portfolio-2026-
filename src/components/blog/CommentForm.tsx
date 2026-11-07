"use client";
import { useState } from "react";

interface CommentFormProps {
    blogId: string;
}

export default function CommentForm({ blogId }: CommentFormProps) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        comment: "",
        allowPublicDisplay: false,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError(false);

        try {
            const response = await fetch(
                `/api/blogs/${blogId}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to submit comment."
                );
            }

            setMessage(data.message);

            setForm({
                name: "",
                email: "",
                comment: "",
                allowPublicDisplay: false,
            });
        } catch (err) {
            setError(true);
            setMessage(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-2xl merriweather-semibold">Leave a Comment</h2>

            <p className="mt-2 text-sm merriweather-light text-[#F2F3FF]/50">
                Share your thoughts or ask a question about this article.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block merriweather-regular text-sm text-[#F2F3FF]/70">
                            Name
                        </label>

                        <input
                            type="text"
                            required
                            maxLength={80}
                            value={form.name}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="Your name"
                            className="w-full rounded-xl border merriweather-regular border-white/10 bg-white/3 px-4 py-3 text-sm text-[#F2F3FF] outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500/50"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block merriweather-regular text-sm text-[#F2F3FF]/70">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            maxLength={254}
                            value={form.email}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            placeholder="you@example.com"
                            className="w-full rounded-xl border merriweather-regular border-white/10 bg-white/3 px-4 py-3 text-sm text-[#F2F3FF] outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500/50"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block merriweather-regular text-sm text-[#F2F3FF]/70">
                        Comment
                    </label>

                    <textarea
                        required
                        maxLength={2000}
                        rows={5}
                        value={form.comment}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                comment: e.target.value,
                            }))
                        }
                        placeholder="Write your comment..."
                        className="w-full resize-y rounded-xl border merriweather-regular border-white/10 bg-white/3 px-4 py-3 text-sm text-[#F2F3FF] outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500/50"
                    />
                </div>

                <label className="flex cursor-pointer items-start merriweather-regular gap-3 text-sm text-[#F2F3FF]/60">
                    <input
                        type="checkbox"
                        checked={form.allowPublicDisplay}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                allowPublicDisplay: e.target.checked,
                            }))
                        }
                        className="mt-1 accent-indigo-500"
                    />

                    <span>
                        I allow my comment to be displayed publicly on this blog
                        after review.
                    </span>
                </label>

                {message && (
                    <p
                        className={`text-sm merriweather-light ${error ? "text-red-400" : "text-green-400"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-indigo-500 px-6 py-3 text-sm merriweather-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Submitting..." : "Submit Comment"}
                </button>
            </form>
        </section>
    );
}