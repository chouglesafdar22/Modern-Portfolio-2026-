"use client";
import type * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/blog/BlogEditor";

export default function NewBlogPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [coverUploading, setCoverUploading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "",
        tags: "",
        author: "Safdar Chougle",
        status: "draft",
        readingTime: "5",
        youtubeUrl: "",
        githubUrl: "",
        linkedinUrl: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const generateSlug = () => {
        const slug = form.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        setForm((prev) => ({
            ...prev,
            slug,
        }));
    };

    // Upload image to Cloudinary through our API
    const uploadImage = async (file: File) => {
        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Image upload failed."
            );
        }

        return data.url as string;
    };

    // Cover image upload
    const handleCoverImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setError("");
        setCoverUploading(true);

        try {
            const url = await uploadImage(file);

            setForm((prev) => ({
                ...prev,
                coverImage: url,
            }));
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload cover image."
            );
        } finally {
            setCoverUploading(false);

            // Allow selecting the same file again
            e.target.value = "";
        }
    };

    // Remove cover image from the form
    const removeCoverImage = () => {
        setForm((prev) => ({
            ...prev,
            coverImage: "",
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (!form.coverImage) {
                setError("Please upload a cover image.");
                setLoading(false);
                return;
            }

            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: form.title,
                    slug: form.slug,
                    excerpt: form.excerpt,
                    content: form.content,

                    coverImage: form.coverImage,

                    category: form.category,

                    tags: form.tags
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),

                    author: form.author,
                    status: form.status,
                    readingTime: Number(form.readingTime),

                    youtubeUrl:
                        form.youtubeUrl || undefined,

                    githubUrl:
                        form.githubUrl || undefined,

                    linkedinUrl:
                        form.linkedinUrl || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Failed to create blog."
                );
                return;
            }

            setSuccess("Blog created successfully.");

            setTimeout(() => {
                router.push("/admin/dashboard/blogs");
                router.refresh();
            }, 700);
        } catch {
            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/admin/dashboard/blogs"
                        )
                    }
                    className="mb-4 text-sm merriweather-regular text-[#F2F3FF]/50 transition hover:text-[#F2F3FF]"
                >
                    ← Back to Blog
                </button>

                <h1 className="text-2xl merriweather-semibold tracking-tight sm:text-3xl">
                    Create New Blog
                </h1>

                <p className="mt-1 text-sm merriweather-regular text-[#F2F3FF]/50">
                    Create and publish a new article.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Basic Information */}
                <section className="rounded-2xl border border-white/10 bg-white/2 p-5 sm:p-6">
                    <h2 className="text-lg merriweather-medium">
                        Basic Information
                    </h2>

                    <div className="mt-5 space-y-5">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Title *
                            </label>

                            <input
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter blog title"
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <label
                                    htmlFor="slug"
                                    className="block text-sm merriweather-regular text-[#F2F3FF]/70"
                                >
                                    Slug *
                                </label>

                                <button
                                    type="button"
                                    onClick={generateSlug}
                                    className="text-xs merriweather-light text-indigo-400 transition hover:text-indigo-300"
                                >
                                    Generate from title
                                </button>
                            </div>

                            <input
                                id="slug"
                                name="slug"
                                value={form.slug}
                                onChange={handleChange}
                                placeholder="my-blog-post"
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label
                                htmlFor="excerpt"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Excerpt *
                            </label>

                            <textarea
                                id="excerpt"
                                name="excerpt"
                                value={form.excerpt}
                                onChange={handleChange}
                                placeholder="Write a short summary of your article..."
                                rows={3}
                                required
                                className="w-full resize-y rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label
                                htmlFor="content"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Content *
                            </label>

                            <BlogEditor
                                value={form.content}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        content: value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Blog Details */}
                <section className="rounded-2xl border border-white/10 bg-white/2 p-5 sm:p-6">
                    <h2 className="text-lg merriweather-medium">
                        Blog Details
                    </h2>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Category *
                            </label>

                            <input
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="Web Development"
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label
                                htmlFor="author"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Author *
                            </label>

                            <input
                                id="author"
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label
                                htmlFor="tags"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Tags
                            </label>

                            <input
                                id="tags"
                                name="tags"
                                value={form.tags}
                                onChange={handleChange}
                                placeholder="Next.js, React, TypeScript"
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />

                            <p className="mt-2 text-xs merriweather-light text-[#F2F3FF]/30">
                                Separate tags with commas.
                            </p>
                        </div>

                        {/* Reading Time */}
                        <div>
                            <label
                                htmlFor="readingTime"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Reading Time (minutes)
                            </label>

                            <input
                                id="readingTime"
                                name="readingTime"
                                type="number"
                                min="1"
                                value={form.readingTime}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                Status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                            >
                                <option value="draft">
                                    Draft
                                </option>

                                <option value="published">
                                    Published
                                </option>
                            </select>
                        </div>

                        {/* Cover Image */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70">
                                Cover Image *
                            </label>

                            <div className="rounded-xl border border-dashed border-white/15 bg-[#121212] p-5">
                                {!form.coverImage ? (
                                    <label
                                        htmlFor="coverImage"
                                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg py-8 text-center transition hover:bg-white/3"
                                    >
                                        <span className="text-sm merriweather-medium">
                                            {coverUploading
                                                ? "Uploading..."
                                                : "Choose Cover Image"}
                                        </span>

                                        <span className="mt-1 text-xs merriweather-light text-[#F2F3FF]/30">
                                            JPG, PNG, WebP or GIF ·
                                            Max 10 MB
                                        </span>

                                        <input
                                            id="coverImage"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            onChange={
                                                handleCoverImageUpload
                                            }
                                            disabled={
                                                coverUploading
                                            }
                                            className="hidden"
                                        />
                                    </label>
                                ) : (
                                    <div>
                                        <div className="relative overflow-hidden rounded-xl border border-white/10">
                                            <img
                                                src={
                                                    form.coverImage
                                                }
                                                alt="Cover preview"
                                                className="max-h-80 w-full object-contain"
                                            />
                                        </div>

                                        <div className="mt-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={
                                                    removeCoverImage
                                                }
                                                className="rounded-lg border border-red-500/20 px-3 py-2 text-xs merriweather-regular text-red-400 transition hover:bg-red-500/10"
                                            >
                                                Remove Cover
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Links */}
                <section className="rounded-2xl border border-white/10 bg-white/2 p-5 sm:p-6">
                    <h2 className="text-lg merriweather-medium">
                        Related Links
                    </h2>

                    <div className="mt-5 space-y-5">
                        {/* YouTube */}
                        <div>
                            <label
                                htmlFor="youtubeUrl"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                YouTube URL
                            </label>

                            <input
                                id="youtubeUrl"
                                name="youtubeUrl"
                                type="url"
                                value={form.youtubeUrl}
                                onChange={handleChange}
                                placeholder="https://youtube.com/..."
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />
                        </div>

                        {/* GitHub */}
                        <div>
                            <label
                                htmlFor="githubUrl"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                GitHub URL
                            </label>

                            <input
                                id="githubUrl"
                                name="githubUrl"
                                type="url"
                                value={form.githubUrl}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label
                                htmlFor="linkedinUrl"
                                className="mb-2 block text-sm merriweather-regular text-[#F2F3FF]/70"
                            >
                                LinkedIn URL
                            </label>

                            <input
                                id="linkedinUrl"
                                name="linkedinUrl"
                                type="url"
                                value={form.linkedinUrl}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/..."
                                className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm outline-none transition placeholder:text-[#F2F3FF]/30 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Messages */}
                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm merriweather-light text-red-400">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm merriweather-light text-green-400">
                        {success}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/admin/dashboard/blogs"
                            )
                        }
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm merriweather-medium text-[#F2F3FF]/70 transition hover:bg-white/5 hover:text-[#F2F3FF]"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            coverUploading
                        }
                        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm merriweather-medium font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Blog"}
                    </button>
                </div>
            </form>
        </div>
    );
}