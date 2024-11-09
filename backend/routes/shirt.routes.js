import express from 'express'
import {
  getShirts,
  createShirt,
  updateShirt,
  deleteShirt
} from '../controllers/shirt.controller.js'

const router = express.Router()

router.get('/', getShirts) // Fetch all shirts
router.post('/', createShirt) // Add a new shirt
router.put('/:id', updateShirt) // Update a shirt by ID
router.delete('/:id', deleteShirt) // Delete a shirt by ID

export default router
