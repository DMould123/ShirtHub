import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import shirtRoutes from './routes/shirt.routes.js'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

// Middleware to parse JSON requests
app.use(express.json())

// Use the shirt routes under the /api prefix
app.use('/api/shirts', shirtRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on PORT: ${PORT} 🚀`)
})
