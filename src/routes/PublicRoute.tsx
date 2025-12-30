import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}