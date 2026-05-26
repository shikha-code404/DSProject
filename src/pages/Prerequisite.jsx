import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronRight, Download, Play, Clock, BookOpen, User,
  CheckCircle, HelpCircle, ChevronDown, Terminal, ExternalLink,
  ArrowRight, Zap,
} from 'lucide-react'
import Layout from '../components/layout/Layout'
import SubtopicsTable from '../components/SubtopicsTable'
import ProgressBar from '../components/ui/ProgressBar'
import clsx from 'clsx'

const INSTALL_STEPS = [
  {
    step: 1, title: 'Download MinGW-w64',
    desc: 'Download the MinGW-w64 installer from the official site. Choose the architecture matching your OS (x86_64 for 64-bit).',
    cmd: null,
    link: 'https://www.mingw-w64.org/downloads/',
  },
  {
    step: 2, title: 'Run the installer',
    desc: 'Run the installer and choose: Architecture → x86_64, Threads → posix, Exception → seh. Install to C:\\mingw64.',
    cmd: null,
  },
  {
    step: 3, title: 'Add to System PATH',
    desc: 'Open System Properties → Environment Variables → Path → New → Add C:\\mingw64\\bin.',
    cmd: null,
  },
  {
    step: 4, title: 'Verify installation',
    desc: 'Open Command Prompt and run the commands below to confirm GCC is installed correctly.',
    cmd: 'g++ --version\ngcc --version',
  },
  {
    step: 5, title: 'Test your first program',
    desc: 'Create a hello.cpp file and compile it to make sure your setup works end-to-end.',
    cmd: 'g++ hello.cpp -o hello\n.\\hello.exe',
  },
]

const INITIAL_TOPICS = [
  { id: 1,  order: 1,  title: 'Variables & Data Types',       description: 'int, float, char, bool, string',            difficulty: 'beginner',     duration: '30 min', completed: true  },
  { id: 2,  order: 2,  title: 'Input / Output',               description: 'cin, cout, printf, scanf',                  difficulty: 'beginner',     duration: '20 min', completed: true  },
  { id: 3,  order: 3,  title: 'Operators & Expressions',      description: 'Arithmetic, relational, logical operators',  difficulty: 'beginner',     duration: '25 min', completed: true  },
]

const FAQS = [
  { q: 'Do I need prior programming experience?', a: 'No! This module starts from absolute zero. You will learn everything you need in C++ from scratch.' },
  { q: 'Which IDE should I use?',                  a: 'We recommend VS Code with the C/C++ extension. You can also use Code::Blocks for a simpler setup.' },
  { q: 'How long does this module take?',          a: 'Most learners complete it in 2–3 weeks with 1–2 hours of daily practice.' },
  { q: 'Is C++ mandatory for DSA?',                a: 'Not mandatory, but highly recommended. C++ gives you the finest control over memory and performance.' },
]

function FeaturedModuleCard() {
  const navigate = useNavigate()

  const PILLS = [
    { emoji: '🔀', label: 'if / else' },
    { emoji: '🔁', label: 'Loops' },
    { emoji: '📍', label: 'Pointers' },
    { emoji: '🧮', label: 'Arrays' },
    { emoji: '❓', label: 'Quizzes' },
  ]

  return (
    <motion.div
      id="featured-c-module-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate('/prerequisite/c-module')}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/prerequisite/c-module')}
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(99,102,241,0.18)' }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      className="
        relative overflow-hidden rounded-2xl cursor-pointer
        border border-primary-200 dark:border-primary-800/60
        bg-gradient-to-br from-white via-primary-50/40 to-cyan-50/30
        dark:from-navy-800 dark:via-primary-900/20 dark:to-cyan-900/10
        p-6 group select-none
      "
      aria-label="Open Control Flow & Pointers module"
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full bg-primary-400/10 dark:bg-primary-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-2xl" />

      {/* top row: badge row + New badge */}
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
        {/* C Programming badge */}
        <div className="flex items-center gap-2">
          <span className="
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide
            bg-primary-100 dark:bg-primary-900/40
            text-primary-700 dark:text-primary-300
            border border-primary-200 dark:border-primary-700/60
          ">
            <Zap className="w-3 h-3" />
            C Programming
          </span>
        </div>

        {/* Animated "New" badge */}
        <span className="
          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
          bg-emerald-50 dark:bg-emerald-900/30
          text-emerald-700 dark:text-emerald-300
          border border-emerald-200 dark:border-emerald-700/50
          shrink-0
        ">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          New
        </span>
      </div>

      {/* Title + subtitle */}
      <div className="relative z-10 mb-4">
        <h3 className="text-lg font-black font-head text-slate-900 dark:text-white mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          Control Flow &amp; Pointers
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          if/else, loops, pointers, arrays — with interactive quizzes
        </p>
      </div>

      {/* Topic pills */}
      <div className="flex flex-wrap gap-2 mb-5 relative z-10">
        {PILLS.map(({ emoji, label }) => (
          <span key={label} className="
            inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium
            bg-white/70 dark:bg-navy-700/60
            text-slate-600 dark:text-slate-300
            border border-slate-200/80 dark:border-white/10
          ">
            {emoji} {label}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" /> ~90 min · 10 sections · Mini quiz
        </span>
        <span className="
          inline-flex items-center gap-1.5 text-sm font-semibold
          text-primary-600 dark:text-primary-400
          group-hover:gap-2.5 transition-all duration-200
        ">
          Start Module <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </motion.div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 dark:border-white/10 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left gap-3"
      >
        <span className="text-sm font-medium text-slate-800 dark:text-white">{q}</span>
        <ChevronDown className={clsx('w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pb-4"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">{a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function Prerequisite() {
  const [topics, setTopics] = useState(INITIAL_TOPICS)
  const completed = topics.filter(t => t.completed).length
  const pct       = Math.round((completed / topics.length) * 100)

  function toggleComplete(id) {
    setTopics(ts => ts.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-primary-500 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium">Prerequisite</span>
      </nav>

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black font-head text-slate-900 dark:text-white mb-2">
              Prerequisite Module
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl">
              Before diving into DSA, set up your C++ development environment and master the fundamentals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-500">{pct}%</p>
              <p className="text-xs text-slate-400">Completed</p>
            </div>
            <div className="w-20">
              <ProgressBar value={pct} color="primary" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-8">
          {/* Installation Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">C++ Installation Guide</h2>
                  <p className="text-xs text-slate-400">MinGW-w64 setup for Windows</p>
                </div>
              </div>
              <a
                href="https://www.mingw-w64.org/downloads/"
                target="_blank" rel="noopener noreferrer"
                id="download-mingw-btn"
                className="btn-primary text-xs py-2 px-3"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>

            <div className="space-y-4">
              {INSTALL_STEPS.map(({ step, title, desc, cmd, link }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 shrink-0 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">{step}</div>
                    {step < INSTALL_STEPS.length && <div className="w-px flex-1 bg-slate-200 dark:bg-white/10 mt-2" />}
                  </div>
                  <div className="pb-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{desc}</p>
                    {cmd && (
                      <pre className="bg-navy-900 dark:bg-black/40 text-green-400 font-mono text-xs rounded-xl p-3 overflow-x-auto">
                        {cmd}
                      </pre>
                    )}
                    {link && (
                      <a href={link} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1 text-xs text-primary-500 hover:underline mt-1">
                        Visit official site <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Video button */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary-600/10 to-accent-cyan/10 border border-primary-500/20 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">Video Tutorial</p>
                <p className="text-xs text-slate-400">Full setup walkthrough — 12 minutes</p>
              </div>
              <button id="watch-video-btn" className="btn-primary text-xs py-2 px-4">
                <Play className="w-3.5 h-3.5 fill-white" /> Watch Now
              </button>
            </div>
          </motion.section>

          {/* ── Featured Module Card ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <FeaturedModuleCard />
          </motion.section>

          {/* Subtopics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">C++ Subtopics</h2>
                <p className="text-xs text-slate-400">{completed}/{topics.length} topics completed</p>
              </div>
            </div>
            <SubtopicsTable topics={topics} onComplete={toggleComplete} />
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="card-glass rounded-2xl p-5"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Module Info</h3>
            <ul className="space-y-3">
              {[
                { icon: Clock,       label: 'Est. Time',   value: '8–12 hours' },
                { icon: BookOpen,    label: 'Topics',      value: `${topics.length} lessons` },
                { icon: CheckCircle, label: 'Completed',   value: `${completed} / ${topics.length}` },
                { icon: User,        label: 'Instructor',  value: 'Upcurve Team' },
              ].map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <Icon className="w-4 h-4 text-primary-500 shrink-0" />
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="ml-auto font-semibold text-slate-800 dark:text-white">{value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <ProgressBar value={pct} color="primary" showLabel />
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-glass rounded-2xl p-5"
          >
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              {[
                { label: 'cppreference.com',    href: 'https://en.cppreference.com' },
                { label: 'LearnCpp',             href: 'https://www.learncpp.com' },
                { label: 'Competitive Programmer\'s Handbook', href: 'https://cses.fi/book/book.pdf' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-500 transition-colors group">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary-400" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="card-glass rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-primary-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">FAQ</h3>
            </div>
            <div>
              {FAQS.map(faq => <FaqItem key={faq.q} {...faq} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
