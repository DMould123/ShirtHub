import mongoose from 'mongoose'
import Shirt from '../models/shirt.model.js'

// Get all shirts
export const getShirts = async (req, res) => {
  try {
    const shirts = await Shirt.find({})
    res.status(200).json({ success: true, data: shirts })
  } catch (error) {
    console.log('Error fetching shirts:', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

// Create a new shirt
export const createShirt = async (req, res) => {
  const shirt = req.body;

  // Check that essential fields are provided, but allow either image or backImage to be missing
  if (!shirt.team || !shirt.season || !shirt.type) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all required fields' });
  }

  // Ensure at least one image is provided
  if (!shirt.image && !shirt.backImage) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide at least one image (front or back)' });
  }

  const newShirt = new Shirt(shirt);

  try {
    await newShirt.save();
    res.status(201).json({ success: true, data: newShirt });
  } catch (error) {
    console.error('Error creating shirt:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Update a shirt
export const updateShirt = async (req, res) => {
  const { id } = req.params
  const shirt = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Shirt ID' })
  }

  try {
    const updatedShirt = await Shirt.findByIdAndUpdate(id, shirt, { new: true })
    res.status(200).json({ success: true, data: updatedShirt })
  } catch (error) {
    console.error('Error updating shirt:', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

// Delete a shirt
export const deleteShirt = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Shirt ID' })
  }

  try {
    await Shirt.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Shirt deleted' })
  } catch (error) {
    console.log('Error deleting shirt:', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}
