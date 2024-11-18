import express from 'express'
import {
  getShirts,
  createShirt,
  updateShirt,
  deleteShirt
} from '../controllers/shirt.controller.js'

const router = express.Router()

// Fetch all shirts for a specific user
router.get('/', getShirts)
// Add a new shirt
router.post('/', createShirt)
// Update a shirt by ID
router.put('/:id', updateShirt)
// Delete a shirt by ID

router.delete('/:id', deleteShirt)

export default router
