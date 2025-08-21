// Utility functions for authentication
export const authUtils = {
  // Store user data after login
  storeUser: (loginResponse, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem("adminUser", JSON.stringify(loginResponse))
  },

  // Get stored user data
  getStoredUser: () => {
    const sessionUser = sessionStorage.getItem("adminUser")
    const localUser = localStorage.getItem("adminUser")

    if (sessionUser) {
      return JSON.parse(sessionUser)
    }
    if (localUser) {
      return JSON.parse(localUser)
    }
    return null
  },

  // Get auth token
  getToken: () => {
    const user = authUtils.getStoredUser()
    return user ? user.token : null
  },

  // Check if user is authenticated (has valid token)
  isAuthenticated: () => {
    const token = authUtils.getToken()
    return token !== null
  },

  // Get admin data
  getAdmin: () => {
    const user = authUtils.getStoredUser()
    return user && user.admin ? user.admin : null
  },

  // Get admin ID
  getAdminId: () => {
    const admin = authUtils.getAdmin()
    return admin ? admin.id : null
  },

  // Get admin role
  getAdminRole: () => {
    const admin = authUtils.getAdmin()
    return admin ? admin.role : null
  },

  // Get admin full name
  getAdminName: () => {
    const admin = authUtils.getAdmin()
    return admin ? admin.full_name : null
  },

  // Logout user
  logout: () => {
    sessionStorage.removeItem("adminUser")
    localStorage.removeItem("adminUser")
  },

  // Check if token is expired (basic check - you might want to decode JWT)
  isTokenExpired: () => {
    const token = authUtils.getToken()
    if (!token) return true

    // You can add JWT decode logic here if needed
    // For now, just check if token exists
    return false
  },
}
