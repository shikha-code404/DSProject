import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProgressBar from './ui/ProgressBar'
import { DifficultyBadge } from './ui/Badge'
import clsx from 'clsx'

const gradients = {
  blue:   'from-blue-600/20 via-primary-600/10 to-transparent',
  green:  'from-emerald-600/20 via-teal-600/10 to-transparent',
  orange: 'from-orange-600/20 via-amber-600/10 to-transparent',
  purple: 'from-violet-600/20 via-purple-600/10 to-transparent',
}

const borderColors = {
  blue:   'border-blue-500/30 hover:border-blue-400/60',
  green:  'border-emerald-500/30 hover:border-emerald-400/60',
  orange: 'border-orange-500/30 hover:border-orange-400/60',
  purple: 'border-violet-500/30 hover:border-violet-400/60',
}

const iconColors = {
  blue:   'bg-blue-500/20 text-blue-400',
  green:  'bg-emerald-500/20 text-emerald-400',
  orange: 'bg-orange-500/20 text-orange-400',
  purple: 'bg-violet-500/20 text-violet-400',
}

const progressColors = {
  blue:   'primary',
  green:  'emerald',
  orange: 'orange',
  purple: 'violet',
}

const glowShadows = {
  blue:   'hover:shadow-glow-primary',
  green:  'hover:shadow-glow-emerald',
  orange: 'hover:shadow-glow-orange',
  purple: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]',
}

export default function LearningBlock({
  title,
  description,
  icon: Icon,
  color = 'blue',
  difficulty = 'beginner',
  lessons = 0,
  progress = 0,
  to = '/',
  locked = false,
  tag,
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={clsx(
        'group relative rounded-2xl border p-6 cursor-pointer overflow-hidden',
        'bg-white dark:bg-navy-800',
        'shadow-card transition-shadow duration-300',
        borderColors[color],
        glowShadows[color],
      )}
    >
      {/* Background gradient */}
      <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-50', gradients[color])} />

      {/* Locked overlay */}
      {locked && (
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 rounded-2xl z-10 flex items-center justify-center backdrop-blur-[2px]">
          <div className="text-center">
            <Lock className="w-8 h-8 text-white/80 mx-auto mb-2" />
            <p className="text-white/80 text-sm font-medium">Complete prerequisites first</p>
          </div>
        </div>
      )}

      <div className="relative z-[1]">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className={clsx('p-3 rounded-xl', iconColors[color])}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <DifficultyBadge level={difficulty} />
            {tag && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400">
                {tag}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold font-head text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span>{lessons} Lessons</span>
          <span className="font-semibold text-primary-500">{progress}% done</span>
        </div>

        <ProgressBar value={progress} color={progressColors[color]} animated={false} />

        {/* CTA */}
        <Link
          to={to}
          className={clsx(
            'mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200',
            `text-${color === 'blue' ? 'primary' : color === 'green' ? 'emerald' : color === 'orange' ? 'orange' : 'violet'}-500`,
            'group-hover:gap-2.5',
          )}
        >
          {progress === 0 ? 'Start Learning' : 'Continue'}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  )
}
