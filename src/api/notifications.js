

import { authUtils } from "../utils/auth" 
// API service for notifications data
const API_BASE_URL = "https://xnodecloud.com/api/xnode/admin"


export const notificationsAPI = {
  getNotifications: async (limit = 50, offset = 0, unread_only = false) => {
    try {
      const token = authUtils.getToken(); // ⬅️ Get token

      const response = await fetch(
        `${API_BASE_URL}/notifications?limit=${limit}&offset=${offset}&unread_only=${unread_only}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`, // ⬅️ Add token here
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch notifications")
      }

      if (data.status === "1") {
        return {
          success: true,
          data: data, // Contains total_count, unread_count, and notifications array
        }
      } else {
        throw new Error(data.message || "Notifications not available")
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Network error occurred",
      }
    }
  },
}

