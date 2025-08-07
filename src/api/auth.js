// API service for authentication
const API_BASE_URL = "https://aitechnotech.in/xnode/admin"

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      return {
        success: true,
        data: data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Network error occurred",
      }
    }
  },
}
