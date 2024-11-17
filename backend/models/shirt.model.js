// backend/models/shirt.model.js
import mongoose from 'mongoose';

const shirtSchema = new mongoose.Schema(
  {
    team: { type: String, required: true },
    season: { type: String, required: true },
    type: { type: String, enum: ['Home', 'Away', 'Third'] },
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'] },
    brand: { type: String },
    player: { type: String },
    playerNumber: { type: Number },
    image: { type: String },
    backImage: { type: String },
    favorite: { type: Boolean, default: false },
    notes: { type: String },
    userId: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Shirt = mongoose.model('Shirt', shirtSchema);

export default Shirt;
