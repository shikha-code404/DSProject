import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, ChevronUp, ChevronDown, CheckCircle, Circle, ExternalLink, PlayCircle } from 'lucide-react'
import { DifficultyBadge } from './ui/Badge'
import clsx from 'clsx'

export default function SubtopicsTable({ topics = [], onComplete }) {
  const [search, setSearch]     = useState('')
  const [sortKey, setSortKey]   = useState('order')
  const [sortDir, setSortDir]   = useState('asc')
  const [filter, setFilter]     = useState('all')

  const filtered = useMemo(() => {
    let list = [...topics]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
      )
    }

    if (filter !== 'all') {
      list = list.filter(t =>
        filter === 'completed' ? t.completed : !t.completed
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

  function SortIcon({ col }) {
    if (sortKey !== col) return <ChevronUp className="w-3.5 h-3.5 opacity-30" />
    return sortDir === 'asc'
      ? <ChevronUp   className="w-3.5 h-3.5 text-primary-500" />
      : <ChevronDown className="w-3.5 h-3.5 text-primary-500" />
  }

  const Th = ({ col, label, className }) => (
    <th
      className={clsx(
        'px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-primary-500 transition-colors',
        className,
      )}
      onClick={() => toggleSort(col)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <SortIcon col={col} />
      </span>
    </th>
  )

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all',
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 dark:bg-navy-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-600',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-navy-900/60 border-b border-slate-200 dark:border-white/10">
            <tr>
              <Th col="order"      label="#"          className="w-12" />
              <Th col="title"      label="Topic" />
              <Th col="difficulty" label="Difficulty" className="hidden sm:table-cell" />
              <Th col="duration"   label="Time"       className="hidden md:table-cell" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">Done</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
                    No topics found
                  </td>
                </tr>
              ) : filtered.map((topic, idx) => (
                <motion.tr
                  key={topic.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{    opacity: 0, y: -6 }}
                  transition={{ delay: idx * 0.03 }}
                  className={clsx(
                    'border-b border-slate-100 dark:border-white/5 last:border-0',
                    'hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors',
                    topic.completed && 'opacity-70',
                  )}
                >
                  <td className="px-4 py-3 text-slate-400 dark:text-slate-500 font-mono text-xs">{topic.order ?? idx + 1}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className={clsx('font-medium', topic.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white')}>
                        {topic.title}
                      </p>
                      {topic.description && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">{topic.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <DifficultyBadge level={topic.difficulty ?? 'beginner'} />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500 dark:text-slate-400 text-xs">
                    {topic.duration ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onComplete?.(topic.id)}
                      className="transition-transform hover:scale-110 active:scale-95"
                      aria-label={topic.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {topic.completed
                        ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                        : <Circle      className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {topic.link && (
                      topic.link.startsWith('/') ? (
                        <Link
                          to={topic.link}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-400 transition-colors"
                          title="Open Module"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Start</span>
                        </Link>
                      ) : (
                        <a href={topic.link} target="_blank" rel="noopener noreferrer"
                           className="text-slate-400 hover:text-primary-500 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
        Showing {filtered.length} of {topics.length} topics
      </p>
    </div>
  )
}
