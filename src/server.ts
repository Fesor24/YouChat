import express from "express"
import {config} from 'dotenv'
//import { connectDB, disconnectDB } from "./config/db.js";

// Import routes
import userRoutes from './routes/userRoutes.js'


config();
//connectDB();

const app = express();

const PORT = 5001



// API Routes
app.use("/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}....`)
})

// process.on("unhandledRejection", async (err) =>{
//     console.error("Unhandled Rejection: ", err);
//     server.close(async () => {
//         //await disconnectDB();
//         process.exit(1);
//     });
// });

// process.on("uncaughtException", async (err) =>{
//     console.error("Uncaught Exception: ", err);
//     server.close(async () => {
//         //await disconnectDB();
//         process.exit(1);
//     });
// });

// process.on("unhandledRejection", async (err) =>{
//     console.error("Unhandled Rejection: ", err);
//     server.close(async () => {
//         //await disconnectDB();
//         process.exit(1);
//     });
// });

// process.on("unhandledRejection", async (err) =>{
//     console.error("Unhandled Rejection: ", err);
//     server.close(async () => {
//         //await disconnectDB();
//         process.exit(1);
//     });
// });

// process.on("SIGTERM", async (err) =>{
//     console.error("SIGTERM received, shutting down gracefully");
//     server.close(async () => {
//         //await disconnectDB();
//         process.exit(1);
//     });
// });