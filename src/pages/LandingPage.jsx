import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Code2, ChevronRight, Zap, Trophy, BookOpen, Cpu,
  Star, ArrowRight, CheckCircle2, GitBranch, Target,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14 } },
}
const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

/* ─── Static Data ─── */
const FEATURES = [
  { icon: BookOpen,  title: 'Structured Paths',    desc: 'Curated from prerequisite to advanced — no guesswork.',    color: 'from-blue-500 to-cyan-400' },
  { icon: Zap,       title: 'Fast Progression',    desc: 'Learn at your own pace with bite-sized interactive lessons.',color: 'from-green-500 to-emerald-400' },
  { icon: Trophy,    title: 'Gamified Learning',   desc: 'Earn badges, maintain streaks, climb the leaderboard.',     color: 'from-orange-500 to-amber-400' },
  { icon: Cpu,       title: 'Expert-Level Topics', desc: 'Go beyond basics: DP, segment trees, competitive tricks.',  color: 'from-purple-500 to-violet-400' },
]

const MODULES = [
  { label: 'Prerequisite', icon: BookOpen,   color: '#3B82F6', bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   to: '/prerequisite' },
  { label: 'Beginner',     icon: Zap,        color: '#10B981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', to: '/beginner' },
  { label: 'Intermediate', icon: GitBranch,  color: '#F59E0B', bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  to: '/intermediate' },
  { label: 'Advanced',     icon: Cpu,        color: '#8B5CF6', bg: 'bg-purple-500/10', border: 'border-purple-500/30', to: '/advanced' },
]

const TESTIMONIALS = [
  { name: 'Aryan S.',   role: 'SWE @ Google',    text: 'Went from zero to cracking FAANG in 6 months. The structure is unmatched.',  stars: 5 },
  { name: 'Priya M.',   role: 'CS Student',       text: 'Finally understood recursion and DP. Best DSA platform I\'ve used.',          stars: 5 },
  { name: 'Carlos R.',  role: 'Backend Engineer', text: 'The advanced section on segment trees is chef\'s kiss. Truly competitive-level.', stars: 5 },
]

/* ─── Floating Orbs ─── */
function Orbs() {
  return (
    <>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
    </>
  )
}

export default function LandingPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // If already logged in skip straight to /home
  useEffect(() => {
    if (user) navigate('/home', { replace: true })
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 overflow-x-hidden">

      {/* ─── MINIMAL NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16
                      bg-[#0F172A]/70 backdrop-blur-xl border-b border-white/5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" id="landing-logo">
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-black font-head text-xl text-white tracking-tight">
            Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Life</span>
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/login"  id="landing-signin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5">Sign In</Link>
          <Link to="/signup" id="landing-signup-cta"
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500
                       text-white shadow-lg hover:opacity-90 active:scale-95 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Orbs />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 pt-24 pb-16 max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                       bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-8 backdrop-blur-sm">
            <Target className="w-3.5 h-3.5" /> Master DSA · Zero to Competitive
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black font-head leading-[1.05] mb-6">
            <span className="text-white">Master </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">DSA</span>
            <br />
            <span className="text-white">from </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Zero to Advanced</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Structured learning paths, interactive problems, and gamified progression.
            Go from a complete beginner to a competitive programmer — at your own pace.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" id="hero-get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base
                         bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-2xl shadow-violet-500/30
                         hover:scale-[1.03] hover:shadow-violet-500/50 active:scale-95 transition-all duration-300">
              Get Started Free <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/home" id="hero-explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base
                         border border-white/15 text-slate-200 backdrop-blur-sm
                         hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-300">
              Explore Modules <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.45 }}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to start</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 4 learning paths</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-gradient-to-b from-slate-600 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ─── MODULE PREVIEW ─── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3">Learning Paths</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-head text-white mb-4">
              4 Stages. One Journey.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              Each module builds on the previous. Start at prerequisite and work your way up.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MODULES.map(({ label, icon: Icon, color, bg, border, to }) => (
              <motion.div key={label} variants={fadeIn}>
                <Link to={to}
                  className={`group block rounded-2xl border ${border} ${bg} p-6 backdrop-blur-sm
                              hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 cursor-pointer`}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <p className="font-bold text-lg text-white mb-1">{label}</p>
                  <p className="text-sm text-slate-500 mb-4">Path · {label === 'Prerequisite' ? '8' : label === 'Beginner' ? '24' : label === 'Intermediate' ? '36' : '48'} lessons</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-3">Why CodeLife</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-head text-white mb-4">
              Built for Real Progress
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title} variants={fadeIn}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6
                           hover:bg-white/[0.07] hover:border-white/10 hover:scale-[1.03] transition-all duration-300">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-black font-head text-white">
              Loved by learners
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, stars }) => (
              <motion.div key={name} variants={fadeIn}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm
                           hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">"{text}"</p>
                <div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-xs text-slate-500">{role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24 px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600
                     p-px shadow-2xl shadow-violet-500/20">
          <div className="rounded-[calc(1.5rem-1px)] bg-[#0F172A] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10 pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-black font-head text-white mb-4 relative z-10">
              Ready to Master DSA?
            </h2>
            <p className="text-slate-400 mb-8 text-lg relative z-10">
              Join thousands of learners. Start for free today.
            </p>
            <Link to="/signup" id="cta-final-btn"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-base
                         bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-xl
                         hover:scale-[1.04] hover:shadow-violet-500/40 active:scale-95 transition-all duration-300 relative z-10">
              Start Learning Free <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="p-1 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white font-head">CodeLife</span>
        </div>
        <p className="text-slate-600 text-sm">© {new Date().getFullYear()} CodeLife. Built for learners, by learners.</p>
      </footer>
    </div>
  )
}
