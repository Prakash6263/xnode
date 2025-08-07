import { authUtils } from "../utils/auth" // Import authUtils

const API_BASE_URL = "https://aitechnotech.in/xnode/admin"

export const usersAPI = {
  getUsers: async () => {
    try {
      const token = authUtils.getToken() // Get token dynamically
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1") {
        return { success: true, users: data.users }
      } else {
        return { success: false, error: data.message || "Failed to retrieve users" }
      }
    } catch (error) {
      return { success: false, error: error.message || "Network error occurred" }
    }
  },

  deleteUser: async (userId) => {
    try {
      const token = authUtils.getToken() // Get token dynamically
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user_id: userId, reason: "Admin requested deletion" }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1") {
        return { success: true, message: data.message || "User deleted successfully!" }
      } else {
        return { success: false, error: data.message || "Failed to delete user." }
      }
    } catch (error) {
      return { success: false, error: error.message || "Network error occurred" }
    }
  },

  updateUserStatus: async (userId, newStatus, reason) => {
    try {
      const token = authUtils.getToken() // Get token dynamically
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/users/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          new_status: newStatus,
          reason: reason || `Status changed to ${newStatus} by admin`,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1") {
        return { success: true, message: data.message || `User status updated to ${newStatus} successfully!` }
      } else {
        return { success: false, error: data.message || "Failed to update user status." }
      }
    } catch (error) {
      return { success: false, error: error.message || "Network error occurred" }
    }
  },
}
