import express from "express"

// Import routes
import userRoutes from './routes/userRoutes.js'

const app = express();

const PORT = 5001



// API Routes
app.use("/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}....`)
})