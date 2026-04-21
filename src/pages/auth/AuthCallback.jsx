import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { verifyCode } = useAuth()
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase places the code in the URL for PKCE flows
      const code = searchParams.get('code')
      if (code) {
        try {
          await verifyCode(code)
          navigate('/home', { replace: true })
        } catch (err) {
          console.error('Code verification failed:', err)
          setError(err.message)
          // If expired or invalid, send them to confirm-pending to resend
          setTimeout(() => navigate('/auth/confirm-pending', { replace: true }), 3000)
        }
      } else {
        // No code? typically happens if supabase handled it via fragment matching implicitly
        navigate('/home', { replace: true })
      }
    }

    handleCallback()
  }, [searchParams, navigate, verifyCode])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A]">
      <div className="text-center">
        {error ? (
          <>
            <p className="text-red-500 font-semibold mb-2">Error verifying email</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Redirecting...</p>
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-500 mb-4" />
            <p className="text-slate-600 dark:text-slate-300">Verifying session...</p>
          </>
        )}
      </div>
    </div>
  )
}
