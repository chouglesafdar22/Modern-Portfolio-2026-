import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlog extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;

    coverImage?: string;

    category: string;
    tags: string[];

    author: string;

    status: "draft" | "published";

    publishedAt?: Date;
    updatedAt?: Date;

    youtubeUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    otherLinks: {
        title: string;
        url: string;
    }[];

    readingTime: number;

    likes: number;
    views: number;

    createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        excerpt: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        coverImage: {
            type: String,
            default:[],
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },

        publishedAt: {
            type: Date,
        },

        youtubeUrl: {
            type: String,
            trim: true,
        },

        githubUrl: {
            type: String,
            trim: true,
        },

        linkedinUrl: {
            type: String,
            trim: true,
        },

        otherLinks: {
            type: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    url: {
                        type: String,
                        required: true,
                    },
                },
            ],
            default: [],
        },

        readingTime: {
            type: Number,
            default: 1,
            min: 1,
        },

        likes: {
            type: Number,
            default: 0,
            min: 0,
        },

        views: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Blog: Model<IBlog> =
    mongoose.models.Blog ||
    mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;