import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.DB_URL)
            throw new Error("Data Base URL is not set properly in environment variables");
        const conn = await mongoose.connect(process.env.DB_URL);
        if (conn) {
            console.log("Data Base Connected Successfuly");
        }
    } catch (err) {
        console.log("Data Base Connection Failed", err.message);
    }
}