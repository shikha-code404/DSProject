import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search, CheckCircle, Circle, ExternalLink, PlayCircle,
  Clock, ChevronUp, ChevronDown,
} from 'lucide-react'
import { DifficultyBadge } from './ui/Badge'
import clsx from 'clsx'

/* ── Difficulty colour helpers ── */
const DIFF_META = {
  beginner:     { glow: 'shadow-emerald-500/20', bar: 'bg-gradient-to-r from-emerald-400 to-green-500',  ring: 'ring-emerald-500/20' },
  intermediate: { glow: 'shadow-amber-500/20',   bar: 'bg-gradient-to-r from-amber-400 to-orange-500',  ring: 'ring-amber-500/20'   },
  advanced:     { glow: 'shadow-red-500/20',      bar: 'bg-gradient-to-r from-red-400 to-rose-600',      ring: 'ring-red-500/20'     },
}
function diffMeta(level) { return DIFF_META[level?.toLowerCase()] ?? DIFF_META.beginner }

/* ── Animated card ── */
function TopicCard({ topic, idx, onComplete }) {
  const { glow, bar, ring } = diffMeta(topic.difficulty)
  const done = topic.completed

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.38, delay: idx * 0.04, ease: 'easeOut' }}
      className={clsx(
        'group relative flex flex-col rounded-2xl overflow-hidden',
        'border border-slate-200 dark:border-white/8',
        'bg-white dark:bg-navy-800/80 backdrop-blur-sm',
        `ring-1 ${ring}`,
        'hover:shadow-xl hover:-translate-y-1',
        `hover:${glow}`,
        'transition-all duration-300',
        done && 'opacity-60',
      )}
    >
      {/* Coloured top stripe */}
      <div className={clsx('h-1 w-full flex-shrink-0', bar)} />

      {/* Completion overlay tick */}
      {done && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle className="w-5 h-5 text-emerald-400 drop-shadow" />
        </div>
      )}

      {/* Order number badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full
                         bg-slate-100 dark:bg-navy-700 text-slate-500 dark:text-slate-400
                         text-xs font-bold font-mono border border-slate-200 dark:border-white/10">
          {topic.order ?? idx + 1}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 pt-10">
        {/* Title */}
        <h3 className={clsx(
          'font-bold text-sm leading-snug mb-1 pr-6',
          done
            ? 'line-through text-slate-400 dark:text-slate-500'
            : 'text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
        )}>
          {topic.title}
        </h3>

        {/* Description */}
        {topic.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            {topic.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-3
                        border-t border-slate-100 dark:border-white/6">
          {/* Left: difficulty + time */}
          <div className="flex items-center gap-2 flex-wrap">
            <DifficultyBadge level={topic.difficulty ?? 'beginner'} />
            {topic.duration && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Clock className="w-3 h-3" />
                {topic.duration}
              </span>
            )}
          </div>

          {/* Right: complete toggle + link */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {topic.link && (
              topic.link.startsWith('/') ? (
                <Link
                  to={topic.link}
                  id={`start-topic-${topic.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold
                             text-primary-500 hover:text-primary-400 transition-colors"
                  title="Start module"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start</span>
                </Link>
              ) : (
                <a
                  href={topic.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-500 transition-colors"
                  title="Open resource"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )
            )}

            <button
              onClick={() => onComplete?.(topic.id)}
              className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
              aria-label={done ? 'Mark incomplete' : 'Mark complete'}
              id={`toggle-topic-${topic.id}`}
            >
              {done
                ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                : <Circle      className="w-5 h-5 text-slate-300 dark:text-slate-600" />
              }
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Sort header button ── */
function SortBtn({ col, label, sortKey, sortDir, toggleSort }) {
  const active = sortKey === col
  return (
    <button
      onClick={() => toggleSort(col)}
      className={clsx(
        'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all',
        active
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-700',
      )}
    >
      {label}
      {active
        ? (sortDir === 'asc'
            ? <ChevronUp   className="w-3 h-3" />
            : <ChevronDown className="w-3 h-3" />)
        : <ChevronUp className="w-3 h-3 opacity-30" />
      }
    </button>
  )
}

/* ── Main export ── */
export default function SubtopicsTable({ topics = [], onComplete }) {
  const [search,  setSearch]  = useState('')
  const [sortKey, setSortKey] = useState('order')
  const [sortDir, setSortDir] = useState('asc')
  const [filter,  setFilter]  = useState('all')

  const filtered = useMemo(() => {
    let list = [...topics]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q),
      )
    }

    if (filter !== 'all') {
      list = list.filter(t =>
        filter === 'completed' ? t.completed : !t.completed,
      )
    }

    list.sort((a, b) => {
      let va = a[sortKey] ?? ''
      let vb = b[sortKey] ?? ''
      if (typeof va === 'string') va = va.toLowerCase()
      if (typeof vb === 'string') vb = vb.toLowerCase()
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ?  1 : -1
      return 0
    })

    return list
  }, [topics, search, sortKey, sortDir, filter])

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  return (
    <div className="w-full">
      {/* ── Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="subtopics-search"
            type="text"
            placeholder="Search topics…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-base pl-10"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all',
                filter === f
                  ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/30'
                  : 'bg-slate-100 dark:bg-navy-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-600',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sort buttons ── */}
      <div className="flex items-center gap-1 mb-4 flex-wrap">
        <span className="text-xs text-slate-400 dark:text-slate-500 mr-1">Sort:</span>
        {[
          { col: 'order',      label: 'Order'      },
          { col: 'title',      label: 'Title'      },
          { col: 'difficulty', label: 'Difficulty' },
          { col: 'duration',   label: 'Time'       },
        ].map(s => (
          <SortBtn key={s.col} {...s} sortKey={sortKey} sortDir={sortDir} toggleSort={toggleSort} />
        ))}
      </div>

      {/* ── Card grid ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center text-slate-400 dark:text-slate-500 text-sm"
          >
            No topics found
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((topic, idx) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                idx={idx}
                onComplete={onComplete}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer count ── */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
        Showing {filtered.length} of {topics.length} topics
      </p>
    </div>
  )
}
