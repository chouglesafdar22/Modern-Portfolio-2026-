import mongoose, { Document, Model, Schema } from "mongoose";

export interface IComment extends Document {
    blogId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    comment: string;
    allowPublicDisplay: boolean;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
    {
        blogId: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        allowPublicDisplay: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Comment: Model<IComment> =
    mongoose.models.Comment ||
    mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;