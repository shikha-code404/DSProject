import { Link } from 'react-router-dom'
import { Code2, Heart, ExternalLink, AtSign, Briefcase } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-900/80">
      <div className="page-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
              <div className="p-1.5 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold font-head text-lg text-slate-900 dark:text-white">
                Code<span className="text-gradient-primary">Life</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Your comprehensive DSA learning hub. Master algorithms and data structures from zero to advanced.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { icon: ExternalLink, href: '#', label: 'GitHub' },
                { icon: AtSign,       href: '#', label: 'Twitter' },
                { icon: Briefcase,    href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                   className="p-2 rounded-xl bg-slate-200 dark:bg-navy-700 text-slate-500 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Learning Paths</h4>
            <ul className="space-y-2">
              {[
                { to: '/prerequisite',  label: 'Prerequisites' },
                { to: '/beginner',      label: 'Beginner Path' },
                { to: '/intermediate',  label: 'Intermediate' },
                { to: '/advanced',      label: 'Advanced Path' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Account</h4>
            <ul className="space-y-2">
              {[
                { to: '/login',   label: 'Sign In' },
                { to: '/signup',  label: 'Create Account' },
                { to: '/profile', label: 'Profile' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} CodeLife. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for learners worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
