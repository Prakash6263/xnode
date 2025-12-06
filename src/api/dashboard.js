

import { authUtils } from "../utils/auth" // ⬅️ Add this import

const API_BASE_URL = "https://xnodecloud.com/api/xnode/admin"

export const dashboardAPI = {
  getDashboardStats: async () => {
    try {
      const token = authUtils.getToken(); // ⬅️ Get token

      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`, // ⬅️ Add token here
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch dashboard data")
      }

      if (data.status === "1") {
        return {
          success: true,
          data: data.dashboard,
        }
      } else {
        throw new Error(data.message || "Dashboard data not available")
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Network error occurred",
      }
    }
  },
}
