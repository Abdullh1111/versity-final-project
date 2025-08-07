import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    MONGODB_URI: process.env.MONGODB_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
};