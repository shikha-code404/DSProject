import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Code2, UserPlus, Globe, Terminal, Check } from 'lucide-react'
import { useAuth }  from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import Layout from '../components/layout/Layout'

const PASSWORD_RULES = [
  { test: v => v.length >= 8,       label: 'At least 8 characters' },
  { test: v => /[A-Z]/.test(v),     label: 'One uppercase letter' },
  { test: v => /[0-9]/.test(v),     label: 'One number' },
]

export default function Signup() {
  const { signup, user } = useAuth()
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
      addToast({ type: 'success', title: 'Account created!', message: 'Welcome to CodeLife 🎉' })
      navigate('/home', { replace: true })
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
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="card-glass rounded-2xl p-8 shadow-card">
            {/* Logo */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan shadow-glow-primary mb-4">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-head text-slate-900 dark:text-white">Create your account</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Start your DSA journey for free</p>
            </div>

            {errors.global && (
              <div className="mb-4 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-400">{errors.global}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="signup-name" type="text" placeholder="Your name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`input-base pl-10 ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="signup-email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`input-base pl-10 ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="signup-password" type={showPw ? 'text' : 'password'} placeholder="••••••••"
                    value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className={`input-base pl-10 pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`} />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

                {/* Strength meter */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1.5">
                      {[0,1,2].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < pwStrength ? strengthColors[pwStrength - 1] : 'bg-slate-200 dark:bg-navy-700'}`} />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {PASSWORD_RULES.map(r => (
                        <div key={r.label} className="flex items-center gap-1.5 text-xs">
                          <Check className={`w-3 h-3 ${r.test(form.password) ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`} />
                          <span className={r.test(form.password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="signup-confirm" type={showPw ? 'text' : 'password'} placeholder="••••••••"
                    value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                    className={`input-base pl-10 ${errors.confirm ? 'border-red-400 focus:ring-red-400' : ''}`} />
                </div>
                {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
              </div>

              <button id="signup-submit" type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : (
                  <><UserPlus className="w-4 h-4" /> Create Account</>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10" /></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white dark:bg-navy-800 text-slate-400">or sign up with</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button id="signup-google" className="btn-secondary justify-center gap-2 py-2.5"><Globe className="w-4 h-4 text-blue-400" /> Google</button>
              <button id="signup-github" className="btn-secondary justify-center gap-2 py-2.5"><Terminal className="w-4 h-4" /> GitHub</button>
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold transition-colors">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
