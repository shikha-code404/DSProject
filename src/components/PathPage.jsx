import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Clock, Lock, CheckCircle, PlayCircle, ArrowRight } from 'lucide-react'
import Layout from '../components/layout/Layout'
import ProgressBar from '../components/ui/ProgressBar'
import { DifficultyBadge } from '../components/ui/Badge'
import clsx from 'clsx'

function LessonCard({ lesson, index, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={clsx(
        'group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
        lesson.completed
          ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/60 dark:border-emerald-800/30'
          : 'bg-white dark:bg-navy-800 border-slate-200 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-700',
        lesson.locked && 'opacity-60',
      )}
    >
      <button
        onClick={() => !lesson.locked && onToggle(lesson.id)}
        className={clsx('shrink-0 transition-transform', !lesson.locked && 'hover:scale-110')}
        disabled={lesson.locked}
        aria-label={lesson.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {lesson.locked
          ? <Lock className="w-5 h-5 text-slate-400" />
          : lesson.completed
          ? <CheckCircle className="w-5 h-5 text-emerald-500" />
          : <PlayCircle  className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500" />
        }
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-mono text-slate-400">{String(index + 1).padStart(2, '0')}</span>
          <h3 className={clsx(
            'font-semibold text-sm truncate',
            lesson.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white',
          )}>
            {lesson.title}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{lesson.description}</p>
      </div>

      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <DifficultyBadge level={lesson.difficulty} />
        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" /> {lesson.duration}
        </span>
      </div>
    </motion.div>
  )
}

export default function PathPage({
  title,
  subtitle,
  icon: Icon,
  color = 'blue',
  difficulty = 'beginner',
  lessons: initialLessons = [],
  prerequisiteText,
}) {
  const [lessons, setLessons] = useState(initialLessons)
  const completed  = lessons.filter(l => l.completed).length
  const pct        = lessons.length ? Math.round((completed / lessons.length) * 100) : 0

  const colorMap = {
    blue:   { gradient: 'from-blue-600/20 to-primary-600/5', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', bar: 'primary' },
    green:  { gradient: 'from-emerald-600/20 to-teal-600/5', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', bar: 'emerald' },
    orange: { gradient: 'from-orange-600/20 to-amber-600/5', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', bar: 'orange' },
    purple: { gradient: 'from-violet-600/20 to-purple-600/5', badge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400', bar: 'violet' },
  }
  const c = colorMap[color] ?? colorMap.blue

  function toggleLesson(id) {
    setLessons(ls => ls.map(l => l.id === id ? { ...l, completed: !l.completed } : l))
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-primary-500 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium">{title}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx('rounded-2xl p-6 mb-8 bg-gradient-to-br', c.gradient, 'border border-slate-200 dark:border-white/10')}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/50 dark:bg-white/10">
              <Icon className="w-8 h-8 text-slate-700 dark:text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-black font-head text-slate-900 dark:text-white">{title}</h1>
                <DifficultyBadge level={difficulty} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>
            </div>
          </div>
          <div className="min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">{completed}/{lessons.length} lessons</span>
              <span className="text-sm font-bold text-primary-500">{pct}%</span>
            </div>
            <ProgressBar value={pct} color={c.bar} />
          </div>
        </div>
      </motion.div>

      {/* Prerequisite warning */}
      {prerequisiteText && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
          <span className="text-amber-500 text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-0.5">Before you begin</p>
            <p className="text-xs text-amber-600 dark:text-amber-500">{prerequisiteText}</p>
          </div>
          <Link to="/prerequisite" className="ml-auto btn-ghost text-xs text-amber-600 shrink-0">
            Go there <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Lesson list */}
      <div className="card-glass rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Lessons</h2>
        <div className="space-y-2.5">
          {lessons.map((lesson, idx) => (
            <LessonCard key={lesson.id} lesson={lesson} index={idx} onToggle={toggleLesson} />
          ))}
          {lessons.length === 0 && (
            <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-10">
              Content coming soon…
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}
