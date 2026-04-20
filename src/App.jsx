import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider }   from './contexts/ThemeContext'
import { AuthProvider }    from './contexts/AuthContext'
import { ToastProvider }   from './components/ui/Toast'
import ProtectedRoute      from './components/ProtectedRoute'

/* ─── Pages ─── */
import LandingPage      from './pages/LandingPage'
import ModulesPage      from './pages/ModulesPage'
import Login            from './pages/Login'
import Signup           from './pages/Signup'
import Prerequisite     from './pages/Prerequisite'
import BeginnerPath     from './pages/BeginnerPath'
import IntermediatePath from './pages/IntermediatePath'
import AdvancedPath     from './pages/AdvancedPath'
import Profile          from './pages/Profile'
import CControlFlowModule from './pages/modules/CControlFlowModule'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                {/* ── Public ── */}
                <Route path="/"       element={<LandingPage />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* ── Main Hub (accessible without login, but shows upsell) ── */}
                <Route path="/home"   element={<ModulesPage />} />

                {/* ── Protected learning routes ── */}
                <Route path="/prerequisite" element={
                  <ProtectedRoute><Prerequisite /></ProtectedRoute>
                } />
                <Route path="/beginner" element={
                  <ProtectedRoute><BeginnerPath /></ProtectedRoute>
                } />
                <Route path="/intermediate" element={
                  <ProtectedRoute><IntermediatePath /></ProtectedRoute>
                } />
                <Route path="/advanced" element={
                  <ProtectedRoute><AdvancedPath /></ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute><Profile /></ProtectedRoute>
                } />
                <Route path="/prerequisite/c-module" element={
                  <ProtectedRoute><CControlFlowModule /></ProtectedRoute>
                } />

                {/* ── Legacy redirect: old "/" dashboard → /home ── */}
                <Route path="/dashboard" element={<Navigate to="/home" replace />} />

                {/* ── 404 fallback ── */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
