import { motion } from 'framer-motion'
import clsx from 'clsx'

const colorMap = {
  primary: 'bg-gradient-to-r from-primary-500 to-accent-cyan',
  emerald: 'bg-gradient-to-r from-accent-emerald to-teal-400',
  orange:  'bg-gradient-to-r from-accent-orange to-yellow-400',
  violet:  'bg-gradient-to-r from-accent-violet to-primary-400',
  cyan:    'bg-gradient-to-r from-accent-cyan to-blue-400',
}

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'primary',
  showLabel = false,
  height = 'h-2',
  className = '',
  animated = true,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const barColor = colorMap[color] ?? colorMap.primary

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
          <span className="text-xs font-semibold text-primary-500">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={clsx('w-full rounded-full bg-slate-200 dark:bg-navy-700 overflow-hidden', height)}>
        {animated ? (
          <motion.div
            className={clsx('h-full rounded-full', barColor)}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={clsx('h-full rounded-full', barColor)}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
    </div>
  )
}
