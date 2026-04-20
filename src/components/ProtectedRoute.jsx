import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Wraps a route and redirects to /login if the user is not authenticated.
 * Preserves the attempted path so we can redirect back after login.
 */
export default function ProtectedRoute({ children }) {
  const { user }   = useAuth()
  const location   = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
