import { authUtils } from "../utils/auth"

const API_BASE_URL = "https://xnodecloud.com/api/xnode/admin"

const nodesPlanAPI = {
  // GET /admin/node-plans
  async getPlans() {
    const headers = authUtils.getToken()
      ? { Authorization: `Bearer ${authUtils.getToken()}`, Accept: "application/json" }
      : null
    if (!headers) return { success: false, error: "Authentication token not found." }

    try {
      const res = await fetch(`${API_BASE_URL}/node-plans`, { headers })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

      return data.status === "1"
        ? { success: true, plans: data.data || [] }
        : { success: false, error: data.message }
    } catch (e) {
      return { success: false, error: e.message || "Network error" }
    }
  },

  // POST /admin/node-plans
  async createPlan(formData) {
    const token = authUtils.getToken()
    if (!token) return { success: false, error: "Authentication token not found." }

    try {
      const body = new FormData()
      for (let key in formData) {
        if (formData[key] !== null) {
          // Convert boolean to string
          const value = typeof formData[key] === "boolean" ? formData[key] ? "true" : "false" : formData[key]
          body.append(key, value)
        }
      }

      const res = await fetch(`${API_BASE_URL}/node-plans`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

      // Return success with message and created plan data
      return {
        success: true,
        message: data.message || "Node plan added successfully",
        plan: data, // the full response from server
      }
    } catch (e) {
      return { success: false, error: e.message || "Network error" }
    }
  },
}

export default nodesPlanAPI
