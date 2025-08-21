import { authUtils } from "../utils/auth"

const API_BASE_URL = "https://aitechnotech.in/xnode/admin"

function getAuthHeaders(extra = {}) {
  const token = authUtils.getToken()
  if (!token) return null
  return {
    Authorization: `Bearer ${token}`,
    ...extra,
  }
}

export const staffAPI = {
  // GET /admin/staff
  async getStaff() {
    try {
      const headers = getAuthHeaders({ Accept: "application/json" })
      if (!headers) return { success: false, error: "Authentication token not found." }

      const res = await fetch(`${API_BASE_URL}/staff`, { headers })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

      if (data.status === "1") {
        return { success: true, staff: data.staff || [] }
      }
      return { success: false, error: data.message || "Failed to fetch staff" }
    } catch (e) {
      return { success: false, error: e.message || "Network error" }
    }
  },

  // POST /admin/staff
  async createStaff({ full_name, email, role, status }) {
    try {
      const headers = getAuthHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      if (!headers) return { success: false, error: "Authentication token not found." }

      const body = JSON.stringify({ full_name, email, role, status })
      const res = await fetch(`${API_BASE_URL}/staff`, { method: "POST", headers, body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

      if (data.status === "1") {
        return { success: true, message: data.message || "Staff/Admin created successfully." }
      }
      return { success: false, error: data.message || "Failed to create staff/admin" }
    } catch (e) {
      return { success: false, error: e.message || "Network error" }
    }
  },

  // PUT /admin/staff
  async updateStaff({ id, full_name, email, role, status }) {
    try {
      const headers = getAuthHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      if (!headers) return { success: false, error: "Authentication token not found." }

      const body = JSON.stringify({ id, full_name, email, role, status })
      const res = await fetch(`${API_BASE_URL}/staff`, { method: "PUT", headers, body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

      if (data.status === "1") {
        return { success: true, message: data.message || "Staff/Admin updated successfully." }
      }
      return { success: false, error: data.message || "Failed to update staff/admin" }
    } catch (e) {
      return { success: false, error: e.message || "Network error" }
    }
  },

  // DELETE /admin/staff
  async deleteStaff(id) {
    try {
      const headers = getAuthHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      if (!headers) return { success: false, error: "Authentication token not found." }

      const body = JSON.stringify({ id })
      const res = await fetch(`${API_BASE_URL}/staff`, { method: "DELETE", headers, body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

      if (data.status === "1") {
        return { success: true, message: data.message || "Staff/Admin deleted successfully." }
      }
      return { success: false, error: data.message || "Failed to delete staff/admin" }
    } catch (e) {
      return { success: false, error: e.message || "Network error" }
    }
  },

  // POST form-data /admin/staff/reset-password with admin_id
  async resetPassword(adminId) {
    try {
      const headers = getAuthHeaders() // No Content-Type for FormData
      if (!headers) return { success: false, error: "Authentication token not found." }

      const form = new FormData()
      form.append("admin_id", String(adminId))

      const res = await fetch(`${API_BASE_URL}/staff/reset-password`, {
        method: "POST",
        headers,
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

      if (data.status === "1") {
        return { success: true, message: data.message || "Password reset successfully." }
      }
      return { success: false, error: data.message || "Failed to reset password" }
    } catch (e) {
      return { success: false, error: e.message || "Network error" }
    }
  },
}
