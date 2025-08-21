"use client"

import { useState, useEffect } from "react"
import { authUtils } from "../utils/auth"

export const useAuth = () => {
  const [admin, setAdmin] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = authUtils.getToken()
      const storedAdmin = authUtils.getStoredUser()

      if (token && storedAdmin) {
        setAdmin(storedAdmin.admin)
        setIsAuthenticated(true)
      } else {
        setAdmin(null)
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage changes (useful for logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === "adminUser" || e.key === null) {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const login = (loginResponse) => {
    // Store the complete login response
    const rememberMe = false // You can add this as parameter if needed
    authUtils.storeUser(loginResponse, rememberMe)
    setAdmin(loginResponse.admin)
    setIsAuthenticated(true)
  }

  const logout = () => {
    authUtils.logout()
    setAdmin(null)
    setIsAuthenticated(false)
  }

  return {
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout,
    token: authUtils.getToken(),
  }
}
