import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider }   from './contexts/ThemeContext'
import { AuthProvider }    from './contexts/AuthContext'
import { ToastProvider }   from './components/ui/Toast'
import ProtectedRoute      from './components/ProtectedRoute'
import { ErrorBoundary }   from './components/ErrorBoundary'

/* ─── Pages ─── */
import LandingPage      from './pages/LandingPage'
import ModulesPage      from './pages/ModulesPage'
import Login            from './pages/Login'
import Signup           from './pages/Signup'
import AuthCallback     from './pages/auth/AuthCallback'
import ConfirmPending   from './pages/auth/ConfirmPending'
import Prerequisite     from './pages/Prerequisite'
import BeginnerPath     from './pages/BeginnerPath'
import IntermediatePath from './pages/IntermediatePath'
import AdvancedPath     from './pages/AdvancedPath'
import Profile          from './pages/Profile'
import CControlFlowModule from './pages/modules/CControlFlowModule'
import DataTypesVariables from './pages/modules/DataTypesVariables'
import IoModule           from './pages/modules/IoModule'
import OperatorsExpressions from './pages/modules/OperatorsExpressions'
import ControlStatements   from './pages/modules/ControlStatements'
import LoopsModule         from './pages/modules/LoopsModule'
import StlIntroduction    from './pages/modules/StlIntroduction'
import Quiz               from './pages/modules/Quiz'
import ArrayStrings       from './pages/modules/ArrayStrings'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <ErrorBoundary>
                <Routes>
                {/* ── Public ── */}
                <Route path="/"       element={<LandingPage />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* ── Auth Flow ── */}
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/auth/confirm-pending" element={<ConfirmPending />} />

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
                <Route path="/prerequisite/data-types" element={
                  <ProtectedRoute><DataTypesVariables /></ProtectedRoute>
                } />
                <Route path="/prerequisite/io-module" element={
                  <ProtectedRoute><IoModule /></ProtectedRoute>
                } />
                <Route path="/prerequisite/operators" element={
                  <ProtectedRoute><OperatorsExpressions /></ProtectedRoute>
                } />
                <Route path="/beginner/control-statements" element={
                  <ProtectedRoute><ControlStatements /></ProtectedRoute>
                } />
                <Route path="/beginner/loops" element={
                  <ProtectedRoute><LoopsModule /></ProtectedRoute>
                } />
                <Route path="/beginner/array-string" element={
                  <ProtectedRoute><ArrayStrings /></ProtectedRoute>
                } />
                <Route path="/beginner/Array & String" element={
                  <ProtectedRoute><ArrayStrings /></ProtectedRoute>
                } />
                <Route path="/beginner/stl-introduction" element={
                  <ProtectedRoute><StlIntroduction /></ProtectedRoute>
                } />
                <Route path="/prerequisite/quiz" element={
                  <ProtectedRoute><Quiz /></ProtectedRoute>
                } />

                {/* ── Legacy redirect: old "/" dashboard → /home ── */}
                <Route path="/dashboard" element={<Navigate to="/home" replace />} />

                {/* ── 404 fallback ── */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              </ErrorBoundary>
            </AnimatePresence>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
