import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { usePrereqProgress } from '../../hooks/usePrereqProgress'

export default function ModuleNavigation({ moduleId }) {
  const navigate = useNavigate()
  const { topics, markComplete } = usePrereqProgress()

  const currentIndex = topics.findIndex(t => t.id === moduleId)
  const currentTopic = topics[currentIndex]
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null

  const handleNext = () => {
    if (currentTopic) markComplete(currentTopic.id)
    if (nextTopic) navigate(nextTopic.link)
    else navigate('/prerequisite') // Finish/hub
  }

  const handlePrev = () => {
    if (prevTopic) navigate(prevTopic.link)
    else navigate('/prerequisite')
  }

  return (
    <div className="module-nav flex items-center justify-between mt-0 pt-6 border-t border-slate-200 dark:border-white/10 mb-20 px-10">
      <button 
        onClick={handlePrev}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-cyan hover:shadow-lg hover:shadow-primary-500/25 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        {prevTopic ? `Previous: ${prevTopic.title}` : 'Back to Hub'}
      </button>

      <div className="hidden sm:flex gap-2 items-center">
        {[0, 1, 2].map((dotIndex) => {
          let isActive = false;
          if (currentIndex === 0 && dotIndex === 0) isActive = true;
          else if (currentIndex === topics.length - 1 && dotIndex === 2) isActive = true;
          else if (currentIndex > 0 && currentIndex < topics.length - 1 && dotIndex === 1) isActive = true;

          return (
            <div 
              key={dotIndex}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary-400 scale-125 shadow-[0_0_8px_rgba(167,139,250,0.6)]' : 'bg-slate-300/50 dark:bg-slate-600/40 opacity-60'}`}
            />
          );
        })}
      </div>

      <button 
        onClick={handleNext}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-cyan hover:shadow-lg hover:shadow-primary-500/25 transition-all"
      >
        {nextTopic ? 'Mark Done & Next' : 'Finish Module'}
        {nextTopic ? <ArrowRight className="w-4 h-4" /> : <Check className="w-4 h-4" />}
      </button>
    </div>
  )
}
