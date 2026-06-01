import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion'
import {
  Code2, ChevronRight, Zap, Trophy, BookOpen, Cpu,
  Star, ArrowRight, CheckCircle2, GitBranch, Target, Brain,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import UpcurveLogoLight from '../assets/Upcurve_logo.png'
import UpcurveLogoDark from '../assets/Upcurve_logo_dark.png'

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
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } },
}

/* ─── Static Data ─── */
const FEATURES = [
  { icon: BookOpen,  title: 'Structured Paths',    desc: 'Curated from prerequisite to advanced — no guesswork.',    color: 'from-blue-500 to-cyan-400' },
  { icon: Zap,       title: 'Fast Progression',    desc: 'Learn at your own pace with bite-sized interactive lessons.',color: 'from-emerald-500 to-teal-400' },
  { icon: Trophy,    title: 'Gamified Learning',   desc: 'Earn badges, maintain streaks, climb the leaderboard.',     color: 'from-orange-500 to-amber-400' },
  { icon: Cpu,       title: 'Expert-Level Topics', desc: 'Go beyond basics: DP, segment trees, competitive tricks.',  color: 'from-violet-500 to-fuchsia-400' },
]

const MODULES = [
  { label: 'Prerequisite', icon: BookOpen,   color: '#3B82F6', bg: 'bg-blue-50/80 dark:bg-blue-500/10',   border: 'border-blue-200 dark:border-blue-500/30',   to: '/prerequisite' },
  { label: 'Beginner',     icon: Zap,        color: '#10B981', bg: 'bg-emerald-50/80 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/30', to: '/beginner' },
  { label: 'Intermediate', icon: GitBranch,  color: '#F59E0B', bg: 'bg-amber-50/80 dark:bg-amber-500/10',  border: 'border-amber-200 dark:border-amber-500/30',  to: '/intermediate' },
  { label: 'Advanced',     icon: Cpu,        color: '#8B5CF6', bg: 'bg-violet-50/80 dark:bg-violet-500/10', border: 'border-violet-200 dark:border-violet-500/30', to: '/advanced' },
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
      <motion.div 
        animate={{ y: [0, -50, 0], x: [0, 40, 0], scale: [1, 1.1, 1] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-500/15 dark:bg-violet-600/20 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 60, 0], x: [0, -50, 0], scale: [1, 1.2, 1] }} 
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-blue-500/15 dark:bg-blue-600/15 blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }} 
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-[80px] pointer-events-none" 
      />
    </>
  )
}

/* ─── Interactive Hover Card (Linear Style Spotlight) ─── */
function InteractiveCard({ children, className = "" }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`group relative rounded-2xl bg-white dark:bg-white/10 p-[1px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Border (revealed through the 1px padding). In light mode we use a solid border fallback on the inner div, but this gives a nice violet outline on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.8),
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Inner Card filling the background */}
      <div className="relative h-full w-full rounded-[15px] bg-white/95 dark:bg-[#1E293B] overflow-hidden border border-slate-100 dark:border-transparent">
        
        {/* Soft Background Spotlight inside the card */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(139, 92, 246, 0.05),
                transparent 70%
              )
            `,
          }}
        />
        
        <div className="relative z-10 h-full p-6">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Animated Text Reveal Component ─── */
function TextReveal({ text, className }) {
  const words = text.split(" ");
  return (
    <motion.h3 
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }} 
      initial="hidden" animate="show"
      className={className}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150 } } }} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h3>
  );
}

export default function LandingPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  // If already logged in skip straight to /home
  useEffect(() => {
    if (user) navigate('/home', { replace: true })
  }, [user, navigate])

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300">

      {/* ─── MINIMAL NAV ─── */}
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-20
                   bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-colors duration-300 shadow-sm"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" id="landing-logo">
          <motion.img whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} src={theme === 'dark' ? UpcurveLogoDark : UpcurveLogoLight} alt="Upcurve Logo" className="h-10 w-auto rounded-lg shadow-sm dark:shadow-lg object-contain" />
        </Link>

        {/* Middle Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors relative group"
          >
            About
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => scrollToSection('learning-paths')} 
            className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors relative group"
          >
            Learning Paths
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => scrollToSection('why-upcurve')} 
            className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors relative group"
          >
            Why Upcurve
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </motion.button>


          <Link to="/login"  id="landing-signin" className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-4 py-2 relative group overflow-hidden rounded-lg">
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 h-full w-full bg-slate-100 dark:bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>

          <Link to="/signup" id="landing-signup-cta">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="text-base font-bold px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500
                         text-white shadow-lg shadow-violet-500/20 transition-all"
            >
              Get Started
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Orbs />

        {/* Premium Grid Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: theme === 'dark' ? 0.06 : 0.06 }} 
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{ 
              backgroundImage: theme === 'dark' ? 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)' : 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', 
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 10%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 80%)'
            }} 
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-4 pt-24 pb-16 max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide
                       bg-white dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-500/30 mb-8 shadow-sm
                       hover:shadow-violet-500/20 hover:scale-105 transition-all cursor-default">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Target className="w-4 h-4" /> 
            </motion.div>
            Master DSA · Zero to Competitive
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black font-head leading-[1.05] tracking-tight mb-6 drop-shadow-sm dark:drop-shadow-none">
            <span className="text-slate-900 dark:text-white inline-block">Master </span>
            <motion.span 
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400 bg-[length:200%_auto] inline-block ml-3">
              DSA
            </motion.span>
            <br />
            <span className="text-slate-900 dark:text-white inline-block">from </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 inline-block ml-2 relative">
              Zero to Advanced
              <motion.div 
                initial={{ scaleX: 0 }} 
                animate={{ scaleX: 1 }} 
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full origin-left opacity-30" 
              />
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            <TextReveal text="Structured learning paths, interactive problems, and gamified progression. Go from a complete beginner to a competitive programmer — at your own pace." />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <Link to="/signup" id="hero-get-started">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base w-full sm:w-auto
                           bg-slate-900 text-white dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-500 shadow-xl shadow-slate-900/20 dark:shadow-2xl dark:shadow-violet-500/30
                           hover:shadow-slate-900/30 dark:hover:shadow-violet-500/50 transition-shadow duration-300 relative overflow-hidden group border border-slate-800 dark:border-transparent"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover:animate-[shimmer_1.5s_ease-out_infinite]" />
                Get Started Free 
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </Link>

          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.45 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 cursor-default"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Free to start</motion.span>
            <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 cursor-default"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> No credit card</motion.span>
            <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 cursor-default"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> 4 learning paths</motion.span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase font-bold">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[3px] h-10 bg-gradient-to-b from-slate-300 dark:from-slate-500 to-transparent rounded-full" />
        </motion.div>

      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-4 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="lg:w-1/2">
              <motion.p variants={fadeUp} className="text-violet-600 dark:text-violet-400 font-bold text-sm uppercase tracking-widest mb-3">About Us</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-head text-slate-900 dark:text-white mb-6 leading-tight">
                Our Purpose: <br/>Demystifying DSA
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-medium">
                Too many developers get stuck in "tutorial hell" or feel overwhelmed by the abstraction of Data Structures and Algorithms. The traditional way of learning is fragmented and lacks a clear progression.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium">
                That's why we built <strong className="text-slate-900 dark:text-white font-black">Upcurve</strong>. Our goal is to provide a single, unified journey from absolute basics to competitive programming mastery. We've structured the curriculum so you never have to guess "what to learn next."
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex items-center gap-6">
                 <div className="flex flex-col">
                   <span className="text-3xl font-black text-slate-900 dark:text-white">Structured</span>
                   <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Curriculum</span>
                 </div>
                 <div className="w-px h-12 border-l-2 border-slate-200 dark:border-white/10" />
                 <div className="flex flex-col">
                   <span className="text-3xl font-black text-slate-900 dark:text-white">Interactive</span>
                   <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Learning</span>
                 </div>
              </motion.div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: 'spring' }} viewport={{ once: true }} className="lg:w-1/2 relative w-full aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl" />
              <InteractiveCard className="w-full h-full !rounded-full flex items-center justify-center">
                 <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-[#1E293B]">
                   <Brain className="w-32 h-32 text-violet-500 dark:text-violet-400 opacity-90 relative z-10 drop-shadow-md" />
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border-[2px] border-dashed border-violet-500/30 rounded-full m-8" />
                   <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border-[2px] border-dashed border-cyan-500/30 rounded-full m-16" />
                 </div>
              </InteractiveCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MODULE PREVIEW ─── */}
      <section id="learning-paths" className="py-24 px-4 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-violet-600 dark:text-violet-400 font-bold text-sm uppercase tracking-widest mb-3">Learning Paths</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-head text-slate-900 dark:text-white mb-4">
              4 Stages. One Journey.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
              Each module builds on the previous. Start at prerequisite and work your way up.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map(({ label, icon: Icon, color, bg, border, to }) => (
              <motion.div key={label} variants={fadeIn}>
                <Link to={to} className="block group">
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`h-full rounded-3xl border border-slate-100 dark:${border} p-6 bg-white dark:bg-[#1E293B] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-md dark:shadow-black/40
                                hover:shadow-xl hover:shadow-slate-200 dark:group-hover:shadow-[0_0_35px_-5px_rgba(0,0,0,0.8)] transition-all duration-300 relative overflow-hidden`}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent dark:from-white/10 dark:to-transparent opacity-100 dark:opacity-0 dark:group-hover:opacity-100 transition-opacity" 
                      style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }} 
                    />
                    
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative group-hover:rotate-6 transition-transform block"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}33` }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <p className="font-bold text-xl text-slate-900 dark:text-white mb-2 relative">{label}</p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 relative">Path · {label === 'Prerequisite' ? '8' : label === 'Beginner' ? '24' : label === 'Intermediate' ? '36' : '48'} lessons</p>
                    
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold relative" style={{ color }}>
                      Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-all" />
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="why-upcurve" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-100/50 dark:via-violet-950/20 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-cyan-600 dark:text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3">Why Upcurve</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-head text-slate-900 dark:text-white mb-4">
              Built for Real Progress
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title} variants={fadeIn} className="h-full">
                <InteractiveCard>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">{title}</h3>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-amber-500 dark:text-amber-400 font-bold text-sm uppercase tracking-widest mb-3">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-head text-slate-900 dark:text-white">
              Loved by learners
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(({ name, role, text, stars }, i) => (
              <motion.div key={name} variants={fadeIn} custom={i}>
                <InteractiveCard>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: 0.1 + i * 0.05, type: 'spring' }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 italic font-medium">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{name}</p>
                      <p className="text-xs text-slate-500 font-medium tracking-wide">{role}</p>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24 px-4 relative">
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
          className="max-w-4xl mx-auto rounded-[2rem] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600
                     p-1 shadow-2xl shadow-violet-500/20 relative group cursor-default">
          
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="rounded-[calc(2rem-4px)] bg-slate-50 dark:bg-[#0F172A] p-12 md:p-16 text-center relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10 pointer-events-none rounded-full blur-3xl" 
            />
            
            <h2 className="text-3xl md:text-5xl font-black font-head text-slate-900 dark:text-white mb-4 relative z-10">
              Ready to Master DSA?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium relative z-10 max-w-lg mx-auto">
              Join thousands of learners. Start for free today and transform your skills.
            </p>
            <Link to="/signup" id="cta-final-btn">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-base
                           bg-slate-900 dark:bg-gradient-to-r dark:from-violet-500 dark:to-cyan-500 text-white shadow-xl
                           hover:shadow-slate-900/40 dark:hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.6)] transition-all duration-300 relative z-10 group/btn border border-slate-800 dark:border-transparent"
              >
                Start Learning Free 
                <motion.div 
                  initial={{ x: 0 }} 
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-5 h-5 font-black" />
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-slate-200 dark:border-white/5 bg-transparent py-10 px-4 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <motion.img 
            whileHover={{ rotate: [-5, 5, -5, 5, 0] }} 
            transition={{ duration: 0.5 }}
            src={theme === 'dark' ? UpcurveLogoDark : UpcurveLogoLight} alt="Upcurve Logo" className="h-6 w-auto rounded-md object-contain" 
          />
        </motion.div>
        <p className="text-slate-500 dark:text-slate-500 text-sm font-semibold tracking-wide">© {new Date().getFullYear()} Upcurve. Learn, Progress, Grow.</p>
      </footer>
      
      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(400%); }
        }
      `}} />
    </div>
  )
}
