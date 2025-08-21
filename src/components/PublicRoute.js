import { Navigate } from "react-router-dom"
import { authUtils } from "../utils/auth"

const PublicRoute = ({ children }) => {
  const token = authUtils.getToken()
  const isAuthenticated = authUtils.isAuthenticated()

  // If user has token and is authenticated, redirect to dashboard
  if (token && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PublicRoute
