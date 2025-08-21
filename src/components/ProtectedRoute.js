import { Navigate } from "react-router-dom"
import { authUtils } from "../utils/auth"

const ProtectedRoute = ({ children }) => {
  const token = authUtils.getToken()
  const isAuthenticated = authUtils.isAuthenticated()

  // If no token or not authenticated, redirect to login
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
