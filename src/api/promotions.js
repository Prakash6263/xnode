import { authUtils } from "../utils/auth"

const API_BASE_URL = "https://xnodecloud.com/api/xnode/admin"

export const promotionsAPI = {
  // GET /promotions-coupons - Retrieve all coupons with pagination
  getCoupons: async (skip = 0, limit = 10) => {
    try {
      const token = authUtils.getToken()
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/promotions-coupons?skip=${skip}&limit=${limit}`, {
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
        return { success: true, coupons: data.data || [], message: data.message }
      } else {
        return { success: false, error: data.message || "Failed to retrieve coupons" }
      }
    } catch (error) {
      return { success: false, error: error.message || "Network error occurred" }
    }
  },

  // POST /promotions-coupons/create - Create a new coupon
  createCoupon: async (couponData) => {
    try {
      const token = authUtils.getToken()
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      // Build urlencoded body (only include defined values)
      const params = new URLSearchParams()
      if (couponData.code != null) params.append("code", couponData.code)
      if (couponData.discount != null) params.append("discount", String(couponData.discount))
      if (couponData.discount_type != null) params.append("discount_type", couponData.discount_type)
      if (couponData.usage_limit !== undefined && couponData.usage_limit !== null) {
        // backend may expect null or empty omitted for unlimited
        params.append("usage_limit", couponData.usage_limit === null ? "" : String(couponData.usage_limit))
      }
      if (couponData.validity_days != null) params.append("validity_days", String(couponData.validity_days))
      if (couponData.expires_at != null) params.append("expires_at", couponData.expires_at)
      if (couponData.applies_to != null) params.append("applies_to", couponData.applies_to)
      if (typeof couponData.is_active !== "undefined") params.append("is_active", String(couponData.is_active))

      const response = await fetch(`${API_BASE_URL}/promotions-coupons/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params.toString(),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail?.[0]?.msg || data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1" || data.status === 1) {
        return { success: true, coupon: data.coupon || data.data, message: data.message }
      } else {
        return { success: false, error: data.message || "Failed to create coupon" }
      }
    } catch (error) {
      console.error("[v0] Coupon creation error:", error)
      return { success: false, error: error.message || "Network error occurred" }
    }
  },

  // GET /promotions-coupons/:couponId - Retrieve a coupon by ID
  getCouponById: async (couponId) => {
    try {
      const token = authUtils.getToken()
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/promotions-coupons/${couponId}`, {
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
        return { success: true, coupon: data.coupon || data.data, message: data.message }
      } else {
        return { success: false, error: data.message || "Failed to retrieve coupon" }
      }
    } catch (error) {
      console.error("[v0] Get coupon error:", error)
      return { success: false, error: error.message || "Network error occurred" }
    }
  },

  // PUT /promotions-coupons/:couponId - Update a coupon by ID
  updateCoupon: async (couponId, couponData) => {
    try {
      const token = authUtils.getToken()
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      // Build urlencoded body
      const params = new URLSearchParams()
      if (couponData.code != null) params.append("code", couponData.code)
      if (couponData.discount != null) params.append("discount", String(couponData.discount))
      if (couponData.discount_type != null) params.append("discount_type", couponData.discount_type)
      if (couponData.usage_limit !== undefined && couponData.usage_limit !== null) {
        params.append("usage_limit", couponData.usage_limit === null ? "" : String(couponData.usage_limit))
      }
      if (couponData.validity_days != null) params.append("validity_days", String(couponData.validity_days))
      if (couponData.expires_at != null) params.append("expires_at", couponData.expires_at)
      if (couponData.applies_to != null) params.append("applies_to", couponData.applies_to)
      if (typeof couponData.is_active !== "undefined") params.append("is_active", String(couponData.is_active))

      const response = await fetch(`${API_BASE_URL}/promotions-coupons/${couponId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params.toString(),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail?.[0]?.msg || data.message || `HTTP error! status: ${response.status}`)
      }

      if (data.status === "1" || data.status === 1) {
        return { success: true, coupon: data.coupon || data.data, message: data.message }
      } else {
        return { success: false, error: data.message || "Failed to update coupon" }
      }
    } catch (error) {
      console.error("[v0] Update coupon error:", error)
      return { success: false, error: error.message || "Network error occurred" }
    }
  },

  // DELETE /promotions-coupons/:couponId - Delete a coupon by ID
  deleteCoupon: async (couponId) => {
    try {
      const token = authUtils.getToken()
      if (!token) {
        return { success: false, error: "Authentication token not found." }
      }

      const response = await fetch(`${API_BASE_URL}/promotions-coupons/${couponId}`, {
        method: "DELETE",
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
        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.message || "Failed to delete coupon" }
      }
    } catch (error) {
      console.error("[v0] Delete coupon error:", error)
      return { success: false, error: error.message || "Network error occurred" }
    }
  },
}
