"use client"

interface CommentItem {
    _id: string;
    name: string;
    comment: string;
    createdAt: string;
}

interface CommentsProps {
    comments: CommentItem[];
}

export default function Comments({ comments }: CommentsProps) {
    return (
        <section className="mt-12 border-t border-white/10 pt-10">
            <h2 className="text-2xl merriweather-semibold">
                Comments ({comments.length})
            </h2>

            {comments.length === 0 ? (
                <p className="mt-6 text-sm merriweather-regular text-[#F2F3FF]/50">
                   Be the first to share your thoughts.
                </p>
            ) : (
                <div className="mt-8 space-y-6">
                    {comments.map((item) => (
                        <article
                            key={item._id}
                            className="rounded-2xl border border-white/10 bg-white/3 p-5"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h3 className="merriweather-medium text-[#F2F3FF]">
                                    {item.name}
                                </h3>

                                <time className="text-xs text-[#F2F3FF]/40">
                                    {new Date(item.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }
                                    )}
                                </time>
                            </div>

                            <p className="mt-4 whitespace-pre-wrap text-sm merriweather-regular leading-7 text-[#F2F3FF]/70">
                                {item.comment}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}