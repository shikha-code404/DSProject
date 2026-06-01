import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { useToast } from '../../components/ui/Toast'

export default function ConfirmPending() {
  const { user, isConfirmed, resendConfirmationEmail } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  
  const [cooldown, setCooldown] = useState(0)
  const [isResending, setIsResending] = useState(false)

  // Auto redirect if confirmed
  useEffect(() => {
    if (user && isConfirmed) {
      navigate('/home', { replace: true })
    }
  }, [user, isConfirmed, navigate])

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])

  const handleResend = async () => {
    if (cooldown > 0 || !user?.email) return
    
    setIsResending(true)
    try {
      await resendConfirmationEmail(user.email)
      setCooldown(60)
      addToast('success', 'Verification email sent!')
    } catch (err) {
      addToast('error', err.message || 'Failed to send email.')
    } finally {
      setIsResending(false)
    }
  }

  const emailDisplay = user?.email ? <span className="font-semibold text-slate-800 dark:text-slate-200">{user.email}</span> : "your inbox"

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] p-4 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-white/5 text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          We sent a verification link to {emailDisplay}. Please click the link to confirm your account and log in.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className={`w-full py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
              ${cooldown > 0 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                : 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-500/30'}`}
          >
            {isResending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {cooldown > 0 ? `Resend available in ${cooldown}s` : 'Resend Email'}
          </button>

          <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
        
        <div className="mt-6 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-3 rounded-lg text-left">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>If you don't see the email, check your spam folder or wait a few minutes before resending.</p>
        </div>
      </div>
    </div>
  )
}
