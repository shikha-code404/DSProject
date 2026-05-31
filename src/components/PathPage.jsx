import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Clock, Lock, CheckCircle, PlayCircle, ArrowRight } from 'lucide-react'
import Layout from '../components/layout/Layout'
import ProgressBar from '../components/ui/ProgressBar'
import { DifficultyBadge } from '../components/ui/Badge'
import clsx from 'clsx'

/* ── Difficulty colour map ── */
const DIFF_META = {
  beginner:     { bar: 'bg-gradient-to-r from-emerald-400 to-green-500',  ring: 'ring-emerald-500/20', glow: 'hover:shadow-emerald-500/20' },
  intermediate: { bar: 'bg-gradient-to-r from-amber-400 to-orange-500',   ring: 'ring-amber-500/20',   glow: 'hover:shadow-amber-500/20'   },
  advanced:     { bar: 'bg-gradient-to-r from-red-400 to-rose-600',        ring: 'ring-red-500/20',     glow: 'hover:shadow-red-500/20'     },
}
function diffMeta(level) { return DIFF_META[level?.toLowerCase()] ?? DIFF_META.beginner }

/* ── Card variants ── */
const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.4, ease: 'easeOut' } },
}
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05 } },
}

function LessonCard({ lesson, index, onToggle, onLockedClick }) {
  const navigate = useNavigate()
  const { bar, ring, glow } = diffMeta(lesson.difficulty)
  const done   = lesson.completed
  const locked = lesson.locked

  return (
    <motion.div
      variants={cardVariant}
      onClick={() => {
        if (locked) {
          if (onLockedClick) onLockedClick()
        } else if (lesson.link) {
          navigate(lesson.link)
        }
      }}
      className={clsx(
        'group relative flex flex-col rounded-2xl overflow-hidden',
        'border border-slate-200 dark:border-white/8',
        'bg-white dark:bg-navy-800/80 backdrop-blur-sm',
        `ring-1 ${ring}`,
        'hover:shadow-xl hover:-translate-y-1',
        glow,
        'transition-all duration-300',
        locked  && 'opacity-55 cursor-not-allowed',
        done    && 'opacity-65',
        !locked && lesson.link && 'cursor-pointer',
      )}
    >
      {/* Coloured top stripe */}
      <div className={clsx('h-1 w-full flex-shrink-0', bar)} />

      {/* Lesson number badge (top-left) */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full
                         bg-slate-100 dark:bg-navy-700 text-slate-500 dark:text-slate-400
                         text-xs font-bold font-mono border border-slate-200 dark:border-white/10">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Status icon (top-right) */}
      <div className="absolute top-3 right-3 z-10">
        {locked
          ? <Lock        className="w-4 h-4 text-slate-400" />
          : done
          ? <CheckCircle className="w-5 h-5 text-emerald-400 drop-shadow" />
          : null
        }
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 pt-10">
        {/* Title */}
        <h3 className={clsx(
          'font-bold text-sm leading-snug mb-1.5 pr-4',
          done
            ? 'line-through text-slate-400 dark:text-slate-500'
            : 'text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
        )}>
          {lesson.title}
        </h3>

        {/* Description */}
        {lesson.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            {lesson.description}
          </p>
        )}

        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-3
                        border-t border-slate-100 dark:border-white/6">
          {/* Left: difficulty + time */}
          <div className="flex items-center gap-2 flex-wrap">
            <DifficultyBadge level={lesson.difficulty} />
            {lesson.duration && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </span>
            )}
          </div>

          {/* Right: toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (locked) {
                if (onLockedClick) onLockedClick()
              } else {
                onToggle(lesson.id)
              }
            }}
            aria-label={done ? 'Mark incomplete' : 'Mark complete'}
            id={`toggle-lesson-${lesson.id}`}
            className={clsx(
              'shrink-0 transition-transform focus:outline-none',
              !locked && 'hover:scale-110 active:scale-95',
            )}
          >
            {locked
              ? <Lock        className="w-5 h-5 text-slate-400" />
              : done
              ? <CheckCircle className="w-5 h-5 text-emerald-500" />
              : <PlayCircle  className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors" />
            }
          </button>
        </div>
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
  onLockedClick
}) {
  const [lessons, setLessons] = useState(initialLessons)
  const completed  = lessons.filter(l => l.completed).length
  const pct        = lessons.length ? Math.round((completed / lessons.length) * 100) : 0

  const colorMap = {
    blue:   { gradient: 'from-blue-600/20 to-primary-600/5',   bar: 'primary' },
    green:  { gradient: 'from-emerald-600/20 to-teal-600/5',   bar: 'emerald' },
    orange: { gradient: 'from-orange-600/20 to-amber-600/5',   bar: 'orange'  },
    purple: { gradient: 'from-violet-600/20 to-purple-600/5',  bar: 'violet'  },
  }
  const c = colorMap[color] ?? colorMap.blue

  function toggleLesson(id) {
    setLessons(ls => ls.map(l => l.id === id ? { ...l, completed: !l.completed } : l))
  }

  const hasChapters = useMemo(() => lessons.some(l => l.chapter), [lessons])

  const groupedLessons = useMemo(() => {
    if (!hasChapters) return null
    return lessons.reduce((groups, lesson) => {
      const groupName = lesson.chapter || 'Other'
      if (!groups[groupName]) {
        groups[groupName] = []
      }
      groups[groupName].push(lesson)
      return groups
    }, {})
  }, [lessons, hasChapters])

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

      {/* Lesson card grid */}
      <div className="card-glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Lessons</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {completed} / {lessons.length} completed
          </span>
        </div>

        {lessons.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-10">
            Content coming soon…
          </p>
        ) : hasChapters ? (
          <div className="space-y-10">
            {Object.entries(groupedLessons).map(([chapterName, chapterLessons], groupIdx) => (
              <div key={chapterName} className="space-y-5">
                <div className="flex items-center gap-3 pb-2.5 border-b border-slate-200 dark:border-white/15">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-black font-mono">
                    {String(groupIdx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-black text-slate-800 dark:text-white font-head tracking-tight">
                    {chapterName}
                  </h3>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-auto bg-slate-100 dark:bg-navy-700/50 px-2.5 py-1 rounded-lg">
                    {chapterLessons.filter(l => l.completed).length} / {chapterLessons.length} completed
                  </span>
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {chapterLessons.map((lesson) => {
                    const globalIdx = lessons.findIndex(l => l.id === lesson.id)
                    return (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        index={globalIdx}
                        onToggle={toggleLesson}
                        onLockedClick={onLockedClick}
                      />
                    )
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {lessons.map((lesson, idx) => (
              <LessonCard key={lesson.id} lesson={lesson} index={idx} onToggle={toggleLesson} onLockedClick={onLockedClick} />
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
