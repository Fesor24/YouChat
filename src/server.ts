import express from "express"
import {config} from 'dotenv'
import {connectAsync, disconnectAsync} from "../src/config/db"

// Import routes
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'

import {initializeSockets} from './sockets/index'
import { createServer } from "node:http"

config();

const app = express();

const PORT = 5001

//Create HTTP server
const httpServer = createServer(app);

const io = initializeSockets(httpServer);

// Connect database
connectAsync();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API Routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes);

// Graceful shutdown
async function shutdown(){
    console.log("Shutting down server...");

    io.close(async () => {
        httpServer.close(async () => {
            await disconnectAsync();
            process.exit(0);
        })
    })
}

async function startServer(){
    try{
        await connectAsync();

        httpServer.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        })
    }
    catch(error){
        console.error('Unhandled Rejection:', error);
        process.exit(1);
    }
}


process.on("unhandledRejection", async (err) =>{
    console.error("Unhandled Rejection: ", err);
    shutdown();
});

process.on("uncaughtException", async (err) =>{
    console.error("Uncaught Exception: ", err);
    shutdown();
});

process.on("unhandledRejection", async (err) =>{
    console.error("Unhandled Rejection: ", err);
    shutdown();
});

process.on("unhandledRejection", async (err) =>{
    console.error("Unhandled Rejection: ", err);
    shutdown();
});

process.on("SIGTERM", shutdown);
process.on('SIGINT', shutdown);

startServer();

export {app, io}