import mongoose from 'mongoose'

const shirtSchema = new mongoose.Schema(
  {
    team: { type: String, required: true }, // Team name, e.g., "Manchester United"
    season: { type: String, required: true }, // Season, e.g., "2023/2024"
    type: { type: String, enum: ['home', 'away', 'third'] }, // Type of shirt: home, away, third kit, etc.
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'] }, // User's size for the shirt
    brand: { type: String }, // Brand, e.g., "Nike", "Adidas"
    player: { type: String }, // Optional: Player name if it's a player-specific shirt
    playerNumber: { type: Number }, // Optional: Player's number if it's a player-specific shirt
    image: { type: String },// URL for the shirt's image
    backImage: { type: String }, // URL for the shirt's back image
    favorite: { type: Boolean, default: false }, // Flag to mark as a favorite in the collection
    notes: { type: String } // Optional: User's notes on the shirt
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
)

const Shirt = mongoose.model('Shirt', shirtSchema)

export default Shirt
