import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen, Zap, GitBranch, Cpu,
  ChevronRight, Lock, Clock, BarChart2,
} from 'lucide-react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../contexts/AuthContext'

/* ─── Module definitions ─── */
const MODULES = [
  {
    id: 'prerequisite',
    title: 'Prerequisite',
    subtitle: 'Foundation Essentials',
    description: 'Set up your environment, learn C++ basics, and get ready to write real algorithms.',
    icon: BookOpen,
    to: '/prerequisite',
    lessons: 8,
    duration: '3–4 hrs',
    difficulty: 'Beginner',
    diffColor: 'text-emerald-400',
    progress: 60,
    gradient: 'from-blue-600 to-cyan-500',
    glow: 'shadow-blue-500/25',
    ring: 'ring-blue-500/20',
    tag: 'Start Here',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    topics: ['MinGW Setup', 'C++ Basics', 'Control Flow', 'Pointers'],
    locked: false,
  },
  {
    id: 'beginner',
    title: 'Beginner',
    subtitle: 'Basic DSA',
    description: 'Arrays, strings, recursion, and searching. Build the foundation of algorithmic thinking.',
    icon: Zap,
    to: '/beginner',
    lessons: 24,
    duration: '10–12 hrs',
    difficulty: 'Easy',
    diffColor: 'text-emerald-400',
    progress: 20,
    gradient: 'from-emerald-500 to-green-400',
    glow: 'shadow-emerald-500/25',
    ring: 'ring-emerald-500/20',
    topics: ['Arrays', 'Strings', 'Recursion', 'Binary Search'],
    locked: false,
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: 'Complex DSA',
    description: 'Trees, graphs, dynamic programming, and greedy algorithms for coding interviews.',
    icon: GitBranch,
    to: '/intermediate',
    lessons: 36,
    duration: '18–22 hrs',
    difficulty: 'Medium',
    diffColor: 'text-amber-400',
    progress: 0,
    gradient: 'from-orange-500 to-amber-400',
    glow: 'shadow-orange-500/25',
    ring: 'ring-orange-500/20',
    topics: ['Trees', 'Graphs', 'DP', 'Greedy'],
    locked: false,
  },
  {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'Expert Level',
    description: 'Segment trees, tries, advanced DP, and competitive programming patterns.',
    icon: Cpu,
    to: '/advanced',
    lessons: 48,
    duration: '30+ hrs',
    difficulty: 'Hard',
    diffColor: 'text-red-400',
    progress: 0,
    gradient: 'from-purple-600 to-violet-500',
    glow: 'shadow-purple-500/25',
    ring: 'ring-purple-500/20',
    topics: ['Segment Trees', 'Tries', 'Advanced DP', 'Bit Tricks'],
    locked: false,
  },
]

/* ─── Variants ─── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

/* ─── Module Card ─── */
function ModuleCard({ module }) {
  const { title, subtitle, description, icon: Icon, to, lessons, duration,
          difficulty, diffColor, progress, gradient, glow, ring,
          tag, tagColor, topics, locked } = module

  return (
    <motion.div variants={cardVariant} className="h-full">
      <Link
        to={locked ? '#' : to}
        id={`module-card-${module.id}`}
        className={`group relative flex flex-col h-full rounded-2xl overflow-hidden
                    border border-white/8 dark:border-white/6
                    bg-white dark:bg-navy-800/80 backdrop-blur-sm
                    ring-1 ${ring}
                    hover:shadow-2xl hover:${glow} hover:scale-[1.025] hover:-translate-y-1
                    transition-all duration-350 ${locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        {/* Gradient top bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${gradient} flex-shrink-0`} />

        {/* Header */}
        <div className={`relative p-6 pb-4 bg-gradient-to-br ${gradient} flex-shrink-0`}
          style={{ background: undefined }}>
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 dark:opacity-20`} />

          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            {locked ? (
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                <Lock className="w-3 h-3" /> Locked
              </span>
            ) : tag ? (
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${tagColor}`}>{tag}</span>
            ) : null}
          </div>

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-0.5">{subtitle}</p>
            <h3 className="text-xl font-black font-head text-slate-900 dark:text-white">{title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6 pt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{description}</p>

          {/* Topics chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {topics.map(t => (
              <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-lg
                                      bg-slate-100 dark:bg-navy-700 text-slate-600 dark:text-slate-300
                                      border border-slate-200 dark:border-white/5">
                {t}
              </span>
            ))}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {lessons} lessons</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {duration}</span>
            <span className={`flex items-center gap-1 font-semibold ${diffColor}`}>
              <BarChart2 className="w-3.5 h-3.5" /> {difficulty}
            </span>
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Progress</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-navy-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto">
            <span className={`inline-flex items-center gap-2 w-full justify-center px-5 py-2.5 rounded-xl
                             font-semibold text-sm text-white
                             bg-gradient-to-r ${gradient}
                             shadow-md hover:opacity-90 active:scale-95
                             transition-all duration-300`}>
              {progress > 0 ? 'Continue Learning' : 'Explore'} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Page ─── */
export default function ModulesPage() {
  const { user } = useAuth()
  const navigate  = useNavigate()

  return (
    <Layout fullWidth>
      {/* ─── Hero strip ─── */}
      <section className="relative overflow-hidden py-16 md:py-20">
        {/* Blobs */}
        <div className="absolute top-0 left-1/4  w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/8  rounded-full blur-3xl pointer-events-none" />

        <div className="page-container relative z-10">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                             bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300
                             border border-violet-200 dark:border-violet-700 mb-4">
              📚 Upcurve Learning Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
            className="text-4xl sm:text-5xl font-black font-head leading-tight mb-4
                       text-slate-900 dark:text-white">
            {user ? `Welcome back, ${user.name.split(' ')[0]}! 👋` : 'Choose Your Path'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            {user
              ? 'Pick up where you left off, or dive into a new module.'
              : 'Start from the beginning or jump into a specific path. No prerequisites needed to explore.'}
          </motion.p>

          {!user && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mt-6 flex gap-3">
              <Link to="/signup" id="modules-signup-cta" className="btn-primary">
                Create Free Account <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/login" id="modules-login-link" className="btn-secondary">Sign In</Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Module Grid ─── */}
      <section className="page-container pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {MODULES.map(mod => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </motion.div>

        {/* Journey hint */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mt-12 rounded-2xl border border-slate-200 dark:border-white/8
                     bg-white dark:bg-navy-800/60 p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white mb-1">Pro Tip: Follow the sequence</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We recommend starting with <strong>Prerequisite</strong> → <strong>Beginner</strong> → <strong>Intermediate</strong> → <strong>Advanced</strong>
              for the best learning experience. Each path builds on the previous one.
            </p>
          </div>
          <Link to="/prerequisite" id="journey-start-link"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
                       bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300
                       hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors">
            Start Here <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </Layout>
  )
}
