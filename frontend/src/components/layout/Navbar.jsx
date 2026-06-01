import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun, Moon, Menu, X, Code2, BookOpen,
  LayoutDashboard, User, LogOut, ChevronDown,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import UpcurveLogoLight from '../../assets/Upcurve_logo.png'
import UpcurveLogoDark from '../../assets/Upcurve_logo_dark.png'
import { useAuth }  from '../../contexts/AuthContext'
import clsx from 'clsx'

const NAV_LINKS = [
  { to: '/home',         label: 'Hub',          icon: LayoutDashboard },
  { to: '/prerequisite', label: 'Prerequisite', icon: BookOpen },
  { to: '/beginner',     label: 'Beginner',     icon: null },
  { to: '/intermediate', label: 'Intermediate', icon: null },
  { to: '/advanced',     label: 'Advanced',     icon: null },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout }       = useAuth()
  const navigate               = useNavigate()

  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [dropOpen,    setDropOpen]    = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleLogout() {
    logout()
    navigate('/')
    setDropOpen(false)
  }

  return (
    <header
      id="main-navbar"
      className={clsx(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'glass shadow-md'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="page-container flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group" id="navbar-logo">
          <img src={theme === 'dark' ? UpcurveLogoDark : UpcurveLogoLight} alt="Upcurve Logo" className="h-10 w-auto rounded-lg shadow-md object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {user && NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              id={`nav-${label.toLowerCase()}`}
              className={({ isActive }) =>
                clsx(
                  'btn-ghost text-base px-4 py-2 transition-all duration-200',
                  isActive && 'text-primary-500 bg-primary-50 dark:bg-primary-900/20',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.span key="sun"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun  className="w-[22px] h-[22px]" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-[22px] h-[22px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Auth area */}
          {user ? (
            <div className="relative hidden md:block">
              <button
                id="user-menu-toggle"
                onClick={() => setDropOpen(d => !d)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-base font-medium text-slate-700 dark:text-slate-200">{user.name.split(' ')[0]}</span>
                <ChevronDown className={clsx('w-4 h-4 text-slate-400 transition-transform', dropOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0,  scale: 1 }}
                    exit={{    opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 card-glass rounded-xl shadow-card-hover border border-slate-200 dark:border-white/10 py-1"
                  >
                    <Link to="/profile" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login"  id="nav-login"  className="btn-ghost text-lg px-6 py-3">Sign In</Link>
              <Link to="/signup" id="nav-signup" className="btn-primary text-lg px-7 py-3.5">Get Started</Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(m => !m)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md"
          >
            <div className="page-container py-4 flex flex-col gap-1">
              {user && NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx('px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-700',
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-white/10">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMenuOpen(false)} className="btn-secondary flex-1 justify-center text-sm">Profile</Link>
                    <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="btn-secondary flex-1 justify-center text-sm text-red-500">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login"  onClick={() => setMenuOpen(false)} className="btn-secondary flex-1 justify-center text-sm">Sign In</Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-primary flex-1 justify-center text-sm">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
