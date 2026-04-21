import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Code2, LogIn, Globe, Terminal } from 'lucide-react'
import { useAuth }  from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import UpcurveLogoLight from '../assets/Upcurve_logo.png'
import UpcurveLogoDark from '../assets/Upcurve_logo_dark.png'
import { useToast } from '../components/ui/Toast'
import Layout from '../components/layout/Layout'

export default function Login() {
  const { login, user } = useAuth()
  const { theme }       = useTheme()
  const { addToast }    = useToast()
  const navigate        = useNavigate()
  const location        = useLocation()

  // If already logged in, go to /home
  useEffect(() => {
    if (user) navigate('/home', { replace: true })
  }, [user, navigate])

  const [form, setForm]     = useState({ email: '', password: '', remember: false })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [failedAttempts, setFailedAttempts] = useState(0)

  function validate() {
    const e = {}
    if (!form.email)                          e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email  = 'Enter a valid email'
    if (!form.password)                       e.password = 'Password is required'
    else if (form.password.length < 6)        e.password = 'At least 6 characters'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (failedAttempts >= 5) {
      setErrors({ global: 'Too many failed attempts. Please try again later.' })
      return
    }

    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    
    setErrors({})
    setLoading(true)
    try {
      await login(form.email, form.password)
      setFailedAttempts(0)
      addToast({ type: 'success', title: 'Welcome back!', message: 'You have signed in successfully.' })
      const from = location.state?.from?.pathname || '/home'
      navigate(from, { replace: true })
    } catch (err) {
      setFailedAttempts(prev => prev + 1)
      setErrors({ global: err.message })
      
      // Supabase often throws this exact phrase if email confirmation is required and missing
      if (err.message.toLowerCase().includes('email not confirmed')) {
         addToast({ type: 'error', title: 'Action required', message: 'Please confirm your email first.' })
         navigate('/auth/confirm-pending')
      } else {
         addToast({ type: 'error', title: 'Sign in failed', message: err.message })
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <Layout>
      <div className="flex-1 flex justify-center py-8 md:py-16 px-4 relative overflow-hidden">
        {/* Background Grid & Orbs for the whole page */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{ 
              backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', 
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)'
            }} 
          />
        </div>
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-violet-500/10 dark:bg-violet-600/10 blur-[100px] pointer-events-none" 
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-[100px] pointer-events-none" 
        />

        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.5, ease: 'easeOut' }}
           className="w-full max-w-[1000px] card-glass rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 border border-slate-200 dark:border-white/10"
        >
          {/* Left Branding Panel (Hidden on mobile) */}
          <div className="hidden md:flex md:w-5/12 bg-slate-900 border-r border-slate-800 relative p-12 flex-col justify-between overflow-hidden">
            {/* Absolute Orbs Inside Panel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/30 rounded-full blur-[80px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
                <img src={UpcurveLogoDark} alt="Upcurve" className="h-8 w-auto group-hover:scale-105 transition-transform" />
              </Link>
              <h2 className="text-3xl font-black font-head text-white leading-tight mb-4">
                Welcome back to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">learning journey.</span>
              </h2>
              <p className="text-slate-400 font-medium">Log in to pick up right where you left off. The leaderboard awaits.</p>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                <Code2 className="w-8 h-8 text-violet-400" />
                <div>
                  <p className="text-sm font-bold text-white">Algorithm Mastery</p>
                  <p className="text-xs text-slate-400">Continue solving challenges</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-[#1E293B]">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4">
                <img src={theme === 'dark' ? UpcurveLogoDark : UpcurveLogoLight} alt="Upcurve Logo" className="h-10 w-auto object-contain" />
              </div>
              <h1 className="text-2xl font-bold font-head text-slate-900 dark:text-white">Welcome back</h1>
            </div>

            {/* Desktop Headline */}
            <div className="hidden md:block mb-8">
              <h1 className="text-3xl font-black font-head text-slate-900 dark:text-white">Sign In</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Access your dashboard</p>
            </div>

            {/* Try hint */}
            <div className="mb-6 px-4 py-3 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium text-center">
                <strong>Demo:</strong> demo@upcurve.dev / demo1234
              </p>
            </div>

            {errors.global && (
              <div className="mb-4 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-400 text-center font-medium">{errors.global}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email address</label>
                <div className="relative">
                  {!form.email && <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 transition-opacity" />}
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="demo@upcurve.dev"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`input-base py-3.5 ${!form.email ? '!pl-11' : '!pl-4'} transition-all ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                <div className="relative">
                  {!form.password && <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 transition-opacity" />}
                  <input
                    id="login-password"
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className={`input-base py-3.5 ${!form.password ? '!pl-11' : '!pl-4'} pr-11 transition-all ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                  />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {showPw ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={form.remember}
                    onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                    className="w-4.5 h-4.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-base rounded-2xl shadow-lg mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <><LogIn className="w-5 h-5" /> Sign In</>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10" /></div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 font-semibold uppercase tracking-wider bg-white dark:bg-[#1E293B] text-slate-400">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button id="login-google" className="btn-secondary rounded-2xl justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg> Google
              </button>
              <button id="login-github" className="btn-secondary rounded-2xl justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10">
                <Terminal className="w-5 h-5" /> GitHub
              </button>
            </div>

            <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-8">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-bold transition-colors">
                Sign up free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
