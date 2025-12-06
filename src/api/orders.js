import { authUtils } from "../utils/auth" // Import authUtils

const API_BASE_URL = "https://xnodecloud.com/api/xnode/admin"

export const ordersAPI = {
  getOrders: async () => {
    try {
      const token = authUtils.getToken() // Get token dynamically
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1") {
        return { success: true, orders: data.orders }
      } else {
        return { success: false, error: data.message || "Failed to retrieve orders" }
      }
    } catch (error) {
      return { success: false, error: error.message || "Network error occurred" }
    }
  },
  // POST /admin/server/details
  assignServer: async ({
    user_id,
    node_id,
    server_id,
    status,
    location,
    ip_address,
    hardware_specs,
    software_specs,
    ownership,
  }) => {
    try {
      const token = authUtils.getToken()
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/server/details`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id,
          node_id,
          server_id,
          status,
          location,
          ip_address,
          hardware_specs,
          software_specs,
          ownership,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1") {
        return { success: true, message: data.message || "Server details saved", id: data.id }
      } else {
        return { success: false, error: data.message || "Failed to assign server" }
      }
    } catch (error) {
      return { success: false, error: error.message || "Network error occurred" }
    }
  },
}
