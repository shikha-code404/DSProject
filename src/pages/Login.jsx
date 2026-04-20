import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Code2, LogIn, Globe, Terminal } from 'lucide-react'
import { useAuth }  from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import Layout from '../components/layout/Layout'

export default function Login() {
  const { login, user } = useAuth()
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
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await login(form.email, form.password)
      addToast({ type: 'success', title: 'Welcome back!', message: 'You have signed in successfully.' })
      const from = location.state?.from?.pathname || '/home'
      navigate(from, { replace: true })
    } catch (err) {
      setErrors({ global: err.message })
      addToast({ type: 'error', title: 'Sign in failed', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  function Field({ id, label, type = 'text', icon: Icon, name, placeholder, error, children }) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
        <div className="relative">
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={form[name]}
            onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
            className={`input-base pl-10 ${children ? 'pr-10' : ''} ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
          />
          {children}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    )
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="card-glass rounded-2xl p-8 shadow-card">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan shadow-glow-primary mb-4">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-head text-slate-900 dark:text-white">Welcome back</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to continue your learning journey</p>
            </div>

            {/* Try hint */}
            <div className="mb-5 px-3 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                <strong>Demo:</strong> demo@codelife.dev / demo1234
              </p>
            </div>

            {errors.global && (
              <div className="mb-4 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-400">{errors.global}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <Field id="login-email" label="Email" name="email" type="email" icon={Mail}
                     placeholder="demo@codelife.dev" error={errors.email} />

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="login-password"
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className={`input-base pl-10 pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                  />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="login-remember" checked={form.remember}
                    onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                    className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <button type="button" className="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <><LogIn className="w-4 h-4" /> Sign In</>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10" /></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white dark:bg-navy-800 text-slate-400">or continue with</span></div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button id="login-google" className="btn-secondary justify-center gap-2 py-2.5">
                <Globe className="w-4 h-4 text-blue-400" /> Google
              </button>
              <button id="login-github" className="btn-secondary justify-center gap-2 py-2.5">
                <Terminal className="w-4 h-4" /> GitHub
              </button>
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-semibold transition-colors">
                Sign up free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
