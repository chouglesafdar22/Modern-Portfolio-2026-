"use client";
import type * as React from "react";
import { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

interface BlogEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function BlogEditor({
    value,
    onChange,
}: BlogEditorProps) {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
        ],

        content: value,

        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },

        editorProps: {
            attributes: {
                class: "min-h-[400px] px-5 py-4 outline-none text-[#F2F3FF] [&_p]:mb-5 [&_p]:leading-7 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-3xl [&_h2]:merriweather-semibold [&_h2]:leading-tight [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-2xl [&_h3]:merriweather-semibold [&_h3]:leading- [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-xl [&_h4]:merriweather-semibold [&_ul]:mb-5 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ol]:mb-5 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_li]:pl-1 [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#F2F3FF]/70 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/40 [&_pre]:p-4 [&_code]:font-mono [&_code]:text-sm [&_hr]:my-8 [&_hr]:border-white/10 [&_a]:text-indigo-400 [&_a]:underline [&_a]:underline-offset-4 [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-xl",
            },
        },
    });

    if (!editor) {
        return (
            <div className="min-h-100 rounded-xl border border-white/10 bg-[#121212] p-5 text-white/40">
                Loading editor...
            </div>
        );
    };

    const handleImageButtonClick = () => {
        imageInputRef.current?.click();
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        try {
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

            editor
                .chain()
                .focus()
                .setImage({
                    src: data.url,
                })
                .run();
        } catch (error) {
            console.error("Blog image upload error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to upload image."
            );
        } finally {
            e.target.value = "";
        }
    };

    const removeSelectedImage = () => {
        if (!editor.isActive("image")) {
            return;
        }

        editor
            .chain()
            .focus()
            .deleteSelection()
            .run();
    };

    return (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#121212]">
            <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">

                {/* Bold */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("bold")
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    Bold
                </button>

                {/* Italic */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("italic")
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    Italic
                </button>

                {/* H2 */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("heading", { level: 2 })
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    H2
                </button>

                {/* H3 */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("heading", { level: 3 })
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    H3
                </button>

                {/* H4 */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 4 })
                            .run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("heading", { level: 4 })
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    H4
                </button>

                {/* Bullet List */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("bulletList")
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    • List
                </button>

                {/* Ordered List */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("orderedList")
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    1. List
                </button>

                {/* Code Block */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleCodeBlock()
                            .run();
                    }}
                    className={`rounded-md px-3 py-2 text-sm ${editor.isActive("codeBlock")
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                >
                    Code
                </button>

                {/* Image */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        handleImageButtonClick();
                    }}
                    className="rounded-md bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10"
                >
                    Image
                </button>

                {/* Remove Image */}
                {editor.isActive("image") && (
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            removeSelectedImage();
                        }}
                        className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20"
                    >
                        Remove Image
                    </button>
                )}

                {/* Divider */}
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .setHorizontalRule()
                            .run();
                    }}
                    className="rounded-md bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10"
                >
                    Divider
                </button>

                {/* Hidden image input */}
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}