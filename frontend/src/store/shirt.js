import { create } from 'zustand'

export const useShirtStore = create((set) => ({
  shirts: [],
  setShirts: (shirts) => set({ shirts }),
  createShirt: async (newShirt) => {
    // Ensure all required fields are filled before creating a new shirt
    if (
      !newShirt.team ||
      !newShirt.season ||
      !newShirt.type ||
      !newShirt.size ||
      !newShirt.image
    ) {
      return { success: false, message: 'Please fill in all required fields.' }
    }
    try {
      const res = await fetch('/api/shirts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newShirt)
      })

      if (!res.ok) {
        // Handle HTTP errors
        const errorData = await res.json()
        return {
          success: false,
          message: errorData.message || 'Failed to create shirt.'
        }
      }

      const data = await res.json()
      if (!data.success) return { success: false, message: data.message }

      // Update shirts array with the newly created shirt
      set((state) => ({ shirts: [...state.shirts, data.data] }))
      return { success: true, message: 'Shirt created successfully' }
    } catch (error) {
      // Handle network errors
      return { success: false, message: 'Network error: ' + error.message }
    }
  },
  fetchShirts: async (userId) => {
    // Fetch all shirts for the specific user from the API
    const res = await fetch(`/api/shirts?userId=${userId}`)
    const data = await res.json()
    set({ shirts: data.data })
  },
  deleteShirt: async (sid) => {
    // Delete a shirt by ID
    const res = await fetch(`/api/shirts/${sid}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }

    // Update shirts array to remove the deleted shirt
    set((state) => ({
      shirts: state.shirts.filter((shirt) => shirt._id !== sid)
    }))
    return { success: true, message: data.message }
  },
  updateShirt: async (sid, updatedShirt) => {
    // Update a shirt by ID
    const res = await fetch(`/api/shirts/${sid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedShirt)
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }

    // Update shirts array to reflect the updated shirt details
    set((state) => ({
      shirts: state.shirts.map((shirt) =>
        shirt._id === sid ? data.data : shirt
      )
    }))

    return { success: true, message: data.message }
  }
}))
