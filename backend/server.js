// server.js or app.js
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import shirtRoutes from './routes/shirt.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware to parse JSON requests
app.use(express.json())

// Connect to the database
connectDB()

// Use the shirt routes under the /api prefix
app.use('/api/shirts', shirtRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT} 🚀`)
})
