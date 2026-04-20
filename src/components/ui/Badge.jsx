import clsx from 'clsx'

const difficultyMap = {
  beginner:     { label: 'Beginner',     color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400', dot: '🟢' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',  dot: '🟡' },
  advanced:     { label: 'Advanced',     color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',              dot: '🔴' },
  prerequisite: { label: 'Prerequisite', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',          dot: '🔵' },
}

const typeMap = {
  new:        { label: 'New',        color: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400' },
  popular:    { label: 'Popular',    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400' },
  hot:        { label: '🔥 Hot',     color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' },
  completed:  { label: '✓ Done',     color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' },
}

export function DifficultyBadge({ level = 'beginner', className = '' }) {
  const info = difficultyMap[level] ?? difficultyMap.beginner
  return (
    <span className={clsx('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold', info.color, className)}>
      <span className="text-[10px]">{info.dot}</span>
      {info.label}
    </span>
  )
}

export function TypeBadge({ type = 'new', label, className = '' }) {
  const info = typeMap[type] ?? typeMap.new
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', info.color, className)}>
      {label ?? info.label}
    </span>
  )
}

export default DifficultyBadge
