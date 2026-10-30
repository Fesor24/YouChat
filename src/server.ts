import express from "express"
import {config} from 'dotenv'
//import { connectDB, disconnectDB } from "./config/db.js";
import {connectAsync, disconnectAsync} from "../src/config/db"

// Import routes
import userRoutes from './routes/userRoutes.js'

config();

const app = express();

const PORT = 5001

connectAsync();

// API Routes
app.use("/users", userRoutes)

const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}....`)
})

process.on("unhandledRejection", async (err) =>{
    console.error("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectAsync();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) =>{
    console.error("Uncaught Exception: ", err);
    server.close(async () => {
        await disconnectAsync();
        process.exit(1);
    });
});

process.on("unhandledRejection", async (err) =>{
    console.error("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectAsync();
        process.exit(1);
    });
});

process.on("unhandledRejection", async (err) =>{
    console.error("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectAsync();
        process.exit(1);
    });
});

process.on("SIGTERM", async (err) =>{
    console.error("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectAsync();
        process.exit(1);
    });
});