import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BookOpen, Zap, Trophy, Star, Clock, Flame,
  ChevronRight, Target, Cpu, GitBranch, Search,
} from 'lucide-react'
import Layout from '../components/layout/Layout'
import LearningBlock from '../components/LearningBlock'
import { useAuth } from '../contexts/AuthContext'

const STATS = [
  { icon: Clock,  label: 'Hours Learned', value: '24h', color: 'text-blue-500' },
  { icon: Flame,  label: 'Day Streak',    value: '7',   color: 'text-orange-500' },
  { icon: Trophy, label: 'Achievements',  value: '5',   color: 'text-yellow-500' },
  { icon: Star,   label: 'Points',        value: '840', color: 'text-purple-500' },
]

const LEARNING_BLOCKS = [
  {
    title: 'Prerequisite',
    description: 'Set up your environment, learn C++ basics, and get ready to write real algorithms.',
    icon: BookOpen,
    color: 'blue',
    difficulty: 'beginner',
    lessons: 12,
    progress: 60,
    to: '/prerequisite',
    tag: 'Start Here',
  },
  {
    title: 'Beginner Path',
    description: 'Arrays, strings, recursion, and searching. Build the foundation of algorithmic thinking.',
    icon: Zap,
    color: 'green',
    difficulty: 'beginner',
    lessons: 24,
    progress: 20,
    to: '/beginner',
  },
  {
    title: 'Intermediate Path',
    description: 'Trees, graphs, dynamic programming, and greedy algorithms for coding interviews.',
    icon: GitBranch,
    color: 'orange',
    difficulty: 'intermediate',
    lessons: 36,
    progress: 0,
    to: '/intermediate',
    locked: false,
  },
  {
    title: 'Advanced Path',
    description: 'Segment trees, tries, advanced DP, competitive programming patterns.',
    icon: Cpu,
    color: 'purple',
    difficulty: 'advanced',
    lessons: 48,
    progress: 0,
    to: '/advanced',
    locked: false,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <Layout fullWidth>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="page-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-6">
              <Target className="w-3.5 h-3.5" /> Master DSA in 90 Days
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black font-head leading-tight mb-6"
          >
            <span className="text-slate-900 dark:text-white">Master </span>
            <span className="text-gradient-primary">DSA</span>
            <span className="text-slate-900 dark:text-white"> from </span>
            <br />
            <span className="text-slate-900 dark:text-white">Zero to </span>
            <span className="text-gradient-primary">Advanced</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Structured learning paths, interactive problems, and real-time progress tracking.
            Go from a complete beginner to a competitive programmer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/prerequisite" id="hero-start-btn" className="btn-primary text-base px-7 py-3.5">
              Start Learning Free <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/beginner" id="hero-explore-btn" className="btn-secondary text-base px-7 py-3.5">
              <Search className="w-4 h-4" /> Explore Paths
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      {user && (
        <section className="page-container mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="card-glass rounded-2xl p-5 flex items-center gap-4">
                <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-navy-700 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-head text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ─── LEARNING PATHS GRID ─── */}
      <section className="page-container pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-heading">Upcurve Hub</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Your structured learning roadmap</p>
          </div>
          {user && (
            <Link to="/profile" className="btn-ghost text-sm">
              View Progress <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {LEARNING_BLOCKS.map(block => (
            <motion.div key={block.title} variants={item}>
              <LearningBlock {...block} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </Layout>
  )
}
