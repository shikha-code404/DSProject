import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  User, Mail, Calendar, Trophy, Flame, Clock, Star,
  BookOpen, Zap, GitBranch, Cpu, Edit3, LogOut,
} from 'lucide-react'
import Layout from '../components/layout/Layout'
import ProgressBar from '../components/ui/ProgressBar'
import { useAuth }  from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'

const ACHIEVEMENTS = [
  { icon: '🚀', label: 'First Lesson',   desc: 'Completed your very first lesson',     earned: true },
  { icon: '🔥', label: '7-Day Streak',   desc: 'Maintained a 7-day learning streak',   earned: true },
  { icon: '⚡', label: 'Speed Coder',    desc: 'Solved 5 problems in under 5 minutes', earned: true },
  { icon: '🧩', label: 'Problem Solver', desc: 'Solved 50 problems total',              earned: false },
  { icon: '🏆', label: 'Intermediate',   desc: 'Completed Intermediate Path',           earned: false },
  { icon: '💎', label: 'Code Master',    desc: 'Completed all learning paths',          earned: false },
]

const PATHS = [
  { label: 'Prerequisite',  to: '/prerequisite', color: 'primary', completed: 6,  total: 12, icon: BookOpen },
  { label: 'Beginner',      to: '/beginner',     color: 'emerald', completed: 4,  total: 18, icon: Zap },
  { label: 'Intermediate',  to: '/intermediate', color: 'orange',  completed: 0,  total: 18, icon: GitBranch },
  { label: 'Advanced',      to: '/advanced',     color: 'violet',  completed: 0,  total: 18, icon: Cpu },
]

const colorBarMap = { primary: 'primary', emerald: 'emerald', orange: 'orange', violet: 'violet' }

export default function Profile() {
  const { user, logout } = useAuth()
  const { addToast }     = useToast()
  const navigate         = useNavigate()

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24 gap-5">
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-navy-700 flex items-center justify-center">
            <User className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Sign in to view your profile</h2>
          <div className="flex gap-3">
            <Link to="/login"  className="btn-primary">Sign In</Link>
            <Link to="/signup" className="btn-secondary">Create Account</Link>
          </div>
        </div>
      </Layout>
    )
  }

  const totalCompleted = PATHS.reduce((s, p) => s + p.completed, 0)
  const totalLessons   = PATHS.reduce((s, p) => s + p.total, 0)
  const overallPct     = Math.round((totalCompleted / totalLessons) * 100)

  function handleLogout() {
    logout()
    addToast({ type: 'info', title: 'Signed out', message: 'See you next time! 👋' })
    navigate('/')
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center text-white text-3xl font-black shadow-glow-primary">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-white dark:bg-navy-700 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-primary-500 transition-colors">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-black font-head text-slate-900 dark:text-white">{user.name}</h1>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{user.email}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Joined April 2026</span>
              </div>
            </div>

            <button
              id="profile-logout-btn"
              onClick={handleLogout}
              className="btn-secondary text-sm text-red-500 flex-shrink-0"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { icon: Clock,   color: 'text-blue-500',   label: 'Hours Learned', value: '24h' },
            { icon: Flame,   color: 'text-orange-500', label: 'Day Streak',    value: '7' },
            { icon: Trophy,  color: 'text-yellow-500', label: 'Achievements',  value: `${ACHIEVEMENTS.filter(a=>a.earned).length}/${ACHIEVEMENTS.length}` },
            { icon: Star,    color: 'text-purple-500', label: 'Total Points',  value: '840' },
          ].map(({ icon: Icon, color, label, value }) => (
            <div key={label} className="card-glass rounded-2xl p-4 text-center">
              <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
              <p className="text-xl font-bold font-head text-slate-900 dark:text-white">{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learning Progress */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Learning Progress</h2>
              <span className="text-2xl font-black text-primary-500">{overallPct}%</span>
            </div>

            <div className="space-y-4">
              {PATHS.map(({ label, to, color, completed, total, icon: Icon }) => (
                <Link key={label} to={to} className="group block">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary-500 transition-colors">{label}</span>
                    </div>
                    <span className="text-xs text-slate-400">{completed}/{total}</span>
                  </div>
                  <ProgressBar value={completed} max={total} color={colorBarMap[color]} height="h-1.5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Achievements</h2>
            <div className="grid grid-cols-3 gap-3">
              {ACHIEVEMENTS.map(({ icon, label, desc, earned }) => (
                <div
                  key={label}
                  className={`group relative flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                    earned
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                      : 'bg-slate-50 dark:bg-navy-700/40 border-slate-200 dark:border-white/5 opacity-40 grayscale'
                  }`}
                  title={desc}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
