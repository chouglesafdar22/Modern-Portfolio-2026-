import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Comment from "@/app/models/Comment";
import CommentActions from "@/components/admin/CommentActions";
import "@/app/models/Blog"

export default async function AdminCommentsPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    await connectToDatabase();

    const comments = await Comment.find()
        .sort({ createdAt: -1 })
        .populate<{
            blogId: {
                title: string;
                slug: string;
            } | null;
        }>("blogId", "title slug")
        .lean();

    const totalComments = comments.length;

    const pendingComments = comments.filter(
        (comment) => comment.status === "pending"
    ).length;

    const approvedComments = comments.filter(
        (comment) => comment.status === "approved"
    ).length;

    return (
        <div className="min-h-screen text-[#F2F3FF]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl merriweather-semibold">Comments</h1>

                    <p className="mt-2 merriweather-regular text-sm text-[#F2F3FF]/50">
                        Review and manage comments submitted on your blog articles.
                    </p>
                </div>

                {/* <Link
                    href="/admin/dashboard/blog"
                    className="w-fit rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[#F2F3FF]/70 transition hover:border-indigo-500/40 hover:text-indigo-400"
                >
                    Back to Blog
                </Link> */}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                    <p className="text-sm text-[#F2F3FF]/50">
                        Total Comments
                    </p>
                    <p className="mt-3 text-3xl merriweather-semibold">
                        {totalComments}
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                    <p className="text-sm text-[#F2F3FF]/50">Pending</p>
                    <p className="mt-3 text-3xl merriweather-semibold text-yellow-400">
                        {pendingComments}
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                    <p className="text-sm text-[#F2F3FF]/50">Approved</p>
                    <p className="mt-3 text-3xl merriweather-semibold text-green-400">
                        {approvedComments}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                {comments.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
                        <h2 className="text-lg merriweather-medium">
                            No comments yet
                        </h2>

                        <p className="mt-2 merriweather-light text-sm text-[#F2F3FF]/50">
                            Submitted comments will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <article
                                key={comment._id.toString()}
                                className="rounded-2xl border border-white/10 bg-white/3 p-5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h2 className="merriweather-medium">
                                            {comment.name}
                                        </h2>

                                        <p className="mt-1 text-sm merriweather-regular text-[#F2F3FF]/40">
                                            {comment.email}
                                        </p>
                                    </div>

                                    <span className="rounded-full merriweather-light bg-white/5 px-3 py-1 text-xs capitalize text-[#F2F3FF]/60">
                                        {comment.status}
                                    </span>
                                </div>

                                <p className="mt-4 whitespace-pre-wrap merriweather-regular text-sm leading-7 text-[#F2F3FF]/70">
                                    {comment.comment}
                                </p>

                                <div className="mt-4 border-t merriweather-light border-white/10 pt-4 text-xs text-[#F2F3FF]/40">
                                    <p>
                                        Public display permission:{" "}
                                        {comment.allowPublicDisplay
                                            ? "Granted"
                                            : "Not granted"}
                                    </p>

                                    <p className="mt-2 merriweather-light">
                                        Submitted:{" "}
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>

                                    <p className="mt-2 merriweather-light">
                                        Blog:{" "}
                                        {comment.blogId?.title || "Blog unavailable"}
                                    </p>
                                </div>

                                <CommentActions
                                    commentId={comment._id.toString()}
                                    initialStatus={comment.status}
                                />
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};