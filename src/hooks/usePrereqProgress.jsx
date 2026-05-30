import { useState, useEffect } from 'react'

const INITIAL_TOPICS = [
  { id: 1,  order: 1,  title: 'Variables & Data Types',       description: 'int, float, char, bool, string',            difficulty: 'beginner',     duration: '30 min', completed: false, link: '/prerequisite/data-types' },
  { id: 2,  order: 2,  title: 'Input / Output',               description: 'cin, cout, printf, scanf',                  difficulty: 'beginner',     duration: '20 min', completed: false, link: '/prerequisite/io-module' },
  { id: 3,  order: 3,  title: 'Operators & Expressions',      description: 'Arithmetic, relational, logical operators',  difficulty: 'beginner',     duration: '25 min', completed: false, link: '/prerequisite/operators' },
]

export function usePrereqProgress() {
  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem('upcurve_prereq_topics')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to parse topics from local storage", e)
      }
    }
    return INITIAL_TOPICS
  })

  const [quizPassed, setQuizPassed] = useState(() => {
    return localStorage.getItem('upcurve_prereq_quiz') === 'true'
  })

  const saveTopics = (newTopics) => {
    setTopics(newTopics)
    localStorage.setItem('upcurve_prereq_topics', JSON.stringify(newTopics))
    window.dispatchEvent(new Event('prereq_progress_updated'))
  }

  const markQuizPassed = () => {
    setQuizPassed(true)
    localStorage.setItem('upcurve_prereq_quiz', 'true')
    window.dispatchEvent(new Event('prereq_progress_updated'))
  }

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('upcurve_prereq_topics')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) setTopics(parsed)
        } catch (e) {}
      }
      setQuizPassed(localStorage.getItem('upcurve_prereq_quiz') === 'true')
    }
    window.addEventListener('prereq_progress_updated', handleSync)
    window.addEventListener('storage', handleSync)
    return () => {
      window.removeEventListener('prereq_progress_updated', handleSync)
      window.removeEventListener('storage', handleSync)
    }
  }, [])

  const toggleComplete = (id) => {
    saveTopics(topics.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const markComplete = (id) => {
    saveTopics(topics.map(t => t.id === id ? { ...t, completed: true } : t))
  }

  const completedCount = (topics || []).filter(t => t.completed).length
  const pct = topics?.length ? Math.round((completedCount / topics.length) * 100) : 0

  return {
    topics: topics || [],
    toggleComplete,
    markComplete,
    completedCount,
    pct,
    totalCount: topics.length,
    quizPassed,
    markQuizPassed
  }
}
