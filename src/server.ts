import express from "express"
import {config} from 'dotenv'
import {connectAsync, disconnectAsync} from "../src/config/db"

// Import routes
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'

config();

const app = express();

const PORT = 5001

// Connect database
connectAsync();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API Routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes);

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