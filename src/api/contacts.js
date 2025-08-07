import { authUtils } from "../utils/auth" // Import authUtils

const API_BASE_URL = "https://aitechnotech.in/xnode/admin"

export const contactsAPI = {
  getContacts: async () => {
    try {
      const token = authUtils.getToken() // Get token dynamically
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", // Changed from Content-Type to Accept
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1") {
        return { success: true, contacts: data.contacts }
      } else {
        return { success: false, error: data.message || "Failed to retrieve contacts" }
      }
    } catch (error) {
      return { success: false, error: error.message || "Network error occurred" }
    }
  },
}

