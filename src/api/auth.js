const API_BASE_URL = "https://xnodecloud.com/api/xnode/admin"

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

      if (data.status === "1") {
        return {
          success: true,
          data: {
            token: data.token,
            admin: data.admin,
            message: data.message,
          },
        }
      } else {
        return {
          success: false,
          error: data.message || "Login failed",
        }
      }
    } catch (error) {
      return {
        success: false,
        error: "Network error occurred",
      }
    }
  },
}
