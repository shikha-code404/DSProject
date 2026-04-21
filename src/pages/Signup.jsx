import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Code2, UserPlus, Globe, Terminal, Check } from 'lucide-react'
import { useAuth }  from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import UpcurveLogoLight from '../assets/Upcurve_logo.png'
import UpcurveLogoDark from '../assets/Upcurve_logo_dark.png'
import { useToast } from '../components/ui/Toast'
import Layout from '../components/layout/Layout'

const PASSWORD_RULES = [
  { test: v => v.length >= 8,       label: 'At least 8 characters' },
  { test: v => /[A-Z]/.test(v),     label: 'One uppercase letter' },
  { test: v => /[0-9]/.test(v),     label: 'One number' },
]

export default function Signup() {
  const { signup, user } = useAuth()
  const { theme } = useTheme()
  const { addToast }     = useToast()
  const navigate         = useNavigate()

  // If already logged in, go to /home
  useEffect(() => {
    if (user) navigate('/home', { replace: true })
  }, [user, navigate])

  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const pwStrength = PASSWORD_RULES.filter(r => r.test(form.password)).length

  function validate() {
    const e = {}
    if (!form.name.trim())              e.name    = 'Name is required'
    if (!form.email)                    e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password)                 e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await signup(form.name.trim(), form.email, form.password)
      addToast({ type: 'success', title: 'Account created!', message: 'Please check your email to verify your account.' })
      navigate('/auth/confirm-pending', { replace: true })
    } catch (err) {
      setErrors({ global: err.message })
      addToast({ type: 'error', title: 'Sign up failed', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  const strengthColors = ['bg-red-400', 'bg-yellow-400', 'bg-emerald-400']

  return (
    <Layout>
      <div className="flex-1 flex justify-center py-8 md:py-16 px-4 relative overflow-hidden">
        {/* Background Grid & Orbs */}
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
              <h2 className="text-4xl font-black font-head text-white leading-tight mb-4">
                Unlock your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">algorithm potential.</span>
              </h2>
              <p className="text-slate-400 font-medium">Join top engineers mastering Data Structures & Algorithms with Upcurve.</p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                  <UserPlus className="w-4 h-4 text-violet-400" />
                </div>
                <span className="font-medium text-sm">Create your free profile</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-medium text-sm">Interactive coding challenges</span>
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
              <h1 className="text-2xl font-bold font-head text-slate-900 dark:text-white">Create an account</h1>
            </div>

            {/* Desktop Headline */}
            <div className="hidden md:block mb-8">
              <h1 className="text-3xl font-black font-head text-slate-900 dark:text-white">Get Started</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Create your account for free</p>
            </div>

            {errors.global && (
              <div className="mb-4 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-400 text-center font-medium">{errors.global}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="signup-name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  {!form.name && <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 transition-opacity" />}
                  <input id="signup-name" type="text" placeholder="Your name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`input-base py-3.5 ${!form.name ? '!pl-11' : '!pl-4'} transition-all ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email address</label>
                <div className="relative">
                  {!form.email && <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 transition-opacity" />}
                  <input id="signup-email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`input-base py-3.5 ${!form.email ? '!pl-11' : '!pl-4'} transition-all ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    {!form.password && <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 transition-opacity" />}
                    <input id="signup-password" type={showPw ? 'text' : 'password'} placeholder="••••••••"
                      value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      className={`input-base py-3.5 ${!form.password ? '!pl-11' : '!pl-4'} transition-all pr-11 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`} />
                    <button type="button" onClick={() => setShowPw(p => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      {showPw ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.password}</p>}
                </div>

                {/* Confirm */}
                <div>
                  <label htmlFor="signup-confirm" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    {!form.confirm && <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 transition-opacity" />}
                    <input id="signup-confirm" type={showPw ? 'text' : 'password'} placeholder="••••••••"
                      value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                      className={`input-base py-3.5 ${!form.confirm ? '!pl-11' : '!pl-4'} transition-all ${errors.confirm ? 'border-red-400 focus:ring-red-400' : ''}`} />
                  </div>
                  {errors.confirm && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.confirm}</p>}
                </div>
              </div>

              {/* Password Strength meter */}
              {form.password && (
                <div className="mt-2 bg-slate-50 dark:bg-navy-900 border border-slate-100 dark:border-navy-700 rounded-xl p-3">
                  <div className="flex gap-1.5 mb-2">
                    {[0,1,2].map(i => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < pwStrength ? strengthColors[pwStrength - 1] : 'bg-slate-200 dark:bg-navy-800'}`} />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {PASSWORD_RULES.map(r => (
                      <div key={r.label} className="flex items-center gap-2 text-xs">
                        <Check className={`w-3.5 h-3.5 ${r.test(form.password) ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`} />
                        <span className={`font-medium ${r.test(form.password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button id="signup-submit" type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base rounded-2xl shadow-lg mt-2">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : (
                  <><UserPlus className="w-5 h-5" /> Create Account</>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10" /></div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 font-semibold uppercase tracking-wider bg-white dark:bg-[#1E293B] text-slate-400">or sign up with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button id="signup-google" className="btn-secondary rounded-2xl justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg> Google
              </button>
              <button id="signup-github" className="btn-secondary rounded-2xl justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10">
                <Terminal className="w-5 h-5" /> GitHub
              </button>
            </div>

            <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-bold transition-colors">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
