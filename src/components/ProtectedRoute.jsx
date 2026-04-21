import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Wraps a route and redirects strictly based on Auth status.
 */
export default function ProtectedRoute({ children }) {
  const { user, isConfirmed } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is logged in but hasn't confirmed their email
  if (!isConfirmed) {
    return <Navigate to="/auth/confirm-pending" replace />
  }

  return children
}
