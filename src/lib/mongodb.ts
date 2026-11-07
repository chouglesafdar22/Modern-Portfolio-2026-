import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable in .env.local"
    );
}

interface MongooseConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseConnection: MongooseConnection | undefined;
}

const cached: MongooseConnection = global.mongooseConnection || {
    conn: null,
    promise: null,
};

global.mongooseConnection = cached;

export async function connectToDatabase() {
    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable in .env.local"
        );
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;

    return cached.conn;
}