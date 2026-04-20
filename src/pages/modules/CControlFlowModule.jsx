import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Code2 } from 'lucide-react'

export default function CControlFlowModule() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-navy-900">

      {/* ── Sticky glassmorphism breadcrumb bar ── */}
      <div
        className="sticky top-0 z-50 w-full"
        style={{
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          background: 'rgba(255,255,255,0.72)',
          borderBottom: '1px solid rgba(255,255,255,0.22)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* dark-mode glass layer */}
        <style>{`
          @media (prefers-color-scheme: dark) {}
          .dark .c-module-bar {
            background: rgba(15,23,42,0.75) !important;
            border-bottom-color: rgba(255,255,255,0.08) !important;
          }
        `}</style>

        <div
          className="c-module-bar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 h-14"
          style={{
            background: 'inherit',
          }}
        >
          {/* Back button */}
          <button
            id="c-module-back-btn"
            onClick={() => navigate('/prerequisite')}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold
              text-slate-600 dark:text-slate-300
              hover:text-primary-600 dark:hover:text-primary-400
              hover:bg-primary-50 dark:hover:bg-primary-900/20
              border border-slate-200 dark:border-slate-700
              transition-all duration-200 shrink-0
            "
            aria-label="Back to Prerequisite"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>

          {/* Divider */}
          <span className="text-slate-300 dark:text-slate-600 select-none">|</span>

          {/* Logo mark */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="p-1 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-400 shadow-sm">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold font-head text-sm text-slate-800 dark:text-white hidden sm:inline">
              Code<span className="bg-gradient-to-r from-primary-500 to-cyan-400 bg-clip-text text-transparent">Life</span>
            </span>
          </div>

          {/* Breadcrumb trail */}
          <nav
            className="flex items-center gap-1 text-sm min-w-0 overflow-hidden"
            aria-label="Breadcrumb"
          >
            <button
              onClick={() => navigate('/prerequisite')}
              className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors shrink-0 font-medium"
            >
              Prerequisite
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />

            <span
              className="font-semibold text-slate-900 dark:text-white truncate"
              title="C Programming: Control Flow &amp; Pointers"
            >
              C Programming: Control Flow &amp; Pointers
            </span>
          </nav>
        </div>
      </div>

      {/* ── Full-page iframe ── */}
      <iframe
        id="c-control-flow-iframe"
        src="/modules/c-control-flow.html"
        title="C Programming: Control Flow & Pointers"
        style={{
          width: '100%',
          minHeight: '100vh',
          border: 'none',
          display: 'block',
          flexGrow: 1,
        }}
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  )
}
