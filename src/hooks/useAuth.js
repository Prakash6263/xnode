"use client"

import { useState, useEffect } from "react"
import { authUtils } from "../utils/auth"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = authUtils.getStoredUser()
      if (storedUser) {
        setUser(storedUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
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

  const logout = () => {
    authUtils.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  }
}
